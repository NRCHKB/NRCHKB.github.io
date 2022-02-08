import * as fs from 'fs';
import * as childProcess from 'child_process';
import glob from 'glob';

// https://stackoverflow.com/questions/15564185/exec-not-returning-anything-when-trying-to-run-git-shortlog-with-nodejs
const tty = process.platform === 'win32' ? 'CON' : '/dev/tty';

const asyncGlob = async (pattern: string): Promise<string[]> =>
  new Promise((res, rej) =>
    glob(pattern, (err, matches) => {
      if (err) {
        rej(err);
      } else {
        res(matches);
      }
    })
  );

const baseFolder = 'content/';

// ignore "GitHub Actions" to prevent recursion of updating files
const ignoredAuthors: string[] = [
  'h-enk',
  'GitHub Actions',
  'dependabot-preview[bot]',
  'dependabot[bot]',
  'github-actions[bot]',
  'h-enk',
  'greenkeeper[bot]',
];
const contributorMap = {
  Shaquu: ['Tadeusz Wyrzykowski'],
};
const ignoredFiles: string[] = ['content/wiki/discover-more/changelog.md'];

const updateFrontMatter = (content: string, key: string, value: string) => {
  return content.replace(/(?<=---)((.|\n|\r)*?)(?=---)/, (_, frontmatter) => {
    let replaced = false;

    frontmatter = frontmatter.replace(new RegExp(`${key}: .*`), () => {
      replaced = true;

      return `${key}: ${value}`;
    });

    if (!replaced) {
      frontmatter += `${key}: ${value}\n`;
    }

    return frontmatter;
  });
};

const processFile = async (file: string) => {
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

  replacedFileContent = updateFrontMatter(
    replacedFileContent,
    'date',
    creationDate.toISOString()
  );

  // lastmod
  // https://stackoverflow.com/a/70644305
  const lastmodDate = new Date(
    childProcess
      .execSync(
        `git log -1 --pretty="format:%aI" --perl-regexp --author='^((?!GitHub Actions).*)$' -- ${file}`
      )
      .toString()
      .trim()
  );

  replacedFileContent = updateFrontMatter(
    replacedFileContent,
    'lastmod',
    lastmodDate.toISOString()
  );

  // contributors
  // run in tty because of https://stackoverflow.com/questions/15564185/exec-not-returning-anything-when-trying-to-run-git-shortlog-with-nodejs
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
      replacedFileContent = updateFrontMatter(
        replacedFileContent,
        'contributors',
        JSON.stringify(contributors)
      );
    }
  }

  if (replacedFileContent !== fileContent) {
    fs.writeFileSync(file, replacedFileContent, { encoding: 'utf8' });
    console.log(
      `Updated metatdata for: "${file}" (date=${creationDate.toISOString()},lastmod=${lastmodDate.toISOString()},contributorsDiff=[${difference.join()}])`
    );
  }
};

(async () => {
  const files: string[] = [];

  if (process.env.ALL === 'true') {
    const allFiles = await asyncGlob(`${baseFolder}**/*.md`);
    files.push(...allFiles);
  } else {
    const lastSha = process.env.GITHUB_SHA || 'HEAD';

    const changelist = await childProcess
      .execSync(`git diff --name-status ${lastSha}~1..${lastSha}`)
      .toString();

    for (const line of changelist.split('\n')) {
      const [modifier, path] = line.split(/\s+/);

      // check if file is not deleted in that commit and if its an md file
      if (path && modifier !== 'D' && path.endsWith('.md')) {
        files.push(path);
      }
    }
  }

  for (const file of files) {
    if (ignoredFiles.includes(file)) continue;

    await processFile(file);
  }

  console.log(`\nSuccessfully updated metadata for ${files.length} files.`);
})();

export {};
