---
title: "Switch"
description: "Switch"
lead: ""
date: 2021-04-05T11:54:45.000Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "Switch"
contributors: ["crxporter", "Shaquu"]
---

Switch allow for implementing on/off logic to your devices.

## Examples

These examples are meant to be copied into your Node-RED system and adapted to your setup.

### Simple on/off Switch

This is an example of a switch item. The input nodes are "On" and "Off". The debug node will return values when the switch is turned on or off via the Home app on an Apple device.

Home.app            |  node-red | YouTube
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/2881159/73109648-07b5de80-3f04-11ea-9a74-5ec4af995b66.png" width="300" alt="Example Switch in Home.app"/>  |  ![Example Switch in node-red](https://user-images.githubusercontent.com/2881159/73109622-f240b480-3f03-11ea-94bc-066bf9715074.png) | [![Example Switch on YouTube](https://img.youtube.com/vi/kPuFKZWweCk/0.jpg)](https://www.youtube.com/watch?v=kPuFKZWweCk)

#### Copyable Node-RED flow:

<details>
<summary>Click to expand!</summary>
<p>

```json
[
    {
        "id": "7509f965.646da8",
        "type": "inject",
        "z": "53127d0.a094d84",
        "name": "On",
        "topic": "",
        "payload": "{\"On\":true}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 230,
        "y": 320,
        "wires": [
            [
                "84c5345e.cea678"
            ]
        ]
    },
    {
        "id": "83aa9e6a.6ac9e",
        "type": "debug",
        "z": "53127d0.a094d84",
        "name": "HomeKit Out",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 650,
        "y": 340,
        "wires": []
    },
    {
        "id": "6f909132.f78a",
        "type": "inject",
        "z": "53127d0.a094d84",
        "name": "Off",
        "topic": "",
        "payload": "{\"On\":false}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 230,
        "y": 360,
        "wires": [
            [
                "84c5345e.cea678"
            ]
        ]
    },
    {
        "id": "84c5345e.cea678",
        "type": "homekit-service",
        "z": "53127d0.a094d84",
        "isParent": true,
        "bridge": "51de116c.bb01",
        "parentService": "",
        "name": "Example Switch",
        "serviceName": "Switch",
        "topic": "",
        "filter": false,
        "manufacturer": "NRCHKB",
        "model": "Default Model",
        "serialNo": "1.1.1",
        "firmwareRev": "1.1.1",
        "hardwareRev": "1.1.1",
        "softwareRev": "1.0.0",
        "cameraConfigVideoProcessor": "ffmpeg",
        "cameraConfigSource": "",
        "cameraConfigStillImageSource": "",
        "cameraConfigMaxStreams": 2,
        "cameraConfigMaxWidth": 1280,
        "cameraConfigMaxHeight": 720,
        "cameraConfigMaxFPS": 10,
        "cameraConfigMaxBitrate": 300,
        "cameraConfigVideoCodec": "libx264",
        "cameraConfigAudioCodec": "libfdk_aac",
        "cameraConfigAudio": false,
        "cameraConfigPacketSize": 1316,
        "cameraConfigVerticalFlip": false,
        "cameraConfigHorizontalFlip": false,
        "cameraConfigMapVideo": "0:0",
        "cameraConfigMapAudio": "0:1",
        "cameraConfigVideoFilter": "scale=1280:720",
        "cameraConfigAdditionalCommandLine": "-tune zerolatency",
        "cameraConfigDebug": false,
        "cameraConfigSnapshotOutput": "disabled",
        "cameraConfigInterfaceName": "",
        "characteristicProperties": "{}",
        "x": 440,
        "y": 340,
        "wires": [
            [
                "83aa9e6a.6ac9e"
            ],
            [
                "83aa9e6a.6ac9e"
            ]
        ]
    },
    {
        "id": "51de116c.bb01",
        "type": "homekit-bridge",
        "z": "",
        "bridgeName": "Example Bridge",
        "pinCode": "111-11-111",
        "port": "",
        "allowInsecureRequest": false,
        "manufacturer": "Default Manufacturer",
        "model": "Default Model",
        "serialNo": "Default Serial Number",
        "customMdnsConfig": false,
        "mdnsMulticast": true,
        "mdnsInterface": "",
        "mdnsPort": "",
        "mdnsIp": "",
        "mdnsTtl": "",
        "mdnsLoopback": true,
        "mdnsReuseAddr": true,
        "allowMessagePassthrough": true
    }
]
```

</p>
</details>
