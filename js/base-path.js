window.SiteBase = (function () {
  function basePath() {
    let path = window.location.pathname;
    const last = path.split('/').pop() || '';

    if (last && last.includes('.')) {
      path = path.slice(0, path.lastIndexOf('/') + 1);
    } else if (!path.endsWith('/')) {
      path += '/';
    }

    return path;
  }

  function asset(path) {
    if (!path || /^https?:\/\//i.test(path) || path.startsWith('data:')) {
      return path;
    }

    const clean = path.replace(/^\//, '').replace(/^\.\//, '');
    return `${basePath()}${clean}`;
  }

  return { basePath, asset };
})();