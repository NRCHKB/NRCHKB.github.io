import * as fs from "fs";
import * as childProcess from "child_process";
import {forFiles, updateFrontMatter} from "./utils";

const baseFolder = "content/";

const ignoredFiles: string[] = ["content/wiki/discover-more/changelog.md"];
const minDate = new Date("2021-04-05T13:54:45+02:00");

const limitDate = (date: Date) => (date < minDate ? minDate : date);

const processFile = async (file: string) => {
  const fileContent = fs.readFileSync(file, {encoding: "utf-8"});
  let replacedFileContent = fileContent;

  // creation date
  const creationDate = new Date(
    childProcess
      .execSync(
        `git log --diff-filter=A --follow --format=%aI -- ${file} | tail -1`,
        {encoding: "utf8"}
      )
      .trim()
  );

  replacedFileContent = updateFrontMatter(
    replacedFileContent,
    "date",
    limitDate(creationDate).toISOString()
  );

  if (replacedFileContent !== fileContent) {
    fs.writeFileSync(file, replacedFileContent, {encoding: "utf8"});
    console.log(
      `Updated date for: "${file}" (date=${creationDate.toISOString()})`
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
