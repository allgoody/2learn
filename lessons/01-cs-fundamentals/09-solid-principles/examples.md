## Example 1 — One class, two audiences

The class below serves finance, who care about the layout, and operations, who care about delivery rules. A layout change and a delivery-rule change both edit this file. Say how many reasons to change it has, then split it along that line.

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

The two audiences were the tell. Finance asks for changes to `toHtml`; operations asks about `send`, its recipients and its retry rules, and neither group needs to read the other's code. After the split each class has one sentence describing why it would change, and the mailer can be swapped without touching the layout. The trap is that the original is only fifteen lines — smallness is not the test, the number of reasons to change is, and the second reason stays invisible until operations asks for something.

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

High-level policy no longer depends on a low-level detail: both depend on the `OrderRepo` interface, and the caller chooses the implementation. The test runs with no database, and changing the store becomes one line at the composition root. The trap is over-applying it — injecting something that will never vary, such as a pure formatting helper, adds indirection and buys no test.
