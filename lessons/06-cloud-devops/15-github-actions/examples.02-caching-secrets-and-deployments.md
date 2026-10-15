## Example 1 — A cache that serves stale dependencies for ever

Every run reinstalls the whole dependency tree, so the cache step below was added. It helped for a week and then made an unrelated failure reproducible. Explain the key and correct the step.

```yaml
- uses: cache
  with:
    path: ~/.npm
    key: node-deps
```

### Solution

```yaml
- uses: cache
  with:
    path: ~/.npm
    key: deps-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
```

A cache keyed on a constant is a cache that can never miss, so the first set of dependencies is restored indefinitely, even after the lockfile changes. Keying on the lockfile's hash means a dependency change produces a miss, while every other run hits and the install is skipped. This is the one setting that decides whether a fast pipeline is fast and correct or merely fast.

## Example 2 — A passing check that is also a release

The workflow below runs on a pull request and ends in a deployment job that holds the production credential. A contributor's branch can therefore reach production without a human decision. Restructure the workflow so checks and the release are separate.

```yaml
on: pull_request
jobs:
  test:
    runs-on: ubuntu-latest
    steps: [{ run: ./run-tests.sh }]
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps: [{ run: ./deploy.sh }]
```

### Solution

```yaml
on:
  pull_request:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps: [{ run: ./run-tests.sh }]
  deploy:
    if: github.ref == 'refs/heads/main'
    environment: production
    runs-on: ubuntu-latest
    steps: [{ run: ./deploy.sh }]
```

A check reports whether a change is good; a deployment changes what users are running, so the deploy job now runs only for the main branch and waits on an environment that requires approval. The deployment job is also the only place the credential should live, because a workflow's token is usually broader than the job needs.

Substitute your own action names, environment names and repository files where these sketches use placeholders.
