async function loadComponent(id, file, options = {}) {
  const res = await fetch(composants/${file});
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}


loadComponent ("entete", "entete.html");
loadComponent ("footer", "footer.html");
loadComponent ("sidebar", "sidebar.html");