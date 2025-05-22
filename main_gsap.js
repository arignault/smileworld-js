// Import des modules
import { initMenuMobile } from './menu-mobile.js';
import { initCentreCards } from './centre-card.js';
import { initMenuDesktop } from './menu-desktop.js';

// Initialisation globale
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Initialisation des modules GSAP");
    
    // Initialisation du menu mobile
    initMenuMobile();
    console.log("✅ Menu mobile initialisé");
    
    // Initialisation du menu desktop
    initMenuDesktop();
    console.log("✅ Menu desktop initialisé");
    
    // Initialisation des cartes
    initCentreCards();
    console.log("✅ Cartes initialisées");
    
    // Ici, on pourra ajouter l'initialisation d'autres modules
    // Par exemple :
    // initAnimations();
    // initParallax();
    // etc...
    // test github
    // test github
    // test github
    
});
