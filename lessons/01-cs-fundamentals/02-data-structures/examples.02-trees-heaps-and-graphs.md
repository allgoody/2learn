## Example 1 — A search tree that became a list

Records arrive already sorted by id and are inserted, in that order, into a plain binary search tree with no rebalancing. The trace shows the first four inserts. Say what shape ten records produce and what one lookup then costs, then say what to change.

```text
insert 10  -> root
insert 20  -> 20 > 10, right child of 10
insert 30  -> 30 > 10 -> right -> 30 > 20 -> right child of 20
insert 40  -> 40 > 10, 20, 30 -> right child of 30

        10
          \
           20
             \
              30
                \
                 40
```

### Solution

```text
shape: every node has a right child and no left child — a path
lookup of the tenth record: 10 comparisons, one per node
fix: use a self-balancing tree, or shuffle the input before inserting
```

Each insert always turns right, so the tree grows into a chain whose height equals the number of records, and lookup, insert and delete cost the element count instead of the logarithm the tree was chosen for. The trap is that random input hides it: a tree that looks balanced in development meets sorted data in production, where ids are usually handed out in order.

## Example 2 — A traversal that never returns

A breadth-first search must report the distance from a start node to every other node and must terminate when the graph contains a cycle. The loop below records a node when it is processed. Run it on the graph shown, say what goes wrong, then fix it.

```text
graph: A -> B, B -> C, C -> A   (a cycle),  A -> D
start: A

queue = [A]
while queue not empty:
    node = queue.pop front
    if node in visited: continue
    visited.add(node)
    queue.extend(node.neighbours)
```

### Solution

```text
the cycle re-queues A, B and C forever: each node is queued once per
neighbour that reaches it, and the check only happens on the way out.

queue = [start]
visited = {start}
while queue not empty:
    node = queue.pop front
    for n in node.neighbours:
        if n not in visited:
            visited.add(n)
            queue.append(n)
```

Recording a node as it enters the frontier rather than as it is processed means each node is queued at most once, so the cycle adds no work and the loop ends; it also makes the first visit the shortest one, which is what lets breadth-first search report distances. The trap is that checking on the way out looks safer, because it guards the processing step, while doing nothing about the queue growing without bound.
