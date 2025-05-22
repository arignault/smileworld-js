// Import des modules
import { initMenuMobile } from './menu-mobile.js';
import { initCentreCards } from './centre-card.js';
import { initMenuDesktop } from './menu-desktop.js';

// Fonction pour vérifier si la CMS List est chargée
function isCMSListLoaded() {
    const cmsList = document.querySelector('.centre-card_wrapper.effect-cartoon-shadow');
    return cmsList && cmsList.children.length > 0;
}

// Fonction pour attendre que la CMS List soit chargée
function waitForCMSList(callback, maxAttempts = 10) {
    let attempts = 0;
    
    const checkCMSList = () => {
        if (isCMSListLoaded()) {
            console.log("✅ CMS List chargée");
            callback();
        } else if (attempts < maxAttempts) {
            attempts++;
            console.log(`⏳ Attente de la CMS List (tentative ${attempts}/${maxAttempts})...`);
            setTimeout(checkCMSList, 500);
        } else {
            console.log("⚠️ CMS List non trouvée après plusieurs tentatives, initialisation sans CMS List");
            callback();
        }
    };
    
    checkCMSList();
}

// Initialisation globale
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Initialisation des modules GSAP");
    
    try {
        // Initialisation du menu mobile
        initMenuMobile();
        console.log("✅ Menu mobile initialisé");
        
        // Initialisation du menu desktop
        initMenuDesktop();
        console.log("✅ Menu desktop initialisé");
        
        // Attendre que la CMS List soit chargée avant d'initialiser les cartes
        waitForCMSList(() => {
            // Initialisation des cartes après vérification de la CMS List
            initCentreCards();
            console.log("✅ Cartes initialisées");
        });
         
    } catch (error) {
        console.error("❌ Erreur lors de l'initialisation:", error);
    }
    
    // Ici, on pourra ajouter l'initialisation d'autres modules
    // Par exemple :
    // initAnimations();
    // initParallax();
    // etc...
    // test github
    // test github
    // test github
    
});
