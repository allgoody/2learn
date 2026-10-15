## Example 1 — A hint that only passes on paper

A form's hint text is drawn at `#8A8A8A` on white. A reviewer calls it fine, but it disappears outdoors. Check the pair, then name a replacement that passes and say by how much.

```text
Field label   #333333 on #FFFFFF
Hint          #8A8A8A on #FFFFFF   "No spaces, at least 12 characters"
```

### Solution

```text
Hint   #595959 on #FFFFFF   ratio ≈ 7.0:1   passes
Old    #8A8A8A on #FFFFFF   ratio ≈ 3.45:1  fails
Label  #333333 on #FFFFFF   ratio ≈ 12.6:1
```

Against the 4.5:1 minimum for normal text, the replacement pair clears it by more than two, while the original sits below it — the difference between a difference and a decoration. The trap is trusting the screen: `#8A8A8A` looks grey enough in a bright room, so check the ratio rather than the eye.

## Example 2 — A column of numbers that will not line up

A totals block centres its heading and its figures, so the digits drift and the reader compares them by hand. Align it to a single left edge and a numeric right edge.

```text
       Invoice total
         1,204.00
            86.50
        12,000.00
```

### Solution

```text
Invoice total
     1,204.00
        86.50
    12,000.00
```

The heading sits on the left edge with the column of figures and the digits share a right edge, so decimal points stack and comparison is instant. Centred numbers look tidy one line at a time and ragged as a column, which is why the rule is: centre only what has no natural edge, and right-align anything numeric.
