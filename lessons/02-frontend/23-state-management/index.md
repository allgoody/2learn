---
title: State Management
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: []
prereqs: ["02-frontend/06-javascript"]
related: []
---

## What it is

State management is the set of decisions about where an application's data lives and who may change it. It is not the name of a library: a library may be involved, but the decisions come first. The questions are always the same — which component owns this value, who else needs to read it, how does a change reach everyone who displays it, and is this value ours to own at all or is it a copy of something the server already knows.

## Why it matters

Front-end applications fail in a characteristic way when these questions go unanswered: the same fact is stored in three places and two of them are stale. A user edits their name in a dialog, the header still shows the old one, and the bug is filed against the header. The tooling can hide this for a while and then cannot fix it, because no single place knows the truth. Deciding the ownership model early — local where possible, shared deliberately, server data treated as a cache rather than as state — is what keeps that failure from happening at all.

## In this track

1. **Local versus shared state** (`02-frontend/23-state-management/01-local-versus-shared-state`) — starting with the smallest scope that works and lifting it only when a second consumer appears.
2. **Client and server state** (`02-frontend/23-state-management/02-client-and-server-state`) — why data fetched from an API is a different problem from data the user is editing.

## Prerequisites

- **Javascript** (`02-frontend/06-javascript`)

## Go deeper

- **React** (`02-frontend/29-react`) — one concrete component model in which these decisions have to be made.
- **Vue.js** (`02-frontend/22-vuejs`) — a reactive model that changes where the sharing boundary sits.
- **Caching (Redis)** (`05-backend-data/16-caching-redis`) — the server-side version of the same "this is a copy, not the truth" reasoning.
