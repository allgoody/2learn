---
title: Data Structures
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

A data structure is a way of arranging values in memory so that the operations you need are cheap, and the same 10 000 records can be laid out so that different operations win. A hash map finds the record under the key "u-7331" in one hash plus a comparison or two, but holds its keys in no order you can read off. An array reads the record at index 4 999 with one calculation — `start + index * size`, which with the run starting at address 1 000 and each record 8 bytes gives `1 000 + 4 999 * 8 = 40 992` — but finds a record by key only by comparing against up to all 10 000. A balanced tree keeps the records in key order and reaches any of the 10 000 in at most 14 comparisons, because `2^14 - 1 = 16 383` values fit in 14 levels, which is at least 10 000, while `2^13 - 1 = 8 191` fits in 13 and is fewer. Choosing a structure is therefore a question about which of those operations your program performs most.

## Why it matters

Most performance work that is not a network call comes down to a data structure chosen early and never revisited. A list scanned inside a loop over 10 000 items does 10 000 × 10 000 = 100 000 000 comparisons, prints the same output as the loop that does 10 000 + 10 000 = 20 000, and looks harmless in review; the wrong choice is invisible in a demo and decisive in production. Libraries hand you defaults — an array, a dictionary, a list — and those defaults are right most of the time, which is exactly why the wrong case is hard to spot: nothing fails, the page just takes 5 000 times longer than it should. The shapes also make code readable, because when someone reaches for a heap the one word says the code always wants the smallest value next; an index is a tree, a cache is a map and a job queue is a heap, so this vocabulary is the vocabulary of the layers above.

## In this track

1. **Arrays, lists and hash maps** (`01-cs-fundamentals/02-data-structures/01-arrays-lists-and-hash-maps`) — the side-by-side, address-chained and keyed shapes that carry most day-to-day work, with the slot arithmetic each one runs on.
2. **Trees, heaps and graphs** (`01-cs-fundamentals/02-data-structures/02-trees-heaps-and-graphs`) — the hierarchical and connected shapes: why 1 000 000 records sit 20 levels deep in a balanced tree, why a heap keeps only its top value cheap to reach, and how a traversal survives a cycle.

## Prerequisites

None.

## Go deeper

- **Algorithms & Big-O** (`01-cs-fundamentals/14-algorithms-big-o`) — the notation for stating what "cheap" and "expensive" mean here: 20 steps against 1 000 000, written as a rule that holds at every size.
- **Computer Science** (`01-cs-fundamentals/01-computer-science`) — where this entry sits in the wider foundation.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — the other half of the cost story, once work happens at the same time.
