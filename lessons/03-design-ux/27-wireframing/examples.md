## Example 1 — The order list that does not win the eye

A teammate has wireframed an account page. The promotional banner is the biggest block on it, and the orders table — the reason the page exists — is the smallest. Re-draw the grey boxes so the visual weight matches the importance, without adding colour or detail.

```text
+--------------------------------------------+
| [big banner]   Free delivery over £50       |
| [sidebar]      Brand filter (6 open)        |
| Your orders                                 |
| #4021  Bristol  £240  Shipped    [View]     |
| #4018  Leeds    £90   Delivered  [View]     |
+--------------------------------------------+
```

### Solution

```text
+--------------------------------------------+
| Your orders                                 |
| #4021  Bristol  £240  Shipped    [View]     |
| #4018  Leeds    £90   Delivered  [View]     |
|                                             |
| Free delivery over £50                      |
+--------------------------------------------+
```

The heading is now the largest block, the orders sit directly under it, and the banner has shrunk to a single grey line below the content. A five-second squint test lands on "Your orders" first. The usual failure is a promotion that was made large for business reasons and never re-measured against the page's purpose — if the wireframe needs an arrow to explain what matters most, the layout is wrong.

## Example 2 — Wireframing the empty state with real words

The wireframe above was drawn only for an account with orders. A new customer sees the same page empty, and the team has not decided what it says. Wireframe the empty state with the real strings, so the layout is tested against their actual length.

```text
Populated
  Your orders
  #4021  Bristol  £240  Shipped    [View]
  #4018  Leeds    £90   Delivered  [View]

Empty (new account)
  ???
```

### Solution

```text
Empty
  Your orders
  No orders yet
  Orders appear here with their status and a link to view each one.
  [ Browse the catalogue ]
```

Three lines of real copy fit the single column, and the primary action sits directly under the message a new user needs. Writing the actual sentence shows that a long label wraps to two lines and pushes the button down, which a placeholder never reveals. The empty state is improvised later unless it is drawn now, and it is the first version most users meet.
