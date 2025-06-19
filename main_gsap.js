// main_gsap.js v3.0.0
console.log("🚀 main_gsap.js v3.0.0 chargé");

// import { gsap } from "gsap"; // GSAP est maintenant chargé globalement via CDN
import { initTextAnimation } from './text-animation.js';
import { initFaqItems } from './faq-toggle.js';
import { initMenuDesktop } from './menu-desktop.js';
import { initMenuMobile } from './menu-mobile.js';

function initializeModules() {
    console.log("✅ GSAP est prêt. Initialisation des modules...");
    
    // Initialise les modules qui ne dépendent pas de la page
    initTextAnimation();
    initFaqItems();
    initMenuDesktop();
    initMenuMobile();

    // --- Code Splitting pour les pages spécifiques ---
    // Page Réservation
    if (document.querySelector('[data-page="reservation"]')) {
        console.log("-> Page Réservation détectée. Chargement du module...");
        import('./reservation.js')
            .then(module => {
                module.initReservation();
                console.log("✅ Module Réservation chargé et initialisé.");
            })
            .catch(err => console.error("Échec du chargement du module de réservation:", err));
    }
}

function waitForGsapAndInitialize() {
    let attempts = 0;
    const maxAttempts = 100; // Attend max 10 secondes
    const interval = 100;

    const intervalId = setInterval(() => {
        if (window.gsap) {
            clearInterval(intervalId);
            initializeModules();
        } else {
            attempts++;
            if (attempts > maxAttempts) {
                clearInterval(intervalId);
                console.error("GSAP n'a pas pu être chargé après 10 secondes. Annulation de l'initialisation des modules.");
            }
        }
    }, interval);
}

// Lancement du processus
// On encapsule dans window.Webflow.push pour s'assurer que le moteur de Webflow est prêt.
window.Webflow = window.Webflow || [];
window.Webflow.push(function() {
    console.log("🚀 Webflow est prêt, lancement de l'attente de GSAP.");
    waitForGsapAndInitialize();
});
