---
title: Labelling
prereqs: []
---

## What it is

Labelling is choosing the words that appear in navigation, headings, buttons and links. A label is a promise about what is behind it, and the whole structure depends on that promise being kept.

## Why it matters

A user who cannot guess the right label will not find the content, and will often conclude the feature does not exist. This is the highest-leverage text in a product: one word decides whether a category is discovered. Unlike a paragraph, a label has no room to explain itself, so it has to be right the first time — and the words the team uses internally are almost never the words the user searches for.

## Core ideas

### Start from the user's words

Collect vocabulary from sessions, support tickets and site search queries. The words people type into a search box are the labels they already hold.

```text
Support ticket phrasing     Labelled in the product     Candidate label
"where's my stuff"          Order tracking              Where is my order
"my bill"                   Billing documents           Bills
"cancel my plan"            Subscription management     Cancel plan
```

### Concrete beats abstract

"Solutions" and "Resources" mean nothing; a noun that names the content or the task is guessable. Prefer a noun the user could say aloud.

### One concept, one label

Synonyms across a product read as different features. Keep a naming table: user-facing term, banned synonyms, and the one place each term is defined.

```text
Term: plan      banned: package, tier, membership
Term: bill      banned: invoice, statement, receipt
```

### Test the label alone

Ask five people what they expect to find behind a label before showing them the destination. The mismatch is the finding.

```text
Label: "Manage"
Answers: "settings?" "my account?" "delete things?" -> too vague
Label: "Your plan and bills"
Answers: "my subscription" x4 -> keep
```

### Watch the length on the smallest screen

A navigation label has to survive a narrow viewport and a translation. Aim for one or two words; a label that needs a sentence is a heading, not a navigation item.

## Practice

### Build a candidate label list

Take one section of your product, write the current labels, then for each write the phrase users actually use, sourced from tickets, search logs or sessions.

Done when: every label in the list has a sourced user phrase beside it, and you have flagged the ones where the two differ.

### Test five labels in isolation

Show five labels with no context and ask what the person expects to find. Then show the destination and note the gap.

Done when: you can name the two labels that consistently mislead, and you have a replacement word for each.

## Common mistakes

- **Internal project names in navigation** — users search for a concept the product named after its codebase; fix: label with the sourced user phrase.
- **Abstract category words** — "Resources" and "Solutions" promise nothing; fix: name the content or the task.
- **Synonyms for one concept** — the product reads as several products; fix: keep a naming table and remove the alternatives.
- **Labels that need explanation** — the user must open the destination to learn what it means; fix: test the label alone and rewrite until it predicts its content.
- **Choosing a label by committee taste** — the most familiar internal word wins; fix: test with people who did not build it.

## Go deeper

- **Information Architecture** (`design-ux/information-architecture`) — the track labelling sits at the top of.
- **Hierarchy and navigation** (`design-ux/information-architecture/02-hierarchy-and-navigation`) — arranging the labelled things.
- **Card Sorting** (`design-ux/card-sorting`) — where candidate labels and groupings come from.
- **UX Writing & Microcopy** (`design-ux/ux-writing-microcopy`) — the writing craft behind a two-word label.
