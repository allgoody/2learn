---
title: Java
type: skill
topic: backend-data
tier: large
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Java is a statically typed, compiled language that runs on a virtual machine. Source is compiled to bytecode, and the virtual machine executes that bytecode, handling memory, loading classes and optimising hot code while the program runs. The result is a language that is verbose by modern standards and unusually predictable in long-lived, large-team settings, which is why it remains the default in enterprise backends.

## Why it matters

The virtual machine is the reason Java is still chosen: a mature runtime with a garbage collector and a just-in-time compiler that has been tuned for two decades, on every operating system and architecture. Code compiles once and runs anywhere the runtime exists, and a program that has been running for weeks is optimised as heavily as the platform can manage. The cost is memory and startup time, and a language whose ceremony — types, visibility, checked exceptions — some teams find heavy and others find clarifying.

## In this track

1. **The language and the JVM** (`backend-data/java/01-the-language-and-the-jvm`) — what compiles, what runs, and how the virtual machine executes it.
2. **Objects and type design** (`backend-data/java/02-objects-and-type-design`) — classes, interfaces, generics and the type system's design pressure.
3. **Builds and dependencies** (`backend-data/java/03-builds-and-dependencies`) — the build tooling and the dependency ecosystem around the language.
4. **Enterprise backends** (`backend-data/java/04-enterprise-backends`) — the framework conventions that shaped most Java server applications.

## Prerequisites

None.

## Go deeper

- **Python Programming** (`backend-data/python-programming`) — the dynamically typed contrast, and the more common choice for scripting.
- **Go** (`backend-data/go`) — a compiled language designed to be simpler and to start faster, and a frequent replacement for JVM services.
- **Server Side** (`backend-data/server-side`) — the location most Java code runs in.
