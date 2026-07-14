# Контекст — читать первым

> Обновлено · 2026-07-14 · после фикса путей на GitHub Pages

---

## Статус

| | |
|---|---|
| **Live** | https://stiapanreha-dev.github.io/fuel-landing/ |
| **Репо** | https://github.com/stiapanreha-dev/fuel-landing |
| **Спринты** | 0–5 ✅ · 6 частично (~70%) |
| **Последний коммит** | `3a9299b` — fix путей `/fuel-landing/` |

Сайт опубликован на GitHub Pages, формы и фото работают.  
Без credentials заявки пишутся в `localStorage` (`fuel_landing_leads`).

---

## Что сделано в спринте 6 (частично)

- [x] Локальный `js-yaml` (`js/vendor/`) — без CDN
- [x] Стоковые фото (`images/*.jpg`, атрибуция в `images/sources.txt`)
- [x] UI: модалка 600px / 2 колонки, меню без переноса, чекбокс согласия слева
- [x] `js/base-path.js` — корректные пути на project Pages (`/fuel-landing/`)
- [x] Деплой + обновлены `README`, `STATUS`, `DEPLOY`, `DECISIONS`

## Осталось (спринт 6)

- [ ] Яндекс.Метрика + цели (form, phone, WhatsApp, Telegram)
- [ ] PageSpeed / минификация CSS/JS
- [ ] Финальный QA + чеклист приёмки
- [ ] Замена стоковых фото и логотипа на материалы заказчика

---

## Важно: GitHub Pages и пути

Проектный сайт живёт по префиксу **`/fuel-landing/`**, не в корне домена.

Все ассеты (изображения, YAML) резолвятся через:

```js
window.SiteBase.asset('images/hero.jpg')
// → /fuel-landing/images/hero.jpg
```

Файл: `js/base-path.js`. Подключён в `index.html` и `privacy.html` **до** `config-loader.js` и `app.js`.

**Не использовать** абсолютные пути вида `/images/...` в JS — на Pages они ломаются (404).

---

## Интеграции (ждут заказчика)

| Параметр | Где | Статус |
|----------|-----|--------|
| `formspree_id` | `config/site.yaml` | ⬜ |
| `telegram_proxy_url` | `config/site.yaml` | ⬜ |
| Worker secrets | `wrangler secret put` | ⬜ |
| `yandex_metrika_id` | `config/site.yaml` | ⬜ спринт 6 |

Инструкция: `docs/INTEGRATIONS.md`

---

## Ключевые файлы

| Файл | Назначение |
|------|------------|
| `config/site.yaml` | Бренд, контакты, интеграции, пути к изображениям |
| `config/content.yaml` | Тексты блоков, меню, формы |
| `js/base-path.js` | Базовый путь для GitHub Pages |
| `js/config-loader.js` | Загрузка YAML |
| `js/app.js` | Рендер всех секций |
| `js/lead-api.js` | Отправка заявок (email + Telegram) |
| `js/lead-form.js` | Общая логика форм, согласие ПДн |
| `css/modal.css` | Модалка + стили форм |
| `css/header.css` | Шапка и меню |
| `server/telegram-proxy/` | Cloudflare Worker для Telegram |
| `docs/DEPLOY.md` | Деплой и проверка |
| `docs/sprints/sprint-06-checkpoint.md` | Чекпоинт текущего спринта |

---

## config/site.yaml (фрагмент)

```yaml
integrations:
  email_service: "formspree"
  formspree_id: ""
  telegram_proxy_url: ""

images:
  hero_bg: "images/hero.jpg"
  delivery: "images/delivery.jpg"

analytics:
  yandex_metrika_id: ""
```

---

## Локальный запуск

```bash
cd fuel-landing
python3 -m http.server 8080
# http://127.0.0.1:8080/  (не file://)
```

Проверка перед пушем — чеклист в `docs/DEPLOY.md`.

---

## Деплой

```bash
git add .
git commit -m "описание"
git push origin main
# Pages обновляется за 1–3 мин, статус: gh api repos/stiapanreha-dev/fuel-landing/pages
```

---

## Промпт для новой сессии

```
Продолжи fuel-landing. Спринт 6: Метрика, PageSpeed, финальный QA.
Прочитай docs/CONTEXT.md и docs/sprints/sprint-06-checkpoint.md.
Live: https://stiapanreha-dev.github.io/fuel-landing/
```