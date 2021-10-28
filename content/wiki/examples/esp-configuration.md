---
title: "ESP Configuration"
description: "ESP Configuration"
lead: ""
date: 2021-10-28T15:03:28.815Z
lastmod: 2021-10-28T15:03:28.815Z
draft: false
images: []
menu:
  docs:
    parent: "examples"
weight: 1
toc: true
contributors: ["GogoVega"]
---

## What is an ESP ?

ESP is a microcontroller integrated circuit with Wi-Fi connection and very inexpensive.
The Sonoff modules integrate an ESP but the original firmware is not compatible with Homekit.
The [ESP Easy] or [Tasmota] firmware can be used to turn the ESP module into an easy multifunction sensor device for Home Automation solutions.

## Why use an ESP with Node-RED ?

Tasmota and ESP Easy integrate easily with many home automation solutions like Domoticz but integration into Homekit using Homebridge is not perfect and not configurable.

## Wich ESP to choose (MAYBE NOT UTILE)

So the choice is yours : you can buy a ready-made module like what sonoff offers or even use a basic sonoff and add components to it like DHT11 for Temperature and Humidity Sensor.
If you search DIY you also have the possibility to buy an ESP8266 or ESP32 and integrate everything you want on it.

## Which firmware to choose for Flashing

- [Tasmota](https://tasmota.github.io/docs/Getting-Started/) Simple but not MQTT rules
- [ESPEasy](https://www.letscontrolit.com/wiki/index.php/ESPEasy#Get_started) more complicated but more polivalent


## Using in Node-RED

The use in Node-RED is done using the nodes `MQTT in` and` MQTT out`. To do this, you have the choice between the following protocols :

### Domoticz MQTT

Topic : domoticz/in for `MQTT in` and domoticz/out for ` MQTT out` node.


Example message at the output of the `MQTT in` node :

```
msg.payload = {
    "idx": 1,
    "nvalue": 0,
    "svalue":''
}
```

[Read more about MQTT for Domoticz](https://piandmore.wordpress.com/2019/02/04/mqtt-out-for-domoticz/)

### OpenHAB 
