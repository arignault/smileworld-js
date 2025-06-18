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

// Variable globale pour suivre l'état d'initialisation
let isInitializing = false;
let initializationAttempted = false;
let modulesLoaded = {
    menuMobile: false,
    menuDesktop: false,
    centreCards: false,
    textAnimation: false,
    menuDesktopHoverActivite: false,
    faqItems: false
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
    console.log('🔄 initializeWithDelay - Début de l\'initialisation');
    
    if (isInitializing || initializationAttempted) {
        console.log('⚠️ Initialisation déjà en cours ou tentée');
        return;
    }

    initializationAttempted = true;
    isInitializing = true;

    try {
        // Vérification de GSAP
        if (!window.gsap) {
            throw new Error('GSAP n\'est pas chargé');
        }
        console.log('✅ GSAP est disponible');

        // Vérification du DOM
        if (!isDOMReady()) {
            console.log('⏳ Attente du chargement du DOM...');
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout: Le DOM n\'a pas été chargé après 10 secondes'));
                }, 10000);

                const checkDOM = setInterval(() => {
                    if (isDOMReady()) {
                        console.log('✅ DOM chargé');
                        clearInterval(checkDOM);
                        clearTimeout(timeout);
                        resolve();
                    }
                }, 100);
            });
        }

        console.log('🎬 Début de l\'initialisation des modules');
        const loadingScreen = await initLoadingScreen();
        console.log('✅ Écran de chargement initialisé:', !!loadingScreen);
        
        // Vérification des éléments essentiels
        const essentialElements = {
            menuWrapper: document.querySelector('.desktop_menu_wrapper'),
            menuMobile: document.querySelector('.menu-mobile'),
            centreCards: document.querySelectorAll('.centre-card_wrapper.effect-cartoon-shadow'),
            textAnimation: document.querySelector('.span_mover')
        };

        console.log('🔍 Éléments essentiels trouvés:', {
            menuWrapper: !!essentialElements.menuWrapper,
            menuMobile: !!essentialElements.menuMobile,
            centreCards: essentialElements.centreCards.length,
            textAnimation: !!essentialElements.textAnimation
        });

        setInitialStates();
        console.log('✅ États initiaux définis');

        // Initialisation des modules avec gestion d'erreur individuelle
        const initModule = async (name, initFn) => {
            try {
                console.log(`🚀 Initialisation de ${name}...`);
                await initFn();
                console.log(`✅ ${name} initialisé avec succès`);
                return true;
            } catch (error) {
                console.error(`❌ Erreur lors de l'initialisation de ${name}:`, error);
                return false;
            }
        };

        const results = await Promise.all([
            initModule('Menu Mobile', initMenuMobile),
            initModule('Menu Desktop', initMenuDesktop),
            initModule('Cartes', initCentreCards),
            initModule('Hover Activités', initMenuDesktopHoverActivite),
            initModule('Animation Texte', initTextAnimation),
            initModule('FAQ', initFaqItems),
            initModule('Carte Google', initMapIntegration)
        ]);

        const allSuccessful = results.every(result => result);
        
        if (allSuccessful) {
            console.log('✨ Tous les modules ont été initialisés avec succès');
            if (loadingScreen) {
                console.log('🎬 Fermeture de l\'écran de chargement');
                hideLoadingScreen();
            }
        } else {
            console.warn('⚠️ Certains modules n\'ont pas été initialisés correctement');
            if (loadingScreen) {
                console.log('🔄 Tentative de fermeture forcée de l\'écran de chargement');
                forceHideLoadingScreen();
            } 
        }
    } catch (error) {
        console.error('❌ Erreur fatale lors de l\'initialisation:', error);
        console.error('Stack trace:', error.stack);
        forceHideLoadingScreen();
        throw error;
    } finally {
        isInitializing = false;
        console.log('🏁 Fin du processus d\'initialisation');
    }
}

// Démarre l'initialisation
export function startInitialization() {
    console.log('🎬 Démarrage de l\'initialisation');
    initializeWithDelay().catch(error => {
        console.error('❌ Erreur fatale lors de l\'initialisation:', error);
        isInitializing = false;
        forceHideLoadingScreen();
    });
}

// Ne pas démarrer automatiquement l'initialisation
// L'initialisation sera déclenchée par webflow-loader.js
