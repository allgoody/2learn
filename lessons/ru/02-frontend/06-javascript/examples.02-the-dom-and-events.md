## Пример 1 — Слушатель на каждую строку, собранную из HTML-строки

В разметке ниже есть список результатов, а скрипт строит каждую строку, присваивая строку и навешивая на неё собственный обработчик клика. Скажите, что ломается по мере роста списка, и перепишите скрипт так, чтобы слушатель был один и работал через делегирование.

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

На каждой итерации исходный вариант навешивает обработчик на очередную строку и пересобирает весь список заново, дописывая в `innerHTML`; работа растёт как квадрат размера списка, а пользовательский текст разбирается как разметка. События всплывают, поэтому один слушатель на контейнере с проверкой `event.target` обработает и все строки, включая добавленные позже. Настоящие узлы с `textContent` задают имя текстом, а не HTML. Вставка готовых узлов один раз заставляет браузер пересчитать раскладку однократно вместо раза на строку.

## Пример 2 — Слушатель на `window`, который никогда не снимают

Модуль регистрирует обработчик `resize` при открытии панели. Стоит открыть панель заново — и обработчик регистрируется ещё один. Объясните, что при этом удерживается, и привяжите время жизни слушателя к панели.

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

Пока слушатель прикреплён, он держит своё замыкание живым, а каждый обработчик здесь замыкается на элемент панели, которого после закрытия уже нет, поэтому удерживаемый набор растёт с каждым открытием. Снять слушателя позже позволяет только именованная ссылка на функцию: анонимную стрелочную функцию для `removeEventListener` не найти. С удалением элемента его слушатели уходят вместе с ним; однако `window` и `document` переживут любую панель, поэтому всё, что навешено на них, придётся снимать явно.
