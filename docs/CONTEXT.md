# Контекст проекта — читать первым в новой сессии

> Обновлено: **2026-07-14**, после **спринта 2**

---

## Проект в одном абзаце

Лендинг бензина АИ-92/АИ-95 на GitHub Pages. Статика + YAML. Завершены спринты 0–2: Hero, навигация, модалка, блоки преимуществ, топлива и аудитории.

---

## Репозиторий

| | |
|---|---|
| GitHub | https://github.com/stiapanreha-dev/fuel-landing |
| Live | https://stiapanreha-dev.github.io/fuel-landing/ |
| Локально | `python3 -m http.server 8080` |

---

## Где остановились

- **Завершён:** Спринт 2
- **Следующий:** Спринт 3 — заказ, доставка, футер
- **Чекпоинт:** `docs/sprints/sprint-02-checkpoint.md`

---

## Ключевые файлы спринта 2

| Файл | Назначение |
|------|------------|
| `css/sections.css` | Карточки преимуществ, топлива, аудитории |
| `js/section-icons.js` | Иконки секций |
| `config/content.yaml` | `fuel_select`, `audience.items[{icon,label}]` |

---

## Добавить топливо (без правки кода)

Добавить запись в `config/content.yaml` → `fuel.types[]` с полями `badge`, `fuel_select`, `image`.

---

## Промпт для продолжения

```
Продолжи fuel-landing. Прочитай docs/CONTEXT.md, sprint-02-checkpoint.md.
Выполни Спринт 3 по docs/SPRINTS.md. Референс: docs/TZ.md.
```