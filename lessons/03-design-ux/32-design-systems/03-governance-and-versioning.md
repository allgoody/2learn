---
title: Governance and versioning
prereqs: ["03-design-ux/32-design-systems/02-component-api-and-documentation"]
---

## What it is

Governance is who may change the system, how a change is proposed and approved, and how it reaches every product that consumes it. Versioning is how those changes are named and released so a team can move to the new version deliberately rather than discovering it in production.

## Why it matters

The component library is the easy part. Systems die of unmanaged change: either a central team becomes a bottleneck and product teams fork the library to keep shipping, or anyone may change anything and the system loses its consistency within a quarter. Versioning is what makes change survivable — a breaking change is announced, numbered and adopted on a schedule instead of arriving unannounced.

## Core ideas

### Name the owner and the route

One small team, one place to propose a change, one stated turnaround. Without an owner the system decays; with a committee it stalls.

```text
Proposal       one page: the change, the call sites affected, the migration
Reviewed by    the system owner, within five working days
Accepted       owner implements, or consumer implements with owner review
```

### Separate additive from breaking change

Additive changes — a new variant, a new optional token — ship immediately. Breaking changes — renaming, removing, changing a default — need a version, a migration note and a deprecation window.

```text
Minor    new variant or token added, nothing existing changes
Patch    fix to rendering or a documented state
Major    renamed or removed API, changed default, new required input
```

### Give a deprecation window and a deadline

Mark the old API as deprecated, say what replaces it, and set the date it is removed. Deprecation without a date is a permanent second API.

### Automate the compatibility check, not the judgement

A visual regression check and a build that fails on removed exports catch accidental breaks. Deciding whether a change is worth making is still a human decision.

### Keep every consumer on one supported version

Several live major versions means every fix is made several times and the consistency argument collapses. Set a date by which consumers must upgrade, and offer the migration as a task rather than a suggestion.

## Practice

### Write the governance page

Write half a page: the owner, the proposal route, the turnaround, the additive and breaking definitions and the deprecation window.

Done when: a consumer knows exactly how to request a change and how long they have to migrate.

### Run one deprecation end to end

Pick an existing component or token, mark it deprecated, name the replacement and set a removal date. Migrate one consumer and record how long it took.

Done when: one consumer has migrated, the removal date is written where they can see it, and the effort is recorded for the next one.

## Common mistakes

- **No owner** — nothing is decided and consumers fork; fix: name one owner with a stated turnaround.
- **Central approval for everything** — the system becomes a bottleneck and is bypassed; fix: let additive changes ship without review.
- **Breaking change without a version** — consumers discover the change in production; fix: number it, document the migration and set a deprecation window.
- **Deprecation with no deadline** — two APIs live forever; fix: set a removal date and publish it.
- **Many live majors** — every fix is multiplied and consistency is lost; fix: agree an upgrade date and provide the migration.

## Go deeper

- **Design Systems** (`03-design-ux/32-design-systems`) — the track this chapter governs.
- **Adoption inside a team** (`03-design-ux/32-design-systems/04-adoption-inside-a-team`) — the other half of making a system stick.
- **Component API and documentation** (`03-design-ux/32-design-systems/02-component-api-and-documentation`) — the API these versions refer to.
- **Design Tokens** (`03-design-ux/41-design-tokens`) — the part of a system most often versioned and renamed.
