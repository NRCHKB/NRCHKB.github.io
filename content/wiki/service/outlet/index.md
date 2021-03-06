---
title: "Outlet"
description: "Outlet"
lead: ""
date: 2021-04-05T11:54:45.000Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "Outlet"
---

## Basic Principle

This is the simplest example of an outlet item. The input nodes are `On`, `Off`, `In Use` and `Not in Use`.

![Basic Outlet](outlet_basic_principle_example.png)

Copyable Node-RED flow:

```json
[{"id":"b2bc6d32725ce207","type":"inject","z":"79ab71a53e21e046","name":"On","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"On\":1}","payloadType":"json","x":130,"y":80,"wires":[["503a4c551f4e455b"]]},{"id":"dcf7dbd66ba3f303","type":"inject","z":"79ab71a53e21e046","name":"Off","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"On\":0}","payloadType":"json","x":130,"y":120,"wires":[["503a4c551f4e455b"]]},{"id":"6282f6b7760eb090","type":"inject","z":"79ab71a53e21e046","name":"Not In Use","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"OutletInUse\":0}","payloadType":"json","x":120,"y":180,"wires":[["503a4c551f4e455b"]]},{"id":"3c728bedb5474384","type":"inject","z":"79ab71a53e21e046","name":"In Use","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"OutletInUse\":1}","payloadType":"json","x":130,"y":220,"wires":[["503a4c551f4e455b"]]},{"id":"503a4c551f4e455b","type":"homekit-service","z":"79ab71a53e21e046","isParent":true,"hostType":"0","bridge":"4a2a4fc162440a41","accessoryId":"","parentService":"","name":"Outlet","serviceName":"Outlet","topic":"","filter":false,"manufacturer":"NRCHKB","model":"1.4.2","serialNo":"Default Serial Number","firmwareRev":"1.4.2","hardwareRev":"1.4.2","softwareRev":"1.4.2","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{\"OutletInUse\":{\"minValue\":0,\"maxValue\":1}}","waitForSetupMsg":false,"outputs":2,"x":310,"y":180,"wires":[["66261314408ffb64","b0e06e3f012f25b2"],[]]},{"id":"66261314408ffb64","type":"debug","z":"79ab71a53e21e046","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":510,"y":120,"wires":[]},{"id":"b0e06e3f012f25b2","type":"function","z":"79ab71a53e21e046","name":"State","func":"msg.payload = msg.payload.On;\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":450,"y":180,"wires":[["0ad3df8e40c50749"]]},{"id":"0ad3df8e40c50749","type":"debug","z":"79ab71a53e21e046","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":610,"y":180,"wires":[]},{"id":"4a2a4fc162440a41","type":"homekit-bridge","bridgeName":"Bridge Node-RED","pinCode":"605-37-162","port":"","advertiser":"bonjour-hap","allowInsecureRequest":false,"manufacturer":"NRCHKB","model":"1.4.3","serialNo":"Default Serial Number","firmwareRev":"1.4.3","hardwareRev":"1.4.3","softwareRev":"1.4.3","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

### Characteristic Properties

Use the following JSON in your characteristic properties so that the Home application displays an outlet with `OutletInUse`.

```json
{
    "OutletInUse": 0
}
```

## Example

### Implementation with a [Sonoff Module](https://sonoff.tech/product/diy-smart-switch/basicr2/) Flashed by [Tasmota](https://tasmota.github.io/docs/)

This is a Node-RED flow to integrate a Sonoff-Tasmota flashed WiFi Outlet with HomeKit.

![Outlet Sonoff](outlet_sonoff_tasmota_example.png)

Copyable Node-RED flow:

```json
[{"id":"48261270e6d40148","type":"mqtt in","z":"79ab71a53e21e046","name":"","topic":"domoticz/in","qos":"2","datatype":"json","broker":"e17954568d0e969f","nl":false,"rap":true,"rh":0,"x":110,"y":300,"wires":[["42ae1f48153467da"]]},{"id":"730d23b913596ca2","type":"homekit-service","z":"79ab71a53e21e046","isParent":true,"hostType":"0","bridge":"4a2a4fc162440a41","accessoryId":"","parentService":"","name":"Outlet","serviceName":"Outlet","topic":"","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":2,"x":490,"y":300,"wires":[["829710a89f6e4b16"],[]]},{"id":"7efdbb603d6f8332","type":"mqtt out","z":"79ab71a53e21e046","name":"","topic":"domoticz/out","qos":"","retain":"","respTopic":"","contentType":"","userProps":"","correl":"","expiry":"","broker":"e17954568d0e969f","x":850,"y":300,"wires":[]},{"id":"42ae1f48153467da","type":"function","z":"79ab71a53e21e046","name":"State to Homekit","func":"if (msg.payload.idx == 1){  // Outlet as idx 1\n    msg.payload = {\"On\": (msg.payload.nvalue)? true:false};\n    return msg;\n} else {\n    return;\n}","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":310,"y":300,"wires":[["730d23b913596ca2"]]},{"id":"829710a89f6e4b16","type":"function","z":"79ab71a53e21e046","name":"State to MQTT","func":"msg.payload = {\n    \n    \"idx\": 1,\n    \"nvalue\": (msg.payload.On) ? 1 : 0\n};\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":660,"y":300,"wires":[["7efdbb603d6f8332"]]},{"id":"e17954568d0e969f","type":"mqtt-broker","name":"Mosquitto","broker":"192.168.1.20","port":"1883","clientid":"","usetls":false,"protocolVersion":"4","keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthRetain":"false","birthPayload":"","birthMsg":{},"closeTopic":"","closeQos":"0","closeRetain":"false","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willRetain":"false","willPayload":"","willMsg":{},"sessionExpiry":""},{"id":"4a2a4fc162440a41","type":"homekit-bridge","bridgeName":"Bridge Node-RED","pinCode":"605-37-162","port":"","advertiser":"bonjour-hap","allowInsecureRequest":false,"manufacturer":"NRCHKB","model":"1.4.3","serialNo":"Default Serial Number","firmwareRev":"1.4.3","hardwareRev":"1.4.3","softwareRev":"1.4.3","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

### Using an outlet as an Internet Down detector and reset your modem automatically when internet access is lost.

For this use case, I have an outlet module ( in my case a WION Outlet ) that has my router plugged in to it and flashed with TASMOTA.

In TASMOTA I have this config

```yaml
PowerOnState 1
SetOption55 1
WifiConfig 4
rule1 on wifi#disconnected do backlog power 0;delay 150;power 1; delay 1800 endon
rule2 on system#boot do ruletimer1 600 endon on Rules#Timer=1 do backlog power 1; ruletimer1 600 endon
rule3 on Mqtt#Disconnected do MqttHost 0 endon
rule1 1
rule2 1
rule3 1
```

rule1 : upon disconnect, switch router off, wait 15 seconds (think it's enough for 'cold boot'), power router on, and wait 180 seconds for router to boot (if no waiting - sonoff will reboot router in loop, because router cannot start WIFI immediately upon powering on).

rule 2: just power router ON every 10 minutes. That's in case someone (or you) incidentally switch off router remotely - you cannot issue the command for powering it on back. So even if you powered off your router, it will be back ON for less than 10 minutes.. YOU CAN OBEY THIS RULE - router will be powered ON back due to rule1 in case you power it off.

rule 3: If Mqtt is disconnected, reset and use mDNS to discover MQTT host again.

SetOption55 1 - Enable mDNS

Wificonfig 5 - that issued command to don't try to access other AP, but just wait and connect to AP in interest... Otherwise Sonoff can connect to other AP and thinkink WIFI is OK even if router is not working...

And my node-red / HomeKit-bridged flow to monitor the internet connect and restart as needed.  Besides the HomeKit-bridged node, it also uses the `ping` node.

```json
[{"id":"c3628204.3afb68","type":"function","z":"604c0bd3.4e24e4","name":"HB to Tasmota","func":"var result;\nfor (var characteristic in msg.payload) {\n  console.log(\"characteristic\", characteristic, msg.payload[characteristic]);\n  switch (characteristic.toLowerCase()) {\n    case \"rotationspeed\":\n    case \"brightness\":\n      result = msg.payload[characteristic];\n      msg.topic = msg.topic + \"DIMMER\";\n      break;\n    case \"on\":\n      // msg.payload = ( msg.payload.On ? \"ON\" : \"OFF\" );\n      result = (msg.payload.On ? \"power 1\" : \"power 0;delay 150;power 1\");\n      msg.topic = msg.topic + \"backlog\";\n      break;\n    default:\n      console.log(\"Unhandled characteristic\", characteristic);\n  }\n}\nmsg.payload = result;\nreturn msg;","outputs":1,"noerr":0,"x":720,"y":360,"wires":[["96047f1a.280a08","cb1024d2.7ac418"]]},{"id":"9d1d2253.b0441","type":"debug","z":"604c0bd3.4e24e4","name":"Output","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":690,"y":420,"wires":[]},{"id":"dd80fbc.1e61d88","type":"debug","z":"604c0bd3.4e24e4","name":"HomeKit","active":true,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":860,"y":80,"wires":[]},{"id":"96047f1a.280a08","type":"debug","z":"604c0bd3.4e24e4","name":"Down","active":true,"tosidebar":true,"console":true,"tostatus":true,"complete":"payload","targetType":"msg","x":920,"y":420,"wires":[]},{"id":"70f79360.b30dc4","type":"inject","z":"604c0bd3.4e24e4","name":"status","topic":"cmnd/sonoff-7921/status","payload":"11","payloadType":"num","repeat":"","crontab":"","once":true,"onceDelay":"1","x":710,"y":300,"wires":[["6c707a39.0fe454","cb1024d2.7ac418"]]},{"id":"5ce47200.fd1074","type":"debug","z":"604c0bd3.4e24e4","name":"Status","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":390,"y":80,"wires":[]},{"id":"5bbfeddf.ca33f4","type":"function","z":"604c0bd3.4e24e4","name":"sonoffToHomeKit","func":"var result = {};\nvar input = JSON.parse(msg.payload);\nif (input.StatusSTS) {\n  input = input.StatusSTS;\n}\nfor (var characteristic in input) {\n  // console.log(\"characteristic\", characteristic, msg.payload[characteristic]);\n  switch (characteristic.toLowerCase()) {\n    case \"dimmer\":\n      result[\"RotationSpeed\"] = input[characteristic];\n      break;\n    case \"power\":\n      // ( msg.payload === \"ON\" ? { \"On\": 1 } : { \"On\": 0 } );\n      result[\"On\"] = (input[characteristic] === \"ON\" ? 1 : 0);\n      break;\n    default:\n      // console.log(\"Unhandled characteristic\", characteristic);\n  }\n}\nmsg.payload = result;\nreturn msg;","outputs":1,"noerr":0,"x":630,"y":140,"wires":[["dd80fbc.1e61d88","eb1ae883.e8e62","1ceb8448.641814"]]},{"id":"e75a64fd.98e5c8","type":"switch","z":"604c0bd3.4e24e4","name":"Topic Router","property":"topic","propertyType":"msg","rules":[{"t":"regex","v":"(stat|tele)\\/.*\\/(RESULT|STATE|STATUS11)","vt":"str","case":true}],"checkall":"false","repair":false,"outputs":1,"x":410,"y":140,"wires":[["6e303616.979f8","5bbfeddf.ca33f4","6c707a39.0fe454"]]},{"id":"6e303616.979f8","type":"debug","z":"604c0bd3.4e24e4","name":"Match","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":610,"y":80,"wires":[]},{"id":"eb1ae883.e8e62","type":"homekit-service","z":"604c0bd3.4e24e4","isParent":true,"bridge":"6962b7ae.38d428","parentService":"","name":"Internet Down","serviceName":"Outlet","topic":"cmnd/sonoff-7921/","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"","x":500,"y":360,"wires":[["c3628204.3afb68","9d1d2253.b0441"]]},{"id":"6c707a39.0fe454","type":"trigger","z":"604c0bd3.4e24e4","op1":"","op2":"0","op1type":"nul","op2type":"json","duration":"11","extend":true,"units":"min","reset":"","bytopic":"all","name":"","x":430,"y":240,"wires":[["3cd8afbd.1a9e6"]]},{"id":"3cd8afbd.1a9e6","type":"function","z":"604c0bd3.4e24e4","name":"No Response","func":"msg.payload = {On: 'NO_RESPONSE'};\nreturn msg;","outputs":1,"noerr":0,"x":620,"y":240,"wires":[["eb1ae883.e8e62","dd80fbc.1e61d88","6c707a39.0fe454"]]},{"id":"9e08b614.5356b8","type":"ping","z":"604c0bd3.4e24e4","name":"Google","host":"8.8.8.8","timer":"20","x":90,"y":360,"wires":[["d3a92163.f474b"]]},{"id":"4816c3b7.094254","type":"function","z":"604c0bd3.4e24e4","name":"If Down","func":"if (msg.payload === false) {\n    msg.topic = \"cmnd/sonoff-7921/\";\n    msg.payload = { \"On\": false };\n    return msg;\n    }","outputs":1,"noerr":0,"x":320,"y":540,"wires":[["8ff34f01.914d3","2c58f795.d51088"]]},{"id":"8ff34f01.914d3","type":"debug","z":"604c0bd3.4e24e4","name":"","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","x":570,"y":620,"wires":[]},{"id":"2c58f795.d51088","type":"trigger","z":"604c0bd3.4e24e4","op1":"","op2":"","op1type":"pay","op2type":"nul","duration":"15","extend":false,"units":"min","reset":"","bytopic":"all","name":"15 Minutes","x":490,"y":460,"wires":[["c3628204.3afb68","186c6853.8a293"]]},{"id":"1ceb8448.641814","type":"function","z":"604c0bd3.4e24e4","name":"Toggle","func":"if ( msg.payload.On === 0 ) {\n    msg.payload.On = 1;\n    return msg;\n}","outputs":1,"noerr":0,"x":190,"y":300,"wires":[["88087920.a45f98"]]},{"id":"88087920.a45f98","type":"trigger","z":"604c0bd3.4e24e4","op1":"","op2":"","op1type":"nul","op2type":"payl","duration":"1","extend":false,"units":"min","reset":"","bytopic":"all","name":"Wait 1","x":310,"y":300,"wires":[["eb1ae883.e8e62"]]},{"id":"725bcfc9.186a88","type":"inject","z":"604c0bd3.4e24e4","name":"Mail","topic":"","payload":"{\"On\":false}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":510,"y":540,"wires":[["186c6853.8a293"]]},{"id":"186c6853.8a293","type":"trigger","z":"604c0bd3.4e24e4","op1":"Internet down was triggered","op2":"","op1type":"str","op2type":"pay","duration":"20","extend":false,"units":"min","reset":"","bytopic":"all","name":"","x":670,"y":500,"wires":[["7f28a90b.63ffe8"]]},{"id":"7f28a90b.63ffe8","type":"e-mail","z":"604c0bd3.4e24e4","server":"smtp.mail.yahoo.com","port":"465","secure":true,"tls":true,"name":"seangracey@yahoo.ca","dname":"Internet Down","x":880,"y":500,"wires":[]},{"id":"c49d9d82.82fc48","type":"mqtt in","z":"604c0bd3.4e24e4","name":"Internet Down","topic":"+/sonoff-7921/#","qos":"0","datatype":"auto","broker":"1ea405ed.106612","x":190,"y":80,"wires":[["e75a64fd.98e5c8","5ce47200.fd1074"]]},{"id":"cb1024d2.7ac418","type":"mqtt out","z":"604c0bd3.4e24e4","name":"Internet Down","topic":"","qos":"0","retain":"","broker":"1ea405ed.106612","x":940,"y":300,"wires":[]},{"id":"5e73aaee.187154","type":"debug","z":"604c0bd3.4e24e4","name":"Google","active":true,"tosidebar":true,"console":true,"tostatus":true,"complete":"payload","targetType":"msg","x":300,"y":680,"wires":[]},{"id":"51c36573.fd7cdc","type":"trigger","z":"604c0bd3.4e24e4","op1":"","op2":"false","op1type":"nul","op2type":"bool","duration":"2","extend":true,"units":"min","reset":"","bytopic":"all","name":"After 1 minute of downtime","x":200,"y":460,"wires":[["5e73aaee.187154","4816c3b7.094254"]]},{"id":"d3a92163.f474b","type":"switch","z":"604c0bd3.4e24e4","name":"","property":"payload","propertyType":"msg","rules":[{"t":"false"},{"t":"nnull"}],"checkall":"false","repair":false,"outputs":2,"x":250,"y":360,"wires":[["a647ed09.0789d"],["8e18e083.2a5d8","51c36573.fd7cdc"]]},{"id":"8e18e083.2a5d8","type":"debug","z":"604c0bd3.4e24e4","name":"Down","active":true,"tosidebar":true,"console":true,"tostatus":true,"complete":"payload","targetType":"msg","x":180,"y":600,"wires":[]},{"id":"a647ed09.0789d","type":"debug","z":"604c0bd3.4e24e4","name":"Not Down","active":true,"tosidebar":true,"console":true,"tostatus":true,"complete":"payload","targetType":"msg","x":330,"y":620,"wires":[]},{"id":"b7b699ff.52e06","type":"inject","z":"604c0bd3.4e24e4","name":"Test","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":90,"y":520,"wires":[["51c36573.fd7cdc"]]},{"id":"6962b7ae.38d428","type":"homekit-bridge","z":"","bridgeName":"Raj-NodeRed","pinCode":"031-45-154","port":"51830","allowInsecureRequest":true,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true},{"id":"1ea405ed.106612","type":"mqtt-broker","z":"","name":"","broker":"jesse.local","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthRetain":"false","birthPayload":"","closeTopic":"","closeQos":"0","closeRetain":"false","closePayload":"","willTopic":"","willQos":"0","willRetain":"false","willPayload":""}]
```

Once you import this flow you need to change these nodes for you environment.

1 - MQTT -> Internet Down - Update server and topic for your MQTT server and topic of your outlet.

2 - HOMEKIT -> Internet Down - Update bridge for you HomeKit bridge and topic for your outlet.

3 - EMAIL -> Internet Down - Update the email address to your email address.

4 - FUNCTION -> If down - Edit function to use your outlets topic.

5 - INJECT -> Status - Update topic to your outlet
