window.LeadApi = (function () {
  const STORAGE_KEY = 'fuel_landing_leads';

  function getStoredLeads() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function storeLead(payload) {
    const leads = getStoredLeads();
    leads.push({ ...payload, stored_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads.slice(-50)));
  }

  function formatTelegramHtml(payload) {
    const lines = [
      '<b>🔔 Новая заявка с сайта</b>',
      '',
      `<b>Источник:</b> ${payload.source || '—'}`,
      `<b>Имя:</b> ${payload.name || '—'}`,
      `<b>Телефон:</b> ${payload.phone || '—'}`,
      `<b>Топливо:</b> ${payload.fuel || '—'}`,
      `<b>Объём:</b> ${payload.volume || '—'}`,
      `<b>Адрес:</b> ${payload.address || '—'}`,
    ];

    if (payload.comment) lines.push(`<b>Комментарий:</b> ${payload.comment}`);

    const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .filter((k) => payload[k])
      .map((k) => `${k}=${payload[k]}`)
      .join(', ');

    if (utm) lines.push('', `<b>UTM:</b> ${utm}`);
    lines.push('', `<b>Время:</b> ${payload.submitted_at || '—'}`);
    lines.push(`<b>Страница:</b> ${payload.page_url || '—'}`);

    return lines.join('\n');
  }

  function formatEmailBody(payload) {
    const lines = [
      'Новая заявка с сайта',
      '',
      `Источник: ${payload.source || '—'}`,
      `Имя: ${payload.name || '—'}`,
      `Телефон: ${payload.phone || '—'}`,
      `Топливо: ${payload.fuel || '—'}`,
      `Объём: ${payload.volume || '—'}`,
      `Адрес: ${payload.address || '—'}`,
    ];

    if (payload.comment) lines.push(`Комментарий: ${payload.comment}`);

    const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .filter((k) => payload[k])
      .map((k) => `${k}: ${payload[k]}`)
      .join('\n');

    if (utm) lines.push('', 'UTM:', utm);
    lines.push('', `Время: ${payload.submitted_at || '—'}`);
    lines.push(`Страница: ${payload.page_url || '—'}`);

    return lines.join('\n');
  }

  function buildEmailPayload(payload, siteConfig) {
    const subject = `Заявка: ${payload.fuel || 'топливо'} — ${payload.name || 'клиент'}`;
    const integrations = siteConfig?.integrations || {};

    if (integrations.email_service === 'web3forms' && integrations.web3forms_key) {
      return {
        url: 'https://api.web3forms.com/submit',
        body: {
          access_key: integrations.web3forms_key,
          subject,
          from_name: payload.name,
          phone: payload.phone,
          fuel: payload.fuel,
          volume: payload.volume,
          address: payload.address,
          comment: payload.comment || '',
          source: payload.source,
          page_url: payload.page_url,
          utm_source: payload.utm_source || '',
          utm_medium: payload.utm_medium || '',
          utm_campaign: payload.utm_campaign || '',
          message: formatEmailBody(payload),
        },
      };
    }

    const formId = integrations.formspree_id || integrations.form_endpoint?.match(/formspree\.io\/f\/([^/]+)/)?.[1];

    if (formId) {
      return {
        url: `https://formspree.io/f/${formId}`,
        body: {
          _subject: subject,
          _replyto: siteConfig?.contacts?.email || undefined,
          name: payload.name,
          phone: payload.phone,
          fuel: payload.fuel,
          volume: payload.volume,
          address: payload.address,
          comment: payload.comment || '',
          source: payload.source,
          page_url: payload.page_url,
          utm_source: payload.utm_source || '',
          utm_medium: payload.utm_medium || '',
          utm_campaign: payload.utm_campaign || '',
          utm_term: payload.utm_term || '',
          utm_content: payload.utm_content || '',
          message: formatEmailBody(payload),
        },
      };
    }

    if (integrations.form_endpoint) {
      return {
        url: integrations.form_endpoint,
        body: { ...payload, message: formatEmailBody(payload) },
      };
    }

    return null;
  }

  function buildTelegramPayload(payload, siteConfig) {
    const url = siteConfig?.integrations?.telegram_proxy_url;
    if (!url) return null;

    return {
      url,
      body: {
        ...payload,
        telegram_text: formatTelegramHtml(payload),
      },
    };
  }

  async function postJson(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status}: ${text.slice(0, 120)}`);
    }

    return response.json().catch(() => ({ ok: true }));
  }

  async function submit(payload, siteConfig) {
    const emailReq = buildEmailPayload(payload, siteConfig);
    const telegramReq = buildTelegramPayload(payload, siteConfig);

    if (!emailReq && !telegramReq) {
      storeLead(payload);
      console.info('[LeadApi] Endpoints не настроены — заявка в localStorage:', payload);
      return { ok: true, stored: true, channels: [] };
    }

    const tasks = [];

    if (emailReq) {
      tasks.push(
        postJson(emailReq.url, emailReq.body)
          .then(() => ({ channel: 'email', ok: true }))
          .catch((error) => ({ channel: 'email', ok: false, error: error.message }))
      );
    }

    if (telegramReq) {
      tasks.push(
        postJson(telegramReq.url, telegramReq.body)
          .then(() => ({ channel: 'telegram', ok: true }))
          .catch((error) => ({ channel: 'telegram', ok: false, error: error.message }))
      );
    }

    const results = await Promise.all(tasks);
    const succeeded = results.filter((r) => r.ok);
    const failed = results.filter((r) => !r.ok);

    if (succeeded.length) {
      storeLead({ ...payload, delivery: results });
      console.info('[LeadApi] Заявка отправлена:', results);
      return { ok: true, channels: results };
    }

    storeLead({ ...payload, delivery: results, failed: true });
    const errors = failed.map((f) => `${f.channel}: ${f.error}`).join('; ');
    throw new Error(errors || 'Не удалось отправить заявку');
  }

  function isConfigured(siteConfig) {
    const i = siteConfig?.integrations || {};
    return Boolean(
      i.telegram_proxy_url ||
        i.formspree_id ||
        i.web3forms_key ||
        i.form_endpoint
    );
  }

  return { submit, getStoredLeads, storeLead, isConfigured, formatTelegramHtml, formatEmailBody };
})();