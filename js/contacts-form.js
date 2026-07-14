window.ContactsForm = (function () {
  let formEl = null;
  let successEl = null;

  function showSuccess(message) {
    if (!formEl || !successEl) return;
    formEl.hidden = true;
    successEl.hidden = false;
    const textEl = successEl.querySelector('[data-success-text]');
    if (textEl) textEl.textContent = message;
  }

  function reset() {
    if (!formEl || !successEl) return;
    formEl.reset();
    formEl.hidden = false;
    successEl.hidden = true;
    formEl.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
    formEl.querySelectorAll('.form-field__error').forEach((el) => {
      el.textContent = '';
    });
  }

  function init(content) {
    formEl = document.getElementById('contacts-form');
    successEl = document.getElementById('contacts-success');
    if (!formEl) return;

    const fieldsHost = document.getElementById('contacts-form-fields');
    const fields = FormRender.syncFuelOptions(
      JSON.parse(JSON.stringify(content.contacts?.form?.fields || [])),
      content.fuel?.types
    );

    if (fieldsHost && fields.length) {
      fieldsHost.innerHTML = FormRender.renderFields(fields, 'contacts');
    }

    const submitEl = document.getElementById('contacts-form-submit');
    if (submitEl) submitEl.textContent = content.contacts?.form?.submit || 'Отправить';

    FormRender.bindValidation(formEl);

    formEl.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!FormRender.validateForm(formEl)) return;
      showSuccess(
        content.contacts?.form?.success ||
          'Спасибо! Заявка успешно отправлена. Менеджер свяжется с вами для уточнения деталей.'
      );
    });
  }

  return { init, reset };
})();