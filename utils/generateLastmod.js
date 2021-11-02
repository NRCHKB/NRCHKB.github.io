const fs = require('fs');
const glob = require('glob');
const childProcess = require('child_process');
const YAML = require('js-yaml');

// https://stackoverflow.com/questions/15564185/exec-not-returning-anything-when-trying-to-run-git-shortlog-with-nodejs
const tty = process.platform === 'win32' ? 'CON' : '/dev/tty';

glob('content/**/*.md', (er, files) => {
  for (const file of files) {
    const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });

    let lastmodDate = '';
    let contributors = [];
    let creationDate = '';

    const replaced = fileContent.replace(/^---([\s\S]*?)---/, (...frontMatter) => {
      lastmodDate = new Date(childProcess.execSync(`git log -1 --pretty="format:%aI" -- ${file}`).toString().trim());
      contributors = childProcess
        .execSync(`git shortlog -n -s -- ${file} < ${tty}`)
        .toString()
        .trim()
        .split('\n')
        .map((contributor) => contributor.match(/^ *(\d*)\t(.*)/)[2]);
      creationDate = new Date(
        childProcess.execSync(`git log --diff-filter=A --follow --format=%aI -- ${file} | tail -1`).toString().trim()
      );

      const metaData = YAML.load(frontMatter[1].replace(/\r/gm, ''));
      metaData.lastmod = lastmodDate;
      metaData.contributors = contributors;
      metaData.date = creationDate;
      const stringified = YAML.dump(metaData);

      return `---\n${stringified}---`;
    });

    if (fileContent !== replaced) {
      fs.writeFileSync(file, replaced, { encoding: 'utf-8' });
      console.log(
        `Generated metatdata for: "${file}" (date=${creationDate.toISOString()},lastmod=${lastmodDate.toISOString()},contributors=${contributors.join()})`
      );
    }
  }
});
