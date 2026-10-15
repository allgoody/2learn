---
title: Specifying behaviour testably
prereqs: []
---

## What it is

A testable requirement states behaviour that can be observed: an input or event, the condition under which it applies, and the required response. If two competent people cannot agree whether a running system satisfies it, it is not yet a requirement — it is a wish with a number attached.

## Why it matters

Ambiguity is not caught in review; it is caught in production by a user. The cost rises at every stage: an hour to fix the sentence, a day to fix the design, a release to fix the code and the expectations built on it. Writing testably is also what makes the acceptance criteria reusable — the same sentence becomes the test case, so the specification and the verification cannot drift apart.

## Core ideas

### The three parts: trigger, condition, response

Write what causes the behaviour, under what circumstances, and what must happen. Vague qualifiers become numbers.

```text
Untestable  The system should handle large uploads reliably.
Testable    When a user uploads a file larger than 100 MB,
            the system resumes the upload after a network interruption
            from the last confirmed chunk, without user action.
```

The second version can be tested three ways: the threshold, the resume, and the absence of user action.

### Replace the weasel words

Each of these hides a decision: fast, robust, user-friendly, efficient, secure, appropriate, several, reasonable, if necessary. Give the number or delete the sentence.

```text
fast        -> responds within 300 ms at the 95th percentile
several     -> three or more, named explicitly
secure      -> encrypts at rest with AES-256 and in transit with TLS 1.2+
if necessary-> state the condition under which it happens
```

### Use one modal, deliberately

"Must" is mandatory, "should" is a preference to be argued, "may" is optional. Teams that use them interchangeably lose the ability to tell a legal obligation from a nice-to-have.

### Write the failure behaviour, not only the happy path

What happens when it is unavailable, the input is invalid, the user lacks permission, or the operation is partially complete. This is where the real requirements are.

### One requirement per sentence

A sentence with "and" is usually two requirements with different priorities, and it cannot be traced or tested as one.

## Practice

### Rewrite five bad requirements

Take five statements from a real document and rewrite each into trigger, condition and response.

Done when: each rewrite names a number or an explicit condition, and you can write a test case from it without asking the author anything.

### Convert one requirement into acceptance criteria

Take one requirement and write the checks that would prove it satisfied, including at least two failure cases.

Done when: someone else can run the checks against a running system and reach the same verdict you would.

## Common mistakes

- **Weasel words left in** — each one hides an unmade decision; fix: give the number or delete the sentence.
- **A requirement that cannot fail** — it says nothing and cannot be tested; fix: state the condition under which it is false.
- **Several requirements in one sentence** — priorities and traces become impossible; fix: one requirement per sentence.
- **Only the happy path** — the error behaviour is invented during the build; fix: specify unavailable, invalid, unauthorised and partial cases.
- **Modals used interchangeably** — a legal obligation reads like a preference; fix: define must, should and may and hold to them.

## Go deeper

- **Requirements Engineering** (`04-product-process/05-requirements-engineering`) — the track this chapter opens.
- **Reviewing and tracing requirements** (`04-product-process/05-requirements-engineering/02-reviewing-and-tracing-requirements`) — catching what the rewriting missed.
- **User Acceptance Testing** (`04-product-process/16-user-acceptance-testing`) — where these statements are checked against the built system.
- **User Story** (`04-product-process/12-user-story`) — the lighter form when a full specification is not warranted.
