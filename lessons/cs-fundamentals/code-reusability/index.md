---
title: Code Reusability
type: skill
topic: cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: ["cs-fundamentals/clean-code"]
related: []
---

## What it is

Code reusability is the practice of writing a piece of behaviour once and using it in more than one place. The value is real: a rule that lives in one function cannot disagree with itself. The catch is that reuse is a bet about the future — you are claiming that two callers will always want the same thing — and that bet is often wrong. This is the tension: factor shared behaviour once, without inventing an abstraction that costs more than the duplication it removed.

## Why it matters

Duplicate logic is the most reliable source of inconsistency. Two copies of a validation rule drift, one gets a bug fix and the other does not, and the system behaves differently depending on which path the request took. But over-abstraction fails in the other direction, and it fails less visibly: a shared helper that grows a parameter for every caller becomes harder to understand than the copies it replaced, and every change risks every caller at once. The cost of duplication is paid at edit time; the cost of a bad abstraction is paid every time anyone reads the code.

## Core ideas

### Two occurrences are not evidence

Two blocks that look alike today say nothing about whether they will change together tomorrow. A rule of three is a reasonable default: wait until the third occurrence before extracting, because by then you can see the axis along which it varies. Extract on the second sighting and you are guessing, and the guess usually shows up as a flag parameter added a month later.

```ts
// two similar blocks are not automatically one function
const price = base * 1.2;        // retail
const cost = base * 1.07;       // wholesale
```

### Extract the behaviour, not the shape

The dangerous duplication is duplicated knowledge: the same rule, business constant or protocol detail written twice. Two functions with the same lines that answer different questions are not duplication, and merging them couples decisions that should stay separate. Ask what the code means before asking whether it looks the same.

```ts
// same shape, different rules — keep them apart
const isAdult = (age) => age >= 18;         // legal
const isSenior = (age) => age >= 65;       // pricing
```

### A shared function is a contract with every caller

The moment two places call the same function, each caller constrains what it may do. Adding a parameter for one caller is a change to everyone; changing the return shape breaks them all. That is a reason to share only things that are genuinely stable — a concept with a name, a rule the business defines once — rather than a convenient handful of lines.

### Prefer composition to inheritance for reuse

Inheritance reuses by making one thing a kind of another, a strong and permanent claim. Composition reuses by holding one thing inside another and delegating, a claim you can revise. The reusability that survives contact with change comes from small pieces combined at the call site, not from a deep hierarchy where behaviour is assembled far from where it is read.

```ts
class RetryingClient {
  constructor(private inner: Client) {}
  send(request) { /* retry loop delegating to this.inner */ }
}
```

### Duplication in tests is usually fine

Tests may repeat setup that production code shares, because a test that reads independently is worth more than one that hides its preconditions in a helper. Forcing tests through a shared fixture to remove a few repeated lines often produces a fixture that every test must be understood through. Let tests be repetitive; keep them legible.

## Practice

### Find real duplication and prove the axis

Search for a rule or constant that appears more than once — a validation limit, a tax rate, a permission check. Write down where it occurs and how each place would change if the rule changed.

Done when: you have either merged them into one named rule, or written down a specific reason why they must stay separate.

### Undo an over-abstraction

Find a shared helper with a parameter only some callers use. Give each caller a small function that does exactly what it needs, and delete the flag.

Done when: every call site is readable without opening the helper, and no caller passes a parameter it does not use.

## Common mistakes

- **Extracting on the second sighting** — the abstraction guesses at a variation that has not happened; fix: wait for the third occurrence and a named concept.
- **Merging code that looks alike but means different things** — one change to a rule now silently alters the other behaviour; fix: check whether the two blocks would ever change for different reasons.
- **Adding a boolean parameter to serve one caller** — the helper becomes a switch statement with a friendly name; fix: give that caller its own function.
- **Building a framework for two consumers** — configuration, hooks and options nobody asked for; fix: write the simple version and generalise when a third case arrives.
- **Forcing tests through a shared fixture** — the fixture becomes the hardest part of the suite; fix: let each test set up what it needs.

## Go deeper

- **Clean Code** (`cs-fundamentals/clean-code`) — naming and function size come first; a shared function with a bad name is a worse problem than the duplication.
- **Refactoring** (`cs-fundamentals/refactoring`) — the safe mechanics for merging or splitting code after the tests are in place.
- **SOLID Principles** (`cs-fundamentals/solid-principles`) — the design rules that keep a shared abstraction open to new callers.
