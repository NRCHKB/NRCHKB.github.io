import path from "path";
import * as fs from "fs";
import axios, { AxiosResponse } from "axios";
import { GithubContributorType } from "./types/GithubContributorType";
import { ignoredAuthors, makeRESTRequest } from "./utils";

const contributorsDataFile = path.join(
  __dirname,
  "../../data/nrchkb/contributors.json"
);

axios
  .all([
    makeRESTRequest<any, AxiosResponse<GithubContributorType[]>>(
      "https://api.github.com/repos/NRCHKB/node-red-contrib-homekit-bridged/contributors"
    ),
    makeRESTRequest<any, AxiosResponse<GithubContributorType[]>>(
      "https://api.github.com/repos/NRCHKB/NRCHKB.github.io/contributors"
    ),
  ])
  .then(
    axios.spread((response1, response2) =>
      response2.data
        .reduce((arr, item) => {
          if (!arr.find((a) => a.login === item.login)) {
            arr.push(item);
          }
          return arr;
        }, response1.data)
        .filter((c) => !ignoredAuthors.includes(c.login))
        .map(({ login, avatar_url, html_url }) => ({
          login,
          avatar_url,
          html_url,
        }))
    )
  )
  .then((contributors) => {
    fs.writeFile(
      contributorsDataFile,
      JSON.stringify(contributors),
      { flag: "w" },
      (err: any) => {
        if (err) {
          if (err.code == "EEXIST") {
          } else {
            throw err;
          }
        } else {
          console.log("GitHub Contributors List generated");
        }
      }
    );
  });

export {};
