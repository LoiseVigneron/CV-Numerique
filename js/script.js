document.addEventListener('DOMContentLoaded', () => {

    // --- EFFET D'APPARITION (Reveal) ---
    const elementsToReveal = document.querySelectorAll('.effets');
    if (elementsToReveal.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        elementsToReveal.forEach(el => observer.observe(el));
    }

    // --- CARROUSEL ---
    const track = document.getElementById('track');
    const cards = document.querySelectorAll('.project-card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // On n'exécute le code du carrousel QUE s'il existe sur la page
    if (track && cards.length > 0 && nextBtn && prevBtn) {
        let index = 0;

        function updateCarousel() {
            const cardWidth = cards[0].offsetWidth + 24; // Largeur + gap
            const containerWidth = track.parentElement.offsetWidth;
            const visibleCards = Math.floor(containerWidth / cardWidth);
            const maxIndex = cards.length - visibleCards;

            // Sécurité pour ne pas scroller dans le vide si peu de cartes
            const safeMaxIndex = maxIndex > 0 ? maxIndex : 0;

            if (index > safeMaxIndex) index = 0;
            if (index < 0) index = safeMaxIndex;

            track.style.transform = `translateX(${-index * cardWidth}px)`;
        }

        nextBtn.addEventListener('click', () => { index++; updateCarousel(); });
        prevBtn.addEventListener('click', () => { index--; updateCarousel(); });

        // Gérer le redimensionnement de la fenêtre pour recalculer les largeurs
        window.addEventListener('resize', updateCarousel);
        
        // Initialisation au chargement
        updateCarousel();
    }

    // --- MENU BURGER (Fonctionne sur toutes les pages) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche la fermeture immédiate
            navLinks.classList.toggle('active');
        });

        // Ferme le menu quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Ferme le menu si on clique n'importe où ailleurs sur l'écran
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
});