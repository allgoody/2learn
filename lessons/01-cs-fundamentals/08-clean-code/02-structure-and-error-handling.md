---
title: Structure and error handling
prereqs: ["01-cs-fundamentals/08-clean-code/01-names-and-small-functions"]
---

## What it is

Structure is the order a reader meets things in: what comes first, where the detail lives, how a file is arranged. Error handling is structure applied to the unhappy path — deciding where a failure is detected, where it is turned into a decision, and where it stops being the caller's problem. Clean code is largely the habit of keeping the ordinary path visible and the failure path explicit.

## Why it matters

Most production bugs are not in the algorithm; they are in the gap between how the code reads and what the machine does at the edges. A swallowed exception turns a clear failure into a mystery two systems away. A function that catches an error to keep running and returns a plausible-looking default is how a bad number reaches a customer. Ordering matters too: code that interleaves validation, transformation and saving is where a half-applied change comes from. Getting the structure right is what makes the failure path something you can reason about rather than hope about.

## Core ideas

### Keep one level of abstraction per function

Do not mix a network call, a string trim and a database write in the same block. Each line of a coordinating function should be a call at roughly the same level, with the detail pushed into named helpers. The reader can then trust the summary and descend only where they need to.

```ts
async function publishDraft(draft) {
  const validated = validateDraft(draft);
  const record = toRecord(validated);
  await repository.save(record);
  return record.id;
}
```

### Fail where the information is

Handle an error at the level that knows what to do about it. A low-level function should report precisely what went wrong; a middle layer should add the context that only it has; the layer that owns the operation decides whether to retry, substitute or abandon. Catching an error early and returning a vague value destroys the information everyone above needs.

```ts
try {
  await paymentGateway.charge(order);
} catch (cause) {
  throw new PaymentFailed(`order ${order.id}`, { cause });
}
```

### Let the happy path flow downward

Guard clauses beat nested conditionals. Check the invalid cases first and return early, so the body that follows is the ordinary case at one indentation level. Deep nesting is where readers lose track of which combination of conditions they are in and start making the wrong edit.

```ts
function discountFor(customer) {
  if (!customer) return 0;
  if (!customer.active) return 0;
  return customer.years * 0.01;
}
```

### Do not swallow, and do not over-catch

An empty catch block is a promise that the program continues correctly when it does not know why it failed. Catching a broad category of errors and treating them all the same is the same problem in a larger costume. Catch what you understand, and let everything else travel upward with its original cause attached.

```ts
try {
  return JSON.parse(raw);
} catch {
  return null;   // acceptable only because a null result is a real, handled outcome
}
```

### Errors are values you can design

A thrown exception, a returned result type or an explicit error field are all choices with consequences. A thrown error is invisible in the signature and easy to forget. A returned result forces the caller to deal with it and makes the failure part of the function's documented output. Pick deliberately, keep it consistent within a module, and never let two conventions leak into the same call chain.

## Practice

### Reorder one function for the reader

Take a long function that validates, computes and saves. Reorder it so the invalid cases are guarded at the top, the computation sits in the middle behind a clear name, and the save is the last statement.

Done when: the ordinary path reads top to bottom with no nesting deeper than one level, and the behaviour is unchanged.

### Make a swallowed failure visible

Find a catch block in your code that returns a default value. Add the original cause to what is thrown or logged, and give the failure a name that says what operation failed.

Done when: a forced failure of that call produces a message identifying the operation and the underlying cause.

## Common mistakes

- **Catching an error only to log and continue** — the program proceeds in an unknown state and the damage surfaces later; fix: decide explicitly whether the caller can continue, and rethrow with context if not.
- **Returning a default on failure** — a plausible zero or empty list hides a broken operation; fix: return a result that the caller must interpret, or fail loudly.
- **Mixing validation, work and persistence in one block** — a failure halfway leaves a partial effect; fix: separate the phases so the order is visible.
- **Nesting conditions instead of guarding** — the reader has to hold every combination at once; fix: return early for the invalid cases.
- **Using exceptions for ordinary flow** — a missing optional value becomes an expensive and noisy event; fix: return a value for expected outcomes and reserve exceptions for the exceptional.

## Go deeper

- **Names and small functions** (`01-cs-fundamentals/08-clean-code/01-names-and-small-functions`) — the size and naming habits that make this ordering possible, so read it first.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — what a failure that reports itself precisely saves you when something goes wrong.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — reviewing a diff specifically for swallowed failures and unclear ordering.
