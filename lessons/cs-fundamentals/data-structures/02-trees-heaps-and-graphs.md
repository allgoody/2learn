---
title: Trees, heaps and graphs
prereqs: ["cs-fundamentals/data-structures/01-arrays-lists-and-hash-maps"]
---

## What it is

Flat collections answer "what is at this key". Trees, heaps and graphs answer the other two questions: what is ordered, and what is connected to what. A tree links each value to a parent and children, a heap keeps the most important value on top, and a graph allows any node to point at any other. They are the structures behind sorted indexes, task queues and route finding.

## Why it matters

Ordered and connected data is where naive code first falls over. Inserting into a sorted array keeps the order but copies the tail; asking a linked list for "the smallest" means walking all of it. A balanced tree gives you insertion and lookup in the same growing cost, which is why database indexes and ordered maps are trees underneath. A heap gives you "the next most urgent job" in a fixed cost, which is why schedulers and rate limiters use one. Graphs are the shape of anything with routes, dependencies or relationships, and getting the traversal wrong is how a crawler loops forever.

## Core ideas

### A tree orders by structure, not by position

A binary search tree keeps every value in a left subtree smaller than the root and every value in a right subtree larger. Lookup, insert and delete each follow one path from root to leaf, so the cost grows with the height of the tree rather than the number of values — provided the tree stays balanced. Insert sorted input into an unbalanced tree and it degenerates into a linked list, which is why self-balancing variants are the ones you usually meet.

```text
        50
      /    \
    30      70
   /  \    /  \
  20   40 60   80

search 40: 40 < 50 -> left; 40 > 30 -> right; found
```

### A heap keeps one value cheap to reach

A heap is a tree stored in an array, with the rule that every parent outranks its children. That one rule puts the minimum, or maximum, at index zero, and rebuilding after a push or pop costs the depth of the tree. Heaps do not keep the rest sorted — only the top is meaningful — which is exactly what a priority queue needs.

```text
push 7 into [3, 5, 9, 8]:  place at the end, then swap up while
smaller than its parent.  pop: move the last element to the
root, then swap down.  Both cost O(log n).
```

### Graphs are the general case

A graph is nodes plus edges, and it can hold cycles and disconnected pieces, so traversal needs a record of where it has already been. Breadth-first search explores in rings from the start and finds shortest paths in an unweighted graph; depth-first search dives and suits reachability, cycle detection and topological order. Both are the same loop with a queue or a stack as the frontier.

```text
visited = set()
queue = [start]
while queue not empty:
  node = queue.pop front
  if node in visited: continue
  visited.add(node)
  queue.extend(node.neighbours)
```

### The shape of the data decides the traversal

Before writing the loop, ask what the edges mean. A dependency graph is directed and must not contain a cycle. A road network is weighted, so shortest path needs the weights. A file system is a tree, so it has no cycles and a recursive walk is safe. Naming the shape first turns a vague search into a specific algorithm.

## Practice

### Build an index by hand

Take a list of fifty records with a numeric key. Store them in a balanced binary search tree you implement yourself, and support lookup and ordered listing.

Done when: lookup touches no more than a handful of nodes per query, and listing walks the tree in order.

### Find the shortest route in a small graph

Model five stops and the connections between them. Run a breadth-first search from one stop and print the distance to each of the others.

Done when: the distances are correct, and you can explain why the first visit to a node is the shortest one.

## Common mistakes

- **Inserting sorted data into a naive search tree** — the tree becomes a linked list and every lookup degrades; fix: use a self-balancing tree, or shuffle the input.
- **Forgetting the visited set** — a graph with a cycle sends the traversal round forever; fix: record every node the moment it enters the frontier, not when it is processed.
- **Expecting a heap to be sorted** — only the top element is guaranteed, so reading the rest in order is a bug; fix: pop repeatedly if you need a full ordering.
- **Reaching for a graph when the data is a tree** — unnecessary cycle handling adds code and hides the invariant; fix: state the shape in the type or the name before choosing a structure.
- **Traversing a large graph recursively** — deep recursion exhausts the call stack on real data; fix: use an explicit queue or stack for anything that can be large.

## Go deeper

- **Arrays, lists and hash maps** (`cs-fundamentals/data-structures/01-arrays-lists-and-hash-maps`) — the flat structures these are built from, and the trade-offs they carry upward.
- **Algorithms & Big-O** (`cs-fundamentals/algorithms-big-o`) — why tree height, not element count, is the number that matters here.
- **Database Internals** (`cs-fundamentals/database-internals`) — the same tree, on disk, behind every index you create.
