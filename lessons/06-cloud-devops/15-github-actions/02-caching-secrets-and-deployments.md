---
title: Caching, secrets and deployments
prereqs: ["06-cloud-devops/15-github-actions/01-workflows-triggers-and-jobs"]
---

## What it is

Once a workflow runs reliably, three concerns decide whether it is pleasant to live with: how long it takes, whether its credentials are safe, and whether a green run means the change is tested or released. Caching addresses the first, secrets the second, and the separation of checks from deployments the third. All three are configuration details with consequences out of proportion to their size.

## Why it matters

A pipeline that reinstalls every dependency on every run wastes minutes of every contributor's day and encourages batching. A pipeline that handles secrets carelessly leaks them into logs or hands them to untrusted code. A pipeline that deploys automatically whenever its tests pass has quietly removed the release decision. None of these failures announce themselves; they accumulate as a slow, slightly unsafe process that nobody remembers choosing.

## Core ideas

### Cache the things that change rarely, keyed by what changes

Dependencies and build output are the usual candidates. The cache key should include the lockfile so that a dependency change misses the cache and everything else hits it. A cache keyed on nothing or on a constant serves stale artifacts forever, which produces mysterious failures that disappear when the cache is cleared.

```yaml
key: deps-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
```

### Secrets are scoped, masked and short-lived

A secret is injected as an environment value, masked in logs where the platform supports it, and scoped to the environments or jobs that need it. Prefer short-lived credentials obtained through an identity federation to long-lived tokens stored as secrets: the former expires on its own, the latter does not. Never echo a secret, and be aware that a command printing its own arguments can leak one.

### A check is not a deployment, and environments separate them

A pull request check reports whether the change is good; a deployment changes what users are running. Keeping them as different jobs, gated on different events and protected by environment rules, means a passing test is not itself a release. Where the platform supports required reviewers for an environment, that is the natural place for the human decision.

### Deployment jobs need their own identity and permissions

A workflow's token has permissions, and the default may be broader than the job needs. Granting only the permissions a job uses limits what a compromised step can do. The deployment job in particular should be the only one holding the credential that changes production.

### Artifacts connect the jobs, and they are also the record

Uploading a build artifact makes it available to a later job and leaves evidence of exactly what was built. Referencing the artifact by name and version rather than rebuilding is what makes the tested thing the shipped thing. Retention settings decide how long that record survives.

### Runs are ephemeral, so nothing may be assumed about the machine

There is no persistent workspace, no package installed last time, and no process left running. Anything that must persist belongs in the cache, in an artifact, or in an external service — and it must be retrievable by a key the workflow can reconstruct.

## Practice

### Cache a dependency install

Add a cache step keyed on the lockfile to a workflow that installs dependencies, and confirm that a second run is faster while a change to the lockfile invalidates the cache.

Done when: the second run reports a cache hit and completes materially faster, and changing the lockfile produces a miss.

### Separate the release from the check

Give a deploy job an environment that requires approval, triggered only on a push to the main branch, and confirm that a pull request cannot reach it.

Done when: a pull request runs the checks but cannot deploy, and the deploy job lists its approval before proceeding.

## Common mistakes

- **Caching with a key that never changes** — stale dependencies are restored indefinitely; fix: key the cache on the lockfile's hash.
- **Storing a long-lived token as a secret** — it never expires and must be rotated by hand; fix: prefer short-lived federated credentials.
- **Echoing secrets or debug output containing them** — the value is written into a log; fix: mask secrets and avoid printing configuration.
- **Deploying automatically on a passing test** — the release decision is silently removed; fix: gate deployments on an event and an environment rule.
- **Granting the workflow a broad token** — a compromised step has more access than it needs; fix: set the minimum permissions per job.

## Go deeper

- **Workflows, triggers and jobs** (`06-cloud-devops/15-github-actions/01-workflows-triggers-and-jobs`) — the structure these settings are applied to.
- **GitHub Actions** (`06-cloud-devops/15-github-actions`) — the automation service itself.
- **Pipeline failure modes** (`06-cloud-devops/08-ci-cd/02-pipeline-failure-modes`) — the broader ways a pipeline stops being trusted, of which secrets and slow runs are two.
