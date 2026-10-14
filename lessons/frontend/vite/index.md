---
title: Vite
type: skill
topic: frontend
tier: small
status: drafted
aliases: []
prereqs: ["frontend/package-management-npm"]
related: []
---

## What it is

Vite is a build tool for front-end projects. In development it serves your files as native ES modules and lets the browser request them, transforming each file on demand. For production it hands the same project to a bundler and produces optimised output. The two modes share a configuration and a set of conventions.

## Why it matters

The cost that Vite removes is the wait after saving a file. Bundlers rebuild a graph before the browser can show anything, and on a large project that is seconds of dead time on every change. Serving native modules means the browser requests only the file that changed, so the update is nearly instant regardless of project size. That single property changed the default tooling choice for new projects, and it is worth knowing where the speed comes from — and where it does not apply — rather than treating the tool as a magic box.

## Core ideas

### Development serves modules; production bundles

The dev server does not build a bundle. It rewrites bare import specifiers to real paths and lets the browser fetch the graph, transforming files as they are requested. This is why cold start is fast and why the first page load in development can be slower than in production: the browser makes many requests.

```js
// vite.config.js — often this short
import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 5173 },
  build: { sourcemap: true },
});
```

### Dependencies are pre-bundled once

Third-party packages are converted to ES modules and cached on first use, because many were published with a module format the browser cannot consume directly. This step is why a dependency edit asks you to restart, and why a broken pre-bundle shows up as an error about a dependency rather than about your code.

### Hot module replacement is per-module

An edit is pushed to the affected module and its importers rather than reloading the page. State in unrelated components survives, which matters when the part you are working on is three clicks deep. HMR is a development convenience with no production equivalent; code that assumes it will run will behave differently in the built output.

### Environment variables are exposed by prefix, and are not secrets

Only variables prefixed with the tool's convention are made available to client code, and whatever is exposed is public because it ends up in the bundle. Configuration that must stay secret belongs on a server, not in a client build.

```js
const apiBase = import.meta.env.VITE_API_BASE;
```

### The production build is still a bundler's job

For the final output, the project is bundled and minified, assets are hashed for caching, and dynamic imports become separate chunks. The conventions from a plain JavaScript project — modules, dynamic import, assets referenced from source — carry across unchanged.

## Practice

### Measure the feedback loop

Start a dev server on a project with a few hundred modules, edit one component and time how long until the change appears. Then do the same in a bundler-based setup if one is available.

Done when: you can state the time-to-update for each and explain why the module-serving approach does not grow with the size of the untouched code.

### Split one heavy dependency with a dynamic import

Find the largest dependency in a built project, and load it with a dynamic import triggered by the interaction that needs it.

Done when: the production build emits it as a separate chunk and the first page load no longer requests it.

## Common mistakes

- **Expecting hot replacement in the production build** — the built output has no dev server and the update mechanism is absent; fix: treat HMR as a development-only feature.
- **Putting a secret in a prefixed environment variable** — it is compiled into the public bundle; fix: keep secrets server-side.
- **Restarting the server for every dependency change without reason** — the pre-bundle cache may already be valid; fix: read the message before restarting.
- **Shipping the dev server output** — it is unbundled and unhashed; fix: build for production and deploy the built directory.
- **Assuming the tool compiles TypeScript with type checking** — it strips types without checking them; fix: run the compiler separately, in the pipeline.

## Go deeper

- **Package Management (npm)** (`frontend/package-management-npm`) — how the dependencies being pre-bundled get installed.
- **Webpack** (`frontend/webpack`) — the bundled-graph model this tool was designed around.
- **Modules and tooling** (`frontend/javascript/04-modules-and-tooling`) — the module semantics both tools implement.
