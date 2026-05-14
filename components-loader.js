function getPathPrefix() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const depth = Math.max(0, pathParts.length - 1);
  return depth === 0 ? './' : '../'.repeat(depth);
}

function updateInjectedLinks(root, pathPrefix) {
  const rootUrl = new URL(pathPrefix, window.location.href);
  root.querySelectorAll('[data-target]').forEach((link) => {
    const target = link.dataset.target;
    if (target) {
      link.href = new URL(target, rootUrl).href;
    }
  });
}

async function loadComponent(id, file) {
  const pathPrefix = getPathPrefix();
  const componentUrl = new URL(`${pathPrefix}composants/${file}`, window.location.href);
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const res = await fetch(componentUrl);
  if (!res.ok) {
    console.error(`Unable to load component: ${componentUrl}`);
    return;
  }

  const html = await res.text();
  element.innerHTML = html;
  updateInjectedLinks(element, pathPrefix);
}

loadComponent('sidebar', 'sidebar.html');
loadComponent('footer', 'footer.html');