---
title: Go
type: skill
topic: backend-data
tier: medium
status: drafted
aliases: ["Golang"]
prereqs: []
related: []
---

## What it is

Go is a compiled language designed around three properties: it compiles quickly to a single static binary, it has concurrency built into the language rather than added by a library, and it has deliberately few features. The standard library includes an HTTP server, a JSON encoder and a test runner, so a service can often be written with no third-party dependency at all.

## Why it matters

The combination is unusually well suited to infrastructure and network services. A single binary with no runtime to install makes deployment trivial and container images small, which is why so much of the cloud tooling around containers and orchestration is written in it. Fast compilation keeps the edit-run loop short, and the small feature set means most Go code looks similar, so a new team member can read a service on their first day. The trade-off is that the simplicity is enforced: generic abstractions and expressive type features are limited by design, and some problems are more verbose here than elsewhere.

## In this track

1. **The toolchain** (`backend-data/go/01-the-toolchain`) — formatting, building, testing and dependency management as one standard set of commands.
2. **Concurrency** (`backend-data/go/02-concurrency`) — goroutines, channels and the model that makes them safe to use.

## Prerequisites

None.

## Go deeper

- **Python Programming** (`backend-data/python-programming`) — the scripting alternative, often used for the surrounding tooling.
- **Java** (`backend-data/java`) — the other compiled option, with a much larger runtime and ecosystem.
- **Docker** (`cloud-devops/docker`) — where a single static binary makes the smallest and simplest container image.
