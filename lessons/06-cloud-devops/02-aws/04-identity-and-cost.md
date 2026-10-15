---
title: Identity and cost
prereqs: ["06-cloud-devops/02-aws/03-networking-and-vpc"]
---

## What it is

Identity decides who may call which API, and cost decides what those calls add up to. On AWS both are managed by the same account structure: users and roles hold policies that grant permissions, and every action a policy grants is an action that may eventually appear on a bill. The two topics belong together because a permission is also a spending permission — the ability to create resources is the ability to create cost.

## Why it matters

A long-lived access key with broad permissions is the single most damaging thing to leave in a repository, and the blast radius is the whole account. Roles remove the key: a workload asks the platform for temporary credentials, and the platform decides whether to grant them. On the cost side, the danger is not the obvious big instance but the accumulation of small resources — unattached disks, idle load balancers, forgotten snapshots — that nobody owns and nobody notices. Both problems are solved by the same discipline: give every actor exactly what it needs, and make every resource attributable.

## Core ideas

### Prefer roles over long-lived keys

A role is a set of permissions that a trusted principal may assume temporarily. An instance, a function or a person can be given a role instead of a static key, so there is no secret to leak and no rotation to forget. Where a key is unavoidable, scope it narrowly and rotate it. The presence of a long-lived key in a repository should be treated as an incident, not a cleanup.

```text
instance -> assumes role -> temporary credentials -> API call
no key stored, nothing to leak, nothing to rotate
```

### Least privilege is iterative, not aspirational

Start from deny and add the permissions the workload demonstrably needs. The practical method is to observe what is called, grant that, and remove what is not. Broad managed policies are a reasonable starting point only if narrowing them is part of the plan, because a permission granted for a trial outlives the trial.

### Policies attach to identities and to resources

An identity policy says what this role may do; a resource policy says who may touch this resource. Both are evaluated, and cross-account access needs a statement on each side. Understanding that the effective permission is the intersection is what stops the common mistake of granting broadly at one layer and assuming the other layer will save you.

```text
allowed = (what the role may do) AND (what the resource accepts)
```

### Every resource should have an owner and a tag

Tags are the cheapest governance tool AWS offers: owner, environment, project, expiry. Without them a bill is one undifferentiated number, and the first question in any cost review — "whose is this?" — cannot be answered. Requiring a small set of tags at creation is far cheaper than reverse-engineering ownership later.

### Cost has rhythms, and the bill is the record

Compute is billed by the second, storage by the month, transfers by the gigabyte. A budget and an alert turn the bill into a signal rather than a monthly surprise: you declare what you expect to spend, and you are told when reality diverges. Reviewing the largest lines in the bill each month usually finds the same few patterns — idle resources, oversized instances, and data crossing a boundary it need not cross.

## Practice

### Replace a key with a role

Find a workload using a static access key. Give it a role that grants only what it calls, remove the key, and confirm it still runs.

Done when: the key no longer exists and the workload's log shows temporary credentials being used.

### Attribute one resource

Take a resource you created and add tags for owner, environment and project. Then find it in the cost report by that tag.

Done when: the cost report can attribute the resource's spend to a name, and the resource would be identifiable a year from now.

## Common mistakes

- **Committing an access key** — the account's permissions are now public; fix: revoke the key immediately, then replace it with a role.
- **Granting a broad policy "to unblock a deploy"** — the policy stays after the deploy; fix: treat broadening as temporary with a date, and narrow it once the failure is understood.
- **Creating resources without tags** — nobody can attribute the cost or the owner; fix: require a minimal tag set at creation.
- **Assuming a resource policy compensates for an over-broad role** — the effective permission is the intersection, but the broad role still applies elsewhere; fix: narrow the role too.
- **Watching only the obvious large lines** — small idle resources accumulate quietly; fix: review the whole bill monthly, largest lines first.

## Go deeper

- **Networking and VPC** (`06-cloud-devops/02-aws/03-networking-and-vpc`) — the rules these permissions govern, and the traffic they cost.
- **AWS** (`06-cloud-devops/02-aws`) — the account structure these policies live in.
- **Cloud Cost Management** (`06-cloud-devops/11-cloud-cost-management`) — the ongoing practices that turn this month's review into a habit.
- **Cloud Security & IAM** (`06-cloud-devops/12-cloud-security-iam`) — the same problem generalised across providers.
