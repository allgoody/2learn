---
title: Trees, heaps and graphs
prereqs: ["01-cs-fundamentals/02-data-structures/01-arrays-lists-and-hash-maps"]
---

## What it is

An array, a linked list and a hash map keep values in a row or under a key, which answers "what sits at this position" and "what sits under this name". They answer two other questions badly: what is ordered from smallest to largest, and what is connected to what. A tree links each value to one parent above it and to children below, so the values sit in a hierarchy instead of a row; a heap is a tree obeying one extra rule that keeps the smallest value on top; a graph drops the hierarchy and lets any node point at any other.

## Why it matters

Flat shapes are cheap until the data acquires an order or a set of connections, and then the wrong shape turns a fast operation into a slow one. Say 1 000 000 records are kept in order inside an array: inserting one new record in its place shifts every record behind it, up to 1 000 000 of them, while a balanced tree reaches any of those records — to find it, insert it or delete it — in at most 20 steps, because a tree 20 levels tall holds 2^20 - 1 = 1 048 575 records and that covers 1 000 000. That is why an ordered map and a database index are trees underneath. A heap answers "which of these 1 000 000 jobs runs next" without ever putting the other records in order, which is why schedulers and rate limiters keep one. Graphs are the shape of anything with routes, dependencies or links between pages, and a traversal that never records where it has been follows a cycle forever: on the graph whose edges are A → B, B → C and C → A, it walks A, B, C, A, B, C without end and never finishes.

## Core ideas

### A tree links each value to a parent and its children

A tree is built from nodes. A node stores one value and links to other nodes, and each link is an edge. The one node without a parent is the root; a node without children is a leaf; the run of edges from one node to another is a path. The height of a tree is the number of nodes on its longest path from the root down to a leaf, so a tree that is a root alone has height 1.

```text
        50            root: the only node with no parent
      /    \
    30      70        both children of 50, and 50 is their parent
   /  \    /  \
  20   40 60   80     leaves: the four nodes with no children

the path 50 -> 30 -> 20 holds two edges and three nodes
height = 3, the node count of the longest root-to-leaf path
a lookup visits at most as many nodes as the height, so at most 3 here
```

A tree whose nodes have at most two children is a binary tree, and a binary search tree adds one rule to it: every value in a node's left subtree — that node's left child and everything below it — is smaller than the node's own value, and every value in its right subtree is larger.

```text
the tree above, checked at its root, 50
  left subtree:  30, 20, 40   three values, all smaller than 50
  right subtree: 70, 60, 80   three values, all larger than 50

lookup 40
  40 < 50, so 40 can only be in the left subtree: compare 50, go to 30
  40 > 30, so 40 can only be in the right subtree: compare 30, go to 40
  40 = 40, found: three comparisons, against the nodes 50, 30, 40
```

Each comparison throws away one whole subtree, so a lookup follows one path from the root towards a leaf and visits at most as many nodes as the tree is tall — at most 3 on the seven-value tree above, at most 20 on a balanced tree of 1 000 000 values. An insert and a delete each walk the same way to find their place, so a tree costs its height, never the number of values it holds.

### A balanced tree keeps its height short

Each new level can hold one more value than every level above it together, so the number of values a tree holds roughly doubles with every level, and the height grows with the number of times you can halve the value count, not with the count itself.

```text
every level filled, counting the root as height 1
height 1:                     1 root                                1 value
height 2:          1 root + 2 children                               3 values
height 3:    1 root + 2 + 4 grandchildren                           7 values
height 4: 1 root + 2 + 4 + 8 great-grandchildren                  15 values

each level holds one more value than all the levels above it together,
so a tree of height h holds 2^h - 1 values
2^20 means 2 raised to the power 20, twenty copies of 2 multiplied together:
  2 * 2 * ... * 2 = 1 048 576

height  1:   2^1  - 1 =       2 - 1 =         1 value
height  2:   2^2  - 1 =       4 - 1 =         3 values
height  4:   2^4  - 1 =      16 - 1 =        15 values
height 19:   2^19 - 1 = 524 288 - 1 =   524 287 values
height 20:   2^20 - 1 = 1 048 576 - 1 = 1 048 575 values

524 287 is fewer than 1 000 000, so height 19 cannot hold the records
1 048 575 is at least 1 000 000, so height 20 can
1 000 000 records therefore sit 20 levels deep, and a lookup visits at most 20 nodes
```

