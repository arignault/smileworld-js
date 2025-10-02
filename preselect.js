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
        const apexUrl = `https://www.apex-timing.com/gokarts/sessions_booking.php?center=${encodeURIComponent(parkId)}`;
        bookingButtons.forEach(button => {
            button.href = apexUrl;
            button.target = '_blank';
            button.rel = 'noopener';

            // Priorité à notre logique: ouverture nouvel onglet + fallback
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const win = window.open(apexUrl, '_blank', 'noopener');
                if (!win) {
                    window.location.href = apexUrl; // fallback si bloqué
                }
            }, true);
        });
        log(`Boutons configurés pour ouvrir Apex en nouvel onglet -> ${apexUrl}`);
    }
} 