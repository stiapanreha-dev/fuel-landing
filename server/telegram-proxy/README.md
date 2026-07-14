# Telegram Proxy (Cloudflare Worker)

Прокси скрывает `TELEGRAM_BOT_TOKEN` от публичного сайта на GitHub Pages.

## 1. Создать бота

1. Написать [@BotFather](https://t.me/BotFather) → `/newbot`
2. Сохранить **token**
3. Узнать **chat_id**:
   - Написать боту любое сообщение
   - Открыть `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Найти `"chat":{"id":123456789}`

## 2. Деплой Worker

```bash
cd server/telegram-proxy
npm install -g wrangler   # или npx wrangler
wrangler login
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
wrangler deploy
```

После деплоя получите URL вида:
`https://fuel-landing-telegram.<account>.workers.dev`

## 3. Указать URL в сайте

`config/site.yaml`:

```yaml
integrations:
  telegram_proxy_url: "https://fuel-landing-telegram.<account>.workers.dev"
```

## 4. Проверка

```bash
curl -X POST https://YOUR-WORKER.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+79000000000","fuel":"АИ-92","source":"test"}'
```