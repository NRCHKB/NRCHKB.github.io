---
title: "Contribution"
description: "Few hints how to contribute to our wiki!"
lead: "You want to add something to our Wiki."
date: 2021-04-01T00:00:00+02:00
lastmod: 2022-01-30T12:38:44.142Z
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 10
toc: true
contributors: ["Shaquu", "crxporter"]
---

## How to Edit

If you want to edit a page of our wiki, nothing could be simpler, follow the steps below:

1. Open desired page
   * For example [`https://nrchkb.github.io/wiki/service/lock-mechanism/`](https://nrchkb.github.io/wiki/service/lock-mechanism/)
2. Click <p class="edit-page" style="display: contents;"><a href="javascript: document.body.scrollIntoView(false);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>Edit this page on GitHub</a></p> on the bottom of the page
   * You will be directed to the raw page file in our GitHub repository
3. In GitHub editor, add or edit content after last `---`
   * For content, you can use markdown (preferred) or html
4. Create new branch for commit and create Pull Request
   * Our Moderators will respond shortly!


## Page Parameters

On each raw page between `---` you can find page specific parameters:
 
| Parameter | Description |
|---|---|
| title | Page title, used in browser tab and also displayed at the top of the page |
| description | Description page, only displayed when you share a page |
| lead | Mini-summary displayed below the title |
| date | Page creation date (ISO 8601) |
| lastmod | Page last modification date (ISO 8601), to be edited after every change. You can use [this](https://www.timestamp-converter.com/) page to generate one. |
| weight | Page order in menu |
| toc | If page table of content `On This Page` should be displayed |
| contributors | List of contributors |

{{< alert icon="💡" >}}Other parameters such as draft, images and menu are also present but you are not asked to complete them.{{< /alert >}}

## Language used

We mainly use the [markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) language to edit our pages and for more complex cases of [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML).

## Image

To add a image, you must **upload** it to the **same folder** as the page you are editing and **insert this code** `![Edit view](edit-view.png)` where you want to put your image.

## Link

If you want to add a link to another page, to a chapter (point) of a page or a link to an external site.

### Within our Wiki

Structure : `[Name display on the Page]({{</* ref... */>}} "Name of the link")`.

| Option | Description |
|---|---|
| `ref "/wiki/folder"` | Link to a `index.md` Page |
| `ref "/wiki/folder/fileName"` | Link to a `fileName.md` Page |
| `ref "/wiki/folder/fileName#point"` | Link to a Point of the Page |
| `ref . "#point"` | Link to a Point of the **same** Page |

#### Example

- Link to a Page:

`[Host Node]({{</* ref "/wiki/nodes/host-node" */>}} "Host Node")`

- Link to a Point:

`[Bridge Name]({{</* ref "/wiki/nodes/host-node#name" */>}} "Name")`

{{< alert icon="💡" >}}For our links within our wiki we use the [Hugo mechanism](https://gohugo.io/content-management/cross-references/).{{< /alert >}}

### External

Structure : `[Name display on the Page](url)`.

#### Example

`[Google](https://google.com)`

## Alert

If you want to add an Alert banner, insert this code:

`{{</* alert icon="👋" */>}}Your Text{{</* /alert */>}}`

Display:

{{< alert icon="👋" >}}Your Text{{< /alert >}}
\
Icon frequently used: 💡|👉|‼️

## Repository directory structure

All our wiki pages are located in `content/wiki` folder [in our repository](https://github.com/NRCHKB/NRCHKB.github.io/tree/master/content/wiki).

```bash
..
├── wiki/
│   ├── characteristic/
│   ├── discover-more/
│   ├── examples/
│   ├── introduction/
│   ├── nodes/
│   ├── service/
│   └── _index.md
└── _index.md
```

## Adding contributor

Once you edit or add any content feel free to add yourself to contributors.

1. In specific page add your name (case sensitive) to the end of array `contributors: ["Shaquu", "crxporter"]`
2. If you want you can create your profile page in `content/contributors`
   * Use [this](https://github.com/NRCHKB/NRCHKB.github.io/blob/master/content/contributors/shaquu/_index.md) as an example.
