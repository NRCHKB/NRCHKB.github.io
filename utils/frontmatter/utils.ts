import * as childProcess from "child_process";
import axios from "axios";
import glob from "glob";

export const updateFrontMatter = (content: string, key: string, value: string) => {
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

        resolve(matches)
      })
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
  })
}

// Make query to GH GQL API
export const makeGQLRequest = async (query: string) => {
  return axios
    .post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "token " + process.env.GITHUB_TOKEN,
        },
      }
    )
};
