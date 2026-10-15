---
title: Builds and dependencies
prereqs: ["05-backend-data/04-java/02-objects-and-type-design"]
---

## What it is

A Java project is built by a tool that compiles sources, resolves dependencies, runs tests and packages the result. The dependency resolver downloads libraries from a repository, resolves their own dependencies transitively, and puts the whole set on the classpath. The build definition is a file in the repository, so the process is reproducible and the dependency set is reviewable.

## Why it matters

The dependency graph is the part of a Java project most likely to cause a surprise, because a library's own dependencies arrive without being asked for and two libraries can require incompatible versions of a third. Without a build tool and a lock or resolution report, that conflict is discovered at runtime with an error naming a class nobody wrote. Declaring and inspecting the graph deliberately turns a whole category of mysterious failure into a reviewable list.

## Core ideas

### A build is a graph of tasks with a dependency order

Compiling depends on resolving dependencies, testing depends on compiling, packaging depends on testing, and the tool works out the order. Declaring tasks rather than a sequence of shell commands is what makes incremental builds possible: only the tasks whose inputs changed are re-run. It also makes a clean build check meaningful, because the same declaration produces the same steps.

```text
resolve -> compile -> test -> package -> publish
```

### Transitive dependencies are the usual source of conflict

A library declares its own requirements, and the resolver picks one version when several are requested. Which one wins depends on the resolution strategy, and the answer affects behaviour rather than only compilation. Inspecting the resolved tree, and excluding or pinning a version deliberately, is the standard way to handle it.

### The classpath, not the compile path, is what runs

A library that is needed only to compile but absent at runtime produces an error when the code that uses it first executes. Keeping the two scopes separate is a real skill: a compile-only dependency is an annotation processor or an API stub, and everything else must be present when the program runs.

### Version pinning makes builds reproducible

Resolving to the latest compatible version means today's build differs from yesterday's without any change to the source. Pinning the direct dependencies, and locking the transitive set where the tool supports it, makes the artifact reproducible and the upgrade a deliberate act rather than an accident.

### Artifacts are published and consumed with coordinates

A library is identified by group, name and version, and published to a repository both local projects and remote ones can read. That identity is what makes the dependency declaration unambiguous and what makes a private repository the place for internal code. A snapshot version is by definition mutable and should not be what production depends on.

### Reproducible builds include the toolchain

The build tool's own version, the language level and the runtime target all affect the artifact. Declaring them in the build definition, ideally with a wrapper so the exact tool version is used, removes another source of "it built differently on the build machine".

## Practice

### Inspect a resolved dependency tree

Run the build tool's dependency report for a small project and identify the path by which a transitive dependency was pulled in.

Done when: you can name the direct dependency and the library that brought in the transitive dependency, and say which version won.

### Pin and reproduce a build

Build the project twice from a clean state with pinned versions and compare the resulting artifacts.

Done when: both builds resolve the same versions and produce an artifact with the same contents.

## Common mistakes

- **Resolving dependencies dynamically** — the build changes without a source change; fix: pin versions and lock the transitive set.
- **Putting a compile-only dependency on the runtime classpath** — it is shipped for no reason, or a runtime-only one is missing and fails later; fix: keep the scopes deliberate.
- **Ignoring the resolved tree** — two libraries fight over a third and the winner is accidental; fix: inspect the tree and pin or exclude explicitly.
- **Depending on a snapshot version in production** — the artifact changes under the same name; fix: depend on released versions.
- **Relying on the developer's installed tool version** — the build differs by machine; fix: use a wrapper that pins the build tool.

## Go deeper

- **Objects and type design** (`05-backend-data/04-java/02-objects-and-type-design`) — the code this build process compiles.
- **Java** (`05-backend-data/04-java`) — the ecosystem this build tooling belongs to.
- **Enterprise backends** (`05-backend-data/04-java/04-enterprise-backends`) — the framework conventions the built artifact usually contains.
