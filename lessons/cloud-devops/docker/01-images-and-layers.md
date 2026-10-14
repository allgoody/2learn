---
title: Images and layers
prereqs: ["cloud-devops/docker"]
---

## What it is

An image is built by executing a sequence of instructions, each of which produces a filesystem layer. Layers are content-addressed and shared: two images that both begin with the same base layer store it once. Understanding layers explains almost everything else about Docker — why build order changes build time, why images grow unexpectedly, and why the same image is small on one team's machine and enormous on another's.

## Why it matters

An image is not just a delivery mechanism; it is a cache key and a security surface. Every layer you add is data that must be stored, transferred and scanned, and every package left in the final image is code that can have a vulnerability. Images that grow without limit are slow to push and slow to start, and the difference between a well-built image and a careless one is usually a handful of ordering decisions rather than a different tool.

## Core ideas

### Each instruction produces a layer, and layers are cached

Docker reuses a layer whose inputs have not changed. Because the cache is invalidated by the first changed instruction and everything after it, the order of instructions is a performance decision: copy the dependency manifest and install dependencies, then copy the source. A change to a source file then rebuilds only the last few layers instead of reinstalling everything.

```text
COPY package.json ./      <- rare change, cached
RUN install dependencies  <- rare change, cached
COPY src ./src            <- frequent change, cheap
```

### The container filesystem is a stack of read-only layers, plus one writable

Running an image adds a thin writable layer on top. Writes there are cheap to start and expensive to keep, and they vanish with the container. This is why a database inside a container is not persistent by default, and why the fix is a volume rather than a longer-running container.

### Build context matters more than the instructions

The build sends a directory of files to the engine before anything runs; a large context slows every build and can leak secrets into layers. An ignore file that excludes build output, local dependencies and version-control metadata keeps the context small and the image honest.

### Multi-stage builds keep the runtime image small

A build stage can compile, test and bundle using a full toolchain, and a later stage copies only the finished artifact into a minimal base. The result carries no compilers and no build dependencies, which reduces both size and the number of things that can have a vulnerability.

```text
stage 1: full toolchain -> build and test
stage 2: minimal base   -> copy artifact, set entry point
```

### The final image should hold one process and no secrets

An image containing a full operating system, a package manager and several daemons is harder to reason about and harder to secure. Secrets must never be baked into a layer, because layers are readable by anyone who can pull the image and deleting a file in a later layer does not remove it from the earlier one.

## Practice

### Order a build for cache reuse

Write a container definition for a small service that installs dependencies before copying the source. Change one source file, rebuild, and observe which steps were cached.

Done when: the rebuild finishes without reinstalling dependencies, and you can point at the instruction that would break that.

### Shrink an image with a multi-stage build

Take a build that compiles an application and separate the build toolchain from the final image using two stages.

Done when: the final image contains no compiler and no package manager, and the application still starts.

## Common mistakes

- **Copying everything before installing dependencies** — every source change triggers a full reinstall; fix: copy the manifest, install, then copy the source.
- **Storing data in the container's writable layer** — it disappears with the container; fix: mount a volume or use a managed store.
- **Baking secrets into a layer** — they remain readable in the image history even after deletion; fix: pass secrets at runtime or build with the platform's secret mechanism.
- **Shipping the build toolchain in the runtime image** — the image is large and carries vulnerabilities it never uses; fix: use a multi-stage build.
- **Sending a huge build context** — builds are slow and irrelevant files leak into layers; fix: exclude build output and local dependencies with an ignore file.

## Go deeper

- **Docker** (`cloud-devops/docker`) — the packaging model these layers are the unit of, so read it first.
- **Running containers and persisting data** (`cloud-devops/docker/02-running-containers-and-persisting-data`) — what happens once an image is run and the writable layer is not enough.
