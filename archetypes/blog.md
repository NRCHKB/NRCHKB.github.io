---
title: "{{ replace .Name "-" " " | title }}"
description: ""
lead: ""
date: {{ .Date }}
draft: true
weight: 50
images: ["{{ .Name | urlize }}.jpg"]
---

{{< img src="{{ .Name | urlize }}.jpg" alt="{{ replace .Name "-" " " | title }}" caption="{{ replace .Name "-" " " | title }}" class="wide" >}}
