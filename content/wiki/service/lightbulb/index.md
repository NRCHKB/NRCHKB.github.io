---
title: "Light Bulb"
description: "This service describes a light bulb."
lead: ""
date: 2021-04-05T11:54:45.000Z
draft: false
images: ["preview.png"]
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "Lightbulb"
---


## Examples

These examples are meant to be copied into your Node-RED system and adapted to your setup.

### On/Off Light

This is the simplest example of a light bulb item. The input nodes are "On" and "Off". The debug node will return values when the switch is turned on or off via the Home app on an Apple device.

![On Off Light](lighbulb_on_off_example.png)

Copyable Node-RED flow:

```json
[{"id":"ed2d8340.e1d5d8","type":"homekit-service","z":"7b43483c.39305","bridge":"d334490b.40dac","name":"Example Bulb OnOff","serviceName":"Lightbulb","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{}","x":380,"y":160,"wires":[["5844674e.178708"]]},{"id":"5844674e.178708","type":"debug","z":"7b43483c.39305","name":"HomeKit Out","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":590,"y":160,"wires":[]},{"id":"8db975bc.c2e9d","type":"inject","z":"7b43483c.39305","name":"On","topic":"","payload":"{\"On\":true}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":120,"wires":[["ed2d8340.e1d5d8"]]},{"id":"629771.da7c409","type":"inject","z":"7b43483c.39305","name":"Off","topic":"","payload":"{\"On\":false}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":180,"wires":[["ed2d8340.e1d5d8"]]},{"id":"d334490b.40dac","type":"homekit-bridge","z":"","bridgeName":"Example Bridge","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

### Dimmable Light

This is an example of a dimmable light bulb item. The input nodes are "On" and "Off" also there is a "Brightness" input that will send a random brightness level to your item.

The `On` state and `Brightness` may be sent in the same payload for example:

```json
{
  "On": true,
  "Brightness": 75
}
```

If `{"On": true}` is sent without a brightness payload, HomeKit will return to the last set brightness on the device. In this example, there are 2 functions. The `Brightness to HomeKit` function translates an integer number range 1-100 into a proper payload for the HomeKit node. The `Brightness to Integer` function node translates the output of the HomeKit node back into an integer level 0-100 where 0 is "off". Additionally, the `Brightness to Integer` node saves the previously used brightness value (as a context variable) to pass on in the case that HomeKit sends `{"On": true}` without any `Brightness` value.

![Dimmable Light](lighbulb_dimmable_example.png)

#### Characteristic Properties

Use the following JSON in your characteristic properties so the Home app shows a dimmable bulb by default.

```json
{
  "Brightness": true
}
```

#### Example

Copyable Node-RED flow:

```json
[{"id":"ed2d8340.e1d5d8","type":"homekit-service","z":"7b43483c.39305","bridge":"d334490b.40dac","name":"Example Bulb OnOff","serviceName":"Lightbulb","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\"Brightness\":true}","x":600,"y":160,"wires":[["5844674e.178708","71e17ac6.d31024"]]},{"id":"5844674e.178708","type":"debug","z":"7b43483c.39305","name":"HomeKit Out","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":870,"y":160,"wires":[]},{"id":"8db975bc.c2e9d","type":"inject","z":"7b43483c.39305","name":"On","topic":"","payload":"{\"On\":true}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":120,"wires":[["ed2d8340.e1d5d8"]]},{"id":"629771.da7c409","type":"inject","z":"7b43483c.39305","name":"Off","topic":"","payload":"{\"On\":false}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":180,"wires":[["ed2d8340.e1d5d8"]]},{"id":"1bc33e3a.60be9a","type":"function","z":"7b43483c.39305","name":"Brightness to HomeKit","func":"var input = msg.payload;\nif (input < 101){\n    if (input < 1) {\n        msg.payload = {\n        \"On\": false\n    }\n    }\n    else {\n        msg.payload = {\n        \"Brightness\": input,\n        \"On\": true\n    }\n    }\n    return msg;\n}","outputs":1,"noerr":0,"x":460,"y":240,"wires":[["ed2d8340.e1d5d8"]]},{"id":"71e17ac6.d31024","type":"function","z":"7b43483c.39305","name":"Brightness to Integer","func":"var b = context.get('b')||0;\nif(msg.payload.Brightness){\n    b = msg.payload.Brightness;\n    context.set('b',b);\n    msg.payload=b\n}\n\n// Uncomment lines 9 and 20 to prevent looping\n//if (msg.hap.context !== undefined) {\n    if(msg.payload.Brightness === 0){\n        msg.payload = 0\n    }\n    if(msg.payload.On === false){\n        msg.payload = 0\n    }\n    if(msg.payload.On === true){\n        msg.payload = b\n    }\n    return msg\n//}","outputs":1,"noerr":0,"x":760,"y":240,"wires":[["309c6439.b99464"]]},{"id":"f3d77f18.27dbf8","type":"random","z":"7b43483c.39305","name":"Random","low":"0","high":"100","inte":"true","property":"payload","x":280,"y":240,"wires":[["1bc33e3a.60be9a"]]},{"id":"309c6439.b99464","type":"debug","z":"7b43483c.39305","name":"Brightness Out","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":980,"y":240,"wires":[]},{"id":"c9205543.2990f8","type":"inject","z":"7b43483c.39305","name":"Send brightness","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":120,"y":240,"wires":[["f3d77f18.27dbf8"]]},{"id":"d334490b.40dac","type":"homekit-bridge","z":"","bridgeName":"Example Bridge","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

For a further example how to apply a dimmable light have a look on [this page of our wiki](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/wiki/Example-Stateless-Programmable-Switch).

### Color Light (HSV with MQTT input/output)

This example is of a color light bulb item. It uses 4 separate MQTT topics for input and output. The topics used in the example are:

- `kitchenws/hue` for hue, range 0-360
- `kitchenws/sat` for saturation, range 0-100
- `kitchenws/val` for brightness or value, range 0-100
- `kitchenws/function` for power state, can be `ON` or `OFF`

The use case of this example is an ESP8266 running a custom Arduino sketch (built on [FastLED](http://fastled.io)). The arduino subscribes and publishes to the same topics listed above. The hardware used is an esp-01 and a string of ws2812 RGB lights.

The function nodes simply change the inputs into JSON format readable by HomeKit then back from JSON to numbers or strings for MQTT.

![HSV MQTT Light](lighbulb_hsv_mqtt_example.png)

#### Characteristic Properties

Use the following JSON in your characteristic properties for the bulb to show in the Home app as a color/brightness bulb.

```json
{
    "Brightness": true,
    "Hue": true,
    "Saturation": true
}
```

#### Example

Copyable Node-RED code:

```json
[{"id":"58abab1.2339654","type":"mqtt in","z":"73af6e5e.58fa08","name":"","topic":"kitchenws/sat","qos":"1","broker":"57430b.f40734f4","x":110,"y":620,"wires":[["d171bb04.65ae1"]]},{"id":"d171bb04.65ae1","type":"function","z":"73af6e5e.58fa08","name":"To homekit","func":"if(msg.topic == \"kitchenws/hue\"){\n    var hue = msg.payload;\n    msg.payload = {\n        \"Hue\":hue\n    }\n    return [msg];\n}\nif(msg.topic == \"kitchenws/sat\"){\n    var sat = msg.payload;\n    msg.payload = {\n        \"Saturation\":sat\n    }\n    return [msg];\n}\nif(msg.topic == \"kitchenws/val\"){\n    var val = msg.payload;\n    msg.payload = {\n        \"Brightness\":val\n    }\n    return [msg];\n}\nif(msg.topic == \"kitchenws/function\"){\n    if(msg.payload == \"ON\"){\n        msg.payload = {\n            \"On\":true\n        }\n        return [msg];\n    }\n    if(msg.payload == \"OFF\"){\n        msg.payload = {\n            \"On\":false\n        }\n        return [msg];\n    }\n}","outputs":1,"noerr":0,"x":370,"y":640,"wires":[["75501318.6b43ec"]]},{"id":"75501318.6b43ec","type":"homekit-service","z":"73af6e5e.58fa08","bridge":"4b4fbb6e.6cfaec","name":"Countertop","serviceName":"Lightbulb","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"Brightness\":true,\n    \"Hue\":true,\n    \"Saturation\":true\n}","x":550,"y":640,"wires":[["e421e87d.3f0948"]]},{"id":"8294d2c0.7b538","type":"mqtt in","z":"73af6e5e.58fa08","name":"","topic":"kitchenws/hue","qos":"1","broker":"57430b.f40734f4","x":120,"y":560,"wires":[["d171bb04.65ae1"]]},{"id":"bd574d89.5545d8","type":"mqtt in","z":"73af6e5e.58fa08","name":"","topic":"kitchenws/val","qos":"1","broker":"57430b.f40734f4","x":110,"y":680,"wires":[["d171bb04.65ae1"]]},{"id":"5ad6f814.e774a","type":"mqtt in","z":"73af6e5e.58fa08","name":"","topic":"kitchenws/function","qos":"1","broker":"57430b.f40734f4","x":130,"y":740,"wires":[["d171bb04.65ae1"]]},{"id":"e421e87d.3f0948","type":"function","z":"73af6e5e.58fa08","name":"To MQTT","func":"if(msg.hap.context !== undefined){\n    if(msg.payload.On === true){\n        return [null,null,null,{\"payload\":\"ON\"}];\n    }\n    if(msg.payload.On === false){\n        return [null,null,null,{\"payload\":\"OFF\"}];\n\n    }\n    if(msg.payload.Hue !== undefined){\n        var hue = msg.payload.Hue;\n        return [{\"payload\":hue},null,null,null];\n    }\n    if(msg.payload.Saturation !== undefined){\n        var sat = msg.payload.Saturation;\n        return [null,{\"payload\":sat},null,null];\n    }\n    if(msg.payload.Brightness !== undefined){\n        var bright = msg.payload.Brightness;\n        return [null,null,{\"payload\":bright},null];\n    }\n}","outputs":4,"noerr":0,"x":720,"y":640,"wires":[["ecd2fcfe.bdd898"],["eac1313.36a6bd"],["21f736c6.3e3d42"],["8d2b6ebc.dad2b"]]},{"id":"ecd2fcfe.bdd898","type":"mqtt out","z":"73af6e5e.58fa08","name":"","topic":"kitchenws/hue","qos":"1","retain":"false","broker":"57430b.f40734f4","x":940,"y":560,"wires":[]},{"id":"eac1313.36a6bd","type":"mqtt out","z":"73af6e5e.58fa08","name":"","topic":"kitchenws/sat","qos":"1","retain":"false","broker":"57430b.f40734f4","x":940,"y":620,"wires":[]},{"id":"21f736c6.3e3d42","type":"mqtt out","z":"73af6e5e.58fa08","name":"","topic":"kitchenws/val","qos":"1","retain":"false","broker":"57430b.f40734f4","x":940,"y":680,"wires":[]},{"id":"8d2b6ebc.dad2b","type":"mqtt out","z":"73af6e5e.58fa08","name":"","topic":"kitchenws/function","qos":"1","retain":"false","broker":"57430b.f40734f4","x":950,"y":740,"wires":[]},{"id":"57430b.f40734f4","type":"mqtt-broker","z":"","name":"OHMQTT","broker":"localhost","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthRetain":"false","birthPayload":"","closeTopic":"","closeQos":"0","closeRetain":"false","closePayload":"","willTopic":"","willQos":"0","willRetain":"false","willPayload":""},{"id":"4b4fbb6e.6cfaec","type":"homekit-bridge","z":"","bridgeName":"Node Red","pinCode":"514-02-658","port":"","manufacturer":"Garrett Porter","model":"Pi3","serialNo":"Rev.1"}]
```

### Color Light (with color space conversions)

This is an example of a color light bulb item. The input nodes include off, red, green, blue, and white for each of 3 different color spaces. Please note the color convert node is required for this flow to work properly - unless your inputs/outputs are already HSV format. Please find information about the [color convert node here](https://flows.nodered.org/node/node-red-contrib-color-convert).

Depending on your hardware, it is likely that you will be using HSV, RGB, or HSL color format. HomeKit uses the HSV color space. Provided in this flow are functions that create off, red, green, blue, and white arrays for each of these color spaces. These arrays are then converted to HSV and sent to the HomeKit node. (note HSV is also called HSB, these are equivalent)

Simply replace the correct `Input` node with your input and the correct `Output` debug node with your output. Note there is loop prevention built into the `Output` function so the outgoing messages are only sent when originating within the Home app on your device.

![Color Spaces Light](lighbulb_color_spaces_example.png)

Copyable node-red flow:

```json
[{"id":"6c90892b.b229a","type":"inject","z":"8ab94716.868738","name":"RGB Red","topic":"","payload":"Red","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":1020,"wires":[["faed9f12.16cd1"]]},{"id":"faed9f12.16cd1","type":"function","z":"8ab94716.868738","name":"RGB Input","func":"if(msg.payload == \"Off\"){\n    return[{\"payload\":[0,0,0]}]\n}\nif(msg.payload == \"Red\"){\n    return[{\"payload\":[255,0,0]}]\n}\nif(msg.payload == \"Green\"){\n    return[{\"payload\":[0,255,0]}]\n}\nif(msg.payload == \"Blue\"){\n    return[{\"payload\":[0,0,255]}]\n}\nif(msg.payload == \"White\"){\n    return[{\"payload\":[255,255,255]}]\n}\n","outputs":1,"noerr":0,"x":290,"y":1040,"wires":[["df96d518.9356e8"]]},{"id":"76ba113d.5f2f78","type":"inject","z":"8ab94716.868738","name":"RGB Off","topic":"","payload":"Off","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":980,"wires":[["faed9f12.16cd1"]]},{"id":"3d806d56.009ff2","type":"inject","z":"8ab94716.868738","name":"RGB Green","topic":"","payload":"Green","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":110,"y":1060,"wires":[["faed9f12.16cd1"]]},{"id":"7226341b.12915c","type":"inject","z":"8ab94716.868738","name":"RGB Blue","topic":"","payload":"Blue","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":1100,"wires":[["faed9f12.16cd1"]]},{"id":"448b762c.ea0d08","type":"inject","z":"8ab94716.868738","name":"RGB White","topic":"","payload":"White","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":1140,"wires":[["faed9f12.16cd1"]]},{"id":"df96d518.9356e8","type":"color-convert","z":"8ab94716.868738","input":"rgb","output":"hsv","outputType":"array","x":490,"y":1040,"wires":[["e9ba32f3.ba157"]]},{"id":"e9ba32f3.ba157","type":"function","z":"8ab94716.868738","name":"Format","func":"var outmsg={};\nvar Hue = flow.get('Hue')||0;\nvar Saturation = flow.get('Saturation')||0;\nvar Brightness = flow.get('Brightness')||100;\n\nif(msg.payload[0]===0 && msg.payload[1]===0 && msg.payload[2]===0){\n    outmsg.payload={\"On\":false};\n} else{\n    Hue = msg.payload[0];\n    flow.set('Hue',Hue);\n    Saturation = msg.payload[1];\n    flow.set('Saturation',Saturation);\n    Brightness = msg.payload[2];\n    flow.set('Brightness',Brightness);\n    outmsg.payload={\n        \"On\":true,\n        \"Hue\":Hue,\n        \"Saturation\":Saturation,\n        \"Brightness\":Brightness\n    }\n}\nreturn [outmsg];\n","outputs":1,"noerr":0,"x":680,"y":1260,"wires":[["42123222.b7e504"]]},{"id":"42123222.b7e504","type":"homekit-service","z":"8ab94716.868738","isParent":true,"bridge":"63a21f39.7ace9","parentService":"","name":"HSV light","serviceName":"Lightbulb","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"Brightness\":true,\n    \"Hue\":true,\n    \"Saturation\":true\n}","x":820,"y":1260,"wires":[["3d71759d.d3f53a","8c376820.c4396"]]},{"id":"7e3120e3.3af968","type":"function","z":"8ab94716.868738","name":"HSV Input","func":"if(msg.payload == \"Off\"){\n    return[{\"payload\":[0,0,0]}]\n}\nif(msg.payload == \"Red\"){\n    return[{\"payload\":[0,100,100]}]\n}\nif(msg.payload == \"Green\"){\n    return[{\"payload\":[120,100,100]}]\n}\nif(msg.payload == \"Blue\"){\n    return[{\"payload\":[240,100,100]}]\n}\nif(msg.payload == \"White\"){\n    return[{\"payload\":[0,0,100]}]\n}\n","outputs":1,"noerr":0,"x":530,"y":1260,"wires":[["e9ba32f3.ba157"]]},{"id":"709af2e1.0ee534","type":"color-convert","z":"8ab94716.868738","input":"hsl","output":"hsv","outputType":"array","x":490,"y":1480,"wires":[["e9ba32f3.ba157"]]},{"id":"3d71759d.d3f53a","type":"function","z":"8ab94716.868738","name":"Output","func":"var Hue = flow.get('Hue')||0;\nvar Saturation = flow.get('Saturation')||0;\nvar Brightness = flow.get('Brightness')||100;\n\nif(msg.payload.Hue){\n    Hue = msg.payload.Hue;\n    flow.set('Hue',Hue);\n}\nif(msg.payload.Saturation){\n    Saturation = msg.payload.Saturation;\n    flow.set('Saturation',Saturation);\n}\nif(msg.payload.Brightness){\n    Brightness = msg.payload.Brightness;\n    flow.set('Brightness',Brightness);\n}\nif (msg.hap.context !== undefined) {\n    if(msg.payload.On === true){\n        return [{\"payload\":[Hue,Saturation,Brightness]}]\n    }\n    if(msg.payload.On === false){\n        return [{\"payload\":[0,0,0]}]\n    }\n    else{\n        return [{\"payload\":[Hue,Saturation,Brightness]}]\n    }\n}","outputs":1,"noerr":0,"x":970,"y":1260,"wires":[["378a5cc2.a2fb14","c2ba3395.dd7958","26f78f6b.3ba1a8"]]},{"id":"8c376820.c4396","type":"debug","z":"8ab94716.868738","name":"HomeKit output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":940,"y":1340,"wires":[]},{"id":"429f936e.8cbdf4","type":"inject","z":"8ab94716.868738","name":"HSV Off","topic":"","payload":"Off","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":330,"y":1200,"wires":[["7e3120e3.3af968"]]},{"id":"418d88dc.c1b87","type":"inject","z":"8ab94716.868738","name":"HSV Red","topic":"","payload":"Red","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":340,"y":1240,"wires":[["7e3120e3.3af968"]]},{"id":"d3b4ad7.b57e05","type":"inject","z":"8ab94716.868738","name":"HSV Green","topic":"","payload":"Green","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":340,"y":1280,"wires":[["7e3120e3.3af968"]]},{"id":"4a4c3806.1b2c78","type":"inject","z":"8ab94716.868738","name":"HSV Blue","topic":"","payload":"Blue","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":340,"y":1320,"wires":[["7e3120e3.3af968"]]},{"id":"c58a6f7a.75a37","type":"inject","z":"8ab94716.868738","name":"HSV White","topic":"","payload":"White","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":340,"y":1360,"wires":[["7e3120e3.3af968"]]},{"id":"e8e3d457.abe05","type":"function","z":"8ab94716.868738","name":"HSL Input","func":"if(msg.payload == \"Off\"){\n    return[{\"payload\":[0,0,0]}]\n}\nif(msg.payload == \"Red\"){\n    return[{\"payload\":[0,100,50]}]\n}\nif(msg.payload == \"Green\"){\n    return[{\"payload\":[120,100,50]}]\n}\nif(msg.payload == \"Blue\"){\n    return[{\"payload\":[240,100,50]}]\n}\nif(msg.payload == \"White\"){\n    return[{\"payload\":[0,0,100]}]\n}\n","outputs":1,"noerr":0,"x":280,"y":1480,"wires":[["709af2e1.0ee534"]]},{"id":"378a5cc2.a2fb14","type":"color-convert","z":"8ab94716.868738","input":"hsv","output":"rgb","outputType":"array","x":1150,"y":1040,"wires":[["a2de29b9.6cf5a8"]]},{"id":"c2ba3395.dd7958","type":"debug","z":"8ab94716.868738","name":"HSV output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":1230,"y":1260,"wires":[]},{"id":"26f78f6b.3ba1a8","type":"color-convert","z":"8ab94716.868738","input":"hsv","output":"hsl","outputType":"array","x":1150,"y":1480,"wires":[["a514f44e.e7227"]]},{"id":"476847d9.8f77f","type":"inject","z":"8ab94716.868738","name":"HSL Red","topic":"","payload":"Red","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":1460,"wires":[["e8e3d457.abe05"]]},{"id":"9a4225a0.3ecab","type":"inject","z":"8ab94716.868738","name":"HSL Off","topic":"","payload":"Off","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":90,"y":1420,"wires":[["e8e3d457.abe05"]]},{"id":"9e02a9f3.eef378","type":"inject","z":"8ab94716.868738","name":"HSL Green","topic":"","payload":"Green","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":1500,"wires":[["e8e3d457.abe05"]]},{"id":"62ad3f72.e1f078","type":"inject","z":"8ab94716.868738","name":"HSL Blue","topic":"","payload":"Blue","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":1540,"wires":[["e8e3d457.abe05"]]},{"id":"80199324.4b8e48","type":"inject","z":"8ab94716.868738","name":"HSL White","topic":"","payload":"White","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":1580,"wires":[["e8e3d457.abe05"]]},{"id":"a2de29b9.6cf5a8","type":"debug","z":"8ab94716.868738","name":"RGB output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":1330,"y":1040,"wires":[]},{"id":"a514f44e.e7227","type":"debug","z":"8ab94716.868738","name":"HSL output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":1330,"y":1480,"wires":[]},{"id":"893b1330.ebae9","type":"comment","z":"8ab94716.868738","name":"RGB TEST INPUTS","info":"","x":130,"y":940,"wires":[]},{"id":"91a405cc.7b88b8","type":"comment","z":"8ab94716.868738","name":"HSV TEST INPUTS","info":"","x":350,"y":1160,"wires":[]},{"id":"894ae6b4.b76b3","type":"comment","z":"8ab94716.868738","name":"HSL TEST INPUTS","info":"","x":110,"y":1380,"wires":[]},{"id":"63a21f39.7ace9","type":"homekit-bridge","z":"","bridgeName":"Dev2","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

Please note that if these functions are used multiple times within the same flow, then unique names will be required for the `flow.get` and `flow.set` variables in the functions.

### Implementation with a Sonoff-Tasmota flashed TuYa Wi-Fi Dimmer Switch

This is a node-red flow to integrate a Sonoff-Tasmota flashed [WiFi Dimmers](https://github.com/arendst/Tasmota/issues/4003) with HomeKit. This flow creates a dimmable light in HomeKit, and also detects if the device is disconnected, and sets the device as 'not responding' after 15 minutes.  This node-red flow would also work with dimmable light bulb's as well, but not color or RGB lightbulbs.

![Tasmota Example](lighbulb_tasmota_example.png)

To set this up for use in your environment you will need to change a couple of settings

1. Configure the MQTT In and Out Nodes configuration node with your MQTT server.
2. Set the topic on the MQTT In node to include your device name.  ie '+/sonoff-1790/#'
3. Configure the HomeKit configuration node for your setup
4. Set the Name of the HomeKit node for the name you want to use in HomeKit
5. Set the topic of the HomeKit to include your device name. ie 'cmnd/sonoff-1790/'

Copyable Node-RED code:

```json
[{"id":"f5bcc9a5.132dc8","type":"mqtt in","z":"3d8fb80e.d7c11","name":"Internet Down","topic":"+/sonoff-1790/#","qos":"0","datatype":"auto","broker":"b8c25d0c.8f5108","x":90,"y":160,"wires":[["14371369.7327f5","66d2df40.b7172"]]},{"id":"cf4812d8.2340a8","type":"mqtt out","z":"3d8fb80e.d7c11","name":"Internet Down","topic":"","qos":"0","retain":"","broker":"b8c25d0c.8f5108","x":780,"y":380,"wires":[]},{"id":"527452c0.d0bd54","type":"function","z":"3d8fb80e.d7c11","name":"HB to Tasmota","func":"var result;\nfor (var characteristic in msg.payload) {\n  console.log(\"characteristic\", characteristic, msg.payload[characteristic]);\n  switch (characteristic.toLowerCase()) {\n    case \"rotationspeed\":\n    case \"brightness\":\n      result = msg.payload[characteristic];\n      msg.topic = msg.topic + \"DIMMER\";\n      break;\n    case \"on\":\n      // msg.payload = ( msg.payload.On ? \"ON\" : \"OFF\" );\n      result = (msg.payload.On ? \"ON\" : \"OFF\");\n      msg.topic = msg.topic + \"POWER\";\n      break;\n    default:\n      console.log(\"Unhandled characteristic\", characteristic);\n  }\n}\nmsg.payload = result;\nreturn msg;","outputs":1,"noerr":0,"x":560,"y":380,"wires":[["d33b5eae.25dde","cf4812d8.2340a8"]]},{"id":"37b80aea.d13166","type":"debug","z":"3d8fb80e.d7c11","name":"Output","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":570,"y":440,"wires":[]},{"id":"84993b33.6c3518","type":"debug","z":"3d8fb80e.d7c11","name":"HomeKit","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":740,"y":100,"wires":[]},{"id":"d33b5eae.25dde","type":"debug","z":"3d8fb80e.d7c11","name":"sonoff","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":750,"y":440,"wires":[]},{"id":"db8ae8ef.05ec18","type":"inject","z":"3d8fb80e.d7c11","name":"status","topic":"cmnd/sonoff-1790/status","payload":"11","payloadType":"num","repeat":"","crontab":"","once":true,"onceDelay":"1","x":590,"y":320,"wires":[["cf4812d8.2340a8","b5a47782.8b04b"]]},{"id":"14371369.7327f5","type":"debug","z":"3d8fb80e.d7c11","name":"Status","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":270,"y":100,"wires":[]},{"id":"f99b3fb.edb3ec","type":"function","z":"3d8fb80e.d7c11","name":"sonoffToHomeKit","func":"var result = {};\nvar input = JSON.parse(msg.payload);\nif (input.StatusSTS) {\n  input = input.StatusSTS;\n}\nfor (var characteristic in input) {\n  // console.log(\"characteristic\", characteristic, msg.payload[characteristic]);\n  switch (characteristic.toLowerCase()) {\n    case \"dimmer\":\n      result[\"RotationSpeed\"] = input[characteristic];\n      break;\n    case \"power\":\n      // ( msg.payload === \"ON\" ? { \"On\": 1 } : { \"On\": 0 } );\n      result[\"On\"] = (input[characteristic] === \"ON\" ? 1 : 0);\n      break;\n    default:\n      // console.log(\"Unhandled characteristic\", characteristic);\n  }\n}\nmsg.payload = result;\nreturn msg;","outputs":1,"noerr":0,"x":510,"y":160,"wires":[["84993b33.6c3518","b98429b5.3be8e8"]]},{"id":"66d2df40.b7172","type":"switch","z":"3d8fb80e.d7c11","name":"Topic Router","property":"topic","propertyType":"msg","rules":[{"t":"regex","v":"(stat|tele)\\/.*\\/(RESULT|STATE|STATUS11)","vt":"str","case":true}],"checkall":"false","repair":false,"outputs":1,"x":290,"y":160,"wires":[["75b4d514.f515e4","f99b3fb.edb3ec","b5a47782.8b04b"]]},{"id":"75b4d514.f515e4","type":"debug","z":"3d8fb80e.d7c11","name":"Match","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":490,"y":100,"wires":[]},{"id":"b98429b5.3be8e8","type":"homekit-service","z":"3d8fb80e.d7c11","isParent":true,"bridge":"b94bcc8c.535138","accessoryCategory":"OTHER","parentService":"","name":"Internet Down","serviceName":"Lightbulb","topic":"cmnd/sonoff-1790/","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","characteristicProperties":"{\"Brightness\":true}","x":340,"y":380,"wires":[["527452c0.d0bd54","37b80aea.d13166"],[]]},{"id":"b5a47782.8b04b","type":"trigger","z":"3d8fb80e.d7c11","op1":"","op2":"0","op1type":"nul","op2type":"json","duration":"11","extend":true,"units":"min","reset":"","bytopic":"all","name":"","x":310,"y":260,"wires":[["da26578e.e58f9"]]},{"id":"da26578e.e58f9","type":"function","z":"3d8fb80e.d7c11","name":"No Response","func":"msg.payload = {On: 'NO_RESPONSE'};\nreturn msg;","outputs":1,"noerr":0,"x":500,"y":260,"wires":[["b98429b5.3be8e8","84993b33.6c3518","b5a47782.8b04b"]]},{"id":"b8c25d0c.8f5108","type":"mqtt-broker","z":"","name":"Sheldon","broker":"sheldon.local","port":"1883","clientid":"","usetls":false,"compatmode":false,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthRetain":"false","birthPayload":"","closeTopic":"","closeQos":"0","closeRetain":"false","closePayload":"","willTopic":"","willQos":"0","willRetain":"false","willPayload":""},{"id":"b94bcc8c.535138","type":"homekit-bridge","z":"","bridgeName":"air-dev-node-red","pinCode":"031-45-154","port":"51287","allowInsecureRequest":false,"manufacturer":"node-red","model":"Default Model","serialNo":"air-dev","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":false}]
```

### Implementation with an Omron PLC

This flow makes it possible to react with a lightbulb controlled by PLC. This example assumes you have set up an [OMRON PLC in Node-RED]({{< ref "/wiki/examples/omron-plc" >}} "OMRON PLC in Node-RED").

![Omron PLC Light](ligbulb_omron_plc_example.png)

In this example our PLC address is `CIO10`

The `Passthrough ?` node only allows messages from home app to pass in order to avoid overwriting on PLC.

Copyable Node-RED code:

```json
[{"id":"76feea1d7599c771","type":"inject","z":"5971b8a103c6ba33","name":"2s","props":[{"p":"time","v":"true","vt":"bool"}],"repeat":"2","crontab":"","once":false,"onceDelay":"0.5","topic":"","x":110,"y":160,"wires":[["2f8d0105be10bf04"]]},{"id":"2f8d0105be10bf04","type":"FINS Read Multiple","z":"5971b8a103c6ba33","name":"Read PLC","connection":"11b8375b.b1ee31","addressType":"str","address":"CIO10","msgPropertyType":"msg","msgProperty":"CIO_READ","outputFormatType":"signed","outputFormat":"","x":270,"y":160,"wires":[["26514893fd100d8d"]]},{"id":"1a244c0c67b72d42","type":"FINS Write","z":"5971b8a103c6ba33","name":"Write PLC","connection":"11b8375b.b1ee31","addressType":"msg","address":"ADDRESS","dataType":"msg","data":"WRITE","msgPropertyType":"msg","msgProperty":"payload","x":990,"y":320,"wires":[[]]},{"id":"26514893fd100d8d","type":"buffer-parser","z":"5971b8a103c6ba33","name":"Int16=>16b","data":"CIO_READ","dataType":"msg","specification":"spec","specificationType":"ui","items":[{"type":"16bitbe","name":"CIO10","offset":0,"length":1,"offsetbit":0,"scale":"1","mask":""}],"swap1":"","swap2":"","swap3":"","swap1Type":"swap","swap2Type":"swap","swap3Type":"swap","msgProperty":"CIO_READ","msgPropertyType":"str","resultType":"keyvalue","resultTypeType":"output","multipleResult":false,"fanOutMultipleResult":false,"setTopic":true,"outputs":1,"x":450,"y":160,"wires":[["15a70dec2ff162b2"]]},{"id":"f44c7d3075759d21","type":"function","z":"5971b8a103c6ba33","name":"Value to Write","func":"var CIO_Address = msg.topic.substr(0,5);\nvar Bit_Address = parseInt(msg.topic.substr(6,2));\nvar Write = parseInt((msg.payload.On) ? 1 : 0);\nvar READ = msg.READ_PLC.CIO10[0].bits;\n\nREAD[Bit_Address] = Write;\n\nnbr = parseInt (READ[15]+\"\"+READ[14]+\"\"+READ[13]+\"\"+READ[12]+\"\"+READ[11]+\"\"+READ[10]+\"\"+READ[9]+\"\"+READ[8]+\"\"+READ[7]+\"\"+READ[6]+\"\"+READ[5]+\"\"+READ[4]+\"\"+READ[3]+\"\"+READ[2]+\"\"+READ[1]+\"\"+READ[0]);\n\nconst convert = {\n  bin2dec : s => parseInt(s, 2).toString(10)\n};\n\n\nmsg.ADDRESS = CIO_Address;\nmsg.WRITE = parseInt (convert.bin2dec(nbr));\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":800,"y":320,"wires":[["1a244c0c67b72d42"]]},{"id":"4d4fd86c38236bc3","type":"FINS Read Multiple","z":"5971b8a103c6ba33","name":"Read PLC","connection":"11b8375b.b1ee31","addressType":"str","address":"CIO10","msgPropertyType":"msg","msgProperty":"CIO_READ","outputFormatType":"signed","outputFormat":"","x":430,"y":320,"wires":[["04fd430dbce0a26b"]]},{"id":"04fd430dbce0a26b","type":"buffer-parser","z":"5971b8a103c6ba33","name":"Int16=>16b","data":"CIO_READ","dataType":"msg","specification":"spec","specificationType":"ui","items":[{"type":"16bitbe","name":"CIO10","offset":0,"length":1,"offsetbit":0,"scale":"1","mask":""}],"swap1":"","swap2":"","swap3":"","swap1Type":"swap","swap2Type":"swap","swap3Type":"swap","msgProperty":"CIO_READ","msgPropertyType":"str","resultType":"keyvalue","resultTypeType":"output","multipleResult":false,"fanOutMultipleResult":false,"setTopic":true,"outputs":1,"x":610,"y":320,"wires":[["f44c7d3075759d21"]]},{"id":"87168102320f8b34","type":"homekit-service","z":"5971b8a103c6ba33","isParent":true,"hostType":"0","bridge":"5b5f6f73.10106","accessoryId":"","parentService":"","name":"Light 1","serviceName":"Lightbulb","topic":"CIO10.00","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":2,"x":770,"y":40,"wires":[["3952732fe1122364"],[]]},{"id":"3952732fe1122364","type":"function","z":"5971b8a103c6ba33","name":"Passthrough ?","func":"if (msg.hap.session) {\n    // Do stuff if it's from homekit\n    return msg;\n    \n} else {\n    // Do different stuff if it's not from homekit\n    return;\n}","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":980,"y":100,"wires":[["4d4fd86c38236bc3"]]},{"id":"15a70dec2ff162b2","type":"function","z":"5971b8a103c6ba33","name":"CIO10","func":"var outputMsgs = [];\nvar CIO_READ = msg.CIO_READ.CIO10[0].bits;\n\nfor (var n in CIO_READ) {\n    outputMsgs.push({payload:{\"On\":(CIO_READ[n])?true:false}});\n}\nreturn outputMsgs;","outputs":16,"noerr":0,"initialize":"","finalize":"","libs":[],"x":610,"y":160,"wires":[["87168102320f8b34"],["84175b2d0291d733"],["1d46d43aaedbfc8d"],[],[],[],[],[],[],[],[],[],[],[],[],[]],"inputLabels":["CIO10"],"outputLabels":["10.00","10.01","10.02","10.03","10.04","10.05","10.06","10.07","10.08","10.09","10.10","10.11","10.12","10.13","10.14","10.15"]},{"id":"84175b2d0291d733","type":"homekit-service","z":"5971b8a103c6ba33","isParent":true,"hostType":"0","bridge":"5b5f6f73.10106","accessoryId":"","parentService":"","name":"Light 2","serviceName":"Lightbulb","topic":"CIO10.01","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":2,"x":770,"y":100,"wires":[["3952732fe1122364"],[]]},{"id":"1d46d43aaedbfc8d","type":"homekit-service","z":"5971b8a103c6ba33","isParent":true,"hostType":"0","bridge":"5b5f6f73.10106","accessoryId":"","parentService":"","name":"Light 3","serviceName":"Lightbulb","topic":"CIO10.02","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":2,"x":770,"y":160,"wires":[["3952732fe1122364"],[]]},{"id":"11b8375b.b1ee31","type":"FINS Connection","name":"PLC","host":"192.168.1.2","port":"9600","MODE":"","MODEType":"CS","protocol":"","protocolType":"udp","ICF":"","DNA":"","DA1":"2","DA2":"","SNA":"","SA1":"20","SA2":"","autoConnect":true},{"id":"5b5f6f73.10106","type":"homekit-bridge","bridgeName":"Pont Node-Red","pinCode":"123-45-321","port":"","allowInsecureRequest":true,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Raspberry Pi 3 B+","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

## Adaptive Lightning

> **Important Notice,** this feature is only available in latest dev version.

![Adaptive Lightning](lightbulb_adaptive_lightning.png)

### Introduction

Adaptive Lighting is a feature introduced in iOS 14.
It allows supported smart home lights to automatically adjust their color temperature throughout the day.

https://www.makeuseof.com/how-to-use-adaptive-lighting-apple-homekit/

### Modes

#### AUTOMATIC

In automatic mode pretty much everything from setup to transition scheduling is done by the controller.
By design, controller will send appropriate Characteristic update very minute.

#### MANUAL

In manual mode setup is done by the controller but the actual transition must be done by the user.
This is useful for lights which natively support transitions.

It also allows to reduce network traffic.
By design, controller will send Characteristic schedule once per day.

Once you enable Adaptive Lightning in Home.app for your Service, it will output below message

```json
{
  "payload": {
    "AdaptiveLightingController": {
      "event": "update",
      "data": {
        "transitionStartMillis": 1719177786090,
        "timeMillisOffset": 20610,
        "transitionCurve": [{"temperature":517.6666870117188,"brightnessAdjustmentFactor":-1.8666666746139526,"transitionTime":0},{"temperature":518.5555419921875,"brightnessAdjustmentFactor":-1.855555534362793,"transitionTime":414000,"duration":10800000},{"temperature":512.111083984375,"brightnessAdjustmentFactor":-1.8111110925674438,"transitionTime":1800000},{"temperature":503.5555419921875,"brightnessAdjustmentFactor":-1.755555510520935,"transitionTime":1800000},{"temperature":490.6666564941406,"brightnessAdjustmentFactor":-1.6666666269302368,"transitionTime":1800000},{"temperature":476.77777099609375,"brightnessAdjustmentFactor":-1.5777777433395386,"transitionTime":1800000},{"temperature":462.77777099609375,"brightnessAdjustmentFactor":-1.4777777194976807,"transitionTime":1800000},{"temperature":447.5555419921875,"brightnessAdjustmentFactor":-1.355555534362793,"transitionTime":1800000},{"temperature":433.4444580078125,"brightnessAdjustmentFactor":-1.244444489479065,"transitionTime":1800000},{"temperature":419.5555419921875,"brightnessAdjustmentFactor":-1.1555556058883667,"transitionTime":1800000},{"temperature":407.3333435058594,"brightnessAdjustmentFactor":-1.1333333253860474,"transitionTime":1800000},{"temperature":395.8888854980469,"brightnessAdjustmentFactor":-1.1888889074325562,"transitionTime":1800000},{"temperature":385,"brightnessAdjustmentFactor":-1.2999999523162842,"transitionTime":1800000},{"temperature":375.22222900390625,"brightnessAdjustmentFactor":-1.4222222566604614,"transitionTime":1800000},{"temperature":367.3333435058594,"brightnessAdjustmentFactor":-1.5333333015441895,"transitionTime":1800000},{"temperature":360,"brightnessAdjustmentFactor":-1.600000023841858,"transitionTime":1800000},{"temperature":355.5555419921875,"brightnessAdjustmentFactor":-1.6555556058883667,"transitionTime":1800000},{"temperature":352.77777099609375,"brightnessAdjustmentFactor":-1.6777777671813965,"transitionTime":1800000},{"temperature":350.8888854980469,"brightnessAdjustmentFactor":-1.6888889074325562,"transitionTime":1800000},{"temperature":349.8888854980469,"brightnessAdjustmentFactor":-1.6888889074325562,"transitionTime":1800000,"duration":3600000},{"temperature":349.77777099609375,"brightnessAdjustmentFactor":-1.6777777671813965,"transitionTime":1800000},{"temperature":349.8888854980469,"brightnessAdjustmentFactor":-1.6888889074325562,"transitionTime":1800000,"duration":3600000},{"temperature":350.5555419921875,"brightnessAdjustmentFactor":-1.6555556058883667,"transitionTime":1800000},{"temperature":352.1111145019531,"brightnessAdjustmentFactor":-1.6111111640930176,"transitionTime":1800000},{"temperature":355.5555419921875,"brightnessAdjustmentFactor":-1.5555555820465088,"transitionTime":1800000},{"temperature":358.6666564941406,"brightnessAdjustmentFactor":-1.4666666984558105,"transitionTime":1800000},{"temperature":364.77777099609375,"brightnessAdjustmentFactor":-1.3777778148651123,"transitionTime":1800000},{"temperature":371.8888854980469,"brightnessAdjustmentFactor":-1.288888931274414,"transitionTime":1800000},{"temperature":382.3333435058594,"brightnessAdjustmentFactor":-1.2333333492279053,"transitionTime":1800000},{"temperature":397.4444580078125,"brightnessAdjustmentFactor":-1.244444489479065,"transitionTime":1800000},{"temperature":416.1111145019531,"brightnessAdjustmentFactor":-1.3111110925674438,"transitionTime":1800000},{"temperature":439.5555419921875,"brightnessAdjustmentFactor":-1.4555555582046509,"transitionTime":1800000},{"temperature":463.3333435058594,"brightnessAdjustmentFactor":-1.6333333253860474,"transitionTime":1800000},{"temperature":487.3333435058594,"brightnessAdjustmentFactor":-1.8333333730697632,"transitionTime":1800000},{"temperature":508,"brightnessAdjustmentFactor":-2,"transitionTime":1800000},{"temperature":520.888916015625,"brightnessAdjustmentFactor":-2.0888888835906982,"transitionTime":1800000},{"temperature":520.3333129882812,"brightnessAdjustmentFactor":-2.0333333015441895,"transitionTime":1800000},{"temperature":519.7777709960938,"brightnessAdjustmentFactor":-1.9777777194976807,"transitionTime":1800000},{"temperature":515.7777709960938,"brightnessAdjustmentFactor":-1.8777778148651123,"transitionTime":1800000},{"temperature":517.6666870117188,"brightnessAdjustmentFactor":-1.8666666746139526,"transitionTime":1386000}],
        "brightnessAdjustmentRange": {
          "minBrightnessValue": 10,
          "maxBrightnessValue": 100
        },
        "updateInterval": 60000,
        "notifyIntervalThreshold": 600000
      }
    }
  }
}
```

Once you disable Adaptive Lightning in Home.app for your Service, it will output below message

```json
{
  "payload": {
    "AdaptiveLightingController": {
      "event": "disable"
    }
  }
}
```

When the user manually changes the value of Hue, Saturation or ColorTemperature characteristics (or if any of those values is changed by physical interaction with the lightbulb), you must send below message to Service input.

```json
{
  "payload": {
    "AdaptiveLightingController": {
      "event": "disable"
    }
  }
}
```
