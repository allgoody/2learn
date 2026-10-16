## Пример 1 — Тест, который пришпиливает последовательность вызовов

Тест ниже подменяет хранилище моком и утверждает, какие его методы выполнились. Скажите, что произойдёт в следующий раз, когда модуль перестроят, затем замените мок подделкой и утверждайте о результате.

```ts
test("сохраняет новый заказ", async () => {
  const repo = { insert: vi.fn(), update: vi.fn(), findByKey: vi.fn() };
  const service = new OrderService(repo);

  await service.place(makeOrder({ key: "abc" }));

  expect(repo.findByKey).toHaveBeenCalledWith("abc");
  expect(repo.insert).toHaveBeenCalledTimes(1);
  expect(repo.update).not.toHaveBeenCalled();
});
```

### Решение

```ts
class InMemoryOrders {
  rows: Order[] = [];
  findByKey(key: string) { return this.rows.find((r) => r.key === key) ?? null; }
  insert(order: Order) { this.rows.push(order); return order; }
  update(order: Order) { Object.assign(this.rows[0], order); return order; }
}

test("сохраняет размещённый заказ под его ключом", async () => {
  const repo = new InMemoryOrders();

  await new OrderService(repo).place(makeOrder({ key: "abc" }));

  expect(repo.findByKey("abc")).not.toBeNull();
});
```

Версия с моком описывает текущую реализацию: переставьте поиск и вставку — и она провалится, хотя заказ сохранён. Подделка с настоящим, крошечным поведением позволяет тесту задать вопрос, который задал бы вызывающий, — можно ли достать заказ по его ключу, — поэтому три ожидания о вызовах сводятся к одному утверждению об исходе. Ловушка в том, что мок писать быстрее, чем подделку, так что утверждения о вызовах накапливаются, пока сам файл тестов не становится причиной, по которой никто не рефакторит.

## Пример 2 — Фикстура, скопированная пять раз

Литерал заказа ниже повторён в пяти тестах, и в каждом изменено одно поле. Скажите, чего стоит изменение схемы в таком виде, затем замените его фабрикой, которая называет только то, что важно каждому тесту.

```ts
const order = {
  id: 4471, key: "abc", currency: "GBP", total: 2500,
  customer: { id: 9, email: "a@b.test", tier: "gold" },
  lines: [{ sku: "book", price: 1000, qty: 2 }],
  status: "draft",
};   // также скопирован с суммами 900, 0, 5000 и 1200
```

### Решение

```ts
const makeOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 4471, key: "abc", currency: "GBP", total: 2500,
  customer: { id: 9, email: "a@b.test", tier: "gold" },
  lines: [{ sku: "book", price: 1000, qty: 2 }],
  status: "draft",
  ...overrides,
});

// теперь каждый тест называет только свой случай
const order = makeOrder({ total: 900 });
```

Одно определение держит канонический пример, поэтому новое обязательное поле правится в одном месте, а не в пяти, и каждый тест читается как утверждение о том, что важно именно ему. Ловушка — поверхностное копирование: переопределение `customer` заменяет весь вложенный объект, поэтому тест с одним изменённым вложенным полем повторяет всех его соседей. Вложенные литералы лучше держать вне переопределений: повторять их стоит, только если тест и правда про всех соседей сразу.
