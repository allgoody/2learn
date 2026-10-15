---
title: The language and the JVM
prereqs: ["05-backend-data/04-java"]
---

## What it is

Java source is compiled to bytecode, an instruction set for a virtual machine rather than for a physical processor. At runtime the virtual machine loads classes, verifies them, executes the bytecode, manages memory and compiles frequently executed paths into native code. This two-stage arrangement is why the same compiled artifact runs on any platform with a compatible runtime, and why a program's performance changes as it warms up.

## Why it matters

Understanding the split explains most of Java's characteristics and its operational behaviour. Types are checked when source is compiled, so most errors are caught before anything runs. Memory is reclaimed automatically, which removes a class of bugs and introduces pauses that must be measured rather than ignored. Startup is slower than a native binary and steady-state throughput is often better, which is why a long-lived server is a good fit and a command-line tool launched a thousand times is not.

## Core ideas

### Compilation checks types, the runtime executes bytecode

The compiler verifies that every method call and assignment is consistent with the declared types, producing bytecode only when it is. That is what makes refactoring across a large codebase tractable: a renamed or removed method becomes a compile error in every caller rather than a runtime failure in one.

```text
source .java -> compiler -> bytecode .class -> virtual machine -> native code
```

### Objects live on the heap and are reclaimed automatically

Every object is allocated on a managed heap; references to it are tracked, and memory no longer reachable is reclaimed. Programs never free memory explicitly, so dangling references are impossible and lifetimes are handled by the collector. The trade is that collection takes processor time and may pause execution, which is why collector choice and heap sizing are operational decisions rather than defaults.

### The just-in-time compiler optimises what actually runs

Code starts interpreted and hot paths are compiled to native code with optimisations based on observed behaviour, such as inlining a method that is almost always the same implementation. That is why benchmarks must run long enough to reach steady state and why a micro-benchmark that runs for a second measures the interpreter rather than the program.

### Class loading is lazy and can fail at runtime

Classes are loaded when first needed, and a missing dependency or an incompatible version fails at that moment rather than at startup. This is why dependency conflicts in Java often surface as an error deep inside a request rather than as a refusal to start, and why the dependency tree must be inspected rather than guessed.

### Garbage collection is a tuning choice with visible consequences

Different collectors optimise for throughput or for short pauses, and choosing one is a statement about the workload: a batch job tolerates long pauses, a trading system does not. Heap size interacts with all of it, so the useful approach is to measure pause times and throughput under real load rather than to accept the default.

### Startup and memory are the price of the platform

A runtime that must load and verify classes and warm up its compiler starts more slowly than a native binary, and its baseline memory is larger. For a service running for weeks this is irrelevant; for a function invoked per request it can dominate. Containers made the difference visible, which is why native compilation of JVM languages has become attractive.

## Practice

### Watch a program warm up

Write a small benchmark that performs the same computation many times and record the time of each batch.

Done when: you can point at the batches where the time stopped improving and explain what the runtime was doing differently.

### Find a hidden runtime dependency failure

Take a project and remove a library from its runtime classpath while leaving it on the compile classpath, then trigger the code that uses it.

Done when: you can quote the error that names the missing class and say why it appeared at that moment rather than at startup.

## Common mistakes

- **Benchmarking before the runtime has warmed up** — the measurement reflects interpretation, not the program; fix: run long enough to reach steady state and discard the warm-up.
- **Ignoring garbage collection pauses** — latency spikes appear with no code change; fix: measure pause times under real load and choose a collector deliberately.
- **Assuming a compile-time dependency is a runtime dependency** — the failure arrives inside a request; fix: inspect and pin the full dependency tree.
- **Setting heap size arbitrarily** — the collector works against the wrong budget; fix: size the heap from measured live-set size and observe the pauses.
- **Using a JVM service for a short-lived command** — startup dominates the work; fix: reserve the runtime for long-lived processes or compile natively.

## Go deeper

- **Java** (`05-backend-data/04-java`) — the language and platform this child describes, so read it first.
- **Objects and type design** (`05-backend-data/04-java/02-objects-and-type-design`) — what the compiler's type checking is applied to.
- **Builds and dependencies** (`05-backend-data/04-java/03-builds-and-dependencies`) — how the classpath and the artifacts on it are assembled.
