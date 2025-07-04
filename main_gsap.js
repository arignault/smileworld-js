// main_gsap.js v3.0.2 - Revert animation marquee page d'accueil uniquement
console.log("🚀 main_gsap.js v3.0.2 chargé");

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
import { initPreselection } from './preselect.js';
import { initMenuDesktopHoverActivite } from './menu-desktop-hover-activite.js';
import { initializeEmptyFacetsHandler } from './finsweet-empty-facets.js';
import { MandatoryFilterSelection } from './mandatory-filter-selection.js';
import { EventFormVisibility } from './event-form-visibility.js';
import { initMarqueeAnimation } from './marquee-animation.js';

function initializeModules() {
    console.log("✅ GSAP est prêt. Initialisation des modules...");
    
    try {
        // Initialise les modules généraux
        initTextAnimation();
        initMenuDesktop();
        initMenuMobile();
        initDebugMenu();
        initMenuDesktopHoverActivite();
        
        // Initialise le gestionnaire de filtres vides Finsweet
        initializeEmptyFacetsHandler();

        // Initialise la logique pour le formulaire de devis sur la page smile-event
        new EventFormVisibility().init();

        // --- Code Splitting pour les pages spécifiques ---
        // Page Réservation : on charge le module si l'URL contient "/reservation"
        if (window.location.pathname.includes('/reservation')) {
            console.log("-> Page Réservation détectée via l'URL. Chargement du module...");
            initReservation();
                    console.log("✅ Module Réservation chargé et initialisé.");
        }

        // Pages Offres et Anniversaires : filtrage obligatoire
        const currentPath = window.location.pathname;
        if (currentPath === '/offres' || currentPath === '/anniversaires') {
            console.log(`-> Page ${currentPath} détectée. Initialisation du filtrage obligatoire...`);
            const mandatoryFilter = new MandatoryFilterSelection();
            mandatoryFilter.init();
            console.log("✅ Module de filtrage obligatoire chargé et initialisé.");
        }

        // Page d'accueil : animation marquee
        if (currentPath === '/' || currentPath === '/index' || currentPath === '') {
            console.log("-> Page d'accueil détectée. Initialisation de l'animation marquee...");
            setTimeout(() => {
                initMarqueeAnimation();
            }, 500); // Petit délai pour s'assurer que le contenu CMS est chargé
        }

        // Initialisation des modules qui dépendent d'éléments spécifiques
        initMap();

        // Centre Cards : initialisé plus tard dans window.load pour s'assurer que le CMS est chargé

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
    initLoadingScreen(); // Preloader réactivé avec durée réduite

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
                forceHideLoadingScreen(); // On cache le loader pour ne pas bloquer l'utilisateur
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

// À la toute fin, une fois que tout (y compris les images) est chargé, on force la fermeture des cartes.
window.addEventListener('load', () => {
    console.log('🎬 La page est entièrement chargée. Initialisation des modules dépendants du contenu.');
    initCentreCards();
    initFaqItems();
});
