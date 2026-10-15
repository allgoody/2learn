---
title: Declaring infrastructure
prereqs: ["06-cloud-devops/07-terraform"]
---

## What it is

Terraform configuration is a set of files declaring resources, the values they need, and the values worth exposing. A resource is a real thing in a provider — a network, a machine, a database — described by its settings. Variables parameterise the configuration so one definition can describe several environments, and outputs expose the values other configuration or a person needs.

## Why it matters

The console makes every change easy and none of them recorded. A declaration makes the change a diff: you see what will be created, modified or destroyed before it happens, which is the only point at which a dangerous change is cheap to catch. Because the configuration lives in version control, an environment's history is reviewable, and a rebuild after a disaster is a matter of applying the same files rather than recalling a sequence of clicks.

## Core ideas

### A resource is an object with a lifecycle

Declaring a resource gives it a type, a local name and its settings. Terraform creates it, records it in state, and later modifies or destroys it as the declaration changes. The local name is how other parts of the configuration refer to it, which is why renaming a resource block is not cosmetic: it may look like a new resource and an old one to delete.

```text
resource "network" "main" { ... }
resource "subnet" "app"  { network = network.main.id }
```

### A plan is the contract, and it must be read

The plan lists every action and marks destructive ones. Reading it is the entire safety mechanism: an unexpected destroy is the moment to stop, not a detail to approve. In a pipeline the plan should be attached to the change for review, because the person approving it is the last point before a resource disappears.

### Variables parameterise, outputs expose

Variables are the inputs that differ between environments, given defaults and types so the configuration is usable without reading all of it. Outputs are the values worth printing after an apply, such as an endpoint or an identifier. Keeping the interface small — a handful of meaningful variables rather than dozens — is what makes a module reusable instead of merely parameterised.

### Modules package a pattern, and they need a version

A module is a directory of configuration invoked from elsewhere, which is how a standard network or service pattern is shared. Once a module has consumers, changing it changes all of them, so a module should be versioned and its interface treated as public. A module that wraps a single resource adds indirection without adding anything else.

### Providers are the boundary with the real world

Each provider supplies the resource types and the API calls behind them, and provider versions change behaviour. Pinning the provider version and upgrading deliberately is what stops an unrelated change from altering how every resource is created.

### An apply that fails halfway leaves real resources

Unlike a program, an apply is not a transaction. Some resources exist, some do not, and the state may need reconciling before anything else can proceed. The response is to read the state and the plan carefully and bring the declaration and reality back into agreement deliberately, not to re-run and hope.

## Practice

### Build a small environment from a declaration

Declare a network and one instance with a variable for the region and an output for the address. Apply it, then change the region and read the plan before deciding whether to apply.

Done when: you can explain what the change would destroy and why, and you have stopped before applying it.

### Extract a module only where it repeats

Write a second environment using the same declaration with different values, and identify whether a reusable module is justified yet.

Done when: you can name at least two real consumers before creating a module, or you leave the duplication in place.

## Common mistakes

- **Applying without reading the plan** — a destructive change proceeds unnoticed; fix: read every plan and attach it to the review.
- **Renaming a resource block** — it is treated as a replacement, destroying and recreating the resource; fix: use the state-move command when renaming.
- **Leaving provider versions unpinned** — an unrelated apply changes how resources are built; fix: pin the version and upgrade deliberately.
- **Creating a module for a single use** — indirection without reuse; fix: extract the module when a second consumer exists.
- **Assuming an apply is all-or-nothing** — a partial failure leaves real resources; fix: reconcile state and declaration deliberately.

## Go deeper

- **Terraform** (`06-cloud-devops/07-terraform`) — the tool this declaration is written for.
- **State and planning** (`06-cloud-devops/07-terraform/02-state-and-planning`) — what makes the plan trustworthy, and the file that causes the most damage when mishandled.
