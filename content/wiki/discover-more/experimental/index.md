---
title: "Experimental"
description: "NRCHKB experimental features."
lead: "During development, we add new features that are marked as <code>experimental</code>."
date: 2021-10-11T23:32:09.000Z
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 100
toc: true
---

These are beta versions containing possible future features.
We use beta versions to test and improve our features without compromising the experience of our users.

{{< alert icon="‼️" text="Beta versions may contain bug fixes and improvements!" />}}

## Open Node-RED in beta mode

In order to be able to use experimental features you have to start Node-RED with `NRCHKB_EXPERIMENTAL=true` environment variable.

Enter this command in your terminal:

```bash
sudo NRCHKB_EXPERIMENTAL=true node-red
```

With `DEBUG` in addition:

```bash
sudo NRCHKB_EXPERIMENTAL=true DEBUG=NRCHKB* node-red
```

{{< alert icon="💡" text="Don't forget to stop Node-RED first before launching it in beta mode." />}}


## Use of Debug

Using debug allows you to see logs and possible errors.

Below is a table with all the possible logs and their description:

| Options | Description |
|---|---|
| NRCHKB* | Show all HK logs |
| ServiceUtils | Show Service node logs |
| BridgeUtils | Show Bridge logs |
| AccessoryUtils | Show Accessory logs |
| CharacteristicUtils | Show Characteristic logs |
| MdnsUtils | Show Mdns logs |

## Start automatically in beta mode

If you want to start Node-RED in beta mode when your system restarts:

### Raspberry Pi

The file should be located at `/lib/systemd/system/nodered.service`

```bash
sudo nano /lib/systemd/system/nodered.service
```

Find a line starting with `Environment` and add one (or both) of the following lines.

```bash
Environment="NRCHKB_EXPERIMENTAL=true"
Environment="DEBUG=NRCHKB*"
```

**Watching these logs** after enabling the logging can be done using the `journalctl -f` command.

```bash
sudo journalctl -u nodered.service -f
```

### Docker

Edit your `docker-compose` file like this:

```yaml
version: '3.8'
services:
  node-red-homekit:
    image: nrchkb/node-red-homekit:latest-12
    environment:
      NRCHKB_EXPERIMENTAL: 'true'
    network_mode: host
    volumes:
      - './data/node-red-homekit:/data'
    container_name: node-red-homekit
    restart: always
```

## Experimental features

### Custom Characteristics

It's possible to add custom characteristics ([issues#52](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/52)).

To do this:

1. Configure the ![nrchkb node](nrchkb-node.png)node.

![Custom Characteristics editor](custom-characteristics-nrchkb-node.png)

{{< alert icon="💡" >}}You can use this [documentation](https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d) to configure your custom characteristics based on existing characteristics.{{< /alert >}}

2. Add your Characteristics on Service node.

![Service node Custom Characteristics](custom-characteristics-service-node.png)

{{< alert icon="💡" text="Home.app does not display Custom Characteristics but you can use Eve.app" />}}

#### Example Eve Characteristics

![Custom Characteristics Eve.app](custom-characteristics-eve-app.jpeg)

| name          | UUID                                 | format | description       | minValue | maxValue   | minStep |
| ------------- | ------------------------------------ | ------ | ----------------- | -------- | ---------- | ------- |
| Volt          | E863F10A-079E-48FF-8F27-9C2605A29F52 | uint16 | Eve Volt          | 0        | 400        | 3       |
| Ampere        | E863F126-079E-48FF-8F27-9C2605A29F52 | float  | Eve Ampere        | 0        | 16         | 0.01    |
| Watt          | E863F10D-079E-48FF-8F27-9C2605A29F52 | uint16 | Eve Watt          | 0        | 3500       |         |
| Kilowatt-Hour | E863F10C-079E-48FF-8F27-9C2605A29F52 | float  | Eve Kilowatt-Hour | 0        | 4294967295 | 0.01    |
| Volt-Ampere   | E863F110-079E-48FF-8F27-9C2605A29F52 | float  | Eve Volt-Ampere   | 0        | 4000       | 0.01    |

You can add the above Characteristics directly in the folder `~/.node-red/nrchkb/35b973f1696b4cd60b78ca5f719b83ca` by pasting the content below into it:

```json
{"key":"customCharacteristics","value":[{"name":"Volt","UUID":"E863F10A-079E-48FF-8F27-9C2605A29F52","format":"uint16","unit":"","perms":["pr","pw","ev","tw","wr"],"ev":"true","description":"Eve Volt","minValue":"0","maxValue":"400","minStep":"3","maxLen":"","maxDataLen":"","validValues":"","adminOnlyAccess":["0","1","2"]},{"name":"Ampere","UUID":"E863F126-079E-48FF-8F27-9C2605A29F52","format":"float","unit":"","perms":["pr","pw","ev","tw","wr"],"ev":"true","description":"Eve Ampere","minValue":"0","maxValue":"16","minStep":"0.01","maxLen":"","maxDataLen":"","validValues":"","adminOnlyAccess":["0","1","2"]},{"name":"Watt","UUID":"E863F10D-079E-48FF-8F27-9C2605A29F52","format":"uint16","unit":"","perms":["pr","pw","ev","tw","wr"],"ev":"true","description":"Eve Watt","minValue":"0","maxValue":"3500","minStep":"","maxLen":"","maxDataLen":"","validValues":"","adminOnlyAccess":["0","1","2"]},{"name":"Kilowatt-Hour","UUID":"E863F10C-079E-48FF-8F27-9C2605A29F52","format":"float","unit":"","perms":["pr","pw","ev","tw","wr"],"ev":"true","description":"Eve Kilowatt-Hour","minValue":"0","maxValue":"4294967295","minStep":"0.01","maxLen":"","maxDataLen":"","validValues":"","adminOnlyAccess":["0","1","2"]},{"name":"Volt-Ampere","UUID":"E863F110-079E-48FF-8F27-9C2605A29F52","format":"float","unit":"","perms":["pr","pw","ev","tw","wr"],"ev":"true","description":"Eve Volt-Ampere","minValue":"0","maxValue":"4000","minStep":"0.01","maxLen":"","maxDataLen":"","validValues":"","adminOnlyAccess":["0","1","2"]}]}
```

### Service 2

Added `Get` functionality so that the node can retrieve attribute values when a refresh is requested. [issues#392](https://github.com/NRCHKB/node-red-contrib-homekit-bridged/issues/392)

Together with NRCHKB 2.0.0 (TBC) `onSet` and `onChange` will be merged into unified output called events.

It will output data for all event types defined below:

- set
- change
- subscribe
- unsubscribe
- characteristic-warning

Node output will look like:

```js
type HAPServiceNodeEvent = {name: CharacteristicEventTypes, context?: any}

type HAPServiceNodeOutput = {
    payload: { [key: string]: any }
    hap: {
        oldValue?: any
        newValue?: any
        context?: any
        event: HAPServiceNodeEvent
        session?: {
            sessionID?: SessionIdentifier,
            username?: HAPUsername,
            remoteAddress?: string,
            localAddress?: string,
            httpPort?: number,
        }
    }
    name?: string
    topic: string
}
```