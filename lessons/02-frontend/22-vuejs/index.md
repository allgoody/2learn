---
title: Vue.js
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: ["Vue"]
prereqs: ["02-frontend/06-javascript"]
related: []
---

## What it is

Vue is a JavaScript framework for building interfaces from components. It comes in two flavours: a single-file component that keeps template, logic and styles together, and a plain object API that can be dropped into an existing page. Its distinguishing feature is reactivity — a plain object you change, after which the framework updates whatever depends on it.

## Why it matters

Vue's design goal is a low barrier between a static page and an application, and it shows. A script tag and one component file can make a page interactive, with no build step required to start, while the same component model scales to a full application with routing and a store. In its main market — a large amount of European enterprise and government work — that gentleness matters, because the teams adopting it are often adding interactivity to an existing server-rendered product rather than building a new single-page app. The other reason to know it is comparative: Vue, React and Angular make different choices about templates, reactivity and structure, and seeing a second model makes the first one legible.

## In this track

1. **Reactivity and templates** (`02-frontend/22-vuejs/01-reactivity-and-templates`) — the template syntax and how Vue tracks the data a template depends on.
2. **Single-file components** (`02-frontend/22-vuejs/02-single-file-components`) — the file format, props, events and slots that make a component reusable.

## Prerequisites

- **Javascript** (`02-frontend/06-javascript`)

## Go deeper

- **State Management** (`02-frontend/23-state-management`) — the problem every framework solves differently.
- **React** (`02-frontend/29-react`) — the other mainstream component model, worth reading side by side.
- **Webpack** (`02-frontend/24-webpack`) — the tool most Vue projects have historically been built with.
