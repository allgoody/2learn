---
title: Least privilege in practice
prereqs: ["cloud-devops/cloud-security-iam/01-identities-and-roles"]
---

## What it is

Least privilege means every principal holds exactly the permissions it needs and nothing more, and it is easy to state and hard to keep. In practice it is an ongoing cycle: start from a narrow grant, observe what is actually used, remove what is not, and detect the drift that quietly widens permissions again. The hard part is not the first narrowing but the maintenance.

## Why it matters

Permissions accumulate. A deploy fails late at night, someone adds a broad policy to unblock it, and the policy stays after the failure is understood. A role written for one job is reused for another. A developer gains access for an incident and keeps it. Each addition is reasonable and the aggregate is an account where nearly everything can do nearly anything. The damage is realised at exactly the wrong moment, when a single credential is exposed and its reach turns out to be the whole estate.

## Core ideas

### Start from deny and add what is observed

The reliable method is to grant nothing, watch what the workload actually calls, and grant that. Starting from a broad managed policy and intending to narrow it later fails because later never arrives. Where a trial genuinely needs breadth, the grant should carry an expiry and a ticket, so it removes itself if the follow-up is forgotten.

```text
observe calls -> grant exactly those -> re-observe -> remove what stopped
```

### Wildcards are where privilege is lost

An action wildcard on a resource wildcard is the broadest grant possible; even a narrow action on a wildcard resource can be extensive when the action is destructive. Reading a policy, the useful questions are which actions and which resources, and whether either is a wildcard. Where a wildcard is genuinely needed, the resource side is usually the place to constrain.

### Conditions narrow a grant further than the action list

A policy can require that a request arrive over an encrypted connection, from a particular network, with multi-factor authentication, or with a specific tag. Conditions express intent the action list cannot: "this may be read, but only from inside our network" is one condition rather than a new role. They are frequently the cheapest way to narrow an existing grant.

### Unused permissions are the safest to remove

Every service and permission is a candidate. Comparing granted permissions with the ones actually used over a long period produces a list of removals that carry almost no risk. Periodic review of identities that have never been used is the same exercise at the principal level.

### Drift is what undoes the work

New resources arrive with default permissions, new services are added with convenient policies, and incident responses leave widenings behind. Detecting that drift means comparing the current policy set with the intended one on a schedule, and treating a difference as a finding rather than as noise. Without that comparison, least privilege decays at the rate the team ships.

### The application layer is a separate front

None of this covers a service that trusts any authenticated caller, an endpoint that returns another user's record, or a query built by string concatenation. Identity and access control govern the API; the application's own authorization governs its data. Both are needed, and this entry stops at the former.

## Practice

### Remove an unused permission

Pick an identity with a broad grant, list the actions it has actually used over a period, and produce a narrowed policy that excludes the rest.

Done when: the identity still works after the change and the removed actions have no recorded use.

### Detect drift in one policy set

Take a set of policies and their intended definition, and write the comparison you would run on a schedule to find differences.

Done when: you can name the differences a manual change would introduce and see them reported.

## Common mistakes

- **Granting broadly to unblock a deploy and never narrowing** — the grant outlives the problem; fix: attach an expiry and a follow-up.
- **Using action and resource wildcards by default** — the effective permission is the whole service; fix: constrain the actions and resources and check for wildcards in review.
- **Ignoring conditions** — an unencrypted or off-network request is accepted; fix: express the constraint as a condition rather than a new role.
- **Never reviewing unused identities and permissions** — the estate widens silently; fix: compare granted with used on a schedule.
- **Relying on IAM for application authorization** — one service can read another user's data; fix: keep the application's own authorization and treat this as a separate layer.

## Go deeper

- **Identities and roles** (`cloud-devops/cloud-security-iam/01-identities-and-roles`) — the principals and trust relationships these permissions are attached to.
- **Cloud Security & IAM** (`cloud-devops/cloud-security-iam`) — the discipline this child is the maintenance half of.
- **Web Security (OWASP Top 10)** (`security/web-security-owasp-top-10`) — the application-level layer where broken access control lives instead.
