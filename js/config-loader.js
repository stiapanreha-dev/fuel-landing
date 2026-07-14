const CONFIG_PATHS = {
  site: 'config/site.yaml',
  content: 'config/content.yaml',
};

async function fetchYaml(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
  }
  const text = await response.text();
  return jsyaml.load(text);
}

function applyTheme(site) {
  const theme = site.theme || {};
  const root = document.documentElement;
  const map = {
    primary: '--color-primary',
    primary_light: '--color-primary-light',
    accent: '--color-accent',
    accent_dark: '--color-accent-dark',
    white: '--color-white',
    text: '--color-text',
    muted: '--color-muted',
  };

  Object.entries(map).forEach(([key, cssVar]) => {
    if (theme[key]) root.style.setProperty(cssVar, theme[key]);
  });
}

function applyMeta(site) {
  if (site.meta?.title) document.title = site.meta.title;
  if (site.meta?.description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = site.meta.description;
  }
}

async function loadConfig() {
  const [site, content] = await Promise.all([
    fetchYaml(CONFIG_PATHS.site),
    fetchYaml(CONFIG_PATHS.content),
  ]);

  applyTheme(site);
  applyMeta(site);

  return { site, content };
}

window.SiteConfig = { loadConfig, fetchYaml };