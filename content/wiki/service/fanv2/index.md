---
title: "Fanv2"
description: "Fanv2"
lead: ""
date: 2021-04-17T18:50:12.029Z
lastmod: 2021-08-03T21:21:00+01:00
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "Fanv2"
contributors: ["crxporter", "caitken-com"]
---

If you would like to have all features, use this in Characteristic Properties:
```json
{
    "SwingMode":true,
    "RotationDirection":true,
    "RotationSpeed":true
}
```

If you would like to limit the rotation speed to 4 speeds, use the following in your Characteristic Properties field:
```json
{
    "SwingMode":true,
    "RotationSpeed":{
        "minValue": 0,
        "maxValue": 100,
        "minStep":25
    },
    "RotationDirection":true
}
```

## Examples

These examples are meant to be copied into your Node-RED system and adapted to your setup.

### Full Featured fan

This is an example of a fan with rotation speed range from 0 to 100, changeable rotation direction, and oscillate feature. Additionally there is a function node that will remember the state of all characteristics and pass them on to the next node if any state of the fan was changed from inside of the Home.app.

Please see comments inside the function node for explanation of how it works.

![Screen Shot 2019-03-19 at 7 34 30 AM](https://user-images.githubusercontent.com/38265886/54606292-6fb0b400-4a19-11e9-9331-01f7311947a5.png)

Copyable Node-RED flow:
```json
[{"id":"e144d033.29c8b","type":"random","z":"70499365.f98a34","name":"Random Speed","low":"1","high":"100","inte":"true","property":"payload","x":580,"y":220,"wires":[["352c1899.bc572"]]},{"id":"ce15d433.0f9078","type":"inject","z":"70499365.f98a34","name":"Rotation Speed","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":380,"y":220,"wires":[["e144d033.29c8b"]]},{"id":"352c1899.bc572","type":"change","z":"70499365.f98a34","name":"To JSON","rules":[{"t":"move","p":"payload","pt":"msg","to":"payload.RotationSpeed","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":500,"y":280,"wires":[["2b80e6f3.a922ba"]]},{"id":"2b80e6f3.a922ba","type":"homekit-service","z":"70499365.f98a34","isParent":true,"bridge":"63a21f39.7ace9","parentService":"","name":"Fan V2","serviceName":"Fanv2","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"SwingMode\":true,\n    \"RotationDirection\":true,\n    \"RotationSpeed\":true\n}","x":320,"y":340,"wires":[["56166d2c.e2041c","fbd3a6e6.f9cf7"]]},{"id":"56166d2c.e2041c","type":"function","z":"70499365.f98a34","name":"Full output","func":"/* Initialize your variables. Replace\nthe default variable with whatever you\nwould like to send in case of reboot when\nthere is no context variable saved. The\nstatement for \"Active\" is read in english \nlike:\n    \"create variable Active for this function\n    use the context veriable if there is one\n    otherwise set it to 0\"\nThese context variables hold the state of\neach setting so they can be passed to\nother nodes (i.e. Harmony remote, OpenHAB)*/\n\nvar Active = context.get('Active')||0;\nvar RotationSpeed = context.get('RotationSpeed')||0;\nvar RotationDirection = context.get('RotationDirection')||0;\nvar SwingMode = context.get('SwingMode')||0;\n\nvar FullOutput={};\n\nif(msg.payload.Active === 0 || msg.payload.Active == 1){\n    Active = msg.payload.Active;\n    context.set('Active',Active);\n}\nif(msg.payload.RotationSpeed){\n    RotationSpeed = msg.payload.RotationSpeed;\n    context.set('RotationSpeed',RotationSpeed);\n}\nif(msg.payload.RotationDirection === 0 || msg.payload.RotationDirection == 1){\n    RotationDirection = msg.payload.RotationDirection;\n    context.set('RotationDirection',RotationDirection);\n}\nif(msg.payload.SwingMode === 0 || msg.payload.SwingMode == 1){\n    SwingMode = msg.payload.SwingMode;\n    context.set('SwingMode',SwingMode);\n}\nif (msg.hap.context !== undefined) {\n    FullOutput.payload={\n        \"Active\":Active,\n        \"RotationSpeed\":RotationSpeed,\n        \"RotationDirection\":RotationDirection,\n        \"SwingMode\":SwingMode\n    }\n    return [FullOutput]\n}","outputs":1,"noerr":0,"x":530,"y":340,"wires":[["13714915.5e847f"]]},{"id":"fbd3a6e6.f9cf7","type":"debug","z":"70499365.f98a34","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":500,"y":440,"wires":[]},{"id":"e80a42f1.4f13c8","type":"inject","z":"70499365.f98a34","name":"Clockwise","topic":"","payload":"{\"RotationDirection\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":140,"y":220,"wires":[["2b80e6f3.a922ba"]]},{"id":"a41bb9bb.93c26","type":"inject","z":"70499365.f98a34","name":"Counterclockwise","topic":"","payload":"{\"RotationDirection\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":260,"wires":[["2b80e6f3.a922ba"]]},{"id":"370f1b5b.17c2ec","type":"inject","z":"70499365.f98a34","name":"Off","topic":"","payload":"{\"Active\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":340,"wires":[["2b80e6f3.a922ba"]]},{"id":"e592a6ab.b6ed88","type":"inject","z":"70499365.f98a34","name":"On","topic":"","payload":"{\"Active\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":380,"wires":[["2b80e6f3.a922ba"]]},{"id":"1e9168b4.b9f977","type":"inject","z":"70499365.f98a34","name":"Oscillate Off","topic":"","payload":"{\"SwingMode\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":460,"wires":[["2b80e6f3.a922ba"]]},{"id":"c584f489.ab4fe8","type":"inject","z":"70499365.f98a34","name":"Oscillate On","topic":"","payload":"{\"SwingMode\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":500,"wires":[["2b80e6f3.a922ba"]]},{"id":"13714915.5e847f","type":"debug","z":"70499365.f98a34","name":"Full Output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":730,"y":340,"wires":[]},{"id":"63a21f39.7ace9","type":"homekit-bridge","z":"","bridgeName":"Dev2","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true}]
```
