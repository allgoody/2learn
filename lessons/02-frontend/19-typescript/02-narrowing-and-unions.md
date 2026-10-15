---
title: Narrowing and unions
prereqs: ["02-frontend/19-typescript/01-the-type-system"]
---

## What it is

A union type says a value is one of several possibilities — `string | number`, or `{ status: "loading" } | { status: "ready"; data: Item[] }`. Narrowing is how the compiler learns which member is present: an `if` on a discriminant, a `typeof` check, a `switch`, or a custom type guard. Together they let you write states that are impossible to get wrong instead of states that are merely documented.

## Why it matters

Most defensive code exists because two facts that must agree are stored separately: a `loading` boolean and a `data` field and an `error` string, all of which can contradict each other. A union makes the contradiction unrepresentable — while loading there is no data field to read by mistake. That is the difference between a type checker that documents your bugs and one that prevents them, and it usually removes more code than it adds.

## Core ideas

### Discriminate on a literal property

Give each variant a literal field with a different value and the compiler can split the union with a plain comparison. This is the pattern that covers the request lifecycle, form submission, and every message your application passes around.

```ts
type LoadState =
  | { status: "loading" }
  | { status: "ready"; items: Item[] }
  | { status: "error"; message: string };

function render(state: LoadState) {
  switch (state.status) {
    case "loading": return "Loading…";
    case "ready": return listItems(state.items);
    case "error": return showError(state.message);
  }
}
```

Inside each branch the other variants are unreachable, so `state.items` is only available where it exists.

### Narrow with the checks the language already gives you

`typeof`, `instanceof`, `in`, `Array.isArray` and truthiness all narrow. `typeof x === "object"` is not enough on its own, because `null` is an object; check for it explicitly.

```ts
function length(value: string | string[] | null): number {
  if (value === null) return 0;
  return typeof value === "string" ? value.length : value.length;
}
```

### Make exhaustiveness a compile-time check

End a `switch` over a union with a default that assigns the value to `never`. If a new variant is added later, that assignment stops compiling, and the compiler tells you every place that needs updating rather than letting one fall through silently.

```ts
default: {
  const unhandled: never = state;
  throw new Error(`unhandled state: ${JSON.stringify(unhandled)}`);
}
```

### Write a type guard when the check is reusable

A function returning `value is T` teaches the compiler a check it cannot infer, keeping the knowledge in one place. Validate rather than assume: a guard that lies to the compiler moves the failure from compile time to a crash.

### Prefer a small union to a wide object

A type with a dozen optional fields says nothing about which combinations are legal. Several small variants state it exactly and make every consumer handle each case.

## Practice

### Replace three flags with one union

Find a component or function tracking `loading`, `error` and `data` as separate variables. Replace them with a discriminated union and a `switch` that ends in a `never` check.

Done when: the code no longer asks whether data exists before reading it, and adding a fourth variant makes the compiler fail until you handle it.

### Write one reusable type guard

Take a runtime check you repeat — an API response that may be an error payload, a config value that may be a string — and turn it into a guard function.

Done when: the guard is used in at least two places, and deliberately passing a wrong shape to the guarded value is rejected by the compiler.

## Common mistakes

- **Testing an optional field with `if (x.data)`** — a falsy legitimate value such as `0` or `""` is treated as absent; fix: narrow on the discriminant, not on the payload.
- **Forgetting `null` when narrowing `typeof`** — `typeof null === "object"` and the check passes for a null value; fix: compare against `null` before testing the type.
- **Casting with `as` instead of narrowing** — the compiler is silenced and the runtime value is unchanged; fix: use a discriminant or a validated type guard.
- **Leaving the `switch` without an exhaustiveness check** — a new variant is silently ignored; fix: assign to `never` in the default branch.
- **Making a guard that returns `true` too eagerly** — the type is asserted but the shape is wrong and the crash moves downstream; fix: check every property the guard claims.

## Go deeper

- **The type system** (`02-frontend/19-typescript/01-the-type-system`) — structural typing and inference are the mechanics narrowing relies on.
- **Generics** (`02-frontend/19-typescript/03-generics`) — the next step: keeping types connected across a function's input and output.
- **Design Patterns** (`01-cs-fundamentals/18-design-patterns`) — discriminated unions are the typed form of several classic patterns.
