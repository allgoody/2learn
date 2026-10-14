---
title: React
type: skill
topic: frontend
tier: large
status: drafted
aliases: ["React.js"]
prereqs: ["frontend/javascript", "frontend/typescript"]
related: []
---

## What it is

React is a JavaScript library for building user interfaces out of small, reusable components. You describe what the screen should look like for a given state, and React works out the smallest set of changes needed to make the browser match that description. It is a library rather than a framework: routing, data fetching and styling stay separate choices that you make yourself.

## Why it matters

Updating the DOM by hand is where most early front-end bugs live. You forget to remove a listener, you update one of the three places the same value lives, and the screen slowly stops matching your data. React removes that class of mistake by making the rendered output a pure function of state: change the state, and the UI is rebuilt for you. That is why it dominates the job market — the mental model is small enough to learn in a day and strong enough to carry a large application. It is also the ecosystem everything else is written for, from component libraries to testing tools.

## In this track

1. **Rendering and JSX** (`frontend/react/01-rendering-and-jsx`) — how a component becomes DOM, and the JSX syntax you use to describe it.
2. **Components and props** (`frontend/react/02-components-and-props`) — splitting a screen into components and passing data down without mutating it.
3. **State and hooks** (`frontend/react/03-state-and-hooks`) — making a component remember values between renders with `useState`.
4. **Effects and data fetching** (`frontend/react/04-effects-and-data-fetching`) — running side effects after render and loading data without racing.

## Prerequisites

- **Javascript** (`frontend/javascript`)
- **TypeScript** (`frontend/typescript`)

## Go deeper

- **State Management** (`frontend/state-management`) — what to reach for when state has to be shared across screens.
- **UI Components** (`frontend/ui-components`) — designing the building blocks you will now be composing.
- **Browser DevTools** (`frontend/browser-devtools`) — inspecting a running component tree while it changes.
