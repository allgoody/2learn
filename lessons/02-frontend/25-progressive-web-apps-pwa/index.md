---
title: Progressive Web Apps (PWA)
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: ["PWA"]
prereqs: ["02-frontend/06-javascript"]
related: []
---

## What it is

A progressive web app is a website that also behaves like an installed application: it can work offline or on a poor connection, it can be launched from the home screen without browser chrome, and it can receive push notifications. Nothing about it requires a different platform — it is a set of browser capabilities layered onto a normal site.

## Why it matters

For a large class of products, a PWA is the pragmatic middle ground between a website and two native applications. The same codebase reaches every device, updates without an app store review, and can still be installed by the users who want it. The offline capability is often the more valuable half: a field service tool that keeps working in a basement, or a page that loads instantly on a train, is a materially better product than one that shows a browser error. The cost is a service worker, which is a caching layer with all the invalidation problems that implies.

## In this track

1. **Service workers and offline** (`02-frontend/25-progressive-web-apps-pwa/01-service-workers-and-offline`) — the proxy that sits between the page and the network, and how to cache without serving stale content.
2. **Installability and the app manifest** (`02-frontend/25-progressive-web-apps-pwa/02-installability-and-the-app-manifest`) — the metadata that lets a browser offer to install the site, and what changes once it is installed.

## Prerequisites

- **Javascript** (`02-frontend/06-javascript`)

## Go deeper

- **Web Performance (Core Web Vitals)** (`02-frontend/26-web-performance-core-web-vitals`) — an installed app is judged by the same metrics, and a cold start is the hardest case.
- **Web Security (OWASP Top 10)** (`07-security/01-web-security-owasp-top-10`) — a service worker is a script with unusual privilege and deserves the same scrutiny as any other.
- **Responsive Web Design** (`02-frontend/10-responsive-web-design`) — the layout has to work at the sizes an installed app is used at.

