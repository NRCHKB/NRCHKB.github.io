---
title: "Experimental"
description: "NRCHKB experimental features"
lead: ""
date: 2021-10-11T23:29:29.943Z
lastmod: 2021-10-11T23:29:29.943Z
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 100
toc: true
contributors: ["Shaquu"]
---

During development, we add new features that are marked as `experimental`.

They can be marked that way for few reasons:

1. Early adopting and testing, allows us to phase new features.
2. Discovering better ways to solve problems.
3. Easier to test new designs without releasing to public.

> **Important Notice,** any experimental feature is subject to change and might be not bug free.

## Getting started

In order to be able to use experimental features you have to start Node-RED with `NRCHKB_EXPERIMENTAL=true` environment variable.

For example `NRCHKB_EXPERIMENTAL=true node-red` or with `DEBUG` you can use `NRCHKB_EXPERIMENTAL=true DEBUG=NRCHKB* node-red`

## Experimental features

### Custom Characteristics

[NRCHKB/node-red-contrib-homekit-bridged#52](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/52)

Using nrchkb node ![nrchkb node](nrchkb-node.png) you can define new Characteristics.

![Custom Characteristics editor](custom-characteristics-nrchkb-node.png)

After you add them you need to also enable them on Service node.

![Service node Custom Characteristics](custom-characteristics-service-node.png)

> **Important Notice,** currently, Home.app (default Apple app for managing smart home) is not displaying Custom Characteristics.
> To see them in action you have to use alternative app like Eve.app
> ![Custom Characteristics Eve.app](custom-characteristics-eve-app.jpeg)

### Service 2

[NRCHKB/node-red-contrib-homekit-bridged#392](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/392)
