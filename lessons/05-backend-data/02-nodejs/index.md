---
title: Node.JS
type: skill
topic: 05-backend-data
tier: medium
status: drafted
aliases: ["Node.js", "Node"]
prereqs: ["02-frontend/06-javascript"]
related: []
---

## What it is

Node.JS is a runtime that executes JavaScript outside the browser. It provides the language, plus the parts a program needs to do real work: files, network sockets, processes and timers. The distinctive decision is that it runs your code on a single thread and performs input and output asynchronously, so one process can hold thousands of open connections without a thread per connection.

## Why it matters

The practical appeal is one language across the stack: the same developer can move between the browser and the server, and types or validation can be shared between them. The operational appeal is the model: for services that mostly wait on networks — which describes most APIs — a single asynchronous process uses memory efficiently and avoids the scheduling cost of many threads. The cost is that any long computation blocks everything else, and that asynchronous control flow must be handled deliberately rather than by the runtime.

## In this track

1. **The event loop** (`05-backend-data/02-nodejs/01-the-event-loop`) — how one thread handles many concurrent operations without blocking.
2. **Modules and the runtime** (`05-backend-data/02-nodejs/02-modules-and-the-runtime`) — the module system, the standard library, and what the runtime provides.

## Prerequisites

- **JavaScript** (`02-frontend/06-javascript`)

## Go deeper

- **JavaScript** (`02-frontend/06-javascript`) — the language this runtime executes, so read it first.
- **Express.js** (`05-backend-data/08-expressjs`) — the framework most server-side JavaScript starts with.
- **Go** (`05-backend-data/05-go`) — the other compiled language in this topic, and the obvious comparison for concurrent network services.
