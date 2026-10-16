## Пример 1 — Адаптер, протекающий тем, что оборачивает

Класс ниже призван держать сторонний клиент вне кодовой базы, но место вызова показывает, что на самом деле дошло до остальной системы. Скажите, как утёк чужой тип, затем перепишите границу.

```ts
class PaymentAdapter {
  constructor(private stripe: StripeClient) {}

  async charge(order: Order): Promise<StripeCharge> {
    return this.stripe.charges.create({
      amount: order.total, currency: order.currency,
    });
  }
}

// место вызова
const charge = await gateway.charge(order);
if (charge.outcome === "requires_action") { ... }   // лексика библиотеки
```

### Решение

```ts
// наш собственный тип; ничто из библиотеки его не пересекает
interface ChargeResult { id: string; needsCustomerAction: boolean }

class PaymentAdapter implements PaymentGateway {
  constructor(private stripe: StripeClient) {}

  async charge(order: Order): Promise<ChargeResult> {
    const res = await this.stripe.charges.create({
      amount: order.total, currency: order.currency,
    });
    return {
      id: res.id,
      needsCustomerAction: res.outcome === "requires_action",
    };
  }
}
```

Адаптер перевёл запрос, но вернул объект самой библиотеки: имена его полей и словарь статусов уехали к вызывающему, и теперь всем вызывающим придётся меняться вслед за библиотекой. Если же вернуть собственный `ChargeResult`, чужой тип останется названным ровно в одном файле, а перевод окажется там, где решается его смысл. Ловушка в том, что вернуть ответ библиотеки — меньше кода, и это выглядит как честная сквозная передача; она честная, в этом и беда.

## Пример 2 — Подписчик, которого так и не убрали

Экран регистрирует слушателя на долгоживущем издателе. Трассировка показывает, что происходит после того, как экран закрыли и открыли четыре раза. Скажите, что удерживается, затем перепишите подписку.

```ts
function openOrderScreen(emitter, orderId) {
  emitter.on("order-placed", (order) => {
    if (order.id === orderId) render(order);
  });
}

// открыть и закрыть экран четыре раза
// слушателей: 4, каждый замыкается на экран, которого больше нет
```

### Решение

```ts
function openOrderScreen(emitter, orderId) {
  const onPlaced = (order) => {
    if (order.id === orderId) render(order);
  };

  emitter.on("order-placed", onPlaced);

  return () => emitter.off("order-placed", onPlaced);   // ручка отписки
}

// закрытие: const dispose = openOrderScreen(emitter, id); ... dispose();
```

Издатель держит ссылку на каждого слушателя, а каждый слушатель замыкается на состояние экрана; поэтому ни один закрытый экран не может быть собран, а каждый заново открытый добавляет колбэк, который рисует в мёртвое представление. Если вернуть ручку отписки, время жизни слушателя привяжется ко времени жизни экрана — именно это реализации Наблюдателя обычно упускают. А ловушка в том, что в сессии, где экран открывают однажды, ничто не течёт: симптом виден только тому, кто держит приложение открытым весь день.
