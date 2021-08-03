---
title: "Credits"
description: "Credits"
lead: ""
date: 2021-08-03T00:00:00+02:00
lastmod: 2021-08-03T00:00:00+02:00
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 100
toc: true
contributors: ["crxporter"]
---

This is a place where would like to thank those who have come before to build the work that we have added to.

### Where the Project came from

The API work to interact between HomeKit and NodeJS is from [HAP-NodeJS](https://github.com/KhaosT/HAP-NodeJS).

[Marius Schmeding](https://github.com/mschm/node-red-contrib-homekit) made the first version of the Node-RED plugin to use HAP-NodeJS. His work was later forked by [Oliver Rahner](https://github.com/oliverrahner) who put in a good effort to move over to bridged connections to HomeKit.

Many others have come and gone adding to the work. Thanks to each of you!

### Oliver Rahner explains his work

> As Marius Schmeding seems to have abandoned his great [work](https://github.com/mschm/node-red-contrib-homekit), I decided to fork his repo and to introduce some major rework.
>
>The biggest change is the use of HAP-NodeJS in **bridged mode**: only add one bridge in the iOS Home.app to access all your devices!
Also, I (believe I) fixed some issues:
>
> - devices don't show as unreachable after redeploying
> - having more than one device per accessory (in the "old" world) or bridge doesn't lead to iOS losing the parameters for this device anymore
