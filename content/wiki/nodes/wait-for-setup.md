---
title: "Wait For Setup"
description: "Dynamic configuration of the Characteristic Properties of your Service Node"
lead: "Dynamic configuration of the Characteristic Properties of your Service Node."
date: 2021-08-03T00:00:00+02:00
draft: false
images: []
menu:
  docs:
    parent: "nodes"
weight: 90
toc: true
contributors: ["crxporter", "Toshik", "Shaquu"]
---

## What is that

Wait For Setup feature allows dynamic configuration of the Characteristic Properties of a Service Node before its initialization. In other words, it allows you to configure your Characteristic Properties with values from external sources.

{{< alert icon="⚠️" >}}Service Node will remain in initialization (will not appear in Home.app) until it has received its configuration message. Once this message has been sent, it cannot be changed unless you redeploy your flow.{{< /alert >}}

## How to use it

Go to your Service Node and check the option `Wait for Setup` then create a Message that will have the following structure:

```json
{
 "nrchkb": {
 "setup": {
 "... setup properties go here"
 }
 }
}
```

In the `setup` part you may specify properties to configure accessories, such as `name`, `model`, `manufacturer`, and other properties available on the `HomeKit` node.

To configure accessory characteristics `setup` should contain `characteristicProperties` **string** JSON representation for Characteristics Properties as seen in the HomeKit node properties page.

All properties passed in the `setup` part of the Setup Message will be merged with properties explicitly set in the node properties page, so you may specify only properties to override those on the properties page.

Also, the feature allows configuring the homekit node based on some external variables.

## Example

Here is an example of how to configure the HomeKit node to set accessory name based on `ACCESSORY_NAME` variable and `ColorTemperature` feature will be enabled in case `FEATURE_COLOR_TEMPERATURE` variable is `true`:

```json
[
  {
    "id": "3550fe6c.93d6a2",
    "type": "inject",
    "z": "93ad7680.969cb8",
    "name": "",
    "props": [
      { "p": "payload" },
      {
        "p": "payload.nrchkb.setup.characteristicProperties",
        "v": "'{\t \"On\": true,\t \"Brightness\": true\t ' & ($env('FEATURE_COLOR_TEMPERATURE') ? ',\"ColorTemperature\": true' : '' ) & '\t}'",
        "vt": "jsonata"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": true,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "{\t \"nrchkb\": {\t \"setup\": {\t \"name\": $env(\"ACCESSORY_NAME\"),\t \"characteristicProperties\": \"{}\"\t }\t }\t}",
    "payloadType": "jsonata",
    "x": 660,
    "y": 440,
    "wires": [["d73d1565.8d9568", "a954f617.e7b868"]]
  }
]
```
