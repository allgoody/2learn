---
title: Design Patterns
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/09-solid-principles"]
related: []
---

## What it is

A design pattern is a named solution to a problem that keeps recurring in object-oriented code. The name is the point: saying "wrap it in an adapter" communicates a shape, a set of collaborators and a cost in three words, and a colleague who knows the catalogue can act on it without asking what you mean. Patterns are not building blocks to be applied wherever a gap appears, and they are not a checklist of good design. Each one buys flexibility in one direction and charges for it in complexity everywhere else, so each one is a decision rather than a default.

## Why it matters

The shared vocabulary is genuinely useful: a review comment that names a shape is 1 line to act on, while the same objection without a name is a conversation about taste. Design discussions collapse from paragraphs to a sentence, and a reviewer can say "this is a strategy with one implementation" and be understood immediately. The failure mode is the opposite of the benefit: a pattern applied before the variation it handles exists adds 1 or 2 hops to every call, puts 1 or 2 extra types in the codebase, and hides a direct call behind two hops that will never be needed. The skill is recognising the recurring problem, counting what each solution costs, and applying one only when the problem is really there.

## In this track

1. **Why patterns are named** (`01-cs-fundamentals/18-design-patterns/01-why-patterns-are-named`) — what a pattern actually is, what it costs, and how to tell it apart from an idiom or an anti-pattern.
2. **The patterns that earn their keep** (`01-cs-fundamentals/18-design-patterns/02-the-patterns-that-earn-their-keep`) — the small set that solves real problems often enough to be worth knowing by heart.

## Prerequisites

- **SOLID Principles** (`01-cs-fundamentals/09-solid-principles`)

## Go deeper

- **Software Architecture** (`01-cs-fundamentals/25-software-architecture`) — the same idea of named trade-offs one level up, where the boundaries are modules rather than classes.
- **Code Reusability** (`01-cs-fundamentals/16-code-reusability`) — whether the shared shape is worth extracting at all, before you name it.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — how to introduce a pattern into working code by small steps rather than designing it in advance.
