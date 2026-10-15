---
title: Funnels and acquisition reports
prereqs: ["03-design-ux/06-google-analytics-4-ga4/01-events-and-conversions"]
---

## What it is

A funnel report shows how many people moved from each step of a sequence to the next. An acquisition report shows where they came from before they arrived — channel, campaign, referrer, geography. Together they answer the two questions that follow a drop-off: where did people stop, and who were they when they started.

## Why it matters

The same completion rate means different things depending on the traffic behind it. A page that converts poorly for paid social traffic and well for returning customers is two different products wearing one number, and only the acquisition report shows it. Reading the two reports side by side is what turns a percentage into a decision: fix the step, fix the promise that brought these people here, or accept both.

## Core ideas

### Define the funnel from the events, not from guesses

Build the funnel from the events you are certain fire, and check the entry count against the raw event count. If the first step of the funnel does not match the number of people who fired that event, the funnel definition is wrong.

```text
Funnel step                    People   Step rate
view_item_list                 12,400      -
add_to_cart                     3,100     25%
begin_checkout                  1,900     61%
add_payment_info                1,240     65%
purchase                          870     70%
```

### Break the funnel down by a parameter you trust

Split by channel, device or new versus returning. The aggregate hides a step that is fine on desktop and catastrophic on mobile, and the mobile fix is usually cheaper than the aggregate one.

### Compare the acquisition mix between periods

A conversion change is often a mix change: a new channel arrived with a lower-intent audience. Pull the acquisition report for the same period and compare the share each channel contributes.

```text
Channel        Share last month   Share this month   Completion
returning            38%                24%              14%
paid social          12%                31%               3%
```

The aggregate fell because the mix moved, not because the product got worse.

### Read the campaign promise against the landing step

Where the ad or subject line promises something the first screen does not confirm, the drop-off happens at the first step. Compare the campaign text with the landing content before redesigning the step.

### Watch the reporting delay and the sampling

Reports update for hours after an event; a funnel read too early understates the last steps. When the tool samples a large report, the numbers wobble — widen the date range rather than reading a sampled week.

## Practice

### Build one five-step funnel and reconcile it

Build a funnel from five events, then compare the first step with the raw count of that event for the same period.

Done when: the first step matches the raw event count, and you have written down the step with the largest drop.

### Split the same funnel by channel

Run the same breakdown by acquisition channel and by device. Note any step where the best and worst segments differ by more than a factor of two.

Done when: you can name one step that is only a problem for one segment, and say which segment's volume justifies fixing it first.

## Common mistakes

- **Building the funnel from assumed steps** — the entry count does not reconcile and every rate is suspect; fix: build from verified events and reconcile the first step.
- **Reading only the aggregate** — a broken mobile step hides inside a healthy average; fix: split by device and channel before drawing conclusions.
- **Confusing a mix change with a product change** — a new traffic source is read as a regression in the funnel; fix: compare acquisition share between the two periods.
- **Reading the report too early** — the last steps understate while data is still arriving; fix: wait for the reporting window to settle before judging.
- **Ignoring the campaign promise** — the step is redesigned when the message was the problem; fix: compare the ad or email wording with the landing screen.

## Go deeper

- **Events and conversions** (`03-design-ux/06-google-analytics-4-ga4/01-events-and-conversions`) — the event model these reports are built from.
- **Google Analytics 4 (GA4)** (`03-design-ux/06-google-analytics-4-ga4`) — the track this chapter closes.
- **Quantitative UX Research** (`03-design-ux/24-quantitative-ux-research`) — deciding which drop-off is worth fixing.
- **Hotjar** (`03-design-ux/25-hotjar`) — watching the sessions behind the drop-off.
