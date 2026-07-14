window.LeadForm = (function () {
  let siteConfig = null;
  let contentConfig = null;

  function setConfig(site, content) {
    siteConfig = site;
    contentConfig = content;
  }

  function honeypotName() {
    return siteConfig?.forms?.honeypot_field || 'website';
  }

  function renderExtras(prefix) {
    const hp = honeypotName();
    const consent = contentConfig?.form_consent;
    const consentHtml = consent
      ? `
      <div class="form-field form-field--consent">
        <label class="form-consent">
          <input type="checkbox" name="consent" value="1" ${consent.required ? 'required' : ''}>
          <span>${consent.text} <a href="${contentConfig?.footer?.consent_url || 'privacy.html#consent'}" target="_blank" rel="noopener">Подробнее</a></span>
        </label>
        <div class="form-field__error"></div>
      </div>`
      : '';

    return `
      ${SiteUtm.renderHiddenFields(prefix)}
      <div class="form-honeypot" aria-hidden="true">
        <label for="${prefix}-${hp}">Не заполнять</label>
        <input type="text" name="${hp}" id="${prefix}-${hp}" tabindex="-1" autocomplete="off">
      </div>
      <input type="hidden" name="form_source" value="${prefix}">
      ${consentHtml}`;
  }

  function isHoneypotTriggered(formEl) {
    const hp = formEl.querySelector(`[name="${honeypotName()}"]`);
    return hp && hp.value.trim() !== '';
  }

  function buildPayload(formEl, source) {
    const formData = new FormData(formEl);
    const payload = {
      source: source || formData.get('form_source') || 'unknown',
      submitted_at: new Date().toISOString(),
      page_url: window.location.href,
    };

    ['name', 'phone', 'fuel', 'volume', 'address', 'comment'].forEach((key) => {
      const value = formData.get(key);
      if (value) payload[key] = String(value).trim();
    });

    SiteUtm.appendToPayload(payload);
    return payload;
  }

  function setSubmitting(formEl, isSubmitting) {
    const btn = formEl.querySelector('[type="submit"]');
    if (!btn) return;
    btn.disabled = isSubmitting;
    btn.classList.toggle('is-loading', isSubmitting);
    if (isSubmitting) {
      btn.dataset.originalText = btn.textContent;
      btn.textContent = 'Отправка…';
    } else if (btn.dataset.originalText) {
      btn.textContent = btn.dataset.originalText;
    }
  }

  function showFormError(formEl, message) {
    let el = formEl.querySelector('.form__global-error');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form__global-error';
      formEl.insertBefore(el, formEl.querySelector('.form__submit') || formEl.firstChild);
    }
    el.textContent = message;
    el.hidden = false;
  }

  function clearFormError(formEl) {
    const el = formEl.querySelector('.form__global-error');
    if (el) el.hidden = true;
  }

  async function handleSubmit(event, options) {
    const { formEl, successEl, source, onSuccess } = options;
    event.preventDefault();
    clearFormError(formEl);

    if (isHoneypotTriggered(formEl)) {
      console.warn('[LeadForm] Honeypot triggered — rejected');
      if (onSuccess) onSuccess();
      return;
    }

    if (!FormRender.validateForm(formEl)) return;

    setSubmitting(formEl, true);

    try {
      const payload = buildPayload(formEl, source);
      await LeadApi.submit(payload, siteConfig);
      formEl.hidden = true;
      if (successEl) successEl.hidden = false;
      if (onSuccess) onSuccess(payload);
    } catch (error) {
      console.error(error);
      showFormError(formEl, 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.');
    } finally {
      setSubmitting(formEl, false);
    }
  }

  function mount(formEl, options = {}) {
    if (!formEl) return;

    const prefix = options.prefix || 'form';
    const fieldsHost = options.fieldsHost;
    const fields = FormRender.syncFuelOptions(
      JSON.parse(JSON.stringify(options.fields || [])),
      contentConfig?.fuel?.types
    );

    if (fieldsHost && fields.length) {
      fieldsHost.innerHTML = FormRender.renderFields(fields, prefix) + renderExtras(prefix);
    } else if (options.appendExtras) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = renderExtras(prefix);
      formEl.appendChild(wrapper);
    }

    FormRender.bindValidation(formEl);
    FormRender.bindPhoneMask(formEl);

    formEl.addEventListener('submit', (event) =>
      handleSubmit(event, {
        formEl,
        successEl: options.successEl,
        source: options.source || prefix,
        onSuccess: options.onSuccess,
      })
    );
  }

  function reset(formEl, successEl, presetFuel) {
    if (!formEl) return;
    formEl.reset();
    formEl.hidden = false;
    if (successEl) successEl.hidden = true;
    clearFormError(formEl);
    formEl.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
    formEl.querySelectorAll('.form-field__error').forEach((el) => {
      el.textContent = '';
    });
    if (presetFuel) {
      const fuelSelect = formEl.querySelector('[name="fuel"]');
      if (fuelSelect) fuelSelect.value = presetFuel;
    }
  }

  return { setConfig, mount, reset, buildPayload, handleSubmit };
})();