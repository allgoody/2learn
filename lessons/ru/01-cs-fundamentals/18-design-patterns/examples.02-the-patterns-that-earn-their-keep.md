## Пример 1 — Адаптер, протекающий тем, что оборачивает

Класс ниже призван держать сторонний клиент вне кодовой базы. Место вызова показывает, что на самом деле дошло до остальной системы. Скажите, как утёк чужой тип, затем перепишите границу.

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

Адаптер перевёл запрос, но вернул собственный объект библиотеки, поэтому имена его полей и словарь статусов уехали в вызывающего, и всем вызывающим придётся меняться при изменении библиотеки. Возврат собственного `ChargeResult` оставляет чужой тип названным ровно в одном файле и ставит перевод туда, где решается его смысл. Ловушка в том, что вернуть ответ библиотеки — меньше кода и выглядит как верная сквозная передача; она верна, в этом и проблема.

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

Издатель держит ссылку на каждого слушателя, а каждый слушатель замыкается на состояние экрана, поэтому ни один закрытый экран не может быть собран, и каждый заново открытый добавляет колбэк, рисующий в мёртвое представление. Возврат ручки отписки привязывает время жизни слушателя ко времени жизни экрана — то, что реализации Наблюдателя обычно упускают. Ловушка в том, что в сессии, открывающей экран однажды, ничего не течёт, и симптом виден только тому, кто держит приложение открытым весь день.
