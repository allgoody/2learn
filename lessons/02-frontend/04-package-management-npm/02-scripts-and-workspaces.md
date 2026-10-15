---
title: Scripts and workspaces
prereqs: ["02-frontend/04-package-management-npm/01-packages-and-versions"]
---

## What it is

The `scripts` field in `package.json` names the commands a project runs — start, build, test, lint — so nobody has to remember the flags. Workspaces let one repository hold several packages with their own manifests, installing their dependencies together and resolving references between them through the same tool.

## Why it matters

Scripts turn a project's build into a vocabulary. A new contributor can read the manifest's script list and know what to type; continuous integration calls the same names as a developer does; and changing a flag changes it in one place rather than in a wiki page and four CI files that have drifted apart. Workspaces solve the coordination problem that appears the moment a repository has a shared component library and two applications: without them, the shared package has to be published or linked by hand, and every change becomes a two-repository dance.

## Core ideas

### Scripts are the project's interface

Every command a contributor needs should be a script, and nothing else should be. If the build needs three flags and an environment variable, that belongs inside the script definition rather than in a document that will rot.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "lint": "eslint .",
    "check": "npm run lint && npm run test && npm run build"
  }
}
```

A single `check` script that runs the same gates as continuous integration means the failure is reproducible locally.

### Chain gates rather than remembering them

Ordering matters: type-check and lint before a slow build, tests before deployment. A `check` script encodes that order once and can be run by a person, a pre-push hook and the pipeline alike.

### Prefer `npm ci` in automation and `npm install` locally

`npm ci` removes the existing modules, installs strictly from the lockfile and fails if the two files disagree. That failure is the point: it catches a manifest that was edited without a corresponding install.

### Workspaces make a monorepo workable

Declaring `workspaces` in the root manifest makes the tool install all packages together, hoist what can be hoisted, and let one package depend on another by name without publishing.

```json
{
  "name": "root",
  "private": true,
  "workspaces": ["packages/*", "apps/*"]
}
```

The root manifest should stay `private` so it is never published by accident.

### Hoisting is convenient and occasionally surprising

A single top-level install directory means a package can import something it never declared, because it happens to be hoisted beside it. It works locally and breaks when installed alone, which is why a shared package should declare every dependency it uses even when the root already has it.

### Scripts can run in a specific workspace

Running a script across workspaces — in one named package, or across all of them — avoids changing directory and keeps the commands in the manifest where they can be read.

## Practice

### Replace a documented command with a script

Find the longest command in your project's contributor documentation and move it into a script. Update the document to name the script.

Done when: the documented command is a single script name, and it produces the same result.

### Split a duplicated dependency into a workspace

Take a repository where two applications copy the same component library, and restructure it as a workspace with the library as a package that both depend on by name.

Done when: a change to the library is visible in both applications without rebuilding it separately, and neither application repeats the library's source.

## Common mistakes

- **Leaving long commands in documentation only** — they drift and nobody notices until a new person follows them; fix: put them in scripts and link to the script name.
- **Running `npm install` in a pipeline** — the lockfile is reinterpreted rather than enforced and the build may differ from every other machine; fix: use `npm ci`.
- **Publishing the root workspace manifest** — the private package becomes a public one; fix: set `private: true` at the root.
- **Relying on hoisted dependencies in a shared package** — it works in the repository and fails when installed on its own; fix: declare every dependency the package imports.
- **Hiding a required environment variable inside a script** — the build cannot be reproduced elsewhere; fix: document it, or provide a safe default.

## Go deeper

- **Packages and versions** (`02-frontend/04-package-management-npm/01-packages-and-versions`) — the resolution and lockfile behaviour these scripts rely on.
- **CI/CD** (`06-cloud-devops/08-ci-cd`) — where these script names become the pipeline's steps.
- **Vite** (`02-frontend/09-vite`) — the tool most of these `dev` and `build` scripts call.
