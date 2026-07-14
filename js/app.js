(function () {
  const loadingEl = document.getElementById('loading');
  const appEl = document.getElementById('app');
  const icons = window.SiteIcons;
  const sectionIcons = window.SectionIcons;

  function highlightFuelTitle(title) {
    return title.replace(
      /АИ-92 и АИ-95/,
      '<em>АИ-92 и АИ-95</em>'
    );
  }

  function renderHeader(site, content) {
    const header = document.getElementById('header');
    const phone = site.contacts?.phone || '';
    const phoneRaw = site.contacts?.phone_raw || phone;
    const menuLinks = content.menu
      .map((item) => `<a href="#${item.id}">${item.label}</a>`)
      .join('');

    header.innerHTML = `
      <div class="container header__inner">
        <a href="#hero" class="header__brand">
          <img src="${site.company.logo}" alt="${site.company.name}">
          <span data-company-name>${site.company.name}</span>
        </a>
        <nav class="nav nav--desktop" aria-label="Основное меню">${menuLinks}</nav>
        <div class="header__actions">
          <a class="header__phone" href="tel:${phoneRaw}" data-track="phone">${phone}</a>
          <a class="btn btn--icon btn--wa" href="${site.contacts.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" data-track="whatsapp">${icons.whatsapp}</a>
          <a class="btn btn--icon btn--tg" href="${site.contacts.telegram}" target="_blank" rel="noopener" aria-label="Telegram" data-track="telegram">${icons.telegram}</a>
          <button class="burger" type="button" data-burger aria-label="Меню" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-menu" data-mobile-menu>
        <nav class="nav" aria-label="Мобильное меню">${menuLinks}</nav>
        <div class="mobile-menu__contacts">
          <a class="header__phone" href="tel:${phoneRaw}">${phone}</a>
          <div class="mobile-menu__row">
            <a class="btn btn--icon btn--wa" href="${site.contacts.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icons.whatsapp}</a>
            <a class="btn btn--icon btn--tg" href="${site.contacts.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${icons.telegram}</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderHero(site, content) {
    const hero = content.hero;
    const section = document.getElementById('hero');
    section.style.setProperty('--hero-bg', `url('${site.images.hero_bg}')`);

    section.innerHTML = `
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="container hero__grid">
        <div class="hero__content">
          <span class="hero__eyebrow">${hero.eyebrow || 'Поставка топлива'}</span>
          <h1 class="hero__title">${highlightFuelTitle(hero.title)}</h1>
          <p class="hero__subtitle">${hero.subtitle}</p>
          <ul class="hero__benefits">
            ${hero.benefits.map((b) => `<li>${b}</li>`).join('')}
          </ul>
          <div class="hero__cta-row">
            <button class="btn btn--accent" type="button" data-open-form>${hero.cta}</button>
          </div>
        </div>
        <div class="hero__visual">
          <img src="${site.images.hero_bg}" alt="Доставка бензина бензовозом" loading="eager" width="640" height="480">
        </div>
      </div>
      <div class="hero__trust">
        <div class="container hero__trust-grid">
          ${hero.benefits
            .map((b) => `<div class="hero__trust-item">${b}</div>`)
            .join('')}
        </div>
      </div>
    `;
  }

  function sectionHead(title, subtitle) {
    return `
      <div class="section-head">
        <h2 class="section__title">${title}</h2>
        ${subtitle ? `<p class="section__subtitle">${subtitle}</p>` : ''}
      </div>`;
  }

  function renderSection(id, headHtml, innerHtml) {
    const section = document.getElementById(id);
    section.innerHTML = `
      <div class="container">
        ${headHtml}
        ${innerHtml}
      </div>
    `;
  }

  function renderAdvantages(content) {
    const block = content.advantages;
    renderSection(
      'advantages',
      sectionHead(block.title, block.subtitle),
      `<div class="advantages-grid">${block.items
        .map(
          (item) => `
          <article class="advantage-card">
            <div class="advantage-card__icon" aria-hidden="true">${sectionIcons.get(item.icon)}</div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>`
        )
        .join('')}</div>`
    );
  }

  function renderFuel(content) {
    const block = content.fuel;
    renderSection(
      'fuel',
      sectionHead(block.title, block.subtitle),
      `<div class="fuel-grid">${block.types
        .map(
          (fuel) => `
          <article class="fuel-card">
            <div class="fuel-card__media">
              <img src="${fuel.image}" alt="${fuel.name}" loading="lazy" width="640" height="400">
              <span class="fuel-card__badge">${fuel.badge || fuel.name}</span>
            </div>
            <div class="fuel-card__body">
              <h3>${fuel.name}</h3>
              <p class="fuel-card__desc">${fuel.description}</p>
              <p class="fuel-card__price">${block.price_label}</p>
              <button class="btn btn--accent" type="button" data-fuel-value="${fuel.fuel_select || fuel.badge}">${block.cta}</button>
            </div>
          </article>`
        )
        .join('')}</div>`
    );
  }

  function normalizeAudienceItem(item) {
    if (typeof item === 'string') {
      return { icon: 'default', label: item };
    }
    return item;
  }

  function renderAudience(content) {
    const block = content.audience;
    renderSection(
      'audience',
      sectionHead(block.title, block.subtitle),
      `<div class="audience-grid">${block.items
        .map((raw) => {
          const item = normalizeAudienceItem(raw);
          return `
          <article class="audience-card">
            <div class="audience-card__icon" aria-hidden="true">${sectionIcons.get(item.icon)}</div>
            <h3>${item.label}</h3>
          </article>`;
        })
        .join('')}</div>
        <div class="section-cta">
          <button class="btn btn--accent" type="button" data-open-form>${block.cta}</button>
        </div>`
    );
  }

  function renderOrder(content) {
    const block = content.order;
    renderSection(
      'order',
      sectionHead(block.title, block.subtitle),
      `<div class="steps">${block.steps
        .map(
          (step, i) => `
          <article class="step-card">
            <div class="step-card__num" aria-hidden="true">${i + 1}</div>
            <div>
              <h3>${step.title}</h3>
              <p>${step.text}</p>
            </div>
          </article>`
        )
        .join('')}</div>`
    );
  }

  function renderDelivery(content) {
    const d = content.delivery;
    const paragraphs = d.text.trim().split(/\n\n+/);
    renderSection(
      'delivery',
      sectionHead(d.title, d.subtitle),
      `<div class="delivery-layout">
        <div class="delivery-layout__text">
          ${paragraphs.map((p) => `<p class="section__subtitle">${p}</p>`).join('')}
          <div class="delivery-regions">
            ${d.regions.map((r) => `<div class="delivery-region">${r}</div>`).join('')}
          </div>
          <button class="btn btn--accent" type="button" data-open-form>${d.cta}</button>
        </div>
        <div class="delivery-visual">
          <img src="${d.map_image || d.image}" alt="География доставки по России" loading="lazy" width="560" height="320">
          <img src="${d.image}" alt="Доставка топлива бензовозом" loading="lazy" width="560" height="320">
        </div>
      </div>`
    );
  }

  function renderContacts(site, content) {
    const c = content.contacts;
    const section = document.getElementById('contacts');
    section.innerHTML = `
      <div class="container">
        ${sectionHead(c.title, c.subtitle)}
        <div class="contacts-layout">
          <div class="contacts-info">
            <div class="contacts-info__item">
              <div class="contacts-info__icon" aria-hidden="true">📞</div>
              <div>
                <div class="contacts-info__label">Телефон</div>
                <div class="contacts-info__value"><a href="tel:${site.contacts.phone_raw}">${site.contacts.phone}</a></div>
              </div>
            </div>
            <div class="contacts-info__item">
              <div class="contacts-info__icon" aria-hidden="true">✉️</div>
              <div>
                <div class="contacts-info__label">Email</div>
                <div class="contacts-info__value"><a href="mailto:${site.contacts.email}">${site.contacts.email}</a></div>
              </div>
            </div>
            <div class="contacts-info__item">
              <div class="contacts-info__icon" aria-hidden="true">💬</div>
              <div>
                <div class="contacts-info__label">Мессенджеры</div>
                <div class="contacts-info__value">
                  <a href="${site.contacts.whatsapp}" target="_blank" rel="noopener">WhatsApp</a> ·
                  <a href="${site.contacts.telegram}" target="_blank" rel="noopener">Telegram</a>
                </div>
              </div>
            </div>
            <div class="contacts-info__item">
              <div class="contacts-info__icon" aria-hidden="true">🕐</div>
              <div>
                <div class="contacts-info__label">Режим работы</div>
                <div class="contacts-info__value">${site.contacts.work_hours}</div>
              </div>
            </div>
          </div>
          <div class="contacts-form-card">
            <h3 class="modal__title">${c.form.submit}</h3>
            <p class="modal__subtitle" style="margin-bottom:20px;">Заполните форму — перезвоним для расчёта</p>
            <form id="contacts-form" novalidate>
              <div id="contacts-form-fields"></div>
              <button class="btn btn--accent form__submit" type="submit" id="contacts-form-submit">${c.form.submit}</button>
              <p class="form__note">Настройте Formspree и Telegram Worker — см. docs/INTEGRATIONS.md</p>
            </form>
            <div id="contacts-success" class="form__success" hidden>
              <div class="form__success-icon" aria-hidden="true">✓</div>
              <h3 class="modal__title">Заявка принята</h3>
              <p data-success-text></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFooter(site, content) {
    const f = content.footer;
    const year = new Date().getFullYear();
    const footer = document.getElementById('footer');
    footer.innerHTML = `
      <div class="container">
        <div class="footer__inner">
          <div>
            <div class="footer__brand" data-company-name>${site.company.name}</div>
            <div class="footer__meta">
              <span>ИНН: ${site.company.inn}</span>
              <span>ОГРН: ${site.company.ogrn}</span>
              <span>${site.company.legal_address}</span>
            </div>
          </div>
          <div class="footer__links">
            <a href="${f.privacy_url || 'privacy.html'}">${f.privacy_text}</a>
            <a href="${f.consent_url || 'privacy.html#consent'}">${f.consent_text}</a>
            <a href="index.html#contacts">Контакты</a>
          </div>
        </div>
        <p class="footer__copy">© ${year} ${site.company.name}. Все права защищены.</p>
      </div>
    `;
  }

  async function init() {
    try {
      const { site, content } = await window.SiteConfig.loadConfig();

      renderHeader(site, content);
      renderHero(site, content);
      renderAdvantages(content);
      renderFuel(content);
      renderAudience(content);
      renderOrder(content);
      renderDelivery(content);
      renderContacts(site, content);
      renderFooter(site, content);

      SiteUtm.capture();
      LeadForm.setConfig(site, content);

      window.SiteNav.init(content.menu);
      window.SiteModal.init(content);
      window.ContactsForm.init(content);

      if (LeadApi.isConfigured(site)) {
        document.querySelectorAll('.form__note').forEach((el) => {
          el.textContent = 'Заявка будет отправлена менеджеру на email и/или в Telegram';
        });
      }

      loadingEl.hidden = true;
      appEl.hidden = false;
    } catch (error) {
      loadingEl.textContent = `Ошибка загрузки конфигурации: ${error.message}`;
      console.error(error);
    }
  }

  init();
})();