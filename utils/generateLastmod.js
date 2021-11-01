const fs = require('fs');
const glob = require('glob');
const childProcess = require('child_process');
const YAML = require('js-yaml');

glob('content/**/*.md', (er, files) => {
  for (const file of files) {
    const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });

    let date = 'no date';

    const replaced = fileContent.replace(
      /^---([\s\S]*?)---/,
      (...frontMatter) => {
        date = childProcess
          .execSync(`git log -1 --pretty="format:%aI" ${file}`)
          .toString();

        const metaData = YAML.load(frontMatter[1].replace(/\r/gm, ''));
        metaData.lastmod = new Date(date);
        const stringified = YAML.dump(metaData);

        return `---\n${stringified}---`;
      }
    );

    if(fileContent !== replaced) { 
      fs.writeFileSync(file, replaced, { encoding: 'utf-8' });
      console.log(`Generated lastmod (${date}) for: "${file}"`);
    }
  }
});
