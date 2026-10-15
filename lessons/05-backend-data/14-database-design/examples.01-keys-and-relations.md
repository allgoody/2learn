## Example 1 — Keys and delete behaviour

A shop's first schema used the customer's email address as its primary key and left relationships to the application. A customer now wants to change that address, and the request has no bounded cost. Rework the schema so identity is stable, the reference is enforced, and each deletion says what it means.

```sql
create table customers (
  email text primary key,
  name  text not null
);

create table orders (
  id       bigint primary key,
  customer text not null,       -- points at customers.email
  total    numeric not null
);
```

### Solution

```sql
create table customers (
  id        bigint generated always as identity primary key,
  public_id uuid not null unique,
  email     text not null unique,   -- constrained, not identifying
  name      text not null
);

create table orders (
  id          bigint generated always as identity primary key,
  public_id   uuid not null unique,
  customer_id bigint not null references customers (id) on delete restrict,
  total       numeric not null
);
```

The email becomes a unique constraint rather than the identity, so changing it no longer touches the orders table, and the public identifier keeps the sequential key out of any interface. The delete behaviour is now chosen: a customer who still has orders is refused. What usually goes wrong is declaring the foreign key and never choosing the delete action.

## Example 2 — A many-to-many relation without duplicates

A product can carry many tags and a tag appears on many products. The first attempt stored the tag names as a list on the product row, which made it impossible to ask which products share a tag. Model the pairing as its own table and say what each deletion should do.

```sql
create table products (
  id   bigint generated always as identity primary key,
  name text not null
);

create table tags (
  id   bigint generated always as identity primary key,
  name text not null unique
);

-- so far: products.tags text[]  -- a list inside one row
```

### Solution

```sql
create table product_tags (
  product_id bigint not null references products (id) on delete cascade,
  tag_id     bigint not null references tags (id) on delete cascade,
  primary key (product_id, tag_id)     -- the pair is the identity
);

create index product_tags_by_tag on product_tags (tag_id, product_id);
```

The join table gives the relationship its own identity: the pair as primary key refuses the same product and tag twice, and the reverse index answers which products carry a tag. Both sides cascade, because a pairing with a missing product or tag describes nothing. The usual mistake is omitting an index in the other column order, so one direction of the lookup scans the whole table.
