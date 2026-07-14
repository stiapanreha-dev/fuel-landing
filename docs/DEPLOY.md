# Деплой на GitHub Pages

## Репозиторий

- **GitHub:** https://github.com/stiapanreha-dev/fuel-landing
- **Сайт:** https://stiapanreha-dev.github.io/fuel-landing/

## Первичная настройка (уже выполнена в спринте 0)

```bash
git init
git add .
git commit -m "Sprint 0: scaffold"
gh repo create stiapanreha-dev/fuel-landing --public --source=. --remote=origin --push
```

## Включить GitHub Pages

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
git push
```

GitHub Pages обновляется за 1–3 минуты.

## Локальная проверка перед пушем

```bash
python3 -m http.server 8080
# http://localhost:8080
```