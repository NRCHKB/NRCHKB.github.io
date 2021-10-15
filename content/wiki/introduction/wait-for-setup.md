---
title: "Wait For Setup"
description: "Wait For Setup"
lead: ""
date: 2021-08-03T00:00:00+02:00
lastmod: 2021-10-15T22:06:03.701Z
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 90
toc: true
contributors: ["crxporter","Toshik","Shaquu"]
---

Wait For Setup feature allows to perform actual accessory configuration in bridge on incoming Setup Message.

Setup Message structure is:

```json
{
   "nrchkb": {
       "setup": {
           ... setup properties goes here
       }
    }
}
```

In the `setup` part you may specify properties to configure accessory, such as `name`, `model`, `manufacturer` and other properties available on `homekit` node.

To configure accessory characteristics `setup` should contain `characteristicProperties` **string** JSON representation for Characteristics Properties as seen in homekit node properties page.

All properties passed in `setup` part of Setup Message will be merged with properties explicitly set in node properties page, so you may specify only properties to override those in properties page.

Also, feature allows configuring homekit node based on some external variables.

Here is an example how to configure homekit node to set accessory name based on `ACCESSORY_NAME` variable and `ColorTemperature` feature will be enambel in case `FEATURE_COLOR_TEMPERATURE` variable is `true`:

```json
[{"id":"3550fe6c.93d6a2","type":"inject","z":"93ad7680.969cb8","name":"","props":[{"p":"payload"},{"p":"payload.nrchkb.setup.characteristicProperties","v":"'{\t   \"On\": true,\t   \"Brightness\": true\t   ' & ($env('FEATURE_COLOR_TEMPERATURE') ? ',\"ColorTemperature\": true' : '' ) & '\t}'","vt":"jsonata"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"{\t   \"nrchkb\": {\t       \"setup\": {\t           \"name\": $env(\"ACCESSORY_NAME\"),\t           \"characteristicProperties\": \"{}\"\t        }\t    }\t}","payloadType":"jsonata","x":660,"y":440,"wires":[["d73d1565.8d9568","a954f617.e7b868"]]}]
```
