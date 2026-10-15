## Example 1 — The picker's afternoon, not the app's screens

A team drafted the storyboard below from their screen flow. Every panel is a place in the app, and the real situation has gone. Redraw it as six panels about the person holding the scanner, each caption saying what changes for them.

```text
1  Home screen with the inventory tile
2  Inventory list with a search box
3  Item detail page, quantity field focused
4  Confirmation toast
5  Back to the inventory list
6  Profile menu
```

### Solution

```text
1  End of aisle 4, two boxes in hand, scanner in the other.
2  Reads the label; the clipboard is on the trolley behind her.
3  Gloves on — the on-screen keyboard will not take a press.
4  Walks two aisles back to the fixed terminal; 40 seconds gone.
5  The terminal asks her to log in again; the password is on the trolley.
6  Back at the shelf, the boxes already counted twice by hand.
```

Each panel now names a person, a place and an object, so panel 3 shows the failure without explanation. The original was a low-fidelity screen flow: nothing in it could be wrong except the order. The usual mistake is drawing the interface because it is easy to draw, which deletes the context that makes the sequence worth reviewing.

## Example 2 — Twelve steps cut to six, repeat included

A support agent's recording became the twelve-step list below; the group stops reading at panel seven. Cut it to six panels in the agent's own order, keeping the repeated step — the repetition is the finding.

```text
1  Open the ticket
2  Open the billing tool
3  Find the customer
4  Copy the invoice id
5  Back to the ticket
6  Paste the id
7  Open the billing tool again
8  Find the customer again
9  Screenshot the payment history
10 Back to the ticket
11 Paste the screenshot
12 Close the ticket
```

### Solution

```text
1  Opens the ticket; wants to confirm what was charged.
2  Switches to billing; the customer search fails on the email address.
3  Finds the customer by invoice id instead.
4  Back in the ticket; the copied id will not paste into the reply box.
5  Switches to billing a second time to screenshot the history.
6  Pastes the screenshot and closes; two tool switches, no charge explained.
```

The panels follow the agent's timeline, so the second billing switch is drawn rather than merged. Twelve steps become six panels where the repeat is visible. The common mistake is compressing the second trip into "returns to billing", hiding the finding the board exists to surface.
