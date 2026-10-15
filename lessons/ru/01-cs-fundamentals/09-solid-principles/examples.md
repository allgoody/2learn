## Пример 1 — Один класс, две аудитории

Класс ниже обслуживает финансы, которым важна вёрстка, и эксплуатацию, которой важны правила доставки. Изменение вёрстки и изменение правил доставки правят один и тот же файл. Скажите, сколько у него причин для изменения, и разделите его по этой линии.

```ts
class Invoice {
  constructor(private order: Order) {}

  total(): number {
    return this.order.lines.reduce((sum, line) => sum + line.price, 0);
  }

  toHtml(): string {
    return `<h1>Счёт ${this.order.id}</h1>`;
  }

  async send(): Promise<void> {
    await mailer.send(this.order.customer.email, this.toHtml());
  }
}
```

### Решение

```ts
class Invoice {
  constructor(private order: Order) {}

  total(): number {
    return this.order.lines.reduce((sum, line) => sum + line.price, 0);
  }

  toHtml(): string {
    return `<h1>Счёт ${this.order.id}</h1>`;
  }
}

class InvoiceEmailer {
  constructor(private mailer: Mailer) {}

  async send(invoice: Invoice, to: string): Promise<void> {
    await this.mailer.send(to, invoice.toHtml());
  }
}
```

Подсказкой были две аудитории. Финансы просят изменений в `toHtml`; эксплуатация спрашивает про `send`, его получателей и правила повторов, и ни одной из групп не нужно читать код другой. После разделения у каждого класса есть одно предложение, описывающее, почему он изменится, а рассыльщик можно заменить, не трогая вёрстку. Ловушка в том, что исходный класс — всего пятнадцать строк: размер не является проверкой, проверкой является число причин для изменения, а вторая причина остаётся невидимой, пока эксплуатация не попросит чего-нибудь.

## Пример 2 — Сервис, приваренный к своей базе данных

`OrderService` сам создаёт своё хранилище, поэтому модульный тест не может выполниться без базы данных, а сервис нельзя нацелить на другое хранилище. Скажите, какой принцип нарушен, затем инвертируйте зависимость и покажите тест, подставляющий подделку.

```ts
class OrderService {
  private repo = new PostgresOrderRepo(process.env.DATABASE_URL);

  async place(order: Order) {
    const saved = await this.repo.insert(order);
    return saved.id;
  }
}
```

### Решение

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

// тест
const fake: OrderRepo = { insert: async () => ({ id: 7 }) };
expect(await new OrderService(fake).place(order)).toBe(7);
```

Высокоуровневая политика больше не зависит от низкоуровневой детали: обе зависят от интерфейса `OrderRepo`, и вызывающий выбирает реализацию. Тест выполняется без базы данных, а смена хранилища становится одной строкой в корне композиции. Ловушка — чрезмерное применение: внедрение того, что никогда не будет меняться, например чистой вспомогательной функции форматирования, добавляет косвенность и ничего не покупает для теста.
