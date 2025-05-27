// Version: 1.0.0 - Version initiale
console.log('🚀 menu-mobile.js v1.0.0 chargé');

// Module Menu Mobile
export function initMenuMobile() {
    console.log("menu-mobile.js chargé");
    
    // Sélecteurs principaux
    const menuButton = document.querySelector('#hamburger-menu');
    const mainMenu = document.querySelector('#main-menu-mobile');
    const body = document.body;
    const html = document.documentElement;
    
    // Sélecteurs des boutons de sous-menu
    const parcButton = document.querySelector('#parcs-nav_button_mobile');
    const activitesButton = document.querySelector('#activites-nav_button_mobile');
    const formulesButton = document.querySelector('#formules-nav_button_mobile');
    
    // Sélecteurs des sous-menus
    const parcMenu = document.querySelector('#parc-menu-mobile');
    const activiteMenu = document.querySelector('#activite-menu-mobile');
    const offresMenu = document.querySelector('#offres-menu-mobile');
    
    // Sélecteurs des boutons close et back
    const closeButtons = document.querySelectorAll('.button-close');
    const backButtons = document.querySelectorAll('.button-back-menu');
    
    // État des menus
    let isMenuOpen = false;
    let scrollPosition = 0;
    
    // Timeline principale pour toute la navigation
    let mainTimeline = gsap.timeline({ paused: true });
    
    // Configuration initiale
    [mainMenu, parcMenu, activiteMenu, offresMenu].forEach(menu => {
        menu.style.display = 'none';
    });
    
    // Fonction pour désactiver le scroll
    function disableScroll() {
        // Sauvegarder la position de scroll actuelle
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Désactiver le scroll tout en préservant la position
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = `-${scrollPosition}px`;
    }
    
    // Fonction pour réactiver le scroll
    function enableScroll() {
        // Réactiver le scroll
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        
        // Restaurer la position de scroll
        window.scrollTo(0, scrollPosition);
    }
    
    // Fonction pour créer la timeline principale
    function createMainTimeline() {
        return gsap.timeline({ paused: true })
            // Étape 1: Ouverture du menu principal
            .add(() => {
                mainMenu.style.display = 'flex';
                [parcMenu, activiteMenu, offresMenu].forEach(menu => {
                    menu.style.display = 'none';
                });
            }, "openMainMenu")
            // Étape 2: Ouverture du menu parcs (sera utilisée plus tard)
            .add(() => {
                mainMenu.style.display = 'none';
                parcMenu.style.display = 'flex';
            }, "openParcMenu")
            // Étape 3: Ouverture du menu activités (sera utilisée plus tard)
            .add(() => {
                mainMenu.style.display = 'none';
                activiteMenu.style.display = 'flex';
            }, "openActiviteMenu")
            // Étape 4: Ouverture du menu offres (sera utilisée plus tard)
            .add(() => {
                mainMenu.style.display = 'none';
                offresMenu.style.display = 'flex';
            }, "openOffresMenu");
    }
    
    // Initialisation de la timeline
    mainTimeline = createMainTimeline();
    
    // Fonction pour réinitialiser complètement tous les menus
    function resetAllMenus() {
        console.log("Reset des menus");
        // Arrêter la timeline en cours
        if (mainTimeline) {
            mainTimeline.kill();
        }
        
        // Réinitialiser l'état
        isMenuOpen = false;
        
        // Cacher tous les menus
        [mainMenu, parcMenu, activiteMenu, offresMenu].forEach(menu => {
            menu.style.display = 'none';
        });
        
        // Réactiver le scroll
        enableScroll();
        
        // Recréer la timeline
        mainTimeline = createMainTimeline();
    }
    
    // Fonction pour revenir au menu principal
    function backToMainMenu() {
        // Cacher tous les sous-menus
        [parcMenu, activiteMenu, offresMenu].forEach(menu => {
            menu.style.display = 'none';
        });
        
        // Afficher le menu principal
        mainMenu.style.display = 'flex';
        isMenuOpen = true;
    }
    
    // Fonction pour ouvrir un sous-menu
    function openSubMenu(subMenu) {
        // Cacher le menu principal
        mainMenu.style.display = 'none';
        // On garde isMenuOpen à true car on est toujours dans le menu
        isMenuOpen = true;
        
        // Afficher le sous-menu
        subMenu.style.display = 'flex';
    }
    
    // Gestion du clic sur le bouton burger
    menuButton.addEventListener('click', () => {
        console.log("Clic sur burger, isMenuOpen:", isMenuOpen);
        
        if (!isMenuOpen) {
            // Premier clic : ouvrir le menu principal
            console.log("Ouverture du menu principal");
            [parcMenu, activiteMenu, offresMenu].forEach(menu => {
                menu.style.display = 'none';
            });
            mainMenu.style.display = 'flex';
            isMenuOpen = true;
            
            // Désactiver le scroll
            disableScroll();
        } else {
            // Deuxième clic : tout fermer
            console.log("Fermeture de tous les menus");
            resetAllMenus();
        }
    });
    
    // Gestion des clics sur les boutons de sous-menu
    parcButton.addEventListener('click', () => openSubMenu(parcMenu));
    activitesButton.addEventListener('click', () => openSubMenu(activiteMenu));
    formulesButton.addEventListener('click', () => openSubMenu(offresMenu));
    
    // Gestion des boutons close
    closeButtons.forEach(button => {
        button.addEventListener('click', resetAllMenus);
    });
    
    // Gestion des boutons retour
    backButtons.forEach(button => {
        button.addEventListener('click', backToMainMenu);
    });
}
  
  
  
  