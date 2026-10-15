---
title: Configuration and migration
prereqs: ["02-frontend/19-typescript/03-generics"]
---

## What it is

TypeScript's behaviour is controlled by a `tsconfig.json` file: which files are checked, which language features are allowed, how strictly types are enforced, and what JavaScript is emitted. Migration is the process of adding that file to an existing JavaScript project without stopping feature work.

## Why it matters

The compiler options decide whether the type system is an asset or a formality. A project with `strict` off gets syntax highlighting and little else; the same project with it on finds real defects in code that has been running for years. Migration is the harder part in practice, because a large untyped codebase cannot be converted in one commit: checks must be introduced incrementally, in an order that keeps the build green and the team unblocked. Teams that do not plan for that either leave `strict` off forever or spend a week with a broken build.

## Core ideas

### Start strict on new code

The options that matter most are `strict`, `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. Turning them on for a whole legacy project at once is often infeasible; turning them on for the files that are already typed costs nothing and stops new debt accumulating.

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true
  },
  "include": ["src/**/*.ts"]
}
```

`noEmit` is usually correct for a front-end project: the bundler compiles the code, and TypeScript's job is only to check it.

### `skipLibCheck` is a pragmatic default

It skips type checking of dependency declaration files, which are often written for a different compiler version. It hides real problems occasionally; it removes many false ones in practice.

### Allow and deny JavaScript explicitly

`allowJs` lets the compiler process JavaScript files, and `checkJs` makes it type-check them. Enabling `allowJs` alone lets imports from untyped files resolve without checking their contents — a useful intermediate step during migration.

### Migrate by widening at the boundary

The practical route is a growing `include` list: add TypeScript files, keep them strict, and let them import JavaScript. Give the shared boundaries — API clients, data models — explicit types first, because those types propagate outward and make the rest cheaper to convert.

### Type-check in CI, not only in the editor

An error that only appears on the machine of whoever ran the compiler last is not enforcement. A `tsc --noEmit` step in the pipeline is what keeps the annotations true.

## Practice

### Turn on one strict option and fix the fallout

Pick an existing project and enable a single strict option, then fix every error it produces without adding `any`.

Done when: the compiler reports zero errors, the diff contains no new `any`, and you can name one real defect the option revealed.

### Convert one module and lock the boundary

Convert one module of a JavaScript file to TypeScript, type its public exports, and add a `tsc --noEmit` step to the build.

Done when: the module imports cleanly from the remaining JavaScript, its exported types are used without casts at the call site, and the build fails if someone breaks them.

## Common mistakes

- **Leaving `strict` off indefinitely** — the type annotations describe intent but nothing is enforced; fix: enable it for new directories now and migrate the old ones behind it.
- **Migrating the whole repository in one branch** — the branch lives for weeks, conflicts pile up and the work is abandoned; fix: convert file by file, keeping the build green throughout.
- **Using `any` to make the first migration compile** — the code looks typed but no check reaches it; fix: use `unknown` at genuine boundaries and narrow at the point of use.
- **Checking types only in the editor** — an untyped file reaches `main` and the next person's build breaks; fix: run `tsc --noEmit` in CI.
- **Setting `target` lower than your browsers need** — the output stays verbose and old syntax is preserved unnecessarily; fix: set `target` from your actual support matrix.

## Go deeper

- **Generics** (`02-frontend/19-typescript/03-generics`) — utility types and inference are the tools you reach for while fixing strict-mode errors.
- **Package Management (npm)** (`02-frontend/04-package-management-npm`) — where the compiler and its type packages come from, and how versions are pinned.
- **CI/CD** (`06-cloud-devops/08-ci-cd`) — the place a `tsc --noEmit` check belongs.
