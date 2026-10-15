## Example 1 — A dependency call with no timeout

A user profile is fetched from another service. When that service slows down, the whole application stops answering. Say what the boundary failed to isolate, then make the failure local.

```ts
async function getProfile(id: string) {
  const res = await fetchJson(userService + "/profile/" + id);   // waits forever
  return { id, tier: res.tier };
}

// userService slows -> every request handler holds a connection
```

### Solution

```ts
async function getProfile(id: string) {
  const res = await fetchJson(userService + "/profile/" + id, {
    timeoutMs: 200, retries: 1,
  }).catch(() => null);                     // degraded, not a hang
  return { id, tier: res?.tier ?? "standard" };
}
```

Splitting a system into pieces does not isolate failure by itself; it creates new failure modes, and a caller that waits forever has propagated the failure across the boundary it was supposed to be protected by. An explicit timeout plus a defined degraded response keeps the blast radius local: the profile call returns a default tier and the rest of the application keeps serving. That is the difference between separate services and independent ones: it is designed deliberately at each outbound call.

## Example 2 — Distributed for no stated reason

A small team splits its application into six services because that is how the reference architecture looked. Now every feature needs three coordinated deployments. Test whether the split was justified, then name the shape that fits.

```text
services: gateway, users, orders, billing, inventory, notifications
symptoms:  a one-field change needs three services released in order;
           one failing service takes two others down with it
reasons given for the split: "microservices are modern"
```

### Solution

```text
candidate constraints that would justify a split:
  - two teams must ship on different cadences     measurable -> if true, split that seam
  - the data pipeline needs its own scaling       measurable -> if true, extract it
  - "microservices are modern"                    not a constraint -> no boundary

default: one deployable unit, clear internal boundaries, extract on demand
```

A monolith with clean internal boundaries is easier to reason about, test and debug than the same code split across processes, and it keeps the option open: a module can be extracted later, one at a time, when a real operational need arrives. Starting distributed is very hard to walk back, and this system has paid the operational cost of six deployable units while keeping the coupling of one. The test is to write down what the system needs that a single unit cannot provide — an independent release cadence, a different scaling profile, a failure that must be contained — and split only where that sentence can be finished.
