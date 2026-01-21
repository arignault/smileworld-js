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
        const apexUrl = `https://www.apex-timing.com/gokarts/sessions_booking.php?center=${encodeURIComponent(parkId)}`;
        log(`Présélection détectée pour le parc ${parkId}, ouverture Apex en nouvel onglet.`);

        bookingButtons.forEach(button => {
            button.href = apexUrl;
            button.target = '_blank';
            button.rel = 'noopener';

            const handler = function(e) {
                try {
                    e.preventDefault();
                    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
                    if (typeof e.stopPropagation === 'function') e.stopPropagation();
                } catch (_) {}
                const win = window.open(apexUrl, '_blank', 'noopener');
                if (!win) {
                    window.open(apexUrl, '_blank');
                }
                return false;
            };
            button.addEventListener('click', handler, true);
        });

        document.addEventListener('click', function globalPreselectInterceptor(e) {
            const btn = e.target.closest('[data-attribute="preselect-booking-button"]');
            if (!btn) return;
            try {
                e.preventDefault();
                if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
                if (typeof e.stopPropagation === 'function') e.stopPropagation();
            } catch (_) {}
            const win = window.open(apexUrl, '_blank', 'noopener');
            if (!win) {
                window.open(apexUrl, '_blank');
            }
            return false;
        }, true);
    } else {
        bookingButtons.forEach(button => {
            button.href = reservationPageUrl;
            button.removeAttribute('target');
            button.removeAttribute('rel');
        });
        log(`Boutons configurés pour rediriger vers ${reservationPageUrl}`);
    }
} 