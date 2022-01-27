---
title: "Troubleshooting"
description: "Troubleshooting"
lead: "Frequently Requested Troubleshooting"
date: 2022-01-26T20:51:13.183Z
lastmod: 2022-01-26T20:51:13.183Z
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 30
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
  * `node-red-contrib-homekit-preconfigured`
  * `node-red-contrib-homekit`

## Unable to associate a Bridge in Home.app

If you cannot pair with a Bridge in Home.app and `node-red/NRCHKB` logs are not indicationg a problem.

For running `node-red` in DEBUG mode:

```bash
DEBUG=NRCHKB*,HAP* node-red
```

Try the steps below to solve the problem:

1. Restart Node-RED
  ```bash
  sudo node-red-restart
  ```
2. Update Node-RED
  ```bash
  bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)
  ```
3. Update your machine packages
  ```bash
  sudo apt-get update
  sudo apt-get upgrade
  ```
4. Update LTS
  ```bash
  nvm install --lts
  nvm use --lts
  ```

## Changing characteristic properties had no effect

1. Check that when you deploy you are in `full` mode.

[Full Flow](full_flow.png)

2. Restart Node-RED

## Sometimes multiple of the same message come through

Restart Node-RED
