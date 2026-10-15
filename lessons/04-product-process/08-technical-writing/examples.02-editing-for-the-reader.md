## Example 1 — Delete the warm-up and lead with the instruction

A support guide about refunds opens with a paragraph that explains the document to itself. Cut it to the sentence a reader needs, and put the instruction before its qualification.

```text
Before
This document describes the refund process. It is intended for support
staff and aims to cover the various cases that may arise. Basically, it
is simply a guide to the typical refund flow. Please be aware that
policies may change over time.
```

### Solution

```text
After
Refund a card payment within 90 days: Support > Orders > Refund.
Gift-card payments follow the approval route, not this one.

If a refund fails, retry twice, then email finance with the order id.
```

Four sentences of warm-up and qualifiers are gone and the reader is handed the action first; deleting the first paragraph was the single change that did most of the work, and no fact was removed. The usual mistake is keeping the warm-up and cutting the instruction instead.

## Example 2 — Replace abstraction with the concrete, then test it on a stranger

An error-handling section instructs nobody because it deals in adjectives. Rewrite it as steps and values, then hand it to someone who has not seen the work and fold their questions back in.

```text
The system should be resilient to network failures and handle errors
gracefully, so that users are not unduly inconvenienced. Consideration
should be given to retry behaviour and to partial uploads.
```

### Solution

```text
If the upload fails, retry three times over 30 seconds.
If it still fails, keep the partial file and show "Resume upload";
do not discard what has already been sent.

Stranger test: gave it to a colleague, who asked "how long is a partial
file kept?" and "who do I tell?". Both answers are now in the section.
```

Every abstraction has become a step with a number, so the reader can act; the stranger test turns each question the reader asks into a permanent fix. The usual mistake is editing until it reads well to the author, who reads what they meant.
