// ===== Initialize AOS (Animate On Scroll) =====
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// ===== Particles.js Configuration =====
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#6366f1', '#06b6d4', '#8b5cf6']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6366f1',
            opacity: 0.15,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.4
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Smooth Scrolling =====
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

// ===== Scroll to Top (Logo Click) =====
function scrollToTop(event) {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
window.scrollToTop = scrollToTop;

// ===== Animated Counter =====
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== Email Validation =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    clearError(input);
    input.classList.add('input-error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearError(input) {
    input.classList.remove('input-error');
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
}

function showRecaptchaError(container, message) {
    if (!container) return;
    const existingError = container.querySelector('.error-message');
    if (existingError) existingError.remove();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    container.appendChild(errorDiv);
}

function clearRecaptchaError(container) {
    if (!container) return;
    const existingError = container.querySelector('.error-message');
    if (existingError) existingError.remove();
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    const recaptchaGroup = contactForm.querySelector('.recaptcha-group');

    window.onRecaptchaSuccess = () => {
        clearRecaptchaError(recaptchaGroup);
    };

    window.onRecaptchaExpired = () => {
        showRecaptchaError(recaptchaGroup, 'Please complete the reCAPTCHA again.');
    };

    // Email validation on blur
    const emailInput = contactForm.querySelector('[name="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
            } else {
                clearError(emailInput);
            }
        });
        
        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('input-error') && isValidEmail(emailInput.value)) {
                clearError(emailInput);
            }
        });
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = contactForm.querySelector('[name="email"]').value;
        const recaptchaResponse = window.grecaptcha ? window.grecaptcha.getResponse() : '';
        
        if (!isValidEmail(email)) {
            showError(contactForm.querySelector('[name="email"]'), 'Please enter a valid email address');
            return;
        }

        if (window.grecaptcha && !recaptchaResponse) {
            showRecaptchaError(recaptchaGroup, 'Please verify that you are not a robot.');
            return;
        }
        
        const formData = {
            name: contactForm.querySelector('[name="name"]').value,
            email: email,
            company: contactForm.querySelector('[name="company"]').value,
            service: contactForm.querySelector('[name="service"]').value,
            message: contactForm.querySelector('[name="message"]').value,
            recaptchaToken: recaptchaResponse || null,
            timestamp: new Date().toISOString()
        };
        
        // Google Sheets Web App URL
        const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxn3x_ZbT0QGanyvqnq5btZlFx-WnsisD-HW1UKHkKBnqvBw52QNDQy2DDWwQIGRfrC/exec';
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        try {
            if (GOOGLE_SHEETS_URL) {
                await fetch(GOOGLE_SHEETS_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            
            // Backup to localStorage
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Show success
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
        } catch (error) {
            console.error('Error:', error);
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

function resetForm() {
    if (contactForm && formSuccess) {
        contactForm.reset();
        if (window.grecaptcha) {
            window.grecaptcha.reset();
        }
        contactForm.style.display = 'flex';
        formSuccess.style.display = 'none';
    }
}
window.resetForm = resetForm;

// ===== Parallax Effect for Gradient Orbs =====
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Service Cards Tilt Effect =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Cursor Glow Effect =====
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Hide cursor glow on touch devices
if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
}

console.log('✨ ixpTechnology Modern UI loaded successfully');
