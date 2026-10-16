## Пример 1 — Завершившийся запрос, принятый за успех

Кнопка перезагружает суммы в корзине, и стоит серверу вернуть статус ошибки, как панель заполняется сбивающей с толку ошибкой разбора; пока же запрос в полёте, не показывается ничего. Объясните обе неисправности, а затем смоделируйте три исхода. Путь эндпоинта ниже — заглушка, подставьте свой.

```js
async function refreshTotals() {
  const response = await fetch("/api/cart/totals");
  const totals = await response.json();          // тело 500 разбирается как полезная нагрузка
  document.querySelector("[data-total]").textContent = formatMoney(totals.total);
}
```

### Решение

```js
async function refreshTotals() {
  const panel = document.querySelector("[data-total]");
  panel.textContent = "Загрузка…";

  try {
    const response = await fetch("/api/cart/totals");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const totals = await response.json();
    if (typeof totals?.total !== "number") throw new Error("unexpected payload");
    panel.textContent = formatMoney(totals.total);
  } catch (error) {
    panel.textContent = "Не удалось загрузить суммы";
  }
}
```

Успешно завершённым промисом приходит не только удачный ответ: `fetch` отклоняется лишь при сетевом сбое, поэтому 404 или 500 — тоже успех, и тело страницы с ошибкой уходит прямо в парсер JSON. Вот почему сбой всплывает как ошибка разбора и называет не ту проблему, а проверка `response.ok` превращает его в статус, с которым уже можно что-то сделать. Состояние — вторая неисправность: там, где нет ни ветки загрузки, ни ветки ошибки, панель сохраняет прежнее содержимое и выглядит сломанной, а не занятой. Исправление здесь исчерпывается тремя явными исходами — загрузка, готово, ошибка, — а проверка формы разобранного значения ловит тот случай, когда успешный ответ всё равно не является ожидаемой полезной нагрузкой.

## Пример 2 — Запись, которую сервер получает как пустое тело

Форма отправляет новый адрес методом `POST`, но сервер сообщает, что тело отсутствует, хотя из инструмента тот же запрос проходит. Скажите, чего не хватает в запросе, и отправьте его правильно. Путь эндпоинта — заглушка, подставьте свой.

```js
async function saveAddress(address) {
  const response = await fetch("/api/addresses", {
    method: "POST",
    body: JSON.stringify(address),
  });
  return response.json();
}
```

### Решение

```js
async function saveAddress(address) {
  const response = await fetch("/api/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
```

Раскодировать байты серверу нечем, если тип содержимого не указан, поэтому сериализованный объект приходит как неразбираемое или пустое тело. Сам запрос при этом завершился успешно, и сбой выглядит как ошибка на сервере, а не на клиенте. Тело становится интерпретируемым именно благодаря `Content-Type: application/json`, и сочетается он с `JSON.stringify`, а не с полезной нагрузкой формы: форма должна отправляться через `FormData` и без заголовка, чтобы браузер сам задал границу multipart.
