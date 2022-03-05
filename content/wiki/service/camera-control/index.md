---
title: "Camera Control"
description: "Camera Control"
lead: ""
date: 2021-04-17T18:50:12.026Z
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "CameraControl"
contributors: ["caitken-com", "crxporter", "itsj4y", "Shaquu"]
---

## Notes on Cameras

Cameras are a complicated situation. If you are running the [Docker way](https://github.com/NRCHKB/node-red-contrib-homekit-docker) then FFMPEG will be preinstalled for you with several of the options preset (may not have all hardware accelerations built). Alternately you can download and compile your own version of FFMPEG with the build flags you need for your cameras.

For those writing examples, please include how you have installed FFMPEG!

It is recommended to add only one camera per bridge. The camera should be the "parent" service with "motion" and "doorbell" (if used) as linked services.

### How to debug issues

If you have problems with FFMPEG (if you think the camera is set up properly but it "does nothing" then you might have FFMPEG problems) then please follow these steps to properly debug your FFMPEG setup.

- Configure Camera Control node in Node-RED
- Run Node-RED with `DEBUG=NRCHKB*,CameraSource*` and tick "debug mode" in Camera Control
  - ![Camera Control Debug checkbox](camera-control-debug.png)
- Try to open Camera stream in Home.app
- It will error again but will also print FFMPEG command in logs
- Run that command in terminal separately to get real problem

## Examples

### * Raspberry Pi Zero W

Example written by CRXPorter. Date 21 November 2020. Plugin version 1.2.0, Node-RED version 1.2.5.

Hardware:\
-Raspberry Pi Zero W\
-Raspberry Pi Camera Module V2\

**Software setup:**

Step **zero**: I assume you are able to set up a pi zero with SSH and Wi-Fi. I am using Raspberry Pi OS Lite

Step **one**: use `raspi-config` to enable the camera interface on the pi

Step **two**: install FFMPEG for HomeBridge using the script [found here](https://github.com/homebridge/ffmpeg-for-homebridge)

Step **three**: install and start Node-RED with the script [found here](https://Node-RED.org/docs/getting-started/raspberrypi)

Step **four**: install node-red-contrib-homekit-bridged from palette manager

Step **five**: import this flow. It should be a single homekit node

```json
[{"id":"36df1f80.39e34","type":"homekit-service","z":"c9e35eda.bb75f8","isParent":true,"bridge":"f18ad79f.5081e8","parentService":"","name":"Pi zero camera","serviceName":"CameraControl","topic":"","filter":false,"manufacturer":"NRCHKB","model":"1.2.0","serialNo":"Default Serial Number","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"-re -r 6 -s 1280x720 -f video4linux2 -i /dev/video0","cameraConfigStillImageSource":"-s 1280x720 -f video4linux2 -i /dev/video0","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":"1280","cameraConfigMaxHeight":"720","cameraConfigMaxFPS":"6","cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"h264_omx","cameraConfigAudioCodec":"h264_omx","cameraConfigAudio":false,"cameraConfigPacketSize":"564","cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":3,"x":430,"y":260,"wires":[[],[],[]]},{"id":"f18ad79f.5081e8","type":"homekit-bridge","bridgeName":"Camera","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"Raspberry Pi","model":"Pi zero w","serialNo":"00001","firmwareRev":"1.2.0","hardwareRev":"1.2.0","softwareRev":"1.2.0","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

(Note to self: need to add this to the examples for next release)

Step **six**: add it to your Home.app and enjoy!

Notes:\
Additional tuning could be done to optimize resolution and speed. The new Raspberry Pi High Quality camera should work with the same setup. This setup should work on a Pi 3 or 4 with very little modification. Adding a microphone, motion detector, doorbell button, or other things should be relatively simple. Visit us [on discord](https://discord.gg/uvYac5u) if you'd like to discuss!

### * Raspberry Pi Zero W running MotionEyeOS

This setup adds motion detection to the Pi Zero W camera. Note that the pi zero does not appear to have enough power to run MotionEye alongside Node-RED, so it is recommended to run MotionEyeOS alone on a pi with Node-RED on another server (bigger pi, nas, etc.).

1. Head over to [MotionEyeOS](https://github.com/ccrisan/motioneyeos) releases and download the one for "raspberrypi", flash it to your SD card as you normally would
2. Boot and set up MotionEyeOS as you like it (motion detector settings, stream quality, etc.) using their instructions. The one important part is to send your motion alerts to a webhook, the address used in the code below is `http://<node-red-pi-address>:1880/MotionEye`
3. Import the flow below into your Node-RED machine, you will need to change the IP addresses in the camera node, so they point to your pi zero.

```json
[{"id":"54eca8a5.3ae868","type":"homekit-service","z":"e9d44372.de7a58","isParent":true,"bridge":"e1aa7622.06a8b","parentService":"","name":"MotionEye OS","serviceName":"CameraControl","topic":"","filter":false,"manufacturer":"NRCHKB","model":"0.130.2","serialNo":"Default Serial Number","firmwareRev":"0.130.2","hardwareRev":"0.130.2","softwareRev":"0.130.2","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"-re -f mjpeg -i http://10.10.10.13:8081","cameraConfigStillImageSource":"-f mjpeg -i http://10.10.10.13/picture/1/current/","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":"800","cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":3,"x":460,"y":1680,"wires":[[],[],[]]},{"id":"ea482940.81194","type":"http in","z":"e9d44372.de7a58","name":"MotionEye","url":"/MotionEye","method":"get","upload":false,"swaggerDoc":"","x":290,"y":1540,"wires":[["10c44307.6c37ad","6a889a0f.5f851c","a3c9a20d.a1fef8"]]},{"id":"10c44307.6c37ad","type":"debug","z":"e9d44372.de7a58","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":450,"y":1500,"wires":[]},{"id":"6a889a0f.5f851c","type":"http response","z":"e9d44372.de7a58","name":"Success","statusCode":"201","headers":{},"x":750,"y":1540,"wires":[]},{"id":"5ed047ac.070648","type":"homekit-service","z":"e9d44372.de7a58","isParent":false,"bridge":"","parentService":"54eca8a5.3ae868","name":"MotionEye Motion","serviceName":"MotionSensor","topic":"","filter":false,"manufacturer":"NRCHKB","model":"0.130.2","serialNo":"Default Serial Number","firmwareRev":"0.130.2","hardwareRev":"0.130.2","softwareRev":"0.130.2","cameraConfigVideoProcessor":"ffmpeg","cameraConfigSource":"","cameraConfigStillImageSource":"","cameraConfigMaxStreams":2,"cameraConfigMaxWidth":1280,"cameraConfigMaxHeight":720,"cameraConfigMaxFPS":10,"cameraConfigMaxBitrate":300,"cameraConfigVideoCodec":"libx264","cameraConfigAudioCodec":"libfdk_aac","cameraConfigAudio":false,"cameraConfigPacketSize":1316,"cameraConfigVerticalFlip":false,"cameraConfigHorizontalFlip":false,"cameraConfigMapVideo":"0:0","cameraConfigMapAudio":"0:1","cameraConfigVideoFilter":"scale=1280:720","cameraConfigAdditionalCommandLine":"-tune zerolatency","cameraConfigDebug":false,"cameraConfigSnapshotOutput":"disabled","cameraConfigInterfaceName":"","characteristicProperties":"{}","waitForSetupMsg":false,"outputs":2,"x":790,"y":1600,"wires":[[],[]]},{"id":"b29f3d75.196e1","type":"change","z":"e9d44372.de7a58","name":"","rules":[{"t":"move","p":"payload","pt":"msg","to":"payload.MotionDetected","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":570,"y":1600,"wires":[["5ed047ac.070648"]]},{"id":"a3c9a20d.a1fef8","type":"trigger","z":"e9d44372.de7a58","name":"","op1":"true","op2":"false","op1type":"bool","op2type":"bool","duration":"30","extend":true,"overrideDelay":false,"units":"s","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":370,"y":1600,"wires":[["b29f3d75.196e1"]]},{"id":"e1aa7622.06a8b","type":"homekit-bridge","bridgeName":"TestCam","pinCode":"111-11-111","port":"","allowInsecureRequest":false,"manufacturer":"NRCHKB","model":"0.130.2","serialNo":"Default Serial Number","firmwareRev":"0.130.2","hardwareRev":"0.130.2","softwareRev":"0.130.2","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true,"allowMessagePassthrough":true}]
```

### * Unifi Protect

Example written by CRXPorter.\
Cameras tested:

- Unifi G3 Flex
- Unifi G3 Bullet
- Unifi G4 Doorbell

Motion detection and doorbell presses are available for advanced users, ask @crxporter on discord. A new Unifi node is pending from CRXPorter - hopefully coming late 2020.

FFMPEG was installed on a pi 4. Node-RED was installed with the official Node-RED on pi install script.

#### FFMPEG Install

Install build tools

```bash
sudo apt install git pkg-config autoconf automake libtool libx264-dev
```

ALSA runtime library

```bash
sudo apt install libasound2-dev
```

Download and build fdk-aac

```bash
cd ~
git clone https://github.com/mstorsjo/fdk-aac.git
cd fdk-aac
sudo ./autogen.sh
sudo ./configure --prefix=/usr/local --enable-shared --enable-static
sudo make -j4
sudo make install
sudo ldconfig
```

Download and build ffmpeg

```bash
cd ~
git clone https://github.com/FFmpeg/FFmpeg.git
cd FFmpeg
sudo ./configure --prefix=/usr/local --arch=armel --target-os=linux --enable-omx-rpi --enable-nonfree --enable-gpl --enable-libfdk-aac --enable-mmal --enable-libx264 --enable-decoder=h264 --enable-network --enable-protocol=tcp --enable-demuxer=rtsp
sudo make -j4
sudo make install
```

Clean up

```bash
cd ~
rm -rf FFmpeg
rm -rf fdk-aac
```

#### Cameras Setup

The camera node setup is quite simple for Unifi. Be sure to enable unauthenticated still images on your cameras. My fields are filled out as shown:

```yaml
Video Processor: ffmpeg
Source: -re -rtsp_transport tcp -i rtsp://10.0.0.1:7447/randomstring
Still image source: -i http://10.0.1.4/snap.jpeg
Max Streams: 3
Max Width: 960
Max Height: 720
Max FPS: 10
Max Bitrate: 3072
Video Codec: h264_omx
Audio Codec: libfdk_aac
Audio: yes
Packet Sixe: 564
Map Video: 0:1
Map Audio: 0:0
Video Filter: scale=960:720
Additional Command Line: -preset slow -profile:v high -level 4.2 -x264-params intra-refresh=1:bframes=0
```

This is a work in progress. Written October 9, 2020. Please find me (crxporter) on [our discord server](https://discord.gg/uvYac5u) if you're having problems or would like more information.

### * Reolink

(reolink here by @itsj4y)

Replace XXX with your camera's password.
Do not use Video Filter with copy codec.
There may be more ideal settings but these should get you up and running.

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
