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

      if (field.type === 'checkbox') {
        if (!field.checked) {
          valid = false;
          field.classList.add('is-invalid');
          if (errorEl) errorEl.textContent = 'Необходимо согласие';
        } else {
          field.classList.remove('is-invalid');
          if (errorEl) errorEl.textContent = '';
        }
        return;
      }

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
      const eventName = field.type === 'checkbox' ? 'change' : 'input';
      field.addEventListener(eventName, () => {
        field.classList.remove('is-invalid');
        const errorEl = field.closest('.form-field')?.querySelector('.form-field__error');
        if (errorEl) errorEl.textContent = '';
      });
    });
  },

  bindPhoneMask(formEl) {
    formEl?.querySelectorAll('input[type="tel"]').forEach((input) => {
      input.addEventListener('input', () => {
        const digits = input.value.replace(/\D/g, '').slice(0, 11);
        let formatted = digits;

        if (digits.startsWith('8') || digits.startsWith('7')) {
          const d = digits.startsWith('8') ? '7' + digits.slice(1) : digits;
          const parts = [
            d.slice(0, 1),
            d.slice(1, 4),
            d.slice(4, 7),
            d.slice(7, 9),
            d.slice(9, 11),
          ];
          if (d.length > 1) formatted = `+${parts[0]} (${parts[1]}`;
          if (d.length >= 4) formatted += `) ${parts[2]}`;
          if (d.length >= 7) formatted += `-${parts[3]}`;
          if (d.length >= 9) formatted += `-${parts[4]}`;
        }

        input.value = formatted;
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