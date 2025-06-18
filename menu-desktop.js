// Version: 1.0.6 - Nettoyage du code
import { gsap } from 'gsap';

// Variables globales
let isInitialized = false;
let isWrapperOpen = false;
let isAnimating = false;
let menuButtons = new Map();
let clickOutsideListener = null;
let originalBodyStyle = '';

// Configuration des menus
const menuConfig = [
    {
        buttonId: 'nav-link-desktop-parcs',
        containerSelector: '.parc_menu_desktop',
        isOpen: false
    },
    {
        buttonId: 'nav-link-desktop-activites',
        containerSelector: '.activites_menu_desktop',
        isOpen: false
    },
    {
        buttonId: 'nav-link-desktop-offres',
        containerSelector: '.offres_menu_desktop',
        isOpen: false
    }
];

// Fonction pour gérer le scroll
function toggleBodyScroll(disable) {
    if (disable) {
        originalBodyStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = originalBodyStyle;
    }
}

// Initialise les boutons de menu
function initializeMenuButtons() {
    console.log('🔄 Initialisation des boutons de menu...');
    menuConfig.forEach(menu => {
        const button = document.getElementById(menu.buttonId);
        if (button) {
            menuButtons.set(menu.buttonId, button);
            console.log(`✅ Bouton trouvé: ${menu.buttonId}`);
        } else {
            console.log(`❌ Bouton non trouvé: ${menu.buttonId}`);
        }
    });
}

// Récupère un bouton de menu
function getMenuButton(buttonId) {
    return menuButtons.get(buttonId);
}

// Vérifie si un élément est visible
function isElementVisible(element) {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

// Récupère le display calculé
function getComputedDisplay(element) {
    if (!element) return 'none';
    return window.getComputedStyle(element).display;
}

// Ferme tous les menus et le wrapper
function closeAllMenusAndWrapper(menuWrapper) {
    if (!menuWrapper || isAnimating) return;

    isAnimating = true;
    const tl = gsap.timeline({
        onComplete: () => {
            if (menuWrapper) {
                menuWrapper.setAttribute('style', 'display: none !important;');
            }
            isWrapperOpen = false;
            isAnimating = false;
            toggleBodyScroll(false);
        }
    });

    menuConfig.forEach(menu => {
        const menuContainer = document.querySelector(menu.containerSelector);
        
        if (menuContainer && isElementVisible(menuContainer)) {
            tl.to(menuContainer, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    menuContainer.setAttribute('style', 'display: none !important;');
                    menu.isOpen = false;
                }
            }, 0);
        }
    });

    if (isElementVisible(menuWrapper)) {
        tl.to(menuWrapper, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
        }, 0);
    }
}

// Active la détection des clics en dehors
function enableClickOutsideCheck(menuWrapper) {
    if (clickOutsideListener) {
        document.removeEventListener('click', clickOutsideListener);
    }

    clickOutsideListener = (e) => {
        if (isAnimating) return;

        const isClickOutside = !menuConfig.some(menu => {
            const button = getMenuButton(menu.buttonId);
            const container = document.querySelector(menu.containerSelector);
            return (button && e.target === button) || 
                   (container && e.target.closest(menu.containerSelector));
        }) && !e.target.closest('.desktop_menu_wrapper');
        
        if (isClickOutside && isWrapperOpen && isElementVisible(menuWrapper)) {
            closeAllMenusAndWrapper(menuWrapper);
            disableClickOutsideCheck();
        }
    };

    document.addEventListener('click', clickOutsideListener);
}

// Désactive la détection des clics en dehors
function disableClickOutsideCheck() {
    if (clickOutsideListener) {
        document.removeEventListener('click', clickOutsideListener);
        clickOutsideListener = null;
    }
}

// Ajouter des styles CSS initiaux pour les menus
function initializeMenuStyles() {
    menuConfig.forEach(menu => {
        const menuContainer = document.querySelector(menu.containerSelector);
        if (menuContainer) {
            menuContainer.style.transition = 'width 0.4s ease-in-out';
            menuContainer.style.overflow = 'hidden';
        }
    });
}

