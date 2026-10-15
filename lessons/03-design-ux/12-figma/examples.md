## Example 1 — One button component instead of twelve loose shapes

Twelve screens each contain a hand-drawn primary button, and they have drifted apart. Turn them into one component with named variants and a label property, then say how the drift is prevented.

```text
Screens: checkout, settings, invoices, ...      12 files
Buttons: drawn per screen, three slightly different blues
State:   none of them shows hover, pressed or disabled
```

### Solution

```text
Button / Primary
  Variants:   default, hover, pressed, disabled
  Properties: label (text), leading icon (boolean)
  Library:    components page
Rule: edit the component once; every instance follows

Steps
1. select the loose buttons and create one component
2. add a variant for each state
3. name the label and icon properties
4. replace each drawing with an instance
```

With one component and named variants, a change to the master updates all twelve screens, so the states stay consistent and the review happens once. The usual mistake is drawing each state as a separate loose shape, which fixes the colour for today and lets the screens drift apart again by the next release.

## Example 2 — A file with thirty unlabelled pages

An exploration file has grown to thirty pages named after people and dates. No one can find the current checkout. Restructure the pages around the product, and put the review where it can be found.

```text
Pages: Exploration 1, Exploration 2, ... Explorations 30
       (no components page, no archive)
```

### Solution

```text
Pages
  Checkout        current screens
  Account         current screens
  Components      library and states
  Archive         superseded explorations
Comments: left on the exact frame, resolved in the file
```

Naming pages after the product's areas makes the file searchable, and a single components page plus an archive keeps the current work separate from the superseded. The failure is leaving each exploration as its own page: within a month the file holds thirty equally weighted screens and the reviewer cannot tell which one is the product.
