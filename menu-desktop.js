// Version: 1.0.3 - Optimisation de la gestion des clics en dehors
console.log('🚀 menu-desktop.js v1.0.3 chargé et oh');

// Variables globales
let isInitialized = false;
let isWrapperOpen = false;
let isAnimating = false;
let menuButtons = new Map(); // Stockage des boutons
let clickOutsideListener = null; // Référence au listener de clic en dehors

// Configuration des menus avec les IDs des boutons
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

// Fonction pour initialiser les boutons une seule fois
function initializeMenuButtons() {
    console.log('🔍 Initialisation des boutons de menu...');
    menuConfig.forEach(menu => {
        const button = document.getElementById(menu.buttonId);
        if (button) {
            menuButtons.set(menu.buttonId, button);
            console.log(`✅ Bouton initialisé pour l'ID: ${menu.buttonId}`);
        } else {
            console.log(`❌ Bouton non trouvé pour l'ID: ${menu.buttonId}`);
        }
    });
}

// Fonction pour obtenir un bouton (utilise le cache)
function getMenuButton(buttonId) {
    return menuButtons.get(buttonId);
}

// Fonction pour vérifier si un élément est visible dans le DOM
function isElementVisible(element) {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

// Fonction pour obtenir le display calculé par Webflow
function getComputedDisplay(element) {
    if (!element) return 'none';
    return window.getComputedStyle(element).display;
}

// Fonction pour fermer tous les menus et le wrapper
function closeAllMenusAndWrapper(menuWrapper) {
    if (!menuWrapper || isAnimating) {
        console.log('⚠️ Animation en cours ou wrapper invalide, fermeture ignorée');
        return;
    }

    isAnimating = true;
    console.log('🔄 Début de la fermeture...');

    try {
        const tl = gsap.timeline({
            onComplete: () => {
                if (menuWrapper) {
                    menuWrapper.style.display = 'none';
                }
                isWrapperOpen = false;
                isAnimating = false;
                console.log('✅ Fermeture terminée');
            }
        });

        menuConfig.forEach(menu => {
            const menuButton = getMenuButton(menu.buttonId);
            const menuContainer = document.querySelector(menu.containerSelector);
            
            if (menuButton && isElementVisible(menuButton)) {
                tl.to(menuButton, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out"
                }, 0);
            }
            
            if (menuContainer && isElementVisible(menuContainer)) {
                tl.to(menuContainer, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out",
                    onComplete: () => {
                        menuContainer.style.display = 'none';
                        menu.isOpen = false;
                    }
                }, 0);
            }
        });

        if (isElementVisible(menuWrapper)) {
            tl.to(menuWrapper, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            }, 0);
        }

    } catch (error) {
        console.error('❌ Erreur lors de la fermeture:', error);
        isAnimating = false;
    }
}

// Fonction pour activer la vérification des clics en dehors
function enableClickOutsideCheck(menuWrapper) {
    // Supprimer l'ancien listener s'il existe
    if (clickOutsideListener) {
        document.removeEventListener('click', clickOutsideListener);
    }

    // Créer et stocker le nouveau listener
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
            // Désactiver la vérification une fois le menu fermé
            disableClickOutsideCheck();
        }
    };

    document.addEventListener('click', clickOutsideListener);
    console.log('🔍 Vérification des clics en dehors activée');
}

// Fonction pour désactiver la vérification des clics en dehors
function disableClickOutsideCheck() {
    if (clickOutsideListener) {
        document.removeEventListener('click', clickOutsideListener);
        clickOutsideListener = null;
        console.log('🔒 Vérification des clics en dehors désactivée');
    }
}

// Fonction pour initialiser le menu desktop
export function initMenuDesktop() {
    if (isInitialized) {
        console.log('⚠️ Menu desktop déjà initialisé');
        return;
    }

    console.log('🚀 Initialisation du menu desktop...');

    // Initialiser les boutons une seule fois
    initializeMenuButtons();

    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (!menuWrapper) {
        console.warn('⚠️ Menu wrapper non trouvé');
        return;
    }

    // Initialisation de chaque menu
    menuConfig.forEach(menu => {
        console.log(`\n🔍 Initialisation du menu: ${menu.containerSelector}`);
        
        const menuButton = getMenuButton(menu.buttonId);
        const menuContainer = document.querySelector(menu.containerSelector);

        if (!menuButton || !menuContainer) {
            console.warn(`⚠️ Menu desktop: éléments non trouvés pour ${menu.containerSelector}`);
            return;
        }

        // Fermer le menu au démarrage
        menuContainer.style.display = 'none';
        menuContainer.style.opacity = '0';
        console.log(`🔒 Menu fermé au démarrage: ${menu.containerSelector}`);

        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (isAnimating) {
                console.log('⚠️ Animation en cours, clic ignoré');
                return;
            }

            console.log(`🖱️ Clic sur le bouton du menu: ${menu.containerSelector}`);

            if (menu.isOpen) {
                closeAllMenusAndWrapper(menuWrapper);
                disableClickOutsideCheck();
            } else {
                isAnimating = true;

                try {
                    const tl = gsap.timeline({
                        onComplete: () => {
                            isAnimating = false;
                            console.log('✅ Ouverture terminée');
                        }
                    });

                    if (!isWrapperOpen) {
                        menuWrapper.style.display = 'flex';
                        tl.to(menuWrapper, {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        isWrapperOpen = true;
                        console.log('🔓 Wrapper ouvert');
                        // Activer la vérification des clics en dehors uniquement quand un menu est ouvert
                        enableClickOutsideCheck(menuWrapper);
                    }

                    menuConfig.forEach(otherMenu => {
                        if (otherMenu !== menu) {
                            const otherContainer = document.querySelector(otherMenu.containerSelector);
                            const otherButton = getMenuButton(otherMenu.buttonId);
                            
                            if (otherContainer && isElementVisible(otherContainer)) {
                                tl.to(otherContainer, {
                                    opacity: 0,
                                    duration: 0.2,
                                    ease: "power2.out",
                                    onComplete: () => {
                                        otherContainer.style.display = 'none';
                                        otherMenu.isOpen = false;
                                    }
                                }, 0);
                                console.log(`🔒 Menu fermé: ${otherMenu.containerSelector}`);
                            }
                            
                            if (otherButton) {
                                tl.to(otherButton, {
                                    opacity: 0,
                                    duration: 0.2,
                                    ease: "power2.out"
                                }, 0);
                            }
                        }
                    });

                    menuContainer.style.display = 'block';
                    tl.to(menuContainer, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                    tl.to(menuButton, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                    menu.isOpen = true;
                    console.log(`🔓 Menu ouvert: ${menu.containerSelector}`);

                } catch (error) {
                    console.error('❌ Erreur lors de l\'ouverture:', error);
                    isAnimating = false;
                }
            }
        });
    });

    isInitialized = true;
    console.log('✅ Initialisation du menu desktop terminée');
}

// Suppression de l'auto-initialisation pour éviter la double initialisation
// L'initialisation se fait maintenant uniquement via main_gsap.js
