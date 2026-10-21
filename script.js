/* ==========================================================================
   Lloyd Jackson & Miranda Blankson Wedding (#lloranda26)
   Interactive Scripts: Slideshow, Timers, Tabs, Reception Reveal & RSVP
   Date: Friday, December 4, 2026 | 12:00 PM GMT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initSlideshow();
    initTabs();
    initMobileMenu();
    initReceptionLockCountdown();
    initGalleryLightbox();
    initCopyButtons();
});

/* --------------------------------------------------------------------------
   1. Wedding Ceremony Countdown Timer
   Target: Friday, December 4, 2026, 12:00:00 GMT
   -------------------------------------------------------------------------- */
function initCountdown() {
    const targetDate = new Date(Date.UTC(2026, 11, 4, 12, 0, 0)).getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function update() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   2. Crossfade Background Slideshow
   -------------------------------------------------------------------------- */
function initSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides || slides.length <= 1) return;

    let currentSlide = 0;

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

/* --------------------------------------------------------------------------
   3. Interactive Tabs Navigation (program.html)
   -------------------------------------------------------------------------- */
function initTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabLinks.length || !tabContents.length) return;

    function activateTab(tabId, updateHash = true) {
        let found = false;

        tabLinks.forEach(link => {
            const targetId = link.getAttribute('data-tab');
            if (targetId === tabId) {
                link.classList.add('active');
                found = true;
            } else {
                link.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        if (found && updateHash) {
            const shortName = tabId.replace('tab-', '');
            if (history.pushState) {
                history.pushState(null, null, `#${shortName}`);
            } else {
                window.location.hash = shortName;
            }
        }
    }

    // Attach click events to tab buttons
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            if (tabId) {
                activateTab(tabId);
            }

            // Close mobile menu if open
            const pageTabs = document.getElementById('pageTabs');
            if (pageTabs && pageTabs.classList.contains('active')) {
                pageTabs.classList.remove('active');
            }
        });
    });

    // Check initial hash on load (e.g., program.html#venue)
    function handleInitialHash() {
        const hash = window.location.hash.replace('#', '').trim().toLowerCase();
        if (hash) {
            const matchedTab = document.getElementById(`tab-${hash}`);
            if (matchedTab) {
                activateTab(`tab-${hash}`, false);
                return;
            }
        }
        // Default to The Couple tab
        activateTab('tab-couple', false);
    }

    handleInitialHash();

    // Listen to hash change (back/forward browser buttons)
    window.addEventListener('hashchange', () => {
        handleInitialHash();
    });
}

/* --------------------------------------------------------------------------
   4. Mobile Header Navigation Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const pageTabs = document.getElementById('pageTabs');

    if (!menuToggle || !pageTabs) return;

    menuToggle.addEventListener('click', () => {
        pageTabs.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !pageTabs.contains(e.target)) {
            pageTabs.classList.remove('active');
        }
    });
}

/* --------------------------------------------------------------------------
   5. Reception Location Time-Lock & Reveal
   Target Reveal: Friday, December 4, 2026, 13:00:00 GMT (1:00 PM GMT)
   -------------------------------------------------------------------------- */
function initReceptionLockCountdown() {
    const unlockTime = new Date(Date.UTC(2026, 11, 4, 13, 0, 0)).getTime();

    const lockedState = document.getElementById('reception-locked-state');
    const unlockedState = document.getElementById('reception-unlocked-state');

    const recDays = document.getElementById('rec-days');
    const recHours = document.getElementById('rec-hours');
    const recMinutes = document.getElementById('rec-minutes');
    const recSeconds = document.getElementById('rec-seconds');

    function setReceptionVisibility(isRevealed) {
        if (!lockedState || !unlockedState) return;

        if (isRevealed) {
            lockedState.style.display = 'none';
            unlockedState.style.display = 'block';
        } else {
            lockedState.style.display = 'block';
            unlockedState.style.display = 'none';
        }
    }

    function updateReceptionTimer() {
        const now = new Date().getTime();
        const difference = unlockTime - now;

        if (difference <= 0) {
            setReceptionVisibility(true);
            if (recDays) recDays.textContent = '00';
            if (recHours) recHours.textContent = '00';
            if (recMinutes) recMinutes.textContent = '00';
            if (recSeconds) recSeconds.textContent = '00';
            return;
        }

        setReceptionVisibility(false);

        if (recDays && recHours && recMinutes && recSeconds) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            recDays.textContent = String(days).padStart(2, '0');
            recHours.textContent = String(hours).padStart(2, '0');
            recMinutes.textContent = String(minutes).padStart(2, '0');
            recSeconds.textContent = String(seconds).padStart(2, '0');
        }
    }

    updateReceptionTimer();
    setInterval(updateReceptionTimer, 1000);
}

/* --------------------------------------------------------------------------
   6. Gallery Lightbox Modal
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
    const modal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');
    const galleryCards = document.querySelectorAll('.gallery-card');

    if (!modal || !lightboxImage || !galleryCards.length) return;

    let currentIndex = 0;
    const images = Array.from(galleryCards).map(card => {
        return card.getAttribute('data-full') || card.querySelector('img')?.src;
    }).filter(Boolean);

    function openModal(index) {
        currentIndex = index;
        lightboxImage.src = images[currentIndex];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => openModal(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImage.src = images[currentIndex];
        }
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImage.src = images[currentIndex];
        }
    });
}

/* --------------------------------------------------------------------------
   7. One-Click Copy for Mobile Money Numbers
   -------------------------------------------------------------------------- */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-trigger');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.borderColor = '#556b2f';
                btn.style.color = '#556b2f';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2200);
            }).catch(() => {
                alert(`Please copy manually: ${textToCopy}`);
            });
        });
    });
}

