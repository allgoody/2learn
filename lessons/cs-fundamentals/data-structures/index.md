---
title: Data Structures
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

A data structure is a way of arranging values in memory so that the operations you need are cheap. The same set of records can be stored so that lookup, insertion, ordered iteration or "give me the largest" is fast — but not all of them at once. Choosing is therefore a question about which operations your program performs most.

## Why it matters

Most performance work that is not a network call comes down to a data structure chosen early and never revisited. A list scanned inside a loop is quadratic and looks harmless. Libraries hand you defaults — an array, a dictionary, a list — which are right most of the time, which is exactly why the wrong case is hard to spot. The shapes also make code readable: when someone reaches for a heap, one word tells you what the algorithm is doing.

## In this track

1. **Arrays, lists and hash maps** (`cs-fundamentals/data-structures/01-arrays-lists-and-hash-maps`) — the contiguous and keyed structures that carry most day-to-day work.
2. **Trees, heaps and graphs** (`cs-fundamentals/data-structures/02-trees-heaps-and-graphs`) — hierarchical and networked shapes, and the traversal each one invites.

## Prerequisites

None.

## Go deeper

- **Algorithms & Big-O** (`cs-fundamentals/algorithms-big-o`) — the notation for stating what "cheap" and "expensive" mean here.
- **Computer Science** (`cs-fundamentals/computer-science`) — where this entry sits in the wider foundation.
- **Concurrency & Async Programming** (`cs-fundamentals/concurrency-async-programming`) — the other half of the cost story, once work happens at the same time.
