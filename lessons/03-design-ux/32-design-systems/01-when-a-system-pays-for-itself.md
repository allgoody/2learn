---
title: When a system pays for itself
prereqs: []
---

## What it is

A design system is an investment: someone has to design, document, build and maintain it. Deciding whether it pays means counting how often the same patterns are rebuilt and by how many people, and comparing that cost with the cost of building and governing the system.

## Why it matters

A system built too early freezes decisions that were not yet understood, and becomes a brake on the product. A system built too late means rewriting thirty buttons and every screen that used them. Both failures are common, and both come from treating a design system as a matter of maturity rather than arithmetic.

## Core ideas

### Count the duplication first

List the patterns and count the places they are implemented. Two implementations of a button is not a problem; eleven is a system.

```text
Pattern     Implementations   Divergent variants
Button      11                4
Modal        7                5
Form field   9                6
Empty state  3                3
```

The last row is not yet worth systematising; the middle two are.

### Multiply by the change rate

A pattern that never changes is cheap to duplicate. A pattern that changes every quarter, in eleven places, is where the cost accumulates. Multiply the count by how often it moves.

### Count the builders, not the screens

A single designer working alone does not need a shared vocabulary so much as a personal habit. The system becomes worth it when three people must produce the same thing without talking to each other.

### Choose the smallest scope that pays

A token set, a button and a form field may be enough for the first six months. A system that covers everything on day one is a project with no feedback and a large surface to govern.

```text
Phase 1  tokens + 3 primitives      one quarter, one team
Phase 2  + forms and layout         after phase 1 is adopted
Phase 3  + patterns and templates   only if reuse keeps rising
```

### Say no when the arithmetic does not work

A product with one screen, a prototype, or a one-off campaign site does not need a system. Saying so early is cheaper than building a system nobody maintains.

## Practice

### Run the duplication count

Take five patterns in your product, count their implementations and variants, and estimate how often each changes.

Done when: you can name the two patterns whose count multiplied by change rate is highest, and whether a system would save more than it costs.

### Write a one-quarter scope

Write the smallest first phase: the tokens and the three to five components that cover the most reused patterns.

Done when: the scope names the components, the consumers and the date at which you will re-measure the duplication.

## Common mistakes

- **Building a system with nothing to systematise** — a large project with one consumer; fix: count duplication and change rate first.
- **Systematising everything at once** — a large surface to govern before any of it is proven; fix: start with the highest-count primitives.
- **Counting screens rather than builders** — the reuse benefit is assumed rather than measured; fix: count the people who must produce the same thing.
- **Ignoring the change rate** — a cheap static pattern is systematised and never used; fix: weight the count by how often the pattern moves.
- **Never re-checking the arithmetic** — the system grows after the duplication has gone; fix: re-measure the count each quarter and shrink the scope if it drops.

## Go deeper

- **Design Systems** (`03-design-ux/32-design-systems`) — the track this first decision opens.
- **Component API and documentation** (`03-design-ux/32-design-systems/02-component-api-and-documentation`) — what to build once the answer is yes.
- **UI Components** (`02-frontend/12-ui-components`) — the component practice this scales up.
- **Design Tokens** (`03-design-ux/41-design-tokens`) — often the first and cheapest piece of a system.
