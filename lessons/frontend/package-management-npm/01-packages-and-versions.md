---
title: Packages and versions
prereqs: []
---

## What it is

A package is a published directory of code with a name and a version. A version range is the rule that says which versions of that package your project is willing to accept. Semantic versioning gives those numbers a meaning — major for breaking changes, minor for additions, patch for fixes — and a lockfile records the exact versions that were actually installed so the next install produces the same tree.

## Why it matters

Two things determine whether a build is reproducible: the ranges in the manifest and the lockfile beside it. Without a committed lockfile, an install months later can pull a newer minor version with a regression, and the failure appears in a build that changed nothing. With one, the dependency tree is pinned, and upgrading becomes a deliberate act with a diff to review. This is also the layer where a supply-chain problem enters a project, and you cannot reason about that if you do not know what ranges you declared.

## Core ideas

### Semver is a promise, not a guarantee

`1.4.2` means major 1, minor 4, patch 2. A major bump may break you; a minor bump should only add; a patch should only fix. The promise depends on the author, so a range that trusts minor versions trusts every maintainer in the tree.

```json
{
  "dependencies": {
    "left-pad": "1.3.0",
    "date-fns": "^3.6.0",
    "lodash": "~4.17.21"
  }
}
```

`^3.6.0` accepts any 3.x at or above 3.6.0; `~4.17.21` accepts 4.17.x; a bare version pins exactly.

### The lockfile is the reproducibility guarantee

A lockfile records every package in the tree, including the transitive ones you never named, with its resolved version and integrity hash. Commit it. `npm ci` installs from it exactly and fails if the manifest and lockfile disagree, which is the correct behaviour in continuous integration.

### `dependencies` and `devDependencies` are different promises

`dependencies` are needed to run the application; `devDependencies` are needed to build or test it. A bundler compiles your source, so most build-time tools belong in `devDependencies`, and a runtime library that gets bundled is arguably a dependency of the build. Getting the split wrong mainly affects what a package consumer installs and what a production install pulls in.

### Transitive dependencies dominate the tree

Most of what you install is required by something else. `npm ls <name>` and `npm explain <name>` show which parent pulled a package in and why, which is the first thing to check when two versions of the same library appear and one of them is old.

### Peer dependencies express a host requirement

A plugin declares its host as a peer dependency: it expects the application to provide a compatible version of the library. A peer warning usually means two copies of a library are present, and two copies of a state library is a real bug rather than a cosmetic one.

### Audit and update on a schedule

Security advisories arrive continuously; reading them during an incident is too late. A monthly pass that upgrades patch and minor versions keeps the eventual major upgrade small, and a committed lockfile makes each step reviewable.

## Practice

### Prove the lockfile does what it claims

Delete the installed modules but keep the lockfile, reinstall, and record the resolved version of one transitive dependency. Then change the lockfile's version for that package by hand and run the install again.

Done when: the second install respects the lockfile rather than the range in the manifest, and you can state which command ignores it.

### Trace one transitive dependency

Pick a package you did not install directly and find out which parent requires it, and at what version.

Done when: you can name the parent, the range it declared, and whether a second copy of the same package exists in the tree.

## Common mistakes

- **Not committing the lockfile** — builds stop being reproducible and a regression appears with no code change; fix: commit it and install with `npm ci` in continuous integration.
- **Using `latest` as a version range** — every install may be a different program; fix: declare a range and record the resolution in the lockfile.
- **Deleting the lockfile to fix a conflict** — the conflict disappears along with the reproducibility; fix: use `npm ls` to find the duplicate and resolve it deliberately.
- **Putting build tools in `dependencies`** — consumers install the whole toolchain for no benefit; fix: move build and test tooling to `devDependencies`.
- **Upgrading only when forced** — a two-year jump combines every breaking change into one unreviewable branch; fix: upgrade on a schedule in small steps.

## Go deeper

- **Scripts and workspaces** (`frontend/package-management-npm/02-scripts-and-workspaces`) — making the manifest the entry point to the project.
- **Dependency Scanning (SCA)** (`security/dependency-scanning-sca`) — automating the check for known vulnerabilities in this tree.
- **Package Management (npm)** (`frontend/package-management-npm`) — the track overview, if you arrived here first.
