// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Animated Counters =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                el.textContent = current + (el.closest('.counter-item').querySelector('.counter-label').textContent === 'Dedication' ? '%' : '');
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target + '%';
                }
            }

            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-number').forEach(el => counterObserver.observe(el));

// ===== Magic Button =====
const magicBtn = document.getElementById('magicBtn');
let magicCount = 0;

magicBtn.addEventListener('click', () => {
    magicCount++;
    const colors = ['#6C5CE7', '#FD79A8', '#00CEC9', '#FDCB6E', '#E17055', '#00B894'];
    const color = colors[magicCount % colors.length];

    // Create confetti-like particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 1000;
            top: ${magicBtn.getBoundingClientRect().top + 20}px;
            left: ${magicBtn.getBoundingClientRect().left + magicBtn.offsetWidth / 2}px;
            transition: all ${Math.random() * 1.5 + 0.5}s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 1;
        `;
        document.body.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.transform = `translate(${Math.random() * 400 - 200}px, ${Math.random() * -400 - 100}px) rotate(${Math.random() * 720}deg)`;
            particle.style.opacity = '0';
        });

        setTimeout(() => particle.remove(), 2000);
    }

    // Flash the button
    magicBtn.style.transform = 'scale(0.95)';
    setTimeout(() => magicBtn.style.transform = '', 200);

    // Change hero text color
    const gradientText = document.querySelector('.gradient-text');
    if (magicCount % 3 === 0) {
        magicBtn.textContent = '🎉 More Magic!';
    } else if (magicCount % 3 === 1) {
        magicBtn.textContent = '✨ Keep Going!';
    } else {
        magicBtn.textContent = '🌟 Amazing!';
    }
});

// ===== Mouse Glow =====
const glow = document.getElementById('mouseGlow');
let glowX = 0, glowY = 0;
let currentGlowX = 0, currentGlowY = 0;

document.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
});

function animateGlow() {
    currentGlowX += (glowX - currentGlowX) * 0.1;
    currentGlowY += (glowY - currentGlowY) * 0.1;
    glow.style.left = currentGlowX + 'px';
    glow.style.top = currentGlowY + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();

// ===== CTA Button click =====
document.getElementById('ctaBtn').addEventListener('click', () => {
    const messages = ['🚀 Let\'s build!', '✨ You\'re awesome!', '💫 Great choice!', '🌟 Onward!'];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const original = document.getElementById('ctaBtn').innerHTML;
    document.getElementById('ctaBtn').innerHTML = msg;
    setTimeout(() => document.getElementById('ctaBtn').innerHTML = original, 1500);
});

// ===== Console Easter Egg =====
console.log('%c✦ Welcome! ✦', 'font-size: 24px; font-weight: bold; color: #6C5CE7;');
console.log('%cMade with ❤️ and attention to detail.', 'font-size: 14px; color: #a29bfe;');
