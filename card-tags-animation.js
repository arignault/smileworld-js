console.log('🏷️ card-tags-animation.js prêt à être initialisé');

export function initCardTagsAnimation() {
    // Stratégie de recherche inversée : on trouve directement les wrappers à animer.
    const tagWrappers = document.querySelectorAll('.tag-wrapper-gsap-loop');

    if (tagWrappers.length === 0) {
        return; // Pas de wrappers, pas d'animation.
    }

    console.log(`✅ ${tagWrappers.length} wrappers de tags trouvés. Initialisation de l'animation.`);

    tagWrappers.forEach((tagWrapper, index) => {
        const card = tagWrapper.closest('.centre_card_pro_wrapper');

        // Correction du bug de la boucle de clonage infinie
        const tags = Array.from(tagWrapper.children);
        if (tags.length === 0) {
            return; // Pas de tags à animer
        }
        tags.forEach(tag => {
            tagWrapper.appendChild(tag.cloneNode(true));
        });
        
        const loop = window.gsap.to(tagWrapper, {
            xPercent: -50,
            ease: "none",
            duration: 15,
            repeat: -1,
        });
        
        if (card) {
            card.addEventListener('mouseenter', () => loop.pause());
            card.addEventListener('mouseleave', () => loop.play());
        } else {
             console.warn(`-> Carte parente .centre_card_pro_wrapper non trouvée pour le tag wrapper ${index + 1}. L'animation de survol ne fonctionnera pas.`);
        }
    });
} 