document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollEffects();
    initResourceCardAnimations();
    initBackToTop();
    
    console.log('🚀 Subject page loaded successfully!');
});

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    
    if (!hamburger || !navLinks) return;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Animate nav links
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            if (navLinks.classList.contains('active')) {
                link.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
            } else {
                link.style.animation = '';
            }
        });
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// Resource card animations and interactions
function initResourceCardAnimations() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach((card, index) => {
        // Click handler
        card.addEventListener('click', function() {
            const resourceName = this.querySelector('.resource-name').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Create ripple effect
            createRippleEffect(this);
            
            // Log resource access (replace with actual navigation logic)
            // setTimeout(() => {
            //     console.log(`Accessing ${resourceName} resources...`);
            //     // Here you can add actual navigation logic
            //     window.location.href = `resources.html?type=${encodeURIComponent(resourceName)}`;
            // }, 300);
        });

//         function goToResource(resourceName, subject) {
//     setTimeout(() => {
//         console.log(`Accessing ${resourceName} for ${subject}...`);

//         if (resourceName === "Notes") {
//             // Go to module page of that subject
//             window.location.href = `/mp-${subject}.html`;
//         } else {
//             // For QB, Assignments, Others → send to work-in-progress
//             window.location.href = "/work-in-progress.html";
//         }
//     }, 300);
// }

        
        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                const icon = this.querySelector('.resource-icon i');
                const arrow = this.querySelector('.resource-arrow i');
                
                if (icon) {
                    icon.style.animation = 'pulse 1s ease';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 1000);
                }
                
                if (arrow) {
                    arrow.style.animation = 'bounce 0.8s ease';
                    setTimeout(() => {
                        arrow.style.animation = '';
                    }, 800);
                }
            }
        });
    });
    
    // Create ripple effect
    function createRippleEffect(element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.width / 2;
        const y = rect.height / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 193, 7, 0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 0;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        ripple.animate([
            { width: '0', height: '0', opacity: 1 },
            { width: size + 'px', height: size + 'px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }
}

// Scroll effects
function initScrollEffects() {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    function updateScrollEffects() {
        const scrollY = window.scrollY;
        
        // Navbar effects
        if (navbar) {
            if (scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(25px)';
                navbar.style.boxShadow = '0 10px 30px rgba(255, 193, 7, 0.2)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 8px 25px rgba(255, 193, 7, 0.15)';
            }
            
            // Hide/show navbar on scroll (desktop only)
            if (window.innerWidth > 768) {
                if (scrollY > lastScrollY && scrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
        }
        
        // Parallax effect for floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.02);
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05}deg)`;
        });
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Back to top functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check
    toggleBackToTop();
    
    // Listen to scroll events
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.resource-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Logo animation
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        const icon = this.querySelector('.logo-icon');
        if (icon) {
            icon.style.animation = 'none';
            icon.offsetHeight; // Trigger reflow
            icon.style.animation = 'bounce 1s ease';
        }
        
        // Navigate to home page
        window.location.href = 'index.html';
    });
}

// Performance optimizations
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

// Resize handler
window.addEventListener('resize', debounce(() => {
    // Reset mobile menu on resize
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Reset navbar transform
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.transform = 'translateY(0)';
    }
}, 250));

// Add CSS for mobile menu open state and additional animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    /* Additional pulse animation */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    /* Additional bounce animation */
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-3px); }
        50% { transform: translateY(0); }
        75% { transform: translateY(-1px); }
    }
`;
document.head.appendChild(style);

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate page elements
    const pageHeader = document.querySelector('.page-header');
    const resourceGrid = document.querySelector('.resource-grid');
    
    if (pageHeader) {
        pageHeader.style.animation = 'fadeInUp 1s ease both';
    }
    if (resourceGrid) {
        resourceGrid.style.animation = 'fadeInUp 1s ease 0.2s both';
    }
    
    // Initialize intersection observer after load
    setTimeout(initIntersectionObserver, 100);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Focus management for accessibility
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Add click handlers for resource navigation
document.addEventListener('DOMContentLoaded', function() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('click', function() {
            const resourceType = this.getAttribute('data-resource');
            const resourceName = this.querySelector('.resource-name').textContent;
            
            // You can customize these URLs based on your file structure
            let targetUrl = '';
            switch(resourceType) {
                case 'notes':
                    targetUrl = `notes.html`;
                    break;
                case 'question-bank':
                    targetUrl = `questions.html`;
                    break;
                case 'assignments':
                    targetUrl = `assignments.html`;
                    break;
                case 'miscellaneous':
                    targetUrl = `miscellaneous.html`;
                    break;
                default:
                    targetUrl = '#';
            }
            
            // Navigate to the resource page
            if (targetUrl !== '#') {
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            }
        });
    });
});