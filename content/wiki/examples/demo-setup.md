---
title: "Demo Setup"
description: "Demo Setup"
lead: ""
date: 2020-11-16T13:59:39+01:00
lastmod: 2021-04-04T14:12:00+01:00
draft: false
images: []
menu:
  docs:
    parent: "examples"
weight: 110
toc: true
---

## Explanation

The nature of this plugin and HomeKit in general is very complex. In the past we have tried screenshots, videos, and other ways to show how things work. With this new demo setup, we are taking it to a new level. You can simply copy the code and paste it right into your Node-RED setup to begin playing with many (eventually all) available HomeKit accessories.

## Prerequisites

You must have Node-RED and node-red-contrib-homekit-bridged (aka "our plugin") installed on your system. Most users are likely using Raspberry Pi. Raspberry Pi OS Lite on a Pi Zero W is enough to get started! Please visit the Node-RED [Getting Started](https://nodered.org/docs/getting-started/) page for help with installing node red.

Once that is complete, you can head over to the palette manager (found in the hamburger menu in the top right of the Node-RED screen) to install our plugin. Simply search for `node-red-contrib-homekit-bridged` and click "Install".

Please note that we hope to keep this page up to date. As of 4 November 2020 the current version of Node-RED is `1.2.2` and the current version of our plugin is `1.2.0`. The demo setup below is not guaranteed to work for prior versions.

## How It Works

Once you have Node-RED, and our plugin installed, you are ready to get started. These examples are packaged along with the current version of our plugin. They can be imported very easily into Node-RED, see the gif below:

![How to import example flows](https://user-images.githubusercontent.com/38265886/98158143-158b8d80-1ea0-11eb-8d7b-8376ca01f34c.gif)

### Deploy and add to Home app

#### Deploy

Once you have imported the demos you want to play with, you are ready to hit the "Deploy" button and start testing!

#### Add to HomeKit

Once deployed, you can add the bridge(s) to HomeKit using an iOS or iPadOS device.

First open your Home app and click "Add Accessory"

Next you will have to click "Don't have a code or can't scan?" to get to the next screen. There you will find your bridge labeled "Demo..." - click one and continue.

The next screen will ask for an 8-digit code. This can be found below many of the HomeKit nodes (the number 153-10-538 in the screenshot below) on your Node-RED screen or in the "Configuration Nodes" area. Type in this code then click next and follow the prompts on screen.

![HomeKit Service pin-code](https://user-images.githubusercontent.com/38265886/87266082-fa78b600-c489-11ea-8c5f-26456975d5f2.png)

#### 5. Experiment!

Congratulations! If you have made it this far, you should have some demo services added to the Home app!

From here you can start playing. There are 2 nodes to interact with, they are blue "Inject" nodes with buttons on the left side and green "Debug" nodes with buttons on the left. The Inject nodes trigger an action which will update one or more values in the Home app. Debug nodes will provide output from the Home app in the debug screen in Node-RED (top right of the window, click the button that looks like a bug).

## More Explanations

Explanation of each group is provided within these demos. Simply click one of the framed groups and check the Node-RED info panel as shown in this screenshot:

![Demo Setup group explanations](https://user-images.githubusercontent.com/38265886/87266792-b2f32980-c48b-11ea-9557-079e4a359f8a.png)

## More Help and Disclaimer

These examples are not meant to replace the excellent examples already on the wiki page. Please visit those pages for further explanation of the more complex services.

This is a work in progress. I've tried to make things as simple as possible, but I may have been around Node-RED longer than you. Please don't be afraid to ask questions! We are a growing community on [Discord](https://discord.gg/amwV5tq) please come visit us anytime.

For discussion about how we can make these demos better, please see [issue #301](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/301). More demos will be added in the coming weeks, hopefully including most or all of the available services!

Updated 4 November 2020. @CRXPorter.
