# Контекст проекта — читать первым в новой сессии

> Обновлено: **2026-07-14**, после **спринта 1**

---

## Проект в одном абзаце

Одностраничный лендинг для продажи бензина АИ-92/АИ-95. Статика + YAML на GitHub Pages. Спринт 1 завершён: Hero, шапка, бургер-меню, модальная форма (UI без отправки).

---

## Репозиторий и URLs

| | |
|---|---|
| GitHub | https://github.com/stiapanreha-dev/fuel-landing |
| Live | https://stiapanreha-dev.github.io/fuel-landing/ |
| Локально | `python3 -m http.server 8080` |

---

## Где остановились

- **Завершён:** Спринт 1 — Hero + шапка + навигация + модалка
- **Следующий:** Спринт 2 — преимущества, топливо, кому поставляем (полировка + иконки)
- **Чекпоинт:** `docs/sprints/sprint-01-checkpoint.md`

---

## Ключевые файлы спринта 1

| Файл | Назначение |
|------|------------|
| `css/header.css` | Шапка, бургер |
| `css/hero.css` | Главный экран |
| `css/modal.css` | Модальная форма |
| `js/nav.js` | Скролл, активные якоря |
| `js/modal.js` | Форма заявки (UI) |
| `js/app.js` | Рендер страницы |
| `config/content.yaml` | Тексты (+ `hero.eyebrow`) |

---

## Модальная форма

- ID: `#lead-modal`
- Открытие: `SiteModal.open()` или кнопки `data-open-form` / `data-fuel`
- Отправка на сервер — **спринт 5** (GitHub Pages = статика)

---

## Промпт для продолжения

```
Продолжи fuel-landing. Прочитай docs/CONTEXT.md, docs/STATUS.md, sprint-01-checkpoint.md.
Выполни Спринт 2 по docs/SPRINTS.md. Референс: docs/TZ.md.
```