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
    leads.push(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads.slice(-50)));
  }

  async function submit(payload, siteConfig) {
    const endpoint = siteConfig?.integrations?.form_endpoint;

    if (endpoint) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Ошибка отправки: ${response.status}`);
      }

      return response.json().catch(() => ({ ok: true }));
    }

    storeLead(payload);
    console.info('[LeadApi] Заявка сохранена локально (endpoint не настроен):', payload);
    return { ok: true, stored: true };
  }

  return { submit, getStoredLeads, storeLead };
})();