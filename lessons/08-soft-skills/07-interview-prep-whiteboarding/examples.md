## Example 1 — Narrate instead of going quiet

The interviewer has asked you to return the k values that occur most often in a list. You have read the prompt, looked at the board, and said nothing for four minutes. Rewrite the start as a think-aloud.

```text
Interviewer: return the k values that occur most often in this list.
You:         (reads the prompt again, stares at the board, says nothing)
```

### Solution

```text
You: Let me check I have it: you want the k most frequent values, not
     sorted, and they can come back in any order? Can k be larger than
     the number of distinct values, and do ties break by value or by
     first appearance?
Interviewer: k will always fit, and ties can break however you like.
You: Then a small case: [1, 1, 2, 3, 3, 3] with k = 2 gives 3, then 1.
     The obvious version counts every occurrence for each value, which
     repeats work. One pass into a map of value to count, then take the k
     largest counts, does the same job in one pass plus the selection.
     I will write the map version and trace it on that example.
```

The reasoning is what is being scored: restating and clarifying, naming a correct baseline before improving it, and testing your own work on a small case. The silent version shows none of that, so it reads as stuck even when the answer is right. The usual mistake is waiting until the solution is certain before speaking; the interviewer cannot grade a conclusion that arrives without its method.
