## Example 1 — Keys the engine refuses to leave dangling

A first draft of the orders schema uses the customer's email as the identifier, stores the total as a floating-point number, and lets an order name a customer that does not exist. Write the tables so a changed address rewrites one row, an unknown customer is refused, and money adds up.

```sql
create table customers (
  email text primary key
);

create table orders (
  id integer,
  customer_email text,
  total double precision,
  placed_at text
);
```

### Solution

```sql
create table customers (
  id integer generated always as identity primary key,
  email text not null unique,
  created_at date not null
);

create table orders (
  id integer generated always as identity primary key,
  customer_id integer not null references customers (id),
  total numeric(12, 2) not null check (total >= 0),
  placed_at date not null
);
```

The email is still unique but no longer the identifier, so correcting one address touches one row instead of every order that referenced it. The foreign key makes the engine itself refuse an order for an unknown customer, and the fixed-precision type keeps the total exact and never negative. What usually goes wrong is leaving the delete behaviour to chance: removing a customer then fails at run time in a way no code path handles.

## Example 2 — Which copy of the name is right

The orders table repeats the customer's name so the list screen needs no join. The report below was produced after a customer corrected their name; only the rows created afterwards are right. Remove the duplicated fact and say how the join would be avoided if measurement ever justified it.

```text
select o.id, o.customer_name, c.name from orders o
join customers c on c.id = o.customer_id;        (illustrative)

 id | customer_name | name
 41 | A. Nowak      | Anna Nowak
 42 | A. Nowak      | Anna Nowak
 43 | Anna Nowak    | Anna Nowak
```

### Solution

```sql
alter table orders drop column customer_name;

select o.id, c.name, o.total
from orders o join customers c on c.id = o.customer_id
order by o.placed_at desc;
```

A correction now changes one row and every reader sees the new value, because no second copy is left to go stale; the join is a lookup on the primary key. If a measured query ever needs the copy back, record why it is deliberate, or a later reader will treat it as a bug or trust it as the truth. What usually goes wrong is refreshing the copy from an application event, which misses every row the event never reached.
