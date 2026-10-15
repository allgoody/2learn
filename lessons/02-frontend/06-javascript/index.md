---
title: Javascript
type: skill
topic: 02-frontend
tier: large
status: drafted
aliases: ["JavaScript"]
prereqs: ["02-frontend/03-html"]
related: []
---

## What it is

JavaScript is the programming language of the browser, and the language most front-end work is written in. It runs in the page, in the server, and in the tooling between them. The language is small at its core — values, functions, objects, closures — and much of the skill lies in knowing the difference between that core and the quirks it has accumulated.

## Why it matters

Every interactive page is JavaScript. It decides what happens when you click, what data is fetched, and whether the interface responds before the user gives up. It is also the substrate under every framework you will meet: React, Vue and Angular are all libraries that expect you to know what a closure is, why `this` is different here, and what a promise does when it rejects. Skipping the language to learn a framework produces the most common kind of front-end developer: fluent in a framework's idioms, unable to debug what it does.

## In this track

1. **Syntax and semantics** (`02-frontend/06-javascript/01-syntax-and-semantics`) — values, scope, functions and the parts of the language that surprise people.
2. **The DOM and events** (`02-frontend/06-javascript/02-the-dom-and-events`) — reading and changing the page, and responding to the user.
3. **Asynchronous JavaScript** (`02-frontend/06-javascript/03-asynchronous-javascript`) — callbacks, promises and `async`/`await`, and what they are for.
4. **Modules and tooling** (`02-frontend/06-javascript/04-modules-and-tooling`) — splitting code into files and getting it into a browser.

## Prerequisites

- **Hypertext Markup Language (HTML)** (`02-frontend/03-html`)

## Go deeper

- **TypeScript** (`02-frontend/19-typescript`) — the typed superset most production JavaScript is written in.
- **State Management** (`02-frontend/23-state-management`) — once the page has data that several places share.
- **Browser DevTools** (`02-frontend/27-browser-devtools`) — the console and debugger are where the language is actually learned.
