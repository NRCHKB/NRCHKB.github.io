---
title: "Migration"
description: "Migration"
lead: ""
date: 2021-08-03T23:21:00.000Z
lastmod: 2021-10-12T22:15:26.438Z
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 80
toc: true
contributors: ["crxporter", "Shaquu"]
---

## Migration to new setup

There are some cases when you may want to move your HomeKit devices to a new Node-RED instance while not changing your Home App pairings.
This could be when you are migrating to a new computer, flashing a new SD card for your pi, or restoring from a backup.
While not guaranteed, this process should allow migration without needing to remove your bridge or standalone devices from the Home app.

### How to do it!

Moving to a new server is fairly simple, and only takes a few of steps,

1. Install Node-RED on your new server
2. Shut down Node-RED on the old server
3. Changed to the `.node-red` directory on the new server and run `npm install node-red-contrib-homekit-bridged` (and any other node modules you use in your flows)
4. Copy over `homekit-persist` from the `.node-red` directory on the old server to the `.node-red` directory on the new server
5. Copy over `flows_<old machine's hostname>.json` from the `.node-red` directory on the old server to the `.node-red` directory on the new server
6. Rename the `flows_<old machine's hostname>.json` to `flows.json` on the new server.
7. Edit the `settings.js` file on the new server, and uncomment the line `flowFile: 'flows.json'
8. (Re)Start Node-RED on your new server.

## Migration to new flow

Sometimes you want to move Service node between flows. Unfortunately simple copy and paste will cause the node to have it's id regenerated.
New id means that HomeKit will loose data about that Service which can cause some settings missing in Home.app (like room assignment etc. for that Service).

1. Create new flow in Node-RED. If already created make sure that you have at least one (any) node in it.
2. Note node.id of the Service node you want to move to new flow.
3. Backup your files that are in `.node-red` directory
4. Shut down Node-RED
5. Locate flows file `flows_<machine's hostname>.json` and open it
6. Locate node in the flow file. Example `"id":"6bed989d.116308","type":"homekit-service","z":"6c3f03b4.f0351c"`
7. `z` is flow id. Change it to new flow id.
8. Save file and start Node-RED.
