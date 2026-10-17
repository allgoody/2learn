---
title: Structure and error handling
prereqs: ["01-cs-fundamentals/08-clean-code/01-names-and-small-functions"]
---

## What it is

Structure is the order a reader meets things in: what comes first, where the detail lives, how a file is arranged. Error handling is structure applied to the unhappy path — deciding where a failure is detected, where it is turned into a decision, and where it stops being the caller's problem. Clean code is largely the habit of keeping the ordinary path visible and the failure path explicit.

## Why it matters

Most production bugs are not in the algorithm; they are in the gap between how the code reads and what the machine does at the edges. A function that catches an error to keep running and returns a plausible-looking default is how a bad number reaches a customer: a charge that fails with a provider error becomes a total of 0.00, and 0.00 is a valid total, so nothing downstream has any reason to stop. Ordering matters for the same reason: code that interleaves validation, transformation and saving leaves a partial effect behind when the third step fails after the first two have run. Getting the structure right is what makes the failure path something you can reason about rather than hope about, because each failure is handled once, at the layer that holds the information to handle it.

## Core ideas

### Keep one level of abstraction per function

A coordinating function reads at a single altitude: every line is a call at roughly the same level, and the low-level detail — trimming a field, building a query, awaiting a client — is pushed into named helpers. Mixing a network call, a string trim and a database write in one block forces the reader to switch altitude mid-function, and that switch is where they lose the thread.

```ts
async function publishDraft(draft) {
  const validated = validateDraft(draft);
  const record = toRecord(validated);
  await repository.save(record);
  return record.id;
}
```

The body above is 4 lines at 1 level of indentation. The same work written inline — trimming three fields, assembling the insert, catching the client error — runs to about 20 lines at 3 levels, and each level is one more thing the reader tracks while doing it. The summary is what lets them descend only where the change is: 3 helper names instead of 20 lines of detail.

### Fail where the information is

Handle an error at the level that knows what to do about it. A low-level function reports precisely what went wrong, a middle layer adds the context only it has, and the layer that owns the operation decides whether to retry, substitute or abandon. Catching an error early and returning a vague value destroys the information everyone above needs.

```ts
try {
  await paymentGateway.charge(order);
} catch (cause) {
  throw new PaymentFailed(`order ${order.id}`, { cause });
}
```

The trace is short and complete: the gateway answers 502, the status code for a bad reply from an upstream service; this layer knows which order it asked about, 4471, so the message carries 2 facts — the operation and the order. A bare `catch { return null }` in the same spot carries 1 fact, `null`, which says only that something did not work. The layer that can retry needs the order id, not the null.

### Let the happy path flow downward

Guard clauses beat nested conditionals. Check the invalid cases first and return early, so the body that follows is the ordinary case at one indentation level. Deep nesting is where readers lose track of which combination of conditions they are in and make the wrong edit.

```ts
function discountFor(customer, order) {
  if (!customer || !customer.active) return 0;   // guard 1: no customer, or inactive
  if (!order || order.total <= 0) return 0;      // guard 2: nothing to discount
  if (customer.years <= 1) return 0;             // guard 3: first-year customer
  return order.total * customer.years * 0.01;    // ordinary path, 1 level deep
}
```

Nested instead of guarded, the same 3 checks sit inside one another and the paying return ends up 4 levels deep. Four levels of true-or-false give 2^4 = 2 * 2 * 2 * 2 = 16 combinations a careful reader holds in mind to be sure the return is reached only when it should be. Guarded, each check is answered on its own line and exits at once: the reader holds 1 condition at a time, and the ordinary return sits at 1 level.

### Do not swallow, and do not over-catch

An empty catch block is a promise that the program continues correctly when it does not know why it failed. Catching a broad category of errors and treating them all the same is the same problem in a larger costume.

```ts
try {
  return JSON.parse(raw);
} catch {
  return null;   // a null result is a real, handled outcome: the text was not JSON
}
```

That catch is acceptable because the function has exactly 2 outcomes, the parsed value or a null, and the caller is written to handle both. Catching around a whole request handler instead would merge 3 unrelated failures — a network timeout, a rejected field, malformed text — into 1 log line reading "request failed", and the operator would lose the only fact that decides the fix. Catch what you understand, and let everything else travel upward with its original cause attached.

### Errors are values you can design

A thrown exception, a returned result type or an explicit error field are all choices with consequences, and the choice shows in the function's signature. A thrown error is invisible there, so a caller reading the declaration sees 1 outcome where the code has 2. A returned result type puts both outcomes in the declaration, and the compiler then makes every caller say what it does about the failure.

```ts
// 1 declared outcome; the failure is invisible
function parse(text: string): Row

// 2 declared outcomes; every caller must choose
function parse(text: string): { ok: true; row: Row } | { ok: false; error: string }
```

Pick deliberately and keep it consistent within a module. Mixing the 2 conventions in one call chain means a caller who reads the returned error still has to catch the thrown one as well, and forgetting either path loses the failure.

## Practice

### Reorder one function for the reader

Take a long function that validates, computes and saves. Reorder it so the invalid cases are guarded at the top, the computation sits in the middle behind a clear name, and the save is the last statement.

Done when: the ordinary path reads top to bottom with no nesting deeper than one level, and the tests pass without a single edit.

### Make a swallowed failure visible

Find a catch block in your code that returns a default value. Add the original cause to what is thrown or logged, and give the failure a name that says which operation failed.

Done when: a forced failure of that call produces a message naming the operation and the underlying cause, for example `charge failed for order 4471` followed by the provider's status code.

## Common mistakes

- **Catching an error only to log and continue** — the program proceeds in an unknown state and the damage surfaces two systems away; fix: decide explicitly whether the caller can continue, and rethrow with context if it cannot.
- **Returning a default on failure** — a zero total or an empty list is a plausible value for a broken operation, so the failure travels onward disguised as data; fix: return a result the caller must interpret, or fail loudly.
- **Mixing validation, work and persistence in one block** — a failure after the write leaves a partial effect behind; fix: separate the phases so the order is visible and each one finishes before the next starts.
- **Nesting conditions instead of guarding** — 4 levels of checks give the reader 2^4 = 16 combinations to hold at once; fix: return early for the invalid cases, one check per line.
- **Using exceptions for ordinary flow** — a missing optional value becomes an expensive and noisy event; fix: return a value for expected outcomes and reserve exceptions for the exceptional.

## Go deeper

- **Names and small functions** (`01-cs-fundamentals/08-clean-code/01-names-and-small-functions`) — the size and naming habits that make this ordering possible, so read it first.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — what a failure that reports itself precisely saves you when something goes wrong.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — reviewing a diff specifically for swallowed failures and unclear ordering.
