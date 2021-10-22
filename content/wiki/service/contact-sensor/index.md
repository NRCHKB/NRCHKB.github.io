---
title: "Contact Sensor"
description: "Contact Sensor"
lead: ""
date: 2021-04-17T18:50:12.028Z
lastmod: 2021-10-22T17:53:40+02:00
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "ContactSensor"
contributors: ["GogoVega"]

---

### Basic principle

This is the simplest example of a contact sensor item. The input nodes are `Open`, `Close`, `Tampered` and `Not Tampered`.

![Contact Sensor](contact_sensor_example.png)

Copyable Node-RED flow:

```json
[{"id":"d666fb54ed871feb","type":"inject","z":"12e297aed19dd6f4","name":"Close","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"0.5","topic":"","payload":"{\"ContactSensorState\":0}","payloadType":"json","x":170,"y":60,"wires":[["9e486680d55835a5"]]},{"id":"9e486680d55835a5","type":"homekit-service","z":"12e297aed19dd6f4","isParent":true,"hostType":"0","bridge":"5b5f6f73.10106","accessoryId":"","parentService":"","name":"Contact Sensor","serviceName":"ContactSensor","topic":"","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{\"ContactSensorState\":0,\"StatusTampered\":false}","waitForSetupMsg":false,"outputs":2,"x":420,"y":160,"wires":[[],[]]},{"id":"af920b06516e5680","type":"inject","z":"12e297aed19dd6f4","name":"Open","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"0.5","topic":"","payload":"{\"ContactSensorState\":1}","payloadType":"json","x":170,"y":120,"wires":[["9e486680d55835a5"]]},{"id":"8e6cbaee4b087ccb","type":"inject","z":"12e297aed19dd6f4","name":"Tampered","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"0.5","topic":"","payload":"{\"StatusTampered\":true}","payloadType":"json","x":180,"y":220,"wires":[["9e486680d55835a5"]]},{"id":"5bd9bdfeb5c1e653","type":"inject","z":"12e297aed19dd6f4","name":"Not Tampered","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":"0.5","topic":"","payload":"{\"StatusTampered\":false}","payloadType":"json","x":190,"y":280,"wires":[["9e486680d55835a5"]]},{"id":"5b5f6f73.10106","type":"homekit-bridge","bridgeName":"Pont Node-Red","pinCode":"123-45-321","port":"","allowInsecureRequest":true,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Raspberry Pi 3 B+","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

#### Characteristic Properties

Use the following JSON in your characteristic properties so that the Home application displays a contact sensor with status tampered.

```json
{
  "ContactSensorState": 0,
  "StatusTampered": false
}
```

### Example

#### Implementation with an Omron PLC

This is an example of a contact sensor element wired in NO with a safety if the cable is cut.

![Contact Sensor Omron PLC](contact_sensor_omron_plc_example.png)

To do this you must:

1. Install `node-red-contrib-omron-fins` and `node-red-contrib-buffer-parser`.
2. Configure the `Read PLC` node with address of the contact sensor and  the status tampered on your PLC. Here the address is CIO10. [Help](https://github.com/Steve-Mcl/node-red-contrib-omron-fins)
3. Configure the `Buffer-Parser` nodes to convert Int16 to 16bits values. [Help](https://github.com/Steve-Mcl/node-red-contrib-buffer-parser)
4. Change address configured in `10.00-10.01` function node by the desired address.
5. Configure the `HomeKit` configuration node.

Copyable Node-RED flow:

```json
[{"id":"d666fb54ed871feb","type":"inject","z":"12e297aed19dd6f4","name":"2s","props":[{"p":"time","v":"true","vt":"bool"}],"repeat":"2","crontab":"","once":false,"onceDelay":"0.5","topic":"","x":110,"y":60,"wires":[["93b4e6bbe3b1a7b2"]]},{"id":"93b4e6bbe3b1a7b2","type":"FINS Read Multiple","z":"12e297aed19dd6f4","name":"Read PLC","connection":"11b8375b.b1ee31","addressType":"str","address":"CIO10","msgPropertyType":"msg","msgProperty":"CIO_READ","outputFormatType":"signed","outputFormat":"","x":270,"y":60,"wires":[["60edd09485c09cf0"]]},{"id":"60edd09485c09cf0","type":"buffer-parser","z":"12e297aed19dd6f4","name":"Int16=>16b","data":"CIO_READ","dataType":"msg","specification":"spec","specificationType":"ui","items":[{"type":"16bitbe","name":"CIO10","offset":0,"length":1,"offsetbit":0,"scale":"1","mask":""}],"swap1":"","swap2":"","swap3":"","swap1Type":"swap","swap2Type":"swap","swap3Type":"swap","msgProperty":"CIO_READ","msgPropertyType":"str","resultType":"keyvalue","resultTypeType":"output","multipleResult":false,"fanOutMultipleResult":false,"setTopic":true,"outputs":1,"x":450,"y":60,"wires":[["1b23e6a98e61d44c"]]},{"id":"9e486680d55835a5","type":"homekit-service","z":"12e297aed19dd6f4","isParent":true,"hostType":"0","bridge":"5b5f6f73.10106","accessoryId":"","parentService":"","name":"Contact Sensor","serviceName":"ContactSensor","topic":"","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{\"ContactSensorState\":0,\"StatusTampered\":false}","waitForSetupMsg":false,"outputs":2,"x":820,"y":60,"wires":[[],[]]},{"id":"1b23e6a98e61d44c","type":"function","z":"12e297aed19dd6f4","name":"10.00-10.01","func":"var ContactState = msg.CIO_READ.CIO10[0].bits[0];   //10.00\nvar TamperedState = msg.CIO_READ.CIO10[0].bits[1];  //10.01\n\nmsg = {payload:{\n    \"StatusTampered\":TamperedState,\n    \"ContactSensorState\":ContactState\n    }\n};\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":630,"y":60,"wires":[["9e486680d55835a5"]]},{"id":"11b8375b.b1ee31","type":"FINS Connection","name":"PLC","host":"192.168.1.2","port":"9600","MODE":"","MODEType":"CS","protocol":"","protocolType":"udp","ICF":"","DNA":"","DA1":"2","DA2":"","SNA":"","SA1":"20","SA2":"","autoConnect":true},{"id":"5b5f6f73.10106","type":"homekit-bridge","bridgeName":"Pont Node-Red","pinCode":"123-45-321","port":"","allowInsecureRequest":true,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Raspberry Pi 3 B+","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```
