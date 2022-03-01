import path from 'path'

const changelogFile = path.join(__dirname, "../content/wiki/discover-more/changelog.md")
const changelogTemplate = (changelog: string, lastmod: string) => {
  return `---
title: "Changelog"
description: "All notable changes in NRCHKB project."
lead: ""
date: 2021-08-11T18:47:58.489Z
lastmod: ${lastmod}
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 99
toc: true
contributors: ["Shaquu"]
---

${changelog}
`
}

const fs = require("fs")

let changelog = fs.readFileSync(path.join(__dirname, "../node_modules/node-red-contrib-homekit-bridged/CHANGELOG.md")).toString()
changelog = changelog.replace('# Changelog', '')
changelog = changelog.replace(/[^[]#(\d+)/g, (_: any, ticketID: string) => ` [#${ticketID}](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/${ticketID})`)
changelog = changelog.replace(/@(\w*)/g, (_: any, nickname: string) => `[@${nickname}](https://github.com/${nickname})`)
changelog = changelog.trim()

const previousChangelog = fs.readFileSync(changelogFile).toString().replace(/---(?:.|\n|\r)+?---/gm, '').trim()

if (previousChangelog != changelog) {
  fs.writeFile(changelogFile,
    changelogTemplate(changelog, new Date().toISOString()),
    {flag: "w"},
    (err: any) => {
      if (err) {
        if (err.code == "EEXIST") {
        } else {
          throw err
        }
      } else {
        console.log("Changelog generated")
      }
    })
} else {
  console.log("Changelog not changed")
}

export {}
