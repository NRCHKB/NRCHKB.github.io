---
title: "Characteristics"
description: "Characteristics"
lead: "What is a characteristic and how to use it."
date: 2021-04-01T00:00:00+02:00
lastmod: 2022-01-26T20:51:13.183Z
draft: false
images: []
menu:
  docs:
    parent: "nodes"
weight: 60
toc: true
contributors: ["crxporter","djiwondee","radokristof","caitken-com","Shaquu"]
---

## What is that

A Service node is made up of one or more characteristics. This allows Home.app to adapt its display to the chosen characteristics. It also allows you to define default values and usage limitations.

{{< alert icon="💡" >}}The Characteristics available for each service are displayed on each page of the [Service]({{< ref "/wiki/service/" >}} "Service") section and information about each characteristic in the [Characteristic]({{< ref "/wiki/characteristic" >}} "Characteristic") section.{{< /alert >}}

## How to use it

Go to the section called `Characteristic Properties` of your HomeKit Service Node.

![Characteristic Properties](characteristic_properties.png)

To indicate this Characteristic is used:

```{ "Characteristic": true }```

To indicate a default value (20 for example):

```{ "Characteristic": 20 }```

## Usage Limitation

To indicate a usage limitations:

| Option | Description |
|---|---|
| `defaultValue` | Value by default |
| `minValue` | Minimum value authorized |
| `maxValue` | Maximum value authorized |
| `minStep` | Minimum step (gap) authorized |
| `validValues` | Value authorized [ ] |

### Example

```json
{
  "TargetHorizontalTiltAngle": {
    "defaultValue":45,
    "minValue":0,
    "maxValue":90
  }
}
```

## Examples

Below is an example list of characteristics.

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
You should watch out, that these values are in `Reciprocal megakelvin` so you have to 'convert' to this if your lamp is using Kelvin values (1000000 / Kelvin).

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

### Valve with only "irrigation" valve type (will show in Home.app as sprinkler)

```json
{
    "ValveType":
    {
        "minValue":1,
        "maxValue":1
    }
}
```
