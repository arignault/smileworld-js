// Version: 1.0.3 - Test de conflit minimal
// import { gsap } from 'gsap';

console.log('🔬 Test de conflit minimal. Ce script ne devrait rien faire d\'autre.');

// import { initLoadingScreen, hideLoadingScreen, forceHideLoadingScreen } from './loading-screen.js';
// import { initMenuMobile } from './menu-mobile.js';
// // import { initMenuDesktop } from './menu-desktop.js';
// import { initCentreCards } from './centre-card.js';
// // import { initMenuDesktopHoverActivite } from './menu-desktop-hover-activite.js';
// import { initTextAnimation } from './text-animation.js';
// import { initFaqItems } from './faq-toggle.js';
// import { initMapIntegration } from './map-integration.js';


// L'initialisation principale
async function initializeApp() {
    console.log('🎬 Initialisation minimale pour le test.');
    // On ne fait absolument rien dans cette version.
}


// --- Lancement de l'application via le mécanisme Webflow ---
window.Webflow = window.Webflow || [];
window.Webflow.push(initializeApp);
