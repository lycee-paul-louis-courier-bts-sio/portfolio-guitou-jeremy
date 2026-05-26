// Lightbox functionality for images
function initLightbox() {
  // Create lightbox modal if it doesn't exist
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

  // Get all clickable images in image-card elements
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

  // Close lightbox when clicking the close button
  const closeBtn = document.querySelector('.lightbox-close');
  closeBtn?.addEventListener('click', function () {
    lightbox.classList.remove('active');
  });

  // Close lightbox when clicking on the dark background
  lightbox.addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightbox);
} else {
  initLightbox();
}
