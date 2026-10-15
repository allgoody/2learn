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

Computer science is the layer underneath your daily tools: how data is arranged in memory, how cost grows with input size, how one machine shares itself between programs, how bytes cross a network, and how a database finds rows. It is a group of skills, not one, and most developers meet them through incidents.

## Why it matters

These choices are the expensive ones to reverse. The wrong data structure is fine in development and unusable at ten thousand records; the wrong concurrency model hides until the system is under load. You can work for years without saying "Big-O" aloud, but you cannot avoid choosing between an array and a map. Knowing this layer turns an exhausted connection pool or a query that ignores its index from magic into something you can diagnose.

## Included skills

- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — arranging values so the operations you need most are the cheap ones.
- **Algorithms & Big-O** (`01-cs-fundamentals/14-algorithms-big-o`) — the standard procedures and the notation for how their cost grows.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — processes, threads, memory and filesystems as the program actually sees them.
- **Computer Networks** (`01-cs-fundamentals/03-computer-networks`) — packets, TCP/IP, ports and DNS, and how a request travels.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — storage engines, indexes and query planners under the SQL you write.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — doing several things at once without corrupting shared state.

## Where to start

Read Data Structures first; every other entry here assumes you can pick a shape for your data. Algorithms & Big-O then gives you the vocabulary for judging that choice. Operating Systems and Computer Networks explain the machine and the wire the code runs on, in either order. Leave Concurrency and Database Internals until you have something touching both.
