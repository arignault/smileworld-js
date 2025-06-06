// Version: 1.0.9 - Nettoyage du code

import { initLoadingScreen, hideLoadingScreen, forceHideLoadingScreen } from './loading-screen.js';
import { initMenuMobile } from './menu-mobile.js';
import { initMenuDesktop } from './menu-desktop.js';
import { initCentreCards } from './centre-card.js';
import { initMenuDesktopHoverActivite } from './menu-desktop-hover-activite.js';
import { initTextAnimation } from './text-animation.js';

// Variable globale pour suivre l'état d'initialisation
let isInitializing = false;
let initializationAttempted = false;
let modulesLoaded = {
    menuMobile: false,
    menuDesktop: false,
    centreCards: false,
    textAnimation: false,
    menuDesktopHoverActivite: false
};

// Définit les états initiaux
function setInitialStates() {
    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (menuWrapper) {
        menuWrapper.style.display = 'none';
        menuWrapper.style.opacity = '0';
    }

    const menuContainers = document.querySelectorAll('.parc_menu_desktop, .activites_menu_desktop, .offres_menu_desktop');
    menuContainers.forEach(container => {
        if (container) {
            container.style.display = 'none';
            container.style.opacity = '0';
        }
    });

    const menuMobile = document.querySelector('.menu-mobile');
    if (menuMobile) {
        menuMobile.style.display = 'none';
        menuMobile.style.opacity = '0';
    }
}

// Vérifie si tous les modules sont chargés
function checkModulesLoaded() {
    return Object.values(modulesLoaded).every(loaded => loaded);
}

// Vérifie si le DOM est prêt
function isDOMReady() {
    return document.readyState === 'complete' || document.readyState === 'interactive';
}

// Initialise avec un délai
async function initializeWithDelay() {
    if (isInitializing || initializationAttempted) return;

    initializationAttempted = true;
    isInitializing = true;

    if (!isDOMReady()) {
        await new Promise(resolve => {
            const checkDOM = setInterval(() => {
                if (isDOMReady()) {
                    clearInterval(checkDOM);
                    resolve();
                }
            }, 100);
        });
    }

    try {
        const loadingScreen = await initLoadingScreen();
        setInitialStates();

        let loadAttempts = 0;
        const maxLoadAttempts = 50;

        while (!checkModulesLoaded() && loadAttempts < maxLoadAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            loadAttempts++;
        }

        if (loadAttempts >= maxLoadAttempts) {
            forceHideLoadingScreen();
            return;
        }

        await initMenuMobile();
        modulesLoaded.menuMobile = true;

        await initMenuDesktop();
        modulesLoaded.menuDesktop = true;

        await initCentreCards();
        modulesLoaded.centreCards = true;

        await initMenuDesktopHoverActivite();
        modulesLoaded.menuDesktopHoverActivite = true;

        await initTextAnimation();
        modulesLoaded.textAnimation = true;

        if (loadingScreen) {
            await new Promise(resolve => setTimeout(resolve, 500));
            hideLoadingScreen();
        }
    } catch (error) {
        forceHideLoadingScreen();
        throw error;
    } finally {
        isInitializing = false;
    }
}

// Démarre l'initialisation
function startInitialization() {
    modulesLoaded = {
        menuMobile: true,
        menuDesktop: true,
        centreCards: true,
        textAnimation: true,
        menuDesktopHoverActivite: true
    };
    
    initializeWithDelay().catch(error => {
        isInitializing = false;
        forceHideLoadingScreen();
    });
}

// Démarre l'initialisation dès que possible
if (typeof gsap !== 'undefined') {
    startInitialization();
} else {
    window.addEventListener('load', startInitialization);
}
