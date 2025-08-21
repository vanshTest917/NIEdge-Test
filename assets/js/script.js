document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initCounterAnimation();
    initScrollEffects();
    initProgressBars();
    initParticleEffects();
    initAdvancedAnimations();
    initIntersectionObserver();
    
    console.log('🚀 NIEdge website loaded successfully!');
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
        
        // Close any open dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a, .dropdown-item').forEach(link => {
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
    
    // Initialize dropdown functionality
    initDropdownMenu();
}

// Dropdown menu functionality
function initDropdownMenu() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (!dropdown || !dropdownToggle || !dropdownMenu) return;
    
    // Handle dropdown toggle click
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = dropdown.classList.contains('active');
        dropdown.classList.toggle('active');
        
        // Animate chevron icon
        const icon = this.querySelector('.dropdown-icon');
        if (icon) {
            icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
        }
        
        // Mobile-specific animations - Show/hide dropdown items
        if (window.innerWidth <= 768) {
            if (dropdown.classList.contains('active')) {
                // Show dropdown menu
                dropdownMenu.style.maxHeight = '300px';
                dropdownMenu.style.padding = '10px 0';
                
                // Animate items
                const items = dropdownMenu.querySelectorAll('.dropdown-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            } else {
                // Hide dropdown menu
                dropdownMenu.style.maxHeight = '0';
                dropdownMenu.style.padding = '0';
                
                // Reset item styles
                const items = dropdownMenu.querySelectorAll('.dropdown-item');
                items.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                });
            }
        }
    });
    
    // Handle dropdown item clicks
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            this.style.background = 'var(--primary-color)';
            this.style.color = 'var(--white)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
                this.style.color = '';
            }, 200);
            
            // Close dropdown
            dropdown.classList.remove('active');
            const icon = dropdownToggle.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
            
            // For mobile, hide the dropdown menu
            if (window.innerWidth <= 768) {
                dropdownMenu.style.maxHeight = '0';
                dropdownMenu.style.padding = '0';
            }
            
            // Close mobile menu
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const body = document.body;
            
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateX(5px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateX(0) scale(1)';
            }
        });
    });
    
    // Desktop hover effects
    if (window.innerWidth > 768) {
        dropdown.addEventListener('mouseenter', function() {
            this.classList.add('active');
            const icon = dropdownToggle.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            const icon = dropdownToggle.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            const icon = dropdownToggle.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
            
            // For mobile, hide the dropdown menu
            if (window.innerWidth <= 768) {
                dropdownMenu.style.maxHeight = '0';
                dropdownMenu.style.padding = '0';
            }
        }
    });
    
    // Initialize dropdown item styles for mobile
    if (window.innerWidth <= 768) {
        const items = dropdownMenu.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            item.style.transition = 'all 0.3s ease';
        });
    }
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
                const offsetTop = targetElement.offsetTop - 90; // Increased offset for larger navbar
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

// Counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        hasAnimated = true;
        
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000 + (index * 300);
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOutCubic);
                
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                    // Add completion effect
                    counter.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        counter.style.transform = 'scale(1)';
                    }, 300);
                }
            }
            
            setTimeout(() => {
                requestAnimationFrame(updateCounter);
            }, index * 100);
        });
    }
    
    // Trigger animation when skills section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(skillsSection);
            }
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
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

// Progress bars animation
function initProgressBars() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = 70 + Math.random() * 30;
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 500);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statItems.forEach(item => observer.observe(item));
}

// Particle effects for buttons
function initParticleEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', createParticleEffect);
        button.addEventListener('click', createClickEffect);
    });
    
    function createParticleEffect(e) {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #FFC107;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const duration = 800 + Math.random() * 400;
            
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
    
    function createClickEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
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
            background: rgba(255, 255, 255, 0.6);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        ripple.animate([
            { width: '0', height: '0', opacity: 1 },
            { width: '300px', height: '300px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }
}

// Advanced animations and intersection observer
function initAdvancedAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.feature, .member, .stat-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                    element.classList.add('animated');
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.9)';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(element);
    });
    
    // Initialize floating animations
    initFloatingAnimation();
    
    // Initialize hover effects
    initHoverEffects();
}

