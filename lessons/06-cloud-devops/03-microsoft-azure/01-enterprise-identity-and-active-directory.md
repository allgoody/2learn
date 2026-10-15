---
title: Enterprise identity and Active Directory
prereqs: ["06-cloud-devops/03-microsoft-azure"]
---

## What it is

Azure's identity service is the cloud version of the directory that has managed Windows logins for decades. It holds users, groups and machines, and it issues the tokens that decide who may reach which resource. On Azure, identity is not a sidebar feature bolted onto infrastructure: it is the layer the rest of the platform is built on, and the reason many enterprises choose Azure without much comparison.

## Why it matters

In most organisations the directory is the oldest and most authoritative system they own. It already knows every employee, their group memberships and their devices, and it is already wired into laptop login, email and file shares. A cloud that joins that directory reuses all of it: an employee who leaves is disabled once, and access everywhere stops. A cloud that does not requires a second directory, a synchronisation job and a set of rules for which system wins. That ongoing cost is much larger than the difference in virtual machine prices, which is why it usually decides the question.

## Core ideas

### A tenant is the boundary of trust

Signing up creates a tenant: a directory plus an identity boundary. Resources, users and policies live inside it, and access from outside requires an explicit grant in both directions. Understanding that the tenant, not the subscription, is the unit of identity is what makes multi-team setups comprehensible.

```text
tenant (one directory)
  subscriptions:  production, staging, sandbox
  identities:     shared across all of them
```

### Groups carry permission, not individuals

Permissions attached to people drift and are never removed; permissions attached to groups can be reviewed and revoked as a unit. The discipline is to make every group's purpose nameable and to grant access only to groups. When someone changes role, you change their group membership, and the audit trail stays meaningful.

### Conditional access is the part other clouds copy

Because the directory already knows the device and the sign-in context, a policy can require a managed device, a compliant state or a second factor for specific applications. That is what turns "is this a valid password" into "is this a plausible sign-in for this person on this device". It is Azure's strongest differentiator and the reason its identity model is worth learning even if you use another provider.

### Single sign-on is where the value compounds

Connecting an external application to the directory removes one password, one reset flow and one offboarding step per application. Multiply that by the number of internal tools a company runs and the saving is measured in support hours, not licence fees. Each new application added to the directory makes leaving a second directory progressively more expensive.

### It also extends to non-Microsoft workloads

The same identity can front Linux machines, Kubernetes clusters and third-party services. Once that is true, the choice of cloud provider and the choice of identity provider become separable decisions, and the identity layer outlives whichever infrastructure is fashionable.

## Practice

### Model a join, a move and a leaver

Write down what must change in the directory for each of the three events: a new employee starts, an existing employee changes team, an employee leaves. For each event, name every access decision the directory settles by itself.

Done when: you can point at the single action that removes all access for the leaver, and it is not a list of applications.

### Add an application to single sign-on

Take an internal tool with its own password and describe what would change if it trusted the directory instead.

Done when: you can name the password reset and offboarding work that disappears, and the one new dependency it introduces.

## Common mistakes

- **Assigning permissions to individuals** — nobody knows what a person has, and nothing is revoked cleanly; fix: grant to groups and manage membership.
- **Running a separate directory for cloud resources** — a second source of truth needs synchronising forever; fix: join the existing directory to the tenant.
- **Treating multi-factor authentication as the whole policy** — a stolen session from a healthy account still gets in; fix: add conditions on device and location, not only on the sign-in itself.
- **Choosing a provider on familiarity alone** — the workload's needs are never examined; fix: let identity decide the entry point, then evaluate the workload on its own terms.
- **Creating a tenant per team** — identities multiply and cross-team access becomes a manual grant; fix: one tenant with several subscriptions and group-based access.

## Go deeper

- **Microsoft Azure** (`06-cloud-devops/03-microsoft-azure`) — the platform this identity layer sits in.
- **Running workloads on Azure** (`06-cloud-devops/03-microsoft-azure/02-running-workloads-on-azure`) — what you build once the identities are in place.
- **Cloud Security & IAM** (`06-cloud-devops/12-cloud-security-iam`) — least privilege as a general discipline rather than one provider's implementation.
