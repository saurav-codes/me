document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    lightbox.appendChild(lightboxContent);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '<i class="ph ph-x"></i>';
    lightbox.appendChild(closeBtn);

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.innerHTML = '<i class="ph ph-caret-left"></i>';
    lightbox.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.innerHTML = '<i class="ph ph-caret-right"></i>';
    lightbox.appendChild(nextBtn);

    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const totalImages = galleryImages.length;

    function showImage(index) {
        currentImageIndex = index;
        const img = galleryImages[index];
        const caption = img.closest('.gallery-item').querySelector('.gallery-caption').innerHTML;
        
        lightboxContent.innerHTML = `
            <img src="${img.src}" alt="${img.alt}">
            <div class="lightbox-caption">${caption}</div>
        `;

        // Update navigation visibility
        prevBtn.style.display = index === 0 ? 'none' : 'block';
        nextBtn.style.display = index === totalImages - 1 ? 'none' : 'block';
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            showImage(index);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < totalImages - 1) {
            showImage(currentImageIndex + 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                showImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight' && currentImageIndex < totalImages - 1) {
                showImage(currentImageIndex + 1);
            }
        }
    });
});
