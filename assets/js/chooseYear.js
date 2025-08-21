document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initCardAnimations();
    initScrollEffects();
    initProgressAnimations();
    initInteractionEffects();
    
    console.log('🎓 NIEdge Academics page loaded successfully!');
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
        const links = navLinks.querySelectorAll('a, .dropdown');
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

// Card animations on scroll
function initCardAnimations() {
    const cards = document.querySelectorAll('.year-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Animate progress bar
                    const progressBar = entry.target.querySelector('.loading-progress');
                    if (progressBar) {
                        const targetWidth = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = targetWidth;
                        }, 300);
                    }
                }, index * 150);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(card);
    });
}

// Enhanced scroll effects
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

// Progress bar animations
function initProgressAnimations() {
    const cards = document.querySelectorAll('.year-card');
    
    cards.forEach(card => {
        const progressBar = card.querySelector('.loading-progress');
        if (!progressBar) return;
        
        // Store original width
        const originalWidth = progressBar.style.width;
        progressBar.dataset.targetWidth = originalWidth;
        
        // Reset width initially
        progressBar.style.width = '0%';
        
        // Animate on card hover
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                progressBar.style.transition = 'width 0.8s ease';
                setTimeout(() => {
                    progressBar.style.width = progressBar.dataset.targetWidth;
                }, 100);
            }
        });
    });
}

// Enhanced interaction effects
function initInteractionEffects() {
    const cards = document.querySelectorAll('.year-card');
    
    cards.forEach((card, index) => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                createHoverParticles(this);
                
                const icon = this.querySelector('.card-icon i');
                if (icon) {
                    // Different rotation for each card
                    const rotations = ['rotate(360deg)', 'rotate(-360deg)', 'rotateY(180deg)', 'rotateX(180deg)'];
                    icon.style.transform = `scale(1.1) ${rotations[index]}`;
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                const icon = this.querySelector('.card-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        });
        
        // Click effects with different animations per card
        card.addEventListener('click', function() {
            createClickRipple(this);
            
            // Different click animations for each year
            const animations = [
                'pulse 0.6s ease',
                'bounce 0.8s ease',
                'shake 0.6s ease',
                'flash 0.5s ease'
            ];
            
            this.style.animation = animations[index];
            setTimeout(() => {
                this.style.animation = '';
            }, 800);
        });
    });
    
    // Logo click animation
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
        });
    }
    
    // Info card interaction
    const infoCard = document.querySelector('.info-card');
    if (infoCard) {
        infoCard.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                const icon = this.querySelector('.info-icon i');
                if (icon) {
                    icon.style.animation = 'bounce 1s ease';
                }
            }
        });
        
        infoCard.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

// Create hover particle effects
function createHoverParticles(element) {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const rect = element.getBoundingClientRect();
    const colors = ['#FFC107', '#FF8F00', '#FFF9C4'];
    
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 30;
        const duration = 600 + Math.random() * 400;
        
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
function createClickRipple(element) {
    const existingRipple = element.querySelector('.ripple-effect');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
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
        { width: '300px', height: '300px', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();
}

// Page load animations
window.addEventListener('load', () => {
    // Animate page title and underline
    const pageTitle = document.querySelector('.page-title');
    const titleUnderline = document.querySelector('.title-underline');
    
    if (pageTitle) {
        pageTitle.style.animation = 'fadeInUp 1s ease both';
    }
    if (titleUnderline) {
        titleUnderline.style.animation = 'expandWidth 1.5s ease 0.5s both';
    }
    
    // Animate info section
    const infoCard = document.querySelector('.info-card');
    if (infoCard) {
        setTimeout(() => {
            infoCard.style.opacity = '1';
            infoCard.style.transform = 'translateY(0)';
        }, 1000);
    }
});

// Add CSS for mobile menu styles and additional animations
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
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    .info-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        -webkit-tap-highlight-color: transparent;
    }
    
    /* Loading animation for page */
    .loading {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .loading.loaded {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce function
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

// Optimized resize handler
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

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        
        if (navLinks && navLinks.classList.contains('active')) {
            if (hamburger) hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('.year-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${card.querySelector('.year-title').textContent} academic year information`);
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});