---
title: Identities and roles
prereqs: ["06-cloud-devops/02-aws"]
---

## What it is

A principal is anything that can make a call to the provider's API: a person, a service, a workload, a pipeline. A role is a set of permissions that a trusted principal may assume for a limited time, receiving temporary credentials. Instead of a stored password, a workload presents evidence of its identity and receives a short-lived token that expires on its own.

## Why it matters

Long-lived credentials are the single largest source of cloud compromise because they never expire, are copied between systems, and end up in a repository or a log. A role removes the thing to leak: the credential is issued on demand, scoped to the workload, and useless an hour later. It also makes the audit trail meaningful, because every action is attributable to the identity that assumed the role rather than to a shared key.

## Core ideas

### The account is the outer boundary, and it should not be the only one

Resources live in an account, and permission within the account is the first control. Splitting production from development into separate accounts means a mistake in one cannot reach the other, and a compromise of a development credential is not a compromise of customer data. This is the cheapest structural boundary available and is frequently skipped because a single account is simpler at the start and much harder to split later.

```text
organisation
  production account   -> customer data, strict policies
  development account  -> experiments, broad permissions, no customer data
  shared services      -> logging, artifact storage
```

### Temporary credentials replace stored keys

A workload with an attached role asks the platform for credentials and receives them with an expiry. A person authenticates to get a session. In both cases there is no secret at rest to steal, which is the entire point. Where an external system must call the API, federation lets it present its own identity and receive a token, rather than storing a key forever.

### Permission is evaluated across layers

A call is allowed only if the identity's policy permits it and the resource's policy accepts it. For cross-account access, both sides must say yes. Understanding that the effective permission is the intersection is what stops the common mistake of granting broadly at one layer and assuming the other will compensate.

### The trust policy is itself a security decision

A role states which principals may assume it. A trust policy that accepts a whole account or an arbitrary federated identity is a wide door, and it is the part of the configuration most often written once and never reviewed. Narrowing who may assume the role is as important as narrowing what the role may do.

### Root and human access deserve special handling

The account's original credentials are the most powerful and should be locked away, used only for the few tasks that require them. Human access should go through a federated identity with multi-factor authentication rather than a set of per-person keys. These two rules remove most of the ways an account is taken over.

### Identity is the audit trail

Every API call is recorded with the identity that made it, so meaningful identities make investigation possible. A shared key makes every action ambiguous, and an identity that has not been used for months is worth investigating or removing. Reviewing unused identities is one of the highest-value periodic checks available.

## Practice

### Replace a stored key with a role

Find a workload using a long-lived access key and give it a role scoped to what it actually calls, then remove the key.

Done when: the workload runs with no key present and its calls are attributable to the role.

### Review who may assume a role

Take a role's trust policy and list every principal that can assume it, then remove any that no longer needs to.

Done when: every principal in the trust policy has a current reason to be there, and a removed one no longer receives credentials.

## Common mistakes

- **Storing a long-lived key on a server** — it never expires and is a candidate for every leak; fix: attach a role and obtain temporary credentials.
- **Running production and development in one account** — a development mistake can reach customer data; fix: separate accounts as the structural boundary.
- **Writing a broad trust policy** — any principal in the account can assume the role; fix: name the specific principals that should.
- **Assuming one policy layer compensates for another** — permission is the intersection, and the broad side still applies elsewhere; fix: narrow both sides.
- **Using the account's root credentials routinely** — the most powerful identity is in daily use; fix: lock it away and federate human access with multi-factor authentication.

## Go deeper

- **AWS** (`06-cloud-devops/02-aws`) — the account and permission model these ideas are drawn from, so read it first.
- **Cloud Security & IAM** (`06-cloud-devops/12-cloud-security-iam`) — the discipline this child is the foundation of.
- **Least privilege in practice** (`06-cloud-devops/12-cloud-security-iam/02-least-privilege-in-practice`) — how these identities are narrowed over time.
