---
title: "OMRON PLC"
description: "HomeKit for OMRON PLCs"
lead: ""
date: 2021-10-23T18:26:33+02:00
lastmod: 2021-10-23T18:48:40+02:00
draft: false
images: []
menu:
  docs:
    parent: "examples"
weight: 100
toc: true
contributors: ["Shaquu"]
---

## What Is a Programmable Controller?

A programmable controller (PLC) has a microprocessor and controls devices through custom user programs.
A PLC receives signals from input devices and makes decisions based on custom programs to control output devices.

[Read more about OMRON PLC](https://www.ia.omron.com/support/guide/26/introduction.html)

## Using in Node-RED

1. Install [`node-red-contrib-omron-fins`](https://github.com/Steve-Mcl/node-red-contrib-omron-fins) and [`node-red-contrib-buffer-parser`](https://github.com/Steve-Mcl/node-red-contrib-buffer-parser).
2. Configure the `Read PLC` and `Write PLC` nodes with address of the device on your PLC.
3. Configure the `Buffer-Parser` nodes to convert `Int16` to `16bits` values.
4. Change address configured in `function nodes` by desired address.
5. Configure the `HomeKit` configuration node.

## Example flows

- [Contact Sensor]({{< ref "/wiki/service/contact-sensor.md#implementation-with-an-omron-plc" >}} "Contact Sensor - OMRON PLC")
- [Lightbulb]({{< ref "/wiki/service/lightbulb.md#implementation-with-an-omron-plc" >}} "Lightbulb - OMRON PLC")
- [Smoke Sensor]({{< ref "/wiki/service/smoke-sensor.md#implementation-with-an-omron-plc" >}} "Smoke Sensor - OMRON PLC")
