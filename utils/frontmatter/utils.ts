import * as childProcess from "child_process";
import axios, { AxiosResponse } from "axios";
import glob from "glob";

export const ignoredAuthors = [
  "h-enk",
  "GitHub Actions",
  "dependabot-preview[bot]",
  "dependabot[bot]",
  "github-actions[bot]",
  "greenkeeper[bot]",
];

export const updateFrontMatter = (
  content: string,
  key: string,
  value: string
) => {
  return content.replace(/(?<=---)((.|\n|\r)*?)(?=---)/, (_, frontmatter) => {
    let replaced = false;

    frontmatter = frontmatter.replace(new RegExp(`${key}:.*`), () => {
      replaced = true;

      return `${key}: ${value}`;
    });

    if (!replaced) {
      frontmatter += `${key}: ${value}\n`;
    }

    return frontmatter;
  });
};

export const forFiles = (baseFolder: string, all?: boolean) => {
  return new Promise<string[]>((resolve, reject) => {
    if (all) {
      glob(`${baseFolder}**/*.md`, (err, matches) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(matches);
      });
    } else {
      const lastSha = process.env.GITHUB_SHA || "HEAD";

      childProcess.exec(
        `git diff-tree --no-commit-id --name-status -r ${lastSha}`,
        (err, stdout) => {
          if (err) {
            reject(err);
            return;
          }

          const files = stdout.split("\n").reduce((arr, line) => {
            const [modifier, path] = line.split(/\s+/);

            if (path && modifier !== "D" && path.endsWith(".md")) {
              arr.push(path);
            }

            return arr;
          }, [] as string[]);

          resolve(files);
        }
      );
    }
  });
};

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
}

// Make query to GH GQL API
export const makeGQLRequest = <T = any, R = AxiosResponse<T>, D = any>(
  data: D
) => {
  if (!headers.Authorization) {
    throw new Error("Missing GITHUB_TOKEN. It is required for GQL Requests.");
  }

  return axios.post<T, R, D>("https://api.github.com/graphql", data, {
    headers,
  });
};

export const makeRESTRequest = <T = any, R = AxiosResponse<T>, D = any>(
  url: string
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  return axios.get<T, R, D>(url, headers);
};
