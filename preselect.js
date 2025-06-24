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

    const activitySlug = preselectWrapper.dataset.preselectActivitySlug;
    const parkId = preselectWrapper.dataset.preselectParkId;

    const params = new URLSearchParams();
    if (activitySlug) {
        params.set('activite', activitySlug);
    }
    if (parkId) {
        params.set('parc', parkId);
    }

    if (params.toString()) {
        const newHref = `${reservationPageUrl}?${params.toString()}`;
        bookingButtons.forEach(button => {
            button.href = newHref;
            
            // On s'assure que notre logique de redirection est prioritaire
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = newHref;
            }, true); // On utilise la capture pour être sûr de passer en premier
        });
        log(`Liens de réservation mis à jour et clics gérés pour pointer vers : ${newHref}`);
    }
} 