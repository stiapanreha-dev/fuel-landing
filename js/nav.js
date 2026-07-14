window.SiteNav = (function () {
  let mobileMenu = null;
  let burger = null;

  function closeMobileMenu() {
    if (!mobileMenu || !burger) return;
    mobileMenu.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  function openMobileMenu() {
    if (!mobileMenu || !burger) return;
    mobileMenu.classList.add('is-open');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
  }

  function toggleMobileMenu() {
    if (mobileMenu?.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        closeMobileMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
      });
    });
  }

  function bindBurger() {
    burger = document.querySelector('[data-burger]');
    mobileMenu = document.querySelector('[data-mobile-menu]');
    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', toggleMobileMenu);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMobileMenu();
    });
  }

  function bindActiveNav(menuIds) {
    const links = [...document.querySelectorAll('.nav a[href^="#"]')];
    const sections = menuIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function init(menuItems) {
    const menuIds = menuItems.map((item) => item.id);
    bindBurger();
    bindSmoothScroll();
    bindActiveNav(menuIds);
  }

  return { init, closeMobileMenu };
})();