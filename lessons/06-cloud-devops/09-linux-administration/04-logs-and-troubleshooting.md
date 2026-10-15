---
title: Logs and troubleshooting
prereqs: ["06-cloud-devops/09-linux-administration/03-the-filesystem"]
---

## What it is

Troubleshooting a Linux host is mostly reading what it has already recorded. The kernel reports hardware and resource events, the service supervisor reports starts and failures, and each service writes its own output; these are collected in a central location and rotated so they do not fill the disk. The skill is knowing which source answers which question, and reading from the symptom backwards rather than guessing forwards.

## Why it matters

Most host incidents are resolved by a log line that was already there: a service that failed to bind a port, a certificate that expired, a filesystem that ran out of space, a permission that was denied. People who do not read the logs restart the service and hope, which works often enough to be a habit and fails precisely when the stakes are highest. Reading the system's own account first is faster than any hypothesis, and it leaves a record of what actually happened.

## Core ideas

### Each question has a source

Kernel messages report hardware, the network and out-of-memory kills. The supervisor reports which service started, stopped or failed. The service's own log reports what it was doing when it failed. Starting from the symptom — the service is down, the site is slow, the disk is full — and moving to the source that owns that symptom is the whole method.

```text
service will not start   -> supervisor's log for the unit, then the service's output
host becomes unresponsive -> kernel log for resource exhaustion
disk full                -> filesystem usage, then the largest log or open deleted file
```

### Time is the organising dimension

The useful reading is chronological: what was the last thing before the symptom? Correlating the supervisor's timestamp for a restart with the service's last output line usually identifies the cause in one step. Time zones matter, because the service may log in a different zone from the system, which is why consistent timestamps are worth enforcing.

### Rotation is what keeps logs from becoming the incident

Logs grow without bound unless something rotates, compresses and deletes them. The usual failure is a service writing enormous volume at a level nobody reads, filling the disk, which then causes the outage that fills the logs with errors. Setting retention deliberately and shipping important logs off the host are both part of the answer.

### Levels exist to separate the ordinary from the exceptional

A log at debug level is invaluable while diagnosing and ruinous in steady state. Setting a sensible default and raising the level temporarily is the discipline; leaving debug on in production is how a host fills its disk quietly.

### Denials are recorded, and they name the decision

Permission failures appear in the kernel's audit trail and in the service's output, usually naming the user, the path and the operation. Reading that line is much faster than adjusting permissions by trial, and it prevents the habit of loosening access until something works.

### A symptom is not a cause, and restarts destroy evidence

Restarting a failing service clears its state and often its temporary diagnostics, so the second failure looks new. Reading the logs before restarting, and capturing the state that produced the failure, is the habit that makes repeated incidents solvable.

## Practice

### Diagnose from logs only

Take a service that fails to start because its port is already in use. Find the evidence in the supervisor's log and the kernel's messages that names the conflict, without changing anything first.

Done when: you can name the conflicting process and the log line that identified it.

### Set retention deliberately

Configure rotation and retention for a service's logs and confirm that old entries are compressed and eventually removed.

Done when: you can state the maximum disk space the logs may occupy and see the policy enforced.

## Common mistakes

- **Restarting before reading the logs** — the evidence for the first failure is gone; fix: read the supervisor's log and the service's output first.
- **Leaving debug logging on in production** — the disk fills and causes the next outage; fix: set a sensible default level and raise it temporarily.
- **Never rotating logs** — growth is unbounded until the disk fails; fix: rotate, compress and set retention deliberately.
- **Loosening permissions until the error stops** — the cause is recorded as a denial that names the path and user; fix: read the denial and grant the specific access.
- **Comparing timestamps across time zones** — events appear out of order and correlation fails; fix: enforce a single time zone in logs.

## Go deeper

- **The filesystem** (`06-cloud-devops/09-linux-administration/03-the-filesystem`) — where these logs live and what happens when they fill the volume.
- **Linux Administration** (`06-cloud-devops/09-linux-administration`) — the host this troubleshooting applies to.
- **Monitoring & Observability (Prometheus / Grafana)** (`06-cloud-devops/18-monitoring-observability-prometheus-grafana`) — how this per-host reading becomes a system-wide view.
