---
title: UX Writing & Microcopy
type: skill
topic: 03-design-ux
tier: small
status: drafted
aliases: ["Microcopy"]
prereqs: []
related: []
---

## What it is

UX writing is the text inside an interface: button labels, field hints, empty states, error messages, confirmations. Microcopy is the same thing at the smallest scale — the two or three words a person reads at the moment they decide whether they understand what is about to happen.

## Why it matters

People read interfaces in fragments and under pressure, and the words are usually the last thing written and the first thing blamed. A button that says "Submit" makes the user guess; "Send invoice" does not. An error that says "Invalid input" tells the user nothing they can act on, while "Enter a date after today" is a fix. This is where users get stuck, and the fix is often a sentence rather than a quarter of engineering.

## Core ideas

### Every string answers one question

Write down the question the user has at that moment, then answer it. Buttons answer "what happens if I press this?"; headings answer "am I in the right place?"; errors answer "what do I do now?".

```text
Question     "What happens if I press this?"
Bad          Submit
Better       Create account
Best         Create account and send the confirmation
```

### Name things the way the user names them

Use the user's vocabulary, taken from research sessions or the support queue, not the internal project name. Consistency matters more than elegance: pick one word for a thing and use it everywhere, including in the emails and the help pages.

### Errors say what happened and what to do

Four parts at most: what went wrong, why (if known), what to do, and how to get help. Never blame the user, never expose an error code as the message, and always keep their input.

```text
Bad    Error 422: invalid input
Better We could not save your address because the postcode is incomplete.
       Check the postcode and try again. Your other details are saved.
```

### Empty states are onboarding

An empty list is the first thing a new user sees. Use it to say what will appear here, how to create the first item, and one example. Not "No results".

### Write for the smallest screen first

Draft at the narrowest width you support and with the longest realistic string, including a translated one. If the label needs a second line at 320 pixels, it is too long for a button.

## Practice

### Rewrite five real strings

Take five strings from a live product: a primary button, a field hint, an error, an empty state and a confirmation. For each, write the question the user has, then rewrite the string in no more words than the original.

Done when: each rewrite answers its question, uses the user's words where the original used internal ones, and fits its original space.

### Test the rewrites with five people

Show each rewritten string with no surrounding context and ask what the person expects to happen.

Done when: at least four of five people describe the intended outcome for each string, and you have rewritten any that failed.

## Common mistakes

- **Internal jargon in the interface** — users do not know the project's names for things; fix: take the vocabulary from sessions and support tickets.
- **Blame in error messages** — "you entered an invalid value" makes the user feel at fault; fix: state what happened and what to do next.
- **"Are you sure?" confirmations** — they ask about the user's confidence rather than the consequence; fix: name the action and what it will do.
- **Empty states left as placeholders** — the first screen a new user sees says nothing; fix: write what will appear here and how to start.
- **Strings written last, per screen** — the product ends up with four words for one concept; fix: keep a single string list and reuse it.

## Go deeper

- **Content Strategy** (`03-design-ux/08-content-strategy`) — the rules and voice that keep a whole product's strings consistent.
- **Information Architecture** (`03-design-ux/09-information-architecture`) — the labels that navigation depends on.
- **Usability Testing** (`03-design-ux/33-usability-testing`) — how to check whether a string is understood.
- **UI/UX Research** (`03-design-ux/18-ui-ux-research`) — testing comprehension of wording before layout.
