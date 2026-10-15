---
title: Angular
type: skill
topic: 02-frontend
tier: medium
status: drafted
aliases: []
prereqs: ["02-frontend/19-typescript"]
related: []
---

## What it is

Angular is a full application framework, not a view library. Routing, forms, HTTP, dependency injection, testing utilities and a build tool are all part of the package and are all designed to work together. It is written in TypeScript and expects TypeScript, and it is opinionated about how an application should be structured.

## Why it matters

Where a React or Vue codebase assembles its own stack, an Angular codebase starts with decisions already made. That is a real advantage on long-lived enterprise work: three teams can join a five-year-old codebase and find the same folder layout, the same form handling and the same test setup. The cost is that the framework's abstractions are non-optional — you adopt dependency injection and RxJS whether or not your problem needs them. Knowing Angular is therefore as much about understanding those abstractions as about the component model, which is why it usually appears in the same job descriptions as large single-page applications and strict TypeScript.

## In this track

1. **Components and templates** (`02-frontend/30-angular/01-components-and-templates`) — decorators, template binding syntax and the change-detection model.
2. **Dependency injection and RxJS** (`02-frontend/30-angular/02-dependency-injection-and-rxjs`) — the two ideas that distinguish an Angular codebase from any other.

## Prerequisites

- **TypeScript** (`02-frontend/19-typescript`)

## Go deeper

- **State Management** (`02-frontend/23-state-management`) — Angular answers this with services and RxJS rather than a store.
- **React** (`02-frontend/29-react`) — read side by side to see what a library leaves to you that a framework decides.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the structure an opinionated framework imposes still needs discipline inside each file.
