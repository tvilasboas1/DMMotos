// =============================================
// SWIPER — Carrossel de Estoque
// =============================================

const swiper = new Swiper('.meuCarrossel', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        968: { slidesPerView: 3, spaceBetween: 28 }
    }
});

// =============================================
// SCROLL SUAVE com offset do header
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 75;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// =============================================
// HEADER — destaca link ativo no scroll
// =============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.style.color = 'var(--secondary)';
                }
            });
        }
    });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));

// Nota: abrirLightbox() e fecharLightbox() estão definidos
// no <script> inline do index.html (após o carregamento do DOM)