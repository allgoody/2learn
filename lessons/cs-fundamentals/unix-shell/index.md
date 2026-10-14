---
title: Unix Shell
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: ["Bash"]
prereqs: []
related: []
---

## What it is

A Unix shell is a program that reads commands, runs them, and connects their input and output. Its power is not the commands themselves but the composition: every command is a small tool that reads text, writes text and reports success or failure, and the shell wires them together. The toolset is the filesystem, permissions, environment and pipelines; fluency in it comes from the small vocabulary being genuinely general.

## Why it matters

The shell is the default interface of every server, container and build pipeline you will meet. A task that takes twenty clicks in a graphical tool is one command here, and the same command runs identically on a colleague's machine and in the deployment pipeline. That reproducibility is the real argument: a command is a record of what was done that can be read, repeated and put in a script. It is also the fastest way to answer questions about a system — which process holds this port, what changed in this directory, which files contain this string.

## In this track

1. **Pipelines and filters** (`cs-fundamentals/unix-shell/01-pipelines-and-filters`) — the three streams, pipes, redirection and the small text tools that compose.
2. **Files, permissions and environment** (`cs-fundamentals/unix-shell/02-files-permissions-and-environment`) — where things live, who may touch them, and how a command finds what it needs.

## Prerequisites

None.

## Go deeper

- **Command-Line Interface** (`cs-fundamentals/command-line-interface`) — turning the toolset into a habit of working, once the mechanics are there.
- **Git (Version Control System)** (`cs-fundamentals/git`) — the tool where this fluency pays off most directly.
- **Operating Systems** (`cs-fundamentals/operating-systems`) — the processes, files and permissions these commands are talking to.
