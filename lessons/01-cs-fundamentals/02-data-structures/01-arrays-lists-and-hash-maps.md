---
title: Arrays, lists and hash maps
prereqs: []
---

## What it is

A program almost always keeps several values together — the prices in a basket, one record per user — and there are three everyday shapes for doing that. An array stores values side by side in one block of memory; a linked list stores them wherever there is room, each value remembering the address of the next; a hash map stores each value under a key, the way a dictionary stores a definition under a word. Almost every other structure is built from these three.

```text
array  [10][20][30]      one block, values side by side
list   A -> C -> F      scattered values, each holds the next one's address
map    "alice" -> 30    the value 30, stored under the key "alice"
```

## Why it matters

The shape is invisible in a demo and decisive in production. Say a site checks whether a username is free, with ten million names taken: stored in an array, the check compares the new name against stored names one at a time — up to ten million comparisons per check; stored in a hash map, the check computes which slot the name would sit in and looks there, about two steps whether the table holds ten names or ten million. The wrong shape leaves code that is correct on every input and slow on every input — nothing crashes, the page just takes thousands of times longer than it should. That is why the choice is made deliberately, not by reaching for the default.

## Core ideas

### Memory is one long row of numbered slots

Everything a program stores — every number, every letter of every word — lives in memory, which is one long row of slots. A slot holds one byte, the space a single character needs, and each slot carries its own number, its address: the row starts at 0, the next slot is 1, and so on. "The value 20 is at address 1000" means: the slot numbered 1000 holds the pattern of bits that means 20.

```text
address    0      1      2      3
content    'a'    'b'    'c'    'd'     one byte per slot, one character per byte
```

### An array finds any item by arithmetic

An array reserves one unbroken run of slots and fills it in order; a value's place in that run is its index, and counting starts at 0, so the first value has index 0, the second index 1. Because the run is unbroken and every value in it takes the same number of bytes, the address of any item can be calculated instead of searched for:

```text
five numbers, each taking 4 bytes, the run starts at address 1000

address    1000   1004   1008   1012   1016
value        10     20     30     40     50
index         0      1      2      3      4

start = 1000   the address where the run begins
index = 3      the fourth value, because counting starts at 0
size  = 4      bytes one number takes up

start + index * size = 1000 + 3 * 4 = 1012
```

1012 is where the value 40 lives, so reading it takes one calculation and one visit — the machine never looks at 10, 20 or 30 on the way. Memory is even fetched in runs of 64 bytes, and 64 bytes hold sixteen of these 4-byte numbers, so visiting index 3 brings indexes 0 to 15 along with it. The price of the unbroken run shows up on insert: putting 25 between 20 and 30 has no free slot to use, so 30, 40 and 50 each shift one slot to the right first.

### A dynamic array doubles when it runs out

In most languages the everyday "list" is a dynamic array: one unbroken run with two counts kept beside it. `length` is how many values are held now, `capacity` is how many slots were reserved — reserving a run of slots is called allocating. When an append would exceed the capacity, the language allocates a run twice the size, copies the values across, and appends:

```text
start empty, doubling each time the run fills

length 0, capacity 0    append 7:  allocate 1 slot,                 write 7
length 1, capacity 1    append 8:  allocate 2 slots, copy 7,         write 8
length 2, capacity 2    append 9:  allocate 4 slots, copy 7, 8,       write 9
length 3, capacity 4    append 4:  spare capacity, no allocation,    write 4
length 4, capacity 4    append 1:  allocate 8 slots, copy 7,8,9,4,   write 1

five appends: five writes, seven copies
```

One append can copy the entire run, which looks expensive; spread across all appends it averages out — seven copies over five appends, and the longer the sequence, the closer to one copy per append. That flat average is the amortised cost: the cost per operation a program actually pays, not the cost of its worst single step.

### A linked list stores the address of the next value

A linked list gives up the unbroken run. Each value lives in its own small package, a node, which stores the value and the address of the next node; the list is the chain of those addresses, and the last node stores "no next":

```text
node A: value 10, next = C's address
node C: value 20, next = F's address
node F: value 30, next = none

insert 25 between A and C:
  node B: value 25, next = C's address
  A's next changes from C's address to B's address
  C and F are not touched
```

