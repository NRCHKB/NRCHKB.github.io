---
title: "Stateless Programmable Switch"
description: "Stateless Programmable Switch"
lead: ""
date: 2021-04-17T18:50:12.036Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "StatelessProgrammableSwitch"
contributors: ["crxporter","djiwondee","Shaquu"]
---

## Examples

These examples are meant to be copied into your Node-RED system and adapted to your setup.

### Single Button

This example is a single button with 3 press options: "Single Press", "Double Press", or "Long Press". Each of these can be set in the Home.app to set a scene. Note the scene settings for these buttons is done from within the button settings in the Home.app rather than the automation screen.

In the Home.app, this example appears as a single button with 3 press actions:

<img width="442" alt="Screen Shot 2019-06-29 at 10 41 45 AM" src="https://user-images.githubusercontent.com/38265886/60386452-7f00be00-9a5a-11e9-9a88-6493163822c9.png">

In Node-RED it will look like:

<img width="436" alt="Screen Shot 2019-06-29 at 10 42 19 AM" src="https://user-images.githubusercontent.com/38265886/60386459-95a71500-9a5a-11e9-931b-ef8a835fcc18.png">

Copyable Node-RED Flow:

```json
[{"id":"7d1c7028.435a78","type":"homekit-service","z":"821a2c87.afa08","isParent":true,"bridge":"fc1c5b0d.cd50f8","parentService":"","name":"State Less","serviceName":"StatelessProgrammableSwitch","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{}","x":490,"y":480,"wires":[[]]},{"id":"f24f73b8.99fcd8","type":"inject","z":"821a2c87.afa08","name":"0","topic":"","payload":"{\"ProgrammableSwitchEvent\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":250,"y":460,"wires":[["7d1c7028.435a78"]]},{"id":"f120536.bb629b","type":"inject","z":"821a2c87.afa08","name":"1","topic":"","payload":"{\"ProgrammableSwitchEvent\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":250,"y":500,"wires":[["7d1c7028.435a78"]]},{"id":"cc75a2e8.032db","type":"inject","z":"821a2c87.afa08","name":"2","topic":"","payload":"{\"ProgrammableSwitchEvent\":2}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":250,"y":540,"wires":[["7d1c7028.435a78"]]},{"id":"fc1c5b0d.cd50f8","type":"homekit-bridge","z":"","bridgeName":"Irrigation","pinCode":"123-45-321","port":"","allowInsecureRequest":false,"manufacturer":"Garage","model":"Pi HAT","serialNo":"3Aplus","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true}]
```

### Single Button Example applied for dimming a light bulb

