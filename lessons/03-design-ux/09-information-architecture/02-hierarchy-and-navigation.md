---
title: Hierarchy and navigation
prereqs: ["03-design-ux/09-information-architecture/01-labelling"]
---

## What it is

Hierarchy groups content into categories and sub-categories; navigation exposes those groups so a user can guess a path and follow it. Together they are the map of the product, and the test of a good one is that a new user can predict where something lives before they go looking.

## Why it matters

Depth and breadth are a trade-off, and most products get it wrong in the same direction: too many top-level items, each too small, and no obvious place for anything new. The result is a menu that reads like an org chart and a user who opens four categories hoping. Navigation is also what changes least often after launch — re-organising breaks bookmarks, analytics and muscle memory — so the structure is worth testing before it ships.

## Core ideas

### Group by task, not by team or by content type

Items belong together when the same person needs them at the same moment. Department names and internal document types are the two commonest wrong axes.

```text
By team                  By task
Payments                 Your orders
Delivery                 Your plan and bills
Account                  Your details
Preferences              Help and support
```

The right-hand column answers "where would I look?" without knowing the org chart.

### Keep the top level to five to seven items

More than that and people scan rather than read. Fewer than five and each item becomes a vague bundle. Five to seven items is the range that supports recognition.

### Make depth predictable

Two or three levels is usually enough for a product. A user should be able to say how deep they are and what the next level will contain. Deep chains of near-identical pages are a symptom of a hierarchy that mirrors the database.

### Give every new item an obvious home

Before adding anything, name the category it belongs to. If the honest answer is "we will add a new top-level item", the structure is drifting and will fragment.

### Navigation shows position as well as options

Highlight the current section, show the path, and keep the primary navigation identical across pages so the user can build a mental map. Navigation that changes shape per page is a maze.

## Practice

### Draft a two-level structure

Take the content from your audit and arrange it into five to seven top-level groups with two or three items each. Give each group one of your tested labels.

Done when: you can place every item in the list into a group, and no group is named after a team.

### Test the structure with a findability task

Write ten "where would you look for…" questions and ask three people to answer them against your draft tree, without searching.

Done when: at least eight of the ten questions are answered by pointing at the right group, and you have noted the two that were not.

## Common mistakes

- **Grouping by department** — the menu reads like the org chart and users cannot guess; fix: group by the moment the same person needs the items.
- **Too many top-level items** — the menu is scanned and never learned; fix: consolidate to five to seven.
- **Unpredictable depth** — pages nest until the user loses the thread; fix: cap the depth and flatten near-duplicates.
- **Navigation that changes per page** — the mental map never forms; fix: keep primary navigation identical and highlight position.
- **No home for new content** — every release adds a new top-level item; fix: refuse additions that cannot be placed in an existing group.

## Go deeper

- **Labelling** (`03-design-ux/09-information-architecture/01-labelling`) — the words these groups are named with.
- **Findability testing** (`03-design-ux/09-information-architecture/03-findability-testing`) — proving the structure before it ships.
- **Information Architecture** (`03-design-ux/09-information-architecture`) — the track this chapter sits in.
- **Card Sorting** (`03-design-ux/26-card-sorting`) — discovering the groupings people already hold.
