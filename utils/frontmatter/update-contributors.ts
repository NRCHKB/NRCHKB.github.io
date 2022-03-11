import * as fs from "fs";
import { glob } from "glob";
import { GQLFileResponse } from "./types/GQLFileResponse";
import { makeGQLRequest, updateFrontMatter } from "./utils";

const ignoredAuthors = [
  "h-enk",
  "GitHub Actions",
  "dependabot-preview[bot]",
  "dependabot[bot]",
  "github-actions[bot]",
  "greenkeeper[bot]",
];

const ITERATION_LIMIT = 2;  // 200 commits per file

type File = {
  id: number
  path: string
  hasNextPage: boolean
  endCursor: null | string
  contributors: string[]
}

// Generate path mapping with all files
const generatePathMap = () => {
  return new Promise<File[]>((resolve, reject) => {
    glob(
      `content/@(blog|wiki)/!(characteristic)/**/!(_index)*.md`,
      (err, matches) => {
        if (err) reject(err);

        const files = matches.reduce((acc: File[], match, i) => [
          ...acc,
          {
            id: i,
            path: match,
            hasNextPage: true,
            endCursor: null,
            contributors: []
          }
        ], []);
        resolve(files);
      }
    );
  });
};

// Checks if some files have a next page
const hasNextPages = (files: File[]) => {
  return files.findIndex(({ hasNextPage }) => !!hasNextPage) !== -1
}

const generateGQLArgs = (params: Record<string, null | string | number>) => {
  return Object.entries(params)
    .filter(([, value]) => value !== null && value !== "")
    .map(([key, value])=> `${key}: ${typeof value === "string" ? JSON.stringify(value): value}`, "")
    .join(", ");
}

// Generate GQL query
const makeFilesRequest = async (files: File[]) => {
  let filesQueryPart = "";

  for (const file of files) {
    if(!file.hasNextPage) continue;

    filesQueryPart += `\nf${file.id}: history(${generateGQLArgs({
      first: 100,
      path: file.path,
      after: file.endCursor,
    })}) {...Author}`;
  }

  if(filesQueryPart === "") return;

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

  const response: GQLFileResponse = await makeGQLRequest(query);

  for(const [key, value] of Object.entries(response.data.data.repository.object)) {
    const fileIdx = files.findIndex(file => `f${file.id}` === key);

    // Update contributors
    const contributors = value.nodes.map((node) => node.author.user.login);
    for (const contributor of contributors) {
      if(!files[fileIdx].contributors.includes(contributor)){
        files[fileIdx].contributors.push(contributor);
      }
    }

    // Update pagination infos
    files[fileIdx].hasNextPage = value.pageInfo.hasNextPage;
    files[fileIdx].endCursor = value.pageInfo.endCursor;
  }
};

// Update contributors list on each page
const updateContributorsInFiles = (files: File[]) => {
  for(const file of files) {
    const fileContent = fs.readFileSync(file.path, { encoding: "utf-8" });

    let replacedFileContent = fileContent;
    let difference = [];

    const currentContributorsRaw =
      fileContent.match(/contributors: (.*)/)?.[1];

    if (currentContributorsRaw) {
      const currentContributors = JSON.parse(currentContributorsRaw);
      const contributors = [...currentContributors];

      for (const c of file.contributors) {
        if(!contributors.includes(c) && !ignoredAuthors.includes(c)) {
          contributors.push(c);
          difference.push(c);
        }
      }

      if (difference.length > 0) {
        replacedFileContent = updateFrontMatter(
          replacedFileContent,
          "contributors",
          JSON.stringify(contributors)
        );
      }
    }

    if (replacedFileContent !== fileContent) {
      fs.writeFileSync(file.path, replacedFileContent, { encoding: "utf8" });
      console.log(`Updated contributors: (${difference}) for: "${file.path}".`);
    }
  }
};

// Processus
(async () => {
  try {

    let iteration = 0;
    const files = await generatePathMap();

    while (hasNextPages(files)) {

      if (iteration >= ITERATION_LIMIT) { console.log(`\nNumber of commits over limit!`); break; }

      iteration++

      await makeFilesRequest(files);

      updateContributorsInFiles(files);

    } console.log(`\nContributors updated.`);

  } catch (error) {
    console.error(`\nFailed due to ${error}.`);
  }
})();

export { };
