---
title: "Output Messages"
description: "Output Messages"
lead: ""
date: 2020-11-16T13:59:39+01:00
lastmod: 2021-05-04T14:12:00+01:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 50
toc: true
---

Starting with version `1.3.0`, there are some changes in the `hap` part of the messages coming from this node.

Previous versions would have `msg.hap.newValue` and `msg.hap.oldValue` _only if the message originated from the Home App_. Additionally there was a message part `msg.hap.context` with some information that nobody really knows what it means, but it was there.

From version `1.3.0` on, the parts of the message will _always_ include `msg.hap.newValue` and `msg.hap.oldValue`. If the message originated from the Home App (iPhone, iPad, Mac, or Home Hub automation) then the message will contain `msg.hap.context` (deprecated, will be empty object `{}`), and the new part `msg.hap.session`.

Note, `msg.hap.context` is left for compatibility with previous versions of the plugin but is considered deprecated and will be removed in version `2.0.0`. Please transfer your flows to use `msg.hap.session` instead.

The new message part `msg.hap.session` will exist only if the message is initiated from Home app. This object will include the following:

* `msg.hap.session.sessionID` : UUID unique to each HAP connection
* `msg.hap.session.username` : A unique identifier for each user, essentially a random string which will be different for each Apple ID your home is shared with
* `msg.hap.session.remoteAddress` : the IP address where the message came from (iPhone, iPad, computer, Apple TV, HomePod, etc)
* 'msg.hap.session.localAddress` : the IP where your HomeKit bridge lives, will match wherever you host NodeRED

The `msg.hap.session` object can therefore be used to determine who or which device is initiating changes to your setup.

Additionally, it is recommended to use a rule checking whether `msg.hap.session` exists to determine whether a message originated in Home app or was a pass-through message from your HomeKit node. This is useful to prevent loops when "allow message pass through" is enabled on your bridge or accessory.
