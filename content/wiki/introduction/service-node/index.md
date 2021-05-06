---
title: "Service Node"
description: "Service Node"
lead: ""
date: 2021-05-06T00:00:00+02:00
lastmod: 2021-05-07T00:55:00+02:00
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 20
toc: true
---

## Properties

Below you can find the list of configurable parameters for Service Node (you can also find as a homekit node or homekit-service).

### Service Hierarchy

### Service

### Parent Service

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Linked***

### Host Type

### Accessory

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Accessory***

You can select already created [Standalone Accessory Node]({{< ref "/wiki/introduction/host-node" >}} "Host Node") or create a new one.

- By clicking button with a pencil icon next to it, you can edit currently selected Accessory
- You can also create a new one by clicking the same button when *Add new homekit-standalone...* is selected. ![Adding new HomeKit Standalone Accessory](add-new-homekit-standalone-accessory.png)

### Bridge

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

You can select already created [Bridge Node]({{< ref "/wiki/introduction/host-node" >}} "Host Node") or create a new one.

- By clicking button with a pencil icon next to it, you can edit currently selected Bridge
- You can also create a new one by clicking the same button when *Add new homekit-bridge...* is selected. ![Adding new HomeKit Bridge](add-new-homekit-bridge.png)

> **Important Notice,** when you create a new Bridge for Service Node that is in a subflow, once deployed new Bridge will be created for each Subflow instance in a flow.
If you create a Bridge outside a Subflow then it will be created only once (reused).

### Manufacturer

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

### Serial Number

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

### Model

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

### Firmware Revision

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

### Hardware Revision

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

### Software Revision

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

### Topic

### Filter on Topic

### Name

### Characteristic Properties

### Wait for Setup message
