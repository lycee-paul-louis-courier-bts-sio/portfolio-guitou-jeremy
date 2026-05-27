// Fonctionnalité lightbox pour les images
function initLightbox() {
  // Créer la modale lightbox si elle n'existe pas
  let lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close"></span>
        <img id="lightbox-image" src="" alt="" />
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  // Récupérer toutes les images cliquables dans les éléments image-card
  const images = document.querySelectorAll('.image-card img');

  images.forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      const lightboxImg = document.getElementById('lightbox-image');
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('active');
    });
  });

  const closeLightbox = () => {
    if (!lightbox.classList.contains('active')) {
      return;
    }
    lightbox.classList.remove('active');
    lightbox.classList.add('closing');
    setTimeout(() => {
      lightbox.classList.remove('closing');
    }, 300);
  };

  // Fermer la lightbox en cliquant sur le bouton de fermeture
  const closeBtn = document.querySelector('.lightbox-close');
  closeBtn?.addEventListener('click', closeLightbox);

  // Fermer la lightbox en cliquant sur l'image agrandie
  const lightboxImg = document.getElementById('lightbox-image');
  lightboxImg?.addEventListener('click', closeLightbox);

  // Fermer la lightbox en cliquant sur le fond noir
  lightbox.addEventListener('click', function (e) {
    if (e.target === this) {
      closeLightbox();
    }
  });

  // Fermer la lightbox avec la touche Échap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
}

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightbox);
} else {
  initLightbox();
}
