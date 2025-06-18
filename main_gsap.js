// Version: 1.0.2 - Ajout toggle FAQ
import { gsap } from 'gsap';

console.log('🔍 main_gsap.js - Module chargé et exécution commencée');

import { initLoadingScreen, hideLoadingScreen, forceHideLoadingScreen } from './loading-screen.js';
import { initMenuMobile } from './menu-mobile.js';
import { initMenuDesktop } from './menu-desktop.js';
import { initCentreCards } from './centre-card.js';
import { initMenuDesktopHoverActivite } from './menu-desktop-hover-activite.js';
import { initTextAnimation } from './text-animation.js';
import { initFaqItems } from './faq-toggle.js';
import { initMapIntegration } from './map-integration.js';

console.log('📦 main_gsap.js - Début du chargement');

// Définit les états initiaux en utilisant des classes
function setInitialStates() {
    document.querySelectorAll('.desktop_menu_wrapper, .parc_menu_desktop, .activites_menu_desktop, .offres_menu_desktop, .menu-mobile')
        .forEach(el => {
            if (el) {
                el.classList.add('is-hidden');
            }
        });
}

// L'initialisation principale
async function initializeApp() {
    console.log('🎬 Début de l\'initialisation des modules');

    try {
        setInitialStates();
        console.log('✅ États initiaux définis via classes CSS');

        const loadingScreen = await initLoadingScreen();
        
        const initPromises = [
            initMenuMobile(),
            initMenuDesktop(),
            initCentreCards(),
            initMenuDesktopHoverActivite(),
            initTextAnimation(),
            initFaqItems(),
            initMapIntegration()
        ];
        
        // Exécute toutes les initialisations
        await Promise.all(initPromises);
        
        console.log('✨ Tous les modules ont été initialisés');
        
        // --- Chargement conditionnel du module de réservation ---
        const reservationContainer = document.getElementById('container-initial');
        if (reservationContainer) {
            console.log('🏝️ Page de réservation détectée, chargement du module...');
            try {
                const { SmileWorldReservation } = await import('./reservation.js');
                new SmileWorldReservation();
                console.log('✅ Module de réservation chargé et initialisé.');
            } catch (err) {
                console.error('❌ Erreur lors du chargement du module de réservation:', err);
            }
        }
        
        if (loadingScreen) {
            hideLoadingScreen();
        }

    } catch (error) {
        console.error('❌ Erreur fatale lors de l\'initialisation:', error);
        forceHideLoadingScreen();
    }
}

// Attend que le DOM soit chargé pour lancer l'application, de manière robuste
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initializeApp);
// } else {
//     // Le DOM est déjà prêt
//     initializeApp();
// }

// --- Lancement de l'application via le mécanisme Webflow ---
window.Webflow = window.Webflow || [];
window.Webflow.push(initializeApp);
