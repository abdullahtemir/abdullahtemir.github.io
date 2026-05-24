/* =============================================
   ÉCRAN DE CHARGEMENT
   ============================================= */
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 2000);
});

/* =============================================
   EFFET DE FRAPPE — phrase d'accroche
   ============================================= */
const catchphraseEl = document.querySelector('.hero-catchphrase');
if (catchphraseEl) {
    const originalText = catchphraseEl.textContent.trim();
    catchphraseEl.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    catchphraseEl.appendChild(cursor);

    let idx = 0;
    function typeChar() {
        if (idx < originalText.length) {
            catchphraseEl.insertBefore(document.createTextNode(originalText[idx]), cursor);
            idx++;
            setTimeout(typeChar, 55);
        } else {
            setTimeout(() => {
                cursor.style.animation = 'none';
                cursor.style.opacity   = '0';
            }, 2500);
        }
    }
    setTimeout(typeChar, 3300);
}



/* =============================================
   BARRE DE PROGRESSION
   ============================================= */
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        progressBar.style.width = pct + '%';
    }, { passive: true });
}

/* =============================================
   NAVIGATION ACTIVE
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

if (sections.length && navLinks.length) {
    const navObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (link) link.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(s => navObs.observe(s));
}

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObs.observe(el));
}

/* =============================================
   TILT 3D SUR LES PROJETS
   ============================================= */
document.querySelectorAll('.project-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'box-shadow 0.2s ease';
    });
    card.addEventListener('mousemove', e => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const rx =  ((e.clientY - top  - height / 2) / (height / 2)) * 7;
        const ry = -((e.clientX - left - width  / 2) / (width  / 2)) * 7;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.14)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';
        card.style.transform = '';
        card.style.boxShadow = '';
        setTimeout(() => { card.style.transition = ''; }, 350);
    });
});

/* =============================================
   BOUTON RETOUR EN HAUT
   ============================================= */
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =============================================
   COPIE EMAIL (footer)
   ============================================= */
function copyEmail(btn) {
    const email = 'temirabdullah04@gmail.com';
    navigator.clipboard.writeText(email)
        .then(() => showCopied(btn))
        .catch(() => {
            const tmp = document.createElement('textarea');
            tmp.value = email;
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            showCopied(btn);
        });
}
function showCopied(btn) {
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 2000);
}

/* =============================================
   FORMULAIRE DE CONTACT (Formspree)
   ============================================= */
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');
const formError    = document.getElementById('form-error');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        btn.textContent = 'Envoi...';
        btn.disabled = true;
        formError.classList.add('hidden');

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                contactForm.style.display = 'none';
                formSuccess.classList.remove('hidden');
            } else {
                btn.textContent = 'Envoyer';
                btn.disabled = false;
                formError.classList.remove('hidden');
            }
        } catch {
            btn.textContent = 'Envoyer';
            btn.disabled = false;
            formError.classList.remove('hidden');
        }
    });
}

/* =============================================
   DARK MODE
   ============================================= */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

/* =============================================
   LIGHTBOX PLEIN ÉCRAN
   ============================================= */
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.getElementById('lightbox-img').src = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

/* =============================================
   FENÊTRES MODALES
   ============================================= */
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
