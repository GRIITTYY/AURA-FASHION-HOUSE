// Common JavaScript functionality for all pages

// --- Marquee Effect ---
function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        marqueeContent.innerHTML += marqueeContent.innerHTML;
        let scrollAmount = 0;
        
        function marqueeScroll() {
            scrollAmount -= 0.5;
            if (Math.abs(scrollAmount) >= marqueeContent.scrollWidth / 2) {
                scrollAmount = 0;
            }
            marqueeContent.style.transform = `translateX(${scrollAmount}px)`;
            requestAnimationFrame(marqueeScroll);
        }
        requestAnimationFrame(marqueeScroll);
    }
}

// --- Footer Current Year ---
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// --- Back to Top Button ---
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.onscroll = () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        };
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Mobile Navigation Menu ---
function initMobileNav() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!hamburgerMenu || !mobileNav) return;

  // Set initial ARIA state
  hamburgerMenu.setAttribute('aria-expanded', 'false');

  const openMenu = () => {
    hamburgerMenu.classList.add('active');
    mobileNav.classList.add('active');
    hamburgerMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburgerMenu.classList.remove('active');
    mobileNav.classList.remove('active');
    hamburgerMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    if (mobileNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Toggle on hamburger click
  hamburgerMenu.addEventListener('click', toggleMenu);

  // Close when clicking a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking the overlay background
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}


function updateMobileNavOffset() {
  const header = document.querySelector('header');
  if (header) {
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--header-h', `${h}px`);
  }
}


// --- Initialize common functionality ---
document.addEventListener('DOMContentLoaded', function() {
  initMarquee();
  setCurrentYear();
  initBackToTop();
  initMobileNav();
  updateMobileNavOffset();
});


window.addEventListener('load', updateMobileNavOffset);
window.addEventListener('resize', updateMobileNavOffset);
window.addEventListener('orientationchange', updateMobileNavOffset);