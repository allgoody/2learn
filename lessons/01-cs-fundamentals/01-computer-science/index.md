---
title: Computer Science
type: area
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: ["CS"]
prereqs: []
related: []
---

## What it covers

Computer science is the layer underneath your daily tools: how values are arranged in memory, how the work an operation does grows with the number of values it handles, how one machine shares itself between programs, how bytes cross a network, and how a database finds one row out of two million without reading all two million. It is a group of skills, not one, and most developers meet them through incidents.

## Why it matters

These choices are the expensive ones to reverse. Say a service checks whether a username is free, with 10 000 names already taken: stored in an array, the check compares the new name against stored names one at a time, up to 10 000 comparisons per check, while a hash map computes the slot the name would sit in and looks there, about two steps — 10 000 / 2 = 5 000 times fewer, and the same gap whether the table holds ten names or ten million. Concurrency hides longer: ten requests each holding one lock for 10 ms queue into 10 × 10 ms = 100 ms of waiting, and a thousand of them into 1 000 × 10 ms = 10 seconds, with no error and no log line. You can work for years without saying "Big-O" aloud, but you cannot avoid choosing between an array and a map, and knowing this layer turns an exhausted connection pool or a query that scans 2 000 000 rows because its index went unused from magic into something you can diagnose.

## Included skills

- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — arranging values so the operations you run most, such as "the record with id 42", cost one lookup instead of a scan of 10 000.
- **Algorithms & Big-O** (`01-cs-fundamentals/14-algorithms-big-o`) — the standard procedures and the notation that turns "10 000 comparisons" into a rule holding at every size.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — processes, threads, memory and filesystems as the program actually sees them.
- **Computer Networks** (`01-cs-fundamentals/03-computer-networks`) — packets, TCP/IP, ports and DNS, and why a request costs a count of round trips at roughly 70 ms each rather than a number of bytes.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — storage engines, indexes and query planners under the SQL you write, and why one extra column in a select list can turn a 400 ms scan into 1.6 s.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — doing several things at once without corrupting shared state.

## Where to start

Read Data Structures first; every other entry here assumes you can pick a shape for your data, and the difference it makes is the difference between 10 000 comparisons and two. Algorithms & Big-O then gives you the vocabulary for judging that choice at every size, not just at the one you tested. Operating Systems and Computer Networks explain the machine and the wire the code runs on, in either order. Leave Concurrency and Database Internals until you have something touching both.
