---
title: Component API and documentation
prereqs: ["design-ux/design-systems/01-when-a-system-pays-for-itself"]
---

## What it is

A component API is the interface a component offers its consumers: which inputs it accepts, which variants it allows, what it renders in each state and what it deliberately refuses to do. Documentation is the short page that states those properties, shows every variant and records the decisions behind them.

## Why it matters

A component with too many options is a component nobody can use consistently: give a button twelve props and every team will pass a different combination, and the consistency the system was built for disappears. A component with too few options gets forked on the first exception and drifts out of the system permanently. Documentation is what stops the second failure, because it tells a consumer what to do instead of forking.

## Core ideas

### Design the API from the uses, not the implementation

Collect the real call sites first and design the smallest interface that covers them. A prop nobody asked for is speculative and will be used inconsistently.

```text
Usage in the product:
  primary action on a page        "primary"
  secondary action beside it      "secondary"
  destructive action              "danger"
  a link styled as a button       variant "link"
-> variant: primary | secondary | danger | link
-> everything else (size, icon) is separate and named
```

### Prefer a small set of named variants to many independent props

Independent booleans combine into states nobody designed: `large` and `ghost` and `loading` and `icon-only` is not one of the four buttons anyone drew. Named variants keep the set finite and reviewable.

### Every component documents its states, not only its default

Loading, disabled, error, empty and long content. A consumer who cannot see the state has to invent it, and invents it differently from the next team.

### Write a do-and-do-not for each component

Two or three lines each. "Do use a danger button for an action that cannot be undone. Do not use it for a serious-looking primary action." This is the text that prevents forking.

### Document the decision, not only the result

Record why the variant set is what it is and what was rejected. The next person to propose a fifth variant can then see the argument rather than repeat it.

## Practice

### Design one component API

Pick the most duplicated pattern, collect five real call sites, write the API with its variants and states, then implement it and migrate the sites.

Done when: all five call sites use the component with no local override, and the API has no option that none of them uses.

### Document one component fully

Write its page: purpose, variants, every state, do and do-not, and one recorded decision.

Done when: someone who has never used the component can build a correct screen from the page alone, without reading its source.

## Common mistakes

- **A prop for every possibility** — the combinations become unpredictable and the visual result drifts; fix: name a small set of variants and refuse the rest.
- **Forking on the first exception** — the exception ships outside the system and the fork accumulates; fix: document do and do-not and offer a supported alternative.
- **Documentation with only the default state** — consumers invent loading and error states differently; fix: show every state on the page.
- **Recording the result without the decision** — the same proposal is relitigated every quarter; fix: write down what was rejected and why.
- **No migration of existing call sites** — the system ships alongside the old code and both stay; fix: migrate the call sites as part of the component's definition of done.

## Go deeper

- **Design Systems** (`design-ux/design-systems`) — the track this chapter belongs to.
- **When a system pays for itself** (`design-ux/design-systems/01-when-a-system-pays-for-itself`) — the decision that precedes component work.
- **UI Components** (`frontend/ui-components`) — the implementation-side view of the same API question.
- **Governance and versioning** (`design-ux/design-systems/03-governance-and-versioning`) — what happens when the API has to change.
