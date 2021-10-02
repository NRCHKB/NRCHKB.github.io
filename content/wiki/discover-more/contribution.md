---
title: "Contribution"
description: "Few hints how to contribute to our wiki!"
lead: ""
date: 2021-04-01T00:00:00+02:00
lastmod: 2021-10-02T00:27:32.610Z
draft: false
images: []
menu:
  docs:
    parent: "discover-more"
weight: 10
toc: true
contributors: ["Shaquu"]
---

## Editing

1. Open desired page
   1. For example [`https://nrchkb.github.io/wiki/service/lock-mechanism/`](https://nrchkb.github.io/wiki/service/lock-mechanism/)
2. Click <p class="edit-page" style="display: contents;"><a href="javascript: document.body.scrollIntoView(false);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>Edit this page on GitHub</a></p> on the bottom of the page
   1. It will redirect you to raw page file in our GitHub repository
3. In GitHub editor add or edit content after last `---`
   1. For content, you can use markdown (preferred) or html
4. Create new branch for commit and create Pull Request
   1. Our Moderators will respond shortly!

## Page parameters

On our every page between `---` you can find page specific parameters.

| parameter | description |
|---|---|
| title | Page title, used in browser tab and also displayed at the top of the page |
| description | Page description, displayed when you share page link |
| date | Page creation date (ISO 8601) |
| lastmod | Page last modification date (ISO 8601), to be edited after every change. You can use [that](https://www.timestamp-converter.com/) page to generate one. |
| weight | Page order in menu |
| toc | If page table of content should be displayed |
| contributors | List of contributors |

## Repository directory structure

All our wiki pages are located in `content/wiki` folder [in our repository](https://github.com/NRCHKB/NRCHKB.github.io/tree/master/content/wiki).

## Adding contributor

Once you edit or add any content feel free to add yourself to contributors.

1. In specific page add your name to the end of array `contributors: ["Shaquu"]`
2. If you want you can create your profile page in `content/contributors`
   1. Use [this](https://github.com/NRCHKB/NRCHKB.github.io/blob/master/content/contributors/shaquu/_index.md) as an example.
