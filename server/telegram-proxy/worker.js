/**
 * Cloudflare Worker — прокси для отправки заявок в Telegram.
 * Секреты TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID — только в env Worker (не в git).
 *
 * Деплой: см. server/telegram-proxy/README.md
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function formatMessage(data) {
  if (data.telegram_text) return data.telegram_text;

  const lines = [
    '🔔 Новая заявка с сайта',
    '',
    `Источник: ${data.source || '—'}`,
    `Имя: ${data.name || '—'}`,
    `Телефон: ${data.phone || '—'}`,
    `Топливо: ${data.fuel || '—'}`,
    `Объём: ${data.volume || '—'}`,
    `Адрес: ${data.address || '—'}`,
  ];

  if (data.comment) lines.push(`Комментарий: ${data.comment}`);

  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .filter((k) => data[k])
    .map((k) => `${k}=${data[k]}`)
    .join(', ');

  if (utm) lines.push('', `UTM: ${utm}`);
  lines.push('', `Время: ${data.submitted_at || '—'}`);
  lines.push(`Страница: ${data.page_url || '—'}`);

  return lines.join('\n');
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: CORS });
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return new Response(JSON.stringify({ error: 'Telegram not configured' }), {
        status: 500,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const text = formatMessage(data);
    const tgUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: data.telegram_text ? 'HTML' : undefined,
        disable_web_page_preview: true,
      }),
    });

    if (!tgRes.ok) {
      const err = await tgRes.text();
      return new Response(JSON.stringify({ error: 'Telegram API error', details: err }), {
        status: 502,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  },
};