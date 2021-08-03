---
title: "Light Sensor"
description: "Light Sensor"
lead: ""
date: 2021-04-17T18:50:12.032Z
lastmod: 2021-08-03T23:21:00.000Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "LightSensor"
contributors: ["kilbamoo", "crxporter"]
---

## Examples

Example below uses tasmota firmware on an esp board to get ambient light level. Using TSL2561 light sensor.
Modify mqtt topic, mqtt broker, homekit bridge name as needed.
First it gets the mqtt topic, converts it to json.
From payload, we subtract the luminance and convert it to an integer with expected property for light sensor.

![flow](https://i.ibb.co/X7b62Fj/flowTSL.jpg)

```json
[{"id":"c11c22b3.917f2","type":"mqtt in","z":"8ac667fa.c2cec8","name":"sonoff12","topic":"tele/sonoff12/SENSOR","qos":"2","datatype":"auto","broker":"1e53b5d8.56e33a","x":76,"y":412,"wires":[["79b3e787.48c528"]]},{"id":"79b3e787.48c528","type":"json","z":"8ac667fa.c2cec8","name":"","property":"payload","action":"","pretty":false,"x":239,"y":413,"wires":[["6eb3b1bc.61b1d"]]},{"id":"9f8da133.70e86","type":"debug","z":"8ac667fa.c2cec8","name":"","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":646,"y":475,"wires":[]},{"id":"6eb3b1bc.61b1d","type":"function","z":"8ac667fa.c2cec8","name":"GetLumi","func":"msg.payload = {\n    CurrentAmbientLightLevel\t: parseInt(msg.payload.TSL2561.Illuminance)\n}\nreturn msg;\n","outputs":1,"noerr":0,"x":403,"y":413,"wires":[["9f8da133.70e86","8742cf23.9c419"]]},{"id":"8742cf23.9c419","type":"homekit-service","z":"8ac667fa.c2cec8","isParent":true,"bridge":"4c36a4e3.de153c","parentService":"","name":"LichtNiveau","serviceName":"LightSensor","topic":"","filter":false,"manufacturer":"JeroVanl","model":"TSL2561","serialNo":"01/04/2019","characteristicProperties":"{}","x":652,"y":414,"wires":[[]]},{"id":"1e53b5d8.56e33a","type":"mqtt-broker","z":"","name":"MQTTonRasp","broker":"192.168.2.61","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","closeTopic":"","closeQos":"0","closePayload":"","willTopic":"","willQos":"0","willPayload":""},{"id":"4c36a4e3.de153c","type":"homekit-bridge","z":"","bridgeName":"BridgeOnNodeRed","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"JeroVanl","model":"MQTT_Talk","serialNo":"24/03/2019","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true}]
```
