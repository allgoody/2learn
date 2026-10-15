## Пример 1 — Завершившийся запрос, принятый за успех

Кнопка перезагружает суммы в корзине. Когда сервер возвращает статус ошибки, панель заполняется сбивающей с толку ошибкой разбора, а пока запрос в полёте, не показывается ничего. Объясните обе неисправности, затем смоделируйте три исхода. Путь эндпоинта ниже — заглушка; подставьте свой.

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

`fetch` отклоняется только при сетевом сбое, поэтому ответ 404 или 500 приходит успешно завершённым промисом, а тело страницы с ошибкой передаётся парсеру JSON — вот почему сбой всплывает как ошибка разбора, называющая не ту проблему. Проверка `response.ok` превращает его в статус, с которым можно что-то сделать. Вторая неисправность — состояние: без ветки загрузки и ветки ошибки панель сохраняет то, что показывала раньше, и выглядит сломанной, а не занятой. Отрисовка трёх явных исходов — загрузка, готово, ошибка — и есть всё исправление, а проверка формы разобранного значения ловит случай, когда успешный ответ всё равно не является ожидаемой полезной нагрузкой.

## Пример 2 — Запись, которую сервер получает как пустое тело

Форма отправляет новый адрес методом `POST`, и сервер сообщает об отсутствующем теле. Тот же запрос работает из инструмента. Скажите, чего не хватает в запросе, затем отправьте его правильно. Путь эндпоинта — заглушка; подставьте свой.

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

Без типа содержимого у сервера нет способа узнать, как раскодировать байты, поэтому сериализованный объект приходит как неразбираемое или пустое тело — и, поскольку сам запрос завершился успешно, сбой выглядит как ошибка на сервере, а не на клиенте. Именно `Content-Type: application/json` делает тело интерпретируемым, и он сочетается с `JSON.stringify`, а не с полезной нагрузкой формы: отправка формы должна использовать `FormData` и никакого заголовка, чтобы браузер сам задал границу multipart.
