/*
Aishi Distributor Website - Main JavaScript
Handles interactive elements and functionality
*/

// Mobile Navigation Toggle
function initMobileNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const navUl = nav.querySelector('ul');
    if (!navUl) return;

    // Create hamburger menu for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    // Add click event to hamburger
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
        hamburger.classList.toggle('active');
    });

    // Insert hamburger in the right place
    nav.insertBefore(hamburger, navUl);

    // Handle mobile styles
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Initial check
    if (mediaQuery.matches) {
        navUl.classList.add('mobile-nav');
    }

    // Listen for changes
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            navUl.classList.add('mobile-nav');
        } else {
            navUl.classList.remove('mobile-nav');
            navUl.classList.remove('show'); // Close menu on desktop
            hamburger.classList.remove('active'); // Reset hamburger state
        }
    });
}

// Add CSS for hamburger menu
function addHamburgerCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            padding: 5px;
        }

        .hamburger span {
            width: 25px;
            height: 3px;
            background-color: #4a5568;
            margin: 3px 0;
            transition: 0.3s;
            border-radius: 2px;
        }

        .mobile-nav {
            display: none;
        }

        .mobile-nav.show {
            display: block;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }

        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }

            nav ul {
                display: block;
            }

            nav ul.show {
                display: block;
            }

            .mobile-nav {
                display: none;
            }

            .mobile-nav.show {
                display: block;
                padding: 10px 0;
            }

            .mobile-nav li {
                margin: 8px 0;
            }

            .mobile-nav li a {
                display: block;
                padding: 10px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize carousel for solutions section
function initSolutionsCarousel() {
    const slider = document.querySelector('.solutions-slider');
    if (!slider) return;
    
    // For mobile, allow swipe-like scrolling
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    slider.addEventListener('mouseup', (e) => {
        isDown = false;
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Initialize anchor scroll for navigation
function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize contact form if exists
function initContactForm() {
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && !validateEmail(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }
            
            if (isValid) {
                // Form submission logic would go here
                alert('Thank you for your message. We will contact you shortly.');
                contactForm.reset();
            }
        });
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize tooltips if exists
function initTooltips() {
    // Add tooltip functionality for product specifications
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = document.createElement('div');
            tooltipText.classList.add('tooltip-text');
            tooltipText.textContent = this.getAttribute('data-tooltip');
            this.appendChild(tooltipText);
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipText = this.querySelector('.tooltip-text');
            if (tooltipText) {
                this.removeChild(tooltipText);
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addHamburgerCSS(); // Add dynamic CSS for hamburger menu
    initMobileNav();
    initSolutionsCarousel();
    initAnchorScroll();
    initContactForm();
    initTooltips();

    // Additional initialization code can go here
});

// Additional utility functions

// Format currency if needed
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}