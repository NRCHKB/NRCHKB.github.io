---
title: "Service Node"
description: "This node represents Service in HomeKit"
lead: ""
date: 2021-05-06T00:00:00+02:00
lastmod: 2021-08-19T18:26:22.713Z
draft: false
images: []
menu:
  docs:
    parent: "introduction"
weight: 20
toc: true
contributors: ["Shaquu"]
---

This node represents Service in HomeKit.
When hosted behind the [Bridge]({{< ref "/wiki/introduction/host-node" >}} "Host Node") it will also represent Accessory.

Below you can find the list of configurable parameters for Service Node (this Node can also be found as a homekit node or homekit-service).

## Service Hierarchy

Choose if this node will represent Parent (or Primary) Service or Linked one.

| Option | Description |
|---|---|
| Parent | Node will be used as Primary Service. The Primary Service must match the primary function of the accessory and must also match with the accessory category. An accessory must expose only one primary service from its list of available services. |
| Linked | Node will be used as a Linked Service. Linked Services allows accessories to specify logical relationship between services. A service can link to one or more services. A service must not link to itself. Service links have context and meaning only to the first level of services that it links to. |

### Example

We want to configure Air Quality Sensor which is battery powered.
We need to define Air Quality Sensor (Parent) and Battery (Linked).

![Service Hierarchy Node-Red](service-hierarchy-node-red.png)

In Home.app room view it will be displayed as one accessory.

![Service Hierarchy Home.app Overview](service-hierarchy-home.app-overview.png)

In Home.app in accessory detail view you will also notice battery percentage.

![Service Hierarchy Home.app Details](service-hierarchy-home.app-details.png)

## Service

Select Service from the [list]({{< ref "/wiki/service" >}} "Services") which will be used to represent this node.

## Parent Service

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Linked***

Select Parent Service from the list to which this node's Linked Service will be attached to.

## Host Type

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent***

| Option | Description |
|---|---|
| Bridge | Service will be hosted behind Bridge. |
| Accessory | Service will be hosted as Standalone Accessory. |

## Accessory

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Accessory***

You can select already created [Standalone Accessory Node]({{< ref "/wiki/introduction/host-node" >}} "Host Node") or create a new one.

- By clicking button with a pencil icon next to it, you can edit currently selected Accessory
- You can also create a new one by clicking the same button when *Add new homekit-standalone...* is selected. ![Adding new HomeKit Standalone Accessory](add-new-homekit-standalone-accessory.png)

## Bridge

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

You can select already created [Bridge Node]({{< ref "/wiki/introduction/host-node" >}} "Host Node") or create a new one.

- By clicking button with a pencil icon next to it, you can edit currently selected Bridge
- You can also create a new one by clicking the same button when *Add new homekit-bridge...* is selected. ![Adding new HomeKit Bridge](add-new-homekit-bridge.png)

> **Important Notice,** when you create a new Bridge for Service Node that is in a subflow, once deployed new Bridge will be created for each Subflow instance in a flow.
If you create a Bridge outside a Subflow then it will be created only once (reused).

## Manufacturer

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

## Serial Number

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

## Model

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

## Firmware Revision

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

## Hardware Revision

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

## Software Revision

**This field is only available when *[Service Hierarchy]({{< ref "#service-hierarchy" >}} "Service Hierarchy")* is set to *Parent* and *[Host Type]({{< ref "#host-type" >}} "Host Type")* is set to *Bridge***

## Topic

## Filter on Topic

## Name

## Characteristic Properties

## Wait for Setup message