Inserting costs two address writes wherever the list is long — no copying, no shifting. The price is that no arithmetic reaches a node: the nodes are not side by side, so "the fourth value" means four hops, one node at a time, and a list of ten thousand nodes takes up to ten thousand hops to reach one chosen node. A linked list earns its keep when values are inserted and removed constantly and rarely fetched by position; otherwise an array beats it.

### A hash map computes which slot a key belongs in

An array answers "what is the fourth value?", but programs usually ask for a value by name: the age stored under the name "alice". The name is the key, the stored value — here 30 — is the value, and a hash map stores value under key in an array of slots, choosing the slot by arithmetic on the key:

```text
the map holds 8 slots, numbered 0 to 7
every letter has a fixed code: a = 97, l = 108, i = 105, c = 99, e = 101
hash("alice") = 97 + 108 + 105 + 99 + 101 = 510
slot = the remainder after dividing 510 by 8
      = 510 - 63 * 8 = 510 - 504 = 6

slot 6: "alice" -> 30
lookup("alice"): codes add to 510 -> remainder 6 -> slot 6 -> 30
```

Two keys can land in one slot — that is a collision — and the map keeps both, comparing keys on lookup:

```text
hash("erin") = 101 + 114 + 105 + 110 = 430
slot = 430 - 53 * 8 = 430 - 424 = 6        <- same slot as "alice"

slot 6: "alice" -> 30, "erin" -> 55

lookup("erin"):  codes add to 430 -> slot 6
                 -> "alice" is not "erin" -> "erin" matches -> 55
```

A lookup is one hash plus a comparison or two, whether the map holds ten pairs or ten million — a collision costs a few comparisons, never a walk over every pair. When the table gets crowded, past roughly six of its eight slots, the map allocates a table twice the size and re-files every key into it. That re-filing is why a hash map has no dependable iteration order: which slot a key sits in depends on the table's size, and the size changes as the map grows.

### Choose by the operation you do most

Before choosing, write down the three or four operations the code performs most, and read off what each shape charges for them. For a collection of 10 000 values:

```text
operation                       array                       linked list       hash map

read the value at index 4 999   1 calculation               4 999 hops        not offered
find the value under a key      up to 10 000 comparisons    10 000 hops       1 hash + 1 slot
insert at the front            shifts 10 000 values         2 address writes  1 hash + 1 slot
```

Lookup by key: the map. Reading in order or by position: the array. Inserting and removing at a spot you already hold: the linked list. No shape is fast at everything — each one pays for its strength somewhere else.

## Practice

### Count the cost of one lookup

Take a function you have written that searches a collection for one value. Name the shape it uses, say how many values the collection holds at its largest, and count the steps one search takes: a scan costs one comparison per value, an indexed read costs one calculation, a map lookup costs one hash plus the comparisons inside one slot.

Done when: you can state the collection's size and the search's step count, and name a shape that would do it in fewer steps.

### Replace a scan with a map

Find a loop you have written that scans a list to find one item by id. Build a map keyed on that id once, before the loop, and replace the scan with a lookup.

Done when: the function returns identical results and the scan is gone from the loop.

## Common mistakes

- **Assuming the language's "list" is a linked list** — in most languages it is a dynamic array, so indexing is one calculation while inserting at the front shifts the tail; fix: check which of the three shapes it is before relying on its costs.
- **Scanning inside a loop** — a scan of 10 000 values, run once per value, is 10 000 × 10 000 = 100 000 000 comparisons; fix: build a map once, before the loop, and look up instead of scanning.
- **Relying on hash map iteration order** — a key's slot depends on the table's size, and the size changes when the map grows, so output order shuffles; fix: sort the keys whenever order matters.
- **Using a changeable object as a hash key** — the map filed the object by a hash of its contents, so changing the object moves it to a slot the map no longer looks in; fix: key on a value that cannot change, such as an id.
- **Deleting from the middle of an array inside a loop** — each deletion shifts every value behind it, so 10 000 deletions move roughly 50 000 000 values, about half the tail per deletion; fix: build a new collection with the survivors, or iterate backwards.

## Go deeper

- **Algorithms & Big-O** (`01-cs-fundamentals/14-algorithms-big-o`) — writing these step counts down as growth rules, so "10 000 comparisons" becomes a statement about every size.
- **Trees, heaps and graphs** (`01-cs-fundamentals/02-data-structures/02-trees-heaps-and-graphs`) — what to reach for when the values are ordered or connected rather than flat.
- **Pseudocode** (`01-cs-fundamentals/07-pseudocode`) — sketching the access pattern before committing to a shape.