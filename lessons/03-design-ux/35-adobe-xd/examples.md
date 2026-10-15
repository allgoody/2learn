## Example 1 — One drawn row repeated into a list

You are laying out an orders screen in Adobe XD. One row has been drawn correctly and the list needs eight rows holding real values of different lengths, with the same status treatment on every one. Produce the finished list and the steps that produced it.

```text
Single row, one artboard
[#10482]   [Bristol]   [£46.20]   [Delivered]
```

### Solution

```text
Steps taken in the tool
1. Draw one order row: number, city, total, status badge
2. Select the row and set the repeat grid to eight rows
3. Set the row gap once, on the grid, and never per row
4. Turn the status badge into a symbol with three states
5. Swap in real values; the badge stays one component

Longest real value:  [#10482]  [Bournemouth]  [£1,046.20]  [Delivered]
Shortest real value: [#7]      [Bath]         [£4.99]      [Pending]
```

The repeat grid does the copying, so one spacing decision reaches all eight rows; the badge symbol keeps the status readable and identical across instances. The usual mistake is pasting rows by hand, which drifts within an hour and turns every later layout tweak into eight separate edits.

## Example 2 — Animating one transition, then recording what it leaves out

A prototype has to show the summary row opening into its detail panel. Make the transition run in the shared preview, then write the note that travels with the prototype when it goes to an engineer.

```text
Artboard A: orders list, one row selected
Artboard B: order detail panel
Open question: does the row-to-detail move read correctly?
```

### Solution

```text
In the tool
Name the shared element "order-summary" on both artboards
Set the transition between them to auto-animate, 250 ms
Publish the prototype link and watch it at normal speed

Note sent with the link
covers:      summary to detail for a delivered order
missing:     empty list, load failure, order with no tracking
not the spec: colour and spacing come from the component library
```

Naming the element identically on both artboards is what lets the move run without coding, and the note stops the prototype being read as the specification. The usual mistake is animating every screen in the file, which turns the prototype into a tour of transitions rather than a test of the task.
