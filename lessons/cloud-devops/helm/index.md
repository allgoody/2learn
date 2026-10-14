---
title: Helm
type: skill
topic: cloud-devops
tier: small
status: drafted
aliases: []
prereqs: ["cloud-devops/kubernetes"]
related: []
---

## What it is

Helm packages a set of Kubernetes manifests into a chart: a versioned bundle with templates and a file of values. Installing a chart renders the templates with those values and submits the result to the cluster, and a release record ties the installed objects back to the chart version that produced them. It is the package manager for a platform that has no native notion of a package.

## Why it matters

A single service is a dozen manifests, and an application of several services is many times that. Copying them between environments means editing the same values in several places, and updating them means remembering which objects belong together. A chart makes the differences explicit in one values file, and the release record makes it possible to see what is deployed and to roll it back. That said, templating is a language grafted onto YAML, and charts with deep conditional logic become a maintenance problem of their own — which is why the tool pays off for packaging a bounded application and stops paying off when it becomes the application's configuration system.

## Core ideas

### A chart is a parameterised set of manifests

Templates are manifests with placeholders, and values are the file that fills them. The unit of reuse is the chart, and the unit of difference between environments is one values file per environment. Keeping that difference small and legible is what makes an environment promotion a reviewable change.

```text
chart/  templates/deployment.yaml   values.yaml       (defaults)
        templates/service.yaml      values.production.yaml  (overrides)
```

### A release is the installed instance with a history

Installing a chart creates a release: a named instance with a revision history. Upgrading produces a new revision, and rolling back returns to a previous one by re-submitting its rendered manifests. The history is the answer to "what is actually deployed", which is otherwise surprisingly hard to establish across a cluster.

### Values are merged, and the merge order is a source of surprise

Default values from the chart, then any parent chart, then the user's files and command-line overrides. Because the merge is shallow in places and the precedence is easy to forget, a value that appears to be ignored is usually being overridden somewhere earlier in the chain. Printing the rendered manifests is the way to settle it.

```text
helm template ./chart -f values.production.yaml   -> rendered manifest, no cluster needed
```

### Hooks and upgrades have an order

Some resources must exist before others — a database migration before the new application version, a cleanup after it. Helm supports ordering and hooks, but an upgrade that fails midway leaves the release in a failed state that needs deliberate recovery. Treating an upgrade as a transaction that may need finishing is closer to reality than treating it as a command.

### The chart should be small and boring

A chart that contains branching for several application shapes is really a configuration language wearing YAML. When conditionals multiply, the usual fix is to split charts, or to move that variability into the application's own configuration, which it can at least test.

## Practice

### Package one service as a chart

Take a service's deployment and service manifests and turn them into a chart with a values file for the image tag, replica count and resource requests.

Done when: `helm template` renders valid manifests for two different environments from the same chart, and the only difference is the values file.

### Roll back a release

Install the chart, upgrade it with a changed value, and roll back to the previous revision.

Done when: the objects in the cluster match the earlier revision again and you can point at the release history entry that recorded the change.

## Common mistakes

- **Leaving environment differences spread through the templates** — the values file stops being the record of what differs; fix: keep every difference in a values file.
- **Never rendering before installing** — the merged result is discovered only in the cluster; fix: inspect the rendered manifests first.
- **Letting a chart grow conditionals for several applications** — it becomes an untestable configuration language; fix: split the charts or push variability into the application.
- **Ignoring a failed upgrade's release state** — the next operation behaves unexpectedly; fix: resolve the failed release deliberately before continuing.
- **Using the chart's defaults in production without review** — replica counts and resource requests that suited a demo are applied as-is; fix: set the values that matter explicitly per environment.

## Go deeper

- **Kubernetes** (`cloud-devops/kubernetes`) — the objects these templates render, so read it first.
- **OpenShift** (`cloud-devops/openshift`) — a distribution that relies on this packaging for much of its ecosystem.
- **CI/CD** (`cloud-devops/ci-cd`) — how a chart gets tested and released as part of a pipeline.
