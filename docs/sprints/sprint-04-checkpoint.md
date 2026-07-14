# Чекпоинт: Спринт 4 — Формы заявок и UX

**Статус:** ✅ Завершён  
**Дата:** 2026-07-14

---

## Что сделано

- [x] Единый модуль `LeadForm` для модальной и встроенной формы
- [x] Валидация: обязательные поля, телефон, согласие на ПДн
- [x] Маска телефона `+7 (XXX) XXX-XX-XX`
- [x] UTM: захват из URL → localStorage → payload
- [x] Honeypot-поле `website` (скрытое)
- [x] Чекбокс согласия на обработку ПДн
- [x] `LeadApi.submit()` — localStorage или POST на `form_endpoint`
- [x] Состояние загрузки кнопки «Отправка…»
- [x] Обработка ошибок отправки

---

## Новые файлы

```
js/utm.js         — захват UTM-меток
js/lead-api.js    — отправка / локальное хранение
js/lead-form.js   — единая логика форм
docs/INTEGRATIONS.md
```

---

## Пример payload

```json
{
  "source": "contacts",
  "name": "Иван Петров",
  "phone": "+7 (900) 123-45-67",
  "fuel": "АИ-95",
  "volume": "3000 л",
  "address": "Москва",
  "utm_source": "yandex",
  "submitted_at": "2026-07-14T12:00:00.000Z",
  "page_url": "https://..."
}
```

---

## Ограничение GitHub Pages

Серверного `POST /api/lead` нет — заявки в `localStorage` до спринта 5 (Formspree/Telegram).

---

## Следующий спринт

**Спринт 5** — Telegram Bot + Email через внешний endpoint