---
title: "Window"
description: "Window"
lead: ""
date: 2021-04-17T18:50:12.039Z
lastmod: 2021-10-15T22:06:26.781Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "Window"
contributors: ["djiwondee","Shaquu"]
---

This service describes a motorized window to be appeared in the Home.app showing a status and whether the windows are moving its position based on an injected payload.

## Example

### Simple Window Contact Sensor

The following simple setup is to demonstrate core characteristics and its representation in the Home.app:

<img width="791" alt="image" src="https://user-images.githubusercontent.com/37173958/59024470-3fc3c080-8852-11e9-991b-30696d02253d.png">

These examples are meant to be copied into your Node-RED system and adapted to your setup.

```json
[{"id":"3d4e49d.f6615b6","type":"debug","z":"9507c98c.4f4f9","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":930,"y":480,"wires":[]},{"id":"c4ea5eb2.8ea768","type":"homekit-service","z":"9507c98c.4f4f9","isParent":true,"bridge":"90fc07e3.c93f68","parentService":"","name":"Terrace Door","serviceName":"Window","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"CurrentPosition\" :\n    {\n        \"minValue\":0,\n        \"maxValue\":100\n    },\n    \"TargetPosition\" :\n    {\n        \"minValue\":0,\n        \"maxValue\":100\n    },\n    \"PositionState\" :\n    {\n        \"validValues\": [0,1,2]\n    }\n}","x":730,"y":480,"wires":[["3d4e49d.f6615b6"]]},{"id":"2b02704f.d19cd8","type":"inject","z":"9507c98c.4f4f9","name":"Fully Closed","topic":"","payload":"{\"CurrentPosition\":0,\"TargetPosition\":0,\"PositionState\":2}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":370,"y":400,"wires":[["c4ea5eb2.8ea768"]]},{"id":"8d2e31fd.cc131","type":"inject","z":"9507c98c.4f4f9","name":"Full Opened","topic":"","payload":"{\"CurrentPosition\":100,\"TargetPosition\":100,\"PositionState\":2}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":370,"y":520,"wires":[["c4ea5eb2.8ea768"]]},{"id":"99f537b0.170d58","type":"inject","z":"9507c98c.4f4f9","name":"Move to Open","topic":"","payload":"{\"CurrentPosition\":30,\"TargetPosition\":100,\"PositionState\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":370,"y":460,"wires":[["c4ea5eb2.8ea768"]]},{"id":"1cbdc891.e275df","type":"inject","z":"9507c98c.4f4f9","name":"Move to Close","topic":"","payload":"{\"CurrentPosition\":75,\"TargetPosition\":0,\"PositionState\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":380,"y":580,"wires":[["c4ea5eb2.8ea768"]]},{"id":"90fc07e3.c93f68","type":"homekit-bridge","z":"","bridgeName":"RedMatic-Homekit-Bridge-01","pinCode":"111-22-333","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true}]
```

It simulates the full open or close state as well as presentation while moving to close/open.

### Windows Contact Sensor with interaction

The following example is intended just to display the state of the window. Since the terrace door/windows is not motorized but equipped with a 3rd party contact sensor, the objective is to have the open/closed state in the Home.app as the initiator for an automated roller shutter operation (e.g. prevent closing while outside or lift roller shutter when its closed and window is opened):

<img width="1388" alt="image" src="https://user-images.githubusercontent.com/37173958/59026674-50c30080-8857-11e9-8058-61202932d75c.png">

Copyable Node-RED flow:

