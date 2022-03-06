import * as fs from "fs";
import path from "path";
import axios from "axios";
import * as childProcess from "child_process";
import {forFiles, updateFrontMatter} from "./utils";
import {GitHubUserType} from "./types/GitHubUserType";
import {ContributorDataType} from "./types/ContributorsDataType";

// https://stackoverflow.com/questions/15564185/exec-not-returning-anything-when-trying-to-run-git-shortlog-with-nodejs
const tty = process.platform === "win32" ? "CON" : "/dev/tty";

const baseFolder = "content/";

// Read all contributors from 'nrchkb' file
const contributorsDataFileRaw: ContributorDataType[] = require("../data/nrchkb/contributors.json");
const contributorsDataFile =   contributorsDataFileRaw.map(contributorsData => contributorsData.login);

// Read contributorsMap (login and name) from 'nrchkb' file
const contributorsMapPath = path.join(__dirname, "../data/nrchkb/contributorsMap.json");
let contributorsMap: Record<string, string[]> = require("../data/nrchkb/contributorsMap.json");
const _ = require("lodash"), contributorsMapCopy = JSON.stringify(_.cloneDeep(contributorsMap));

// Ignore "GitHub Actions" to prevent recursion of updating files
const ignoredAuthors: string[] = [
  "h-enk",
  "GitHub Actions",
  "dependabot-preview[bot]",
  "dependabot[bot]",
  "github-actions[bot]",
  "greenkeeper[bot]",
];

const ignoredFiles: string[] = ["content/wiki/discover-more/changelog.md"];

// Search login and name of contributor on GitHub
const updateContributorMap = async (username: string) => {
  try {
    const response = await axios.get<GitHubUserType>(`https://api.github.com/users/${username}`);

    contributorsMap[response.data.login] = [response.data.name];

    console.log(`Contributor ${username} found on https://github.com/${username}.`);
  } catch(error) {console.log(`Contributor ${username} not found!`);}
};

const processFile = async (file: string) => {
  const fileContent = fs.readFileSync(file, {encoding: "utf-8"});
  let replacedFileContent = fileContent;

  // Read contributors from git log
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

  // Read contributors from page frontmatter
  const currentContributorsRaw = fileContent.match(/contributors: (.*)/)?.[1];
  if (currentContributorsRaw) {
    const currentContributors: string[] = JSON.parse(currentContributorsRaw);
    const newContributors: string[] = gitContributors
      .filter((contributor) => !ignoredAuthors.includes(contributor))
      .map((contributor) => {
        const otherName = Object.entries(contributorsMap).find(
          ([, otherNames]) => otherNames.includes(contributor)
        );
        return otherName ? otherName[0] : contributor;
      })
      .filter((contributor) => !contributorsDataFile.includes(contributor));

    await Promise.all(newContributors.map(contributor => updateContributorMap(contributor)));

    const contributors = [
      ...new Set([
        ...currentContributors,
        ...gitContributors.map((contributor) => {
          const otherName = Object.entries(contributorsMap).find(
            ([, otherNames]) => otherNames.includes(contributor)
          );
          return otherName ? otherName[0] : contributor;
        }),
      ]),
    ].filter((contributor) => !ignoredAuthors.includes(contributor));

    difference = contributors.filter(
      (contributor) => !currentContributors.includes(contributor!)
    );

    // Update contributors
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
      `Updated contributors for: "${file}" (contributorsDiff=[${difference.join()}]).`
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
    .then(() => {
      fs.writeFileSync(contributorsMapPath, JSON.stringify(contributorsMap), { encoding: "utf-8" })
      console.log("ContributorsMap Updated")
    })
    .catch((reason) => {
      console.error(`\nFailed due to ${reason}`);
    })
})();

export {};
