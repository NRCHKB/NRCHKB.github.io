---
title: "Window Covering"
description: "Window Covering"
lead: ""
date: 2021-04-17T18:50:12.040Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "WindowCovering"
contributors: ["oliverrahner","crxporter","Shaquu"]
---

A minimal Window Covering only has a Position.
Additionally, Horizontal and Vertical tilt angles can be added, as well as information about Obstruction Detection.

Position State is an official characteristic, but does not have any effect!
It is implicitly derived by comparing Current State to Target State (e.g. `Current State` > `Target State` = Decreasing).

When `Current State` and `Target State` are not equal, you will get the spinning icon in Home.app.
If the actual state is set from outside, you should take care to set both Current and Target State.

## Examples

These examples are meant to be copied into your Node-RED system and adapted to your setup.

### Window Covering with all characteristics

This is a Window Covering with all possible characteristics.

The flow looks like this:

![Screenshot](https://user-images.githubusercontent.com/2277681/54522658-0e7fd680-496e-11e9-9676-8d11836e9809.png)

In Home.app, you will get this:

![image](https://user-images.githubusercontent.com/2277681/54523802-a7175600-4970-11e9-8375-f8cff856b2fb.png)

![image](https://user-images.githubusercontent.com/2277681/54523536-0d4fa900-4970-11e9-9843-1f676613ad60.png)

Copyable Node-RED flow:

```json
[{"id":"aacd89c2.2cf708","type":"tab","label":"Testing","disabled":false,"info":""},{"id":"e39012d0.77447","type":"homekit-service","z":"aacd89c2.2cf708","bridge":"70be1f2a.34314","name":"Test Window Covering","serviceName":"WindowCovering","topic":"","manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"TargetPosition\": {\n        \"minStep\":20\n    },\n    \"TargetHorizontalTiltAngle\": true,\n    \"TargetVerticalTiltAngle\": true\n}","x":520,"y":300,"wires":[["cf5355d1.91afc8"]]},{"id":"8faeffe4.6ec61","type":"inject","z":"aacd89c2.2cf708","name":"CurrentPosition 100","topic":"","payload":"{\"CurrentPosition\":100}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":250,"y":180,"wires":[["e39012d0.77447"]]},{"id":"cf5355d1.91afc8","type":"debug","z":"aacd89c2.2cf708","name":"homekit out","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":750,"y":300,"wires":[]},{"id":"cbe11203.84b35","type":"inject","z":"aacd89c2.2cf708","name":"CurrentPosition 0","topic":"","payload":"{\"CurrentPosition\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":260,"y":220,"wires":[["e39012d0.77447"]]},{"id":"36b2737d.e528fc","type":"inject","z":"aacd89c2.2cf708","name":"TargetPosition 100","topic":"","payload":"{\"TargetPosition\":100}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":250,"y":280,"wires":[["e39012d0.77447"]]},{"id":"b450a83e.45f568","type":"inject","z":"aacd89c2.2cf708","name":"TargetPosition 0","topic":"","payload":"{\"TargetPosition\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":260,"y":320,"wires":[["e39012d0.77447"]]},{"id":"c82bfcbd.1c4d3","type":"inject","z":"aacd89c2.2cf708","name":"ObstructionDetected true","topic":"","payload":"{\"ObstructionDetected\": true}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":230,"y":380,"wires":[["e39012d0.77447"]]},{"id":"ebf74dcf.2a0bf","type":"inject","z":"aacd89c2.2cf708","name":"ObstructionDetected false","topic":"","payload":"{\"ObstructionDetected\": false}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":230,"y":420,"wires":[["e39012d0.77447"]]},{"id":"46a23db5.7df9d4","type":"inject","z":"aacd89c2.2cf708","name":"CurrentHorizontalTiltAngle 90","topic":"","payload":"{\"CurrentHorizontalTiltAngle\":90}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":540,"y":60,"wires":[["e39012d0.77447"]]},{"id":"c90cc4ef.a269a8","type":"inject","z":"aacd89c2.2cf708","name":"CurrentHorizontalTiltAngle 0","topic":"","payload":"{\"CurrentHorizontalTiltAngle\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":540,"y":100,"wires":[["e39012d0.77447"]]},{"id":"d2707cbb.eb138","type":"inject","z":"aacd89c2.2cf708","name":"TargetHorizontalTiltAngle 90","topic":"","payload":"{\"TargetHorizontalTiltAngle\":90}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":540,"y":160,"wires":[["e39012d0.77447"]]},{"id":"60d7f4f7.f5aa5c","type":"inject","z":"aacd89c2.2cf708","name":"TargetHorizontalTiltAngle 0","topic":"","payload":"{\"TargetHorizontalTiltAngle\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":550,"y":200,"wires":[["e39012d0.77447"]]},{"id":"af9a7766.48f3b8","type":"inject","z":"aacd89c2.2cf708","name":"CurrentVerticalTiltAngle 90","topic":"","payload":"{\"CurrentVerticalTiltAngle\":90}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":550,"y":380,"wires":[["e39012d0.77447"]]},{"id":"bdb9983f.fcbaa8","type":"inject","z":"aacd89c2.2cf708","name":"CurrentVerticalTiltAngle 0","topic":"","payload":"{\"CurrentVerticalTiltAngle\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":550,"y":420,"wires":[["e39012d0.77447"]]},{"id":"a441716d.20eca","type":"inject","z":"aacd89c2.2cf708","name":"TargetVerticalTiltAngle 90","topic":"","payload":"{\"TargetVerticalTiltAngle\":90}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":550,"y":480,"wires":[["e39012d0.77447"]]},{"id":"9bf44704.7d50b8","type":"inject","z":"aacd89c2.2cf708","name":"TargetVerticalTiltAngle 0","topic":"","payload":"{\"TargetVerticalTiltAngle\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":560,"y":520,"wires":[["e39012d0.77447"]]},{"id":"70be1f2a.34314","type":"homekit-bridge","z":"","bridgeName":"2","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number"}]
```

### Simple open / close window with various target positions

This is a Window Covering with only open and close characteristics. This is meant to demonstrate what the Home.app shows when injecting `TargetPosition` and `CurrentPosition`, the required properties for this item. The messages may be sent together in a single payload or with a delay between to show "opening" and "closing" in the Home.app.

![Screen Shot 2020-03-04 at 9 09 19 AM](https://user-images.githubusercontent.com/38265886/75893006-d5977680-5df7-11ea-8835-669ab7ecf111.png)

Node red code:

```json
[{"id":"33c51ce8.cdcba4","type":"homekit-service","z":"e88791ff.5a188","isParent":true,"bridge":"6bd92034.8c2118","parentService":"","name":"Juhpesis","serviceName":"WindowCovering","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","x":500,"y":1340,"wires":[["61e24618.902f98"],[]]},{"id":"61e24618.902f98","type":"debug","z":"e88791ff.5a188","name":"TargetPosition from Home.app","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":750,"y":1340,"wires":[]},{"id":"23e75e7f.69bdd2","type":"inject","z":"e88791ff.5a188","name":"Both messages closed","topic":"","payload":"{\"TargetPosition\": 0,\"CurrentPosition\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":220,"y":1140,"wires":[["33c51ce8.cdcba4"]]},{"id":"91c368ed.a7f2b","type":"inject","z":"e88791ff.5a188","name":"","topic":"","payload":"{\"CurrentPosition\": 0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":1280,"wires":[["33c51ce8.cdcba4"]]},{"id":"7965d800.81f26","type":"inject","z":"e88791ff.5a188","name":"","topic":"","payload":"{\"TargetPosition\": 45}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":1360,"wires":[["33c51ce8.cdcba4"]]},{"id":"7993b0da.24d22","type":"inject","z":"e88791ff.5a188","name":"","topic":"","payload":"{\"CurrentPosition\": 45}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":1400,"wires":[["33c51ce8.cdcba4"]]},{"id":"fedbd19a.615c68","type":"inject","z":"e88791ff.5a188","name":"","topic":"","payload":"{\"TargetPosition\": 75}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":1500,"wires":[["33c51ce8.cdcba4"]]},{"id":"f302ebc1.fa1438","type":"inject","z":"e88791ff.5a188","name":"","topic":"","payload":"{\"CurrentPosition\": 75}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":1540,"wires":[["33c51ce8.cdcba4"]]},{"id":"dfd8b214.4c7f18","type":"inject","z":"e88791ff.5a188","name":"","topic":"","payload":"{\"TargetPosition\": 100}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":1620,"wires":[["33c51ce8.cdcba4"]]},{"id":"4a6d7faf.204b9","type":"inject","z":"e88791ff.5a188","name":"{\"CurrentPosition\": 100}","topic":"","payload":"{\"CurrentPosition\": 100}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":1660,"wires":[["33c51ce8.cdcba4"]]},{"id":"b233be35.af7af","type":"inject","z":"e88791ff.5a188","name":"","topic":"","payload":"{\"TargetPosition\": 0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":1240,"wires":[["33c51ce8.cdcba4"]]},{"id":"d385760e.e9b0a8","type":"inject","z":"e88791ff.5a188","name":"Both messages open","topic":"","payload":"{\"TargetPosition\": 100,\"CurrentPosition\":100}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":260,"y":1740,"wires":[["33c51ce8.cdcba4"]]},{"id":"6bd92034.8c2118","type":"homekit-bridge","z":"","bridgeName":"zwave2mqtt","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```
