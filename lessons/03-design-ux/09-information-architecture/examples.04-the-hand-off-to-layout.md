## Example 1 — A contract for the orders page

The "Your orders" branch passed its findability test and now needs a contract a designer can lay out. From the tree and parts below, write its contents in priority order and its links.

```text
Tree: Your orders > (recent orders, returns)
Existing page: a heading, a list of orders, one link called "more"
Reached from: search, the account menu, an order confirmation email
```

### Solution

```text
Collection page - Your orders
1 Heading "Your orders", matching the navigation label
2 Search or filter, because the list can exceed 20 items
3 Order list, each row linking to the order detail page
4 Empty state: what will appear here and how to place a first order
5 Upward link to the account home; sideways link to returns
6 Back path: an order opened from search returns to the search results
```

The contract fixes the tested decisions - label, levels, paths - so the layout cannot quietly rename or reorder them. Naming the back path matters because an order opened from search was never reached through this hierarchy. The mistake is to hand over a tree diagram alone, after which every page-level question gets answered screen by screen.

## Example 2 — The states nobody designs

Two page types are about to be laid out from their populated state only. Describe a layout for each state and reconcile the headings with the navigation labels.

```text
Your orders      empty, 1 order, 20 orders, 400 orders, loading, error
Order detail     complete, refunded, cancelled, deleted but still linked

Navigation labels:  Your orders / Order detail
Current headings:   My orders   / Order details
```

### Solution

```text
Your orders
empty    "No orders yet", how to place one, one example row
1        the row, plus a link to the parent category
20       the list, no paging
400      search, filter and paging, not one long scroll
loading  skeleton rows; error: a message and a retry

Order detail
complete items, total, delivery status, back link to Your orders
refunded a refund line and the revised total
cancelled or deleted  status banner, re-order or list link

Heading check: "Your orders" and "Order detail", matching the navigation
labels; the old "My orders" and "Order details" are dropped.
```

Specifying the states stops the empty and error pages shipping as afterthoughts: four hundred orders means paging, not a longer scroll. Carrying the tested label through unchanged keeps the findability result true of the shipped product, because a heading that disagrees with the menu costs confidence in both. The mistake is to rename a heading for a designer's taste, which removes the tested label from the product entirely.
