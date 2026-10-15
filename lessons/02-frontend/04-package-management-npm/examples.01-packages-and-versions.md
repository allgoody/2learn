## Example 1 — A build that changed with no code change

A project declares ranges in its manifest and never commits the lockfile. Months later a clean install produces a different program. Say which line caused it, then make the install reproducible.

```json
{
  "dependencies": {
    "date-fns": "^3.6.0",
    "chart-kit": "latest"
  }
}
```

```bash
# a scratch project, no lockfile committed
npm install          # resolves the ranges again, today
npm run build        # fails on a change nobody made
```

### Solution

```bash
npm install          # resolve once, commit package-lock.json
git add package-lock.json
npm ci               # removes modules, installs exactly from the lockfile
```

The `latest` range means every install is allowed to be a different program, and `^3.6.0` trusts every 3.x release the author publishes. The lockfile records the exact version and integrity hash of every package in the tree, including the transitive ones nobody named, so the next install produces the same tree as the one you tested. Commit it, and use `npm ci` in automation: it installs strictly from the lockfile and fails when the manifest and lockfile disagree, which is exactly the disagreement that caused this build to change on its own.

## Example 2 — A toolchain installed at runtime

A lint tool sits in `dependencies`, so a production install pulls it in. Separately, two copies of a state library are in the tree. Diagnose both, then correct them.

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "eslint": "^9.0.0",
    "state-lib": "^4.0.0"
  }
}
```

```bash
npm ls state-lib
# state-lib@4.0.0
# state-lib@3.2.1   <- pulled in by a peer of a plugin
```

### Solution

```json
{
  "dependencies": { "react": "^19.0.0", "state-lib": "^4.0.0" },
  "devDependencies": { "eslint": "^9.0.0" }
}
```

```bash
npm explain state-lib      # name the parent that pulled in 3.2.1
```

`dependencies` are needed to run the application and `devDependencies` to build or test it, so a linter in the former makes every consumer install the toolchain for nothing. The duplicate is the more serious half: two copies of a state library means two independent stores, and a component reading the old one will not see an update written to the new one. `npm ls` and `npm explain` name the parent and its declared range, which turns a confusing duplicate into a specific package to upgrade or replace rather than a lockfile to delete.
