// Import des modules existants
import { initMenuMobile } from './menu-mobile.js';
import { initCentreCards } from './centre-card.js';
import { initMenuDesktop } from './menu-desktop.js';

// Fonction pour afficher un compte à rebours
function logCountdown(seconds) {
    console.log(`\n⏰ DÉLAI DE ${seconds} SECONDES EN COURS...`);
    let remaining = seconds;
    
    const interval = setInterval(() => {
        remaining--;
        console.log(`⏰ ${remaining} seconde${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}...`);
        
        if (remaining <= 0) {
            clearInterval(interval);
            console.log('⏰ DÉLAI TERMINÉ !');
        }
    }, 1000);
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

// Fonction pour attendre que la CMS List soit chargée
function waitForCMSList(callback, maxAttempts = 10) {
    console.log('\n⏳ DÉBUT DE L\'ATTENTE DE LA CMS LIST');
    console.log('⚠️ ATTENTION: DÉLAI DE 5 SECONDES AVANT LES VÉRIFICATIONS');
    
    // Afficher le compte à rebours
    logCountdown(5);
    
    let attempts = 0;
    
    // Attendre 5 secondes avant de commencer à vérifier
    setTimeout(() => {
        console.log('\n🔄 DÉBUT DES VÉRIFICATIONS APRÈS LE DÉLAI');
        
        const checkCMSList = () => {
            console.log(`\n🔄 Tentative ${attempts + 1}/${maxAttempts}`);
            
            if (isCMSListLoaded()) {
                console.log('✅ CMS List chargée avec succès');
                callback();
            } else if (attempts < maxAttempts) {
                attempts++;
                console.log(`⏳ Attente supplémentaire de 500ms (tentative ${attempts}/${maxAttempts})...`);
                setTimeout(checkCMSList, 500);
            } else {
                console.log('⚠️ CMS List non trouvée après plusieurs tentatives');
                console.log('ℹ️ État actuel du DOM:');
                console.log('- Éléments .centre-card_wrapper:', document.querySelectorAll('.centre-card_wrapper').length);
                console.log('- Éléments .effect-cartoon-shadow:', document.querySelectorAll('.effect-cartoon-shadow').length);
                console.log('🔄 Initialisation sans CMS List');
                callback();
            }
        };
        
        checkCMSList();
    }, 5000); // Délai de 5 secondes
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
document.addEventListener("DOMContentLoaded", function() {
    console.log("\n🚀 DÉBUT DE L'INITIALISATION DES MODULES GSAP");
    console.log('⏰ DOMContentLoaded déclenché');
    
    // Vérifier l'état initial du DOM
    checkDOMState();
    
    try {
        console.log('\n🔄 Initialisation du menu mobile...');
        initMenuMobile();
        console.log("✅ Menu mobile initialisé");
        
        console.log('\n🔄 Initialisation du menu desktop...');
        initMenuDesktop();
        console.log("✅ Menu desktop initialisé");
        
        console.log('\n⏳ PRÉPARATION DE L\'INITIALISATION DES CARTES');
        console.log('⚠️ ATTENTION: UN DÉLAI DE 5 SECONDES VA COMMENCER');
        // Attendre que la CMS List soit chargée avant d'initialiser les cartes
        waitForCMSList(() => {
            console.log('\n🔄 DÉBUT DE L\'INITIALISATION DES CARTES');
            // Vérifier l'état du DOM avant l'initialisation des cartes
            checkDOMState();
            
            // Initialisation des cartes après vérification de la CMS List
            initCentreCards();
            console.log("✅ Cartes initialisées");
            
            // Vérification finale
            console.log('\n📊 ÉTAT FINAL APRÈS INITIALISATION:');
            checkDOMState();
        });
         
    } catch (error) {
        console.error("\n❌ Erreur lors de l'initialisation:", error);
        console.error("Stack trace:", error.stack);
    }
    
    // Vérification périodique de l'état du DOM
    setInterval(() => {
        console.log('\n🔄 Vérification périodique du DOM:');
        checkDOMState();
    }, 10000); // Toutes les 10 secondes
});
