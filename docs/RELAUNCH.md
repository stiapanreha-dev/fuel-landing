# Перезапуск сайта под новый бренд

## Быстрый чеклист

1. **Форк или копия репозитория**
   ```bash
   gh repo fork stiapanreha-dev/fuel-landing --clone new-brand-landing
   ```

2. **Сменить бренд** — `config/site.yaml`:
   - `company.name`, `company.logo`, `inn`, `ogrn`, `legal_address`
   - `contacts.*` (телефон, email, WhatsApp, Telegram)
   - `analytics.yandex_metrika_id`
   - `integrations.*`

3. **Сменить тексты** — `config/content.yaml` (при необходимости)

4. **Заменить изображения** — папка `images/`, пути в конфигах

5. **Создать новый репозиторий / включить GitHub Pages**

6. **Проверить формы и метрику** (после спринтов 5–6)

## Что не нужно менять

- `index.html`, `css/`, `js/` — код общий для всех запусков
- Структура блоков остаётся той же

## Время перезапуска

~15–30 минут при готовых текстах и изображениях.