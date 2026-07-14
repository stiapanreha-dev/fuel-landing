window.SiteUtm = (function () {
  const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const STORAGE_KEY = 'fuel_landing_utm';

  function readFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    PARAMS.forEach((key) => {
      const value = params.get(key);
      if (value) data[key] = value;
    });
    return data;
  }

  function capture() {
    const fromUrl = readFromUrl();
    if (!Object.keys(fromUrl).length) return get();

    const existing = get();
    const merged = { ...existing, ...fromUrl, captured_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }

  function get() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function renderHiddenFields(prefix) {
    const data = capture();
    return PARAMS.map((key) => {
      const value = data[key] || '';
      return `<input type="hidden" name="${key}" id="${prefix}-${key}" value="${escapeAttr(value)}">`;
    }).join('');
  }

  function escapeAttr(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  function appendToPayload(payload) {
    const data = get();
    PARAMS.forEach((key) => {
      if (data[key]) payload[key] = data[key];
    });
    if (data.captured_at) payload.utm_captured_at = data.captured_at;
    return payload;
  }

  return { PARAMS, capture, get, renderHiddenFields, appendToPayload };
})();