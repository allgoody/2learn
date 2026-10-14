---
title: Algorithms & Big-O
type: skill
topic: cs-fundamentals
tier: medium
status: drafted
aliases: ["Big-O"]
prereqs: ["cs-fundamentals/data-structures"]
related: []
---

## What it is

Big-O is shorthand for how the cost of an algorithm grows as its input grows. You ignore constants and hardware and ask a simpler question: if I double the input, does the work double, quadruple, or barely move? The alphabet of answers — constant, logarithmic, linear, linearithmic, quadratic, exponential — is small enough to carry in your head and precise enough to tell you which of two designs will survive real data.

## Why it matters

Algorithms are where a small, correct-looking program turns into an outage. A nested loop over two lists is four lines and costs the product of their sizes; at a hundred rows nobody notices, at a hundred thousand the request times out. Big-O is also how engineers argue about a design without benchmarking it: it names the reason one approach will not scale. And the standard algorithms — sorting, searching, traversing — are solved problems, so recognising them saves you from inventing a slower version of something that already exists.

## In this track

1. **How cost grows (Big-O)** (`cs-fundamentals/algorithms-big-o/01-how-cost-grows-big-o`) — reading growth rates and choosing the notation that describes an algorithm honestly.
2. **Sorting, searching and traversal** (`cs-fundamentals/algorithms-big-o/02-sorting-searching-and-traversal`) — the standard procedures, and the cost each one carries.

## Prerequisites

- **Data Structures** (`cs-fundamentals/data-structures`)

## Go deeper

- **Pseudocode** (`cs-fundamentals/pseudocode`) — writing an algorithm in plain language before judging how it grows.
- **Operating Systems** (`cs-fundamentals/operating-systems`) — what the memory access pattern behind an algorithm costs on real hardware.
- **Database Internals** (`cs-fundamentals/database-internals`) — where sorting and searching happen for you, and why the notation still applies.
