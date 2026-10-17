---
title: Algorithms & Big-O
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: ["Big-O"]
prereqs: ["01-cs-fundamentals/02-data-structures"]
related: []
---

## What it is

Big-O is shorthand for how the cost of an algorithm grows as its input grows. You ignore constants and hardware and ask a simpler question, with the input written down as a value: with `n = 1 000 000` records, does doubling `n` to `2 000 000` double the work, quadruple it, or barely move it? The alphabet of answers is small — constant `1` step, logarithmic `20` comparisons for 1 000 000 records because `2^20 = 1 048 576` covers them, linear `n = 1 000 000`, linearithmic `n * log2 n = 20 000 000`, quadratic `n * n = 1 000 000 000 000` — and precise enough to tell you which of two designs survives real data.

## Why it matters

Algorithms are where a small, correct-looking program turns into an outage. Nested loops over two lists of 100 rows each make `100 * 100 = 10 000` comparisons, which nobody notices; the same code over two lists of 100 000 rows makes `100 000 * 100 000 = 10 000 000 000`, which is why the request times out. Writing that down is also how engineers argue about a design without benchmarking it, because the growth rule holds at every size rather than only at the one you tested. And the standard procedures — sorting, searching, traversing — are solved problems with known costs, so recognising them saves you from inventing a slower version of something that already exists.

## In this track

1. **How cost grows (Big-O)** (`01-cs-fundamentals/14-algorithms-big-o/01-how-cost-grows-big-o`) — reading growth rates as formulas, and counting an algorithm's steps before writing it: why `n = 1 000 000` costs 1 000 000 steps linearly and 1 000 000 000 000 quadratically.
2. **Sorting, searching and traversal** (`01-cs-fundamentals/14-algorithms-big-o/02-sorting-searching-and-traversal`) — the standard procedures and their costs: 6 comparisons against 10 values for a scan, 20 against 1 000 000 for a halving search, and what a graph walk must record to finish at all.

## Prerequisites

- **Data Structures** (`01-cs-fundamentals/02-data-structures`)

## Go deeper

- **Pseudocode** (`01-cs-fundamentals/07-pseudocode`) — writing an algorithm in plain language, one step per line, before judging how many steps it takes.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — why two algorithms with the same operation count run at different speeds on real hardware.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — where sorting and searching happen for you, and why a page read costs far more than the comparison that chose the algorithm.
