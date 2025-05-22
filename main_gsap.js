// Import des modules
import { initMenuMobile } from './menu-mobile.js';
import { initCentreCards } from './centre-card.js';
import { initMenuDesktop } from './menu-desktop.js';

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
        
        // Initialisation des cartes (après le chargement complet du DOM)
        initCentreCards();
        console.log("✅ Cartes initialisées");
         
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
