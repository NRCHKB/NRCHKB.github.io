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

ESP is a microcontroller integrated circuit with Wi-Fi connection and very inexpensive.\
There are several versions of ESP including ESP32 which is the latest version. It is more powerful and integrates Bluetooth connection.
There are also Sonoff modules that integrate an ESP but the original firmware is not compatible with Homekit.\
To solve this problem, [ESP Easy](https://www.letscontrolit.com/wiki/index.php?title=ESPEasy) or [Tasmota](https://tasmota.github.io/docs/About/) firmware can be used to transform the ESP module into a simple multi-function sensor device for home automation solutions.

## Why use an ESP with Node-RED ?

Tasmota and ESP Easy integrate easily with many home automation solutions like Domoticz but integration into Homekit using Homebridge is not perfect and not more configurable.

## Wich ESP to choose ?

So you have a choice: you can buy a plug-and-play module like the one offered by sonoff or even use a basic sonoff and add components like the DHT11 for temperature and humidity sensor to it.\
If you are looking for DIY you also have the option to buy an ESP8266 or ESP32 and put whatever you want in it.

## Which firmware to choose for Flashing ?

There are several firmware but I used the two most current.
They are similar in their operation. If you want to use a simple sensor use Tasmota on the contrary if you want to create rules (advance use) use ESP Easy.

- [Tasmota](https://tasmota.github.io/docs/Getting-Started/)
- [ESPEasy](https://www.letscontrolit.com/wiki/index.php/ESPEasy#Get_started)

## Using in Node-RED

The use in Node-RED is done using the nodes `MQTT in` and` MQTT out`. If you don't have an MQTT Server, you can install [Mosquitto](https://mosquitto.org/blog/2013/01/mosquitto-debian-repository/).
Then you must configure the address of the server and the identifiers in the `MQTT` node as well as the `Topic`. The `Topic` is very important because it's it who will allow you to publish and read the messages on the server.\
To do this, you have two possibilities :

### Domoticz Topic

The advantage of using domoticz is that you don't have to change the default topic settings into the ESP.
The identifier of your ESP will be `idx` in the message.

Topic : **domoticz/in** for `MQTT in` and **domoticz/out** for ` MQTT out` node.

Example message at the output of the `MQTT in` node :

```
msg.payload = {
    "idx": 1,
    "nvalue": 0,
    "svalue":''
}
```

[Read more about MQTT for Domoticz](https://piandmore.wordpress.com/2019/02/04/mqtt-out-for-domoticz/)

### Manual Topic

The identifier of your ESP will be the name of your Topic.

%topic%/%prefix%/

cmnd/
state/
