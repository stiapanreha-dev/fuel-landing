(function () {
  const loadingEl = document.getElementById('loading');
  const appEl = document.getElementById('app');

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function renderHeader(site, content) {
    const header = document.getElementById('header');
    const phone = site.contacts?.phone || '';
    const phoneRaw = site.contacts?.phone_raw || phone;

    header.innerHTML = `
      <div class="container header__inner">
        <a href="#hero" class="header__brand">
          <img src="${site.company.logo}" alt="${site.company.name}">
          <span data-company-name>${site.company.name}</span>
        </a>
        <nav class="nav" aria-label="Основное меню">
          ${content.menu.map((item) => `<a href="#${item.id}">${item.label}</a>`).join('')}
        </nav>
        <div class="header__contacts">
          <a class="header__phone" href="tel:${phoneRaw}">${phone}</a>
          <a class="btn btn--ghost" href="${site.contacts.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn btn--ghost" href="${site.contacts.telegram}" target="_blank" rel="noopener">Telegram</a>
        </div>
      </div>
    `;
  }

  function renderHero(site, content) {
    const hero = content.hero;
    const section = document.getElementById('hero');
    section.style.setProperty('--hero-bg', `url('${site.images.hero_bg}')`);

    section.innerHTML = `
      <div class="container hero__grid">
        <div>
          <h1 class="section__title">${hero.title}</h1>
          <p class="section__subtitle">${hero.subtitle}</p>
          <ul class="hero__benefits">
            ${hero.benefits.map((b) => `<li>${b}</li>`).join('')}
          </ul>
          <button class="btn btn--accent" type="button" data-open-form>${hero.cta}</button>
          <p class="placeholder-note">Спринт 1–4: полная вёрстка, модальная форма и отправка заявок.</p>
        </div>
        <div>
          <img src="${site.images.hero_bg}" alt="Доставка топлива" style="border-radius: 18px; box-shadow: var(--shadow);">
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
            <img src="${fuel.image}" alt="${fuel.name}" style="margin-bottom:16px;border-radius:12px;">
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
    renderSection(
      'delivery',
      d.title,
      `<p class="section__subtitle">${d.text.replace(/\n\n/g, '</p><p class="section__subtitle">')}</p>
       <div class="grid-4" style="margin:24px 0;">${d.regions.map((r) => `<article class="card"><h3>${r}</h3></article>`).join('')}</div>
       <img src="${d.image}" alt="Доставка" style="max-width:480px;border-radius:18px;margin-bottom:24px;">
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
            <p><strong>Телефон:</strong> <a href="tel:${site.contacts.phone_raw}">${site.contacts.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${site.contacts.email}">${site.contacts.email}</a></p>
            <p><strong>Режим работы:</strong> ${site.contacts.work_hours}</p>
            <p class="placeholder-note">Форма заявки — спринт 4. Интеграции — спринт 5.</p>
          </div>
          <div class="card" style="background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.12);color:#fff;">
            <p>Финальная форма с полями: ${c.form.fields.map((f) => f.label).join(', ')}.</p>
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
          <a href="#" style="color:inherit;">${content.footer.privacy_text}</a> ·
          <a href="#" style="color:inherit;">${content.footer.consent_text}</a>
        </p>
      </div>
    `;
  }

  function bindCtaButtons() {
    document.querySelectorAll('[data-open-form], [data-fuel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        alert('Форма заявки будет подключена в спринте 4.');
      });
    });
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
      bindCtaButtons();

      loadingEl.hidden = true;
      appEl.hidden = false;
    } catch (error) {
      loadingEl.textContent = `Ошибка загрузки конфигурации: ${error.message}`;
      console.error(error);
    }
  }

  init();
})();