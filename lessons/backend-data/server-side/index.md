---
title: Server Side
type: area
topic: backend-data
tier: small
status: drafted
aliases: ["Server-Side Development"]
prereqs: []
related: []
---

## What it covers

"Server side" names a location, not a skill. It means the code runs on a machine the user does not control, where it can hold secrets, reach a database and trust nothing the client sent. The four languages listed here are the ones most often used in that position; they differ in syntax and ecosystem, but the location imposes the same requirements on all of them. Learning the location is therefore separate from learning any one language.

## Why it matters

The distinction decides the security model. Code running in a browser is public: its source can be read, its requests can be forged and its validation can be skipped. Code running on a server can be trusted with a credential, but it must assume every input it receives is hostile. A developer who has only written browser code tends to trust the client, and that is exactly the mistake that produces broken access control and injection flaws.

## Included skills

- **Node.JS** (`backend-data/nodejs`) — JavaScript on the server, one language across the stack.
- **Python Programming** (`backend-data/python-programming`) — dominant in scripting, data work and automation.
- **Java** (`backend-data/java`) — a typed, long-lived language with a heavy presence in enterprise backends.
- **Go** (`backend-data/go`) — compiled, concurrent and small, common for services and infrastructure tooling.

## Where to start

Read whichever language your project already uses; the location's rules — validate at the boundary, keep secrets on the server, never trust the client — apply within any of them. From there, move to Restful API and the data entries, which describe the work a server does rather than the language it is written in.
