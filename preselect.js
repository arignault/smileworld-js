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
    
    console.log('✅ Module de présélection initialisé.');

    const parkId = preselectWrapper.dataset.preselectParkId;

    if (parkId) {
        const apexUrl = `https://www.apex-timing.com/gokarts/sessions_booking.php?center=${encodeURIComponent(parkId)}`;
        bookingButtons.forEach(button => {
            button.href = apexUrl;
            button.target = '_blank';
            button.rel = 'noopener';

            // Empêche toute navigation locale et supprime le fallback
            const handler = function(e) {
                try {
                    e.preventDefault();
                    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
                    if (typeof e.stopPropagation === 'function') e.stopPropagation();
                } catch (_) {}
                window.open(apexUrl, '_blank', 'noopener');
                return false;
            };
            // capture pour prioriser notre handler
            button.addEventListener('click', handler, true);
        });
        log(`Boutons configurés pour ouvrir Apex en nouvel onglet (sans redirection locale) -> ${apexUrl}`);

        // Sécurité supplémentaire: intercepteur global en capture, pour capter tous clics dans le bouton
        document.addEventListener('click', function globalPreselectInterceptor(e) {
            const btn = e.target.closest('[data-attribute="preselect-booking-button"]');
            if (!btn) return;
            try {
                e.preventDefault();
                if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
                if (typeof e.stopPropagation === 'function') e.stopPropagation();
            } catch (_) {}
            window.open(apexUrl, '_blank', 'noopener');
            return false;
        }, true);
    }
} 