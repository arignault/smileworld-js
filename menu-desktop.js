// Variables globales
let isInitialized = false;
let isWrapperOpen = false;
let isAnimating = false; // Nouveau flag pour éviter les animations simultanées

// Configuration des menus avec des sélecteurs plus robustes
const menuConfig = [
    {
        buttonSelector: '[data-nav-link-desktop-parc]',
        containerSelector: '.parc_menu_desktop',
        isOpen: false
    },
    {
        buttonSelector: '[data-nav-link-desktop-activites]',
        containerSelector: '.activites_menu_desktop',
        isOpen: false
    },
    {
        buttonSelector: '[data-nav-link-desktop-offres]',
        containerSelector: '.offres_menu_desktop',
        isOpen: false
    }
];

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
            const menuButton = document.querySelector(menu.buttonSelector);
            const menuContainer = document.querySelector(menu.containerSelector);
            
            if (menuButton && isElementVisible(menuButton)) {
                const navMenuItem = menuButton.closest('.nav_menu_item');
                if (navMenuItem) {
                    tl.to(navMenuItem, {
                        opacity: 0,
                        duration: 0.2,
                        ease: "power2.out"
                    }, 0);
                }
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

// Fonction pour initialiser le menu desktop
export function initMenuDesktop() {
    if (isInitialized) {
        console.log('⚠️ Menu desktop déjà initialisé');
        return;
    }

    console.log('🚀 Initialisation du menu desktop...');

    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (!menuWrapper) {
        console.warn('⚠️ Menu wrapper non trouvé');
        return;
    }

    // Debug des sélecteurs
    console.log('🔍 Recherche des éléments...');
    
    // Afficher tous les éléments de menu pour le débogage
    const allMenuItems = document.querySelectorAll('.nav_menu_item');
    console.log('Tous les éléments nav_menu_item:', allMenuItems.length);
    allMenuItems.forEach((item, index) => {
        console.log(`Menu item ${index + 1}:`, {
            classes: item.className,
            html: item.innerHTML,
            buttons: item.querySelectorAll('button'),
            links: item.querySelectorAll('a')
        });
    });

    // Initialisation de chaque menu
    menuConfig.forEach(menu => {
        const menuButton = document.querySelector(menu.buttonSelector);
        const menuContainer = document.querySelector(menu.containerSelector);

        if (!menuButton || !menuContainer) {
            console.warn(`⚠️ Menu desktop: éléments non trouvés pour ${menu.containerSelector}`);
            return;
        }

        // Fermer le menu au démarrage
        menuContainer.style.display = 'none';
        menuContainer.style.opacity = '0';
        console.log('🔒 Menu fermé au démarrage:', menu.containerSelector);

        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (isAnimating) {
                console.log('⚠️ Animation en cours, clic ignoré');
                return;
            }

            console.log('🖱️ Clic sur le bouton du menu:', menu.containerSelector);
            
            if (menu.isOpen) {
                closeAllMenusAndWrapper(menuWrapper);
            } else {
                isAnimating = true;
                console.log('🔄 Début de l\'ouverture...');

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
                    }

                    menuConfig.forEach(otherMenu => {
                        if (otherMenu !== menu) {
                            const otherContainer = document.querySelector(otherMenu.containerSelector);
                            const otherButton = document.querySelector(otherMenu.buttonSelector);
                            
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
                            
                            if (otherButton) {
                                const otherNavMenuItem = otherButton.closest('.nav_menu_item');
                                if (otherNavMenuItem) {
                                    tl.to(otherNavMenuItem, {
                                        opacity: 0,
                                        duration: 0.2,
                                        ease: "power2.out"
                                    }, 0);
                                    otherNavMenuItem.classList.remove('active');
                                }
                            }
                        }
                    });

                    menuContainer.style.display = 'block';
                    tl.to(menuContainer, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                    const navMenuItem = menuButton.closest('.nav_menu_item');
                    if (navMenuItem) {
                        tl.to(navMenuItem, {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        navMenuItem.classList.add('active');
                    }

                    menu.isOpen = true;

                } catch (error) {
                    console.error('❌ Erreur lors de l\'ouverture:', error);
                    isAnimating = false;
                }
            }
        });
    });

    // Fermeture au clic en dehors avec vérification de visibilité
    document.addEventListener('click', (e) => {
        if (isAnimating) return;

        const isClickOutside = !menuConfig.some(menu => {
            const button = document.querySelector(menu.buttonSelector);
            const container = document.querySelector(menu.containerSelector);
            return (button && e.target.closest(menu.buttonSelector)) || 
                   (container && e.target.closest(menu.containerSelector));
        }) && !e.target.closest('.desktop_menu_wrapper');
        
        if (isClickOutside && isWrapperOpen && isElementVisible(menuWrapper)) {
            closeAllMenusAndWrapper(menuWrapper);
        }
    });

    isInitialized = true;
    console.log('✅ Initialisation du menu desktop terminée');
}

// Suppression de l'auto-initialisation pour éviter la double initialisation
// L'initialisation se fait maintenant uniquement via main_gsap.js
