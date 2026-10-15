## Example 1 — A menu that looks like the org chart

The account navigation has grown to nine top-level items named after teams. The draft is below. Regroup the items by the moment the same person needs them, cut the top level to five to seven, and give every item a home.

```text
Payments      Delivery         Account        Preferences
Wallet        Orders           Profile        Notifications
Invoices      Addresses        Security       Language
Promotions    Subscriptions
```

### Solution

```text
Your orders        Your plan and bills    Your details      Delivery and returns   Help and support
- recent orders    - plan and renewal     - name, email     - delivery window      - delivery FAQ
- order status     - bills and receipts   - addresses       - returns label        - contact support
                   - payment method       - password
```

Grouping by task means each group is exactly what one person needs at one moment: someone checking a bill also sees the plan it renews, and the saved addresses sit with the details they describe. Five top-level items sits inside the range people can scan and remember, where the old nine mixed departments with page types so that nothing was predictable. The mistake is to keep a "Preferences" group: language and notifications belong to the person, beside the details they describe.

## Example 2 — Where the next two features go

Two features are ready to ship, and the instinct in the team is to add two new top-level items. The current tree and the two additions are below. Place both in existing groups, and say what that placement protects.

```text
Top level
1 Your orders   2 Your plan and bills   3 Your details
4 Delivery and returns   5 Help and support

To place: "Saved addresses" - a list reused at checkout
          "Gift cards"      - a credit balance topped up by a code
```

### Solution

```text
Saved addresses -> Your details       (a fact about the person, reused)
Gift cards      -> Your plan and bills (a balance, like the plan it offsets)

Depth check: both land at level 2. Checkout links straight to the saved
addresses list, so a buyer never climbs the tree to reach it.
```

Giving every new item an existing home keeps the top level stable, which matters because reorganisation breaks bookmarks, analytics and muscle memory. It keeps depth predictable as well: a user can say how far down they are and what the next level will hold, instead of meeting a fresh top-level item with each release. The mistake is to add a top-level item whenever a feature is large, which fragments the menu until every group is a bundle of one.
