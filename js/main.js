// main.js

// ===============================
// Microsoft Clarity Custom Tracking
// ===============================

function initializeClarityTracking() {
    if (typeof clarity === 'undefined') return;

    // Set custom page tags based on URL
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '') || 'index';
    
    // Tag page type for filtering in Clarity dashboard
    if (pageName === 'index' || pageName === '') {
        clarity('set', 'page_type', 'homepage');
    } else if (pageName.includes('-mi')) {
        clarity('set', 'page_type', 'location_page');
        clarity('set', 'location', pageName.replace('-mi', '').replace(/-/g, ' '));
    } else if (pageName.includes('caro-mi')) {
        clarity('set', 'page_type', 'service_page');
        const serviceName = pageName.replace('-caro-mi', '').replace(/-/g, ' ');
        clarity('set', 'service', serviceName);
    }

    // Track booking intent - key conversion actions
    trackBookingClicks();
    trackPhoneClicks();
    trackScrollDepth();
    trackServiceInterest();
}

function trackBookingClicks() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (!target) return;

        const href = target.getAttribute('href') || '';
        const text = target.textContent.toLowerCase();

        // Track clicks to booking section or external booking
        if (href.includes('#book') || href.includes('square.site') || 
            text.includes('book') || text.includes('schedule') || text.includes('appointment')) {
            if (typeof clarity !== 'undefined') {
                clarity('set', 'booking_click', 'true');
                clarity('set', 'booking_source', getPageSection(target));
            }
        }
    });
}

function trackPhoneClicks() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (!target) return;

        const href = target.getAttribute('href') || '';
        if (href.startsWith('tel:')) {
            if (typeof clarity !== 'undefined') {
                clarity('set', 'phone_click', 'true');
                clarity('set', 'call_source', getPageSection(target));
            }
        }
    });
}

function trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const reached = new Set();

    window.addEventListener('scroll', function() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !reached.has(milestone)) {
                    reached.add(milestone);
                    if (typeof clarity !== 'undefined') {
                        clarity('set', 'scroll_depth', milestone + '%');
                    }
                }
            });
        }
    });
}

function trackServiceInterest() {
    // Track which services users hover/engage with
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        let hoverTimer;
        
        card.addEventListener('mouseenter', function() {
            hoverTimer = setTimeout(() => {
                const serviceTitle = card.querySelector('.service-title');
                if (serviceTitle && typeof clarity !== 'undefined') {
                    clarity('set', 'service_interest', serviceTitle.textContent.trim());
                }
            }, 2000); // 2 seconds = genuine interest
        });
        
        card.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimer);
        });
    });
}

function getPageSection(element) {
    const section = element.closest('section');
    if (section) {
        return section.id || section.className.split(' ')[0] || 'unknown';
    }
    if (element.closest('.hero')) return 'hero';
    if (element.closest('.navbar')) return 'navigation';
    if (element.closest('.footer')) return 'footer';
    return 'unknown';
}

// Initialize Clarity tracking when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure Clarity is loaded
    setTimeout(initializeClarityTracking, 500);
});

const reviews = [
  {
      text: "Placeholder review 1...",
      link: "http://google.com/review1"
  },
  {
      text: "Placeholder review 2...",
      link: "http://google.com/review2"
  },
  {
      text: "Placeholder review 3...",
      link: "http://google.com/review3"
  }
];

const carousel = document.querySelector('.carousel');
let currentSlide = 0;

// Modern Luxury Salon JavaScript
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all carousels when page loads
    initializeCarousels();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mobile navigation
    initializeMobileNav();
    
    // Initialize navbar scroll effect
    initializeNavbarScroll();
});

// Initialize Swiper Carousels
function initializeCarousels() {
    
    // Services Carousel
    const servicesCarousel = new Swiper('.services-carousel', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.services-carousel .swiper-pagination',
            clickable: true,
            dynamicBullets: false,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        navigation: {
            nextEl: '.services-carousel .swiper-button-next',
            prevEl: '.services-carousel .swiper-button-prev',
        },
        on: {
            reachEnd: function () {
                setTimeout(() => {
                    this.slideTo(0);
                }, 1000);
            }
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
    
    // Gallery Carousel
    const galleryCarousel = new Swiper('.gallery-carousel', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.gallery-carousel .swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        navigation: {
            nextEl: '.gallery-carousel .swiper-button-next',
            prevEl: '.gallery-carousel .swiper-button-prev',
        },
        on: {
            reachEnd: function () {
                setTimeout(() => {
                    this.slideTo(0);
                }, 1000);
            }
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
    
    // Reviews Carousel
    const reviewsCarousel = new Swiper('.reviews-carousel', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.reviews-carousel .swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        navigation: {
            nextEl: '.reviews-carousel .swiper-button-next',
            prevEl: '.reviews-carousel .swiper-button-prev',
        },
        on: {
            reachEnd: function () {
                setTimeout(() => {
                    this.slideTo(0);
                }, 1000);
            }
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for elements
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .section-title, .section-subtitle, .service-card, .about-content, .gallery-item, .review-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        observer.observe(element);
    });
}

// Mobile navigation toggle
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background on scroll
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Parallax effect for hero section
function initializeParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
}

// Form validation (if needed for contact forms)
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Submit form or show success message
                console.log('Form submitted successfully');
                showNotification('Thank you! Your message has been sent.', 'success');
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Optimize performance
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(originalScrollHandler, 16); // ~60fps
    };
    
    // Preload critical images
    const criticalImages = [
        '/images/hero.png',
        '/images/logo.svg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Analytics tracking (placeholder)
function trackAnalytics(event, data = {}) {
    // Track user interactions for analytics
    console.log(`Analytics: ${event}`, data);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', event, data);
    }
}

// Track important user interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track CTA button clicks
    if (target.classList.contains('btn-primary')) {
        trackAnalytics('cta_click', {
            button_text: target.textContent.trim(),
            location: target.closest('section')?.id || 'unknown'
        });
    }
    
    // Track service clicks
    if (target.classList.contains('service-btn')) {
        trackAnalytics('service_click', {
            service: target.closest('.service-card')?.querySelector('.service-title')?.textContent || 'unknown'
        });
    }
});

// Initialize all optimizations
optimizePerformance();

