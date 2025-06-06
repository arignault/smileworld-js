// Version: 1.1.0 - Simplified initialization logic and removed logs
console.log('🚀 main_gsap.js v1.1.0 chargé');

import { initLoadingScreen, hideLoadingScreen, forceHideLoadingScreen } from './loading-screen.js';
import { initMenuMobile } from './menu-mobile.js';
import { initMenuDesktop } from './menu-desktop.js';
import { initCentreCards } from './centre-card.js';
import { initMenuDesktopHoverActivite } from './menu-desktop-hover-activite.js';
import { initTextAnimation } from './text-animation.js';

let isInitializing = false;

// Fonction pour définir les états initiaux (fermer les menus au démarrage)
function setInitialStates() {
    gsap.set('.desktop_menu_wrapper, .parc_menu_desktop, .activites_menu_desktop, .offres_menu_desktop, .menu-mobile', {
        display: 'none',
        opacity: 0
    });
}

// Fonction d'initialisation principale
async function initializeApp() {
    if (isInitializing) return;
    isInitializing = true;
    console.log('🚀 Démarrage de l\'initialisation des modules...');

    try {
        await initLoadingScreen();
        setInitialStates();

        // Initialisation séquentielle des modules
        await initMenuMobile();
        await initMenuDesktop();
        await initCentreCards();
        await initMenuDesktopHoverActivite();
        await initTextAnimation();

        console.log('✅ Tous les modules ont été initialisés.');

        // Masquer le loading screen une fois que tout est prêt
        // Un léger délai pour éviter un flash visuel
        await new Promise(resolve => setTimeout(resolve, 100));
        hideLoadingScreen();
        
    } catch (error) {
        console.error("❌ Erreur fatale lors de l'initialisation des modules:", error);
        forceHideLoadingScreen(); // S'assurer que le site est utilisable même en cas d'erreur
    } finally {
        isInitializing = false;
    }
}

// Démarrer l'initialisation dès que le DOM est prêt
function start() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

start();
