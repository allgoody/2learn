---
title: Processes and services
prereqs: ["06-cloud-devops/09-linux-administration/01-users-and-permissions"]
---

## What it is

A process is a running program with an identifier, an owning user and a parent. A service is a process the system starts at boot and supervises, restarting it when it exits and collecting its output. Everything a host does — a database, a web server, a scheduled job — is one or the other, and the difference is a supervision decision someone made.

## Why it matters

The classic host failure is a process that ran fine when started by hand and did not come back after a reboot, because nothing was supervising it. The second classic failure is a service that keeps restarting, hiding an error in output nobody is reading. Understanding process states, signals and supervision turns both from mysteries into ordinary diagnosis, and it is also the model that container platforms and orchestration systems are built on.

## Core ideas

### Every process has a parent, and the tree explains a lot

Processes are created by other processes, all the way back to the first one the system starts. A process whose parent dies is adopted and reparented, which is how a long-running job accidentally started in a terminal session survives that session's end. Reading the tree shows what started something and what will outlive it.

```text
system init -> supervisor -> service process
            -> login shell -> your command (dies with the shell)
```

### Signals are how processes are told to stop

The gentle signal asks a process to shut down cleanly; the forceful one cannot be caught and destroys the process immediately. A service that ignores the gentle signal loses in-flight work. This is the same drain question as in orchestration, at the level of a single process, and the answer has the same shape: stop accepting new work, finish what is in flight, then exit.

### Supervision is what makes a process a service

A supervisor starts the process at boot, restarts it when it exits, captures its output, and holds its configuration. Once a service is declared there, restarting it, checking its status and reading its logs are one command each, which is why hand-started processes are a false economy.

### Resource use belongs to the process, not the machine

CPU time, memory and open files are held by processes, and limits can be set per process and per user. When a host becomes unresponsive the question is which process is consuming what, and when a process is killed the kernel's reason — typically memory exhaustion — is recorded and worth reading before restarting anything.

### Exit codes and output are the service's account of itself

A supervised service reports a non-zero exit code when it fails, and its output goes to the system log. A service that exits zero after an error, or logs nothing, makes every later investigation guesswork. Requiring a clear exit code and useful output is a small discipline that pays off at the worst moment.

### Scheduled work is a process with a different trigger

Timers run commands on a schedule; they are the same processes, with the difference that a failure has nobody watching. Redirecting their output somewhere durable and alerting on a non-zero exit is the minimum, because the alternative is a backup job that has been failing silently for months.

## Practice

### Convert a hand-started process into a service

Take a long-running command currently started by hand, declare it as a service with the right user, restart behaviour and output destination, and reboot the host.

Done when: the service is running after the reboot without anyone logging in, and its output appears in the system log.

### Watch a clean shutdown

Send a service the gentle termination signal while it is handling work, and observe the difference from the forceful one.

Done when: you can describe what the service did with the work in flight in each case.

## Common mistakes

- **Starting a service by hand and expecting it to survive a reboot** — nothing restarts it; fix: declare it under a supervisor.
- **Using the forceful signal as the default** — in-flight requests are dropped; fix: allow graceful shutdown and wait for it.
- **Ignoring the kernel's kill reason** — the same process will be killed again; fix: read the log and address the resource that was exhausted.
- **Letting scheduled jobs write nowhere** — failures are invisible indefinitely; fix: capture their output and alert on non-zero exit.
- **Running services as the wrong user** — the permission model then cannot contain them; fix: give each service its own account.

## Go deeper

- **Users and permissions** (`06-cloud-devops/09-linux-administration/01-users-and-permissions`) — the identity these processes run as.
- **Linux Administration** (`06-cloud-devops/09-linux-administration`) — the host these services live on.
- **The filesystem** (`06-cloud-devops/09-linux-administration/03-the-filesystem`) — where services read and write, and what fills up when they are not watched.
