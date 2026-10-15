---
title: Workflows, triggers and jobs
prereqs: ["06-cloud-devops/15-github-actions"]
---

## What it is

A workflow is a file in a repository that names the events it responds to, the jobs to run, and the steps inside each job. A trigger is the event: a push to a branch, a pull request being opened, a tag being created, a schedule, or a manual invocation. A job runs on a fresh machine and consists of steps, each a command or a reusable action. Jobs are independent by default and can be made dependent, which is how a build is made to precede a deployment.

## Why it matters

Getting the trigger right is what determines whether the automation is useful or noisy. A workflow that runs the full suite on every push to every branch wastes runners and buries the results; one that runs only on the default branch catches a problem after it has merged. The usual shape is cheap checks on every pull request and deployment only on the main branch, which means the file has to encode a policy, not just a command list.

## Core ideas

### The trigger is the policy

The events a workflow listens to, and the branches and paths it filters on, decide what runs when. Path filters matter on a monorepo: a change to the documentation should not rebuild the application. A manual trigger is useful for the operations somebody should decide on rather than have happen automatically.

```yaml
on:
  pull_request:
    paths: ["src/**"]
  push:
    branches: [main]
  workflow_dispatch:
```

### A job is a fresh machine with its own checkout

Each job starts clean, so anything the previous job produced must be uploaded and downloaded between them. That is why a build job publishes an artifact and a deploy job fetches it, rather than assuming the file is still there. It also means a job that depends on state in a previous job is a mistake rather than a slow path.

### Steps run in order, and the first failure stops the job

Steps are sequential within a job, and a failing step fails the job unless it is explicitly allowed to continue. This ordering is what makes a pipeline readable: build, then test, then publish. A step that swallows an error hides a failure from every check that follows it.

### Jobs can be parallel or dependent, and that is the speed lever

Independent jobs run at the same time; `needs` makes one wait for another. A test suite split across several parallel jobs finishes far earlier than one long job, and a matrix expands one job definition across several versions or platforms. This is where a slow pipeline is usually fixed, rather than by making a single step faster.

```yaml
jobs:
  test:
    strategy: { matrix: { node: [22, 24] } }
  deploy:
    needs: test
```

### Reusable workflows and actions prevent copy-paste

A workflow can call another workflow with parameters, which is how several repositories share a standard pipeline. A composite action packages a sequence of steps. Both are worth extracting once the same logic appears in a third place; before that they add indirection.

### Runners are a resource with a cost and a security model

Hosted runners are convenient, ephemeral and limited; self-hosted runners are cheaper at volume and are a machine you must secure and keep updated. A self-hosted runner attached to a public repository is a serious risk, because a pull request can propose code that runs on it.

## Practice

### Trigger the right work on the right event

Write a workflow that runs a test job on pull requests that touch the source directory and a deploy job only on pushes to the main branch, using an uploaded artifact rather than shared state.

Done when: a documentation-only pull request runs no jobs, and the deploy job consumes the artifact the test job produced.

### Parallelise a test suite

Split one long test job into three jobs that run at the same time, each reporting its own result.

Done when: the wall-clock time for the whole workflow falls, and a failure in one job still marks the run as failed.

## Common mistakes

- **Running the full pipeline on every branch and change** — runners are consumed and results are ignored; fix: filter triggers by branch and path.
- **Assuming a later job can see an earlier job's files** — each job starts clean; fix: upload and download artifacts.
- **Passing secrets to a workflow triggered from a fork** — untrusted code can use them; fix: gate secret-bearing runs behind review.
- **Making every job depend on every other** — the run serialises and takes longer than the work; fix: depend only where the ordering is real.
- **Using a self-hosted runner on a public repository** — arbitrary proposed code runs on your machine; fix: keep untrusted runs on hosted, ephemeral runners.

## Go deeper

- **GitHub Actions** (`06-cloud-devops/15-github-actions`) — the service these files configure, so read it first.
- **Caching, secrets and deployments** (`06-cloud-devops/15-github-actions/02-caching-secrets-and-deployments`) — making the runs these jobs define fast and safe.
- **CI/CD** (`06-cloud-devops/08-ci-cd`) — the practice the workflow is an implementation of.