// Floating elements animation
function initFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.float-item');
    
    floatingElements.forEach((element, index) => {
        const duration = 3000 + (index * 500);
        const delay = index * 200;
        
        function animate() {
            element.animate([
                { transform: 'translateY(0px) rotate(0deg)' },
                { transform: 'translateY(-15px) rotate(2deg)' },
                { transform: 'translateY(0px) rotate(0deg)' }
            ], {
                duration: duration,
                easing: 'ease-in-out',
                delay: delay
            }).onfinish = animate;
        }
        
        animate();
        // Skills animation
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach((icon, index) => {
        const duration = 2500 + (index * 300);
        
        function animateSkill() {
            icon.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 0.8 },
                { transform: 'translateY(-20px) rotate(3deg)', opacity: 1 },
                { transform: 'translateY(0px) rotate(0deg)', opacity: 0.8 }
            ], {
                duration: duration,
                easing: 'ease-in-out'
            }).onfinish = animateSkill;
        }
        
        setTimeout(animateSkill, index * 500);
        
        // Click effect for skill icons
        icon.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                this.style.transform = '';
                animateSkill();
            }, 300);
        });
    });
    });
    
    // Documents animation
    const docs = document.querySelectorAll('.doc');
    docs.forEach((doc, index) => {
        const duration = 2500 + (index * 300);
        
        function animateDoc() {
            doc.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 0.8 },
                { transform: 'translateY(-20px) rotate(5deg)', opacity: 1 },
                { transform: 'translateY(0px) rotate(0deg)', opacity: 0.8 }
            ], {
                duration: duration,
                easing: 'ease-in-out'
            }).onfinish = animateDoc;
        }
        
        setTimeout(animateDoc, index * 500);
        
        // Click effect for documents
        doc.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                this.style.transform = '';
                animateDoc();
            }, 300);
        });
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                
                const icon = this.querySelector('.feature-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                }
                
                this.style.boxShadow = '0 25px 50px rgba(255, 193, 7, 0.3)';
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
                
                const icon = this.querySelector('.feature-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            }
        });
        
        feature.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Member cards - Updated hover effects
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px)';
                this.style.border = '2px solid var(--primary-color)';
                this.style.boxShadow = '0 0 20px rgba(255, 193, 7, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
                this.style.border = '2px solid transparent';
                this.style.boxShadow = 'var(--shadow-light)';
            }
        });
        
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                const counter = this.querySelector('.counter');
                const icon = this.querySelector('.stat-icon i');
                
                if (counter) {
                    counter.style.animation = 'pulse 1s ease-in-out';
                    setTimeout(() => {
                        counter.style.animation = '';
                    }, 1000);
                }
                
                if (icon) {
                    icon.style.animation = 'bounce 0.8s ease';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 800);
                }
            }
        });
        
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
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
            
            // Smooth scroll to top
            smoothScrollTo(0, 800);
        });
    }
}

// General intersection observer for fade-in animations
function initIntersectionObserver() {
    const fadeElements = document.querySelectorAll('.section-title, .section-subtitle, .feedback-card, .connect');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        fadeObserver.observe(element);
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
        
        // Reset dropdown functionality
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.style.maxHeight = '';
            dropdownMenu.style.padding = '';
        }
    } else {
        // Reinitialize dropdown for mobile
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            const items = dropdownMenu.querySelectorAll('.dropdown-item');
            items.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                item.style.transition = 'all 0.3s ease';
            });
        }
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
    
    .animated {
        animation-fill-mode: forwards;
    }
    
    /* Loading animation */
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

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtn = document.querySelector('.explore-btn');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease both';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 1s ease 0.2s both';
    }
    if (heroBtn) {
        heroBtn.style.animation = 'fadeInUp 1s ease 0.4s both';
    }
});