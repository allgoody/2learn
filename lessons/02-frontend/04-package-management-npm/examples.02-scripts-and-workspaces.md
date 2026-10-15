## Example 1 — A build command that lives in a document

A contributor document lists the command to check a change before pushing. It is four flags long, and it has been out of date twice. Move the knowledge into the manifest.

```bash
# CONTRIBUTING.md
# run this before you push:
npx tsc --noEmit && npx eslint . && npx vitest run --reporter=dot
```

```json
{ "scripts": { "dev": "vite" } }
```

### Solution

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "lint": "eslint .",
    "check": "npm run lint && npm run test && npm run build"
  }
}
```

```bash
npm run check
```

Scripts are the project's interface: a new contributor reads the manifest and knows what to type, and continuous integration calls the same names as a developer does. Putting the ordering inside one `check` script — lint and type-check before the slow build — encodes it once, for a person, a pre-push hook and the pipeline alike. The document then names the script instead of reproducing flags that will drift, which is what happened here twice already. In automation use `npm ci` rather than `npm install`, so the lockfile is enforced rather than reinterpreted.

## Example 2 — The same library copied into two applications

Two applications in one repository each keep their own copy of a shared component library. A fix must be made twice. Restructure the repository so the library has one source.

```text
repo/
  apps/shop/     package.json, own copy of components/
  apps/admin/    package.json, own copy of components/
```

### Solution

```json
{
  "name": "root",
  "private": true,
  "workspaces": ["packages/*", "apps/*"]
}
```

```text
repo/
  packages/components/   package.json  (declares every dependency it imports)
  apps/shop/             depends on "components" by name
  apps/admin/            depends on "components" by name
```

A workspace makes the tool install every package together and resolve an internal dependency by name, so a change to the library is visible in both applications without publishing or hand-linking anything. Keep the root manifest `private` so it can never be published by accident. The one trap worth naming: hoisting means a package can import something it never declared because the root happens to have it installed beside it, which works here and fails when the package is installed alone — so the shared package declares every dependency it uses.
