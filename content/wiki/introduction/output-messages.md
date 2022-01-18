---
title: "Output Messages"
description: "Output Messages"
lead: ""
date: 2021-04-01T00:00:00+02:00
lastmod: 2022-01-17T15:13:57.388Z
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 50
toc: true
contributors: ["crxporter","Shaquu","GogoVega"]
---

## Differentiate between passthrough or "from HomeKit" messages

In some cases, it may be useful, even essential, to differentiate a command from the previous node or Home.app in order to avoid a loop problem. There are two possible cases:

### Disable messages passthrough

The first solution is to disable passthrough messages, which will cause your Homekit node to no longer send messages from your previous nodes.
If you need to keep passthrough messages, used the second solution.

{{< alert icon="💡" text="To disable this option, go to the bottom of your node's bridge configuration." >}}

### Use hap.session characteristics

The second solution is to use the `hap.session` feature which is generated when the command comes from Home.app:

Starting with version `1.3.0`, there are some changes in the `hap` part of the messages coming from this node.

Previous versions would have `msg.hap.newValue` and `msg.hap.oldValue` _only if the message originated from the Home.app_. Additionally there was a message part `msg.hap.context` with some information that nobody really knows what it means, but it was there.

From version `1.3.0` on, the parts of the message will _always_ include `msg.hap.newValue` and `msg.hap.oldValue`. If the message originated from the Home.app (iPhone, iPad, Mac, or Home Hub automation) then the message will contain `msg.hap.context` (deprecated, will be empty object `{}`), and the new part `msg.hap.session`.

Note, `msg.hap.context` is left for compatibility with previous versions of the plugin but is considered deprecated and will be removed in version `2.0.0`. Please transfer your flows to use `msg.hap.session` instead.

The new message part `msg.hap.session` will exist only if the message is initiated from Home.app. This object will include the following:

* `msg.hap.session.sessionID` : UUID unique to each HAP connection
* `msg.hap.session.username` : A unique identifier for each user, essentially a random string which will be different for each Apple ID your home is shared with
* `msg.hap.session.remoteAddress` : the IP address where the message came from (iPhone, iPad, computer, Apple TV, HomePod, etc)
* `msg.hap.session.localAddress` : the IP where your HomeKit bridge lives, will match wherever you host NodeRED

The `msg.hap.session` object can therefore be used to determine who or which device is initiating changes to your setup.

{{< alert icon="💡" text="Additionally, it is recommended to use a rule checking whether `msg.hap.session` exists to determine whether a message originated in Home.app or was a pass-through message from your HomeKit node. This is useful to prevent loops when \"allow message pass through\" is <strong>enabled</strong> on your bridge or accessory." >}}

To do this, nothing could be simpler, add to the output of your Homekit node a `function node` in which you insert this:

```js
if (msg.hap.session) {
    // Do stuff if it's from homekit
    return msg;
} else {
    // Do different stuff if it's not from homekit
    return;
}
```
