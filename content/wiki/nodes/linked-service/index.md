---
title: "Linked Service"
description: "Linked Service is, to put it another way, a Service attached to the Parent Service"
lead: "Linked Service is, to put it another way, a Service attached to the Parent Service."
date: 2022-02-08T15:27:48.000Z
draft: false
images: []
menu:
  docs:
    parent: "nodes"
weight: 50
toc: true
contributors: ["GogoVega"]
---

## How to create a Linked Service

To create a Linked Service, you must first create a Parent Service. For this example, the Linked Service will be a Battery and the Parent Service a Motion Sensor.

![Create Parent Service](battery_create_parent_service_example.png)

Next, you must create Linked Service and select Parent Service used.

![Create Linked Service](battery_create_linked_service_example.png)

### Characteristic Properties

Use the following JSON in your Battery Characteristic Properties so that the Home.app displays `BatteryLevel` and `StatusLowBattery`.

```json
{
  "BatteryLevel": 100,
  "StatusLowBattery": 0
}
```

## Another way

Another method is to use [Characteristic Properties]({{< ref "/wiki/nodes/characteristics" >}} "Characteristic Properties").
As a reminder: Characteristic Properties tell HomeKit that your Accessory will use Characteristic(s) provided.

For example, you want an Accessory that is both Temperature Sensor and Humidity Sensor, nothing could be simpler, just use the following JSON in your Characteristic Properties.

![Another Way example](other_way_example.png)

```json
{
  "CurrentTemperature": 20,
  "CurrentRelativeHumidity": 50
}
```

{{< alert icon="💡" text=" To avoid display problems in the Home.app, it is advisable to use Service Linked." />}}
