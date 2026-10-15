---
title: Usability
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Usability is a quality of a design: how easily a real user reaches their goal without error or confusion. It is not an activity and not a test — it is the property you are trying to achieve. Usability testing is the separate activity of watching people attempt tasks to find out how usable something is; the two are often conflated and they are not the same skill.

## Why it matters

Usability is the difference between a feature that exists and a feature that is used. Every goal has a cost in steps, decisions and opportunities to make a mistake, and when that cost exceeds what the user is willing to pay they leave without complaining. Measuring it makes the cost visible: a task that takes eleven steps instead of three, or a field that fails a third of the time, is a concrete defect rather than a matter of taste.

## Core ideas

### Usability has measurable components

Effectiveness (did they complete it), efficiency (how much effort it took), and satisfaction (how it felt). Name which one you are improving before you change anything, because the three can trade off.

```text
Task: reorder a previous order
Effectiveness  completed without help          87%
Efficiency     median time on task             2m 10s
Satisfaction   rated easy (1-5)                3.8
```

### Define the goal and the user before measuring

"Usable" is meaningless without naming who and for what task. A checkout that is quick for a returning buyer and baffling for a first-time one is two usability results, not one.

### Separate learnability from efficiency

A design can be easy to learn and slow once known, or fast for experts and impossible on the first attempt. Say which population you are optimising for; "usable" for a warehouse power user may mean something quite different from "usable" for a twice-a-year customer.

### Accessibility is part of usability, not parallel to it

Contrast, target size, keyboard order and screen reader behaviour decide whether the task is completable at all for some users. Treating them as a separate compliance exercise tends to produce a design that passes an audit and fails the task.

### Usability is discovered, not asserted

Nobody can rule on usability from a picture, including the person who designed it. Every claim about it is a hypothesis until someone attempts the task.

## Practice

### Define one usability target

Take a task in your product and write the user, the goal, the completion definition and the three measures with current values.

Done when: each measure has a number today, and you can say which one you are trying to move.

### Compare two candidate designs

Measure the same three components on two variants with the same task and the same population, and report them side by side.

Done when: you can name which variant wins on effectiveness and which on efficiency, or state that they are indistinguishable at this sample size.

## Common mistakes

- **Treating usability as taste** — the argument becomes about preference and nothing can be decided; fix: name the user, the goal and a measure.
- **Confusing the quality with the test** — people say "we did usability" and mean they watched a session; fix: keep the quality and the activity distinct and say which you mean.
- **One measure for every goal** — efficiency is optimised while satisfaction or completion falls; fix: check all three components.
- **Measuring on colleagues** — internal users know the vocabulary and the routes; fix: measure with people from the target group.
- **Deferring accessibility** — the task is impossible for some users while the average looks fine; fix: treat keyboard, contrast and target size as usability components.

## Go deeper

- **Usability Testing** (`03-design-ux/33-usability-testing`) — the activity of watching people attempt tasks, which is how this quality is discovered.
- **Heuristic Evaluation** (`03-design-ux/34-heuristic-evaluation`) — an expert pass to catch obvious faults before a session.
- **User Centered Design** (`03-design-ux/15-user-centered-design`) — deriving the design from the user's task in the first place.
- **Accessibility (WCAG / a11y)** (`02-frontend/11-accessibility-wcag-a11y`) — the formal criteria behind one component of usability.
