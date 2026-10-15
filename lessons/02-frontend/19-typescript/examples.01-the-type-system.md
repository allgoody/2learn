## Example 1 — A typo that only the runtime would find

The cart total is typed `any` at the boundary, so a misspelled property sums to `NaN` and ships. Say what `any` does to every value derived from it, then describe the shape the function actually needs.

```ts
function totalCents(items: any) {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

totalCents([{ priceInCents: 300, quantity: 2 }]);   // NaN, no error anywhere
```

### Solution

```ts
type CartItem = { priceCents: number; quantity: number };

function totalCents(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}
```

```text
totalCents([{ priceInCents: 300, quantity: 2 }]);
             ~~~~~~~~~~~~
error TS2353: Object literal may only specify known properties,
and 'priceInCents' does not exist in type 'CartItem'.
```

`any` does not just remove a check on that value — it is contagious through everything derived from it, so the array and the accumulator stop being checked too. Annotating the boundary is where the type system earns its cost: the parameter and the exported return type are the contract callers depend on, and everything inside is inferred from those. Excess property checking exists precisely for this case, because an object literal written directly against a typed parameter is where a misspelled member usually appears. Where a shape genuinely cannot be known — a parsed payload, a third-party callback — `unknown` is the safer counterpart, since it accepts anything but requires a check before use.

## Example 2 — A null that reaches the renderer

A user record marks deletion with a nullable timestamp, and the label function reads it without checking. Say what `strict` changes here, then handle the absence.

```ts
type User = { id: string; name: string; deletedAt: string | null };

function label(user: User) {
  return user.name.toUpperCase() + " " + user.deletedAt.slice(0, 10);
}
```

### Solution

```ts
function label(user: User): string {
  if (user.deletedAt === null) return user.name.toUpperCase();
  return user.name.toUpperCase() + " " + user.deletedAt.slice(0, 10);
}
```

```text
user.deletedAt.slice(0, 10)
     ~~~~~~~~~~
error TS18047: 'user.deletedAt' is possibly 'null'.
```

With `strict` on, `null` is an ordinary type rather than something that lurks behind every value, so the annotation `string | null` is a statement the compiler enforces instead of a comment. That turns "cannot read properties of null" from a production crash into an error on the line that caused it, and it costs one early return. Modelling absence explicitly is the single highest-value part of the strict family, which is why it is the option worth turning on first — the annotation and the check are the same decision, written once.
