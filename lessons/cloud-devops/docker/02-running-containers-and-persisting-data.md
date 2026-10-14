---
title: Running containers and persisting data
prereqs: ["cloud-devops/docker/01-images-and-layers"]
---

## What it is

Running a container means starting a process from an image with some configuration: environment values, published ports, mounted storage and a name. Containers are ordinarily short-lived — one process, one job — and the interesting work is in what surrounds them: how they find each other, where their data lives, and how their logs and exit codes are observed. That surrounding is where a containerised system either becomes operable or becomes a debugging problem.

## Why it matters

The promise of a container is that it is disposable, and disposability is only safe if nothing valuable lives inside it. Almost every painful container incident is a violation of that: a database written to the writable layer and lost on restart, uploaded files gone when the container was replaced, two containers unable to reach each other because they were on different networks. Getting the surrounding right is what lets you replace a container without thinking about it.

## Core ideas

### Containers are named processes, not machines

A container runs one foreground process, and when that process exits the container stops. That makes restart policy the equivalent of a supervisor, and it explains why running a daemon and a web server in one container leads to confusing behaviour: only one of them is the container's life. Configuration arrives through environment values and mounted files.

```text
docker run --env PORT=8080 --publish 8080:8080 --name api myapp:1.0
process exits 0  -> container stopped
process exits 1  -> container stopped and reported as failed
```

### Networks give containers names to talk to

Containers attached to the same user-defined network can reach each other by container name, which is how a service finds its database without a hard-coded address. The old default network does not provide this, and using it is the usual reason a two-container example fails. On a modern host or orchestrator, the network is often created and managed for you, but the principle is the same.

### Volumes outlive containers and are the only durable disk

A named volume lives outside the container's writable layer and survives its removal; a bind mount maps a host directory directly. Both are how state is kept across restarts. The decision to make is which state genuinely belongs on the machine at all: in a real deployment it usually belongs in a managed service, with the volume reserved for things like caches or scratch space.

```text
named volume:  survives container removal, managed by the engine
bind mount:    a host path, useful for development
writable layer: gone when the container is gone
```

### Logs go to standard output, not to files

Because the container dies with its files, the useful convention is to write logs and errors to standard output and standard error, and let the surrounding platform collect them. A log file inside a container is invisible the moment the container is replaced.

### Exit codes drive restart and health logic

An exit code of zero means success, non-zero means failure, and the surrounding system uses that to decide whether to restart, retry or alert. A process that swallows an error and exits zero is indistinguishable from one that worked, which is how a silently broken job keeps reporting success.

### Compose and orchestrators formalise the same ideas

Running several containers by hand becomes unmanageable quickly. Compose describes several containers, their network and volumes for local development; an orchestrator does the same across many machines, adding scheduling and healing. Both are conveniences over the same primitive decisions — image, environment, network, volume, restart policy.

## Practice

### Run a service with a volume that outlives it

Start a container that writes a file to a mounted directory, remove the container, and start a fresh one against the same volume.

Done when: the second container reads the file the first one wrote.

### Connect two containers by name

Run a small web service and a database on the same user-defined network, and have the service reach the database by container name rather than by address.

Done when: the service connects using the name, and you can explain why it would fail on the default network.

## Common mistakes

- **Writing important data to the writable layer** — it is lost with the container; fix: use a volume or a managed store.
- **Running several daemons in one container** — the container's lifetime tracks only one of them; fix: one process per container.
- **Relying on the default network for name resolution** — containers cannot find each other by name; fix: attach them to a user-defined network.
- **Logging to a file inside the container** — the evidence disappears with the container; fix: write to standard output and let the platform collect it.
- **Exiting zero after an error** — the failure looks like success to every supervisor; fix: return a non-zero exit code when the work did not complete.

## Go deeper

- **Images and layers** (`cloud-devops/docker/01-images-and-layers`) — how the artifact being run here is built.
- **Docker** (`cloud-devops/docker`) — the packaging model this child is the runtime side of.
- **Kubernetes** (`cloud-devops/kubernetes`) — what replaces manual `run` and `compose` once several machines and services are involved.
