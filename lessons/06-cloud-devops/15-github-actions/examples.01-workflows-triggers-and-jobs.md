## Example 1 — A trigger that runs the wrong work

Every push to every branch starts the full test and deploy pipeline, so a documentation-only pull request consumes runners and a deploy runs from a feature branch. The trigger block below is what is used. Rewrite it as a policy: checks on source changes, deployment only from the main branch, and a manual entry point.

```yaml
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps: [{ run: ./run-tests.sh }]
  deploy:
    runs-on: ubuntu-latest
    steps: [{ run: ./deploy.sh }]
```

### Solution

```yaml
on:
  pull_request:
    paths: ["src/**"]
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  test:
    runs-on: ubuntu-latest
    steps: [{ run: ./run-tests.sh }]
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps: [{ run: ./deploy.sh }]
```

The trigger is the policy, not a command list: the path filter keeps a documentation change from rebuilding the application, and the branch filter keeps a feature branch from reaching a deployment. The usual mistake is leaving the broadest event in place while adding filters to the jobs, which consumes runners and buries the result of the run that matters.

## Example 2 — A job that assumes the last job's files

The test job builds the frontend, and the deploy job then references the build directory. Every run fails in the second job with a missing path, although the first job passes. Fix the hand-off and explain the failure.

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci && npm run build
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: ./publish.sh dist/
```

### Solution

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci && npm run build
      - uses: upload-artifact
        with: { name: dist, path: dist }
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: download-artifact
        with: { name: dist, path: dist }
      - run: ./publish.sh dist/
```

Each job starts on a fresh machine with its own checkout, so the directory built by the first job does not exist in the second; `needs` orders the jobs but shares no filesystem. Uploading and downloading the artifact is what connects them, and it also leaves a record of exactly what was built, so the tested thing is the shipped thing.

Substitute your own action names and repository files where these sketches use placeholders.
