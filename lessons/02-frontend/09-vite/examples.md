## Example 1 — A secret in a prefixed environment variable

A checkout module reads a payments secret from an environment variable. The variable works locally and appears in the built JavaScript. Explain the rule being broken, then put the value where it belongs.

```bash
# .env
VITE_PAYMENTS_SECRET=<the live secret>
```

```js
// src/checkout.js
const secret = import.meta.env.VITE_PAYMENTS_SECRET;
```

### Solution

```bash
# .env — public values only
VITE_API_BASE=/api
```

```js
// src/checkout.js
const apiBase = import.meta.env.VITE_API_BASE;

// server/checkout.js — the secret stays on the server
const secret = process.env.PAYMENTS_SECRET;
```

Only variables carrying the tool's prefix are exposed to client code, and that is not a safety mechanism: whatever is exposed is substituted into the bundle as a literal, so anyone who downloads the JavaScript can read it. The prefix is a marker of intent that says "this value is public", which is why naming a secret with it publishes the secret. Configuration that must stay private belongs in server-side runtime configuration, reached through an endpoint, while the client only ever receives what it may know — here, the base path of the API.

## Example 2 — A build that strips types without checking them

The production build succeeds and a type error reaches a user. The build script runs the bundler alone. Say what the tool actually does with TypeScript, then close the gap without adding a second build system.

```json
{
  "scripts": { "build": "vite build" }
}
```

```text
// src/pricing.ts
const rate: number = "wholesale".length ? 1.07 : "0.9";
//                     ^ ships, because types are removed, not verified
```

### Solution

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "tsc --noEmit && vite build",
    "check": "npm run typecheck && npm run test && npm run build"
  }
}
```

The bundler strips type annotations to get JavaScript quickly; it never validates them, so a wrong annotation costs nothing at build time and everything at runtime. Running the compiler with no emit in the same script restores the check, and it does so before the slow build step, which is the ordering the `check` script encodes once for people, hooks and the pipeline. The same shape applies to the development server: it is a fast feedback loop, not a gate, and anything that must be true before a release has to be enforced by a command someone actually runs.
