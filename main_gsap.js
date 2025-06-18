// Version: 1.0.2 - Ajout toggle FAQ

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
        if (!window.gsap) {
            throw new Error('GSAP n\'est pas chargé');
        }
        console.log('✅ GSAP est disponible');

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
        
        if (loadingScreen) {
            hideLoadingScreen();
        }

    } catch (error) {
        console.error('❌ Erreur fatale lors de l\'initialisation:', error);
        forceHideLoadingScreen();
    }
}

// Attend que le DOM soit chargé pour lancer l'application
document.addEventListener('DOMContentLoaded', initializeApp);

// Ne pas démarrer automatiquement l'initialisation
// L'initialisation sera déclenchée par webflow-loader.js
