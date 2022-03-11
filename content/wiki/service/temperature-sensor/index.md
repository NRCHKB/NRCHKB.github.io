---
title: "Temperature Sensor"
description: "Temperature Sensor"
lead: ""
date: 2021-04-05T11:54:45.000Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "TemperatureSensor"
---

## Example

### Simple Temperature Sensor

This is a simple example to be copied into your Node-RED system and to be adapted to your setup.

![bildschirmfoto 2019-03-07 um 08 51 30](https://user-images.githubusercontent.com/37173958/53940605-64bf6080-40b6-11e9-8fbc-c0dd84a3cfc6.png)

Copyable Node-RED flow:

```json
[{"id":"551d04cf.db904c","type":"change","z":"755d7c8e.995f8c","name":"Set playoad to HkMsg Temperature","rules":[{"t":"move","p":"payload","pt":"msg","to":"payload.CurrentTemperature","tot":"msg"},{"t":"set","p":"payload.StatusActive","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":680,"y":460,"wires":[["1d25e931.f81077"]]},{"id":"1d25e931.f81077","type":"homekit-service","z":"755d7c8e.995f8c","bridge":"e933973b.f891d","name":"Temperature Sensor","serviceName":"TemperatureSensor","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"CurrentTemperature\" : 0,\n    \"StatusActive\" : true\n}","x":940,"y":460,"wires":[["ad845a09.a164e"]]},{"id":"575eb49e.792834","type":"comment","z":"755d7c8e.995f8c","name":"Set Payload according to HAP specification","info":"","x":710,"y":400,"wires":[]},{"id":"b8b0c8ca.23abd8","type":"comment","z":"755d7c8e.995f8c","name":"Simulate Temperature Level","info":"","x":220,"y":400,"wires":[]},{"id":"8aa8b3f6.dfbc68","type":"inject","z":"755d7c8e.995f8c","name":"Repeate every 10 sec","topic":"","payload":"true","payloadType":"bool","repeat":"10","crontab":"","once":false,"onceDelay":0.1,"x":200,"y":460,"wires":[["6d31fe18.2648c8"]]},{"id":"6d31fe18.2648c8","type":"random","z":"755d7c8e.995f8c","name":"Random Temperature","low":"-50","high":"50","inte":"false","property":"payload","x":420,"y":460,"wires":[["551d04cf.db904c"]]},{"id":"e933973b.f891d","type":"homekit-bridge","z":"","bridgeName":"Node-Red-HAP-Bridge-01","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

The example above is only showing the temperature value. The Home.app shows rounded values in the sensor icons with a precision of 0.5, while other HomeKit supporting apps (e.g. [EVE](https://itunes.apple.com/app/elgato-eve/id917695792?mt=8)) showing the precise value as injected in the flow. Unfortunately this setup doesn't allow to trigger any automation in the Home.app based on the temperature, since Home.app doesn't provide the temperature sensor as the initiator of a flow.

In real life the author of that example gathers the current temperature value from a [Netatmo weather stations](https://www.netatmo.com/en-eu/weather?force_locale=en-eu) by accessing the [Netatmo Connect API](https://dev.netatmo.com/en-US/resources/technical/introduction). This allows to bridge the gap of the missing HomeKit compatibility of Netatmo products.

### Temperature Sensor with Battery

_**NOTE: THIS EXAMPLE REQUIRES VERSION 0.6 OR HIGHER**_

Building from the above example, the example below has the additional battery level service. This is a linked service with the parent set as the temperature sensor. It will show as a single item in the Home app.

When the payload `{"StatusLowBattery":1}` is sent to the item, the Home app will show a warning for the item:

<img width="436" alt="Screen Shot 2019-03-12 at 6 54 01 PM" src="https://user-images.githubusercontent.com/38265886/54241690-35668480-44f8-11e9-9d3e-c5cc97b4be32.png">

To clear this warning simply send `{"StatusLowBattery":0}`. Adjust battery state, charge state, and battery level to work with your items - an additional script may be necessary to set a threshold for "low battery" if your device only sends the battery level.

<img width="1106" alt="Screen Shot 2019-03-12 at 6 56 16 PM" src="https://user-images.githubusercontent.com/38265886/54241785-87a7a580-44f8-11e9-8565-7b607b9b7d0d.png">

Node-RED code:

```json
[{"id":"e9b3d2fc.cdc198","type":"inject","z":"3e0d11cf.29e996","name":"Battery 100%","topic":"","payload":"{\"BatteryLevel\":100}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":800,"wires":[["acdee2e7.d9efa8"]]},{"id":"6d22be0a.25e55","type":"change","z":"3e0d11cf.29e996","name":"Set playoad to HkMsg Temperature","rules":[{"t":"move","p":"payload","pt":"msg","to":"payload.CurrentTemperature","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":640,"y":660,"wires":[["4753b489.17457c"]]},{"id":"1ff9ab47.bee8b5","type":"comment","z":"3e0d11cf.29e996","name":"Set Payload according to HAP specification","info":"","x":670,"y":600,"wires":[]},{"id":"eb778900.64b058","type":"comment","z":"3e0d11cf.29e996","name":"Simulate Temperature Level","info":"","x":180,"y":600,"wires":[]},{"id":"7ebea38.365fb5c","type":"inject","z":"3e0d11cf.29e996","name":"Repeate every 10 sec","topic":"","payload":"true","payloadType":"bool","repeat":"10","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":660,"wires":[["9b1d1d59.1c89a8"]]},{"id":"9b1d1d59.1c89a8","type":"random","z":"3e0d11cf.29e996","name":"Random Temperature","low":"-50","high":"50","inte":"false","property":"payload","x":380,"y":660,"wires":[["6d22be0a.25e55"]]},{"id":"4753b489.17457c","type":"homekit-service","z":"3e0d11cf.29e996","isParent":true,"bridge":"4adad17b.3ee4a8","parentService":"","name":"Temperature Sensor","serviceName":"TemperatureSensor","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{}","x":940,"y":660,"wires":[[]]},{"id":"8e8b2d9a.b08f38","type":"inject","z":"3e0d11cf.29e996","name":"Battery 70%","topic":"","payload":"{\"BatteryLevel\":70}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":840,"wires":[["acdee2e7.d9efa8"]]},{"id":"b28a9d8b.1ebdc8","type":"inject","z":"3e0d11cf.29e996","name":"Battery 40%","topic":"","payload":"{\"BatteryLevel\":40}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":880,"wires":[["acdee2e7.d9efa8"]]},{"id":"967c2a2c.09ec3","type":"inject","z":"3e0d11cf.29e996","name":"Battery 5%","topic":"","payload":"{\"BatteryLevel\":5}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":920,"wires":[["acdee2e7.d9efa8"]]},{"id":"2f863d43.01130a","type":"inject","z":"3e0d11cf.29e996","name":"Normal Battery","topic":"","payload":"{\"StatusLowBattery\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":700,"y":740,"wires":[["acdee2e7.d9efa8"]]},{"id":"daab91c1.ceffa","type":"inject","z":"3e0d11cf.29e996","name":"Low Battery","topic":"","payload":"{\"StatusLowBattery\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":690,"y":780,"wires":[["acdee2e7.d9efa8"]]},{"id":"664d1272.88338c","type":"inject","z":"3e0d11cf.29e996","name":"Charging","topic":"","payload":"{\"ChargingState\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":700,"y":880,"wires":[["acdee2e7.d9efa8"]]},{"id":"e672ec23.6106c8","type":"inject","z":"3e0d11cf.29e996","name":"Not Charging","topic":"","payload":"{\"ChargingState\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":710,"y":920,"wires":[["acdee2e7.d9efa8"]]},{"id":"acdee2e7.d9efa8","type":"homekit-service","z":"3e0d11cf.29e996","isParent":false,"bridge":"4adad17b.3ee4a8","parentService":"4753b489.17457c","name":"Temp Battery","serviceName":"BatteryService","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{}","x":970,"y":820,"wires":[[]]},{"id":"cb380cba.a506b8","type":"comment","z":"3e0d11cf.29e996","name":"Send Battery Level","info":"","x":150,"y":740,"wires":[]},{"id":"7e840dd2.3c7b04","type":"comment","z":"3e0d11cf.29e996","name":"Set charging/not charging","info":"","x":490,"y":920,"wires":[]},{"id":"f6e13a0.c08e8c8","type":"comment","z":"3e0d11cf.29e996","name":"Low Battery Warn","info":"","x":490,"y":740,"wires":[]},{"id":"4adad17b.3ee4a8","type":"homekit-bridge","z":"","bridgeName":"release 05","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```
