# Интеграции — Telegram и Email

## Архитектура

| Канал | Как работает | Секреты |
|-------|--------------|---------|
| **Email** | Formspree или Web3Forms | ID ключа в `site.yaml` (публично OK) |
| **Telegram** | Cloudflare Worker-прокси | Token только в Worker secrets |

GitHub Pages — статика, серверного кода нет.

---

## 1. Email через Formspree (рекомендуется)

1. Зарегистрироваться на [formspree.io](https://formspree.io)
2. Создать форму → скопировать ID (`f/XXXXX`)
3. В `config/site.yaml`:

```yaml
integrations:
  email_service: "formspree"
  formspree_id: "XXXXX"
```

Письма приходят на email аккаунта Formspree.

---

## 2. Email через Web3Forms (альтернатива)

1. [web3forms.com](https://web3forms.com) → получить Access Key
2. В `config/site.yaml`:

```yaml
integrations:
  email_service: "web3forms"
  web3forms_key: "your-access-key"
```

---

## 3. Telegram через Cloudflare Worker

Токен бота **нельзя** класть в `site.yaml` — репозиторий публичный.

### Шаги

1. Создать бота у [@BotFather](https://t.me/BotFather)
2. Получить `chat_id` (см. `server/telegram-proxy/README.md`)
3. Задеплоить Worker:

```bash
cd server/telegram-proxy
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
wrangler deploy
```

4. В `config/site.yaml`:

```yaml
integrations:
  telegram_proxy_url: "https://fuel-landing-telegram.<account>.workers.dev"
```

---

## 4. Полная конфигурация (пример)

```yaml
integrations:
  email_service: "formspree"
  formspree_id: "abc123xy"
  web3forms_key: ""
  form_endpoint: ""
  telegram_proxy_url: "https://fuel-landing-telegram.myaccount.workers.dev"
```

---

## Формат уведомления

**Telegram:**
```
🔔 Новая заявка с сайта
Имя: Иван
Телефон: +7 (900) 123-45-67
Топливо: АИ-92
Объём: 5000 л
Адрес: Москва
UTM: utm_source=yandex, utm_medium=cpc
```

**Email:** те же поля + UTM в теле письма.

---

## Поведение при ошибках

- Email и Telegram отправляются **параллельно**
- Если один канал недоступен — второй всё равно работает
- Ошибка показывается пользователю только если **оба** канала не сработали
- Все заявки дублируются в `localStorage` (`fuel_landing_leads`)

---

## Тестирование

### UTM
```
https://your-site/?utm_source=test&utm_medium=cpc&utm_campaign=fuel
```

### Локальные заявки (отладка)
```javascript
JSON.parse(localStorage.getItem('fuel_landing_leads'))
```

### Telegram Worker
```bash
curl -X POST https://YOUR-WORKER.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+79001234567","fuel":"АИ-92","volume":"1000л","address":"Москва","source":"test"}'
```

---

## Перезапуск под новый проект

1. Сменить `formspree_id` / `web3forms_key`
2. Сменить `TELEGRAM_CHAT_ID` в Worker (`wrangler secret put`)
3. При необходимости — новый Worker или тот же с новым chat_id