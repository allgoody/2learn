---
title: Generics
prereqs: ["frontend/typescript/02-narrowing-and-unions"]
---

## What it is

A generic is a type parameter: a placeholder for a type the caller supplies. Where a union lists the possibilities in advance, a generic keeps a relationship open — the type that goes in is related to the type that comes out. `Array<T>` is the everyday example; `function first(items: T[]): T | undefined` is the one you write yourself.

## Why it matters

Without generics, a reusable function has to widen its types until its signature stops saying anything useful: `any` in, `any` out, and every caller casts the result. With them the compiler carries the relationship through and can infer the specific type at each call site. That is what makes a typed collection, a typed event emitter or a typed query builder possible at all, and it is why the standard library's utility types — `Partial`, `Pick`, `Record` — are written the way they are.

## Core ideas

### A generic describes a relationship, not a category

The type parameter should appear at least twice: once in the input and once in the output. If it appears only once, the compiler cannot infer anything useful from it and the caller has to write it out every time, which is usually a sign the function does not need to be generic.

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const name = first(["a", "b"]);   // string | undefined, inferred
```

### Constrain what you need and nothing more

`extends` limits the type parameter to values that have what the function actually uses. A constraint that demands more than the body needs makes the function harder to call for no benefit.

```ts
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

pluck(users, "id");       // string[] by inference
pluck(users, "missing");  // compile error — not a key of User
```

This is where generics pay for themselves: a typo in a property name becomes a compile error rather than a list of `undefined`.

### Let inference work; add explicit parameters only at the edges

TypeScript infers type arguments from the arguments you pass. Writing them out is occasionally necessary — when a callback's parameter type would otherwise be implicit, for instance — but most explicit type arguments in an application codebase are a sign that the signature is too clever.

### Generic utility types compose

The standard library's mapped types build new shapes from existing ones: `Partial<T>` makes everything optional, `Pick<T, K>` selects, `Omit<T, K>` removes, `Record<K, V>` maps keys to values. They read as the sentence they describe and avoid duplicating a shape by hand.

```ts
type UserPreview = Pick<User, "id" | "name">;
type EditableUser = Omit<User, "createdAt">;
```

### Over-generic code is a real failure mode

A function with four type parameters and several conditional types is unreadable and produces error messages that no one can act on. When a signature needs a comment to explain its types, replace it with a concrete type for the two or three shapes the codebase actually uses.

## Practice

### Write a typed lookup helper

Write a function that takes an array of records and a key, and returns the distinct values of that key, preserving the value type.

Done when: calling it with a valid key infers the right element type, and calling it with a key that does not exist on the record is a compile error.

### Replace an `any`-typed helper with a generic one

Find a utility returning `any` that maps or filters a collection. Give it a type parameter and a constraint, then check that callers no longer need casts.

Done when: every existing call site compiles without a cast and at least one call site gained a real type.

## Common mistakes

- **Using a type parameter only once** — nothing can be inferred and the caller must annotate for no gain; fix: use the concrete type, or find the second position where the relationship belongs.
- **Constraining to a concrete type** — `T extends string` where the body never uses string operations narrows the function for no reason; fix: constrain only to what the body needs.
- **Naming type parameters with single letters in long signatures** — `T`, `U` and `V` become indistinguishable; fix: use a meaningful name such as `TItem` or `TResult` once there is more than one.
- **Reaching for conditional types before a union will do** — the signature becomes unreadable and error messages become unusable; fix: solve it with a union or an overload first.
- **Duplicating a shape instead of deriving it** — the copy falls out of step with the original; fix: derive with `Pick`, `Omit` or `Partial`.

## Go deeper

- **Narrowing and unions** (`frontend/typescript/02-narrowing-and-unions`) — `keyof` and constrained type parameters narrow in the same way a discriminant does.
- **Configuration and migration** (`frontend/typescript/04-configuration-and-migration`) — the compiler options that decide how strictly these relationships are checked.
- **Clean Code** (`cs-fundamentals/clean-code`) — the same judgement about when an abstraction earns its cost.
