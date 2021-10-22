---
title: "Smoke Sensor"
description: "Smoke Sensor"
lead: ""
date: 2021-04-17T18:50:12.035Z
lastmod: 2021-04-17T18:50:12.035Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "SmokeSensor"
contributors: ["GogoVega"]
---

### Basic principle

This is the simplest example of a Smoke sensor item. The input nodes are `Smoke`, `Not Smoke`, `Tampered` and `Not Tampered`.

![Sample Smoke Sensor](https://user-images.githubusercontent.com/92022724/138468809-a13f597f-0df9-4073-a5ab-ab5f8fae90a2.PNG)

Copyable Node-RED flow:

```json
[{"id":"f3464db9344a9035","type":"inject","z":"cc2eca629cd42ae6","name":"Not Smoke","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"0.5","topic":"","payload":"{\"SmokeDetected\":0}","payloadType":"json","x":160,"y":60,"wires":[["47426d7718423551"]]},{"id":"47426d7718423551","type":"homekit-service","z":"cc2eca629cd42ae6","isParent":true,"hostType":"0","bridge":"5b5f6f73.10106","accessoryId":"","parentService":"","name":"Smoke Sensor","serviceName":"SmokeSensor","topic":"","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{\"SmokeDetected\":0,\"StatusTampered\":false}","waitForSetupMsg":false,"outputs":2,"x":400,"y":160,"wires":[[],[]]},{"id":"5a43592a0b75743a","type":"inject","z":"cc2eca629cd42ae6","name":"Smoke","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"0.5","topic":"","payload":"{\"SmokeDetected\":1}","payloadType":"json","x":150,"y":120,"wires":[["47426d7718423551"]]},{"id":"526ba7b6725bc61c","type":"inject","z":"cc2eca629cd42ae6","name":"Tampered","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"0.5","topic":"","payload":"{\"StatusTampered\":true}","payloadType":"json","x":160,"y":220,"wires":[["47426d7718423551"]]},{"id":"f09db40ae78db527","type":"inject","z":"cc2eca629cd42ae6","name":"Not Tampered","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"0.5","topic":"","payload":"{\"StatusTampered\":false}","payloadType":"json","x":170,"y":280,"wires":[["47426d7718423551"]]},{"id":"5b5f6f73.10106","type":"homekit-bridge","bridgeName":"Pont Node-Red","pinCode":"123-45-321","port":"","allowInsecureRequest":true,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Raspberry Pi 3 B+","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

#### Characteristic Properties

Use the following JSON in your characteristic properties so that the Home application displays a smoke sensor with status tampered.

```json
{
	"SmokeDetected": 0,
	"StatusTampered": false
}
```

### Example

#### Implementation with an Omron PLC

This is an example of a smoke sensor element wired in NC with a safety if the sensor is open.

![Smoke Sensor](https://user-images.githubusercontent.com/92022724/138470319-47494613-5f9c-4f26-8a9a-5ef1968f8d11.PNG)

To do this you must:

1. Install `node-red-contrib-omron-fins` and `node-red-contrib-buffer-parser`.
2. Configure the `Read PLC` node with address of the smoke sensor and  the status tampered on your PLC. Here the address is CIO10. [Help](https://github.com/Steve-Mcl/node-red-contrib-omron-fins)
3. Configure the `Buffer-Parser` nodes to convert Int16 to 16bits values. [Help](https://github.com/Steve-Mcl/node-red-contrib-buffer-parser)
4. Change address configured in `10.00-10.01` function node by the desired address.
5. Configure the `HomeKit` configuration node.

Copyable Node-RED flow:

```json
[{"id":"47426d7718423551","type":"homekit-service","z":"cc2eca629cd42ae6","isParent":true,"hostType":"0","bridge":"5b5f6f73.10106","accessoryId":"","parentService":"","name":"Smoke Sensor","serviceName":"SmokeSensor","topic":"","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{\"SmokeDetected\":0,\"StatusTampered\":false}","waitForSetupMsg":false,"outputs":2,"x":820,"y":80,"wires":[[],[]]},{"id":"4715a5ee81097c4a","type":"inject","z":"cc2eca629cd42ae6","name":"2s","props":[{"p":"time","v":"true","vt":"bool"}],"repeat":"2","crontab":"","once":false,"onceDelay":"0.5","topic":"","x":110,"y":80,"wires":[["c795acf96eafbdc4"]]},{"id":"c795acf96eafbdc4","type":"FINS Read Multiple","z":"cc2eca629cd42ae6","name":"Read PLC","connection":"11b8375b.b1ee31","addressType":"str","address":"CIO10","msgPropertyType":"msg","msgProperty":"CIO_READ","outputFormatType":"signed","outputFormat":"","x":270,"y":80,"wires":[["b62552f1358aa67b"]]},{"id":"b62552f1358aa67b","type":"buffer-parser","z":"cc2eca629cd42ae6","name":"Int16=>16b","data":"CIO_READ","dataType":"msg","specification":"spec","specificationType":"ui","items":[{"type":"16bitbe","name":"CIO10","offset":0,"length":1,"offsetbit":0,"scale":"1","mask":""}],"swap1":"","swap2":"","swap3":"","swap1Type":"swap","swap2Type":"swap","swap3Type":"swap","msgProperty":"CIO_READ","msgPropertyType":"str","resultType":"keyvalue","resultTypeType":"output","multipleResult":false,"fanOutMultipleResult":false,"setTopic":true,"outputs":1,"x":450,"y":80,"wires":[["dbb680d2da6c3186"]]},{"id":"dbb680d2da6c3186","type":"function","z":"cc2eca629cd42ae6","name":"10.00-10.01","func":"var SmokeState = msg.CIO_READ.CIO10[0].bits[0];     //10.00\nvar TamperedState = msg.CIO_READ.CIO10[0].bits[1];  //10.01\n\nmsg = {payload:{\n    \"StatusTampered\":TamperedState,\n    \"ContactSensorState\":SmokeState\n    }\n};\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":630,"y":80,"wires":[["47426d7718423551"]]},{"id":"5b5f6f73.10106","type":"homekit-bridge","bridgeName":"Pont Node-Red","pinCode":"123-45-321","port":"","allowInsecureRequest":true,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Raspberry Pi 3 B+","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true},{"id":"11b8375b.b1ee31","type":"FINS Connection","name":"PLC","host":"192.168.1.2","port":"9600","MODE":"","MODEType":"CS","protocol":"","protocolType":"udp","ICF":"","DNA":"","DA1":"2","DA2":"","SNA":"","SA1":"20","SA2":"","autoConnect":true}]
```
