import * as fs from "fs";
import { glob } from "glob";
import { GQLFileResponse } from "./types/GQLFileResponse";
import { makeGQLRequest } from "./utils";
import path from "path";

const ITERATION_LIMIT = 2; // 200 commits per file

type File = {
  id: number;
  path: string;
  hasNextPage: boolean;
  endCursor: null | string;
  contributors: string[];
};

// Generate path mapping with all files
const generatePathMap = () => {
  return new Promise<File[]>((resolve, reject) => {
    glob(`content/wiki/!(characteristic)/**/!(_index)*.md`, (err, matches) => {
      if (err) reject(err);

      const files = matches.reduce(
        (acc: File[], match, i) => [
          ...acc,
          {
            id: i,
            path: match,
            hasNextPage: true,
            endCursor: null,
            contributors: [],
          },
        ],
        []
      );
      resolve(files);
    });
  });
};

// Checks if some files have a next page
const hasNextPages = (files: File[]) => {
  return files.find(({ hasNextPage }) => hasNextPage);
};

const generateGQLArgs = (params: Record<string, null | string | number>) => {
  return Object.entries(params)
    .filter(([, value]) => value !== null && value !== "")
    .map(
      ([key, value]) =>
        `${key}: ${typeof value === "string" ? JSON.stringify(value) : value}`,
      ""
    )
    .join(", ");
};

// Generate GQL query
const makeFilesRequest = async (files: File[]) => {
  let filesQueryPart = "";

  for (const file of files) {
    if (!file.hasNextPage) continue;

    filesQueryPart += `\nf${file.id}: history(${generateGQLArgs({
      first: 100,
      path: file.path,
      after: file.endCursor,
    })}) {...Author}`;
  }

  if (filesQueryPart === "") return;

  const query = `
    query {
      repository(owner: "NRCHKB", name: "NRCHKB.github.io") {
        object(expression: "master") {
          ... on Commit {
            ${filesQueryPart}
          }
        }
      }
    }

    fragment Author on CommitHistoryConnection {
      nodes {
        author {
          user {
            login
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  `;

  const response: GQLFileResponse = await makeGQLRequest({ query });

  for (const [key, value] of Object.entries(
    response.data.data.repository.object
  )) {
    const fileIdx = files.findIndex((file) => `f${file.id}` === key);

    // Update contributors
    const contributors = value.nodes.map((node) => node.author.user.login);
    for (const contributor of contributors) {
      if (!files[fileIdx].contributors.includes(contributor)) {
        files[fileIdx].contributors.push(contributor);
      }
    }

    // Update pagination infos
    files[fileIdx].hasNextPage = value.pageInfo.hasNextPage;
    files[fileIdx].endCursor = value.pageInfo.endCursor;
  }
};

(async () => {
  try {
    let iteration = 0;
    const files = await generatePathMap();

    while (hasNextPages(files)) {
      if (iteration >= ITERATION_LIMIT) {
        throw new Error(`Amount commits over limit!`);
      }

      iteration++;

      await makeFilesRequest(files);
    }

    const contributorsMapDataFile = path.join(
      __dirname,
      "../../data/nrchkb/contributorsMap.json"
    );

    const contributorsMap = files.map(({ path, contributors }) => {
      let relPath = path
        .replace(/^content\//gm, "/")
        .replace(/\/index\.md$/gm, "/");

      if (relPath.endsWith(".md") && !relPath.endsWith("index.md")) {
        relPath = relPath.replace(".md", "/");
      }

      return {
        path: relPath,
        contributors,
      };
    });

    fs.writeFile(
      contributorsMapDataFile,
      JSON.stringify(contributorsMap),
      { flag: "w" },
      (err: any) => {
        if (err) {
          if (err.code == "EEXIST") {
          } else {
            throw err;
          }
        } else {
          console.log(`GitHub Contributors Map updated.`);
        }
      }
    );
  } catch (error) {
    console.error(`Failed`, error);
  }
})();

export {};
