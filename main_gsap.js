// Version: 1.0.3 - Ajout de l'animation de texte
console.log('🚀 main_gsap.js v1.0.3 chargé');

// Log de débogage pour les imports
console.log('🔍 Tentative d\'import des modules...');

// Import des modules
import { initMenuMobile } from './menu-mobile.js';
import { initCentreCards } from './centre-card.js'; // Réimporté pour la reconstruction
import { initMenuDesktop } from './menu-desktop.js';
import { initTextAnimation } from './text-animation.js';

// Logs de confirmation des imports
console.log('📦 Import de menu-mobile.js...');
console.log('📦 Import de centre-card.js (version minimaliste)...');
console.log('📦 Import de menu-desktop.js...');
console.log('📦 Import de text-animation.js...');

// Vérification des fonctions importées
console.log('🔍 Vérification des fonctions importées:');
console.log('- initMenuMobile:', typeof initMenuMobile === 'function' ? '✅' : '❌');
console.log('- initCentreCards:', typeof initCentreCards === 'function' ? '✅' : '❌');
console.log('- initMenuDesktop:', typeof initMenuDesktop === 'function' ? '✅' : '❌');
console.log('- initTextAnimation:', typeof initTextAnimation === 'function' ? '✅' : '❌');

console.log('🔍 Script main_gsap.js chargé');

// Variable globale pour suivre l'état d'initialisation
let isInitializing = false;
let initializationTimeout = null;
let modulesLoaded = {
    menuMobile: false,
    menuDesktop: false,
    centreCards: false,
    textAnimation: false // Ajout du module d'animation de texte
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

// Fonction pour initialiser avec délai
async function initializeWithDelay() {
    console.log('🔍 Fonction initializeWithDelay appelée');
    
    if (isInitializing) {
        console.log('⚠️ Initialisation déjà en cours...');
        return;
    }

    isInitializing = true;
    console.log('\n==========================================');
    console.log('⏳ PRÉPARATION DE L\'INITIALISATION');
    console.log('==========================================\n');

    // Définir les états initiaux
    setInitialStates();

    try {
        // Attendre que tous les modules soient chargés
        while (!checkModulesLoaded()) {
            console.log('⏳ En attente du chargement des modules...', modulesLoaded);
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log('\n==========================================');
        console.log('🔄 DÉBUT DE L\'INITIALISATION IMMÉDIATE');
        console.log('==========================================\n');

        // Vérifier l'état du DOM avant l'initialisation
        checkDOMState();
        
        // Initialiser les menus dans l'ordre
        console.log('\n🔄 Initialisation du menu mobile...');
        try {
            await initMenuMobile();
            modulesLoaded.menuMobile = true;
            console.log("✅ Menu mobile initialisé");
        } catch (error) {
            console.error("❌ Erreur lors de l'initialisation du menu mobile:", error);
        }
        
        console.log('\n🔄 Initialisation du menu desktop...');
        try {
            await initMenuDesktop();
            modulesLoaded.menuDesktop = true;
            console.log("✅ Menu desktop initialisé");
        } catch (error) {
            console.error("❌ Erreur lors de l'initialisation du menu desktop:", error);
        }
        
        // Initialisation minimale des cartes
        console.log('\n🔄 Initialisation du module centre-card...');
        try {
            await initCentreCards();
            modulesLoaded.centreCards = true;
            console.log("✅ Module centre-card initialisé (version minimaliste)");

            // Initialisation de l'animation de texte APRÈS centre-card
            console.log('\n🔄 Initialisation de l\'animation de texte...');
            try {
                await initTextAnimation();
                modulesLoaded.textAnimation = true;
                console.log("✅ Animation de texte initialisée");
            } catch (error) {
                console.error("❌ Erreur lors de l'initialisation de l'animation de texte:", error);
            }
        } catch (error) {
            console.error("❌ Erreur lors de l'initialisation du module centre-card:", error);
        }
        
        // Vérification finale
        console.log('\n📊 ÉTAT FINAL APRÈS INITIALISATION:');
        checkDOMState();
         
    } catch (error) {
        console.error("\n❌ Erreur lors de l'initialisation:", error);
        console.error("Stack trace:", error.stack);
    } finally {
        isInitializing = false;
    }
}

// Initialisation globale
window.addEventListener('load', function() {
    console.log("\n==========================================");
    console.log("🚀 DÉBUT DE L'INITIALISATION DES MODULES GSAP");
    console.log("⏰ window.load déclenché");
    console.log("==========================================\n");
    
    // Vérifier l'état initial du DOM
    checkDOMState();
    
    // Marquer les modules comme chargés
    modulesLoaded = {
        menuMobile: true,
        menuDesktop: true,
        centreCards: true,
        textAnimation: true // Ajout du module d'animation de texte
    };
    
    // Démarrer l'initialisation
    initializeWithDelay().catch(error => {
        console.error("\n❌ Erreur fatale lors de l'initialisation:", error);
        console.error("Stack trace:", error.stack);
        isInitializing = false;
    });
});
