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

function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  const sidebar = document.getElementById('sidebar-nav');

  const closeSidebar = () => {
    sidebar?.classList.remove('active');
    overlay?.classList.remove('active');
  };

  const toggleSidebar = () => {
    sidebar?.classList.toggle('active');
    overlay?.classList.toggle('active');
  };

  toggleBtn?.addEventListener('click', toggleSidebar);
  overlay?.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeSidebar();
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest('.sidebar .nav-item a')) {
      closeSidebar();
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
  
  if (id === 'sidebar') {
    initSidebarToggle();
  }


}

loadComponent('sidebar', 'sidebar.html');
loadComponent('footer', 'footer.html');