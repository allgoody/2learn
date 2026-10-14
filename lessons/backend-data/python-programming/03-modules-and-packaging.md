---
title: Modules and packaging
prereqs: ["backend-data/python-programming/02-data-and-iteration"]
---

## What it is

A module is a file of definitions; a package is a directory of modules. Importing one runs it and binds its contents to a name. Around this sit the tools that make code shareable: a virtual environment that isolates a project's dependencies, a dependency list that records them, and packaging metadata that describes how the project itself is built and installed.

## Why it matters

Almost every "it works on my machine" incident in Python comes from the environment rather than the code: two projects needing different versions of the same library, a system interpreter that must not be modified, a dependency that was installed for a test and never recorded. Virtual environments and a recorded dependency list remove the ambiguity. The import system matters for a different reason: because importing executes the file, an import with side effects at module level turns a dependency graph into a sequence of actions, which is why startup failures in Python are often an import problem.

## Core ideas

### A virtual environment isolates one project's dependencies

It creates a directory containing an interpreter and its own set of installed packages, so installing or upgrading a library affects only that project. Activating it changes which interpreter runs. Without it, packages accumulate in the system interpreter until some pair of projects is mutually incompatible and neither can be fixed cleanly.

```text
project/.venv/bin/python -m pip install -r requirements.txt
```

### The dependency list must be recorded, ideally with versions

An unrecorded dependency works exactly until someone else builds the project. Recording the direct dependencies and their versions makes the build reproducible; locking the full transitive set makes it precise. Both are better than a comment in a readme listing what the author happened to remember.

### Importing executes the module

A module's top-level statements run the first time it is imported, and only then; subsequent imports reuse the already-loaded module. That caching is why a module-level side effect happens once regardless of how many places import it, and why a circular import can fail in a way that depends on which module is imported first.

### The main guard makes a file both a module and a program

Code under the `if __name__ == "__main__":` guard runs only when the file is executed directly, not when it is imported. Putting the entry point there means the file can be used for its definitions without also starting a program, which is what makes it testable.

### Packages are directories with a clear public surface

Importing from a package brings its submodules into scope, and what the package exposes is its interface to the rest of the project. Keeping that surface small — a handful of names re-exported deliberately — means internal reorganisations do not ripple through every caller.

### Packaging metadata describes the distributable

A project that is installed rather than merely run declares its name, version and dependencies, and may declare an entry point so it can be run as a command. This is what turns a script that only its author can run into something a colleague can install. It is worth doing when the code is shared, and unnecessary ceremony when it is not.

Two modules that import each other are usually one concept split in the wrong place, or a shared piece that belongs in a third module. Deferring the import inside a function makes the cycle stop failing without removing it, so the underlying structure is still worth reconsidering.

## Practice

### Isolate a project's dependencies

Create a virtual environment for a small project, install its dependencies into it, and record them with versions.

Done when: a second environment built from the recorded list runs the project identically.

### Make a script importable

Take a script whose logic runs at import time and move the entry point behind the main guard, exposing the rest as functions.

Done when: importing the file performs no work and its functions can be called from a test.

## Common mistakes

- **Installing into the system interpreter** — projects become mutually incompatible and the operating system's own tools may break; fix: use a virtual environment per project.
- **Recording dependencies from memory** — the build is not reproducible for anyone else; fix: record versions, and lock the transitive set.
- **Putting work at module level** — importing the file performs it, and cycles produce confusing startup failures; fix: keep imports side-effect free and use the main guard.
- **Exposing every submodule** — internal changes ripple through callers; fix: define a small public surface.
- **Deferring an import to hide a cycle** — the structural problem remains; fix: move the shared piece into its own module.

## Go deeper

- **Data and iteration** (`backend-data/python-programming/02-data-and-iteration`) — the code these modules organise.
- **Python Programming** (`backend-data/python-programming`) — the language this packaging ecosystem serves.
- **Scripting and automation** (`backend-data/python-programming/04-scripting-and-automation`) — where the scripts that benefit most from isolation are written.
