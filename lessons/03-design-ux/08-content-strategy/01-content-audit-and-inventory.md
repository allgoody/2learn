---
title: Content audit and inventory
prereqs: []
---

## What it is

A content audit is a list of every piece of content the product ships — screens, strings, help pages, emails, legal text — with columns for who it is for, who owns it, when it was last true and whether anyone reads it. The inventory is the list; the audit is the judgement applied to it.

## Why it matters

Nobody can maintain what nobody has counted. A product with four hundred screens has thousands of strings and dozens of help pages, and the ones that mislead are usually the ones everyone assumes somebody else checked. The audit also produces the cheapest wins in content work: duplication, contradictions and abandoned pages, all visible on one sheet.

## Core ideas

### Count the content once, in one place

A table with one row per item. Keep the columns mechanical to begin with; judgement comes later.

```text
Item                          Type     Audience   Owner   Last true   Views/mo
"Change your address" help    page     all        Sam     2024-03     1,200
Delivery FAQ                  page     buyers     Sam     2023-11       180
Returns policy                page     all        Legal   2024-06       640
Checkout error strings        strings  buyers     unowned  unknown        n/a
"Manage my plan" screen       screen   subscribers Maya    2024-01       900
```

### Judge against a stated purpose

For every row, ask which user task it serves. Content that serves no task is either deleted or rewritten; content that duplicates another row is merged.

### Look for contradictions first

Two pages that disagree — a delivery window, a fee, a returns period — cost the organisation its credibility faster than outdated tone. Search for the numbers and the promises, not only for the wording.

### Find the orphaned content

Rows with no owner are the ones that stay wrong. Name an owner before the audit ends, or mark the item for deletion.

### Schedule the next pass

Content decays. Put a review date on the highest-traffic items and a trigger on the ones tied to a policy change, rather than planning a single heroic clean-up.

## Practice

### Audit one product surface

Choose one surface — a checkout, an account area, a help centre. List every item, then add audience, owner, last-true and a rough traffic estimate.

Done when: every row has an owner or a delete recommendation, and you have found at least two contradictions in figures or promises.

### Cut and merge

Take the audit and mark each row keep, rewrite, merge or delete, then execute the deletions.

Done when: the number of items has fallen and nothing deleted was the only copy of something a user needs.

## Common mistakes

- **Auditing without an owner column** — the list is produced and nothing changes; fix: every row gets a name or a deletion.
- **Judging quality before counting** — the review runs out of time before the duplicates are found; fix: finish the inventory first and judge in a second pass.
- **Ignoring strings inside the product** — the audit covers pages and misses the buttons and errors; fix: include interface strings as a category.
- **Hunting for contradictions by reading** — they are nearly impossible to find by eye; fix: search for the specific figures and promises.
- **Treating it as a one-off** — the content rots again within a year; fix: set review dates and tie them to policy changes.

## Go deeper

- **Content Strategy** (`03-design-ux/08-content-strategy`) — the track this audit starts.
- **Voice, rules and maintenance** (`03-design-ux/08-content-strategy/02-voice-rules-and-maintenance`) — what to do with the audit's findings.
- **UX Writing & Microcopy** (`03-design-ux/07-ux-writing-microcopy`) — rewriting the strings the audit flags.
- **Information Architecture** (`03-design-ux/09-information-architecture`) — where the surviving content belongs.
