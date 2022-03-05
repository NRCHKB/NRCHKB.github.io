---
title: "How to Update"
description: "NRCHKB node update instructions"
lead: "How to update NRCHKB node"
date: 2022-02-08T15:27:48.000Z
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 20
toc: true
contributors: ["Shaquu","GogoVega"]
---

A new version has been released, and you would like to upgrade? There are at least two ways to do that!

## Inside Node-RED

1. In the Node-RED UI, click on the menu at the top right.
2. Go to `Manage Palette`.
3. Research `node-red-contrib-homekit-bridged` and click `Update`.

## Manually

1. Stop `node-red`
2. `cd ~/.node-red`
3. `npm i node-red-contrib-homekit-bridged@latest`
4. Start `node-red`
