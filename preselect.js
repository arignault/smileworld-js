// preselect.js - Gère la présélection pour la page de réservation.
console.log('🔗 preselect.js prêt à être initialisé');

export function initPreselection() {
    const pfx = '[SW-PRESELECT]';
    const log = (...a) => console.log(new Date().toLocaleTimeString(), pfx, ...a);

    // --- CONFIGURATION ---
    const reservationPageUrl = '/reservation'; 

    // --- LOGIQUE ---
    const preselectWrapper = document.querySelector('[data-preselect-activity-slug], [data-preselect-park-id]');
    if (!preselectWrapper) {
        // L'élément qui porte les données n'est pas là, inutile de continuer.
        console.warn(pfx, 'Aucun élément wrapper avec [data-preselect-activity-slug] ou [data-preselect-park-id] trouvé.');
        return;
    }

    const bookingButtons = document.querySelectorAll('[data-attribute="preselect-booking-button"]');
    // La condition de chargement est déjà dans main_gsap, donc on sait qu'il y a au moins un bouton.
    
    console.log('✅ Module de présélection initialisé.');

    const parkId = preselectWrapper.dataset.preselectParkId;

    // On ne conserve que la présélection par centre
    if (parkId) {
        const newHref = `${reservationPageUrl}?parc=${encodeURIComponent(parkId)}`;
        bookingButtons.forEach(button => {
            button.href = newHref;

            // On s'assure que notre logique de redirection est prioritaire
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = newHref;
            }, true); // capture pour passer en premier
        });
        log(`Liens de réservation mis à jour (centre uniquement) -> ${newHref}`);
    }
} 