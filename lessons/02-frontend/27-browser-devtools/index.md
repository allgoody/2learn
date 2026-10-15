---
title: Browser DevTools
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: ["DevTools"]
prereqs: ["02-frontend/06-javascript"]
related: []
---

## What it is

DevTools is the set of inspectors built into the browser: the document tree and its styles, the network log, the JavaScript console and debugger, the performance recorder, the storage viewers and the accessibility tree. It is the only complete view of what the browser actually did with your code.

## Why it matters

Every other way of debugging a front-end problem is an inference. Reading the source tells you what you wrote, not what the browser loaded. Console logging tells you what you happened to think of logging. DevTools shows the resolved styles on a real element, the bytes that actually crossed the network, the stack that actually threw, and the milliseconds that actually elapsed. Almost every "it works on my machine" ends at the moment someone opens the tool and looks at the request that was never sent.

## In this track

1. **Elements and styles** (`02-frontend/27-browser-devtools/01-elements-and-styles`) — inspecting the live tree and the cascade that produced each computed value.
2. **Network and performance** (`02-frontend/27-browser-devtools/02-network-and-performance`) — reading the request log and recording where the main thread spent its time.

## Prerequisites

- **Javascript** (`02-frontend/06-javascript`)

## Go deeper

- **Lighthouse** (`02-frontend/31-lighthouse`) — an automated audit that runs inside these tools.
- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — the metrics the performance panel is used to diagnose.
- **Cascading Style Sheets (CSS)** (`02-frontend/05-css`) — the Cascade pane is the fastest way to learn which rule is winning.

