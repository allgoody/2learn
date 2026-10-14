---
title: Design Patterns
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: ["cs-fundamentals/solid-principles"]
related: []
---

## What it is

A design pattern is a named solution to a problem that keeps recurring in object-oriented code. The name is the point: saying "wrap it in an adapter" communicates a shape, a set of collaborators and a cost in three words. Patterns are not building blocks to be applied wherever a gap appears, and they are not a checklist of good design. Each one buys flexibility in one direction and charges for it in complexity everywhere else.

## Why it matters

The shared vocabulary is genuinely useful. Design discussions collapse from paragraphs to a sentence, and a reviewer can say "this is a strategy with one implementation" and be understood immediately. The failure mode is the opposite of the benefit: a pattern applied before the variation it handles actually exists adds indirection and hides a direct call behind two hops that will never be needed. The skill is recognising the recurring problem, naming the cost of each solution, and choosing to apply one only when the problem is really there.

## In this track

1. **Why patterns are named** (`cs-fundamentals/design-patterns/01-why-patterns-are-named`) — what a pattern actually is, what it costs, and how to tell it apart from an idiom or an anti-pattern.
2. **The patterns that earn their keep** (`cs-fundamentals/design-patterns/02-the-patterns-that-earn-their-keep`) — the small set that solves real problems often enough to be worth knowing by heart.

## Prerequisites

- **SOLID Principles** (`cs-fundamentals/solid-principles`)

## Go deeper

- **Software Architecture** (`cs-fundamentals/software-architecture`) — the same idea of named trade-offs one level up, where the boundaries are modules rather than classes.
- **Code Reusability** (`cs-fundamentals/code-reusability`) — whether the shared shape is worth extracting at all, before you name it.
- **Refactoring** (`cs-fundamentals/refactoring`) — how to introduce a pattern into working code by small steps rather than designing it in advance.
