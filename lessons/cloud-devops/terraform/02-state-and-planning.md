---
title: State and planning
prereqs: ["cloud-devops/terraform/01-declaring-infrastructure"]
---

## What it is

Terraform keeps a state file recording which declared resources correspond to which real ones, along with their attributes. Every plan is a comparison of that record against both the declaration and the provider's view of reality. The state file is also the thing that goes wrong most expensively: it contains secrets, it cannot be edited by two people at once, and losing it means losing the mapping between the configuration and the resources it created.

## Why it matters

A plan is only trustworthy if the state is accurate. A stale or diverged state produces a plan that either proposes recreating resources that already exist or reports no change while reality has drifted. Worse, the state holds values that the provider API returned, including passwords and keys, so it is a secret store in disguise. Handling it deliberately — remote, locked, encrypted and backed up — is the difference between infrastructure as code and infrastructure as guesswork.

## Core ideas

### The state file maps declarations to reality

A resource's address in the configuration is matched, via state, to an identifier in the provider. That mapping is what lets Terraform update a resource rather than create a duplicate, and why a resource removed from the configuration is proposed for destruction. Everything else follows from this one idea.

```text
config address  network.main  ->  state  ->  provider id  vpc-0a12...
```

### Remote state is required once more than one person applies

A local state file works for one person on one machine and fails everywhere else. Remote state with locking prevents two applies from interleaving, and it makes the state available to a pipeline. Locking is not optional: two simultaneous applies are how resources acquire duplicate copies that then need manual reconciliation.

### The state contains secrets in plain text

Provider responses are stored as they were returned, which routinely includes credentials, connection strings and private keys. Encryption at rest, restricted access and never committing it are the minimum. Passing state through a plain object store without access control is a common and serious mistake.

### Import adopts existing resources into state

Resources created before the configuration existed can be adopted rather than recreated, by recording their identifiers in state. The declaration must then be written to match their real settings, or the next plan will propose changes. Import is a deliberate, one-resource-at-a-time operation, not a bulk migration.

### Drift is reality moving without the declaration

Someone edits a rule in the console, an automatic process changes a setting, or a provider deprecates an attribute. A refresh during planning reveals the difference, but constant drift is a signal that someone is working around the tool. Either the configuration needs to own the setting or the change needs a different mechanism.

### Plan review is the control, and it depends on state hygiene

A plan can only be as good as the state behind it. Running plans regularly, reviewing them even when no change is intended, and being suspicious of a plan that reports far less than expected are the habits that keep the comparison honest.

## Practice

### Move state to a remote backend

Take a configuration with a local state file and move it to a remote backend with locking, then apply from two machines to confirm only one can proceed at a time.

Done when: a second apply is refused while the first holds the lock, and the state is not stored on either local machine.

### Adopt an existing resource

Create a resource by hand, write its declaration, import it into state, and produce a plan that shows no changes.

Done when: the plan after import is empty, proving the declaration matches reality.

## Common mistakes

- **Keeping state on a laptop** — nobody else can apply and it is lost with the machine; fix: use a remote backend from the start.
- **Committing state to the repository** — it contains credentials in plain text; fix: store it remotely with access control and encryption.
- **Allowing concurrent applies** — resources are duplicated or partially modified; fix: enable state locking.
- **Importing without matching the declaration** — the next plan proposes to change everything; fix: write the declaration to match, then confirm an empty plan.
- **Ignoring repeated drift** — reality and the declaration diverge until the plan is meaningless; fix: bring the setting under configuration or record why it is exempt.

## Go deeper

- **Declaring infrastructure** (`cloud-devops/terraform/01-declaring-infrastructure`) — the configuration that this state records.
- **Terraform** (`cloud-devops/terraform`) — the tool whose plan depends on all of this.
- **CI/CD** (`cloud-devops/ci-cd`) — where plans are produced, reviewed and applied with the locking and secrets handling this child requires.
