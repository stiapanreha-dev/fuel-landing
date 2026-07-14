# Контекст — читать первым

> После деплоя · 2026-07-14

---

## Статус

**Live:** https://stiapanreha-dev.github.io/fuel-landing/

Спринты 0–5 завершены. Спринт 6 частично: UI, стоковые фото, деплой.  
Осталось: Яндекс.Метрика, PageSpeed, финальный QA.

Для живых уведомлений заказчик заполняет:

1. `config/site.yaml` → `formspree_id` (email)
2. Деплой `server/telegram-proxy/` → `telegram_proxy_url`

---

## Ключевые файлы

| Файл | Назначение |
|------|------------|
| `config/site.yaml` | Бренд, контакты, интеграции, пути к изображениям |
| `config/content.yaml` | Тексты блоков и форм |
| `js/vendor/js-yaml.min.js` | Парсер YAML (локально, без CDN) |
| `images/sources.txt` | Атрибуция стоковых фото |
| `js/lead-api.js` | Email + Telegram parallel submit |
| `server/telegram-proxy/` | Worker для Telegram |
| `docs/INTEGRATIONS.md` | Инструкция настройки |
| `docs/DEPLOY.md` | Деплой на GitHub Pages |

---

## config/site.yaml

```yaml
integrations:
  email_service: "formspree"
  formspree_id: ""              # ← заполнить
  telegram_proxy_url: ""        # ← URL Worker

images:
  hero_bg: "images/hero.jpg"
  delivery: "images/delivery.jpg"
```

---

## Локальный запуск

```bash
python3 -m http.server 8080
# http://127.0.0.1:8080/  (не file://)
```

---

## Следующий шаг

**Спринт 6** — Метрика, оптимизация, приёмка.  
Чекпоинт: `docs/sprints/sprint-06-checkpoint.md`

---

## Промпт

```
Продолжи fuel-landing. Спринт 6: Метрика, PageSpeed, финальный QA.
Прочитай docs/CONTEXT.md, sprint-06-checkpoint.md.
```