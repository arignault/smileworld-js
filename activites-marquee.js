// activites-marquee.js
// Gère l'animation de défilement infini pour le slider des activités.

const SELECTORS = {
    SECTION: '#Activites_section',
    LIST: '.cms_slider_list',
    ITEM: '.activite-item'
};

function setupMarqueeAnimation() {
    const list = document.querySelector(SELECTORS.LIST);
    if (!list) {
        console.warn('[Marquee] La liste des activités (.cms_slider_list) est introuvable.');
        return;
    }

    const items = Array.from(list.querySelectorAll(SELECTORS.ITEM));
    if (items.length <= 1) {
        // Pas besoin d'animer s'il y a 0 ou 1 item.
        return;
    }

    // Réinitialiser les modifications précédentes pour être propre
    const wrapper = list.parentElement;
    if (wrapper) {
        wrapper.style.overflow = ''; // Laisse Webflow gérer
        const grandParent = wrapper.parentElement;
        if (grandParent) {
            grandParent.style.overflow = '';
             const greatGrandParent = grandParent.parentElement;
             if (greatGrandParent) {
                 greatGrandParent.style.overflow = '';
             }
        }
    }

    // Assurer un layout flex pour l'alignement horizontal
    list.style.display = 'flex';
    list.style.willChange = 'transform'; // Optimisation pour le navigateur

    // Calculer la largeur totale des items originaux
    const itemWidth = items[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(list).gap) || 0; // Récupère le gap
    const totalWidth = items.length * (itemWidth + gap);

    // Définir la largeur de la liste pour qu'elle puisse contenir les clones
    list.style.width = `${totalWidth * 2}px`;

    // Dupliquer les items pour la boucle infinie
    items.forEach(item => {
        const clone = item.cloneNode(true);
        list.appendChild(clone);
    });

    // Animation avec GSAP
    // xPercent: -50 déplace le conteneur de la moitié de sa largeur (la largeur de la liste originale)
    const marqueeAnimation = window.gsap.to(list, {
        xPercent: -50,
        ease: 'none',
        duration: 30, // Durée pour un défilement complet. Plus le chiffre est élevé, plus c'est lent.
        repeat: -1,
    });

    // Bonus : Mettre en pause au survol de la souris
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => marqueeAnimation.pause());
        wrapper.addEventListener('mouseleave', () => marqueeAnimation.play());
    }
}

export function initActivitesMarquee() {
    // S'assurer que la section est présente sur la page avant de lancer l'animation
    if (document.querySelector(SELECTORS.SECTION)) {
        setupMarqueeAnimation();
    }
} 