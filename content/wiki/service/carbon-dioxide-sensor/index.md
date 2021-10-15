---
title: "Carbon Dioxide Sensor"
description: "Carbon Dioxide Sensor"
lead: ""
date: 2021-04-17T18:50:12.027Z
lastmod: 2021-10-15T22:06:11.305Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "CarbonDioxideSensor"
contributors: ["djiwondee","crxporter","caitken-com","Shaquu"]
---

## Example

These examples are meant to be copied into your Node-RED system and adapted to your setup.

**Please note:** Different from other HomeKit services (e.g. temperature sensor) the Home.app is not showing the carbon dioxide level on the device icon. To view the current value you have to open the preferences of the device in the Home.app. This works as designed by Apple and can't be changed with characteristics properties.

### Simple CO2 Sensor

This example is a simple CO2 sensor that is only ever "triggered" or "normal".
The msg.payload going in is either `{"CarbonDioxideDetected":1}` or `{"CarbonDioxideDetected":0}` where 1 is "carbon dioxide detected" and 0 is "normal conditions".

![screen shot 2019-03-06 at 9 51 04 am](https://user-images.githubusercontent.com/38265886/53894230-5cebb780-3ff5-11e9-81d8-fb1ec6fad816.png)

```json
[{"id":"abf13091.ebbd38","type":"homekit-service","z":"54339415.36f384","bridge":"b070e578.4eca1","name":"Simple CO2","serviceName":"CarbonDioxideSensor","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{}","x":870,"y":380,"wires":[["e1bd6875.39b18"]]},{"id":"e1bd6875.39b18","type":"debug","z":"54339415.36f384","name":"CO2 Debug","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":1050,"y":380,"wires":[]},{"id":"46f9e422.63a86c","type":"inject","z":"54339415.36f384","name":"Detected","topic":"","payload":"{\"CarbonDioxideDetected\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":680,"y":360,"wires":[["abf13091.ebbd38"]]},{"id":"ea1120d0.634c88","type":"inject","z":"54339415.36f384","name":"Not Detected","topic":"","payload":"{\"CarbonDioxideDetected\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":670,"y":400,"wires":[["abf13091.ebbd38"]]},{"id":"b070e578.4eca1","type":"homekit-bridge","z":"","bridgeName":"Node-Red-Homekit-Bridge","pinCode":"270-21-969","port":"34567","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

### Full Featured CO2 Sensor

This is an example of a CO2 Sensor that triggers an event message in the Home.app in case the CO2 level is above a threshold level of 1000.
In this example the input nodes is an inject node just for a value of an assumed carbon dioxide level. In real life the author of that example gather the current value from a [Netatmo weather stations](https://www.netatmo.com/en-eu/weather?force_locale=en-eu) by accessing the [Netatmo Connect API](https://dev.netatmo.com/en-US/resources/technical/introduction). The debug node will return values set in the payload as it available in the Home.app on an Apple device.

![bildschirmfoto 2019-03-06 um 14 29 28](https://user-images.githubusercontent.com/37173958/53884669-6b00fe80-401c-11e9-8709-2cee51974111.png)

Copyable Node-RED flow:

```json
[{"id":"8770fe88.65de18","type":"switch","z":"755d7c8e.995f8c","name":"Check CO2 Peaklevel","property":"payload","propertyType":"msg","rules":[{"t":"gt","v":"1000","vt":"str"},{"t":"else"}],"checkall":"true","repair":false,"outputs":2,"x":480,"y":680,"wires":[["3cf3572b.dd77f"],["aab3e31b.79b0e8"]]},{"id":"3cf3572b.dd77f","type":"change","z":"755d7c8e.995f8c","name":"Set HkMsg CO2 PeakLevel Detected","rules":[{"t":"set","p":"payload.CarbonDioxidePeakLevel","pt":"msg","to":"payload","tot":"msg"},{"t":"move","p":"payload","pt":"msg","to":"payload.CarbonDioxideLevel","tot":"msg"},{"t":"set","p":"payload.CarbonDioxideDetected","pt":"msg","to":"1","tot":"num"},{"t":"set","p":"payload.StatusActive","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":790,"y":660,"wires":[["b447171f.8d65d"]]},{"id":"aab3e31b.79b0e8","type":"change","z":"755d7c8e.995f8c","name":"Set HkMsg CO2 No PeakLevel Detected","rules":[{"t":"set","p":"payload.CarbonDioxidePeakLevel","pt":"msg","to":"payload","tot":"msg"},{"t":"move","p":"payload","pt":"msg","to":"payload.CarbonDioxideLevel","tot":"msg"},{"t":"set","p":"payload.CarbonDioxideDetected","pt":"msg","to":"0","tot":"num"},{"t":"set","p":"payload.StatusActive","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":780,"y":700,"wires":[["b447171f.8d65d"]]},{"id":"ad845a09.a164e","type":"debug","z":"755d7c8e.995f8c","name":"CO2 Debug","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":1210,"y":680,"wires":[]},{"id":"aae48b15.370328","type":"inject","z":"755d7c8e.995f8c","name":"Inject 567 ppm","topic":"","payload":"567","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":260,"y":660,"wires":[["8770fe88.65de18"]]},{"id":"ac3f99c0.5a69b","type":"inject","z":"755d7c8e.995f8c","name":"Inject 1357 ppm (above peak level)","topic":"","payload":"1357","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":200,"y":700,"wires":[["8770fe88.65de18"]]},{"id":"b447171f.8d65d","type":"homekit-service","z":"755d7c8e.995f8c","bridge":"62369164.fea14","name":"CO2","serviceName":"CarbonDioxideSensor","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"StatusActive\" : true,\n    \"CarbonDioxideLevel\" : 0,\n    \"CarbonDioxidePeakLevel\" : 1000,\n    \"CarbonDioxideDetected\" : 0\n}","x":1050,"y":680,"wires":[["ad845a09.a164e"]]},{"id":"e974015c.28036","type":"comment","z":"755d7c8e.995f8c","name":"Simulate CO2 Level","info":"","x":130,"y":600,"wires":[]},{"id":"2bf9335e.50b4a4","type":"comment","z":"755d7c8e.995f8c","name":"Set and Check Peak Level","info":"","x":490,"y":600,"wires":[]},{"id":"d9d67e9b.e3bdd8","type":"comment","z":"755d7c8e.995f8c","name":"Set Payload according to HAP specification","info":"","x":790,"y":600,"wires":[]},{"id":"62369164.fea14","type":"homekit-bridge","z":"","bridgeName":"Node-Red-Homekit-Bridge","pinCode":"270-21-969","port":"34567","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

This example triggers a message in iOS if the carbon dioxide level raises above 1000 ppm a set the status of the device in the Home.app to _peak level detected_. You can now use that to create an automation in the Home.app triggered by carbon dioxide peak level. If the level would fall below the selected peak level, the Peak level detection will be deactivated. In addition to that you can now ask Siri what the carbon dioxide level in the room you assign the sensor in the Home.app. But most important, if you are using Netatmo Weather Station as the source of your in and outdoor climatic measurement you can now bridge the gap of the missing HomeKit compatibility of Netatmo.

### Monitoring peak level and event handling

This is another example how to deal with the event interaction on iOS. The following flow saves the recent peak level in a context variable of the node and always updates the `CarbonDioxidePeakLevel` if it is larger than the previous measurement cycle.
If the level goes up a particular value (e.g. 1000ppm is set in the example) it changes the `CarbonDioxideDetected` property to 1 which causes an alarm in the iOS Home.app.

![Bildschirmfoto 2019-03-09 um 16 36 48](https://user-images.githubusercontent.com/37173958/54073667-4e69fe00-428a-11e9-91e7-3f29bc87ea33.png)

The alarm will be reset after 30sec based on the individual reset. Also, the recent peak level is set to `null` for some reasons.

Copyable Node-RED flow:

```json
[{"id":"e974015c.28036","type":"comment","z":"755d7c8e.995f8c","name":"Simulate CO2 Level","info":"","x":130,"y":820,"wires":[]},{"id":"2bf9335e.50b4a4","type":"comment","z":"755d7c8e.995f8c","name":"Check peak level and reset alarm","info":"","x":830,"y":820,"wires":[]},{"id":"d9d67e9b.e3bdd8","type":"comment","z":"755d7c8e.995f8c","name":"Set Payload according to HAP specification","info":"","x":510,"y":820,"wires":[]},{"id":"83ebb81b.259b28","type":"comment","z":"755d7c8e.995f8c","name":"Event Notification for CO2 Peak Level","info":"","x":850,"y":880,"wires":[]},{"id":"2c7015be.019e32","type":"homekit-service","z":"755d7c8e.995f8c","bridge":"890aedc6.d0b418","name":"CO2 Sensor","serviceName":"CarbonDioxideSensor","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"CarbonDioxideLevel\" : 0,\n    \"CarbonDioxidePeakLevel\": 1000,\n    \"CarbonDioxideDetected\" : 0,\n    \"StatusActive\" : true\n}","x":770,"y":1040,"wires":[[]]},{"id":"3022ebf7.8a551c","type":"function","z":"755d7c8e.995f8c","name":"Detect Highest Value","func":"var currentCo2PeakLevel = context.get('lastCo2PeakLevel') || 0;\n\nvar newMsg = {};\nnewMsg.payload = {\n    \"CarbonDioxidePeakLevel\" : currentCo2PeakLevel,\n    \"CarbonDioxideDetected\" : 0\n};\n\n// Check new Peak-Level\nif (msg.payload.CarbonDioxideLevel > currentCo2PeakLevel) {\n    context.set('lastCo2PeakLevel', newMsg.payload.CarbonDioxideLevel);\n    newMsg.payload.CarbonDioxidePeakLevel = msg.payload.CarbonDioxideLevel;\n}\n\n// Check Peak in critical level\nif (msg.payload.CarbonDioxideLevel >= 1000) {\n    newMsg.payload.CarbonDioxideDetected = 1;\n} \n\nreturn newMsg;","outputs":1,"noerr":0,"x":800,"y":920,"wires":[["c5c3ed3e.6b786"]]},{"id":"ad3b0eb7.5f9ba","type":"change","z":"755d7c8e.995f8c","name":"Reset Payload for HkMsg CO2","rules":[{"t":"set","p":"payload","pt":"msg","to":"{\"CarbonDioxidePeakLevel\":null,\"CarbonDioxideDetected\":0}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":470,"y":1040,"wires":[["2c7015be.019e32"]]},{"id":"103a2552.ac770b","type":"change","z":"755d7c8e.995f8c","name":"Set payload to HkMsg CO2","rules":[{"t":"move","p":"payload","pt":"msg","to":"payload.CarbonDioxideLevel","tot":"msg"},{"t":"set","p":"payload.StatusActive","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":460,"y":980,"wires":[["2c7015be.019e32","3022ebf7.8a551c"]]},{"id":"c5c3ed3e.6b786","type":"trigger","z":"755d7c8e.995f8c","op1":"","op2":"{\"CarbonDioxideDetected\" : 0}","op1type":"pay","op2type":"json","duration":"30","extend":false,"units":"s","reset":"","bytopic":"all","name":"Reset Detection after 30 sec","x":820,"y":980,"wires":[["2c7015be.019e32"]]},{"id":"d76e543e.1085e","type":"inject","z":"755d7c8e.995f8c","name":"Reset","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":110,"y":1040,"wires":[["ad3b0eb7.5f9ba"]]},{"id":"94a11c82.273ca8","type":"inject","z":"755d7c8e.995f8c","name":"0 ppm","topic":"","payload":"0","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":110,"y":900,"wires":[["103a2552.ac770b"]]},{"id":"9e4aeb3f.0bc4e","type":"inject","z":"755d7c8e.995f8c","name":"678 ppm","topic":"","payload":"678","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":120,"y":940,"wires":[["103a2552.ac770b"]]},{"id":"3ccbca9e.00895e","type":"inject","z":"755d7c8e.995f8c","name":"1357 ppm","topic":"","payload":"1357","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":120,"y":980,"wires":[["103a2552.ac770b"]]},{"id":"890aedc6.d0b418","type":"homekit-bridge","z":"","bridgeName":"Node-Red-HAP-Bridge-02","pinCode":"222-22-222","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

Some credits for this example goes to [crxporter](https://github.com/crxporter) for the [inspiration]( https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/50#issuecomment-470117208).
