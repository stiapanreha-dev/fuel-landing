window.FormRender = {
  renderFields(fields, prefix = 'modal') {
    return fields
      .map((field) => {
        const required = field.required ? 'required' : '';
        const reqMark = field.required ? ' <span aria-hidden="true">*</span>' : '';
        const id = `${prefix}-${field.name}`;

        if (field.type === 'select') {
          const options = (field.options || [])
            .map((opt) => `<option value="${opt}">${opt}</option>`)
            .join('');
          return `
            <div class="form-field">
              <label for="${id}">${field.label}${reqMark}</label>
              <select id="${id}" name="${field.name}" ${required}>
                <option value="">Выберите…</option>
                ${options}
              </select>
              <div class="form-field__error"></div>
            </div>`;
        }

        if (field.type === 'textarea') {
          return `
            <div class="form-field">
              <label for="${id}">${field.label}${reqMark}</label>
              <textarea id="${id}" name="${field.name}" rows="3" ${required}></textarea>
              <div class="form-field__error"></div>
            </div>`;
        }

        return `
          <div class="form-field">
            <label for="${id}">${field.label}${reqMark}</label>
            <input type="${field.type}" id="${id}" name="${field.name}" ${required}>
            <div class="form-field__error"></div>
          </div>`;
      })
      .join('');
  },

  validateForm(formEl) {
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
  },

  bindValidation(formEl) {
    formEl?.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
        const errorEl = field.closest('.form-field')?.querySelector('.form-field__error');
        if (errorEl) errorEl.textContent = '';
      });
    });
  },

  syncFuelOptions(fields, fuelTypes) {
    const fuelField = fields?.find((f) => f.name === 'fuel');
    if (!fuelField || !fuelTypes?.length) return fields;
    fuelField.options = fuelTypes.map((t) => t.fuel_select || t.badge || t.name);
    return fields;
  },
};