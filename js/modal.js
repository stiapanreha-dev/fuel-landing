window.SiteModal = (function () {
  let modalEl = null;
  let formEl = null;
  let successEl = null;
  let fuelSelect = null;
  let presetFuel = null;

  function open(preset) {
    if (!modalEl) return;
    presetFuel = preset || null;
    resetForm();
    if (presetFuel && fuelSelect) {
      fuelSelect.value = presetFuel;
    }

    modalEl.hidden = false;
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    window.SiteNav?.closeMobileMenu();

    const firstInput = formEl?.querySelector('input, select, textarea');
    firstInput?.focus();
  }

  function close() {
    if (!modalEl) return;
    modalEl.hidden = true;
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    resetForm();
  }

  function resetForm() {
    if (!formEl || !successEl) return;
    formEl.reset();
    formEl.hidden = false;
    successEl.hidden = true;
    formEl.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
    formEl.querySelectorAll('.form-field__error').forEach((el) => {
      el.textContent = '';
    });
    if (presetFuel && fuelSelect) {
      fuelSelect.value = presetFuel;
    }
  }

  function bindForm() {
    formEl?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!FormRender.validateForm(formEl)) return;
      formEl.hidden = true;
      successEl.hidden = false;
    });
    FormRender.bindValidation(formEl);
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

    const fields = FormRender.syncFuelOptions(
      JSON.parse(JSON.stringify(content.form_modal?.fields || [])),
      content.fuel?.types
    );

    const fieldsHost = document.getElementById('lead-form-fields');
    if (fieldsHost && fields.length) {
      fieldsHost.innerHTML = FormRender.renderFields(fields, 'modal');
      fuelSelect = formEl?.querySelector('[name="fuel"]');
    }

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

    bindForm();
    bindTriggers();
  }

  return { init, open, close };
})();