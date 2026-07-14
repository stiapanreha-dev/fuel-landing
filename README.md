# Лендинг — продажа бензина АИ-92 / АИ-95

Одностраничный адаптивный сайт с доставкой топлива по Москве, МО и регионам России.

**Сайт:** https://stiapanreha-dev.github.io/fuel-landing/

## Стек

- Статический HTML/CSS/JS
- Контент в YAML (`config/site.yaml`, `config/content.yaml`)
- js-yaml локально (`js/vendor/`) — без CDN
- Хостинг: GitHub Pages

## Локальный запуск

```bash
cd fuel-landing
python3 -m http.server 8080
# http://127.0.0.1:8080/
```

> Нужен HTTP-сервер: браузер загружает YAML через `fetch`. `file://` не работает.

## Как изменить бренд / контакты

1. `config/site.yaml` — компания, контакты, цвета, изображения, интеграции.
2. `config/content.yaml` — тексты блоков и форм.
3. `git commit && git push` — сайт обновится на GitHub Pages за 1–3 мин.

## Изображения

Сейчас — стоковые фото (`images/*.jpg`). Атрибуция: `images/sources.txt`.  
Перед продакшеном заменить на фото заказчика и обновить пути в конфигах.

## Интеграции

Заявки: Formspree/Web3Forms + Telegram Worker. Без настройки — fallback в `localStorage`.  
Инструкция: `docs/INTEGRATIONS.md`

## Документация

| Файл | Описание |
|------|----------|
| `docs/TZ.md` | Техническое задание |
| `docs/SPRINTS.md` | План спринтов |
| `docs/CONTEXT.md` | Контекст для новой сессии |
| `docs/STATUS.md` | Текущий прогресс |
| `docs/DEPLOY.md` | Деплой на GitHub Pages |
| `docs/RELAUNCH.md` | Перезапуск под новый бренд |

## Спринты

- [x] 0 — архитектура, конфиги, GitHub Pages
- [x] 1 — Hero, шапка, бургер, модалка
- [x] 2 — Преимущества, топливо, аудитория
- [x] 3 — Заказ, доставка, контакты, footer, privacy
- [x] 4 — Формы, UTM, honeypot, LeadApi
- [x] 5 — Email + Telegram интеграции
- [ ] 6 — Метрика, PageSpeed, финальный QA (частично: UI, сток, деплой)