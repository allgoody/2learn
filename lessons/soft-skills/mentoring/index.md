---
title: Mentoring
type: skill
topic: soft-skills
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Mentoring is growing somebody else's skill through reviewing their work, pairing on it, and asking questions that make them think rather than answers that make the task go faster. It includes knowing when to let someone struggle and when to step in, which is the part most people get wrong.

## Why it matters

The alternative to mentoring is a team where one person is the only one who can do a thing, and a queue that forms behind them. It also compounds: an hour spent explaining a debugging approach saves that hour every time the same problem reappears, across everyone the person later helps. The failure mode is subtler than neglect — a mentor who takes the keyboard finishes the task in ten minutes and teaches that the other person is not to be trusted with it.

## Core ideas

### Review the approach as well as the code

Comment on the decision — the module boundary, the error handling, the test that was left out — rather than on style that a formatter can settle. Ask what alternatives were considered.

```text
Useful    "What happens here if the queue is empty?"  (leads to the fix)
Useful    "This function does three things; which one is the test for?"
Not useful "nit: rename this variable"  (a tool can do this)
```

### Pair with the keyboard changing hands

Alternate: one drives, one navigates, then swap. The person learning has to make decisions at the keyboard, which is where the learning happens. If you keep the keyboard, you are doing the work and they are watching.

### Ask before telling

A question that surfaces the gap lets the person build the model; an answer hands over a fact. Ask "what have you tried?" and "what do you expect to happen?" before explaining. Save the direct answer for when they are genuinely stuck and the clock matters.

### Let them struggle, on a timebox

Productive struggle is where the skill forms, and it stops being productive when the person is lost rather than thinking. Agree the timebox in advance.

```text
"Give it twenty minutes. If you are still stuck, message me with
 what you tried and what you expected" -> the message alone often
 produces the answer before you read it.
```

### Say when you do not know

A mentor who invents an answer teaches a wrong one and destroys trust in the rest. "I do not know; here is how I would find out" is the more useful answer, and it demonstrates the method rather than the fact.

## Practice

### Review one piece of work for approach, not style

Take a pull request and instead of correcting it, write three questions about the decisions it makes.

Done when: the author makes at least one change that you did not ask for directly, because the question surfaced it.

### Run one paired session with keyboard swaps

Pair for an hour on a task the other person has not done before, swapping who drives every twenty minutes.

Done when: the other person has made the key decisions at least once and can describe the approach back to you.

## Common mistakes

- **Taking the keyboard** — the task finishes and the learning does not; fix: swap who drives and let them make decisions.
- **Answering immediately** — the question that would have produced the model is wasted; fix: ask what they tried and expected first.
- **Reviewing style instead of approach** — the comments are forgettable and the design stays unexamined; fix: ask about decisions and alternatives.
- **Struggling with no timebox** — the person is lost rather than thinking and loses confidence; fix: agree the limit and ask for a specific message.
- **Pretending to know** — a wrong answer is taught with authority; fix: say you do not know and show how you would find out.

## Go deeper

- **Communication** (`soft-skills/communication`) — read this first; the questioning and explaining skills this builds on.
- **Teamwork & Collaboration** (`soft-skills/teamwork-collaboration`) — the team-level version of the same habits.
- **Code Review** (`cs-fundamentals/code-review`) — reviewing code well, which is most of the day-to-day mentoring.
- **Technical Presentation** (`soft-skills/technical-presentation`) — the one-to-many form of explaining decisions.
