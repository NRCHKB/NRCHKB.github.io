import path from 'path'
import axios, {AxiosResponse} from "axios";
import * as fs from "fs";
import glob from 'glob'
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const baseFolder = 'content/'

const ignoredAuthors: string[] = ['h-enk']
glob(`${baseFolder}**/*.md`, async (err, files) => {
  for (let i = 0; i < files.length; ++i) {
    const file = files[i]
    const url = `https://github.com/NRCHKB/NRCHKB.github.io/contributors-list/master/${file}`
  
    console.log(url)

    const lastmod = new Date().toISOString()

    await axios.get<any, AxiosResponse<string>>(url)
      .then(response => {
        const body = response.data
    
        let matched;
        const usernameRegex = /<a\s+(?:[^>]*?\s+)?href="\/([^"]*)"/gi
        const authors: string[] = []
    
        while(matched = usernameRegex.exec(body)) {
          const username: string = matched[1]
          if (!username || ignoredAuthors.includes(username)) {
            continue
          }
    
          authors.push(username)
        }
    
        const filePath = path.join(__dirname, "..", file)
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            return console.error(filePath, err);
          }

          const currentAuthorsRaw = data.match(/contributors: (.*)/)?.[1]

          if (!!currentAuthorsRaw) {
            const currentAuthors: string[] = JSON.parse(currentAuthorsRaw)
            let difference = authors.filter(x => !currentAuthors.includes(x));

            console.log(difference)

            if (difference.length > 0) {
              const newAuthors = [...currentAuthors]
              difference.forEach(d => newAuthors.push(d))

              let result = data;
              result = result.replace(/contributors:.*/g, `contributors: ${JSON.stringify(newAuthors)}`);
              result = result.replace(/lastmod:.*/g, `lastmod: ${lastmod}`);
            
              fs.writeFile(filePath, result, 'utf8', (err) => {
                 if (err) return console.log(err);
              });
            }
          }
        });
      })
      .catch(error => {
        console.error(url ,error)
      })
    }
    await sleep(1000)
})

export {}
