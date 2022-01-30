---
title: "Credits"
description: "Credits"
lead: ""
date: 2021-08-03T00:00:00+02:00
lastmod: 2022-01-30T12:38:44.142Z
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 100
toc: true
contributors: ["crxporter", "Shaquu"]
---

*First of all, we would like to express our deepest thanks to the creators of this project.*
*Next, we would like to especially thank @Shaquu for his time and work in developing and maintaining this project.*\
*Finally, we would like to sincerely express our thanks with deep gratitude to everyone who contributed near or far to its realization, because a project cannot be the work of one person.*

## History

### 7 November 2016

[Marius Schmeding (@mschm)](https://github.com/mschm) made the first version of the Node-RED plugin using [HAP-NodeJS](https://github.com/homebridge/HAP-NodeJS) called [node-red-contrib-homekit](https://www.npmjs.com/package/node-red-contrib-homekit)

### 13 April 2018

[Oliver Rahner (@oliverrahner)](https://github.com/oliverrahner) steps in and makes a fork called [node-red-contrib-homekit-bridged](https://www.npmjs.com/package/node-red-contrib-homekit-bridged)

<figure>
<blockquote class="blockquote">
<p>As Marius Schmeding seems to have abandoned his great work, I decided to fork his repo and to introduce some major rework.</p>
<p>The biggest change is the use of HAP-NodeJS in bridged mode: only add one bridge in the iOS Home.app to access all your devices!</p>
Also, I (believe I) fixed some issues:
- devices don't show as unreachable after redeploying
- having more than one device per accessory (in the "old" world) or bridge doesn't lead to iOS losing the parameters for this device anymore
</blockquote>
<figcaption class="blockquote-footer">
<cite title="Oliver Rahner">@oliverrahner</cite>
</figcaption>
</figure>

### 21 February 2019 - present

[Tadeusz Wyrzykowski (@Shaquu)](https://github.com/Shaquu) joins the effort.

<figure>
<blockquote class="blockquote">
<p>In the beginning I knew nothing about the HomeKit.</p>
<p>Few days later I decided to fork the repository.</p>
<p>Shortly after I got full control over original one and started major refactoring.</p>
<p>That time with a help of random user <a href="https://github.com/crxporter">@crxporter</a> (who is my good friend today!) we started adding more and more features and improvements, and story continues!</p>
</blockquote>
<figcaption class="blockquote-footer">
<cite title="Tadeusz Wyrzykowski">@Shaquu</cite>
</figcaption>
</figure>

## Contributors

Thanks to all of our contributors for their work and effort!

{{< contributors >}}
