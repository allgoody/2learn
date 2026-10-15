## Пример 1 — Слушатель на каждую строку, собранную из HTML-строки

Разметка ниже содержит список результатов, а скрипт строит каждую строку, присваивая строку и навешивая её собственный обработчик клика. Скажите, что ломается по мере роста списка, затем перепишите скрипт вокруг одного делегированного слушателя.

```html
<ul id="results"></ul>
<script src="app.js"></script>
```

```js
function render(rows) {
  const list = document.querySelector("#results");
  list.innerHTML = "";
  rows.forEach((row) => {
    list.innerHTML += `<li>${row.name} <button>Удалить</button></li>`;
    list.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => removeRow(row.id));
    });
  });
}
```

### Решение

```js
const list = document.querySelector("#results");

list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  removeRow(button.dataset.id);
});

function render(rows) {
  const items = rows.map((row) => {
    const item = document.createElement("li");
    item.textContent = row.name;

    const button = document.createElement("button");
    button.textContent = "Удалить";
    button.dataset.id = row.id;
    item.append(button);

    return item;
  });
  list.replaceChildren(...items);
}
```

Исходный вариант навешивает обработчик на каждую строку на каждой итерации и каждый раз пересобирает весь список, дописывая в `innerHTML`, поэтому работа растёт как квадрат размера списка, а пользовательский текст разбирается как разметка. События всплывают, поэтому один слушатель на контейнере может обработать все строки — включая добавленные позже — проверив `event.target`. Построение настоящих узлов через `textContent` задаёт имя текстом, а не HTML, а вставка готовых узлов один раз заставляет браузер пересчитать раскладку однократно вместо одного раза на строку.

## Пример 2 — Слушатель на `window`, который никогда не снимают

Модуль регистрирует обработчик `resize` при открытии панели. Каждый раз, когда панель открывают заново, регистрируется ещё один обработчик. Объясните, что удерживается, затем привяжите время жизни слушателя к панели.

```js
function openPanel() {
  window.addEventListener("resize", () => {
    document.querySelector("#panel").style.width = window.innerWidth / 3 + "px";
  });
}

// открыть и закрыть панель четыре раза -> четыре обработчика, все ещё работают
```

### Решение

```js
let onResize = null;

function openPanel() {
  const panel = document.querySelector("#panel");
  onResize = () => {
    panel.style.width = window.innerWidth / 3 + "px";
  };
  window.addEventListener("resize", onResize);
}

function closePanel() {
  if (onResize) window.removeEventListener("resize", onResize);
  onResize = null;
}
```

Слушатель держит своё замыкание живым, пока прикреплён, а каждый обработчик здесь замыкается на элемент панели, которого после закрытия панели больше нет, поэтому удерживаемый набор растёт с каждым открытием. Именно именованная ссылка на функцию делает возможным `removeEventListener`: анонимную стрелочную функцию снять позже нельзя. Удаление элемента уносит его собственные слушатели с собой, но `window` и `document` переживают любую панель, поэтому всё, навешенное на них, нужно снимать явно.
