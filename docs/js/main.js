// ── Navbar scroll effect ───────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ── Intersection Observer for animate-in elements ─────
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity  = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to all cards and sections
document.querySelectorAll(
    '.feature-card, .stat-item, .screenshot-item'
).forEach((el, index) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition =
        `opacity 0.6s ease ${index * 0.1}s,
         transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ── Smooth scroll for anchor links ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(
            anchor.getAttribute('href')
        );
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Counter animation for stats ───────────────────────
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target  = parseInt(el.dataset.target);
            const suffix  = el.dataset.suffix || '';
            animateCounter(el, target, suffix);
            statsObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
    statsObserver.observe(el);
});

// ── Current year in footer ─────────────────────────────
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();