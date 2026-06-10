// ============================================================
//  DISCOVER EUROPE — Interactive Experience
// ============================================================

// ===== Loading Screen =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Particle System =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = Math.random() * 60 + 30; // Gold-ish range
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x -= dx * force * 0.01;
            this.y -= dy * force * 0.01;
        }

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                const opacity = (1 - dist / 120) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `hsla(45, 80%, 70%, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Track mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // If it's a stat number, start counting
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.counted) {
                animateCounter(statNumber);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Counter Animation =====
function animateCounter(element, target, suffix = '') {
    if (target === undefined) {
        target = parseInt(element.dataset.target);
        if (isNaN(target)) return;
        suffix = element.dataset.target.endsWith('+') ? '+' : '';
    }

    element.dataset.counted = 'true';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        element.textContent = (current === target ? target : current) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(update);
}

// ===== Navbar =====
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');
const hero = document.getElementById('hero');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < bottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// Mobile nav toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== Back to Top =====
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Parallax Hero Elements =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg-scene');

    if (heroContent && scrollY < window.innerHeight) {
        const progress = scrollY / window.innerHeight;
        heroContent.style.transform = `translateY(${progress * 60}px)`;
        heroContent.style.opacity = 1 - progress;

        if (heroBg) {
            heroBg.style.transform = `translateY(${progress * 30}px)`;
        }
    }
});

// ===== Gallery Hover Focus Effect =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const siblings = item.closest('.gallery-masonry').querySelectorAll('.gallery-item');
        siblings.forEach(s => {
            if (s !== item) {
                s.style.opacity = '0.6';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        const siblings = item.closest('.gallery-masonry').querySelectorAll('.gallery-item');
        siblings.forEach(s => {
            s.style.opacity = '1';
        });
    });
});

// ===== Intersection Observer for Intro Stats =====
const introStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.intro-stat-num');
            nums.forEach(num => {
                if (!num.dataset.counted) {
                    const text = num.textContent;
                    // Detect suffix before resetting text
                    const suffixMatch = text.match(/[^\d]+$/);
                    const suffix = suffixMatch ? suffixMatch[0] : '';
                    const targetNum = parseInt(text);
                    if (!isNaN(targetNum)) {
                        num.textContent = '0';
                        animateCounter(num, targetNum, suffix);
                    }
                }
            });
        }
    });
}, { threshold: 0.5 });

const introStats = document.querySelector('.intro-stats');
if (introStats) introStatsObserver.observe(introStats);

// ===== Parallax Floating Elements in Intro =====
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.intro-floating-card');
    if (cards.length === 0) return;

    const rect = document.querySelector('.intro-image-frame');
    if (!rect) return;

    const bounds = rect.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const moveX = (e.clientX - centerX) / 30;
    const moveY = (e.clientY - centerY) / 30;

    cards.forEach((card, i) => {
        const factor = (i + 1) * 0.3;
        card.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
});

// ===== Landmark Cards Random Rotation on Hover =====
document.querySelectorAll('.landmark-card').forEach(card => {
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
        card.style.transform = '';
    });
});

// ===== Console Greeting =====
console.log('%c✦ Discover Europe', 'font-size: 24px; font-weight: bold; color: #fbbf24; font-family: Georgia, serif;');
console.log('%cA beautiful journey through the heart of Europe.', 'font-size: 14px; color: #6b7280;');
console.log('%c🏛️  Explore · 🎨  Discover · 🍝  Savor', 'font-size: 12px; color: #1e3a5f;');

// ===== Service Worker Registration (if needed) =====
// Placeholder for future PWA support

console.log('✨ Discover Europe loaded successfully!');
