---
title: Deployment shape
prereqs: ["cs-fundamentals/software-architecture/02-data-and-state-ownership"]
---

## What it is

Deployment shape is the answer to two questions: what ships together, and what fails together. A monolith deploys every feature as one unit; a set of services deploys them separately. The choice is operational rather than purely technical, and it decides how much coordination a release requires, how small a change can be, and how far a single failure spreads.

## Why it matters

Deployment shape shapes the team as much as the software. If everything ships together, every release is a group activity and an urgent fix waits for the batch. If a service fails in a way that takes its callers down with it, the independence was only on paper. Getting this wrong produces the worst of both worlds: the operational cost of many deployable units and the coupling of one, which is what most accidental distributed systems look like.

## Core ideas

### Independent deployability has a price

Releasing one part without the others requires that its interface stay compatible across versions, that its data be owned by it, and that callers tolerate it being briefly absent or slow. Those are the same requirements as owning a boundary. If they are not met, the separate deployment is a deployment you have to coordinate anyway — all the cost and none of the benefit.

```text
compatible across versions: add fields, never repurpose them
tolerate absence: timeouts, retries with back-off, circuit breaking
```

### A monolith is a defensible default

One deployable unit with clear internal boundaries is easier to reason about, test and debug than the same code split across processes. It is also easy to change your mind later: modules with clean boundaries can be extracted, one at a time, when a real operational need arrives. Starting distributed, by contrast, is a decision that is very hard to walk back. Choose the monolith until you can name the specific constraint it fails to satisfy.

### Failures do not respect boundaries by default

Splitting a system into pieces does not isolate failure; it creates new failure modes. A caller that waits forever on an unresponsive dependency has propagated the failure. Isolation has to be designed: explicit timeouts, bounded retries, and a defined degraded behaviour for each dependency. This is why "the services are separate" and "the services are independent" are different claims.

```text
dependency down, no timeout  -> caller exhausts its threads
dependency down, timeout set -> caller degrades, everyone else continues
```

### Environments and configuration are part of the shape

What differs between development, staging and production decides how safely you can test. The fewer differences, the more a staging result predicts production. Configuration that lives in the environment rather than in code, and a build that is promoted rather than rebuilt, keeps the artefact you tested identical to the one you run.

### Blast radius is a design choice

Ask, for each part: if this fails or is wrong, what else stops or corrupts? A single database for everything means one bad migration is everyone's outage. A boundary placed around the most damaging failure — payments, authentication, a data pipeline — limits how far a mistake can spread, which is often a better reason to split than performance or team size.

## Practice

### Name the constraint

Write down what your system needs that a single deployable unit cannot provide: a team that must ship without waiting, a component with a different scaling profile, or a failure that must be isolated. If you cannot name one, you have your answer about splitting.

Done when: the list is either empty or contains at least one constraint you can measure.

### Make a failure isolated

Pick one external dependency your system calls. Add a timeout and a defined degraded response, then simulate the dependency being unavailable.

Done when: the rest of the system still serves requests and the degraded path is observable in a metric or a log.

## Common mistakes

- **Distributing before there is an operational reason** — the complexity is paid up front for a benefit never collected; fix: start with one deployable unit and extract on demand.
- **Splitting without owning the data** — the services share a schema and cannot be released independently; fix: treat data ownership as part of the deployment boundary.
- **Calling a dependency without a timeout** — the caller's threads fill up and the failure spreads; fix: set explicit timeouts and cap retries at every outbound call.
- **Diverging environments** — a staging result does not predict production behaviour; fix: promote one build through environments and keep differences in configuration.
- **Ignoring the blast radius of a shared resource** — one mistake takes out unrelated features; fix: place boundaries around the failure you most need to contain.

## Go deeper

- **Data and state ownership** (`cs-fundamentals/software-architecture/02-data-and-state-ownership`) — ownership is what makes independent deployment possible, so read it first.
- **Documenting decisions** (`cs-fundamentals/software-architecture/04-documenting-decisions`) — deployment shape is a decision people will question later, and the reasoning needs to survive.
- **Networking Fundamentals (HTTP, DNS, TLS)** (`cloud-devops/networking-fundamentals-http-dns-tls`) — the transport behaviour your timeouts and retries are actually working with.
