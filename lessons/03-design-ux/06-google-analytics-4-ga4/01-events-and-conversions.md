---
title: Events and conversions
prereqs: []
---

## What it is

An event is a named thing that happened — a page view, a click, a purchase, a form error — optionally carrying parameters that describe it. A conversion is an event you have marked as the outcome that matters. Everything else in the tool is a report built on top of these two ideas.

## Why it matters

The event model decides what questions the tool can ever answer. Collect a single "click" event and you can never reconstruct which button, on which step, for which kind of visitor. Decide the names and parameters deliberately and the same tool answers questions for years. Getting this wrong is also expensive the second time: after a redesign, the old data and the new data cannot be compared.

## Core ideas

### Name events after the user's action

`begin_checkout`, `add_payment_info`, `purchase` describe intent and survive a redesign. `btn_click_3` describes the markup and breaks at the next release.

```text
Event                     Parameters
view_item_list            item_list_name, item_count
add_to_cart               value, currency, item_id
begin_checkout            value, currency, coupon
add_payment_info          payment_type
purchase                  transaction_id, value, currency
```

A short, stable vocabulary of ten to twenty events covers most products; write it down before instrumenting anything.

### Parameters are the segments you will want later

If you will ever want to split a report by device, channel, new or returning, or basket size, that must be a parameter at the moment the event fires. You cannot add it retroactively.

### Mark conversions sparingly

Converting an event means it appears in acquisition and advertising reports — a decision with consequences beyond reporting. Keep it to the few outcomes that genuinely matter, such as a completed purchase or a submitted sign-up.

### Keep the consent boundary visible

GA4 is only permitted to collect data when consent allows. Design the event stream so that a denied consent produces a clean gap rather than a silent partial count, and state in the tracking plan what is collected before consent and what is not.

```text
Consent state   Events stored        Reports show
granted         full event stream     full counts
denied          no analytics events   a visible gap, not zeros
```

### Verify before you trust

Check a new event arrives with the right parameters, from the right page, before building any report on it. An event that fires twice doubles every rate downstream.

## Practice

### Write a ten-event plan

For one flow, list ten events with their parameters and pick no more than two conversions. Implement one and verify it end to end.

Done when: the event appears in the tool with every parameter populated, and the plan names an owner for each event.

### Check the consent gap

With consent denied, confirm that no analytics event is sent, and note the difference in the reports.

Done when: you can show the report for a denied session, and it contains no analytics events.

## Common mistakes

- **One generic click event** — the trail cannot be reconstructed and the tool answers nothing; fix: one event per user action, with the step in its name.
- **Missing parameters** — the segment you need later does not exist and cannot be recreated; fix: add channel, device and new-user flags at definition time.
- **Everything marked as a conversion** — acquisition reports fill with noise and no one trusts them; fix: keep conversions to the two or three outcomes that matter.
- **Ignoring consent in the design** — counts silently shrink and privacy obligations are breached; fix: decide the pre-consent behaviour explicitly and check the gap in a denied session.
- **Never verifying a new event** — duplicate or mislabelled events double every rate built on them; fix: verify each new event end to end before reporting on it.

## Go deeper

- **Google Analytics 4 (GA4)** (`03-design-ux/06-google-analytics-4-ga4`) — the track this event model sits in.
- **Funnels and acquisition reports** (`03-design-ux/06-google-analytics-4-ga4/02-funnels-and-acquisition-reports`) — what these events are read as.
- **What to measure** (`03-design-ux/24-quantitative-ux-research/01-what-to-measure`) — choosing the measures these events serve.
- **Instrumenting and reading the numbers** (`03-design-ux/24-quantitative-ux-research/02-instrumenting-and-reading-the-numbers`) — the tracking plan this plan is part of.
