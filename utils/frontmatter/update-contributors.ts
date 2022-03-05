import * as fs from "fs";
import * as childProcess from "child_process";
import {forFiles, updateFrontMatter} from "./utils";

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
  "greenkeeper[bot]",
];

const contributorMap = {
  Shaquu: ["Tadeusz Wyrzykowski"],
};

const ignoredFiles: string[] = ["content/wiki/discover-more/changelog.md"];

const processFile = async (file: string) => {
  const fileContent = fs.readFileSync(file, {encoding: "utf-8"});
  let replacedFileContent = fileContent;

  // contributors
  // run in tty because of https://stackoverflow.com/questions/15564185/exec-not-returning-anything-when-trying-to-run-git-shortlog-with-nodejs
  const gitContributors: string[] = childProcess
    .execSync(`git shortlog -n -s -- ${file} < ${tty}`, {encoding: "utf8"})
    .trim()
    .split("\n")
    .reduce((arr, contributor) => {
      const match = contributor.match(/^ *(\d*)\t(.*)/)?.[2]
      if (match) {
        arr.push(match);
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
    fs.writeFileSync(file, replacedFileContent, {encoding: "utf8"});
    console.log(
      `Updated contributors for: "${file}" (contributorsDiff=[${difference.join()}])`
    );
  }
};

(async () => {
  forFiles(baseFolder, true)
    .then((files) => Promise.all(
      files
        .filter(f => !ignoredFiles.includes(f))
        .map((file) => processFile(file)))
    )
    .then((files) => files.length)
    .then((count) => {
      console.log(`\nScanned ${count} files.`);
    })
    .catch((reason) => {
      console.error(`\nFailed due to ${reason}`);
    })
})();

export {};
