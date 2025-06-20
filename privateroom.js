// privateroom.js - Gère le popup Matterport pour les salles privatisables
console.log('🚪 privateroom.js prêt à être initialisé');

export function initPrivateRoomPopup() {
    // Sélection des éléments
    const openButton = document.querySelector('[data-attribute="matterport_button"]');
    const popup = document.querySelector('[data-attribute="matterport_popup"]');
    const closeButton = document.querySelector('[data-attribute="close_popup"]');

    // Si les éléments cruciaux n'existent pas, on arrête tout pour ce module.
    if (!openButton || !popup || !closeButton) {
        console.warn('-> Éléments pour le popup de salle privatisable non trouvés. Le module ne s\'activera pas.');
        return;
    }
    
    console.log('✅ Popup de salle privatisable initialisé.');
    
    // On cache le popup initialement et on prépare sa transformation
    window.gsap.set(popup, { display: 'none', opacity: 0, scale: 0.95, y: '20px' });

    // Timeline d'ouverture
    const openTl = window.gsap.timeline({ paused: true })
        .to(popup, {
            display: 'flex',
        })
        .to(popup, { 
            opacity: 1, 
            scale: 1, 
            y: '0px',
            duration: 0.4, 
            ease: 'power3.out' 
        });

    // Timeline de fermeture
    const closeTl = window.gsap.timeline({ 
        paused: true, 
        onComplete: () => {
            window.gsap.set(popup, { display: 'none' });
        }
    })
    .to(popup, {
        opacity: 0,
        scale: 0.95,
        y: '20px',
        duration: 0.3,
        ease: 'power3.in'
    });

    // Fonctions pour jouer les timelines
    const openPopup = (e) => {
        e.preventDefault();
        if (openTl.isActive() || closeTl.isActive()) return;
        openTl.restart();
    };

    const closePopup = (e) => {
        e.preventDefault();
        if (openTl.isActive() || closeTl.isActive()) return;
        closeTl.restart();
    };

    // Ajout des écouteurs d'événements
    openButton.addEventListener('click', openPopup);
    closeButton.addEventListener('click', closePopup);
} 