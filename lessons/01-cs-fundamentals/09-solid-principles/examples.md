## Example 1 — One class, two audiences

The class below has 3 methods and serves 2 groups: finance, who care about the layout of the invoice, and operations, who care about delivery rules. A layout change and a delivery-rule change both edit this one file. Say how many reasons to change the class has, then split it along that line.

```ts
class Invoice {
  constructor(private order: Order) {}

  total(): number {
    return this.order.lines.reduce((sum, line) => sum + line.price, 0);
  }

  toHtml(): string {
    return `<h1>Invoice ${this.order.id}</h1>`;
  }

  async send(): Promise<void> {
    await mailer.send(this.order.customer.email, this.toHtml());
  }
}
```

### Solution

```ts
class Invoice {
  constructor(private order: Order) {}

  total(): number {
    return this.order.lines.reduce((sum, line) => sum + line.price, 0);
  }

  toHtml(): string {
    return `<h1>Invoice ${this.order.id}</h1>`;
  }
}

class InvoiceEmailer {
  constructor(private mailer: Mailer) {}

  async send(invoice: Invoice, to: string): Promise<void> {
    await this.mailer.send(to, invoice.toHtml());
  }
}
```

The 2 audiences were the tell: finance asks for changes to `toHtml`, operations asks about `send`, its recipients and its retry rules, so the class had 2 reasons to change and 1 file for both. After the split, `Invoice` reads only the order and `InvoiceEmailer` reads only the mailer and a recipient address, so each edit reopens 1 class and 1 test file; the mailer can also be swapped without touching the layout. The trap is that the original is only 15 lines — smallness is not the test, the number of reasons to change is, and the second reason stays invisible until operations asks for something.

## Example 2 — A service welded to its database

`OrderService` builds its own repository, so a unit test cannot run without a database and the service cannot be pointed at a different store. Say which principle is broken, then invert the dependency and show a test supplying a fake.

```ts
class OrderService {
  private repo = new PostgresOrderRepo(process.env.DATABASE_URL);

  async place(order: Order) {
    const saved = await this.repo.insert(order);
    return saved.id;
  }
}
```

### Solution

```ts
interface OrderRepo {
  insert(order: Order): Promise<{ id: number }>;
}

class OrderService {
  constructor(private repo: OrderRepo) {}

  async place(order: Order) {
    const saved = await this.repo.insert(order);
    return saved.id;
  }
}

// test
const fake: OrderRepo = { insert: async () => ({ id: 7 }) };
expect(await new OrderService(fake).place(order)).toBe(7);
```

`DATABASE_URL` names the connection string the repository needs, and building the repository inside made it a second reason for the class to change and a hard requirement for every test. High-level policy now depends on the `OrderRepo` interface, which declares 1 method, `insert`, and both the Postgres implementation and the fake satisfy it, so the test runs with no database and the assertion 7 is the id the fake chose. The trap is over-applying it — injecting something that will never vary, such as a pure formatting helper, adds indirection and buys no test double.
