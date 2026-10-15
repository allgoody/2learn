---
title: Modules and the runtime
prereqs: ["05-backend-data/02-nodejs/01-the-event-loop"]
---

## What it is

A module is a file whose exports are used by another file, and the runtime is everything the platform provides besides the language: files, network sockets, processes, timers and buffers. Node's module system comes in two styles that coexist, one with explicit imports and static resolution, one with a function that loads by name at runtime. Choosing between them, and knowing which parts of the platform are built in, is what makes a server-side JavaScript codebase navigable.

## Why it matters

The module system decides what a bundler can analyse, what can be tree-shaken, and how a dependency is loaded at startup. The two styles also behave differently with circular references and with values that must be computed before use, so mixing them carelessly produces errors that appear only at startup in production. On the platform side, knowing that streams, buffers and an HTTP server are built in — and that everything else comes from a dependency — is what keeps the dependency tree honest.

## Core ideas

### Static modules resolve before execution, dynamic imports resolve at runtime

The explicit import style is analysed before the program runs, so its bindings are visible to tooling and can be optimised. The dynamic style evaluates the target at that point in execution, which is what makes conditional or lazy loading possible and what makes the dependency invisible to static analysis. The common failure is mixing them: a module loaded one way and required the other can be initialised twice.

```text
import { readFile } from 'node:fs'      -> resolved before execution
const mod = await import(specifier)    -> resolved when this line runs
```

### The standard library is small on purpose

Files, network, processes, streams, buffers, cryptography and a URL parser are built in. Almost everything else — a web framework, a database client, a testing library — is a dependency. That keeps the runtime small and means the security surface of a project is mostly its dependency tree, which is worth remembering when a package is added for one function.

### Streams are how large data is handled without loading it

A stream delivers data in chunks as it arrives, so a file or a response body can be processed without holding it all in memory. Piping a readable to a writable is the standard shape, and forgetting to handle an error on either side is the usual way this silently stalls or leaks.

```text
readable file -> transform -> writable network socket
chunks arrive and are written; nothing is fully buffered
```

### Buffers and encodings matter at the boundary

Binary data is handled in fixed-length buffers, and converting between those and text requires choosing an encoding and being consistent. Most corruption and garbled-character bugs at this layer are a mismatch between the encoding used to read and the one used to write. Explicitly naming the encoding at every boundary prevents them.

### Concurrency and process control are available, not implicit

The runtime can spawn child processes, use worker threads and expose the process's environment and exit code. These are how work that would block the event loop is offloaded and how the process reports failure to its supervisor. A server that never sets a non-zero exit code is indistinguishable from one that shut down cleanly.

### The runtime version is part of the contract

Language features and standard-library APIs arrive with versions, and a project's supported versions should be stated and tested. Deploying an application that relies on a recent feature onto an older runtime fails at startup, which is why the version belongs in the project's configuration rather than in a colleague's memory.

## Practice

### Trace a module's load order

Take a project with several modules and a startup side effect, and determine the order in which they are evaluated.

Done when: you can name the module that runs first and the one whose side effect appears last, and explain why.

### Stream a large file instead of reading it

Take an endpoint that reads a whole file into memory and change it to stream the file to the response, handling errors on both sides.

Done when: memory use stays flat while serving a file larger than the process's heap would have allowed.

## Common mistakes

- **Mixing the two module styles for one dependency** — it can be initialised twice or fail to load; fix: pick one style and stay consistent.
- **Adding a dependency for something built in** — the security surface grows for no benefit; fix: check the standard library first.
- **Ignoring stream errors** — a failed stream stalls or leaks instead of failing loudly; fix: handle errors on the readable and the writable.
- **Assuming an encoding** — binary data becomes corrupted text; fix: name the encoding explicitly at each boundary.
- **Never setting an exit code** — a failed process looks successful to its supervisor; fix: exit non-zero when startup or work fails.

## Go deeper

- **The event loop** (`05-backend-data/02-nodejs/01-the-event-loop`) — the model these modules and platform APIs are used within.
- **Node.JS** (`05-backend-data/02-nodejs`) — the runtime this child is about.
- **Express.js** (`05-backend-data/08-expressjs`) — the framework layer most projects put on top of the built-in HTTP server.
