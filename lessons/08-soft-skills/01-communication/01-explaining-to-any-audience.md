---
title: Explaining to any audience
prereqs: []
---

## What it is

Explaining to any audience means starting from what the listener already knows and what decision they have to make, then choosing the vocabulary, the level of detail and the order accordingly. The same change is described in three ways to an engineer, a product manager and a support agent, and all three are accurate.

## Why it matters

A technically perfect explanation to the wrong audience produces a wrong decision. Present the internals of a caching layer to the finance lead and you get a question about cost that you cannot answer because you spent the meeting on latency. The reverse is worse in engineering: explaining a product need without the constraint that makes it hard and the estimate sounds arbitrary. Translating is a repeatable technique, and it is usually the difference between a good decision and an expensive one.

## Core ideas

### Start from the decision, not the details

Ask what the listener has to decide and give only what that decision needs. Everything else is an appendix or a link.

```text
To engineering   the constraint, the current design, the trade-off
To product       the options, the cost of each, the recommendation
To support       what changes for a user, and what to say if they ask
```

### Lead with the conclusion

State the recommendation first, then the reason. Someone who has to wait for your point to emerge will form their own opinion during your introduction and spend the rest of the time defending it.

```text
Weak  "We looked at three approaches, and the first was slower than
       expected, so we then tried... and eventually we decided..."
Sharp "I recommend the second approach. Here is why, and what it costs."
```

### Calibrate vocabulary to the listener's context

Define a term the first time you use it with each audience; then use it consistently. Avoid both jargon and the over-simplification that makes an engineer's decision look arbitrary — "we just need to make it faster" is as unhelpful as unexplained acronyms.

### Use one concrete example before any abstraction

An example anchors the explanation and lets the listener correct a misunderstanding early. Explain the caching change with one page and one user's request, then generalise.

### Check comprehension by asking for the next step

Do not ask "does that make sense?" — everyone says yes. Ask what they would do next, or what they think the risk is, and listen for what is missing.

## Practice

### Explain one change three ways

Take a change you have recently made and write three explanations: one for an engineer, one for a product manager, one for a support agent. Each under 120 words, all accurate.

Done when: each version leads with the conclusion, and a colleague in each of those roles can state the consequence for their own work without asking a question.

### Turn a rambling explanation into a headline

Record yourself explaining a decision, then rewrite the first thirty seconds as a single leading sentence.

Done when: the leading sentence names the recommendation and the cost, and the rest of the explanation only supports it.

## Common mistakes

- **Building up to the point** — the listener forms an opinion before hearing the recommendation; fix: lead with the conclusion.
- **One explanation for every audience** — it is either too detailed or too shallow for almost everyone; fix: write a version per decision-maker.
- **Undefined jargon** — the listener nods and acts on a misunderstanding; fix: define each term once, on first use with that audience.
- **Abstraction without an example** — nobody can correct a misunderstanding they cannot picture; fix: one concrete case first.
- **Asking "does that make sense"** — it collects reassurance; fix: ask for the next step or the perceived risk.

## Go deeper

- **Communication** (`08-soft-skills/01-communication`) — the track this chapter opens.
- **Disagreeing productively** (`08-soft-skills/01-communication/02-disagreeing-productively`) — the harder half of the same skill.
- **Technical Writing** (`04-product-process/08-technical-writing`) — the written form of explaining to a reader.
- **Technical Presentation** (`08-soft-skills/09-technical-presentation`) — explaining to a room that has to decide.
