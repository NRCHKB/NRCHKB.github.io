---
title: "Topic"
description: "The topic is used to identify and filter messages"
lead: "The topic is used to identify and filter messages."
date: 2022-02-08T15:27:48.000Z
draft: false
images: []
menu:
  docs:
    parent: "nodes"
weight: 70
toc: true
---

## What is that

The Topic serves two purposes:

- at the entrance to the HomeKit node, it allows messages to be filtered.
- at the exit of the HomeKit node, it identifies where the message came from.

## When to use it

We use the `Filter on Topic` option when you want to redirect your messages to the correct service without using `function node` or `switch node`.

Below is an example of a flow structure without Topic and another with.

![without_topic_example](without_topic_example.png)

![with_topic_example](with_topic_example.png)

As you can see the usefulness of using the Topic reduced to only one node `Lamps/+`.

## Message Structure

Below is the structure of a message with a Topic.

```js
msg = {
  payload: {
    On: true,
  },
  topic: "Your Topic",
};
```
