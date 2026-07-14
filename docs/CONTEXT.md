# Контекст — читать первым

> После **спринта 5** · 2026-07-14

---

## Статус

Интеграции реализованы в коде. Для живых уведомлений заказчик заполняет:

1. `config/site.yaml` → `formspree_id` (email)
2. Деплой `server/telegram-proxy/` → `telegram_proxy_url`

---

## Ключевые файлы

| Файл | Назначение |
|------|------------|
| `js/lead-api.js` | Email + Telegram parallel submit |
| `server/telegram-proxy/` | Worker для Telegram |
| `docs/INTEGRATIONS.md` | Инструкция настройки |

---

## config/site.yaml

```yaml
integrations:
  email_service: "formspree"
  formspree_id: ""              # ← заполнить
  telegram_proxy_url: ""        # ← URL Worker
```

Секреты Telegram: `wrangler secret put` (не в git).

---

## Следующий шаг

**Спринт 6** — Яндекс.Метрика, PageSpeed, финальный QA.  
Чекпоинт: `docs/sprints/sprint-05-checkpoint.md`

---

## Промпт

```
Продолжи fuel-landing. Спринт 6: Метрика, оптимизация, деплой.
Прочитай docs/CONTEXT.md, sprint-05-checkpoint.md.
```