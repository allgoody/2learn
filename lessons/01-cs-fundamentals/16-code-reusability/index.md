---
title: Code Reusability
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/08-clean-code"]
related: []
---

## What it is

Code reusability is the practice of writing a piece of behaviour once and calling it from more than one place, so that two callers cannot disagree about it. The value is real: a rule that lives in one function has one place to change, while the same rule copied into two files has one place to change and one place to forget. The catch is that reuse is a bet about the future — you are claiming that every caller will always want the same thing — and the bet grows more expensive with each caller it covers: a helper called from 2 places has to be right for 2 callers, a helper called from 20 places has to be right for 20 at once.

## Why it matters

Duplicate logic is the most reliable source of inconsistency, and the inconsistency is silent. A password minimum of 8 characters written in the signup form and copied into the password-reset form stays correct until someone raises one of the two to 12: the same password is then accepted at signup and rejected on reset, and no test fails, because each file is consistent with itself. Over-abstraction fails in the other direction and fails less visibly: a helper with 5 boolean parameters can be called in 2^5 = 2 * 2 * 2 * 2 * 2 = 32 different combinations, and a reader who wants to know what one call site does must work through the parameters and then find their call site among the 32 cases. The 2 failures also differ in when they are paid for. Duplication is paid at edit time, a few minutes per copy, and only when the rule changes; a bad abstraction is paid by every reader of every caller, on every change, from the day it is written.

## Core ideas

### Two occurrences are not evidence

Two blocks that look alike today say nothing about whether they will change together tomorrow. What they do tell you is the bill: with the rule written in 2 places, 1 future change costs 2 edits, and skipping the second edit leaves 2 files that disagree. Wait for the third occurrence before extracting, because 3 copies show the axis along which the rule actually varies — the signup limit, the reset limit and the API limit are 3 values of one limit that varies by entry point, not 3 unrelated rules. Extract on the second sighting and you are guessing at that axis, and the guess usually arrives a month later as a parameter.

```ts
const base = 40.00;             // supplier price for one unit, in pounds
const retail = base * 1.20;     // shop price:    40.00 * 1.20 = 48.00
const wholesale = base * 1.07;  // trade price:   40.00 * 1.07 = 42.80
```

### Extract the behaviour, not the shape

The duplication that costs money is duplicated knowledge: one rule, one business constant or one protocol detail written twice. Two functions built from the same lines that answer different questions are not duplication, and merging them couples two decisions that should stay separate. Ask what each block means — who sets its numbers, and what would have to change for its answer to change — before asking whether it looks the same.

```ts
const isAdult = (age) => age >= 18;   // 18 — the age the law calls an adult
const isSenior = (age) => age >= 65;  // 65 — the age the discount policy calls senior
```

Same shape, same comparison operator, and 2 different owners: the 18 comes from legislation and the 65 comes from a pricing policy. Merging them behind `isOldEnough(age, threshold)` would mean one comment thread deciding both.

### A shared function is a contract with every caller

The moment two places call the same function, each caller constrains what that function may do. Adding 1 optional parameter for 1 caller changes the function for all of them: the number of legal call shapes doubles, and the callers that ignore the new parameter still have to be re-read before anyone can be sure they are unaffected. On a helper with 4 boolean parameters, adding a 5th takes the shape count from 2^4 = 16 to 2^5 = 32, so 1 small convenience for 1 caller doubles the surface that every other caller lives with.

```text
7 call sites, 1 caller wants to skip validation
  before: saveOrder(order)                                 1 call shape
  after:  saveOrder(order)                                 2 call shapes
          saveOrder(order, { skipValidation: true })       6 call sites
                                                          unaffected in behaviour,
                                                          re-read anyway
```

Share what is genuinely stable — a concept with a name, a rule the business defines once — rather than a convenient handful of lines that happens to look alike today.

### Composition over inheritance for reuse

Inheritance reuses by declaring that one thing is a kind of another, a claim you can only take back by editing every subclass. Composition reuses by holding one thing inside another and delegating, a claim you can revise at 1 call site. The reuse that survives contact with change therefore comes from small pieces combined where they are read: a wrapper that adds retrying to a client delegates 1 method and is removed by deleting 1 line from the caller; put the same retry in a base class with 8 subclasses and it is inherited by all 8, so removing it means editing 8 classes.

```ts
class RetryingClient {
  constructor(private inner: Client) {}   // 1 field: the client being wrapped
  send(request) {
    // 3 = the number of attempts the wrapper allows
    for (let attempt = 1; attempt <= 3; attempt++) {
      try { return this.inner.send(request); }
      catch (error) { if (attempt === 3) throw error; }
    }
  }
}
```

### Duplication in tests is usually fine

Tests may repeat setup that production code shares, because a test that reads on its own is worth more than one that hides its preconditions in a helper. A fixture shared by 40 tests accumulates the union of what those 40 tests need: it ends up holding 12 fields, the test in front of you uses 3 of them, and nothing in that test says which 3. The repetition a test carries — the 4 lines that build the order under test — is what makes the test checkable by reading alone, which is the quality you are paying for.

```text
fixture shared by 40 tests
  fields it must hold      = the union of what all 40 need  = 12 fields
  fields 1 test reads      = 3 of those 12
  which 3?                 nothing in the test says
```

## Practice

### Find real duplication and prove the axis

Search your code for a rule or constant that appears more than once: a validation limit, a tax rate, a permission check. For each occurrence write down how many call sites it governs and what would have to change for it to move.

Done when: you have either merged the occurrences behind one named rule, or written down a specific reason why they must stay separate — one that names the decision each copy belongs to.

### Undo an over-abstraction

Find a shared helper with a parameter that only some callers pass. Count the call sites, count how many pass the parameter, and give the remaining callers a small function that does exactly what they need.

Done when: every call site is readable without opening the helper, and no caller passes a parameter it does not use — say, 3 named functions where there was 1 with 2 flags.

## Common mistakes

- **Extracting on the second sighting** — the abstraction guesses at a variation that has not happened yet, and the guess arrives as a parameter the second caller never needed; fix: wait for the third occurrence, where the part that varies has a name.
- **Merging code that looks alike but means different things** — one change to a rule silently alters the other behaviour, and both tests still pass because each covers only its own path; fix: check whether the two blocks would ever change for different reasons, and keep them apart if they would.
- **Adding a boolean parameter to serve one caller** — 1 flag makes 2 call shapes, and a 5th flag makes 2^5 = 32, which every reader of every caller must narrow down to their own; fix: give that caller its own named function.
- **Building a framework for two consumers** — configuration, hooks and options nobody asked for, sized for callers that do not exist yet; fix: write the simple version and generalise when a third case arrives with its own requirements.
- **Forcing tests through a shared fixture** — a fixture serving 40 tests grows to the union of their needs, so a reader must work out which 3 of its 12 fields matter for the test in front of them; fix: let each test set up what it needs.

## Go deeper

- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — naming and function size come first, because a shared function with a name nobody can read is a worse problem than the 2 lines it removed.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — the safe mechanics for merging 2 copies into 1 or splitting 1 function into 3, once the tests are in place.
- **SOLID Principles** (`01-cs-fundamentals/09-solid-principles`) — the design rules that keep a shared abstraction open to the caller that arrives next.
