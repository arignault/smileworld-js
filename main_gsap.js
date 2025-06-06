// Version: 1.0.8 - Amélioration de l'initialisation
console.log('🚀 main_gsap.js v1.0.8 chargé');

// Log de débogage pour les imports
console.log('🔍 Tentative d\'import des modules...');

// Import des modules dans l'ordre de priorité
import { initLoadingScreen, hideLoadingScreen, forceHideLoadingScreen } from './loading-screen.js';  // Priorité 0
import { initMenuMobile } from './menu-mobile.js';        // Priorité 1
import { initMenuDesktop } from './menu-desktop.js';      // Priorité 2
import { initCentreCards } from './centre-card.js';       // Priorité 3
import { initMenuDesktopHoverActivite } from './menu-desktop-hover-activite.js';  // Priorité 4
import { initTextAnimation } from './text-animation.js';  // Priorité 5

// Logs de confirmation des imports
console.log('📦 Import de menu-mobile.js (Priorité 1)...');
console.log('📦 Import de menu-desktop.js (Priorité 2)...');
console.log('📦 Import de centre-card.js (Priorité 3)...');
console.log('📦 Import de menu-desktop-hover-activite.js (Priorité 4)...');
console.log('📦 Import de text-animation.js (Priorité 5)...');

// Vérification des fonctions importées
console.log('🔍 Vérification des fonctions importées:');
console.log('- initMenuMobile:', typeof initMenuMobile === 'function' ? '✅' : '❌');
console.log('- initCentreCards:', typeof initCentreCards === 'function' ? '✅' : '❌');
console.log('- initMenuDesktop:', typeof initMenuDesktop === 'function' ? '✅' : '❌');
console.log('- initTextAnimation:', typeof initTextAnimation === 'function' ? '✅' : '❌');
console.log('- initMenuDesktopHoverActivite:', typeof initMenuDesktopHoverActivite === 'function' ? '✅' : '❌');

console.log('🔍 Script main_gsap.js chargé');

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

// Fonction pour définir les états initiaux
function setInitialStates() {
    console.log('🔄 Définition des états initiaux...');
    
    // Fermer tous les menus desktop
    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (menuWrapper) {
        menuWrapper.style.display = 'none';
        menuWrapper.style.opacity = '0';
    }

    // Fermer tous les menus individuels
    const menuContainers = document.querySelectorAll('.parc_menu_desktop, .activites_menu_desktop, .offres_menu_desktop');
    menuContainers.forEach(container => {
        if (container) {
            container.style.display = 'none';
            container.style.opacity = '0';
        }
    });

    // Fermer le menu mobile
    const menuMobile = document.querySelector('.menu-mobile');
    if (menuMobile) {
        menuMobile.style.display = 'none';
        menuMobile.style.opacity = '0';
    }

    console.log('✅ États initiaux définis');
}

// Fonction pour vérifier si tous les modules sont chargés
function checkModulesLoaded() {
    return Object.values(modulesLoaded).every(loaded => loaded);
}

// Fonction pour vérifier l'état du DOM
function checkDOMState() {
    console.log('\n📊 État du DOM:');
    console.log('- Menu mobile:', document.querySelector('.menu-mobile') ? '✅' : '❌');
    console.log('- Menu desktop:', document.querySelector('.desktop_menu_wrapper') ? '✅' : '❌');
    console.log('- Module centre-card:', '✅ (version minimaliste)');
}

// Fonction pour vérifier si le DOM est prêt
function isDOMReady() {
    return document.readyState === 'complete' || document.readyState === 'interactive';
}

