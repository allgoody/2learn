## Example 1 — Ordering the stages by feedback speed

A pipeline runs the whole end-to-end suite, then a style check, then a build, on every change. A change with an obvious syntax error waits twelve minutes for its answer. Rearrange the stages so the cheapest question is answered first, and move the slow suite off the fast path.

```yaml
jobs:
  verify:
    steps:
      - run: run-end-to-end-suite    # 12 min, on every change
      - run: check-formatting        # 5 s
      - run: build-artifact          # 2 min
```

### Solution

```yaml
jobs:
  check:
    steps:
      - run: check-formatting        # seconds; rejects most bad changes
  test:
    steps:
      - run: run-unit-tests          # minutes; on every change
  build:
    needs: [check, test]
    steps:
      - run: publish-artifact-version   # once, versioned
  e2e:
    needs: [build]
    steps:
      - run: run-end-to-end-suite     # before deployment, not per commit
```

Each stage now answers one question — is it well-formed, does it behave, can it be packaged, does it run here — so a failure names the question rather than mixing three. The cheap check answers in seconds, which is what keeps the loop tight enough to act on, and the slow suite still runs, ahead of deployment instead of on every commit. The mistake is leaving the slow suite first because it is the most valuable test: value and speed are separate decisions, and the order of stages is an economic one.

## Example 2 — Building once and promoting one version

Two deployment stages rebuild the application from source, so what staging tested is not quite what production receives. Change the pipeline so a single versioned artefact is promoted to both, and keep the release decision separate from the test result.

```text
staging:    build -> deploy   (rebuilds from source)
production: build -> deploy   (rebuilds from source)
```

### Solution

```text
build      -> artefact myapp, version 482
staging    -> deploy version 482        (no build step)
production -> deploy version 482        (gated by an approval)

rollback   -> redeploy version 481 from the same artefact store
```

Building once and promoting by version means the bytes that passed staging are the bytes released, and any rebuild reintroduces the differences the pipeline exists to remove. Keeping deployment a separate, approval-gated stage means a green build is evidence rather than a licence to ship. The mistake is rebuilding per environment "to be safe", which is exactly what makes the tested artefact and the shipped one diverge.
