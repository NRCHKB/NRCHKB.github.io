---
title: "Release 1.4.0 🥳"
description: "NRCHKB/node-red-contrib-homekit-bridged Release 1.4.0"
lead: "New version is now available to install!"
date: 2021-10-04T16:04:58.440Z
draft: false
images: ["title.png"]
contributors: ["Shaquu"]
---

You can read [here]({{< ref "/wiki/introduction/faq.md#how-to-update-nrchkb-node" >}} "How to upgrade NRCHKB") to find out how to upgrade to the newest version.

Huge thanks to all contributors and testers from our [NRCHKB community](https://discord.gg/uvYac5u)!
Specially to [@crxporter]({{< ref "/contributors/crxporter" >}} "@crxporter") and [@kevinkub]({{< ref "/contributors/kevinkub" >}} "@kevinkub").

## Changelog

### Fixed

- Fixed customCharacteristics incorrect refresh in UI
- Implemented static accessoryUUIDs for subflows Enables the use of nrchkb nodes in subflows with backwards
  compatibility [#393](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/393) - thanks [@kevinkub](https://github.com/kevinkub)
- Fixed Custom MDNS Configuration not showing in UI for Standalone Accessory
- Stop components from clearing other component's node.status call
- Add missing advertiser selector in UI for Standalone Accessory
- Not naming the host node causes a crash [#424](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/424)
- Do not output oldValue for onSet as it does not have access to old value

### Added

- Notice during app launch: Node.js 10 will be deprecated in Node-RED 2.0.0
- Event output in Service 2 which is available in NRCHKB_EXPERIMENTAL [#392](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/392) [#437](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/437)
- Status node to fetch Serialized Service [#210](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/210)
- Support for environment variables in characteristic properties [#217](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/217)

### Changed

- Updated hap-nodejs to 0.9.5 (added new iOS 15 Services and Characteristics)
- Updated dependencies to the latest versions
- Changed `BatteryService` to `Battery` in demo examples as `BatteryService` is deprecated [#381](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/381) - thanks [@crxporter](https://github.com/crxporter)
- Readme rework - thanks [@crxporter](https://github.com/crxporter)
- More descriptive error when incorrect Characteristic has been used in msg.payload
- Add msg.hap.allChars to service nodes [#438](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/438)

## What's next

We are already preparing for the next phase which will be 1.5.0 release.
You can find [here](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/projects/10) what is in the planned scope.
