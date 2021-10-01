---
title: "FAQ"
description: "Frequently Asked Questions"
lead: "Question you ask us and questions we ask you"
date: 2021-04-15T20:00:00+02:00
lastmod: 2021-09-30T18:16:24.348Z
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 100
toc: true
contributors: ["Shaquu"]
---

## Device paired but Service disappearing in Home.app from time to time

You managed to pair with Accessory or Bridge but after a while it has disappeared?

1. Make sure that device you are using to view Home status is connected to the same network that node-red (with nrchkb) is running on
2. If you are using VLAN or special firewall rules, [join us on Discord](https://discord.gg/uvYac5u) to discuss what settings should be for things to work

## Type already defined error

`Type already defined` or `Cannot register type` errors appeared in UI?

1. Make sure you are using the latest version of our node.
2. Look for other homekit nodes that you have installed. You will have to remove them if they collide with our node. Possible collisions with:
   1. `node-red-contrib-homekit-preconfigured`
   2. `node-red-contrib-homekit`

How to check nodes versions?

1. `Settings/Manage palette`
   ![Nodes Version via Manage Palette](nodes_version_manage_palette.png)
2. `package.json` file in your Node-RED installation folder usually `~/.node-red`
   ![Nodes Version via package.json](nodes_version_package_json.png)
