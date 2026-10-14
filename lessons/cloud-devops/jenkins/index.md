---
title: Jenkins
type: skill
topic: cloud-devops
tier: small
status: drafted
aliases: []
prereqs: ["cloud-devops/ci-cd"]
related: []
---

## What it is

Jenkins is a self-hosted automation server: you install it, point it at your repositories and describe the builds it should run. Pipelines are usually written as code in a file in the repository, and Jenkins runs them on agents it controls. It predates the hosted pipelines and remains widespread in organisations that need their build machines inside their own network.

## Why it matters

The reason to run your own automation server is control. The build must reach an internal artifact store, sign a release, or talk to a database that no hosted runner can see; or the organisation simply will not permit source code and credentials to leave its network. Jenkins answers those requirements and has an enormous plugin ecosystem built over many years. The cost is equally concrete: the server and its agents are machines you patch, the plugins are a compatibility surface you maintain, and the knowledge of how the pipeline works lives with whoever installed it.

## Core ideas

### You own the machine, the upgrades and the incidents

A hosted pipeline is somebody else's operational problem; Jenkins is yours. The server's availability becomes your availability, its disk filling with build history is your outage, and a security update for a plugin is a change you must schedule and test. The value is concentrated in the requirement that drove self-hosting, so it is worth checking that the requirement is real before paying the whole price.

```text
hosted:  provider operates runners, upgrades, availability
jenkins: your network can reach internal systems, and you operate all of it
```

### Agents determine where builds can reach

Work is distributed from the controller to agents, and an agent's network position decides what its builds can access. An agent inside the internal network can deploy to systems nothing else can reach, which is the point, and also means an agent is a machine with credentials and network access worth protecting. Tying an agent to the code it builds, rather than letting any job run anywhere, is the basic control.

### Pipeline as code keeps the definition reviewable

Writing the pipeline in a file in the repository makes it reviewable and versioned, the same as the code it builds. Configuring jobs by hand in the web interface achieves the opposite: the definition exists only in the server's database, and a rebuild after a disaster means reconstructing it from memory.

### Plugins are the ecosystem and the risk surface

Almost everything useful comes from a plugin, and every plugin is another thing that may lag a security fix or conflict with another. Keeping the installed set small and current is more valuable than adopting a plugin for each convenience. Plugins that have not been maintained for years should be treated as liabilities.

### The comparison is about the requirement, not the features

Hosted and self-hosted systems converge on features; they differ on where the build runs, who operates it and how credentials reach it. A team whose code and artifacts can live on a hosted service gets little from Jenkins other than operational work. A team that cannot gets something nothing else provides.

## Practice

### State the requirement before choosing

Write down the specific thing a hosted runner cannot do for your project: reach an internal system, use a signing key, satisfy a policy. If the list is empty, record that hosted is the better default.

Done when: you can name at least one hard requirement, or you have concluded that there is none.

### Keep a pipeline definition in the repository

Take a job configured by hand and move its logic into a pipeline file in the repository, leaving the server holding only credentials and agent configuration.

Done when: deleting the job and recreating it from the file produces the same behaviour.

## Common mistakes

- **Self-hosting because hosting costs money** — the operational cost of the server and its plugins is usually larger; fix: compare the two fully, including your own time.
- **Configuring jobs by hand** — the pipeline exists only inside the server and cannot be reviewed or restored; fix: put the definition in the repository.
- **Installing a plugin for every convenience** — each one is a compatibility and security surface; fix: keep the set small and remove the unmaintained.
- **Letting any build run on any agent** — credentials and network access are shared more widely than intended; fix: constrain which jobs may run on which agents.
- **Forgetting the server is a dependency** — a disk full of build history takes the team down; fix: monitor it and cap retention as deliberately as any production service.

## Go deeper

- **CI/CD** (`cloud-devops/ci-cd`) — the practice this server implements, so read it first.
- **GitHub Actions** (`cloud-devops/github-actions`) — the hosted alternative this entry is a comparison against.
- **Pipeline failure modes** (`cloud-devops/ci-cd/02-pipeline-failure-modes`) — the ways any pipeline, hosted or self-hosted, loses the team's trust.
