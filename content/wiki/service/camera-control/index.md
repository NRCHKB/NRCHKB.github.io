---
title: "Camera Control"
description: "Camera Control"
lead: ""
date: 2021-04-05T11:54:45.000Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "CameraControl"
---

## Notes on Cameras

Cameras require an extra install of FFmpeg for video processing.
If you are on a system with `apt` (Raspberry Pi, Ubuntu, Debian, etc.) you can use the FFmpeg install script, which is maintained by a couple of our users and designed for NRCHKB.
This script is documented [here](https://github.com/marcus-j-davies/nrchkb-ffmpeg-build) and can be run at any time using this one-line terminal command, then after the prompts:

```bash
bash <(curl -sL https://raw.githubusercontent.com/marcus-j-davies/nrchkb-ffmpeg-build/main/nrchkb-ffmpeg-build.sh)
```

If you are running our [Docker image](https://github.com/NRCHKB/node-red-contrib-homekit-docker) then FFmpeg will be preinstalled for you with several of the options preset (may not have all hardware accelerations built).

For those writing examples, please include how you have installed FFmpeg (including any special build flags)!

It is recommended to use "Accessory" as the Host Type for cameras.
The camera should be the Parent Service, with "Motion" and "Doorbell" (if used) as Linked Services.

### How to debug issues

If you have problems with FFmpeg (if you think the camera is set up properly, but it "does nothing" then you might have FFmpeg problems) then please follow these steps to properly debug your FFmpeg setup.

- Configure Camera Control node in Node-RED
- Run Node-RED with `DEBUG=NRCHKB*,CameraSource*` and tick "debug mode" in Camera Control
  - ![Camera Control Debug checkbox](camera-control-debug.png)
- Try to open Camera stream in Home.app
- It will error again but will also print FFmpeg command in logs
- Run that command in terminal separately to get real problem

## Examples

### * Raspberry Pi Zero W

Example written by CRXPorter. Date 21 November 2020, updated February 2022. Plugin version 1.4.3, Node-RED version 2.1.5.

Hardware:

-Raspberry Pi Zero W\
-Raspberry Pi Camera Module V2\

**Software setup:**

Step **zero**: I assume you are able to set up a pi zero with SSH and Wi-Fi. I am using Raspberry Pi OS Lite

Step **one**: use `raspi-config` to enable the camera interface on the pi

Step **two**: install FFmpeg using our script:

```bash
bash <(curl -sL https://raw.githubusercontent.com/marcus-j-davies/nrchkb-ffmpeg-build/main/nrchkb-ffmpeg-build.sh)
```

Step **three**: install and start Node-RED with the script [found here](https://Node-RED.org/docs/getting-started/raspberrypi)

Step **four**: install node-red-contrib-homekit-bridged from palette manager

Step **five**: import this flow. It should be a single homekit node

```json
[{"id":"36df1f80.39e34","type":"homekit-service","z":"c9e35eda.bb75f8","isParent":true,"bridge":"f18ad79f.5081e8","parentService":"","name":"Pi zero camera","serviceName":"CameraControl","topic":"","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"-re -r 6 -s 1280x720 -f video4linux2 -i /dev/video0","cameraConfigStillImageSource":"-s 1280x720 -f video4linux2 -i /dev/video0","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":"1280","cameraConfigMaxHeight":"720","cameraConfigMaxFPS":"6","cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"h264_v4l2m2m","cameraConfigAudioCodec":"h264_v4l2m2m","cameraConfigAudio":false,"cameraConfigPacketSize":"564","cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":3,"x":430,"y":260,"wires":[[],[],[]]},{"id":"f18ad79f.5081e8","type":"homekit-bridge","bridgeName":"Camera","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Raspberry Pi","model":"Pi zero w","serialNo":"00001","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

Step **six**: add it to your Home.app and enjoy!

Notes:\
Additional tuning could be done to optimize resolution and speed.
The new Raspberry Pi High Quality camera should work with the same setup.
This setup should work on a Pi 3 or 4 with very little modification.
Adding a microphone, motion detector, doorbell button, or other things should be relatively simple.
Visit us [on discord](https://discord.gg/uvYac5u) if you'd like to discuss!

### * Raspberry Pi Zero W running MotionEyeOS

This setup adds motion detection to the Pi Zero W camera. Note that the pi zero does not appear to have enough power to run MotionEye alongside Node-RED, so it is recommended to run MotionEyeOS alone on a pi with Node-RED on another server (bigger pi, NAS, etc.).

1. Head over to [MotionEyeOS](https://github.com/ccrisan/motioneyeos) releases and download the one for "raspberrypi", flash it to your SD card as you normally would.
2. Boot and set up MotionEyeOS as you like it (motion detector settings, stream quality, etc.) using their instructions. The one important part is to send your motion alerts to a webhook, the address used in the code below is `http://<node-red-pi-address>:1880/MotionEye`
3. To import the flow below into your Node-RED machine, you will need to change the IP addresses in the camera node, so they point to your pi zero.

```json
[{"id":"54eca8a5.3ae868","type":"homekit-service","z":"e9d44372.de7a58","isParent":true,"bridge":"e1aa7622.06a8b","parentService":"","name":"MotionEye OS","serviceName":"CameraControl","topic":"","filter":false,"manufacturer":"NRCHKB","model":"0.130.2","serialNo":"Default Serial Number","firmwareRev":"0.130.2","hardwareRev":"0.130.2","softwareRev":"0.130.2","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"-re -f mjpeg -i http://10.10.10.13:8081","cameraConfigStillImageSource":"-f mjpeg -i http://10.10.10.13/picture/1/current/","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":"800","cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":3,"x":460,"y":1680,"wires":[[],[],[]]},{"id":"ea482940.81194","type":"http in","z":"e9d44372.de7a58","name":"MotionEye","url":"/MotionEye","method":"get","upload":false,"swaggerDoc":"","x":290,"y":1540,"wires":[["10c44307.6c37ad","6a889a0f.5f851c","a3c9a20d.a1fef8"]]},{"id":"10c44307.6c37ad","type":"debug","z":"e9d44372.de7a58","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":450,"y":1500,"wires":[]},{"id":"6a889a0f.5f851c","type":"http response","z":"e9d44372.de7a58","name":"Success","statusCode":"201","headers":{},"x":750,"y":1540,"wires":[]},{"id":"5ed047ac.070648","type":"homekit-service","z":"e9d44372.de7a58","isParent":false,"bridge":"","parentService":"54eca8a5.3ae868","name":"MotionEye Motion","serviceName":"MotionSensor","topic":"","filter":false,"manufacturer":"NRCHKB","model":"0.130.2","serialNo":"Default Serial Number","firmwareRev":"0.130.2","hardwareRev":"0.130.2","softwareRev":"0.130.2","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":2,"x":790,"y":1600,"wires":[[],[]]},{"id":"b29f3d75.196e1","type":"change","z":"e9d44372.de7a58","name":"","rules":[{"t":"move","p":"payload","pt":"msg","to":"payload.MotionDetected","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":570,"y":1600,"wires":[["5ed047ac.070648"]]},{"id":"a3c9a20d.a1fef8","type":"trigger","z":"e9d44372.de7a58","name":"","op1":"true","op2":"false","op1type":"bool","op2type":"bool","duration":"30","extend":true,"overrideDelay":false,"units":"s","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":370,"y":1600,"wires":[["b29f3d75.196e1"]]},{"id":"e1aa7622.06a8b","type":"homekit-bridge","bridgeName":"TestCam","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"NRCHKB","model":"0.130.2","serialNo":"Default Serial Number","firmwareRev":"0.130.2","hardwareRev":"0.130.2","softwareRev":"0.130.2","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

### * UniFi Protect

Example written by CRXPorter.\
Cameras tested:

- UniFi G3 Flex
- UniFi G3 Bullet
- UniFi G4 Doorbell

Motion detection and doorbell presses are available for advanced users, ask @crxporter on discord.
A new UniFi node is in active development, check [here](https://github.com/NRCHKB/node-red-contrib-unifi-os) for that project.

FFmpeg was installed on a pi 4. Node-RED was installed with the official Node-RED on a PI install script.

#### FFmpeg Install

Just run the `nrchkb-ffmpeg-build` script found here:

```bash
bash <(curl -sL https://raw.githubusercontent.com/marcus-j-davies/nrchkb-ffmpeg-build/main/nrchkb-ffmpeg-build.sh)
```

#### Cameras Setup

The camera node setup is quite simple for UniFi. Be sure to enable unauthenticated still images on your cameras. My fields are filled out as shown:

```yaml
Video Processor: ffmpeg
Source: -re -rtsp_transport tcp -i rtsp://10.0.0.1:7447/randomstring
Still image source: -i http://10.0.1.4/snap.jpeg
Max Streams: 3
Max Width: 960
Max Height: 720
Max FPS: 10
Max Bitrate: 3072
Video Codec: copy
Audio Codec: libfdk_aac
Audio: yes
Packet Sixe: 564
Map Video: 0:v
Map Audio: 0:a
Video Filter:
Additional Command Line: -preset slow -profile:v high -level 4.2 -x264-params intra-refresh=1:bframes=0
```

This is a work in progress. Updated 18 February 2022. Please find me (crxporter) on [our discord server](https://discord.gg/uvYac5u) if you're having problems or would like more information.

### * Reolink

(reolink here by @itsj4y)

Replace XXX with your camera's password.
Do not use Video Filter with copy codec.
There may be more ideal settings, but these should get you up and running.

```yaml
Video Processor: ffmpeg
Source: -re -rtsp_transport tcp -i rtsp://admin:XXX@10.0.1.125:544//h264Preview_01_sub
Still image source: -i http://10.0.1.125/cgi-bin/api.cgi?cmd=Snap&amp;channel=0&amp;rs=wuuPhkmUCeI9WG7C&amp;user=admin&amp;password=XXX
Max Streams: 2
Max Width: 1280
Max Height: 720
Max FPS: 10
Max Bitrate: 3000
Video Codec: copy
Audio Codec: libfdk_aac
Audio: no
Packet Size: 1316
Map Video: 0:0
Map Audio: 0:1
Additional Command Line: -tune zerolatency
```
