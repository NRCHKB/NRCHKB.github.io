---
title: "Occupancy Sensor"
description: "Occupancy Sensor"
lead: ""
date: 2021-04-17T18:50:12.033Z
lastmod: 2021-10-15T22:06:18.282Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "OccupancySensor"
contributors: ["djiwondee","crxporter","caitken-com","Shaquu"]
---

## Example

These examples are meant to be copied into your Node-RED system and adapted to your setup.

### Simple Presence Sensor

This example is a very simple occupancy sensor without any other functionality:

![Bildschirmfoto 2019-03-20 um 16 12 58](https://user-images.githubusercontent.com/37173958/54696185-aa0a7600-4b2b-11e9-9d63-e98b98d569be.png)

It de-/activates only the Occupancy sensor in the Home.app and set the `StatusActive` to true anytime: Here is the sample code:

```json
[{"id":"491167d6.3b9688","type":"change","z":"1ac5f8da.58656f","name":"Set payload to HkMsg for presence","rules":[{"t":"move","p":"payload","pt":"msg","to":"payload.OccupancyDetected","tot":"msg"},{"t":"set","p":"payload.StatusActive","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":1440,"y":360,"wires":[["7712393a.469f98"]]},{"id":"7712393a.469f98","type":"homekit-service","z":"1ac5f8da.58656f","isParent":true,"bridge":"890aedc6.d0b418","parentService":"","name":"RBRx@Home","serviceName":"OccupancySensor","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"OccupancyDetected\" : 0,\n    \"StatusActive\" : false\n}","x":1760,"y":360,"wires":[[]]},{"id":"14d9e017.35bd28","type":"inject","z":"1ac5f8da.58656f","name":"1","topic":"","payload":"1","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":1230,"y":320,"wires":[["491167d6.3b9688"]]},{"id":"56f0d08b.2afce8","type":"inject","z":"1ac5f8da.58656f","name":"0","topic":"","payload":"0","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":1230,"y":400,"wires":[["491167d6.3b9688"]]},{"id":"890aedc6.d0b418","type":"homekit-bridge","z":"","bridgeName":"Node-Red-HAP-Bridge-02","pinCode":"222-22-222","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

The Author is using a more comprehensive flow for a use case that is also a simple presence detection of a device. In that flow Node-Red regularly sends the router the MAC address of a smartphone to check whether the device is connected to the local WI-FI.
![Bildschirmfoto 2019-03-20 um 16 31 45](https://user-images.githubusercontent.com/37173958/54697372-b8f22800-4b2d-11e9-9db1-c8050f1f1f54.png)

This information is than converted to the payload the occupancy sensor requires. In this example you can assume e.g. that the owner is at home.

The example was inspired by [ct-Open-Source/noderedexamples](https://github.com/ct-Open-Source/noderedexamples/tree/master/magazine/c-t%205-19-%20P.%20134%20-%20Fritzbox).
Thanks to [@merlinschumacher](https://github.com/merlinschumacher)
