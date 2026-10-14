---
title: Angular
type: skill
topic: frontend
tier: medium
status: drafted
aliases: []
prereqs: ["frontend/typescript"]
related: []
---

## What it is

Angular is a full application framework, not a view library. Routing, forms, HTTP, dependency injection, testing utilities and a build tool are all part of the package and are all designed to work together. It is written in TypeScript and expects TypeScript, and it is opinionated about how an application should be structured.

## Why it matters

Where a React or Vue codebase assembles its own stack, an Angular codebase starts with decisions already made. That is a real advantage on long-lived enterprise work: three teams can join a five-year-old codebase and find the same folder layout, the same form handling and the same test setup. The cost is that the framework's abstractions are non-optional — you adopt dependency injection and RxJS whether or not your problem needs them. Knowing Angular is therefore as much about understanding those abstractions as about the component model, which is why it usually appears in the same job descriptions as large single-page applications and strict TypeScript.

## In this track

1. **Components and templates** (`frontend/angular/01-components-and-templates`) — decorators, template binding syntax and the change-detection model.
2. **Dependency injection and RxJS** (`frontend/angular/02-dependency-injection-and-rxjs`) — the two ideas that distinguish an Angular codebase from any other.

## Prerequisites

- **TypeScript** (`frontend/typescript`)

## Go deeper

- **State Management** (`frontend/state-management`) — Angular answers this with services and RxJS rather than a store.
- **React** (`frontend/react`) — read side by side to see what a library leaves to you that a framework decides.
- **Clean Code** (`cs-fundamentals/clean-code`) — the structure an opinionated framework imposes still needs discipline inside each file.
