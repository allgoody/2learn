## Example 1 — A project where the annotations are only decoration

The compiler runs with strict checking off, and a nullable field has been crashing in production for a month. Say what the configuration is actually enforcing, then turn the check on and pay the cost once.

```jsonc
{
  "compilerOptions": {
    "strict": false,
    "target": "ES2017"
  }
}
```

```ts
const city = order.customer.address.city;   // address may be undefined; no error
```

### Solution

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true
  },
  "include": ["src/**/*.ts"]
}
```

```text
const city = order.customer.address.city;
                          ~~~~~~~
error TS18048: 'order.customer.address' is possibly 'undefined'.
```

With `strict` off the annotations describe intent and nothing enforces it, so `null` and `undefined` slip past every check and the runtime errors remain exactly where they were. Turning it on converts each of those into an error on the line that caused it, which is why the option is worth enabling before any other. `noEmit` is usually correct for a front-end project as well: the bundler compiles the code, and the compiler's job is only to check it — which it will not do in the pipeline unless a command runs it there.

## Example 2 — A migration that lived for three weeks

A team converts the whole repository in one branch. Conflicts accumulate, work stops, and the branch is abandoned. Say why the approach failed, then convert in a way that keeps the build green.

```jsonc
{
  "compilerOptions": { "strict": true, "allowJs": false },
  "include": ["src/**/*"]   // every file at once, all errors at once
}
```

### Solution

```jsonc
{
  "compilerOptions": { "strict": true, "allowJs": true, "checkJs": false, "noEmit": true },
  "include": ["src/api/**/*.ts", "src/models/**/*.ts"]
}
```

```json
{ "scripts": { "typecheck": "tsc --noEmit", "check": "npm run typecheck && npm run test" } }
```

A whole-repository conversion cannot be reviewed, cannot merge and therefore never lands; the growing `include` list converts module by module while the untouched JavaScript keeps compiling. Starting with the shared boundaries — API clients and data models — pays twice, because their types propagate outward and make the remaining files cheaper to convert. `allowJs` without `checkJs` lets imports from untyped files resolve without checking their contents, which is a useful intermediate step rather than a compromise. And the check belongs in the pipeline: an error seen only in the editor of whoever ran the compiler last is not enforcement.
