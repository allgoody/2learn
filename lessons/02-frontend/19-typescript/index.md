---
title: TypeScript
type: skill
topic: 02-frontend
tier: large
status: drafted
aliases: []
prereqs: ["02-frontend/06-javascript"]
related: []
---

## What it is

TypeScript is JavaScript with a static type layer on top. You annotate the shapes your functions expect and return, and a compiler checks those claims before the code runs. The types are erased at build time: the browser still receives plain JavaScript, so nothing is checked at runtime and nothing is added to the bundle.

## Why it matters

Most JavaScript defects are shape defects — a property that is sometimes missing, a value that is a number here and a string there, an argument passed in the wrong order. A type checker finds that whole family before the browser does, and does it in the editor while you type rather than in production. It also makes refactoring safe at a scale JavaScript cannot match: rename a field and the compiler lists every place that must change. The cost is real — types have to be maintained, and a badly typed codebase is worse than an untyped one — which is why the discipline is in the annotations, not in the syntax.

## In this track

1. **The type system** (`02-frontend/19-typescript/01-the-type-system`) — structural typing, inference, and annotating only what you must.
2. **Narrowing and unions** (`02-frontend/19-typescript/02-narrowing-and-unions`) — modelling states so that impossible ones cannot be represented.
3. **Generics** (`02-frontend/19-typescript/03-generics`) — writing code that keeps the relationship between input and output types.
4. **Configuration and migration** (`02-frontend/19-typescript/04-configuration-and-migration`) — the compiler options, and converting a JavaScript project without stopping work.

## Prerequisites

- **Javascript** (`02-frontend/06-javascript`)

## Go deeper

- **Webpack** (`02-frontend/24-webpack`) — the older bundler that compiles TypeScript through a loader.
- **Vite** (`02-frontend/09-vite`) — the modern alternative, which handles TypeScript with no extra configuration.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — types are one of several ways to make a signature say what it means.
