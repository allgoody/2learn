## Example 1 — Three flags that can contradict each other

A load state is tracked with a boolean and two optional fields, and the renderer reads `items` before checking whether they exist. Say what combinations the type permits, then make the impossible ones unrepresentable.

```ts
type LoadState = { loading: boolean; items?: Item[]; error?: string };

function render(state: LoadState) {
  if (state.loading) return "Loading…";
  if (state.error) return showError(state.error);
  return listItems(state.items);   // Item[] | undefined
}
```

### Solution

```ts
type LoadState =
  | { status: "loading" }
  | { status: "ready"; items: Item[] }
  | { status: "error"; message: string };

function render(state: LoadState): string {
  switch (state.status) {
    case "loading": return "Loading…";
    case "ready": return listItems(state.items);
    case "error": return showError(state.message);
    default: {
      const unhandled: never = state;
      throw new Error(`unhandled state: ${JSON.stringify(unhandled)}`);
    }
  }
}
```

```text
// after adding a fourth variant: | { status: "empty" }
const unhandled: never = state;
      ~~~~~~~~~
error TS2322: Type '{ status: "empty"; }' is not assignable to type 'never'.
```

Three separate facts can contradict each other: loading while holding items, an error with no message. A discriminated union stores one fact, so the impossible combinations cannot be written, and inside a branch the compiler knows which fields exist — `state.items` is available only where it is real. The `never` assignment is what makes exhaustiveness a compile-time check rather than a convention: add a variant and every switch that should handle it fails to build, so nothing falls through silently.

## Example 2 — A null that passes an object check

A helper accepts text, a list of text, or nothing, and narrows with `typeof`. The null case slips through the same branch as the list. Explain which check is missing, then correct it and factor the runtime check out.

```ts
function length(value: string | string[] | null): number {
  if (typeof value === "object") return value.length;   // null is an object
  return value.length;
}
```

### Solution

```ts
function length(value: string | string[] | null): number {
  if (value === null) return 0;
  return value.length;
}

type ApiResponse = { data: Item[] } | { error: string };

function isError(response: ApiResponse): response is { error: string } {
  return "error" in response;
}
```

`typeof null` is `"object"`, so the object branch is entered for a null value and the narrowing is wrong about what it has proved — the check must compare against null explicitly before testing the type. A runtime check you repeat belongs in one function that returns a type predicate, so the knowledge exists once and every caller gets the narrowing. A guard that returns `true` too eagerly is the one mistake to avoid here.
