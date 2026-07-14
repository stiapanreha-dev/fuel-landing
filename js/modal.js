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

  function validateForm() {
    let valid = true;
    const required = formEl.querySelectorAll('[required]');

    required.forEach((field) => {
      const wrapper = field.closest('.form-field');
      const errorEl = wrapper?.querySelector('.form-field__error');
      const value = field.value.trim();

      if (!value) {
        valid = false;
        field.classList.add('is-invalid');
        if (errorEl) errorEl.textContent = 'Обязательное поле';
      } else if (field.type === 'tel' && value.replace(/\D/g, '').length < 10) {
        valid = false;
        field.classList.add('is-invalid');
        if (errorEl) errorEl.textContent = 'Введите корректный телефон';
      } else {
        field.classList.remove('is-invalid');
        if (errorEl) errorEl.textContent = '';
      }
    });

    return valid;
  }

  function bindForm() {
    formEl?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm()) return;

      formEl.hidden = true;
      successEl.hidden = false;
    });

    formEl?.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        const errorEl = field.closest('.form-field')?.querySelector('.form-field__error');
        if (errorEl) errorEl.textContent = '';
      });
    });
  }

  function bindTriggers() {
    document.querySelectorAll('[data-open-form]').forEach((btn) => {
      btn.addEventListener('click', () => open());
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

  function renderFields(formConfig) {
    return formConfig.fields
      .map((field) => {
        const required = field.required ? 'required' : '';
        const reqMark = field.required ? ' <span aria-hidden="true">*</span>' : '';

        if (field.type === 'select') {
          const options = field.options
            .map((opt) => `<option value="${opt}">${opt}</option>`)
            .join('');
          return `
            <div class="form-field">
              <label for="modal-${field.name}">${field.label}${reqMark}</label>
              <select id="modal-${field.name}" name="${field.name}" ${required}>
                <option value="">Выберите…</option>
                ${options}
              </select>
              <div class="form-field__error"></div>
            </div>`;
        }

        return `
          <div class="form-field">
            <label for="modal-${field.name}">${field.label}${reqMark}</label>
            <input type="${field.type}" id="modal-${field.name}" name="${field.name}" ${required}>
            <div class="form-field__error"></div>
          </div>`;
      })
      .join('');
  }

  function init(content) {
    modalEl = document.getElementById('lead-modal');
    formEl = document.getElementById('lead-form');
    successEl = document.getElementById('lead-success');
    fuelSelect = formEl?.querySelector('[name="fuel"]');

    const fieldsHost = document.getElementById('lead-form-fields');
    if (fieldsHost && content.form_modal) {
      fieldsHost.innerHTML = renderFields(content.form_modal);
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