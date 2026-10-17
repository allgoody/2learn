---
title: SOLID Principles
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: ["SOLID"]
prereqs: []
related: []
---

## What it is

SOLID is five rules of object design, collected under an acronym by Robert Martin: S for single responsibility, O for open for extension and closed for modification, L for Liskov substitution, I for interface segregation, D for dependency inversion. They are not laws and they are not the whole of design; they are five ways of noticing the same failure. Each letter names one way a design lets a change escape the place it was made, so that editing one part of a system forces edits in parts that had nothing to do with it.

## Why it matters

Most code rots through coupling rather than through bugs, and the symptoms arrive as edits that keep getting larger. A class with 2 reasons to change means every release risks the other concern: a layout tweak and a delivery-rule change land in the same file, so each one reopens the other's work and its tests. A base class with 1 subclass that cannot honour it puts a type check in every caller, so it is the call sites rather than the subclass that pay for the broken promise. A service that constructs its own database client cannot be tested without a database. None of these announces itself — nothing crashes, the edits simply grow — until a small feature request takes a week. SOLID names the symptoms early enough to fix them cheaply.

## Core ideas

### Single responsibility

A module should have one reason to change, which usually means one group of people who care about it. A class that formats an invoice and also sends it changes when the layout changes and when the delivery rules change — 2 reasons, 2 audiences, 1 file. The test is not the number of methods but the number of audiences whose requests would cause an edit.

```ts
class Invoice { total() { /* ... */ } }
class InvoiceEmailer { send(invoice) { /* ... */ } }
```

After the split each class has 1 reason to change: a layout change edits `Invoice`, a recipient change edits `InvoiceEmailer`, and either edit reopens 1 class and its tests rather than 2 that share a file.

### Open for extension, closed for modification

A design should let you add a new case by adding code rather than editing a growing chain of conditionals. Practically this means depending on an interface at the point where variation happens, and plugging new implementations in at the edge. It does not mean never editing a file — it means the edit for a new case lands in 1 place, not scattered.

```ts
interface ShippingRate { price(parcel): number }
class CourierA implements ShippingRate { /* ... */ }
class CourierB implements ShippingRate { /* ... */ }
```

A switch over 4 couriers is edited in the same function for every one of its 4 cases, so a fifth courier opens that function and re-runs the tests of the 4 that share it. An interface with 1 implementation per courier turns the fifth into a fifth class and edits 0 existing classes; only the composition point that chooses a courier is touched.

### Liskov substitution

If a function accepts a base type, any subtype must work without the caller knowing which one it received. When a subclass rejects an argument the parent accepted, or throws where the parent returned, every caller needs a type check — and the abstraction has stopped paying for itself. The honest fixes are to make the hierarchy shallower or to model the difference as data rather than inheritance.

```ts
class ReadOnlyList extends List {
  add(item) { throw new Error("read only"); }   // breaks every caller that uses List
}
```

The damage scales with the number of call sites: 1 `List` used in 12 places means 12 places that may hold a `ReadOnlyList` and must now ask which one they were given. One throw in the subclass becomes 12 checks in the callers, and each new caller must remember the question.

### Interface segregation

No caller should depend on methods it does not use. A wide interface forces every implementer to write stubs and forces callers to know about unrelated operations, so a change to any method can break an implementer that never touched it. Prefer several small interfaces that a class can implement together, and define them from the caller's point of view.

```ts
interface Reader { read(id): Record }
interface Writer { write(record): void }
```

An interface with 8 methods, of which a given caller uses 2, hands that caller 6 methods of noise and 6 reasons to revisit the implementer it holds. Split into `Reader` and `Writer`, a class that only reads implements 1 method and cannot be affected by a change to writing.

### Dependency inversion

High-level policy should not depend on low-level detail; both should depend on an abstraction. When a domain service constructs its own database client, the domain is welded to that library and cannot be tested without it. Declaring the dependency as a parameter inverts the direction, and the caller decides which implementation to supply.

```ts
class OrderService {
  constructor(private payments: PaymentGateway) {}
}
```

Built inside, 1 test of `OrderService` needs the real payment provider reachable; passed in as `PaymentGateway`, the test supplies a 1-line fake, and the choice of implementation moves to 1 composition point where the production call site decides it.

## Practice

### Find the second reason to change

Pick a class in your codebase with more than a handful of methods. Write down the distinct reasons someone might ask for it to change, and name the group of people behind each one. If you find more than one audience, split the class along that line.

Done when: each resulting class has a single sentence describing why it would change, you can name the audience behind each sentence, and the tests still pass.

### Substitute a dependency in a test

Take a service that constructs its own collaborator, and change it to receive that collaborator instead. Write a test that supplies a fake.

Done when: the test runs without the real collaborator, and no production call site changed its behaviour.

## Common mistakes

- **Applying every rule to every class** — 5 rules applied to a 20-line class buy ceremony and change no behaviour; fix: use the rules where a boundary is already causing friction.
- **Reading open/closed as "never edit that file"** — the result is a layer of plugins for 1 implementation; fix: aim for one place to change per new case.
- **Hiding a broken hierarchy behind type checks** — an `instanceof` in the caller is the smell that substitution has failed, and 1 broken subclass puts it in every caller; fix: rework the abstraction or model the variation as data.
- **Splitting interfaces until every call site needs three imports** — segregation taken too far is its own coupling; fix: define interfaces from the caller's needs, not by alphabetising the methods.
- **Injecting dependencies that will never vary** — a parameter for a pure utility adds 1 layer of indirection and buys 0 test doubles; fix: invert only where a fake or a second implementation is plausible.

## Go deeper

- **Design Patterns** (`01-cs-fundamentals/18-design-patterns`) — the named solutions that apply these principles to recurring problems, with their costs attached.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the naming and size habits a SOLID design still needs in order to be readable.
- **Software Architecture** (`01-cs-fundamentals/25-software-architecture`) — the same principles at the scale of modules and services rather than classes.
