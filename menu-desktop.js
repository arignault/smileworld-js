// Version: 1.0.6 - Nettoyage du code

// Variables globales
let isInitialized = false;
let isWrapperOpen = false;
let isAnimating = false;
let menuButtons = new Map();
let clickOutsideListener = null;

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

// Initialise les boutons de menu
function initializeMenuButtons() {
    menuConfig.forEach(menu => {
        const button = document.getElementById(menu.buttonId);
        if (button) {
            menuButtons.set(menu.buttonId, button);
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
                menuWrapper.style.display = 'none';
            }
            isWrapperOpen = false;
            isAnimating = false;
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

// Initialise le menu desktop
export function initMenuDesktop() {
    if (isInitialized) return;

    initializeMenuButtons();
    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (!menuWrapper) return;

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
                    tl.to(menuWrapper, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    isWrapperOpen = true;
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

                menuContainer.style.display = getComputedDisplay(menuContainer) || 'flex';
                tl.to(menuContainer, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                if (menuButton) {
                    tl.to(menuButton, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    }, '-=0.3');
                }

                menu.isOpen = true;
            }
        });
    });

    isInitialized = true;
}
