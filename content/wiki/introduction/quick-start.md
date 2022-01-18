---
title: "Quick Start"
description: "Welcome to the NRCHKB wiki!"
lead: "Welcome to the NRCHKB wiki!"
date: 2021-04-01T00:00:00+02:00
lastmod: 2022-01-18T12:00:57.074Z
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 10
toc: true
contributors: ["crxporter","radokristof","Shaquu"]
---

This wiki will be used to share examples so that users may see how this plugin functions and get started more easily with copyable flows for each HomeKit service. This page will assume you are familiar with Node-RED basics.

For new users, please start with the [official Node-RED docs](https://nodered.org/docs/) before continuing.

## Nodes

A Node is the basic building block of a flow.
Nodes are triggered by either receiving a message from the previous node in a flow, or by waiting for some external event, such as change state of the light or some automated logic. They process that message, or event, and then may send a message to the next nodes in the flow.

A node can have at most one input port and as many output ports as it requires.

Currently, we have two nodes:

### Service Node

Service Node mostly represents Service which will appear in Apple Home.app.
It is our main building block for creating interaction between house, application and our other systems.

{{< alert icon="👉" text="Find more about this node <a href=\"/wiki/nodes/service-node\">here</a>." >}}

### Host Node

Host Node is our configuration node. It is either Bridge or Standalone Accessory.
It will be used to pair (connect) our virtual device in Apple Home.app.

{{< alert icon="👉" text="Find more about this node <a href=\"/wiki/nodes/host-node\">here</a>." >}}

## Demo Setup

Once you have Node-RED running, head over to the Demo Setup page for the easiest demo setup we can provide. This is the setup we use for testing new releases - the demos can be copied directly into Node-RED and added to HomeKit.

{{< alert icon="👉" text="Find more about <a href=\"/wiki/examples/demo-setup\">Demo Setup page</a>." >}}

## Contribution

If you wish to contribute to our wiki then head [here]({{< ref "/wiki/discover-more/contribution" >}} "Contribution") and read our guidelines.
