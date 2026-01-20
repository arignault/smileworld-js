// preselect.js - Gère la présélection pour la page de réservation.
console.log('🔗 preselect.js prêt à être initialisé');

export function initPreselection() {
    const pfx = '[SW-PRESELECT]';
    const log = (...a) => console.log(new Date().toLocaleTimeString(), pfx, ...a);

    // --- CONFIGURATION ---
    const reservationPageUrl = 'https://www.smile-world.fr/reservation'; 

    // --- LOGIQUE ---
    const preselectWrapper = document.querySelector('[data-preselect-activity-slug], [data-preselect-park-id]');
    if (!preselectWrapper) {
        // L'élément qui porte les données n'est pas là, inutile de continuer.
        console.warn(pfx, 'Aucun élément wrapper avec [data-preselect-activity-slug] ou [data-preselect-park-id] trouvé.');
        return;
    }

    const bookingButtons = document.querySelectorAll('[data-attribute="preselect-booking-button"]');
    
    console.log('✅ Module de présélection initialisé.');

    const parkId = preselectWrapper.dataset.preselectParkId;

    if (parkId) {
        log(`Présélection détectée pour le parc ${parkId}, redirection forcée vers la page réservation.`);
    }

    bookingButtons.forEach(button => {
        button.href = reservationPageUrl;
        button.removeAttribute('target');
        button.removeAttribute('rel');
    });
    log(`Boutons configurés pour rediriger vers ${reservationPageUrl}`);
} 