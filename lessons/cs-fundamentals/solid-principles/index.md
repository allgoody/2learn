---
title: SOLID Principles
type: skill
topic: cs-fundamentals
tier: small
status: drafted
aliases: ["SOLID"]
prereqs: []
related: []
---

## What it is

SOLID is five rules of object design, collected under an acronym by Robert Martin. They are not laws and they are not the whole of design; they are a set of heuristics that all point at the same goal — keeping a change local, so that altering one part of a system does not ripple through parts that had nothing to do with it. Each letter names one way a design leaks change across boundaries.

## Why it matters

Most code rots through coupling rather than through bugs. A class with two reasons to change means every release risks the other concern; a base class with a subclass that cannot honour it means callers must check types they should not know about; a module that constructs its own dependencies cannot be tested or swapped. These problems do not announce themselves. They accumulate as edits that keep getting larger, until a small feature request takes a week. SOLID names the symptoms early enough to fix them cheaply.

## Core ideas

### Single responsibility

A module should have one reason to change, which usually means one group of people who care about it. A class that formats an invoice and also sends it changes when the layout changes and when the delivery rules change — two reasons, two teams, one file. The test is not the number of methods but the number of audiences whose requests would cause an edit.

```ts
class Invoice { total() { /* ... */ } }
class InvoiceEmailer { send(invoice) { /* ... */ } }
```

### Open for extension, closed for modification

A design should let you add a new case by adding code rather than editing a growing chain of conditionals. Practically this means depending on an interface at the point where variation happens, and plugging new implementations in at the edge. It does not mean never editing a file — it means the edit for a new case should be in one place, not scattered.

```ts
interface ShippingRate { price(parcel): number }
class CourierA implements ShippingRate { /* ... */ }
class CourierB implements ShippingRate { /* ... */ }
```

### Liskov substitution

If a function accepts a base type, any subtype must work without the caller knowing which one it received. When a subclass rejects an argument the parent accepted, or throws where the parent returned, every caller now needs a type check — and the abstraction has stopped paying for itself. The honest fixes are to make the hierarchy shallower or to model the difference as data rather than inheritance.

```ts
class ReadOnlyList extends List {
  add(item) { throw new Error("read only"); }   // breaks every caller that uses List
}
```

### Interface segregation

No caller should depend on methods it does not use. A wide interface forces every implementer to write stubs and forces callers to know about unrelated operations, so a change to any method can break an implementer that never touched it. Prefer several small interfaces that a class can implement together, and define them from the caller's point of view.

```ts
interface Reader { read(id): Record }
interface Writer { write(record): void }
```

### Dependency inversion

High-level policy should not depend on low-level detail; both should depend on an abstraction. When a domain service constructs its own database client, the domain is welded to that library and cannot be tested without it. Declaring the dependency as a parameter inverts the direction, and the caller decides which implementation to supply.

```ts
class OrderService {
  constructor(private payments: PaymentGateway) {}
}
```

## Practice

### Find the second reason to change

Pick a class in your codebase with more than a handful of methods. Write down the distinct reasons someone might ask for it to change. If you find more than one audience, split it along that line.

Done when: each resulting class has a single sentence describing why it would change, and the tests still pass.

### Substitute a dependency in a test

Take a service that constructs its own collaborator, and change it to receive that collaborator instead. Write a test that supplies a fake.

Done when: the test runs without the real collaborator, and no production call site changed its behaviour.

## Common mistakes

- **Applying every rule to every class** — small programs get ceremony without benefit; fix: use the rules where a boundary is already causing friction.
- **Reading open/closed as "never edit that file"** — the result is a layer of plugins for one implementation; fix: aim for one place to change per new case.
- **Hiding a broken hierarchy behind type checks** — `instanceof` in callers is the smell that substitution has failed; fix: rework the abstraction or model the variation as data.
- **Splitting interfaces until every call site needs three imports** — segregation taken too far is its own coupling; fix: define interfaces from the caller's needs, not by alphabetising the methods.
- **Injecting dependencies that will never vary** — a parameter for a pure utility adds indirection for nothing; fix: invert only where a test double or a second implementation is plausible.

## Go deeper

- **Design Patterns** (`cs-fundamentals/design-patterns`) — the named solutions that apply these principles to recurring problems, with their costs attached.
- **Clean Code** (`cs-fundamentals/clean-code`) — the naming and size habits a SOLID design still needs in order to be readable.
- **Software Architecture** (`cs-fundamentals/software-architecture`) — the same principles at the scale of modules and services rather than classes.
