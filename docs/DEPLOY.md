# Деплой на GitHub Pages

## Репозиторий

- **GitHub:** https://github.com/stiapanreha-dev/fuel-landing
- **Сайт:** https://stiapanreha-dev.github.io/fuel-landing/

## Настройка Pages (один раз)

Settings → Pages → Source: **Deploy from branch** → Branch: `main` → Folder: `/ (root)`

Или через CLI:

```bash
gh api repos/stiapanreha-dev/fuel-landing/pages -X POST \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

## Обновление сайта

```bash
git add .
git commit -m "описание изменений"
git push origin main
```

GitHub Pages обновляется за 1–3 минуты. После пуша проверьте live-URL.

## Локальная проверка перед пушем

```bash
cd fuel-landing
python3 -m http.server 8080
```

Открыть **http://127.0.0.1:8080/** (не `file://`).

Проверить:

- главная грузится (не «Загрузка…»);
- модалка и форма контактов без лишнего скролла;
- чекбокс согласия — слева от текста;
- изображения `images/*.jpg` отдаются с кодом 200.

## Что пушить

| Папка / файл | Нужно в git |
|--------------|-------------|
| `index.html`, `privacy.html` | да |
| `css/`, `js/`, `images/` | да |
| `config/*.yaml` | да |
| `js/vendor/js-yaml.min.js` | да |
| `.env`, токены бота | **нет** |

## Смена контента без разработчика

1. Правка `config/site.yaml` или `config/content.yaml` на GitHub (веб-редактор).
2. Commit → сайт обновится автоматически.

Подробнее: `docs/RELAUNCH.md`