The following example is using a `Stateless Programme Switch` to control a light bulb. Even it is connected to a [Philips Hue node](https://flows.nodered.org/node/node-red-contrib-huemagic) to control the particular light bulb, it can be used also for sending payload for brightness also to a [NRCHKB Light Bulb](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/wiki/Example-Bulb-Dimmer) generated accessory.

The following flow was designed to have the following features available by pressing the button:

* Single press - Toggle light switching _on_ with recent brightness and _off_
* Double press - Switch Light _on with full brightness_, but with _different color temperature_ depending on evening time
* Long press - dim light bulb _stepwise up to 100% brightness_ and _down to 0%_ as long as the button remains pressed

The example relies on a hardware setup using an [Aqara button](https://www.aqara.com/us/wireless_mini_switch.html) connected via a [Zigbee gateway to Node-red](https://flows.nodered.org/node/node-red-contrib-deconz). The `Stateless Programmeable Switch` accessory is bridged with NRCHKB to have it available in the Home.App (e.g. for further processing using actions, but the logic for the features above is applied within node-red). This has the advantage the capabilities are still available, even the HomeKit Hub (e.g. aTV is offline/out of order which happens some time if it gets disconnected from the WI-FI at night).

Node-RED flow looks like:

<img width="1697" alt="image" src="https://user-images.githubusercontent.com/37173958/98122564-0eb94680-1eb1-11eb-9590-d775e2830b62.png">

There are some specials in this flow. First prerequisite is to persist the recent state of the light bulb:
`
flow.set('BedroomLightBulbLeftsideBed', msg.payload)
`
which persists the following values:

```json
{
   "on":false,
   "brightness":27,
   "brightnessLevel":68,
   "reachable":true,
   "colorTemp":447,
   "updated":"2020-11-04T14:08:59+01:00"
}
```

The Author of this example leave it to your own choice, whether to persist this value in Node-red globally or locally within the flow.
For the dimming feature there is also a need persist a factor whether the bulb shall dim brighter or darker, which is represented by a `stepValue`. The function node for A `btnLongPress` event controls the brightness. Here is an excerpt of the code to illustrate the coding concept for dimming:

```javascript
var stepValue  = flow.get('BedroomLightBulbLeftsideBedStepValue') || 10;
var bulbStatus = flow.get('BedroomLightBulbLeftsideBed')
//...
if (stepValue > 0) {
    // raise brightness of the bulb

    if (brightness + stepValue <= 100) {
        myMsg.payload = {
            "on": true,
            "brightness": brightness + stepValue

        }
    } else {
        myMsg.payload = {
            "on": true,
            "brightness": brightness
        }
        // reverse direction of dimming light
        stepValue = -stepValue;
        flow.set('BedroomLightBulbLeftsideBedStepValue', stepValue);
    }

}
//...
```

Some more tricky is the required generation of messages needed for increment/decrement the brightness based on the state of a long pressed button. In this application it is required because the deCONZ connected AQARA button doesn't provide a "pulsed" `BTN_LONG_PRESS`-event. The following diagram gives an overview what's happens in the related part of the flow:

<img width="2087" alt="image" src="https://user-images.githubusercontent.com/37173958/98128082-be91b280-1eb7-11eb-8528-79995e7d5107.png">

The `trigger node` sends each second a `msg.payload = 1` to the `Set dimmable function node`, triggered by the `btnPress` event from the `deCONZ node`. The sequence is delayed for two seconds. The entire dimming process happens until the `deCONZ node` captures the a `btnRelease` from the physical button. You can deal with the set timing different from the given example to change the speed your bulbs are going brighter or darker. An initial reset of the sequence is implemented as well es a reset if other button interaction by the user happens.

Copyable Node-Red flow:

```json
[{"id":"4280ad0c.d166ac","type":"homekit-service","z":"123b4880.955e18","isParent":true,"bridge":"60729d35.03880c","parentService":"","name":"Bedroom Left Bedside Table","serviceName":"StatelessProgrammableSwitch","topic":"","filter":false,"manufacturer":"Xiaomi","model":"Aqara Switch Button","serialNo":"Default Serial Number","firmwareRev":"","hardwareRev":"","softwareRev":"","cameraConfigVideoProcessor":"","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":"","cameraConfigMaxWidth":"","cameraConfigMaxHeight":"","cameraConfigMaxFPS":"","cameraConfigMaxBitrate":"","cameraConfigVideoCodec":"","cameraConfigAudioCodec":"","cameraConfigAudio":false,"cameraConfigPacketSize":"","cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"","cameraConfigMapAudio":"","cameraConfigVideoFilter":"","cameraConfigAdditionalCommandLine":"","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{\"Name\":\"Bedroom Left Bedside Table\"}","waitForSetupMsg":false,"outputs":2,"x":460,"y":280,"wires":[[],["4166bbd4.f50474"]]},{"id":"ad569bd2.bde578","type":"inject","z":"123b4880.955e18","name":"Single Press","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"ProgrammableSwitchEvent\":0}","payloadType":"json","x":170,"y":120,"wires":[["4280ad0c.d166ac"]]},{"id":"aed80a58.cdb98","type":"inject","z":"123b4880.955e18","name":"Double Press","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"ProgrammableSwitchEvent\":1}","payloadType":"json","x":170,"y":160,"wires":[["4280ad0c.d166ac"]]},{"id":"f8c297d8.b982f8","type":"inject","z":"123b4880.955e18","name":"Long Press","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"ProgrammableSwitchEvent\":2}","payloadType":"json","x":170,"y":200,"wires":[["4280ad0c.d166ac"]]},{"id":"60653b4d.5f11dc","type":"hue-light","z":"123b4880.955e18","name":"Leftside Bed","bridge":"b461e4d7.4e0da","lightid":"13","colornamer":true,"skipevents":false,"universalevents":false,"x":1250,"y":280,"wires":[["56a5e547.7a98e4","4c1eb839.04a478"]]},{"id":"4166bbd4.f50474","type":"switch","z":"123b4880.955e18","name":"","property":"payload.ProgrammableSwitchEvent","propertyType":"msg","rules":[{"t":"eq","v":"0","vt":"num"},{"t":"eq","v":"1","vt":"str"},{"t":"eq","v":"2","vt":"str"}],"checkall":"true","repair":false,"outputs":3,"x":670,"y":280,"wires":[["fb47cb89.46bdf","8da7d4.94de203"],["8da7d4.94de203","6158161e.02f428"],[]]},{"id":"fb47cb89.46bdf","type":"change","z":"123b4880.955e18","name":"Toggle Light Last State","rules":[{"t":"set","p":"payload.toggle","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":990,"y":220,"wires":[["60653b4d.5f11dc"]]},{"id":"4c1eb839.04a478","type":"mqtt out","z":"123b4880.955e18","name":"","topic":"hu/status/Bedroom/LightBulb/BedsideTableLeft","qos":"1","retain":"false","broker":"107097e2.fc9c48","x":1580,"y":280,"wires":[]},{"id":"56a5e547.7a98e4","type":"function","z":"123b4880.955e18","name":"Persist Brightness","func":"flow.set('BedroomLightBulbLeftsideBed', msg.payload)\n\nreturn msg\n","outputs":1,"noerr":0,"initialize":"","finalize":"","x":1490,"y":340,"wires":[[]]},{"id":"77ffbcca.bbae7c","type":"deconz-input","z":"123b4880.955e18","name":"Btn Leftside Bed","server":"d6144ff9.fba308","device":"00:15:8d:00:04:27:1a:f3-01-0012","device_name":"Smart Switch - Leftside Bedroom : ZHASwitch","topic":"","state":"0","output":"always","outputAtStartup":true,"x":180,"y":280,"wires":[[],["4280ad0c.d166ac"]]},{"id":"fdc47374.e3e4b8","type":"deconz-event","z":"123b4880.955e18","name":"deCONZ Events","server":"d6144ff9.fba308","device_name":null,"x":180,"y":460,"wires":[["36d669e.4d0f916"]]},{"id":"36d669e.4d0f916","type":"function","z":"123b4880.955e18","name":"Catch Longpress Btn Evt","func":"var myMsg = {}\n\nif (msg.payload.uniqueid == \"00:15:8d:00:04:27:1a:f3-01-0012\") {\n    // only for specific btn\n    myMsg.payload = {\n        \"BtnLeftsideBedLongEvent\": msg.payload.state.buttonevent,\n        \"lastupdated\": msg.payload.state.lastupdated\n    }\n}\n\nreturn myMsg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":450,"y":460,"wires":[["684224a0.9e09d4"]]},{"id":"addf16d6.54f9f","type":"function","z":"123b4880.955e18","name":"Set dimmable brightness","func":"var myMsg = {};\nvar brightness = 0\nvar stepValue  = flow.get('BedroomLightBulbLeftsideBedStepValue') || 10;\nvar bulbStatus = flow.get('BedroomLightBulbLeftsideBed')\n\nif (typeof bulbStatus != \"undefined\") {\n    // Rounds to whole tens otherwise startign with 0\n    brightness = Math.ceil((bulbStatus.brightness)/10)*10\n}\n\nif (stepValue > 0) {\n    // raise brightness of the bulb\n    \n    // correct brightness if the bulb was off before\n    if (bulbStatus.on === false && brightness == 10) {\n        brightness = 0\n    }\n\n    if (brightness + stepValue <= 100) {\n        myMsg.payload = {\n            \"on\": true,\n            \"brightness\": brightness + stepValue\n            \n        }\n    } else {\n        myMsg.payload = {\n            \"on\": true,\n            \"brightness\": brightness\n        }\n        \n        stepValue = -stepValue;\n        flow.set('BedroomLightBulbLeftsideBedStepValue', stepValue);\n    }\n\n    node.status({fill:\"yellow\",shape:\"dot\",text:\"Increase to \" + myMsg.payload.brightness });\n\n} else {\n    // decrease brightness of the bulb\n    \n    if (brightness + stepValue > 0) {\n        myMsg.payload = {\n            \"on\": true,\n            \"brightness\": brightness + stepValue\n        }\n    } else {\n        myMsg.payload = {\n            \"on\": false,\n            \"brightness\": 0\n        }\n\n        stepValue = -stepValue;\n        flow.set('BedroomLightBulbLeftsideBedStepValue', stepValue);\n    }\n    \n    node.status({fill:\"grey\",shape:\"dot\",text:\"Decrease to \" + myMsg.payload.brightness });\n}\n\nreturn myMsg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":990,"y":340,"wires":[["60653b4d.5f11dc"]]},{"id":"684224a0.9e09d4","type":"switch","z":"123b4880.955e18","name":"","property":"payload.BtnLeftsideBedLongEvent","propertyType":"msg","rules":[{"t":"eq","v":"1001","vt":"num"},{"t":"eq","v":"1003","vt":"num"},{"t":"else"}],"checkall":"true","repair":false,"outputs":3,"x":670,"y":460,"wires":[["8015bcf2.957588"],["8da7d4.94de203"],[]]},{"id":"8015bcf2.957588","type":"trigger","z":"123b4880.955e18","name":"Trigger Dimm Msg","op1":"1","op2":"1","op1type":"num","op2type":"num","duration":"1","extend":false,"units":"s","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":970,"y":400,"wires":[["b0f95f60.fb6d3","addf16d6.54f9f"]]},{"id":"b0f95f60.fb6d3","type":"delay","z":"123b4880.955e18","name":"Delay next Dimm Msg","pauseType":"delay","timeout":"2","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":980,"y":460,"wires":[["8015bcf2.957588"]]},{"id":"8da7d4.94de203","type":"change","z":"123b4880.955e18","name":"Stop Dimm Msg","rules":[{"t":"set","p":"reset","pt":"msg","to":"reset","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":700,"y":400,"wires":[["b0f95f60.fb6d3","8015bcf2.957588"]]},{"id":"a2fef5a2.f13ad","type":"inject","z":"123b4880.955e18","name":"Initial Reset","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"1","payloadType":"num","x":490,"y":520,"wires":[["8da7d4.94de203"]]},{"id":"6158161e.02f428","type":"function","z":"123b4880.955e18","name":"Set On with full brightness","func":"var date = new Date();\nvar myMsg = {};\n\nif (date.getHours() > 19 || date.getHours() < 8) {\n    myMsg.payload = {\n    \"on\": true,\n    \"brightness\": 100,\n    \"colorTemp\": 366\n    }\n}\nelse {\n    myMsg.payload = {\n    \"on\": true,\n    \"brightness\": 100,\n    \"colorTemp\": 153\n    }\n}\n\nreturn myMsg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":1000,"y":280,"wires":[["60653b4d.5f11dc"]]},{"id":"5060339b.5edd4c","type":"ui_button","z":"123b4880.955e18","name":"Btn Leftside Bed","group":"e156b6ec.f27cc8","order":1,"width":0,"height":0,"passthru":false,"label":"Linkes Bett","tooltip":"Nachttischlampe links ein/ausschalten","color":"","bgcolor":"","icon":"lightbulb_outline","payload":"{\"ProgrammableSwitchEvent\":0}","payloadType":"json","topic":"","x":190,"y":240,"wires":[["4280ad0c.d166ac"]]},{"id":"60729d35.03880c","type":"homekit-bridge","z":"","bridgeName":"NRCHKB-02-PROD","pinCode":"002-02-002","port":"","allowInsecureRequest":false,"manufacturer":"eQ-3","model":"CCU3","serialNo":"000000008c02b30a","firmwareRev":"","hardwareRev":"BCM2835","softwareRev":"a02082","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true},{"id":"b461e4d7.4e0da","type":"hue-bridge","z":"","name":"Philips hue II","bridge":"192.168.178.24","key":"ifG37dulMEgYcAMuA5J2pbBI0BU6PjC5YxAsgi6i","interval":"3000","disableupdates":false},{"id":"107097e2.fc9c48","type":"mqtt-broker","z":"","name":"Mosquitto-raspi-smarthome","broker":"raspi-smarthome","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthRetain":"false","birthPayload":"","closeTopic":"","closeQos":"0","closeRetain":"false","closePayload":"","willTopic":"","willQos":"0","willRetain":"false","willPayload":""},{"id":"d6144ff9.fba308","type":"deconz-server","z":"","name":"deCONZ raspi-smarthome","ip":"192.168.178.60","port":"8080","apikey":"30DD716E3F","ws_port":"443","secure":false,"polling":"15"},{"id":"e156b6ec.f27cc8","type":"ui_group","z":"","name":"Nachtlicht","tab":"761bf68b.431248","order":2,"disp":true,"width":"6","collapse":false},{"id":"761bf68b.431248","type":"ui_tab","z":"","name":"Schlafen","icon":"mi-single_bed","order":4,"disabled":false,"hidden":false}]
```

### Multi-button Example

For a multi-button example, each button gets up to 3 actions. My example will show 3 buttons each with 3 actions. The buttons are set up very similar to the above example - but with `ServiceLabel` as the Parent node and `StatelessProgrammableSwitch` as the linked node.

The required configurations will go in `Characteristic Properties` inside of the node configuration.

For the `ServiceLabel` node, the `ServiceLabelIndex` must be defined. `0` is "dot numbers" so the buttons will be called "one dot", "two dots", "three dots", etc. `1` is normal numbers, so they will be called "Button 1", "Button 2", "Button 3", etc. This example will explain using numbered buttons.

Characteristic properties for `ServiceLabel` service:

```json
{
    "ServiceLabelNamespace":
    {
        "minValue":1,
        "maxValue":1
    }
}
```

The buttons are configured the same as the previous example with some added information in the Characteristic Properties (example for button 2):

```json
{
    "ServiceLabelIndex":
    {
        "minValue":2,
        "maxValue":2
    }
}
```

The `ServiceLabelIndex` is required so all buttons don't appear as "Button 1".

In the Home.app, my example looks like this:

<img width="428" alt="Screen Shot 2019-06-29 at 11 21 23 AM" src="https://user-images.githubusercontent.com/38265886/60386830-0866bf00-9a60-11e9-9f82-576a2e56e640.png">

Node-RED flow looks like:

<img width="506" alt="Screen Shot 2019-06-29 at 11 21 55 AM" src="https://user-images.githubusercontent.com/38265886/60386832-1d435280-9a60-11e9-8e29-643c655b7e5f.png">

Copyable Node-RED flow:

```json
[{"id":"cb200db5.a6b7d","type":"homekit-service","z":"821a2c87.afa08","isParent":true,"bridge":"fc1c5b0d.cd50f8","parentService":"","name":"Multi Button","serviceName":"ServiceLabel","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"ServiceLabelNamespace\":\n    {\n        \"minValue\":1,\n        \"maxValue\":1\n    }\n}","x":490,"y":660,"wires":[[]]},{"id":"7613def3.7d80d","type":"homekit-service","z":"821a2c87.afa08","isParent":false,"bridge":"","parentService":"cb200db5.a6b7d","name":"Button 1","serviceName":"StatelessProgrammableSwitch","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"ServiceLabelIndex\":\n    {\n        \"minValue\":1,\n        \"maxValue\":1\n    }\n}","x":480,"y":800,"wires":[[]]},{"id":"2b9112bc.f268ae","type":"homekit-service","z":"821a2c87.afa08","isParent":false,"bridge":"","parentService":"cb200db5.a6b7d","name":"Button 2","serviceName":"StatelessProgrammableSwitch","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"ServiceLabelIndex\":\n    {\n        \"minValue\":2,\n        \"maxValue\":2\n    }\n}","x":480,"y":860,"wires":[[]]},{"id":"e471bc3c.1151e","type":"homekit-service","z":"821a2c87.afa08","isParent":false,"bridge":"","parentService":"cb200db5.a6b7d","name":"Button 3","serviceName":"StatelessProgrammableSwitch","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{\n    \"ServiceLabelIndex\":\n    {\n        \"minValue\":3,\n        \"maxValue\":3\n    }\n}","x":480,"y":920,"wires":[[]]},{"id":"64408457.fc1604","type":"inject","z":"821a2c87.afa08","name":"0","topic":"","payload":"{\"ProgrammableSwitchEvent\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":700,"wires":[["7613def3.7d80d"]]},{"id":"2eee0f62.a2f88","type":"inject","z":"821a2c87.afa08","name":"1","topic":"","payload":"{\"ProgrammableSwitchEvent\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":740,"wires":[["7613def3.7d80d"]]},{"id":"22d5965.1f5156a","type":"inject","z":"821a2c87.afa08","name":"2","topic":"","payload":"{\"ProgrammableSwitchEvent\":2}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":780,"wires":[["7613def3.7d80d"]]},{"id":"2348cbc0.32e3c4","type":"inject","z":"821a2c87.afa08","name":"0","topic":"","payload":"{\"ProgrammableSwitchEvent\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":820,"wires":[["2b9112bc.f268ae"]]},{"id":"adde99d3.2a0838","type":"inject","z":"821a2c87.afa08","name":"1","topic":"","payload":"{\"ProgrammableSwitchEvent\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":860,"wires":[["2b9112bc.f268ae"]]},{"id":"ea7db176.764068","type":"inject","z":"821a2c87.afa08","name":"2","topic":"","payload":"{\"ProgrammableSwitchEvent\":2}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":900,"wires":[["2b9112bc.f268ae"]]},{"id":"2cc3fa36.2adf8e","type":"inject","z":"821a2c87.afa08","name":"0","topic":"","payload":"{\"ProgrammableSwitchEvent\":0}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":940,"wires":[["e471bc3c.1151e"]]},{"id":"feb803d2.f1e728","type":"inject","z":"821a2c87.afa08","name":"1","topic":"","payload":"{\"ProgrammableSwitchEvent\":1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":980,"wires":[["e471bc3c.1151e"]]},{"id":"ecad23a6.12434","type":"inject","z":"821a2c87.afa08","name":"2","topic":"","payload":"{\"ProgrammableSwitchEvent\":2}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":190,"y":1020,"wires":[["e471bc3c.1151e"]]},{"id":"fc1c5b0d.cd50f8","type":"homekit-bridge","z":"","bridgeName":"Irrigation","pinCode":"123-45-321","port":"","allowInsecureRequest":false,"manufacturer":"Garage","model":"Pi HAT","serialNo":"3Aplus","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true}]
```

**Note**: The number of press actions for each button can be limited by adding to the Characteristic Properties for `"ProgrammableSwitchEvent": {"validValues": [0,1,2]}}` - taking away 0, 1, or 2 to disable single, double, or long press respectively.

This example would only have double press and long press actions:

```json
"ProgrammableSwitchEvent":
{
    "validValues": [1,2]
}
```