// Fonction pour initialiser avec délai
async function initializeWithDelay() {
    console.log('🔍 Fonction initializeWithDelay appelée');
    
    if (isInitializing) {
        console.log('⚠️ Initialisation déjà en cours...');
        return;
    }

    if (initializationAttempted) {
        console.log('⚠️ Initialisation déjà tentée précédemment');
        return;
    }

    initializationAttempted = true;
    isInitializing = true;

    console.log('\n==========================================');
    console.log('⏳ PRÉPARATION DE L\'INITIALISATION');
    console.log('==========================================\n');

    // Vérifier si le DOM est prêt
    if (!isDOMReady()) {
        console.log('⏳ En attente que le DOM soit prêt...');
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
        // Initialiser le loading screen en premier
        console.log('🔄 Initialisation du loading screen...');
        const loadingScreen = await initLoadingScreen();
        if (!loadingScreen) {
            throw new Error('Loading screen non initialisé correctement');
        }

        // Définir les états initiaux
        setInitialStates();

        // Attendre que tous les modules soient chargés
        let loadAttempts = 0;
        const maxLoadAttempts = 50; // 5 secondes maximum

        while (!checkModulesLoaded() && loadAttempts < maxLoadAttempts) {
            console.log('⏳ En attente du chargement des modules...', modulesLoaded);
            await new Promise(resolve => setTimeout(resolve, 100));
            loadAttempts++;
        }

        if (loadAttempts >= maxLoadAttempts) {
            console.warn('⚠️ Timeout lors du chargement des modules');
            forceHideLoadingScreen();
            return;
        }

        console.log('\n==========================================');
        console.log('🔄 DÉBUT DE L\'INITIALISATION IMMÉDIATE');
        console.log('==========================================\n');

        // Vérifier l'état du DOM avant l'initialisation
        checkDOMState();
        
        // Initialisation des modules dans l'ordre
        try {
            // 1. Initialisation du menu mobile (Priorité 1)
            console.log('\n🔄 Initialisation du menu mobile (Priorité 1)...');
            await initMenuMobile();
            modulesLoaded.menuMobile = true;
            console.log("✅ Menu mobile initialisé");

            // 2. Initialisation du menu desktop (Priorité 2)
            console.log('\n🔄 Initialisation du menu desktop (Priorité 2)...');
            await initMenuDesktop();
            modulesLoaded.menuDesktop = true;
            console.log("✅ Menu desktop initialisé");

            // 3. Initialisation des cartes (Priorité 3)
            console.log('\n🔄 Initialisation du module centre-card (Priorité 3)...');
            await initCentreCards();
            modulesLoaded.centreCards = true;
            console.log("✅ Module centre-card initialisé");

            // 4. Initialisation du menu hover activite (Priorité 4)
            console.log('\n🔄 Initialisation du menu hover activite (Priorité 4)...');
            await initMenuDesktopHoverActivite();
            modulesLoaded.menuDesktopHoverActivite = true;
            console.log("✅ Menu hover activite initialisé");

            // 5. Initialisation de l'animation de texte (Priorité 5)
            console.log('\n🔄 Initialisation de l\'animation de texte (Priorité 5)...');
            await initTextAnimation();
            modulesLoaded.textAnimation = true;
            console.log("✅ Animation de texte initialisée");

            // Après l'initialisation de tous les modules
            console.log('\n📊 ÉTAT FINAL APRÈS INITIALISATION:');
            checkDOMState();
            
            // Masquer le loading screen une fois que tout est initialisé
            console.log('\n🔄 Masquage du loading screen...');
            await new Promise(resolve => setTimeout(resolve, 500)); // Petit délai pour s'assurer que tout est bien initialisé
            hideLoadingScreen();
            
        } catch (error) {
            console.error("\n❌ Erreur lors de l'initialisation des modules:", error);
            console.error("Stack trace:", error.stack);
            forceHideLoadingScreen();
            throw error;
        }
         
    } catch (error) {
        console.error("\n❌ Erreur fatale lors de l'initialisation:", error);
        console.error("Stack trace:", error.stack);
        forceHideLoadingScreen();
    } finally {
        isInitializing = false;
    }
}

// Fonction pour démarrer l'initialisation
function startInitialization() {
    console.log("\n==========================================");
    console.log("🚀 DÉBUT DE L'INITIALISATION DES MODULES GSAP");
    console.log("⏰ État du DOM:", document.readyState);
    console.log("==========================================\n");
    
    // Vérifier l'état initial du DOM
    checkDOMState();
    
    // Marquer les modules comme chargés
    modulesLoaded = {
        menuMobile: true,
        menuDesktop: true,
        centreCards: true,
        textAnimation: true,
        menuDesktopHoverActivite: true
    };
    
    // Démarrer l'initialisation
    initializeWithDelay().catch(error => {
        console.error("\n❌ Erreur fatale lors de l'initialisation:", error);
        console.error("Stack trace:", error.stack);
        isInitializing = false;
        forceHideLoadingScreen();
    });
}

// Démarrer l'initialisation dès que possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startInitialization);
} else {
    startInitialization();
}

// Backup : si l'initialisation n'a pas démarré après 2 secondes, la forcer
setTimeout(() => {
    if (!isInitializing && !initializationAttempted) {
        console.log('⚠️ Initialisation non démarrée après 2 secondes, démarrage forcé');
        startInitialization();
    }
}, 2000);
