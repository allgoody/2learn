---
title: Prototype and test
prereqs: ["03-design-ux/02-design-thinking/01-empathise-define-ideate"]
---

## What it is

The second half of the loop builds the cheapest artefact that can answer the open question, then puts it in front of someone from the group you defined for. A prototype here is an instrument for learning, not a draft of the product: paper, a clickable flow or one hard-coded screen all qualify if they produce evidence.

## Why it matters

Argue about a design in a meeting and the loudest confident opinion wins; put it in front of five people and the argument ends in twenty minutes. Testing early also changes what gets built, not merely how it looks — the commonest outcome of a first test is that the problem statement was slightly wrong, which is far cheaper to learn from paper than from released code. A prototype that answers its question is finished, however rough it looks.

## Core ideas

### Match prototype fidelity to the open question

Ask what you still do not know, then build the least finished thing that resolves it. Navigation and wording can be tested on paper; timing, motion and accessibility need something interactive.

```text
Question                          Cheapest artefact
Is the label understood?          Paper card, hand-written
Is the order of steps logical?    Four linked screens, greyscale
Does the animation feel right?    One interactive screen, real timing
```

Building higher fidelity than the question needs costs days and teaches nothing extra.

### Test with people from the group you defined for

A test with colleagues measures politeness and familiarity. Recruit from the group in your problem statement — the picker, the first-time buyer, the support agent. Five people from that group will surface most of the obvious faults; the tenth rarely finds a new class of problem.

### Record what happens, not what people say about it

Narrate the session against the artefact. Write down the moment of hesitation, the misread label, the click on a heading that is not a link.

```text
P3 read "Save draft" and asked "does that send it?"
P3 clicked the heading, waited, then used the footer button
```

"What do you think of this design?" invites a compliment. "Show me how you would send this" invites behaviour.

### Close with a decision

A test that ends in "interesting" has wasted the participants' time. Each finding becomes keep, change or abandon, with an owner and a date — and occasionally a returned-to problem statement, which is the loop working rather than failing.

## Practice

### Paper-prototype one screen and test it with five people

Draw one screen of your flow on paper with a marker. Run five sessions of ten minutes, giving each person a task rather than a tour. Keep a single sheet of notes per person, split into what they did and what they said.

Done when: you have five note sheets, at least three repeated observations, and one sentence naming what surprised you.

### Write the decision memo

Turn your notes into a one-page memo: the question tested, the artefact, three findings with the evidence beside each, and a keep/change/abandon line per finding.

Done when: every finding has a decision and a next action, and nothing on the page reads "needs more research".

## Common mistakes

- **Prototyping before the question is clear** — the artefact becomes the deliverable and the test measures nothing; fix: write the open question down before opening the design tool.
- **Testing with whoever is nearby** — colleagues know the product too well and are too kind; fix: recruit from the group named in the problem statement.
- **Asking what people think** — you collect opinions about taste rather than evidence about use; fix: set a task and watch the attempt.
- **Polishing the prototype** — visual detail consumes the time the next iteration needs and biases you against negative findings; fix: stop when the artefact can answer its question.
- **Ending without a decision** — the findings evaporate and the next test repeats the last one; fix: assign keep, change or abandon to every finding before the team disperses.

## Go deeper

- **Empathise, define, ideate** (`03-design-ux/02-design-thinking/01-empathise-define-ideate`) — the problem statement this test is measuring against.
- **Design Thinking** (`03-design-ux/02-design-thinking`) — where the loop goes after a test returns a new question.
- **Prototyping** (`03-design-ux/40-prototyping`) — fidelity choices in more depth, once structure is settled.
- **Usability Testing** (`03-design-ux/33-usability-testing`) — moderating a session well and turning notes into severity-ranked findings.
