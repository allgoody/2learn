---
title: Voice, rules and maintenance
prereqs: ["03-design-ux/08-content-strategy/01-content-audit-and-inventory"]
---

## What it is

After the audit comes the short document that stops the rot: the voice the product writes in, the naming rules for its concepts, and who is responsible for keeping both true. It should fit on a page, or nobody will read it.

## Why it matters

Consistency is what makes content feel trustworthy, and consistency does not survive several writers without rules. The alternative is a style guide nobody opens, or a review bottleneck in which one person approves every string. A one-page voice and naming document with a named owner sits between the two: writers self-serve the rules, and the owner settles the genuinely new cases.

## Core ideas

### Voice is three adjectives and their limits

Pick three, and say what each one rules out. "Clear" means nothing until it rules out "we say 'authentication' in an error message".

```text
Plain      — say "sign in", never "authenticate"
Direct     — one idea per sentence; no "please note that"
Human      — acknowledge the problem; never blame the person
Limits: no jokes in errors, no exclamation marks in confirmations
```

### One word per concept, written down

A naming table mapping each concept to one user-facing term, one internal term and the ones that are banned. This is the single highest-yield artefact in the document.

```text
Concept        User-facing term   Banned
subscription   plan               package, tier, membership
invoice        bill               statement, receipt
delete         delete             remove, archive, trash
```

### Rules for the recurring hard cases

Dates, numbers, currency, capitalisation, buttons and empty states. Ten rules cover most of what writers argue about, and a short example for each is enough.

### Name an owner and a route for questions

One person, with a defined way to ask. Without an owner, the rules are a wish; with a committee, nobody can answer in time.

### Wire the rules into the tools

Put the strings in one file or one component library, so the default is the right words. A rule that requires remembering will be broken; a rule encoded in the component cannot be.

## Practice

### Write the one-page standard

Produce a page containing three voice adjectives with their limits, a naming table of at least eight concepts, five formatting rules and the owner's name.

Done when: a writer who has never met the team can follow it while writing a new screen without asking a question.

### Apply it to one screen end to end

Rewrite every string on one screen against the standard. Note each place the standard was silent.

Done when: the screen uses only the approved terms, and any silence you found has been added as a rule.

## Common mistakes

- **A style guide nobody reads** — the document is long and the product stays inconsistent; fix: cut it to one page and keep the naming table.
- **Rules with no owner** — the first argument has no tie-breaker and the rules are abandoned; fix: name one owner and a way to ask them.
- **Voice adjectives with no limits** — "friendly" justifies anything; fix: state what each adjective rules out.
- **Several words for one concept** — users cannot search, translate or trust the product; fix: keep the naming table and delete the banned synonyms from the code.
- **Rules that live outside the tools** — writers cannot follow them under deadline; fix: encode the standard strings in the component library.

## Go deeper

- **Content audit and inventory** (`03-design-ux/08-content-strategy/01-content-audit-and-inventory`) — the audit these rules are derived from.
- **Content Strategy** (`03-design-ux/08-content-strategy`) — the track this chapter closes.
- **UX Writing & Microcopy** (`03-design-ux/07-ux-writing-microcopy`) — applying the standard string by string.
- **Design Tokens** (`03-design-ux/41-design-tokens`) — the equivalent encoding trick for visual values.
