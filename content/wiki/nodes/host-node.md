---
title: "Host Node"
description: "Host node acts as a link between service node(s) and Home.app"
lead: "Host node acts as a link between service node(s) and Home.app."
date: 2021-05-06T00:00:00+02:00
draft: false
images: []
menu:
  docs:
    parent: "nodes"
weight: 30
toc: true
contributors: ["GogoVega","Shaquu"]
---

It can be configured in two ways:

| Option    | Description                                                                                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bridge    | When you add a Bridge in the Home.app, it will add all services related to this Bridge.                                                                                 |
| Accessory | Here, the Bridge being the Accessory itself, you can define the type of service it is, and when you add it to the Home.app it will show you your Accessory with a logo. |

{{< alert icon="⚠️" >}}**Important Notice,** when you create a new Bridge for Service Node that is in a subflow, once deployed new Bridge will be created for each subflow instance in a flow. If you create a Bridge outside a subflow then it will be created only once (reused)..{{< /alert >}}
\
{{< alert icon="💡" text="It is recommended to use Accessory when using a group of services (Television, Smart Speaker) to avoid display problems in Home.app." />}}

## Configuration

You will find below a list of parameters and their usefulness.

### Accessory Category

**This field is only available when _[Host Type]({{< ref "/wiki/nodes/service-node#host-type" >}} "Host Type")_ is set to _Accessory_**

Select the type of Accessory to display in the Home.app.

### Pin Code

The Pin code is used to validate the addition of a Bridge or an Accessory.

{{< alert icon="‼️" >}}**It is strongly recommended** not to use weak code due to their trivial, insecure nature. Since version 1.2.0 a pin code generator has been added.{{< /alert >}}

### Port

You can manually enter the desired port or leave the field blank to generate it automatically.

### Advertiser

| Option      | Description                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Leave blank | By default, it's Bonjour used.                                                                                                                              |
| Bonjour     | Bonjour HAP is the default and legacy advertiser, it is not as efficient in terms of system resource usage and network traffic when compared to Ciao.       |
| Ciao        | For the majority of users, Ciao should provide the best experience, however in some network setups it does not work and Bonjour HAP should be used instead. |

### Allow Insecure Request

If allowed, will allow Unencrypted and Unauthenticated access to the HTTP server.

### Fields

Below is a list of fields that you can fill, it is not mandatory but it can be used to identify the characteristics of your services.

- Manufacturer
- Serial Number
- Model
- Firmware Revision
- Hardware Revision
- Software Revision

### Name

This name will be displayed on your Bridge and also in the Home.app. It is also possible to change the name in the Home.app of your Bridge but this will not change the name in Node-RED.

### Allow Message Passthrough

This option allows you to choose whether you want to allow messages to pass through your node or not.

{{< alert icon="💡" >}}Learn more about [Disable Message Passthrough]({{< ref "/wiki/nodes/output-messages#disable-messages-passthrough" >}} "Disable Messages Passthrough").{{< /alert >}}

### Custom MDNS Configuration

In computer networks, the multicast DNS protocol resolves hostnames to IP addresses within small networks that do not include a local name server.

```js
export type MulticastOptions = {
  multicast?: boolean,
  interface?: string,
  port?: number,
  ip?: string,
  ttl?: number,
  loopback?: boolean,
  reuseAddr?: boolean,
};
```

{{< alert icon="👉" >}}Learn more about [MDNS Configuration](https://github.com/mafintosh/multicast-dns).{{< /alert >}}
