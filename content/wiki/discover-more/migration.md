---
title: "Migration"
description: "Migration"
lead: ""
date: 2021-08-03T23:21:00.000Z
lastmod: 2021-08-11T22:15:36.344Z
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 80
toc: true
contributors: ["crxporter"]
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
