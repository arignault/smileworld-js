// Version: 1.0.3 - Attente GSAP + Enregistrement SplitText
// import { gsap } from 'gsap';
import { SplitText } from "gsap/SplitText";

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

function initDesktopMenuWithObserver() {
    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (menuWrapper) {
        console.log('✅ Menu wrapper trouvé immédiatement. Initialisation...');
        initMenuDesktop();
    } else {
        console.log('⏳ Menu wrapper non trouvé. Mise en place d\'un observateur...');
        const observer = new MutationObserver((mutations, obs) => {
            if (document.querySelector('.desktop_menu_wrapper')) {
                console.log('👀 L\'observateur a détecté le menu wrapper. Initialisation...');
                initMenuDesktop();
                obs.disconnect(); // On nettoie l'observateur, il a fait son travail
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// L'initialisation principale
async function initializeApp() {
    console.log('🎬 Début de l\'initialisation des modules');

    try {
        setInitialStates();
        console.log('✅ États initiaux définis via classes CSS');

        const loadingScreen = await initLoadingScreen();
        
        // Initialisation directe des menus (ils s'attacheront quand les éléments seront prêts)
        initMenuDesktop();
        initMenuMobile();
        
        const initPromises = [
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

// Nouvelle fonction patiente qui attend que GSAP et les éléments soient chargés
function waitForElementsAndInitialize() {
    const isGsapReady = !!window.gsap;
    const isNavReady = !!document.querySelector('.w-nav');
    const isMenuWrapperReady = !!document.querySelector('.desktop_menu_wrapper');

    if (isGsapReady && isNavReady && isMenuWrapperReady) {
        console.log('✅ GSAP et les éléments du menu sont prêts. Initialisation de l\'application...');
        window.gsap.registerPlugin(SplitText);
        initializeApp();
    } else {
        console.log(`⏳ Attente... GSAP: ${isGsapReady}, .w-nav: ${isNavReady}, .desktop_menu_wrapper: ${isMenuWrapperReady}. Nouvelle tentative dans 100ms...`);
        setTimeout(waitForElementsAndInitialize, 100);
    }
}

window.Webflow = window.Webflow || [];
window.Webflow.push(waitForElementsAndInitialize);
