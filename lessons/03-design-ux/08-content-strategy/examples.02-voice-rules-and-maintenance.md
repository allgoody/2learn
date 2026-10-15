## Example 1 — The one-page voice standard

Two writers share the account area and one concept has four names: package, tier, membership and plan. Write the short document that ends the argument: three voice adjectives with what each rules out, and a naming table with an owner.

```text
Strings found across the account area
"Upgrade your membership"   "Switch tier"        "Choose a package"
"Cancel subscription"       "Manage plan"        "Your account tier"
```

### Solution

```text
Voice
Plain   - say "sign in", never "authenticate"
Direct  - one idea per sentence; no "please note that"
Human   - acknowledge the problem; never blame the person
Limits  - no jokes in errors, no exclamation marks in confirmations

Concept        User-facing term   Banned
subscription   plan               package, tier, membership
invoice        bill               statement, receipt
delete         delete             remove, archive, trash

Owner: Sam. Questions go in the team channel; answers land back on this page.
```

Adjectives are only useful with their limits, because "Human" alone justifies any sentence a writer happens to like. The naming table is the highest-yield part: one concept, one term, with the banned synonyms listed, which turns four account-area words into one. The mistake is a long style guide, opened once and leaving the product inconsistent anyway.

## Example 2 — Applying the standard to one screen

The "Manage my plan" screen predates the standard. Rewrite every string against it, note where it is silent, and say how the new versions get reused.

```text
Standard: use "plan", never "package" or "tier"; "bill", never "invoice"
Dates: 3 March 2025. Buttons: verb first. No exclamation marks.

Screen strings
"Manage package"        "Your tier renews in 30 days"
"Download invoice"      "Downgrade plan!"
"Click here to cancel membership"
```

### Solution

```text
"Your plan"               heading, matching the navigation label
"Renews on 3 March 2025"  date rule applied, not a relative "in 30 days"
"View your bill"          verb first, approved term for an invoice
"Change plan"             the banned "tier" and "downgrade" are gone
"Cancel plan"             names the action, no exclamation mark

New rules found: show currency with its symbol and two decimals.
Encode "plan", "bill" and the date format in the component library.
```

Every string now uses a term from the naming table, so the screen stops reading as several products. The date and button rules came from hard cases the standard had not covered, which is why applying it to one whole screen beats re-reading it. The mistake is to leave the rules in a document only: a string in the component library is the default, while a rule a writer must remember is broken by the next deadline.
