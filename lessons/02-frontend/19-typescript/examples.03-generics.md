## Example 1 — A lookup helper that loses the value's type

A helper reads one property from every record and returns the values, but its signature widens them to `any`, so callers cast the result back. Say what the signature fails to express, then connect the key to the value it produces.

```ts
function pluck(items: any[], key: string): any[] {
  return items.map((item) => item[key]);
}

const ids = pluck(users, "id") as string[];    // cast at every call site
const bad = pluck(users, "idd");               // also compiles; returns [undefined]
```

### Solution

```ts
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

const ids = pluck(users, "id");    // string[] by inference
```

```text
pluck(users, "idd");
             ~~~~~
error TS2345: Argument of type '"idd"' is not assignable to parameter of type 'keyof User'.
```

A generic describes a relationship, and here the type parameter appears twice: once as the element type going in, once as the value type coming out, with the key constrained to the properties that exist. That is what lets the compiler infer `string[]` at the call site, so no cast is needed, and it is why the constraint matters — `keyof T` demands exactly what the body uses and nothing more. Widening the signature to `any` did not make the function reusable; it made every caller responsible for a type the function already knew.

## Example 2 — A preview shape copied by hand

A preview type was written out as its own declaration and has already fallen behind the source type. Say what will keep happening, then derive the shape instead of repeating it.

```ts
type User = { id: string; name: string; email: string; createdAt: string; deletedAt: string | null };

type UserPreview = { id: string; name: string };   // hand-maintained copy
```

### Solution

```ts
type UserPreview = Pick<User, "id" | "name">;
type EditableUser = Omit<User, "createdAt" | "deletedAt">;
type UserPatch = Partial<Pick<User, "name" | "email">>;
```

A hand-written copy of part of a shape is a second program that drifts: the source type gains a field and the copy does not, or a rename lands in one place only. The mapped utility types read as the sentence they describe — pick these members, omit those, make that subset optional — and because they are derived, a change to the source propagates without anyone remembering to make it. This is the cheap half of generics and the one worth reaching for first; the expensive half is a signature with four type parameters and conditional types, which produces error messages nobody can act on. Prefer a concrete type for the shapes the codebase actually uses.
