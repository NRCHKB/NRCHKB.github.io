import path from "path";
import * as fs from "fs";
import axios, {AxiosResponse} from "axios";
import {GithubContributorType} from "./types/GithubContributorType";

const contributorsDataFile = path.join(__dirname, "../../data/nrchkb/contributors.json")

axios.all([
  axios.get<any, AxiosResponse<GithubContributorType[]>>('https://api.github.com/repos/NRCHKB/node-red-contrib-homekit-bridged/contributors'),
  axios.get<any, AxiosResponse<GithubContributorType[]>>('https://api.github.com/repos/NRCHKB/NRCHKB.github.io/contributors'),
]).then(axios.spread((response1, response2) => {
  const contributors = response1.data
    .map(({login, avatar_url, html_url}) => {
      return {login, avatar_url, html_url}
    })

  response2.data
    .map(({login, avatar_url, html_url}) => {
      return {login, avatar_url, html_url}
    })
    .forEach(d => {
      if (!contributors.find(c => d.login === c.login)) {
        contributors.push(d)
      }
    })

  return contributors
    .filter(d => !['dependabot-preview[bot]', 'dependabot[bot]', 'github-actions[bot]', 'h-enk', "greenkeeper[bot]"].includes(d.login))
})).then(contributors => {
  fs.writeFile(contributorsDataFile,
    JSON.stringify(contributors),
    {flag: "w"},
    (err: any) => {
      if (err) {
        if (err.code == "EEXIST") {
        } else {
          throw err
        }
      } else {
        console.log("Contributors generated")
      }
    })
})

export {}
