# Контекст проекта — читать первым в новой сессии

> Обновлено: **2026-07-14**, после **спринта 0**

---

## Проект в одном абзаце

Одностраничный лендинг для продажи бензина АИ-92/АИ-95 с доставкой. Статика + YAML на GitHub Pages. Контент редактируется в `config/*.yaml` без правки HTML.

---

## Репозиторий и URLs

| | |
|---|---|
| GitHub | https://github.com/stiapanreha-dev/fuel-landing |
| Live | https://stiapanreha-dev.github.io/fuel-landing/ |
| Локально | `python3 -m http.server 8080` |

---

## Ключевые файлы

| Файл | Назначение |
|------|------------|
| `config/site.yaml` | Бренд, контакты, тема, интеграции |
| `config/content.yaml` | Тексты всех блоков |
| `js/config-loader.js` | Загрузка YAML |
| `js/app.js` | Рендер страницы |
| `docs/TZ.md` | Референс по контенту |
| `docs/SPRINTS.md` | План спринтов |
| `docs/sprints/sprint-00-checkpoint.md` | Итог спринта 0 |

---

## Где остановились

- **Завершён:** Спринт 0 — архитектура, конфиги, каркас, GitHub repo
- **Следующий:** Спринт 1 — Hero + шапка (полировка, мобильное меню)

---

## Принятые решения

1. **Стек:** статика + YAML (не Grav, не WordPress)
2. **Хостинг:** GitHub Pages (`stiapanreha-dev`)
3. **Формы:** серверless/Formspree в спринте 5 (Pages не поддерживает backend)
4. **Изображения:** SVG-заглушки, заменить когда будут от заказчика
5. **Интеграции:** пока заглушки в `config/site.yaml`

---

## Якоря меню

`#hero` · `#fuel` · `#advantages` · `#delivery` · `#order` · `#contacts`

---

## Промпт для продолжения

```
Продолжи проект fuel-landing (anatolijc465).
1. docs/CONTEXT.md → docs/STATUS.md → docs/sprints/sprint-00-checkpoint.md
2. Выполни Спринт 1 по docs/SPRINTS.md
3. Обнови STATUS.md, CONTEXT.md, создай sprint-01-checkpoint.md
Референс: docs/TZ.md
```