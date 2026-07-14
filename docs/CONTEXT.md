# Контекст проекта — читать первым в новой сессии

> Обновлено: **2026-07-14**, после **спринта 3**

---

## Статус

Весь статический контент лендинга готов (7 блоков + privacy.html). Формы работают на UI-уровне (валидация + success), без отправки на сервер.

---

## Репозиторий

| | |
|---|---|
| GitHub | https://github.com/stiapanreha-dev/fuel-landing |
| Live | https://stiapanreha-dev.github.io/fuel-landing/ |
| Privacy | https://stiapanreha-dev.github.io/fuel-landing/privacy.html |

---

## Где остановились

- **Завершён:** Спринт 3
- **Следующий:** Спринт 4 — UTM, honeypot, унификация форм
- **Чекпоинт:** `docs/sprints/sprint-03-checkpoint.md`

---

## Ключевые файлы спринта 3

| Файл | Назначение |
|------|------------|
| `css/bottom-sections.css` | Заказ, доставка, контакты, футер |
| `js/form-render.js` | Общий рендер полей форм |
| `js/contacts-form.js` | Встроенная форма §7 |
| `privacy.html` | Политика + согласие |
| `config/content.yaml` → `legal` | Тексты legal |

---

## Две формы на сайте

1. **Модальная** `#lead-modal` — CTA по всему сайту
2. **Встроенная** `#contacts-form` — финальный блок

Обе используют `FormRender`. Отправка — спринт 5.

---

## Промпт для продолжения

```
Продолжи fuel-landing. Прочитай docs/CONTEXT.md, sprint-03-checkpoint.md.
Выполни Спринт 4 по docs/SPRINTS.md.
```