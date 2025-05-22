// Variables globales
let isInitialized = false;
let isWrapperOpen = false;
let isAnimating = false; // Nouveau flag pour éviter les animations simultanées

// Configuration des menus
const menuConfig = [
    {
        buttonSelector: '.nav_menu_item:has(button:contains("Nos Parcs"))',
        containerSelector: '.parc_menu_desktop',
        isOpen: false
    },
    {
        buttonSelector: '.nav_menu_item:has(button:contains("Activités"))',
        containerSelector: '.activites_menu_desktop',
        isOpen: false
    },
    {
        buttonSelector: '.nav_menu_item:has(button:contains("Offres"))',
        containerSelector: '.offres_menu_desktop',
        isOpen: false
    }
];

// Fonction pour obtenir le display calculé par Webflow
function getComputedDisplay(element) {
    if (!element) return 'none';
    return window.getComputedStyle(element).display;
}

// Fonction pour fermer tous les menus et le wrapper
function closeAllMenusAndWrapper(menuWrapper) {
    if (isAnimating) {
        console.log('⚠️ Animation en cours, fermeture ignorée');
        return;
    }

    isAnimating = true;
    console.log('🔄 Début de la fermeture...');

    try {
        // Créer une timeline pour l'animation de fermeture
        const tl = gsap.timeline({
            onComplete: () => {
                menuWrapper.style.display = 'none';
                isWrapperOpen = false;
                isAnimating = false;
                console.log('✅ Fermeture terminée');
            }
        });

        // Fermer tous les menus avec animation
        menuConfig.forEach(menu => {
            const menuButton = document.querySelector(menu.buttonSelector);
            const menuContainer = document.querySelector(menu.containerSelector);
            
            if (menuButton) {
                const navMenuItem = menuButton.closest('.nav_menu_item');
                if (navMenuItem) {
                    tl.to(navMenuItem, {
                        opacity: 0,
                        duration: 0.2,
                        ease: "power2.out"
                    }, 0);
                }
            }
            
            if (menuContainer) {
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

        // Animation du wrapper
        tl.to(menuWrapper, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        }, 0);

    } catch (error) {
        console.error('❌ Erreur lors de la fermeture:', error);
        isAnimating = false;
    }
}

// Fonction pour initialiser le menu desktop
export function initMenuDesktop() {
    // Éviter la double initialisation
    if (isInitialized) {
        console.log('⚠️ Menu desktop déjà initialisé');
        return;
    }

    console.log('🚀 Initialisation du menu desktop...');

    // Sélection du wrapper
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
        // Essayer différents sélecteurs
        const possibleSelectors = [
            menu.buttonSelector,
            `.nav_menu_item button:contains("${menu.buttonSelector.split(':contains("')[1].split('")')[0]}")`,
            `.nav_menu_item:has(button:contains("${menu.buttonSelector.split(':contains("')[1].split('")')[0]}"))`,
            `[data-nav-link-desktop-${menu.containerSelector.split('_')[0]}]`
        ];

        let menuButton = null;
        let usedSelector = '';

        for (const selector of possibleSelectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                menuButton = elements[0];
                usedSelector = selector;
                break;
            }
        }

        const menuContainer = document.querySelector(menu.containerSelector);

        console.log('🔍 Éléments trouvés pour', menu.containerSelector, ':', {
            menuButton: menuButton ? '✅' : '❌',
            menuContainer: menuContainer ? '✅' : '❌',
            usedSelector: usedSelector || 'Aucun sélecteur ne fonctionne'
        });

        // Vérification que les éléments existent
        if (!menuButton || !menuContainer) {
            console.warn('⚠️ Menu desktop: éléments non trouvés pour', menu.containerSelector);
            return;
        }

        // Stockage du display original
        const originalDisplay = getComputedDisplay(menuContainer);
        console.log('📝 Display original du menu:', originalDisplay);

        // Fermer le menu au démarrage
        menuContainer.style.display = 'none';
        menuContainer.style.opacity = '0';
        console.log('🔒 Menu fermé au démarrage:', menu.containerSelector);

        // Ajout de l'écouteur d'événement sur le bouton
        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (isAnimating) {
                console.log('⚠️ Animation en cours, clic ignoré');
                return;
            }

            console.log('🖱️ Clic sur le bouton du menu:', menu.containerSelector);
            
            if (menu.isOpen) {
                // Si le menu est déjà ouvert, tout fermer
                closeAllMenusAndWrapper(menuWrapper);
            } else {
                isAnimating = true;
                console.log('🔄 Début de l\'ouverture...');

                try {
                    // Créer une timeline pour l'animation d'ouverture
                    const tl = gsap.timeline({
                        onComplete: () => {
                            isAnimating = false;
                            console.log('✅ Ouverture terminée');
                        }
                    });

                    // Ouvrir le wrapper si c'est le premier clic
                    if (!isWrapperOpen) {
                        menuWrapper.style.display = 'flex';
                        tl.to(menuWrapper, {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        isWrapperOpen = true;
                    }
                    
                    // Fermer tous les autres menus
                    menuConfig.forEach(otherMenu => {
                        if (otherMenu !== menu) {
                            const otherContainer = document.querySelector(otherMenu.containerSelector);
                            const otherButton = document.querySelector(otherMenu.buttonSelector);
                            
                            if (otherContainer) {
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
                    
                    // Ouvrir le menu cliqué
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

    // Fermeture du wrapper et des menus au clic en dehors
    document.addEventListener('click', (e) => {
        if (isAnimating) return;

        const isClickOutside = !menuConfig.some(menu => 
            e.target.closest(menu.buttonSelector) || 
            e.target.closest(menu.containerSelector)
        ) && !e.target.closest('.desktop_menu_wrapper');
        
        if (isClickOutside && isWrapperOpen) {
            closeAllMenusAndWrapper(menuWrapper);
        }
    });

    isInitialized = true;
    console.log('✅ Initialisation du menu desktop terminée');
}

// Suppression de l'auto-initialisation pour éviter la double initialisation
// L'initialisation se fait maintenant uniquement via main_gsap.js