```json
[{"id":"a9964283.b3da28","type":"ccu-value","z":"9507c98c.4f4f9","name":"Terrassentür Kontakt","iface":"HmIP-RF","channel":"0000DA498BD08E:1","datapoint":"STATE","mode":"","start":true,"change":true,"cache":false,"queue":false,"on":0,"onType":"undefined","ramp":0,"rampType":"undefined","working":false,"ccuConfig":"38263145.35ea0e","topic":"${CCU}/${Interface}/${channel}/${datapoint}","x":140,"y":360,"wires":[["5ec5c10f.f98af"]]},{"id":"c4ea5eb2.8ea768","type":"homekit-service","z":"9507c98c.4f4f9","isParent":true,"bridge":"90fc07e3.c93f68","parentService":"","name":"Terrace Door","serviceName":"Window","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"CurrentPosition\" :\n    {\n        \"minValue\":0,\n        \"maxValue\":100\n    },\n    \"TargetPosition\" :\n    {\n        \"minValue\":0,\n        \"maxValue\":100\n    },\n    \"PositionState\" :\n    {\n        \"validValues\": [0,1,2]\n    }\n}","x":910,"y":220,"wires":[["c9cf566e.b05da"]]},{"id":"5ec5c10f.f98af","type":"switch","z":"9507c98c.4f4f9","name":"Route msg based on state","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"0","vt":"num"},{"t":"eq","v":"1","vt":"num"},{"t":"else"}],"checkall":"true","repair":false,"outputs":3,"x":420,"y":360,"wires":[["118f6dc4.b5bbca"],["b400dad5.fd2dd8"],[]]},{"id":"118f6dc4.b5bbca","type":"change","z":"9507c98c.4f4f9","name":"HkMsg Window Closed","rules":[{"t":"set","p":"payload","pt":"msg","to":"{\"CurrentPosition\":0,\"TargetPosition\":0,\"PositionState\":2}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":690,"y":180,"wires":[["c4ea5eb2.8ea768"]]},{"id":"b400dad5.fd2dd8","type":"change","z":"9507c98c.4f4f9","name":"HkMsg Window Open","rules":[{"t":"set","p":"payload","pt":"msg","to":"{\"CurrentPosition\":100,\"TargetPosition\":100,\"PositionState\":2}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":680,"y":220,"wires":[["c4ea5eb2.8ea768"]]},{"id":"6d406a1c.b9cf44","type":"delay","z":"9507c98c.4f4f9","name":"Delay 1 sec","pauseType":"delay","timeout":"1","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":910,"y":280,"wires":[["646dcc59.845ca4"]]},{"id":"565475f.e48f18c","type":"ccu-get-value","z":"9507c98c.4f4f9","name":"Get real state value","ccuConfig":"38263145.35ea0e","iface":"HmIP-RF","channel":"0000DA498BD08E:1 HMIP-SWDO 0000DA498BD08E:1","sysvar":"Alarmmeldungen","sysvarProperty":"value","datapoint":"STATE","datapointProperty":"value","setProp":"payload","setPropType":"msg","x":930,"y":360,"wires":[["5ec5c10f.f98af"]]},{"id":"e086f87d.7698e","type":"comment","z":"9507c98c.4f4f9","name":"Only Home.app initated messages passed through","info":"","x":1210,"y":180,"wires":[]},{"id":"c9cf566e.b05da","type":"switch","z":"9507c98c.4f4f9","name":"Check hap.context","property":"hap.context","propertyType":"msg","rules":[{"t":"nnull"},{"t":"else"}],"checkall":"true","repair":false,"outputs":2,"x":1110,"y":220,"wires":[["6d406a1c.b9cf44"],[]],"info":"make sure only Home.app initaited messages gets passed through"},{"id":"646dcc59.845ca4","type":"change","z":"9507c98c.4f4f9","name":"Inject real state quuery","rules":[{"t":"set","p":"payload","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":1120,"y":280,"wires":[["565475f.e48f18c"]]},{"id":"38263145.35ea0e","type":"ccu-connection","z":"","name":"localhost","host":"localhost","regaEnabled":true,"bcrfEnabled":true,"iprfEnabled":true,"virtEnabled":true,"bcwiEnabled":false,"cuxdEnabled":false,"regaPoll":true,"regaInterval":"30","rpcPingTimeout":"60","rpcInitAddress":"127.0.0.1","rpcServerHost":"127.0.0.1","rpcBinPort":"2047","rpcXmlPort":"2048"},{"id":"90fc07e3.c93f68","type":"homekit-bridge","z":"","bridgeName":"RedMatic-Homekit-Bridge-01","pinCode":"111-22-333","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true}]
```

After an interaction in the Home.app, the service characteristics has always to revert to the real state of the window provided by the 3rd party sensor. For presentation purposes to see the "virtual" moving state, the message driven bei the Home.app is delayed before the reale state gets requested. In addition to that Siri can now be asked about the state of the Terrace window.
