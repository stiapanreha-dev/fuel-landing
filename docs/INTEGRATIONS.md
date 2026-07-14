# Интеграции — настройка форм

## Текущее состояние (спринт 4)

- UTM-метки захватываются из URL и сохраняются в `localStorage`
- Honeypot-поле отсекает ботов
- Заявки без `form_endpoint` сохраняются в `localStorage` (`fuel_landing_leads`)
- При указании `form_endpoint` — отправка JSON POST

## Настройка endpoint (спринт 5)

В `config/site.yaml`:

```yaml
integrations:
  form_endpoint: "https://formspree.io/f/XXXXX"
```

## Пример payload заявки

```json
{
  "source": "modal",
  "submitted_at": "2026-07-14T12:00:00.000Z",
  "page_url": "https://stiapanreha-dev.github.io/fuel-landing/?utm_source=yandex",
  "name": "Иван",
  "phone": "+7 (900) 123-45-67",
  "fuel": "АИ-92",
  "volume": "5000 л",
  "address": "Москва, ул. Примерная, 1",
  "comment": "Срочно",
  "utm_source": "yandex",
  "utm_medium": "cpc",
  "utm_campaign": "fuel_moscow"
}
```

## Просмотр локальных заявок (отладка)

В консоли браузера:

```javascript
JSON.parse(localStorage.getItem('fuel_landing_leads'))
```

## UTM-тест

Открыть сайт с параметрами:

```
?utm_source=test&utm_medium=cpc&utm_campaign=fuel
```

Затем отправить форму — UTM попадут в payload.