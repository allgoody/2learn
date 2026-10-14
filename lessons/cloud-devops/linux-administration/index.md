---
title: Linux Administration
type: skill
topic: cloud-devops
tier: large
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Linux administration is the work of keeping a Linux host healthy and understood: who may log in and what they may do, which processes run and how they are supervised, where files live and who owns them, and how the machine explains what went wrong. It is the layer beneath almost every container, database and web service, and it is the layer whose behaviour you are using even when the platform hides its details.

## Why it matters

Cloud platforms abstract the machine, but they do not remove it: a container still runs as a user, writes files with permissions, sends signals, keeps logs, and reports a failure through an exit code. When something goes wrong at that level, the abstraction offers no help, and the people who can diagnose it are the ones who understand the host. This is also the topic where a small piece of knowledge prevents the largest number of incidents — a wrong permission on a key file, a service that does not start after a reboot, a disk that filled with logs nobody rotated.

## In this track

1. **Users and permissions** (`cloud-devops/linux-administration/01-users-and-permissions`) — identities, ownership and the model that decides who may read what.
2. **Processes and services** (`cloud-devops/linux-administration/02-processes-and-services`) — what runs, how it is supervised and how it is stopped.
3. **The filesystem** (`cloud-devops/linux-administration/03-the-filesystem`) — where things live, what is mounted where, and how space is consumed.
4. **Logs and troubleshooting** (`cloud-devops/linux-administration/04-logs-and-troubleshooting`) — reading the system's own account of what happened.

## Prerequisites

None.

## Go deeper

- **Docker** (`cloud-devops/docker`) — the packaging model that runs on top of everything in this track.
- **Networking Fundamentals (HTTP / DNS / TLS)** (`cloud-devops/networking-fundamentals-http-dns-tls`) — what a host does once it is running and serving traffic.
- **Monitoring & Observability (Prometheus / Grafana)** (`cloud-devops/monitoring-observability-prometheus-grafana`) — how many hosts are watched at once rather than inspected one at a time.
