window.ContactsForm = {
  init(content) {
    const formEl = document.getElementById('contacts-form');
    const successEl = document.getElementById('contacts-success');
    if (!formEl) return;

    const submitEl = document.getElementById('contacts-form-submit');
    if (submitEl) submitEl.textContent = content.contacts?.form?.submit || 'Отправить';

    const successTextEl = successEl?.querySelector('[data-success-text]');
    const successMessage =
      content.contacts?.form?.success ||
      'Спасибо! Заявка успешно отправлена. Менеджер свяжется с вами для уточнения деталей.';

    LeadForm.mount(formEl, {
      prefix: 'contacts',
      fieldsHost: document.getElementById('contacts-form-fields'),
      fields: content.contacts?.form?.fields || [],
      successEl,
      source: 'contacts',
      onSuccess: () => {
        if (successTextEl) successTextEl.textContent = successMessage;
      },
    });
  },
};