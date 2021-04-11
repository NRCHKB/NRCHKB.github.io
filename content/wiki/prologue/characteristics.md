---
title: "Characteristics"
description: "Characteristics"
lead: ""
date: 2020-11-16T13:59:39+01:00
lastmod: 2021-04-04T14:12:00+01:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 100
toc: true
---

Characteristics are the values sent to the service item. They are generally true/false or number values. All services have at least one required characteristic. For example the switch has only the required characteristic of `On`.

## Characteristic Properties

The HomeKit service node has a section called "Characteristic Properties". This section is used to define limits or initialize which characteristics you may send to your specific item.

![screen shot 2019-03-08 at 7 09 01 am](https://user-images.githubusercontent.com/38265886/54030392-102ceb80-4171-11e9-9da4-cbcbab5c7c68.png)

The characteristic properties do not set any value in the item, instead they tell HomeKit that the item will be using that characteristic and define limits on the valid values.

Here are some examples of how Characteristic Properties work. These will be moved to their respective example pages as more documentation is written ([help wanted](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/50)).

### On/off bulb (No optional characteristics: empty JSON object)

```json
{}
```

### Dimmable bulb (Enable optional characteristic _Brightness_)

```json
{
    "Brightness":true
}
```

### Color changing bulb (Enable optional characteristics _Brightness, Hue, Saturation_)

```json
{
    "Brightness":true,
    "Hue":true,
    "Saturation":true
}
```

### Color Temperature bulb

It is also possible to define the range of the lightbulb if it has a light which can change temperature.
You should watch out, that this values are in `Reciprocal megakelvin` so you have to 'convert' to this if your lamp is using Kelvin values (1000000 / Kelvin).

```json
{
    "ColorTemperature": {
         "minValue": 150,
         "maxValue": 500
    }
}
```

### Dimmable bulb with 5% increments

```json
{
    "Brightness":{
        "minStep":5
    }
}
```

### Security system with no "night" mode

```json
{
    "SecuritySystemCurrentState":
        {
            "validValues": [0,1,3,4]
        },
    "SecuritySystemTargetState":
        {
            "validValues": [0,1,3,4]
        }
}
```

### Valve with only "irrigation" valve type (will show in Home app as sprinkler)

```json
{
    "ValveType":
    {
        "minValue":1,
        "maxValue":1
    }
}
```

## General Characteristics

Some characteristics are available to almost all services but do not do much to change the use of the item in the Home app. For example Active, Tampered, or Fault. These characteristics are optional and are used to show extra status information in the Home app.

This list is not meant to be a comprehensive or exhaustive list of general characteristics.

|Characteristic|Format|Accepted Values|Notes|
|---|:---:|:---:|---|
|StatusActive|bool|`true`,`false`|`true` indicates the accessory is active and has no errors|
|StatusTampered|int|0, 1| `0`: Normal, `1`: Tampered|
|StatusFault|int|0, 1|`0`: Normal, `1`: Fault|

When these values are used, the detail screen of your accessory will show new fields under "status" to display these values. Example:

![img_15d3a50a9181-1](https://user-images.githubusercontent.com/38265886/54031465-6fd8c600-4174-11e9-9728-a6aa2e6e2267.jpeg)
