## Example 1 — A search tree that became a list

Records arrive already sorted by id and are inserted, in that order, into a plain binary search tree that never rebalances itself. A record is one stored item, its id is the numeric key it is sorted by, and every insert walks down from the root comparing the new id against the id in each node it passes. The trace below is what the first four inserts produce. Say what shape ten records make, how many comparisons one lookup then takes, and what to change.

```text
insert 10 -> the tree is empty, so 10 becomes the root
insert 20 -> 20 > 10, so 20 becomes the right child of 10
insert 30 -> 30 > 10, right to 20;  30 > 20, so 30 becomes the right child of 20
insert 40 -> 40 > 10, right to 20;  40 > 20, right to 30;  40 > 30, so 40 becomes the right child of 30

        10
          \
           20
             \
              30
                \
                 40

height 4 after 4 inserts: the longest path, 10 -> 20 -> 30 -> 40, holds four nodes
```

### Solution

```text
shape of ten records: a chain — every node is the right child of the node above it
height:               10, because the height equals the number of records
lookup of the tenth record: 10 comparisons, one at each node from 10 down to that record

a balanced tree of the same ten records: height 4
  2^4 - 1 = 16 - 1 = 15 values fit in 4 levels, and 15 >= 10
  2^3 - 1 =  8 - 1 =  7 values fit in 3 levels, and  7 <  10
so the same lookup takes at most 4 comparisons, against 10 in the chain
```

Every insert compares against a value smaller than the new record, so it turns right at every node and the tree grows into a chain whose height is the record count: 10 comparisons per lookup here, 1 000 000 once a million sorted records have arrived, against at most 20 in a balanced tree of the same 1 000 000, because 2^20 - 1 = 1 048 575 values fit in 20 levels and 1 048 575 >= 1 000 000. A lookup, an insert and a delete then cost the record count instead of the height, which is the opposite of what the tree was chosen for. The trap is that shuffled test data hides the chain: a tree looks balanced in development, and the ids arrive in order in production.

## Example 2 — A traversal that never returns

A breadth-first search must report the number of edges from a start node to every other node, and it must end on a graph that contains a cycle. The loop below keeps no record of where it has been: `frontier` holds the nodes found but not yet visited, `node` is the node taken from the front of it, and `node.edges` lists the nodes that a single edge from `node` points at. Run the loop on the graph shown, say what happens, then fix it.

```text
graph: A -> B, B -> C, C -> A   (a cycle of three nodes),  A -> D
start: A

frontier = [A]
while frontier not empty:
    node = take from the front of frontier
    frontier.extend(node.edges)
```

### Solution

```text
step 1  frontier [A]     -> visit A, extend with B and D    frontier [B, D]
step 2  frontier [B, D]  -> visit B, extend with C          frontier [D, C]
step 3  frontier [D, C]  -> visit D, which has no edges     frontier [C]
step 4  frontier [C]     -> visit C, extend with A          frontier [A]
step 5  frontier [A]     -> visit A, extend with B and D    frontier [B, D]
... and step 6 is step 2 again: the cycle puts A back on the frontier every time C is visited

fixed loop, where `n` is one node that an edge from `node` points at:
frontier = [start]
visited  = {start}
while frontier not empty:
    node = take from the front of frontier
    for n in node.edges:
        if n not in visited:
            visited.add(n)
            frontier.append(n)

distances from A: A 0 edges, B 1 edge, D 1 edge, C 2 edges
  B and D are reached straight from A; C is reached from B, so it is two edges away
the fix records a node as it enters the frontier, so each of the 4 nodes enters once:
  A as the seed, then B, D and C, one append per node
```

Recording a node as it enters the frontier rather than as it is taken out means the cycle adds nothing the second time round, and it is also what makes the first visit the one with the fewest edges — that is what lets a breadth-first search report distances at all. The trap is the loop that checks `visited` only when taking a node out: it does end, but a node is added to the frontier once for every edge that reaches it, so a graph with 1 000 000 edges pointing at one node fills the frontier with 1 000 000 copies of it.
