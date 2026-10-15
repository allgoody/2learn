---
title: Card Sorting
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: []
prereqs: ["03-design-ux/09-information-architecture"]
related: []
---

## What it is

Card sorting puts the topic labels on separate cards and asks people to group and name them themselves. It reveals the mental model a group already holds, so menus and categories can be built to match it rather than to match the team's org chart. Read Information Architecture first: sorting tells you how people group things, not how the product should be structured overall.

## Why it matters

Category names are written by the people who built the product and read by the people who did not. The mismatch is invisible from inside: every label is obvious once you know what is behind it. Card sorting exposes the gap cheaply — twenty minutes per person, no design required — and it usually shows that two obvious categories should be one, and one should be split.

## Core ideas

### Open or closed, chosen deliberately

Open sorting gives people unlabelled groups and lets them name them; it is for discovery and belongs before you have a structure. Closed sorting gives fixed categories and asks people to place cards into them; it is for checking a structure you already have.

```text
Open:   12 cards, no categories -> "put them in groups that make sense, name each group"
Closed: 12 cards, 4 named categories -> "place each card in the category you would look in"
```

### Write cards at the level of the user's topic, not the feature

One card per thing someone might look for, worded the way a user would say it. Avoid two cards that mean the same thing to a newcomer — those produce noise, not signal.

```text
Order history        Reorder a past order      Delivery status
Invoices             Change my address         Return an item
Payment methods      Store credit              Warranty claim
Contact support      Track a repair            Cancel an order
Find a branch        Book a repair slot        Business account
```

### Run it with eight to fifteen people

Below eight, the grouping is one or two people's opinion; above fifteen the pattern has usually stabilised. Run sessions separately rather than as a group exercise — a group converges on one person's argument rather than each participant's own model.

### Read for agreement, not for the perfect map

Look at which pairs of cards were placed together most often. A pair that more than 70% of participants grouped together belongs together; a pair that split evenly needs a different label, not a different structure.

### Check the labels against the sort

If a category name is ambiguous, sorted cards land inside it for different reasons. Ask people to say aloud what they would expect to find under the name they have given or chosen.

## Practice

### Run an open sort with fifteen cards

Write fifteen topic cards for a product or an intranet. Run five sessions of twenty minutes, asking each person to group the cards and name every group.

Done when: you have a pair-agreement matrix and at least two pairs above 70%.

### Run a closed sort against your current navigation

Take your shipping navigation categories and sort the same fifteen cards into them. Note every card that lands in a category other than the one where it currently lives.

Done when: you can name the category whose name caused the most disagreement and the wording you will test in its place.

## Common mistakes

- **Cards worded as features** — "order management module" means nothing to a user; fix: word each card as the thing someone would look for.
- **Running it as a group discussion** — the loudest participant's model wins; fix: run individuals separately and combine afterwards.
- **Ten or fewer cards** — too few to produce a pattern; fix: use fifteen to thirty cards for a real structure.
- **Reading the ideal map rather than the agreement** — you design for the tidy result and not the common one; fix: start from pairs above 70% agreement.
- **Never re-checking the chosen labels** — the sort informs a menu nobody tested; fix: test the resulting labels with a closed sort or a findability task.

## Go deeper

- **Information Architecture** (`03-design-ux/09-information-architecture`) — read this first; card sorting is one input to the structure it describes.
- **Wireframing** (`03-design-ux/27-wireframing`) — turning the agreed structure into a page layout.
- **User Research** (`03-design-ux/05-user-research`) — the wider method set this belongs to.
- **UX Writing & Microcopy** (`03-design-ux/07-ux-writing-microcopy`) — fixing the labels the sort shows to be ambiguous.
