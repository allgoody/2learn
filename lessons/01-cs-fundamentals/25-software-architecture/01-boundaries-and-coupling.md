---
title: Boundaries and coupling
prereqs: ["01-cs-fundamentals/18-design-patterns", "01-cs-fundamentals/08-clean-code"]
---

## What it is

A boundary is a line drawn through a running system where the cost of crossing it changes: inside one process a call costs about a microsecond — a millionth of a second — while a call to another machine costs about a millisecond, a thousandth of a second, and since 1000 microseconds make a millisecond, the same call costs 1000 times as much. Coupling is how much has to change together when one side of such a line changes, and the honest way to know it is to count files, modules and teams rather than to argue about it. Drawing boundaries is the work of choosing where the expensive crossings go; coupling is how you find out whether the choice was good.

## Why it matters

Every architecture problem you will meet reduces to this count. Take one change — renaming the column `orders.total` to `orders.amount` — and count what it forces you to touch. If one module reads the column, the change is the schema, the type and the test: 3 files, 1 module, 1 team. If three modules read it, the same rename is 3 files in `orders/`, 4 in `billing/` and 5 in `reports/`, so 3 + 4 + 5 = 12 files across 3 teams, and the releases have to happen in a fixed order, which makes the change wait for the slowest of the three. No amount of clean code inside each of those 3 modules turns the 12 into 3; only moving the boundary does. The decision is usually made once and then lived with for years, so it is worth more thought than the code it contains.

## Core ideas

### A boundary is where the cost of a call changes

The cheapest crossing is a call between two functions in one process: the processor jumps to another address and nothing leaves the machine. A module boundary changes nothing at run time — the same jump happens — but it is a privacy rule the compiler enforces, so a caller cannot reach past it. A process boundary makes the arguments travel into a buffer and back, and adds a second thing that can be dead when the call arrives. A network boundary adds a wait about a thousand times longer than a jump, and it is the only one of the four that can already have succeeded on the far side when it reports a failure. The table below puts a value and a meaning on each of the four costs.

```text
boundary            what it costs to cross                     what it buys
function call       a jump inside one process                 nothing to isolate
module boundary     nothing at run time; a rule the compiler enforces
process boundary    the arguments copied across; a second failure domain
network boundary    a wait, and a machine that may be gone    separate machines, separate deploys

put values on the two costs, using the calls one request makes
calls per request:                 n     = 10
cost of one call inside the process: c_in  =    1 µs    one microsecond, a millionth of a second
cost of one call over the network:   c_net = 1000 µs    one millisecond, a thousandth of a second

kept in-process: n * c_in  = 10 *    1 µs =    10 µs
put on the wire: n * c_net = 10 * 1000 µs = 10 000 µs = 10 ms
10 ms / 10 µs = 1000, so the same ten calls cost a thousand times more
```

Those two costs are the ones you measure in your own system: put your own `c_in` and `c_net` into the lines above and the arithmetic still holds. The isolation is real as well, not a slogan — only a network boundary survives the machine on the other side being replaced, and only it can half-succeed. Place a boundary where that isolation is needed, not where the diagram looks tidier.

### Coupling is the number of things that change together

Two parts are coupled in proportion to how much has to change when one of them changes. The measurable form is change amplification: take a change you really made, and count the files it forced you to edit, the modules those files belong to, and the teams that had to agree before it could ship. Count the same three numbers again after a proposed boundary and you have a measurement instead of an opinion.

```text
change: rename orders.total to orders.amount

one module reads the column
  schema.sql             1 file   the column definition
  orders/order.ts        1 file   the field's type
  orders/order.test.ts   1 file   the test that names the field
  totals: 3 files, 1 module, 1 team

three modules read the column
  orders/   3 files   one query, one type, one test
  billing/  4 files   two queries, one type, one test
  reports/  5 files   three report definitions, one type, one test
  files 3 + 4 + 5 = 12, modules 3, teams 3

the three modules must be edited and released together, because until all 12
files agree the system is half-renamed: one column name, two meanings
```

12 is the change amplification of that one rename. A change that touches 1 file and 1 team is local; a change that touches 12 files and waits for 3 teams is an architecture problem, and no rewrite inside a single module removes it. Neither number is automatically wrong — sometimes two things genuinely are one concept, and the 12 is the price of that — but the 12 should be a decision someone made rather than a discovery someone had a year later.

### Cohesion is the other half

A module is cohesive when everything inside it changes for the same reason. The count to take is the number of independent reasons a file has to change: 1 reason is cohesive, and 2 reasons mean that a change to either one forces you to check the other before you can ship. Put values on that check.

```text
assume the shared file's tests cover both rules, so each change runs both

rules in one module:                r = 2   a pricing rule and an invoice layout
pricing changes in a year:          p = 6
invoice changes in a year:          i = 4
changes in a year:            p + i = 10

one module:  each change runs the tests of both rules
             (p + i) * r = 10 * 2 = 20 test runs a year
two modules: p * 1 + i * 1 = 6 + 4 = 10 test runs a year
20 - 10 = 10 runs a year saved, and 20 / 10 = 2, so half the work
```