A balanced tree rewrites a few edges after each insert so its height stays within a small factor of that minimum, whatever order the values arrive in. AVL trees and red-black trees are the two you meet most: a red-black tree of 1 000 000 values is at most 40 levels tall — twice the 20 of a perfectly balanced tree — because it tolerates the two subtrees of a node differing by a factor of two rather than being exactly equal. That is what makes an ordered map and a database index predictable: 1 000 000 records, 20 to 40 comparisons, however they were inserted.

Feed a plain, unbalanced search tree its values in sorted order and every insert turns the same way, so the tree becomes a chain and the height falls back to the value count.

```text
insert 10, 20, 30, 40 in that order into a plain binary search tree
every new value is larger than everything already in the tree, so every insert turns right

        10
          \
           20
             \
              30
                \
                 40

after 4 inserts the height is 4: the chain 10 -> 20 -> 30 -> 40, one node per level
the search for 40 compares against all four nodes
the same 4 values in a balanced tree sit at height 3, so that search compares against at most three
at 1 000 000 sorted values the chain is 1 000 000 tall, and the search costs 1 000 000 comparisons instead of 20
```

### A heap keeps one value cheap to reach

A heap is a binary tree stored in an array, obeying one extra rule: in a min-heap every parent is smaller than each of its children. A max-heap turns the comparison around, and everything below holds for either. That rule puts the smallest value at the root and promises nothing about the rest.

```text
the array [3, 5, 9, 8], read as a tree by the slot each value sits in, counting from 0
slot     0    1    2    3
value    3    5    9    8

        3              slot 0, the root
      /   \
     5     9           slots 1 and 2, the children of slot 0
    /
   8                   slot 3, the child of slot 1

the slots are the links: a node in slot i keeps its children in slots 2i + 1 and 2i + 2,
and its parent in slot (i - 1) / 2, rounded down

slot i = 1 holds 5: 2 * 1 + 1 = 3 and 2 * 1 + 2 = 4
  so its children sit in slot 3 (the 8) and slot 4 (empty)
slot i = 3 holds 8: (3 - 1) / 2 = 1
  so its parent sits in slot 1 (the 5), and the rule needs 5 < 8, which holds
```

A push appends the new value in the next free slot and swaps it upward while it is smaller than its parent; a pop keeps the root, moves the last value into slot 0, and swaps it downward while it is larger than a child. Each swap moves one level, so both cost at most the height of the heap.

```text
push 1 into [3, 5, 9, 8]
  append 1 in slot 4:                                            [3, 5, 9, 8, 1]
  parent of slot 4 is (4 - 1) / 2 = 1, holding 5;  1 < 5, swap:  [3, 1, 9, 8, 5]
  parent of slot 1 is (1 - 1) / 2 = 0, holding 3;  1 < 3, swap:  [1, 3, 9, 8, 5]
  slot 0 has no parent, so the push stops: two swaps for five values, one per level climbed
  the same push into a heap of 1 000 000 values costs at most 20 swaps, because that heap is 20 levels deep
```

Only the root is in its final place. The array [2, 5, 3, 8, 9] obeys the rule — 2 < 5, 2 < 3, 5 < 8, 5 < 9 — and yet its second smallest value is the 3 in slot 2, not the 5 in slot 1, so the heap does not order the rest. A heap is for "give me the next one", never for "give me all of them in order": reading every value in order means 1 000 000 pops, each costing up to 20 swaps, and 1 000 000 * 20 = 20 000 000 swaps — more than the 1 000 000 reads a sorted array would need to read the same 1 000 000 values in order, one read per value. A collection you always take the most important item from next is a priority queue, and a heap is the usual way to build one.

### A graph allows any node to point at any other

A graph is nodes plus edges with no parent-and-child rule: any node may point at any other. A graph can therefore hold a cycle — a path that returns to where it started — and it need not be connected, so one group of nodes may have no edge to another at all. An edge may have a direction, so A → B does not by itself make B → A an edge, and it may have a weight, a number such as a distance in kilometres. Traversal has to remember where it has already been, or a cycle sends it round forever.

