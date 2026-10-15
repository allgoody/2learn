## Example 1 — A six-up round on one screen

A support agent's screen needs to show one customer's open tickets and the reply box. You have half an hour before the group meets. Produce six numbered layout variants of that single screen, each annotated with the question it raises.

```text
Screen: open tickets for one customer + reply box.
Known: agents handle 40 tickets a day and type mostly from a template.
Unknown: whether the list or the reply should dominate the screen.
Constraint: one pencil, no colour, five minutes per sheet.
```

### Solution

```text
1  split header, search right          optimises: scanning by title
2  single column list, filters above   optimises: triage first
3  two-pane list + detail              optimises: one ticket at a time
4  card grid                           optimises: nothing here — drop it
5  table with inline edit              optimises: bulk handling
6  one action screen, one button       optimises: fast replies

Annotations on sheet 3: "what if 40 items?" / "reply box scrolls away?"
On sheet 6: "where does the ticket context live?"
On sheet 1: "tap target too small for the filter row"
```

Six rough variants in thirty minutes beats one careful drawing, because the value is the comparison: sheets 3 and 6 answer the open question from opposite ends, and sheet 4 can be discarded in the meeting rather than defended. The annotations carry the constraints noticed while drawing forward into the next round, so nothing is lost with the paper. What usually goes wrong is refining the first sketch instead of producing five more — it becomes the design by default, and the group critiques its styling because there is styling to critique.
