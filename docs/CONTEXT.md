# Контекст — читать первым

> После **спринта 4** · 2026-07-14

---

## Статус

Формы полностью рабочие на клиенте: валидация, UTM, honeypot, согласие. Заявки сохраняются в `localStorage` (`fuel_landing_leads`) до настройки `form_endpoint` в спринте 5.

---

## Ключевые модули форм

| Файл | Роль |
|------|------|
| `js/lead-form.js` | Единая логика обеих форм |
| `js/utm.js` | UTM из URL |
| `js/lead-api.js` | submit → endpoint или localStorage |
| `js/form-render.js` | Поля, валидация, маска телефона |

---

## Настройки

`config/site.yaml`:
```yaml
forms:
  honeypot_field: website
integrations:
  form_endpoint: ""   # спринт 5
```

`config/content.yaml` → `form_consent`

---

## Отладка заявок

```javascript
JSON.parse(localStorage.getItem('fuel_landing_leads'))
```

---

## Следующий шаг

**Спринт 5** — подключить `form_endpoint` (Formspree) + Telegram.  
Чекпоинт: `docs/sprints/sprint-04-checkpoint.md`  
Инструкция: `docs/INTEGRATIONS.md`

---

## Промпт

```
Продолжи fuel-landing. Спринт 5: Telegram + Email.
Прочитай docs/CONTEXT.md, docs/INTEGRATIONS.md, sprint-04-checkpoint.md.
```