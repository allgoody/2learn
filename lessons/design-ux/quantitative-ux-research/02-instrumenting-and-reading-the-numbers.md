---
title: Instrumenting and reading the numbers
prereqs: ["design-ux/quantitative-ux-research/01-what-to-measure"]
---

## What it is

Instrumenting is defining the events your product emits so that the measure you chose can be counted; reading is looking at those events without fooling yourself. Both jobs happen before and after a release, and both are usually done in a hurry at the end.

## Why it matters

An event named "click" collects everything and answers nothing. Six months later, nobody can say whether "started checkout" means the page loaded or the first field was filled, and the old charts are unreadable. Good instrumentation is an hour of naming decisions that keeps history comparable for years; bad instrumentation is permanently ambiguous. Reading is the same discipline applied backwards: checking what could make the number look better without anything actually improving.

## Core ideas

### Name events after the user's action, not the widget

`checkout_address_submitted` is stable across redesigns; `green_button_clicked` is not. Include the properties you will need to segment later — channel, device, whether the user is new — at the moment the event is defined.

```text
checkout.started        properties: channel, is_new_user, item_count
checkout.address_failed properties: reason, attempt_number
checkout.confirmed      properties: channel, payment_method, value
```

### Define success and failure on the same path

An error event with no matching success event cannot be turned into a rate. Pair them as you write them.

### One tracking plan, written down

A single table of event, trigger, properties and owner. Anything not in the plan is not instrumented; anything instrumented but missing from the plan is deleted. This is what makes the history trustworthy a year later.

### Reading: check the denominator first

Ask what changed in who is included. A sign-up spike often comes from a marketing channel arriving with a different completion rate, not from a better product.

```text
Before: 10,000 visits,  900 sign-ups  = 9.0%
After:  31,000 visits, 1,550 sign-ups = 5.0%
Reading: the paid channel arrived; the product did not change.
         Split by channel before quoting either figure.
```

### Reading: look for the pipeline, not just the metric

A tracking change, a cookie-consent change, a bot filter or a new client release can move a metric without any user behaving differently. Keep a dated log of tracking changes next to the chart.

## Practice

### Write a tracking plan for one flow

For your main flow, write a table of events with trigger, properties and owner, then implement and verify two of them end to end by watching the event arrive with the right properties.

Done when: two events appear in the tool with the expected properties, and the plan lists no event without an owner.

### Audit a spike

Find a spike or a step change in any metric you own. Explain it with at least two competing hypotheses, then find the evidence that separates them.

Done when: you can name the tracking change, channel shift or seasonal effect behind the movement, or state plainly that the evidence cannot separate the explanations.

## Common mistakes

- **Widget-named events** — the trail breaks at the next redesign; fix: name events after the user's action and keep the properties stable.
- **No tracking plan** — the history becomes unreadable and nobody knows what changed; fix: keep one dated table with an owner per event.
- **Changing tracking and reading it as behaviour** — a metric jump is reported as a product win; fix: log every tracking change beside the chart.
- **Ignoring who is in the denominator** — a mix shift masquerades as a conversion change; fix: segment and compare before quoting the aggregate.
- **Trusting an aggregate over its funnel** — the top-line number hides which step moved; fix: read the funnel step by step before the headline.

## Go deeper

- **What to measure** (`design-ux/quantitative-ux-research/01-what-to-measure`) — the measures these events are built to count.
- **Quantitative UX Research** (`design-ux/quantitative-ux-research`) — the track this chapter closes.
- **Google Analytics 4 (GA4)** (`design-ux/google-analytics-4-ga4`) — where the events are usually stored and read.
- **A/B Testing** (`design-ux/ab-testing`) — the same instrumentation used to compare two variants.
