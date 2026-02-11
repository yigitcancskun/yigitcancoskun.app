/**
 * ŞikayetLab - Interactive JavaScript
 * Scroll animations, phase timeline interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScrolling();
    initPhaseInteractivity();
});

/**
 * Intersection Observer for scroll-triggered fade-in animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Phase card interactivity
 */
function initPhaseInteractivity() {
    const phaseCards = document.querySelectorAll('.phase-card');
    
    phaseCards.forEach(card => {
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        
        // Hover effect enhancement
        card.addEventListener('mouseenter', () => {
            // Dim other cards slightly
            phaseCards.forEach(otherCard => {
                if (otherCard !== card && !otherCard.classList.contains('active')) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Restore opacity
            phaseCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
}

/**
 * Utility: Add class when element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Navigation scroll effect
 */
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const currentScrollY = window.scrollY;
    
    // Add shadow on scroll
    if (currentScrollY > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
}, { passive: true });
