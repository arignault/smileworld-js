// Version: 1.0.1 - Ajout des logs de version
console.log('🚀 main_gsap.js v1.0.1 chargé');

// Log de débogage pour les imports
console.log('🔍 Tentative d\'import des modules...');

// Import des modules
import { initMenuMobile } from './menu-mobile.js';
// import { initCentreCards } from './centre-card.js'; // Temporairement désactivé pour debug
import { initMenuDesktop } from './menu-desktop.js';

// Logs de confirmation des imports
console.log('📦 Import de menu-mobile.js...');
// console.log('📦 Import de centre-card.js...'); // Temporairement désactivé
console.log('📦 Import de menu-desktop.js...');

// Vérification des fonctions importées
console.log('🔍 Vérification des fonctions importées:');
console.log('- initMenuMobile:', typeof initMenuMobile === 'function' ? '✅' : '❌');
// console.log('- initCentreCards:', typeof initCentreCards === 'function' ? '✅' : '❌'); // Temporairement désactivé
console.log('- initMenuDesktop:', typeof initMenuDesktop === 'function' ? '✅' : '❌');

console.log('🔍 Script main_gsap.js chargé');

// Variable globale pour suivre l'état d'initialisation
let isInitializing = false;
let initializationTimeout = null;
let modulesLoaded = {
    menuMobile: false,
    menuDesktop: false,
    // centreCards: false // Temporairement désactivé
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

    // Fermer toutes les cartes
    const cards = document.querySelectorAll('.centre-card_wrapper.effect-cartoon-shadow');
    cards.forEach(card => {
        if (card) {
            card.classList.remove('is-open');
            const tagHolderWrapper = card.querySelector('.tag-holder-wrapper');
            if (tagHolderWrapper) {
                tagHolderWrapper.classList.remove('is-open');
            }
        }
    });

    console.log('✅ États initiaux définis');
}

// Fonction pour vérifier si tous les modules sont chargés
function checkModulesLoaded() {
    return Object.values(modulesLoaded).every(loaded => loaded);
}

// Fonction pour afficher un compte à rebours
function logCountdown(seconds) {
    console.log('\n==========================================');
    console.log(`⏰ DÉLAI DE ${seconds} SECONDES EN COURS...`);
    console.log('==========================================\n');
    
    let remaining = seconds;
    
    const interval = setInterval(() => {
        remaining--;
        console.log('\n==========================================');
        console.log(`⏰ ${remaining} seconde${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}...`);
        console.log('==========================================\n');
        
        if (remaining <= 0) {
            clearInterval(interval);
            console.log('\n==========================================');
            console.log('⏰ DÉLAI TERMINÉ !');
            console.log('==========================================\n');
        }
    }, 1000);

    return interval;
}

// Fonction pour vérifier si la CMS List est chargée
function isCMSListLoaded() {
    const cmsList = document.querySelector('.centre-card_wrapper.effect-cartoon-shadow');
    const isLoaded = cmsList && cmsList.children.length > 0;
    console.log('🔍 Vérification CMS List:', {
        element: cmsList ? '✅ trouvé' : '❌ non trouvé',
        enfants: cmsList ? `${cmsList.children.length} éléments` : '0 élément',
        chargé: isLoaded ? '✅' : '❌'
    });
    return isLoaded;
}

// Fonction pour initialiser avec délai
async function initializeWithDelay() {
    console.log('🔍 Fonction initializeWithDelay appelée');
    
    if (isInitializing) {
        console.log('⚠️ Initialisation déjà en cours...');
        return;
    }

    if (initializationTimeout) {
        console.log('⚠️ Timeout déjà en cours, annulation...');
        clearTimeout(initializationTimeout);
    }

    isInitializing = true;
    console.log('\n==========================================');
    console.log('⏳ PRÉPARATION DE L\'INITIALISATION');
    console.log('⚠️ ATTENTION: UN DÉLAI DE 5 SECONDES VA COMMENCER');
    console.log('==========================================\n');

    // Définir les états initiaux avant le délai
    setInitialStates();

    // Démarrer le compte à rebours
    const countdownInterval = logCountdown(5);

    try {
        // Attendre que tous les modules soient chargés
        while (!checkModulesLoaded()) {
            console.log('⏳ En attente du chargement des modules...', modulesLoaded);
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Attendre le délai de 5 secondes
        await new Promise(resolve => {
            initializationTimeout = setTimeout(() => {
                clearInterval(countdownInterval);
                clearTimeout(initializationTimeout);
                initializationTimeout = null;
                resolve();
            }, 5000);
        });

        console.log('\n==========================================');
        console.log('🔄 DÉBUT DE L\'INITIALISATION APRÈS DÉLAI');
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
        
        // Commenter l'initialisation des cartes
        /*
        console.log('\n🔄 Initialisation des cartes...');
        try {
            await initCentreCards();
            modulesLoaded.centreCards = true;
            console.log("✅ Cartes initialisées");
        } catch (error) {
            console.error("❌ Erreur lors de l'initialisation des cartes:", error);
        }
        */
        
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

// Fonction pour vérifier l'état du DOM
function checkDOMState() {
    console.log('\n📊 État du DOM:');
    console.log('- Menu mobile:', document.querySelector('.menu-mobile') ? '✅' : '❌');
    console.log('- Menu desktop:', document.querySelector('.desktop_menu_wrapper') ? '✅' : '❌');
    console.log('- CMS List:', document.querySelector('.centre-card_wrapper.effect-cartoon-shadow') ? '✅' : '❌');
    console.log('- Nombre total de cartes:', document.querySelectorAll('.centre-card_wrapper.effect-cartoon-shadow').length);
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
        // centreCards: true // Temporairement désactivé
    };
    
    // Démarrer l'initialisation avec délai
    initializeWithDelay().catch(error => {
        console.error("\n❌ Erreur fatale lors de l'initialisation:", error);
        console.error("Stack trace:", error.stack);
        isInitializing = false;
    });
});
