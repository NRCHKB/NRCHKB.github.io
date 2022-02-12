import * as fs from "fs";
import * as childProcess from "child_process";
import glob from "glob";

// https://stackoverflow.com/questions/15564185/exec-not-returning-anything-when-trying-to-run-git-shortlog-with-nodejs
const tty = process.platform === "win32" ? "CON" : "/dev/tty";

const baseFolder = "content/";

// ignore "GitHub Actions" to prevent recursion of updating files
const ignoredAuthors: string[] = [
  "h-enk",
  "GitHub Actions",
  "dependabot-preview[bot]",
  "dependabot[bot]",
  "github-actions[bot]",
  "h-enk",
  "greenkeeper[bot]",
];

const contributorMap = {
  Shaquu: ["Tadeusz Wyrzykowski"],
};

const ignoredFiles: string[] = ["content/wiki/discover-more/changelog.md"];
const minDate = new Date("2021-04-05T13:54:45+02:00");

const updateFrontMatter = (content: string, key: string, value: string) => {
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

const limitDate = (date: Date) => (date < minDate ? minDate : date);

const processFile = async (file: string) => {
  const fileContent = fs.readFileSync(file, { encoding: "utf-8" });
  let replacedFileContent = fileContent;

  // creation date
  const creationDate = new Date(
    childProcess
      .execSync(
        `git log --diff-filter=A --follow --format=%aI -- ${file} | tail -1`,
        { encoding: "utf8" }
      )
      .trim()
  );

  replacedFileContent = updateFrontMatter(
    replacedFileContent,
    "date",
    limitDate(creationDate).toISOString()
  );

  // lastmod
  // https://stackoverflow.com/a/70644305
  const lastmodDate = new Date(
    childProcess
      .execSync(
        `git log -1 --pretty="format:%aI" --perl-regexp --author="^((?!GitHub Actions).*)$" -- ${file}`,
        { encoding: "utf8" }
      )
      .trim()
  );

  replacedFileContent = updateFrontMatter(
    replacedFileContent,
    "lastmod",
    limitDate(lastmodDate).toISOString()
  );

  // contributors
  // run in tty because of https://stackoverflow.com/questions/15564185/exec-not-returning-anything-when-trying-to-run-git-shortlog-with-nodejs
  const gitContributors: string[] = childProcess
    .execSync(`git shortlog -n -s -- ${file} < ${tty}`, { encoding: "utf8" })
    .trim()
    .split("\n")
    .reduce((arr, contributor) => {
      if (contributor.match(/^ *(\d*)\t(.*)/)?.[2]) {
        arr.push(contributor);
      }
      return arr;
    }, [] as string[]);

  let difference: string[] = [];

  const currentContributorsRaw = fileContent.match(/contributors: (.*)/)?.[1];
  if (currentContributorsRaw) {
    const currentContributors: string[] = JSON.parse(currentContributorsRaw);
    const contributors = [
      ...new Set([
        ...currentContributors,
        ...gitContributors.map((contributor) => {
          const otherName = Object.entries(contributorMap).find(
            ([, otherNames]) => otherNames.includes(contributor)
          );
          return otherName ? otherName[0] : contributor;
        }),
      ]),
    ].filter((contributor) => !ignoredAuthors.includes(contributor));

    difference = contributors.filter(
      (contributor) => !currentContributors.includes(contributor!)
    );

    if (difference.length > 0) {
      replacedFileContent = updateFrontMatter(
        replacedFileContent,
        "contributors",
        JSON.stringify(contributors)
      );
    }
  }

  if (replacedFileContent !== fileContent) {
    fs.writeFileSync(file, replacedFileContent, { encoding: "utf8" });
    console.log(
      `Updated metatdata for: "${file}" (date=${creationDate.toISOString()},lastmod=${lastmodDate.toISOString()},contributorsDiff=[${difference.join()}])`
    );
  }
};

(async () => {
  new Promise<string[]>((resolve, reject) => {
    if (process.env.ALL === "true") {
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
  })
    .then(
      async (files) =>
        await Promise.all(
          files.map(async (file) => await processFile(file))
        ).then(() => files.length)
    )
    .then((count) => {
      console.log(`\nScanned ${count} files.`);
    });
})();

export {};
