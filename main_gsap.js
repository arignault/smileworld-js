// main_gsap.js v3.0.1 - Réintégration du loading screen
console.log("🚀 main_gsap.js v3.0.1 chargé");

// import { gsap } from "gsap"; // GSAP est maintenant chargé globalement via CDN
import { initLoadingScreen, requestHideLoadingScreen, forceHideLoadingScreen } from './loading-screen.js';
import { initTextAnimation } from './text-animation.js';
import { initFaqItems } from './faq-toggle.js';
import { initMenuDesktop } from './menu-desktop.js';
import { initMenuMobile } from './menu-mobile.js';
import { initCentreCards } from './centre-card.js';
import { initDebugMenu } from './debug-menu.js';
import { initReservation } from './reservation.js';
import { initMap } from './map-integration.js';
import { initPrivateRoomPopup } from './privateroom.js';
import { initPreselection } from './preselect.js';
import { initMenuDesktopHoverActivite } from './menu-desktop-hover-activite.js';

function initializeModules() {
    console.log("✅ GSAP est prêt. Initialisation des modules...");
    
    try {
        // Initialise les modules généraux
        initTextAnimation();
        initMenuDesktop();
        initMenuMobile();
        initDebugMenu();
        initMenuDesktopHoverActivite();

        // --- Code Splitting pour les pages spécifiques ---
        // Page Réservation : on charge le module si l'URL contient "/reservation"
        if (window.location.pathname.includes('/reservation')) {
            console.log("-> Page Réservation détectée via l'URL. Chargement du module...");
            initReservation();
                    console.log("✅ Module Réservation chargé et initialisé.");
        }

        // Initialisation des modules qui dépendent d'éléments spécifiques
        initMap();

        // Salles privatisables (uniquement si le conteneur est présent)
        if (document.querySelector('.salles_privatisable_holder')) {
            console.log("-> Élément .salles_privatisable_holder détecté. Initialisation du module.");
            initPrivateRoomPopup();
        }

        // Présélection pour la réservation (uniquement si des boutons sont présents)
        if (document.querySelector('[data-attribute="preselect-booking-button"]')) {
            console.log("-> Bouton de présélection détecté. Initialisation du module.");
            initPreselection();
        }

        console.log('✨ Tous les modules principaux ont été initialisés.');
        // Une fois que tout est prêt, on demande à cacher le loader.
        requestHideLoadingScreen();

    } catch (error) {
        console.error("❌ Erreur lors de l'initialisation des modules. Forçage du masquage du loader.", error);
        forceHideLoadingScreen(); // On s'assure que l'utilisateur n'est pas bloqué même en cas d'erreur
    }
}

function waitForGsapAndInitialize() {
    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper) {
        window.gsap.set(pageWrapper, { autoAlpha: 0 });
    }

    let attempts = 0;
    const maxAttempts = 100;
    const interval = setInterval(() => {
        if (window.gsap && window.gsap.timeline) {
            clearInterval(interval);
            console.log('✅ GSAP est prêt. Lancement des initialisations...');
            
            // On lance le loader ET on attend qu'il ait fini
            initLoadingScreen().then(() => {
                console.log('🎬 Le loader a terminé, affichage du contenu principal.');
                if (pageWrapper) {
                    window.gsap.to(pageWrapper, { autoAlpha: 1, duration: 0.4 });
                }
                
                // On peut initialiser les autres modules maintenant
                initializeModules();
            });

        } else if (attempts > maxAttempts) {
            clearInterval(interval);
            console.error("GSAP n'a pas pu être chargé après 10 secondes. Affichage forcé du contenu.");
            if (pageWrapper) {
                window.gsap.set(pageWrapper, { autoAlpha: 1 });
            }
        }
        attempts++;
    }, 100);
}

// Lancement du processus
// On encapsule dans window.Webflow.push pour s'assurer que le moteur de Webflow est prêt.
window.Webflow = window.Webflow || [];
window.Webflow.push(function() {
    console.log("🚀 Webflow est prêt, lancement de l'attente de GSAP.");
    waitForGsapAndInitialize();
});

// À la toute fin, une fois que tout (y compris les images) est chargé
window.addEventListener('load', () => {
    console.log('🎬 La page est entièrement chargée. Initialisation des modules dépendants du contenu.');
    
    initCentreCards();
    initFaqItems();
});
