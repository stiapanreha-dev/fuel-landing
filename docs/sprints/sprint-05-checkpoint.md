# Чекпоинт: Спринт 5 — Telegram + Email

**Статус:** ✅ Завершён  
**Дата:** 2026-07-14

---

## Что сделано

- [x] `LeadApi` — параллельная отправка email + Telegram
- [x] Formspree и Web3Forms для email
- [x] Cloudflare Worker для Telegram (токен не в git)
- [x] Формат сообщения: имя, телефон, топливо, объём, адрес, UTM, время
- [x] Fallback: один канал упал — второй работает
- [x] `.env.example` + `server/telegram-proxy/README.md`
- [x] `docs/INTEGRATIONS.md` — полная инструкция

---

## Файлы

```
js/lead-api.js                    — dual-channel submit
server/telegram-proxy/worker.js   — Telegram прокси
server/telegram-proxy/wrangler.toml
server/telegram-proxy/README.md
```

---

## Настройка заказчиком (TODO)

| Параметр | Где взять | Куда указать |
|----------|-----------|--------------|
| Formspree ID | formspree.io | `config/site.yaml` → `formspree_id` |
| Telegram bot | @BotFather | Worker secret |
| Chat ID | getUpdates API | Worker secret |
| Worker URL | wrangler deploy | `telegram_proxy_url` |

---

## Тестовая отправка

1. Заполнить `formspree_id` и/или задеплоить Worker
2. Открыть сайт с `?utm_source=test`
3. Отправить форму
4. Проверить email / Telegram / `localStorage`

---

## Следующий спринт

**Спринт 6** — Яндекс.Метрика, оптимизация, DEPLOY.md, RELAUNCH.md, финальный QA