```text
nodes: A, B, C, D
edges: A -> B, B -> C, C -> A, A -> D
A -> B -> C -> A is a cycle: three edges that return to A

frontier = [A]         nodes found but not yet visited
visited  = {}          nodes already reached, so no node is added twice

step 1  take A from the front   -> visited {A},         frontier [B, D]
step 2  take B                  -> visited {A, B},      frontier [D, C]
step 3  take D, which has no edges to follow
                                -> visited {A, B, D},   frontier [C]
step 4  take C; A is already visited, so C does not add it again
                                -> visited {A, B, C, D}, frontier empty

4 nodes visited and 4 edges followed; each node entered the frontier once
```

Taking a node from the front of the frontier is a breadth-first search: it visits A, then everything one edge away, then everything two edges away, so the first time it reaches a node is by the fewest edges. Taking from the back instead is a depth-first search: it follows one path to its end before trying another, which is the shape for asking whether two nodes are connected at all, or whether the graph contains a cycle. Both are the loop above with one line changed — front or back.

### The shape of the data decides the traversal

Before writing the loop, ask what the edges mean, because the shape fixes both the algorithm and what the traversal must carry.

```text
kind of graph                what an edge means          the traversal        what it must remember
tree, no cycles              a folder contains a file    visit every node     nothing
directed, acyclic            a task needs another task   order by depth       which tasks are still waiting
undirected, weighted         a road of a given length    shortest route       the best distance so far per stop
general graph with cycles    a page links to a page      breadth-first        every node already visited
```

A file system has no cycles, so a recursive walk of it needs no bookkeeping. A build graph is directed and must have no cycle, so the check for one comes before the build, not after it. A road network is weighted, so the shortest route needs the distance on each road and not just the number of roads. Naming the shape first turns a vague "search the data" into a specific algorithm with a known cost.

## Practice

### Build a search tree and measure its height

Take 50 records with a numeric key. Insert them into a binary search tree you write yourself, once in key order and once shuffled, and record the height of each tree afterwards.

Done when: you can state both heights, explain why the sorted build is a chain, and compare them with the 6 levels a balanced tree allows — height 6 holds 2^6 - 1 = 64 - 1 = 63 values and 63 >= 50, while height 5 holds 2^5 - 1 = 32 - 1 = 31, which is too few.

### Find the fewest edges between two stops

Model five stops as nodes and the roads between them as unweighted, undirected edges, arranged so that all four other stops are reachable from the one you start at. Run a breadth-first search from that stop and print the number of edges to each of the other four.

Done when: the four distances are correct, and you can explain why the first visit to a stop is the one with the fewest edges — the search visits every stop 0 edges away, then every stop 1 edge away, then every stop 2 edges away, so it cannot reach a stop in 3 edges before it reaches it in 2.

## Common mistakes

- **Inserting sorted data into a plain search tree** — every insert compares against a smaller value and turns the same way, so 1 000 000 sorted values build a chain whose height is 1 000 000 and a lookup visits all of them instead of 20; fix: use a self-balancing tree, or shuffle the values before inserting them.
- **Expecting a heap to be sorted** — only slot 0 is in its final place, so the second smallest value is not in slot 1: in the valid heap [2, 5, 3, 8, 9] it is the 3 in slot 2; fix: pop the values one at a time when you need the full order, at up to 20 swaps per value on a heap of 1 000 000.
- **Forgetting the visited record** — a graph with the cycle A → B → C → A puts A back on the frontier every time the cycle is followed, so the traversal never ends; fix: add every node to the visited set as it enters the frontier, not as it is taken out, so it enters once rather than once per edge that reaches it.
- **Reaching for a graph when the data is a tree** — cycle handling that never runs still costs a visited set holding one entry per node, 1 000 000 entries on 1 000 000 nodes, and it hides the invariant that the data holds no cycles; fix: name the shape, in the type or in the variable name, before choosing the structure.
- **Following a large graph by recursion** — a path of 1 000 000 nodes nests 1 000 000 calls, one frame per call, and most runtimes abort long before that, Python after 1 000 frames by default; fix: keep the frontier in an explicit queue or stack instead of the call stack.

## Go deeper

- **Arrays, lists and hash maps** (`01-cs-fundamentals/02-data-structures/01-arrays-lists-and-hash-maps`) — the flat shapes these are built from, and the slot arithmetic a heap in an array still relies on.
- **Algorithms & Big-O** (`01-cs-fundamentals/14-algorithms-big-o`) — writing "20 steps instead of 1 000 000" as a rule that holds at every size, rather than counting each case out.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — the same tree, stored on disk, behind every index you create.
