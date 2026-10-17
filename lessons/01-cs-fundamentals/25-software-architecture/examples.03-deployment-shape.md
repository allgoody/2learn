## Example 1 — A dependency call with no timeout

A user profile is fetched from another service, and the server keeps each request on one of its 200 threads. When that service slows to a standstill, every request that touches it holds its thread for ever, so all 200 threads disappear and the whole application stops answering. Say what the boundary failed to isolate, then make the failure local.

```ts
async function getProfile(id: string) {
  const res = await fetchJson(userService + "/profile/" + id);   // waits for ever
  return { id, tier: res.tier };
}

// userService slows -> each of the 200 threads holds 1 hung call
// threads lost: 200 / 200 = 100% of the capacity
```

### Solution

```ts
async function getProfile(id: string) {
  const res = await fetchJson(userService + "/profile/" + id, {
    timeoutMs: 200, retries: 1,
  }).catch(() => null);                       // degraded, not a hang
  return { id, tier: res?.tier ?? "standard" };
}

// timeoutMs = 200 ms = 200 milliseconds = 0.2 s, with 1000 ms in a second
// so 1 thread completes 1 / 0.2 = 5 requests a second
// all 200 threads: 200 * 5 = 1000 degraded requests a second, not 0
```

Splitting a system into pieces does not isolate failure by itself; it creates new failure modes, and a caller that waits for ever has propagated the failure across the boundary that was supposed to protect it. An explicit timeout plus a defined degraded response keeps the blast radius local: the profile call returns the standard tier and the other endpoints keep serving, at 200 * 5 = 1000 requests a second instead of 200 / 200 = 100% of the capacity lost. The single retry is enough to matter, because 1 initial attempt + 1 retry = 2 attempts, and the call now fails only if both hit the same slow moment. What usually goes wrong is a timeout with no degraded answer: the call returns after 200 ms and the handler throws, which is a slower version of the original outage.

## Example 2 — Distributed for no stated reason

A small team splits its application into 6 services because that is how the reference architecture looked. Now a one-field change needs 3 services released in a fixed order, and one failing service takes 2 others down with it. Test whether the split was justified, then name the shape that fits.

```text
services: gateway, users, orders, billing, inventory, notifications   count = 6
symptoms:  a one-field change needs 3 of the 6 released in order
           1 failing service takes 2 others down with it
           deploys per feature: 3, against 1 before the split
reasons given for the split: "microservices are modern"   measurable constraints: 0
```

### Solution

```text
candidate constraints that would justify a split, each with a number to check
  - two teams must ship on different cadences: releases per week   -> if true, split that seam
  - the pipeline needs its own scaling:        requests per second  -> if true, extract it
  - one failure must be contained:             services that stop   -> if true, split there
  - "microservices are modern"                                     -> no number, no boundary

default: one deployable unit, clear internal boundaries, extract on demand
counts after the default: deploys per feature 3 -> 1, services to keep running 6 -> 1
```

A monolith with clean internal boundaries is easier to reason about, test and debug than the same code split across processes, and it keeps the option open: a module can be extracted later, one at a time, when a real operational need arrives with a number attached. Starting distributed is hard to walk back, and this system pays the operational cost of 6 deployable units while a single change still waits on 3 of them, which is the coupling of one with the coordination of six. What usually goes wrong is copying a reference architecture whose constraints were never copied with it: the shape was a response to a measured problem, and without the measurement it is only an expense.
