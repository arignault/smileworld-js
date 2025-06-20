console.log('🏷️ card-tags-animation.js prêt à être initialisé');

export function initCardTagsAnimation() {
    const cardWrappers = document.querySelectorAll('.centre-card_wrapper');

    if (cardWrappers.length === 0) {
        return; // Pas de cartes, pas d'animation.
    }

    console.log(`✅ ${cardWrappers.length} cartes trouvées. Initialisation de l'animation des tags.`);

    cardWrappers.forEach((card, index) => {
        const tagWrapper = card.querySelector('#tag_wrapper_gsap_loop');
        if (!tagWrapper) {
            console.warn(`-> Wrapper de tags #tag_wrapper_gsap_loop non trouvé dans la carte ${index + 1}.`);
            return;
        }

        const tags = tagWrapper.children;
        if (tags.length === 0) {
            return; // Pas de tags à animer
        }

        // On clone les tags pour créer une boucle fluide
        for (let i = 0; i < tags.length; i++) {
            tagWrapper.appendChild(tags[i].cloneNode(true));
        }

        // Utilisation de la méthode la plus efficace de GSAP pour les boucles horizontales
        const loop = window.gsap.to(tagWrapper, {
            xPercent: -50, // On déplace de la moitié de la largeur (puisqu'on a dupliqué le contenu)
            ease: "none",
            duration: 15, // Vitesse de la boucle, plus c'est haut, plus c'est lent
            repeat: -1, // Répétition infinie
        });
        
        // Bonus : on met l'animation en pause au survol de la carte
        card.addEventListener('mouseenter', () => loop.pause());
        card.addEventListener('mouseleave', () => loop.play());
    });
} 