---
title: The type system
prereqs: ["frontend/javascript"]
---

## What it is

TypeScript's type system lets you describe the shape of a value — which properties it has, what they contain, and what a function accepts and returns. The compiler compares those descriptions and reports where they disagree. The system is structural: two types are compatible if they have the same members, regardless of what they are named.

## Why it matters

The value of a type system is proportional to how much it can infer without being told. A codebase full of hand-written annotations is a second, hand-maintained copy of the program, and it drifts. A codebase where most types are inferred is a set of small declarations at the boundaries — function parameters, exported shapes — with everything inside checked from those. Knowing where the boundaries are is the whole skill, and it is the difference between TypeScript as a helpful tool and TypeScript as extra work with no benefit.

## Core ideas

### Types are structural, not nominal

An object is compatible with a type if it has the required members with compatible types. There is no need to declare that a class implements an interface for a value of that class to satisfy it. Two separately declared types with identical shapes are interchangeable.

```ts
type Point = { x: number; y: number };

const origin = { x: 0, y: 0, label: "O" };
const p: Point = origin;   // fine — extra properties are allowed here
```

Excess property checking is the exception: assigning an object literal directly to a typed variable does flag unknown properties, precisely because that is where a typo usually happens.

### Let inference do the work

Annotate parameters when they cannot be inferred, and return types on exported functions so callers get a stable contract. Inside a function, let the compiler work out what a local variable is; a wrong annotation there is a bug rather than documentation.

```ts
function totalCents(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}
```

### Prefer `type` for unions and `interface` for extension

Both describe object shapes. `interface` can be reopened and merged, which is useful for library augmentation and dangerous otherwise. `type` composes unions and intersections and cannot be merged, which makes it the safer default for application code.

### Model absence explicitly

`strict: true` makes `null` and `undefined` ordinary types rather than something that lurks behind every value. That single flag turns "cannot read property of undefined" from a runtime crash into a compile error, and it is the option most worth turning on first.

```ts
type User = { id: string; name: string; deletedAt: string | null };
```

### `any` disables the checker for a value

`any` is contagious through everything it touches. `unknown` is the safe counterpart: it accepts anything but requires a check before use. Where a boundary genuinely cannot be typed — a third-party script, a JSON payload — prefer `unknown` plus a narrowing function at the edge.

## Practice

### Type a boundary, infer the middle

Take a small JavaScript module that fetches data and renders it. Annotate only the fetch function's return type and the render function's parameter, then run the compiler with `strict` on and fix what it reports without adding annotations elsewhere.

Done when: the module compiles with `strict`, no local variable carries an explicit annotation, and the compiler catches a deliberate typo you introduce in the renderer.

### Replace three `any`s with a real type

Find three uses of `any` in a codebase, write down the shape each value actually has, and replace them with a type or `unknown`.

Done when: none of the three compiles without a check that proves the shape, and at least one latent bug is surfaced.

## Common mistakes

- **Annotating everything** — the annotations become a second program that falls out of step; fix: annotate parameters and exported returns, and let locals infer.
- **Leaving `strict` off** — `null` slips past every check and the runtime errors remain; fix: enable `strict` and fix the errors it reveals, one file at a time.
- **Using `any` to silence an error** — the checker stops helping for that value and everything derived from it; fix: use `unknown` and narrow, or model the real shape.
- **Reaching for `as` to force a match** — the cast overrides the compiler without changing the runtime value; fix: make the value actually match, or validate it at the boundary.
- **Typing a function by its implementation** — callers then depend on internal details and every refactor breaks them; fix: describe what the function promises, not how it currently does it.

## Go deeper

- **Javascript** (`frontend/javascript`) — the semantics of the values you are describing; types do not change how `this` or coercion behave.
- **Narrowing and unions** (`frontend/typescript/02-narrowing-and-unions`) — where the type system starts preventing states rather than just describing them.
- **Clean Code** (`cs-fundamentals/clean-code`) — a clear signature is the same goal reached without a compiler.
