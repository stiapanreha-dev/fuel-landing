# Чекпоинт: Спринт 0 — Подготовка и архитектура

**Статус:** ✅ Завершён  
**Дата:** 2026-07-14

---

## Что сделано

- [x] Выбран стек: статика + YAML + JS
- [x] Хостинг: GitHub Pages
- [x] `config/site.yaml` — бренд, контакты, тема, интеграции (заглушки)
- [x] `config/content.yaml` — все тексты 7 блоков из TZ.md
- [x] Каркас: `index.html`, `css/`, `js/`, `images/` (SVG-заглушки)
- [x] Загрузчик конфигов `js/config-loader.js` + рендер `js/app.js`
- [x] Репозиторий `stiapanreha-dev/fuel-landing`
- [x] Документация: DECISIONS, DEPLOY, RELAUNCH

---

## Решения

| Решение | Выбор |
|---------|-------|
| Стек | Статика + YAML |
| Хостинг | GitHub Pages |
| Формы | Formspree/serverless — спринт 5 |
| Изображения | SVG-заглушки |

---

## Структура файлов

```
fuel-landing/
├── config/
│   ├── site.yaml
│   └── content.yaml
├── css/
│   ├── variables.css
│   ├── base.css
│   └── layout.css
├── js/
│   ├── config-loader.js
│   └── app.js
├── images/          # SVG-заглушки
├── docs/
├── index.html
└── README.md
```

---

## Как запустить локально

```bash
cd /home/lexun/work/KWORK/anatolijc465
python3 -m http.server 8080
# http://localhost:8080
```

---

## Известные ограничения

- GitHub Pages не поддерживает серверные формы — спринт 5
- Лого и фото — заглушки
- Telegram, email, Метрика — не подключены

---

## Следующий спринт

**Спринт 1** — полировка Hero, шапки, мобильное меню, модальная форма (UI)