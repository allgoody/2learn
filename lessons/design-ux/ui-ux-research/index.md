---
title: UI/UX Research
type: skill
topic: design-ux
tier: small
status: drafted
aliases: []
prereqs: ["design-ux/user-research"]
related: []
---

## What it is

UI/UX research is user research narrowed to the interface: what works, what confuses, what is missing. It asks whether people can find, understand and complete the thing in front of them, rather than what the product should be. The methods overlap with general research, but the question, the timing and the artefacts are all tied to a design that already exists in some form.

## Why it matters

Once a design exists, the useful question changes from "is this the right thing?" to "can anyone use it?". Teams skip this step because they have already asked users what they wanted and assume the translation into screens is obvious. It rarely is: the wording of one button, the order of two fields and the visibility of a status can each decide whether the task completes. Interface research is also the cheapest kind, because the artefact and the question are both in hand.

## Core ideas

### One question per session

Decide whether you are testing comprehension (do they know what this means), findability (can they find it), or completion (can they finish). A session that tries to answer all three at once answers none cleanly.

```text
Bad prompt:  "Try out the new dashboard and tell me what you think."
Good prompt: "You need the orders from last Tuesday. Show me where you'd look."
```

### Test the words before the layout

Comprehension fails at the label far more often than at the structure. Put the strings in front of five people — headings, buttons, error messages — before wireframing anything around them.

### Watch the first thirty seconds

Where people look and what they try first predicts the rest of the session. Record that moment before they settle into search behaviour or click the most prominent thing out of habit.

### Use the real content and the real state

Lorem ipsum and empty accounts hide the failure modes. Load something with too many items, a long name, a missing image and a permission the user does not have.

### Report at the level of the element

"Users found it confusing" is not actionable. "Four of five read 'Save draft' as 'Send'" tells you which string to change.

## Practice

### Run a five-second comprehension check

Show one screen for five seconds and take it away. Ask each person what the screen was for and what they would do first. Repeat with five people.

Done when: you can name the one element most people misread, and the replacement wording you will test next.

### Test findability with a task card

Write a single task on a card — "find the order from last Tuesday" — hand it over and say nothing else. Note the first click and the time to success.

Done when: you have one first-click record per session and can say whether the first click was the intended path.

## Common mistakes

- **Asking what people think of the design** — you collect taste, not evidence about use; fix: set a task and watch the attempt.
- **Testing with lorem ipsum** — realistic failure modes stay hidden; fix: load real content with long names, missing images and many rows.
- **Guiding the participant after ten seconds** — the finding is lost and replaced by politeness; fix: script a neutral prompt and wait.
- **One session treated as a verdict** — a single participant's reaction becomes a redesign; fix: run five and report counts.
- **Findings at the level of the whole screen** — the fix is unclear; fix: report the exact element, its reading and the suggested wording.

## Go deeper

- **User Research** (`design-ux/user-research`) — read this first; interface research uses the same discipline.
- **Usability Testing** (`design-ux/usability-testing`) — the formal version of the task-based session.
- **UX Writing & Microcopy** (`design-ux/ux-writing-microcopy`) — fixing the strings that comprehension testing turns up.
- **Heuristic Evaluation** (`design-ux/heuristic-evaluation`) — an expert pass to run between user sessions.
