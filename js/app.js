(function () {
  const loadingEl = document.getElementById('loading');
  const appEl = document.getElementById('app');
  const icons = window.SiteIcons;

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

  function renderSection(id, title, innerHtml) {
    const section = document.getElementById(id);
    section.innerHTML = `
      <div class="container">
        <h2 class="section__title">${title}</h2>
        ${innerHtml}
      </div>
    `;
  }

  function renderAdvantages(content) {
    renderSection(
      'advantages',
      content.advantages.title,
      `<div class="grid-3">${content.advantages.items
        .map((item) => `<article class="card"><h3>${item.title}</h3><p>${item.text}</p></article>`)
        .join('')}</div>`
    );
  }

  function renderFuel(content) {
    renderSection(
      'fuel',
      content.fuel.title,
      `<div class="grid-2">${content.fuel.types
        .map(
          (fuel) => `
          <article class="card">
            <img src="${fuel.image}" alt="${fuel.name}" loading="lazy" style="margin-bottom:16px;border-radius:12px;">
            <h3>${fuel.name}</h3>
            <p>${fuel.description}</p>
            <p><strong>${content.fuel.price_label}</strong></p>
            <button class="btn btn--accent" type="button" data-fuel="${fuel.name}">${content.fuel.cta}</button>
          </article>`
        )
        .join('')}</div>`
    );
  }

  function renderAudience(content) {
    renderSection(
      'audience',
      content.audience.title,
      `<div class="grid-4">${content.audience.items
        .map((item) => `<article class="card"><h3>${item}</h3></article>`)
        .join('')}</div>
        <p style="margin-top:24px;"><button class="btn btn--accent" type="button" data-open-form>${content.audience.cta}</button></p>`
    );
  }

  function renderOrder(content) {
    renderSection(
      'order',
      content.order.title,
      `<div class="grid-4">${content.order.steps
        .map((step, i) => `<article class="card"><h3>${i + 1}. ${step.title}</h3><p>${step.text}</p></article>`)
        .join('')}</div>`
    );
  }

  function renderDelivery(site, content) {
    const d = content.delivery;
    const paragraphs = d.text.trim().split(/\n\n+/);
    renderSection(
      'delivery',
      d.title,
      `${paragraphs.map((p) => `<p class="section__subtitle">${p}</p>`).join('')}
       <div class="grid-4" style="margin:24px 0;">${d.regions.map((r) => `<article class="card"><h3>${r}</h3></article>`).join('')}</div>
       <img src="${d.image}" alt="Доставка топлива" loading="lazy" style="max-width:480px;border-radius:18px;margin-bottom:24px;">
       <button class="btn btn--accent" type="button" data-open-form>${d.cta}</button>`
    );
  }

  function renderContacts(site, content) {
    const c = content.contacts;
    const section = document.getElementById('contacts');
    section.innerHTML = `
      <div class="container">
        <h2 class="section__title">${c.title}</h2>
        <p class="section__subtitle">${c.subtitle}</p>
        <div class="grid-2">
          <div class="card" style="background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.12);color:#fff;">
            <p><strong>Телефон:</strong> <a href="tel:${site.contacts.phone_raw}" style="color:#fff;">${site.contacts.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${site.contacts.email}" style="color:#fff;">${site.contacts.email}</a></p>
            <p><strong>WhatsApp:</strong> <a href="${site.contacts.whatsapp}" target="_blank" rel="noopener" style="color:#fff;">Написать</a></p>
            <p><strong>Telegram:</strong> <a href="${site.contacts.telegram}" target="_blank" rel="noopener" style="color:#fff;">Написать</a></p>
            <p><strong>Режим работы:</strong> ${site.contacts.work_hours}</p>
          </div>
          <div class="card" style="background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.12);color:#fff;">
            <p style="margin-bottom:16px;">Оставьте заявку — рассчитаем стоимость топлива и доставки.</p>
            <button class="btn btn--accent" type="button" data-open-form>${c.form.submit}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderFooter(site, content) {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
      <div class="container footer__grid">
        <p><strong data-company-name>${site.company.name}</strong></p>
        <p>ИНН: ${site.company.inn} · ОГРН: ${site.company.ogrn}</p>
        <p>${site.company.legal_address}</p>
        <p>
          <a href="#">${content.footer.privacy_text}</a> ·
          <a href="#">${content.footer.consent_text}</a>
        </p>
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
      renderDelivery(site, content);
      renderContacts(site, content);
      renderFooter(site, content);

      window.SiteNav.init(content.menu);
      window.SiteModal.init(content);

      loadingEl.hidden = true;
      appEl.hidden = false;
    } catch (error) {
      loadingEl.textContent = `Ошибка загрузки конфигурации: ${error.message}`;
      console.error(error);
    }
  }

  init();
})();