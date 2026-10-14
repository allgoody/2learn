---
title: Transactions and isolation
prereqs: ["backend-data/sql-relational-databases/03-indexes-and-query-plans"]
---

## What it is

A transaction groups statements so that either all of them take effect or none does, and so that other sessions see either all of the work or none of it. Isolation levels decide how much one transaction may observe of another's unfinished work. These two properties are what allow an application to move money from one account to another without ever showing a state where it exists in neither.

## Why it matters

The interesting bugs in a database-backed application are concurrency bugs: two requests reading the same row, both deciding to proceed, and both writing. Each request is correct in isolation and the pair is wrong. Transactions and isolation levels are the tools for reasoning about that, and choosing the wrong level produces a system that passes every test with one user and loses money with two. They also determine how much locking occurs, which is why isolation is as much a performance decision as a correctness one.

## Core ideas

### A transaction is all or nothing, and that includes a crash

Every statement in the transaction takes effect when it commits. If the process dies or the connection drops before that, the work is rolled back, and the engine achieves this by writing enough information to undo it. This is what makes a multi-step change safe: without it, a failure halfway leaves the data inconsistent and the application has to repair it.

```text
begin
  debit  account A
  credit account B
commit          -> both or neither
```

### Isolation levels trade correctness against concurrency

A stricter level prevents more anomalies and allows less parallelism. The practical anomalies are a read that sees a value that was later rolled back, a read repeated within one transaction that returns different values, and a set of rows that changes between two reads. Knowing which of those your application can tolerate is what makes the level a decision rather than a default.

```text
read uncommitted -> sees uncommitted work        (rarely appropriate)
read committed   -> only committed work          (the common default)
repeatable read  -> stable reads within a txn    (may block or abort more)
serialisable      -> as if transactions ran one at a time
```

### Lost updates are the anomaly that bites application code

Two transactions read a value, compute a new one and write it back; the second overwrites the first and one update is lost. Reading and writing in the same statement, locking the row, or detecting the conflict at commit are the remedies. This is the most common concurrency bug in application code because the pattern looks harmless in a single-user test.

### Locking is the mechanism, and its cost is contention

Most engines enforce isolation by holding locks or by detecting conflicts and aborting one side. Both produce waiting or retries under concurrency, which is why transactions should be short and should not include work that can be done outside them — a network call, a user prompt, a slow computation. Holding a lock across a network call is a reliable way to build a system that deadlocks under load.

### Deadlocks are a protocol problem, and they have a protocol answer

Two transactions each holding what the other needs will wait forever, so the engine detects the cycle and aborts one. The application must therefore expect an occasional failure and retry it. Accessing tables and rows in a consistent order across the codebase makes deadlocks much rarer, because it removes the possibility of a cycle.

### An atomic statement is often enough

If a change can be expressed as a single statement that reads and writes in one operation, no explicit transaction is needed: the engine already treats it as atomic. Reserve explicit transactions for changes that genuinely span several statements, and keep their boundaries as narrow as correctness allows.

## Practice

### Demonstrate a lost update

Have two sessions read the same counter, add one, and write it back, and observe the final value.

Done when: the final value is one more than the start rather than two, and you can describe two ways to prevent it.

### Move a network call out of a transaction

Take a function that opens a transaction, writes a row and then calls an external service, and restructure it so the call happens before or after the transaction.

Done when: no lock is held while waiting on the network and the behaviour on the external call's failure is stated explicitly.

## Common mistakes

- **Holding a transaction open across a network call** — locks are held for the duration and contention or deadlock follows; fix: keep transactions short and move the call outside.
- **Reading and writing the same value in two statements** — one update is lost under concurrency; fix: combine them, lock the row, or detect the conflict.
- **Assuming the default isolation level is enough for every case** — some read-then-write patterns are not safe at that level; fix: identify the anomaly that matters and choose deliberately.
- **Not retrying a transaction that was aborted** — the deadlock surfaces as a user-visible error; fix: retry the transaction a bounded number of times.
- **Wrapping everything in one long transaction** — concurrency collapses and a single slow step blocks the system; fix: make an atomic statement where possible and bound the rest.

## Go deeper

- **Indexes and query plans** (`backend-data/sql-relational-databases/03-indexes-and-query-plans`) — locking and index choice interact, since a scan locks more than a lookup.
- **SQL & Relational Databases** (`backend-data/sql-relational-databases`) — the engine whose guarantees these are.
- **Concurrency & Async Programming** (`cs-fundamentals/concurrency-async-programming`) — the general concepts of races, locking and retries.
