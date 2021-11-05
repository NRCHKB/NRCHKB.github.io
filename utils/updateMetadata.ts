import * as fs from 'fs';
import * as childProcess from 'child_process';
import glob from 'glob';

// https://stackoverflow.com/questions/10617070/how-do-i-measure-the-execution-time-of-javascript-code-with-callbacks
const parseHrtimeToSeconds = (hrtime: [number, number]) =>
  (hrtime[0] + hrtime[1] / 1e9).toFixed(3);

// https://stackoverflow.com/questions/15564185/exec-not-returning-anything-when-trying-to-run-git-shortlog-with-nodejs
const tty = process.platform === 'win32' ? 'CON' : '/dev/tty';

const baseFolder = 'content/';
const ignoredAuthors: string[] = ['h-enk', 'GitHub Actions'];
const contributorMap = {
  Shaquu: ['Tadeusz Wyrzykowski'],
};

let counter = 0;
const startTime = process.hrtime();

glob(`${baseFolder}**/!(_index).md`, async (err, files) => {
  for (const file of files) {
    const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });
    let replacedFileContent = fileContent;

    // creation date
    const creationDate = new Date(
      childProcess
        .execSync(
          `git log --diff-filter=A --follow --format=%aI -- ${file} | tail -1`
        )
        .toString()
        .trim()
    );

    replacedFileContent = replacedFileContent.replace(
      /date:.*/g,
      `date: ${creationDate.toISOString()}`
    );

    // lastmod
    const lastmodDate = new Date(
      childProcess
        .execSync(
          `git log -1 --pretty="format:%aI" --perl-regexp --invert-grep --committer='GitHub Actions' -- ${file}`
        )
        .toString()
        .trim()
    );

    replacedFileContent = replacedFileContent.replace(
      /lastmod:.*/g,
      `lastmod: ${lastmodDate.toISOString()}`
    );

    // contributors
    const gitContributors: string[] = childProcess
      .execSync(`git shortlog -n -s -- ${file} < ${tty}`)
      .toString()
      .trim()
      .split('\n')
      .map((contributor) => contributor.match(/^ *(\d*)\t(.*)/)?.[2])
      .filter(
        (contributor): contributor is string => typeof contributor === 'string'
      );

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
        replacedFileContent = replacedFileContent.replace(
          /contributors:.*/g,
          `contributors: ${JSON.stringify(contributors)}`
        );
      }
    }

    if (replacedFileContent !== fileContent) {
      fs.writeFileSync(file, replacedFileContent, { encoding: 'utf8' });
      console.log(
        `Updated metatdata for: "${file}" (date=${creationDate.toISOString()},lastmod=${lastmodDate.toISOString()},contributorsDiff=[${difference.join()}])`
      );
      counter++;
    }
  }

  console.log(
    `\nSuccessfully updated metadata for ${counter} files in ${parseHrtimeToSeconds(
      process.hrtime(startTime)
    )}s.`
  );
});

export {};
