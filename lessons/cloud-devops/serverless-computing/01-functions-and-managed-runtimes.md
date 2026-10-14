---
title: Functions and managed runtimes
prereqs: ["cloud-devops/serverless-computing"]
---

## What it is

A function is a piece of code with a declared entry point, a memory setting and a timeout, uploaded to a platform that runs it on demand. You do not choose a machine; you choose a runtime and a size, and the platform decides where it runs. The real unit of design is not the function but the assembly: a function triggered by an event, calling a managed database, writing to managed storage, and sending its output to a queue.

## Why it matters

Thinking of serverless as "smaller servers" leads to the wrong designs — a function that behaves like a long-lived process, keeping state in memory, assuming the same instance serves the next request. Once the platform's model is understood, the same constraints become design guidance: state goes to a managed store, work is decomposed into steps that each finish quickly, and failure is expected and retried. That reframing is the actual skill, and it transfers to every provider's runtime.

## Core ideas

### The unit of deployment is a function, the unit of design is an event

A function runs because something happened: an HTTP request, a message on a queue, a file appearing in storage, a schedule. The event is the interface, and it determines the shape of the handler and the retry behaviour. Designing the event is therefore more important than writing the handler.

```text
object created in storage -> function -> resize image -> write thumbnail
queue message            -> function -> send email
schedule                 -> function -> roll up yesterday's metrics
```

### Every invocation starts cold somewhere

A platform may reuse a warm runtime between requests, but it makes no promise. State kept in memory may be there next time or may not; initialisation may cost tens of milliseconds or several seconds. The response is to keep initialisation cheap, move reusable connections outside the handler where the runtime allows, and accept that cold starts are a latency feature of the model rather than a bug.

### Timeouts and memory are the design envelope

A function has a maximum run time and a memory ceiling, and the two are coupled: some platforms scale CPU with memory, so a compute-heavy handler may be fixed by giving it more memory. Work that must run for minutes or hours does not belong in a function; it belongs in a job or a container. Discovering this from a timeout in production is expensive.

### Managed services are the other half

A function with no state is only useful next to a managed database, queue, storage bucket and identity provider. The provider's identity model lets the function assume a role and reach those services with no credential in the code. The more of that assembly is managed, the less there is to operate — which is the point.

### You pay per invocation and per duration

Billing is per request and per gigabyte-second, so the cost tracks actual use closely. That is a genuine advantage for intermittent work and a disadvantage for steady high-throughput work, where a reserved capacity or a container is cheaper per unit. The correct comparison is not "serverless versus servers" but the two prices at your expected load.

## Practice

### Convert one endpoint

Take a small HTTP endpoint you know and describe it as a function: what triggers it, what state it reads, what timeout it needs and what it writes back.

Done when: you can state the timeout and memory you chose, and name one thing in the original that would not survive the conversion.

### Break a long task into steps

Take a task that takes several minutes and split it into a chain of invocations each finishing in seconds, passing progress through a queue or a store.

Done when: each step's input and output is a named event or object, and no step depends on a previous step's memory.

## Common mistakes

- **Keeping state between invocations** — the next request may land on a fresh runtime and find nothing; fix: put state in a managed store.
- **Building a connection on every invocation** — latency and connection churn grow with load; fix: reuse connections outside the handler.
- **Assuming a long-running process** — the timeout arrives mid-work and the platform retries it; fix: decompose into steps that each finish quickly.
- **Hard-coding credentials** — the function's identity should supply them; fix: give the function a role and obtain tokens at runtime.
- **Choosing serverless for steady high throughput** — per-invocation pricing is not the cheapest shape; fix: compare the price at your expected load before committing.

## Go deeper

- **Serverless Computing** (`cloud-devops/serverless-computing`) — the model these functions are the building block of.
- **Designing for serverless** (`cloud-devops/serverless-computing/02-designing-for-serverless`) — how to shape a system around these constraints.
- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — how a runtime you cannot log into is watched.
