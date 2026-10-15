## Example 1 — A split that made every change wider

The three services below were divided by technical layer, and the note records what that has done to the teams. Draw the boundary again around a reason to change, name the owner of each side, and name one change that then touches only one service.

```text
database service   owns the orders and pricing tables        team: platform
rules service      pricing rules and delivery rules           team: platform
web service        the endpoints both of the above call        team: checkout
every feature change has touched all three services
```

### Solution

```text
billing service     pricing rules, invoices, payment records   owner: payments team
catalogue service   products, availability                     owner: catalogue team
one change: a quarterly pricing rule edit touches billing alone,
            and the payments team deploys it without asking anyone
```

The useful question is which parts change together and for the same reason: pricing rules change quarterly and availability changes for a different reason entirely, so they belong on opposite sides of a line. A boundary is also a team boundary, and that is what the layering got wrong — every change needed both teams to approve it, so the split had divided the code without dividing anything else. The mistake is drawing a diagram independently of how the teams actually work, which leaves the coordination cost exactly where it was.

## Example 2 — Two services reading one set of tables

The note below is how reporting gets its numbers. Change it so each service owns its data and reached only through an interface, and name a column change that then stops breaking the other service.

```text
orders service      writes orders(id, status, total) and order_lines
reporting service   reads both tables directly, same credentials, same database
```

### Solution

```text
orders service      owns orders and order_lines; exposes /orders/{id} and a daily export
reporting service   keeps a copy of the fields it needs, refreshed from the export
column change that no longer breaks reporting: renaming total in the orders table
```

A shared database is a hidden coupling: a schema change by one service breaks the other, and neither team can deploy alone, which is what makes the boundary a name rather than a fact. Where two services need the same data, one owns it and the other asks for it or caches a copy it can tolerate; only the interface crosses, so it is the interface that is kept stable and changed additively while the older shape is supported. The usual mistake is treating a network call as an internal one, which ships breaking changes as routine edits.
