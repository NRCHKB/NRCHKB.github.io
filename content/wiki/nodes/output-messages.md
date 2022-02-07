---
title: "Output Messages"
description: "NRCHKB nodes output messages tips"
lead: ""
date: 2021-04-01T00:00:00+02:00
lastmod: 2022-02-07T19:48:12.612Z
draft: false
images: []
menu:
  docs:
    parent: "nodes"
weight: 80
toc: true
contributors: ["crxporter", "Shaquu", "GogoVega"]
---

## Differentiate between passthrough or "from HomeKit" messages

In some cases, it may be useful, even essential, to differentiate a command from the previous node or Home.app to avoid a loop problem. There are two possible cases:

### Disable messages passthrough

The first solution is to disable passthrough messages, which will cause your HomeKit node to no longer send messages from your previous nodes.
If you need to keep passthrough messages, used the second solution.

{{< alert icon="💡" text="To disable this option, go to the bottom of your node's Bridge configuration." />}}

### Use hap.session characteristics

The second solution is to use the `hap.session` feature, which is generated when the command comes from the Home.app:

Starting with version `1.3.0`, there are some changes in the `hap` part of the messages coming from this node.

Previous versions would have `msg.hap.newValue` and `msg.hap.oldValue` _only if the message originated from the Home.app_. Additionally, there was a message part `msg.hap.context` with some information that nobody knows what it means, but it was there.

From version `1.3.0` on, the parts of the message will _always_ include `msg.hap.newValue` and `msg.hap.oldValue`. If the message originated from the Home.app (iPhone, iPad, Mac, or Home Hub automation) then the message will contain `msg.hap.context` (deprecated, will be empty object `{}`), and the new part `msg.hap.session`.

Note, `msg.hap.context` is left for compatibility with previous versions of the plugin but is considered deprecated and will be removed in version `2.0.0`. Please transfer your flows to use `msg.hap.session` instead.

The new message part `msg.hap.session` will exist only if the message is initiated from the Home.app. This object will include the following:

- `msg.hap.session.sessionID` : UUID unique to each HAP connection
- `msg.hap.session.username`: A unique identifier for each user, essentially a random string that will be different for each Apple ID your home is shared with
- `msg.hap.session.remoteAddress` : the IP address where the message came from (iPhone, iPad, computer, Apple TV, HomePod, etc)
- `msg.hap.session.localAddress`: the IP where your HomeKit Bridge lives, will match wherever you host Node-RED

The `msg.hap.session` object can therefore be used to determine who or which device is initiating changes to your setup.

{{< alert icon="💡" >}}Additionally, it is recommended to use a rule to determine if a message is from the Home.app or a direct message from your HomeKit node. This is useful to avoid loops when "Allow Message Passthrough" is **enabled** on your Bridge or Accessory.{{< /alert >}}
\
To do this, nothing could be simpler, add to the output of your HomeKit node a `function node` in which you insert this:

```js
if (msg.hap.session) {
  // Do stuff if it's from HomeKit
  return msg;
} else {
  // Do different stuff if it's not from HomeKit
  return;
}
```
