---
title: "Wiki Components"
description: "Example components to be used in Wiki"
lead: ""
date: 2022-01-18T20:19:11.711Z
draft: true
images: []
menu:
  docs:
    parent: "examples"
weight: 100
toc: true
contributors: ["Shaquu"]
---

To see that page you have to build Wiki with drafts using `-D` arg.

Please add unique, specific or non obvious components below.

## Tables

### Simple table with header

| A   | B   | C   | D   | E   |
| --- | --- | --- | --- | --- |
| 1   | 0.1 | 0.5 | 1   | 2   |

### HTML table with multiple headers and colspan

<table>
<thead>
  <tr>
    <th></th>
    <th colspan="2" style="text-align:center;">Service Hierarchy</th>
    <th colspan="2" style="text-align:center;">Host Type</th>
  </tr>
  <tr>
    <th>Field</th>
    <th style="text-align:center;">Parent</th>
    <th style="text-align:center;">Linked</th>
    <th style="text-align:center;">Bridge</th>
    <th style="text-align:center;">Accessory</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Service</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;">X</td>
  </tr>
  <tr>
    <td>Bridge</td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;"></td>
    <td style="text-align:center;">X</td>
    <td style="text-align:center;"></td>
  </tr>
</tbody>
</table>
