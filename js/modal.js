window.SiteModal = (function () {
  let modalEl = null;
  let formEl = null;
  let successEl = null;
  let presetFuel = null;

  function open(preset) {
    if (!modalEl) return;
    presetFuel = preset || null;
    LeadForm.reset(formEl, successEl, presetFuel);

    modalEl.hidden = false;
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    window.SiteNav?.closeMobileMenu();

    const firstInput = formEl?.querySelector('input:not([type="hidden"]):not([name="website"]), select, textarea');
    firstInput?.focus();
  }

  function close() {
    if (!modalEl) return;
    modalEl.hidden = true;
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    LeadForm.reset(formEl, successEl);
    presetFuel = null;
  }

  function bindTriggers() {
    document.querySelectorAll('[data-open-form]').forEach((btn) => {
      btn.addEventListener('click', () => open());
    });

    document.querySelectorAll('[data-fuel-value]').forEach((btn) => {
      btn.addEventListener('click', () => open(btn.getAttribute('data-fuel-value')));
    });

    document.querySelectorAll('[data-fuel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const fuel = btn.getAttribute('data-fuel');
        const match = fuel?.includes('92') ? 'АИ-92' : fuel?.includes('95') ? 'АИ-95' : fuel;
        open(match);
      });
    });

    modalEl?.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', close);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modalEl?.hidden) close();
    });
  }

  function init(content) {
    modalEl = document.getElementById('lead-modal');
    formEl = document.getElementById('lead-form');
    successEl = document.getElementById('lead-success');

    const titleEl = document.getElementById('lead-modal-title');
    const submitEl = document.getElementById('lead-form-submit');
    const successTextEl = document.getElementById('lead-success-text');

    if (titleEl) titleEl.textContent = content.form_modal?.title || 'Заявка';
    if (submitEl) submitEl.textContent = content.form_modal?.submit || 'Отправить';
    if (successTextEl) {
      successTextEl.textContent =
        content.contacts?.form?.success ||
        'Спасибо! Заявка успешно отправлена. Менеджер свяжется с вами для уточнения деталей.';
    }

    LeadForm.mount(formEl, {
      prefix: 'modal',
      fieldsHost: document.getElementById('lead-form-fields'),
      fields: content.form_modal?.fields || [],
      successEl,
      source: 'modal',
    });

    bindTriggers();
  }

  return { init, open, close };
})();