// Initialise le menu desktop
export function initMenuDesktop() {
    console.log('🚀 Démarrage de l\'initialisation du menu desktop');
    
    if (isInitialized) {
        console.log('⚠️ Le menu desktop est déjà initialisé');
        return;
    }

    initializeMenuStyles();

    console.log('🔍 Recherche des éléments du menu...');
    initializeMenuButtons();
    
    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (!menuWrapper) {
        console.log('❌ Menu wrapper non trouvé');
        return;
    }
    console.log('✅ Menu wrapper trouvé');

    menuConfig.forEach(menu => {
        const menuButton = getMenuButton(menu.buttonId);
        const menuContainer = document.querySelector(menu.containerSelector);

        if (!menuButton || !menuContainer) return;

        menuContainer.style.display = 'none';
        menuContainer.style.opacity = '0';

        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (isAnimating) return;

            if (menu.isOpen) {
                closeAllMenusAndWrapper(menuWrapper);
                disableClickOutsideCheck();
            } else {
                isAnimating = true;

                const tl = gsap.timeline({
                    onComplete: () => {
                        isAnimating = false;
                    }
                });

                if (!isWrapperOpen) {
                    menuWrapper.style.display = 'flex';
                    menuWrapper.style.height = 'auto';
                    console.log('🎯 Affichage du wrapper:', menuWrapper.style.display);
                    tl.to(menuWrapper, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    isWrapperOpen = true;
                    enableClickOutsideCheck(menuWrapper);
                    toggleBodyScroll(true);
                }

                menuConfig.forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        const otherContainer = document.querySelector(otherMenu.containerSelector);
                        const otherButton = getMenuButton(otherMenu.buttonId);
                        
                        if (otherContainer && isElementVisible(otherContainer)) {
                            console.log('🔒 Fermeture du menu:', otherMenu.containerSelector);
                            tl.to(otherContainer, {
                                width: 0,
                                opacity: 0,
                                duration: 0.4,
                                ease: "power2.inOut",
                                onComplete: () => {
                                    otherContainer.setAttribute('style', 'display: none !important; width: auto;');
                                    otherMenu.isOpen = false;
                                }
                            }, 0);
                        }

                        if (otherButton && isElementVisible(otherButton)) {
                            tl.to(otherButton, {
                                opacity: 0,
                                duration: 0.2,
                                ease: "power2.out"
                            }, 0);
                        }
                    }
                });

                // 2. Fermer tous les autres menus
                menuConfig.forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        const otherContainer = document.querySelector(otherMenu.containerSelector);
                        if (otherContainer && isElementVisible(otherContainer)) {
                            tl.to(otherContainer, {
                                opacity: 0,
                                duration: 0.2,
                                ease: "power2.inOut",
                                onComplete: () => {
                                    otherContainer.setAttribute('style', 'display: none !important;');
                                    otherMenu.isOpen = false;
                                }
                            }, 0);
                        }
                    }
                });

                // 3. Afficher le menu cliqué avec un petit délai
                const menuContainer = document.querySelector(menu.containerSelector);
                tl.to({}, {
                    duration: 0.1, // Petit délai avant d'afficher le nouveau menu
                    onComplete: () => {
                        menuContainer.setAttribute('style', 'display: flex !important; opacity: 0;');
                        tl.to(menuContainer, {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.inOut"
                        });
                    }
                }, ">0.1"); // Démarrer cette animation 0.1s après le début de la timeline

                menu.isOpen = true;
            }
        });
    });

    console.log('Menu Wrapper:', document.querySelector('.desktop_menu_wrapper'));
    console.log('Boutons de menu:', {
        parcs: document.getElementById('nav-link-desktop-parcs'),
        activites: document.getElementById('nav-link-desktop-activites'),
        offres: document.getElementById('nav-link-desktop-offres')
    });
    console.log('Conteneurs de menu:', {
        parcs: document.querySelector('.parc_menu_desktop'),
        activites: document.querySelector('.activites_menu_desktop'),
        offres: document.querySelector('.offres_menu_desktop')
    });

    isInitialized = true;
}
