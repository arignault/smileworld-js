// Import des modules existants
import { initMenuMobile } from './menu-mobile.js';
import { initCentreCards } from './centre-card.js';
import { initMenuDesktop } from './menu-desktop.js';

console.log('🔍 Script main_gsap.js chargé');

// Variable globale pour suivre l'état d'initialisation
let isInitializing = false;
let initializationTimeout = null;

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
function initializeWithDelay() {
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

    // Démarrer le compte à rebours
    const countdownInterval = logCountdown(5);

    // Créer le timeout
    initializationTimeout = setTimeout(() => {
        console.log('🔍 Timeout déclenché');
        clearInterval(countdownInterval);
        clearTimeout(initializationTimeout);
        initializationTimeout = null;

        console.log('\n==========================================');
        console.log('🔄 DÉBUT DE L\'INITIALISATION APRÈS DÉLAI');
        console.log('==========================================\n');

        try {
            // Vérifier l'état du DOM avant l'initialisation
            checkDOMState();
            
            // Initialiser les menus
            console.log('\n🔄 Initialisation du menu mobile...');
            initMenuMobile();
            console.log("✅ Menu mobile initialisé");
            
            console.log('\n🔄 Initialisation du menu desktop...');
            initMenuDesktop();
            console.log("✅ Menu desktop initialisé");
            
            // Initialiser les cartes
            console.log('\n🔄 Initialisation des cartes...');
            initCentreCards();
            console.log("✅ Cartes initialisées");
            
            // Vérification finale
            console.log('\n📊 ÉTAT FINAL APRÈS INITIALISATION:');
            checkDOMState();
            
        } catch (error) {
            console.error("\n❌ Erreur lors de l'initialisation:", error);
            console.error("Stack trace:", error.stack);
        } finally {
            isInitializing = false;
        }
    }, 5000);
}

// Fonction pour vérifier l'état du DOM
function checkDOMState() {
    console.log('\n📊 État du DOM:');
    console.log('- Menu mobile:', document.querySelector('.menu-mobile') ? '✅' : '❌');
    console.log('- Menu desktop:', document.querySelector('.desktop_menu_wrapper') ? '✅' : '❌');
    console.log('- CMS List:', document.querySelector('.centre-card_wrapper.effect-cartoon-shadow') ? '✅' : '❌');
    console.log('- Nombre total de cartes:', document.querySelectorAll('.centre-card_wrapper.effect-cartoon-shadow').length);
}

// Fonction d'initialisation principale
function initializeAll() {
    console.log('\n==========================================');
    console.log("🚀 DÉBUT DE L'INITIALISATION DES MODULES GSAP");
    console.log("⏰ Fonction initializeAll appelée");
    console.log("==========================================\n");
    
    // Vérifier l'état initial du DOM
    checkDOMState();
    
    // Démarrer l'initialisation avec délai
    initializeWithDelay();
}

// Attendre que le DOM soit complètement chargé
if (document.readyState === 'loading') {
    console.log('🔍 DOM en cours de chargement, attente de DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🔍 DOMContentLoaded déclenché');
        initializeAll();
    });
} else {
    console.log('🔍 DOM déjà chargé, initialisation immédiate...');
    initializeAll();
}

// Backup avec window.onload
window.onload = function() {
    console.log('🔍 window.onload déclenché');
    if (!isInitializing) {
        console.log('⚠️ Réinitialisation via window.onload');
        initializeAll();
    }
};
