---
title: Choosing the right chart
prereqs: []
---

## What it is

Choosing a chart means naming the comparison the reader has to make, then picking the form that makes that comparison easiest. The data rarely dictates the form; the question does. Most chart mistakes are wrong-form mistakes, not drawing mistakes.

## Why it matters

Different forms answer different questions, and a reader has one second to extract the answer. A pie chart of eight categories makes comparison nearly impossible, while the same data as a sorted bar chart takes a glance. Choosing well is the difference between a chart that informs a decision and one that is decoration with numbers attached.

## Core ideas

### Name the question, then the form

Write the comparison in a sentence, then look it up.

```text
Question                                  Form
Which category is largest?                sorted bar
How has this changed over time?           line
Is this one of many, or exceptional?      dot plot or bar with a reference line
How do parts make up a whole?             stacked bar (or a table)
Is there a relationship between two?      scatter
What is the distribution?                 histogram
```

### Bars for comparison, lines for change

Bars answer "which is more" and are read by length; lines answer "what happened next" and are read by slope. Using a line for unrelated categories implies a sequence that does not exist; using bars for a time series hides the trend.

### Sort bars by value, not alphabetically

Alphabetical order makes the reader scan the whole chart to find the largest. Sorting by value turns the chart into a ranking.

```text
Alphabetical:  Bristol, Leeds, London, Manchester, York
By value:      London 420, Manchester 310, Bristol 240, Leeds 180, York 90
```

### Keep pies and donuts for two or three slices

A reader compares angles poorly. Two or three shares of one whole is about the limit; anything more should be a bar chart or a table.

```text
Good pie:  mobile 60% / desktop 40%
Bad pie:   eight categories, six of them under 5%
```

### A table is a legitimate answer

When the reader needs exact values, or the categories are many and unrelated, a well-formatted table beats any chart. Sorting and alignment do most of the work.

## Practice

### Re-form three charts

Take three charts from your product, write the question each is meant to answer, and re-form any where the form does not match the question.

Done when: each chart has its question written beside it and either matches it or has been replaced.

### Sort one chart by value

Find a bar chart in alphabetical or arbitrary order and sort it by value. Note what becomes visible.

Done when: the largest and smallest values are readable without scanning the axis labels.

## Common mistakes

- **A pie with many slices** — angles cannot be compared and the chart is unreadable; fix: use a sorted bar chart or a table.
- **Lines connecting unrelated categories** — the slope implies a trend that does not exist; fix: bars for comparison, lines only for time.
- **Alphabetical bar order** — the ranking is hidden and the reader scans everything; fix: sort by value.
- **A chart where a table would do** — exact values and many categories are both worse in a chart; fix: use a sorted table.
- **Choosing the form before the question** — the chart answers something nobody asked; fix: write the question first and look up the form.

## Go deeper

- **Data Visualization** (`03-design-ux/31-data-visualization`) — the track this choice opens.
- **Drawing it honestly** (`03-design-ux/31-data-visualization/02-drawing-it-honestly`) — the axis, colour and labelling rules that follow.
- **Color Theory** (`03-design-ux/29-color-theory`) — colour as a channel, including for colour-blind readers.
- **Visual Design** (`03-design-ux/10-visual-design`) — hierarchy and spacing applied to a chart.
