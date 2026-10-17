## Example 1 — A chain of conditions on the same value

A price is scaled by the sales channel. The chain has grown a branch per channel and one more is expected next week. Replace it, and keep the rejection behaviour the chain had.

```ts
function multiplier(channel) {
  if (channel === "retail") return 1.2;
  if (channel === "wholesale") return 1.07;
  if (channel === "partner") return 1.1;
  throw new Error("unknown channel: " + channel);
}
// 3 channels, 3 branches, 1 throw: 4 exits
```

### Solution

```ts
// 3 channels, 3 rates; adding "marketplace" is 1 line, here
const MULTIPLIERS = { retail: 1.2, wholesale: 1.07, partner: 1.1 };

function multiplier(channel) {
  const rate = MULTIPLIERS[channel];
  if (rate === undefined) throw new Error("unknown channel: " + channel);
  return rate;
}

// multiplier("marketplace") still throws, exactly as the chain did
```

The table gives the variation a name and makes each future channel a one-line addition, so the 4th channel costs 1 edit instead of a branch placed before the default. The explicit `undefined` check is the part that matters: a naive `MULTIPLIERS[channel] ?? 1` would silently price an unknown channel at 1, the list price with no channel markup at all, where the chain used to refuse. Named moves are safe only when they preserve the behaviour you are not changing — here, the throw is behaviour, and dropping it turns a tidy-up into a defect.

## Example 2 — Two arguments that always travel together

A function needs a host and a port, and callers keep passing them in the wrong order. Give the pair a name, one place for validation, and a signature that cannot be misread.

```ts
function connect(host: string, port: number, retries: number) {
  // callers must remember the order, and nothing checks the values
}

connect("db.internal", 5432, 3);
connect("db.internal", 3, 5432);   // compiles, and dials port 3
```

### Solution

```ts
class Endpoint {
  constructor(readonly host: string, readonly port: number) {
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error("invalid port: " + port);
    }
  }
}

function connect(to: Endpoint, retries: number) { /* ... */ }

connect(new Endpoint("db.internal", 5432), 3);
// 2 arguments, 2 orderings, 1 correct; the wrong one is no longer expressible
```

The two values now have one type, so the wrong order is no longer expressible, and the range check has a single home instead of living at each call site. Port 3 is a valid number and a real port, so the misordered call does not crash — it connects somewhere else and leaves a confusing failure, which is exactly why the type, not the test suite, has to catch it. The value object also gives the pair a name the compiler and the reader share, which is the same benefit a good function name buys at a smaller scale. It is worth introducing when the values genuinely belong together, not merely because two arguments are adjacent.
