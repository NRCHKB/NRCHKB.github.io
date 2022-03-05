---
title: "Carbon Monoxide Sensor"
description: "Carbon Monoxide Sensor"
lead: ""
date: 2021-04-05T11:54:45.000Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "CarbonMonoxideSensor"
contributors: ["crxporter","caitken-com","Shaquu"]
---

To have a carbon monoxide sensor appear in the Home.app, the CarbonMonoxide service is used.
Required value is `CarbonMonoxideDetected`, there will be a simple example and detailed example included below.
Characteristic Properties are not needed for this setup, the values will be updated in the Home.app based on what is being sent from your sensors.

## Example

These examples are meant to be copied into your Node-RED system and adapted to your setup.

**Please note:** Different from other HomeKit services (e.g. temperature sensor) the Home.app is not showing the carbon monoxide level on the device icon. To view the current value you have to open the preferences of the device in the Home.app or ask Siri. This works as designed by Apple and can't be changed.

### Simple Carbon Monoxide Sensor

This example is a simple Carbon Monoxide sensor that is only ever "triggered" or "normal". The msg.payload going in is either `{"CarbonMonoxideDetected":1}` or `{"CarbonMonoxideDetected":0}` where 1 is "carbon monoxide detected" and 0 is "normal conditions". Use this example as a starting point for simple alarms that do not send detailed levels.

![screen shot 2019-03-06 at 10 38 45 am](https://user-images.githubusercontent.com/38265886/53897565-059d1580-3ffc-11e9-8d69-dabb28d44aca.png)

Copyable Node-RED flow:

```json
[{"id":"ac79f4f4.906df8","type":"homekit-service","z":"54339415.36f384","bridge":"d334490b.40dac","name":"Simple CO","serviceName":"CarbonMonoxideSensor","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{}","x":670,"y":800,"wires":[["933cc1a6.dc8c98"]]},{"id":"7fe97674.cbc19","type":"inject","z":"54339415.36f384","name":"Not Detected","topic":"","payload":"{\"CarbonMonoxideDetected\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":470,"y":820,"wires":[["ac79f4f4.906df8"]]},{"id":"933cc1a6.dc8c98","type":"debug","z":"54339415.36f384","name":"CO Debug","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":850,"y":800,"wires":[]},{"id":"3efd37a6.392f78","type":"inject","z":"54339415.36f384","name":"Detected","topic":"","payload":"{\"CarbonMonoxideDetected\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":480,"y":780,"wires":[["ac79f4f4.906df8"]]},{"id":"d334490b.40dac","type":"homekit-bridge","z":"","bridgeName":"Example Bridge","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

### Full Featured Carbon Monoxide Sensor

This is an example of a carbon monoxide detector that reports the current amount of carbon monoxide in the air as parts per million (PPM). A threshold level of 35 has been set as the "alarm level". This level was chosen because it is the limit of what OSHA has decided is unsafe for 8 hour exposure. Please adjust to the threshold you would like in your system.

There are three inject nodes in this example:

**The `Alarm` inject node** will cause an alarm to trigger in the Home.app. The flow will cause 2 values to be sent to HomeKit immediately, the `CarbonMonoxideLevel` and `{"CarbonMonoxideDetected":1}`. If the new level is higher than the previous peak level (saved in the function as a context variable) then an additional `CarbonMonoxidePeakLevel` message will be sent. The alarm inject button also starts a 1-minute timer before a `{"CarbonMonoxideDetected":0}` message is sent; this message serves to turn off the Home.app alarm.

**The `Non Alarm` inject node** will simply update the `CarbonMonoxideLevel` reported and the `CarbonMonoxidePeakLevel` if it is a new high value since the `Reset` has been pressed. No alarm will be triggered.

**The `Reset` inject node** will send a value of 0 to both `CarbonMonoxideDetected` and `CarbonMonoxidePeakLevel` - used to clear the system after alarms have been dealt with and carbon monoxide sources have been stopped.

![screen shot 2019-03-06 at 10 38 21 am](https://user-images.githubusercontent.com/38265886/53897541-f7e79000-3ffb-11e9-9481-23e6e8246a49.png)

Copyable Node-RED flow:

```json
[{"id":"64c75b4e.98b30c","type":"trigger","z":"54339415.36f384","op1":"","op2":"{\"CarbonMonoxideDetected\":0}","op1type":"pay","op2type":"json","duration":"1","extend":true,"units":"min","reset":"","bytopic":"all","name":"1 minute alarm","x":640,"y":640,"wires":[["72bdfc6c.5a604c"]]},{"id":"c756aa6.24b10d8","type":"function","z":"54339415.36f384","name":"Peak Level and Alarm","func":"var co = context.get('co')||0;\nvar NEWco;\nif(msg.payload==\"RESET\"){\n    co=0;\n    context.set('co',co);\n    msg.payload={\"CarbonMonoxidePeakLevel\":co,\"CarbonMonoxideLevel\":co};\n    return [msg,null];\n}\nvar alarm={};\nalarm.payload={\"CarbonMonoxideDetected\":1};\n\nif(msg.payload.CarbonMonoxideLevel){\n    NEWco=msg.payload.CarbonMonoxideLevel;\n    if(NEWco>co){\n        co=NEWco;\n        context.set('co',co);\n        msg.payload={\"CarbonMonoxidePeakLevel\":co};\n    }\n    if(NEWco>=35){\n        return [msg,alarm];\n    } else {\n        return [msg,null];\n    }\n}","outputs":2,"noerr":0,"x":360,"y":620,"wires":[["72bdfc6c.5a604c"],["64c75b4e.98b30c"]]},{"id":"72bdfc6c.5a604c","type":"homekit-service","z":"54339415.36f384","bridge":"d334490b.40dac","name":"CO Detector","serviceName":"CarbonMonoxideSensor","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{}","x":850,"y":580,"wires":[["fea7d8fa.ab258"]]},{"id":"b40fc0e.d2705c","type":"change","z":"54339415.36f384","name":"Set CarbonMonoxideLevel","rules":[{"t":"move","p":"payload","pt":"msg","to":"payload.CarbonMonoxideLevel","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":500,"y":560,"wires":[["c756aa6.24b10d8","72bdfc6c.5a604c"]]},{"id":"edf5ddad.07bb","type":"inject","z":"54339415.36f384","name":"Reset Peak","topic":"","payload":"RESET","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":620,"wires":[["c756aa6.24b10d8"]]},{"id":"fea7d8fa.ab258","type":"debug","z":"54339415.36f384","name":"CO Debug","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":1050,"y":580,"wires":[]},{"id":"bfc486e0.5c10f","type":"random","z":"54339415.36f384","name":"Alarm","low":"35","high":"100","inte":"true","property":"payload","x":270,"y":500,"wires":[["b40fc0e.d2705c"]]},{"id":"cbe3274b.6d20c8","type":"random","z":"54339415.36f384","name":"Safe","low":"0","high":"34","inte":"true","property":"payload","x":270,"y":560,"wires":[["b40fc0e.d2705c"]]},{"id":"7411d6ba.d69788","type":"inject","z":"54339415.36f384","name":"","topic":"","payload":"Alarm","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":110,"y":500,"wires":[["bfc486e0.5c10f"]]},{"id":"97e5b66.bc89448","type":"inject","z":"54339415.36f384","name":"","topic":"","payload":"Non Alarm","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":120,"y":560,"wires":[["cbe3274b.6d20c8"]]},{"id":"d334490b.40dac","type":"homekit-bridge","z":"","bridgeName":"Example Bridge","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```
