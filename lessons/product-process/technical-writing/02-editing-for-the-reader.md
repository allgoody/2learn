---
title: Editing for the reader
prereqs: ["product-process/technical-writing/01-structure-of-a-spec-or-readme"]
---

## What it is

Editing for the reader is the pass after the first draft: cutting what the reader does not need, putting the important sentence first, replacing abstraction with a concrete instruction, and then testing the result on somebody who is not the author.

## Why it matters

First drafts are written for the author's memory — they include whatever was in the writer's head, in the order it came to mind. That is useful for drafting and useless for reading. The editing pass is where a document becomes something a stranger can act on, and it is the difference between documentation that is consulted and documentation that is skimmed and abandoned.

## Core ideas

### Delete the first paragraph

It is almost always the author warming up: restating the topic, apologising for the document, explaining what it will cover. Start at the second paragraph.

```text
Before  "This document describes the refund process. It is intended
         for support staff and aims to cover the various cases..."
After   "Refund a card payment within 90 days: Support > Orders > Refund."
```

### One idea per sentence, and the idea first

Put the instruction before its justification. A reader looking for the action can stop reading; a reader who wants the reason keeps going.

### Replace the abstraction with the example

"Handle errors gracefully" instructs nobody. "If the export fails, retry twice, then email support with the job id" can be done.

```text
Abstract   The system should be resilient to network failures.
Concrete   If the upload fails, retry three times over 30 seconds,
           then keep the partial file and show "Resume upload".
```

### Cut the qualifiers and the throat-clearing

Basically, essentially, simply, obviously, of course, note that, please be aware. Each one adds a word and removes credibility from the sentence it precedes. Delete them and check that nothing is lost.

### Test it on someone who is not you

Give the document to a colleague and ask them to carry out a task from it, without asking you anything. Every question they ask is a defect in the document, and each one is worth fixing permanently.

## Practice

### Edit one document twice

Take one page you have written, delete the first paragraph, then rewrite every sentence longer than twenty-five words as two. Compare the word count.

Done when: the page is materially shorter and no fact has been removed.

### Run the stranger test

Ask somebody unfamiliar with the work to follow the document and finish a task. Record every question they ask.

Done when: you have a list of the questions and have folded the answers back into the document.

## Common mistakes

- **Keeping the warm-up paragraph** — the useful content starts lower down; fix: delete the first paragraph and see whether anything was lost.
- **Justification before instruction** — the reader cannot find the action; fix: put the instruction first.
- **Abstractions instead of examples** — nobody can act on "handle errors gracefully"; fix: give the concrete steps and values.
- **Qualifier padding** — "simply" tells the reader they are slow; fix: delete the qualifiers.
- **Never testing on a reader** — the author reads what they meant; fix: have someone follow the document and record their questions.

## Go deeper

- **Structure of a spec or README** (`product-process/technical-writing/01-structure-of-a-spec-or-readme`) — the structure this editing preserves.
- **Technical Writing** (`product-process/technical-writing`) — the track this chapter closes.
- **UX Writing & Microcopy** (`design-ux/ux-writing-microcopy`) — the same craft at interface scale.
- **Clean Code** (`cs-fundamentals/clean-code`) — the same standard of legibility applied to code.
