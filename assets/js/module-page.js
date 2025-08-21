document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initModuleCardEffects();
    initPageAnimations();
    
    console.log('🚀 NIEdge Modules page loaded successfully!');
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

// Smooth scrolling functionality
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 90;
                smoothScrollTo(offsetTop, 800);
            }
        });
    });
}

// Custom smooth scroll function
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
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

// Module card effects
function initModuleCardEffects() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach((card, index) => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                createCardParticles(this);
            }
        });
        
        // Click effect
        card.addEventListener('click', function(e) {
            createClickEffect(e, this);
        });
        
        // Add loading animation
        setTimeout(() => {
            card.classList.add('loaded');
        }, 100 * index);
    });
}

// Create particle effects for module cards
function createCardParticles(card) {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: #FFC107;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 30;
        const duration = 600 + Math.random() * 200;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Create click ripple effect
function createClickEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
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
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    ripple.animate([
        { width: '0', height: '0', opacity: 1 },
        { width: '200px', height: '200px', opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();
}

// Page animations
function initPageAnimations() {
    // Animate module cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all module cards for scroll animation
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        observer.observe(card);
    });
    
    // Logo click animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            const icon = this.querySelector('.logo-icon');
            if (icon) {
                icon.style.animation = 'none';
                icon.offsetHeight; // Trigger reflow
                icon.style.animation = 'bounce 1s ease';
            }
        });
    }
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                createButtonParticles(this);
            }
        });
    });
}

// Create particle effects for buttons
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: #FFC107;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 20;
        const duration = 400 + Math.random() * 200;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
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

// Add CSS for mobile menu open state
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
    
    .loaded {
        animation-fill-mode: forwards;
    }
`;
document.head.appendChild(style);

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.style.opacity = '1';
        pageHeader.style.transform = 'translateY(0)';
    }
});