There is a second cost that no count captures as tidily: a file whose two halves change for unrelated reasons must be re-understood on every visit. High cohesion and low coupling are one observation seen from two sides — what belongs inside a module is exactly what changes at the same time, and a module holding two such groups pays the 20 runs above.

### Depend in one direction

An import is a claim that one module needs another in order to build, and it decides which changes can reach which. Aim the arrows from the volatile toward the stable: the rules of the business should not import the web framework, the ORM (the object-relational mapper that turns database rows into objects) or the message broker, because those change more often and for reasons that have nothing to do with the rules. Count what a framework upgrade puts in front of a reviewer.

```text
files in the system:                                60
files that name the framework, before the seam:    40   handlers, types, and rules that took a request object
files that name the framework, after the seam:      3   the three handlers; the rules take plain values
60 - 3 = 57 files that no longer appear in a framework upgrade

framework releases in a year:                       4
files to re-check that year, before:   4 * 40 = 160
files to re-check that year, after:    4 *  3 =  12
160 - 12 = 148 fewer file-checks in that year
```

The practical form is the inversion a prerequisite of this entry names — SOLID, five design principles for classes — carried one scale up: the domain declares the interface it needs — `tierRateFor(customerId)` — and the outer layer supplies an implementation. The domain then imports nothing it cannot run in a test, which is also why the 3 files that still name the framework are the only ones that have to change when it is replaced.

### Draw boundaries around change, not around nouns

The tempting split is by type of thing — everything about an order under `orders/` — because it matches the data model and produces a tidy diagram. The more useful split is by what changes together. A pricing rule changes four times a year; a delivery rule changes once. Those rates, not the nouns, say where the line goes.

```text
two rules, two rates of change, over two years
  pricing changes:      8   (4 a year * 2 years)
  delivery changes:     2   (1 a year * 2 years)
  changes in total:     8 + 2 = 10

split by noun: both rules live in orders/, which 12 files import
  edits forced:         10 changes * 12 files = 120 file edits

split by rate of change: pricing/ and delivery/, each imported by orders/ alone
  edits forced:         8 * 1 + 2 * 1 = 10 file edits
120 / 10 = 12, the ratio of the two designs over those two years
```

Nouns give you a diagram a newcomer can draw correctly and still modify expensively. Rates of change give you a system in which 8 of those 10 changes stay inside one folder, plus a number you can check after the fact: the files a typical pricing change touches should be 1, and the day it becomes 12 the split has stopped paying.

## Practice

### Count the amplification of one change

Pick a change you made in the last month — a field added, a rule changed, a concept renamed. Count the files it touched, the modules those files belong to, and the teams that had to agree before it shipped. Then name the shared thing that forced each file beyond the first: a schema, a type, or a second copy of the same rule.

Done when: you can state the change's file count, module count and team count, and name the coupling that produced the widest of them — or show that all the files sit in one module and both other counts are 1.

### Test the dependency direction

Choose a module you own and list its imports. For each one, ask what its next breaking release would force you to edit, and count the files in your module that name it.

Done when: every import points at something more stable than the module itself, or at least one import has been moved behind an interface you can replace in a test, and you can state the file count that the move took out of the blast radius.

## Common mistakes

- **Splitting by noun because the diagram looks tidy** — the parts that change together end up apart, so a pricing change touches 12 files where 1 would do; fix: group by rate of change and check the split against a change you made last quarter.
- **Letting the framework leak into the domain** — the framework's name reaches 40 of 60 files, so each of its 4 yearly releases puts 40 files in front of a reviewer; fix: keep framework types out of the rules, pass plain values across the seam, and the count falls to 3.
- **Adding a network boundary for no operational reason** — 10 in-process calls of 1 µs each become 10 network calls of 1000 µs each, so 10 µs of work becomes 10 ms and gains a failure mode; fix: make something a service only when independent deployment or failure isolation is required.
- **Sharing a model between two bounded contexts** — one side's field rename becomes the other side's compile error, so 1 change needs 2 releases in a fixed order; fix: let each context own its model and translate at the boundary.
- **Measuring architecture by the number of layers** — a 4-layer system can still put 12 files in every change, because a layer count describes the arrows and not what travels along them; fix: measure the files and the teams that a typical change touches.

## Go deeper

- **Design Patterns** (`01-cs-fundamentals/18-design-patterns`) — how to shape the seam once the boundary is chosen, so read it first.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the naming and structure that make a boundary legible to the people crossing it.
- **Data and state ownership** (`01-cs-fundamentals/25-software-architecture/02-data-and-state-ownership`) — the boundary that is hardest to move later, because by the time you notice it the data already sits on both sides.
