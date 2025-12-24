 let currentIndex = 0;

    // Elements
    const modal = document.getElementById('photoModal');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');
    const thumbnailScroll = document.getElementById('thumbnailScroll');
    const viewPhotosBtn = document.getElementById('viewPhotosBtn');
    const closeModal = document.getElementById('closeModal');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    const thumbnailPrev = document.getElementById('thumbnailPrev');
    const thumbnailNext = document.getElementById('thumbnailNext');

    // Show specific image
    function showImage(index) {
      currentIndex = index;
      
      // Update main images
      galleryImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
      
      // Update thumbnails
      thumbnailItems.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });

      // Scroll thumbnail into view
      if (thumbnailItems[index]) {
        thumbnailItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // Navigate images
    function navigateImage(direction) {
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = galleryImages.length - 1;
      if (currentIndex >= galleryImages.length) currentIndex = 0;
      showImage(currentIndex);
    }

    // Scroll thumbnails
    function scrollThumbnails(direction) {
      const scrollAmount = 200;
      thumbnailScroll.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }

    viewPhotosBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.overflow = 'hidden';
      // Add class in next frame to trigger animation
      requestAnimationFrame(() => {
        modal.classList.add('active');
      });
    });

    function closeModalHandler() {
      modal.classList.remove('active');
      // Wait for animation to complete before allowing scroll
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 400);
      currentIndex = 0;
      showImage(0);
    }

    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModalHandler();
    });

    thumbnailItems.forEach((thumb) => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(thumb.getAttribute('data-index'));
        if (!isNaN(index)) {
          showImage(index);
        }
      });
    });

    // Navigation
    prevImage.addEventListener('click', () => navigateImage(-1));
    nextImage.addEventListener('click', () => navigateImage(1));
    thumbnailPrev.addEventListener('click', () => navigateImage(-1));
    thumbnailNext.addEventListener('click', () => navigateImage(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeModalHandler();
      if (e.key === 'ArrowLeft') navigateImage(-1);
      if (e.key === 'ArrowRight') navigateImage(1);
    });

    let isDragging = false;
    let startX;
    let scrollLeft;

    thumbnailScroll.addEventListener('mousedown', (e) => {
      isDragging = true;
      thumbnailScroll.style.cursor = 'grabbing';
      startX = e.pageX - thumbnailScroll.offsetLeft;
      scrollLeft = thumbnailScroll.scrollLeft;
    });

    thumbnailScroll.addEventListener('mouseleave', () => {
      isDragging = false;
      thumbnailScroll.style.cursor = 'grab';
    });

    thumbnailScroll.addEventListener('mouseup', () => {
      isDragging = false;
      thumbnailScroll.style.cursor = 'grab';
    });

    thumbnailScroll.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - thumbnailScroll.offsetLeft;
      const walk = (x - startX) * 2;
      thumbnailScroll.scrollLeft = scrollLeft - walk;
    });

    let thumbnailTouchStartX = 0;
    let thumbnailScrollStart = 0;

    thumbnailScroll.addEventListener('touchstart', (e) => {
      thumbnailTouchStartX = e.touches[0].clientX;
      thumbnailScrollStart = thumbnailScroll.scrollLeft;
    }, { passive: true });

    thumbnailScroll.addEventListener('touchmove', (e) => {
      const touchX = e.touches[0].clientX;
      const diff = thumbnailTouchStartX - touchX;
      thumbnailScroll.scrollLeft = thumbnailScrollStart + diff;
    }, { passive: true });

    // Touch swipe support for main image navigation
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const mainImageContainer = document.querySelector('.modal-main-image');
    
    mainImageContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    });

    mainImageContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    });

    function handleSwipe() {
      const diffX = Math.abs(touchEndX - touchStartX);
      const diffY = Math.abs(touchEndY - touchStartY);
      
      // Only swipe if horizontal movement is greater than vertical
      if (diffX > diffY && diffX > 50) {
        if (touchEndX < touchStartX) navigateImage(1);
        if (touchEndX > touchStartX) navigateImage(-1);
      }
    }