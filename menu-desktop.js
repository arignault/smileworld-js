// Variables globales
let isInitialized = false;
let isWrapperOpen = false;

// Configuration des menus
const menuConfig = [
    {
        buttonSelector: '[data-attribute="nav-link-desktop-parcs"]',
        containerSelector: '.parc_menu_desktop',
        isOpen: false
    },
    {
        buttonSelector: '[data-attribute="nav-link-desktop-activites"]',
        containerSelector: '.activites_menu_desktop',
        isOpen: false
    },
    {
        buttonSelector: '[data-attribute="nav-link-desktop-offres"]',
        containerSelector: '.offres_menu_desktop',
        isOpen: false
    }
];

// Fonction pour obtenir le display calculé par Webflow
function getComputedDisplay(element) {
    return window.getComputedStyle(element).display;
}

// Fonction pour fermer tous les menus et le wrapper
function closeAllMenusAndWrapper(menuWrapper) {
    menuWrapper.style.display = 'none';
    isWrapperOpen = false;
    console.log('🔒 Wrapper fermé');

    // Retirer la classe active de tous les boutons
    menuConfig.forEach(menu => {
        const menuButton = document.querySelector(menu.buttonSelector);
        if (menuButton) {
            const navMenuItem = menuButton.closest('.nav_menu_item');
            if (navMenuItem) {
                navMenuItem.classList.remove('active');
            }
        }
        const menuContainer = document.querySelector(menu.containerSelector);
        if (menuContainer) {
            menuContainer.style.display = 'none';
            menu.isOpen = false;
            console.log('🔒 Menu fermé:', menu.containerSelector);
        }
    });
}

// Fonction pour initialiser le menu desktop
export function initMenuDesktop() {
    // Éviter la double initialisation
    if (isInitialized) {
        console.log('⚠️ Menu desktop déjà initialisé');
        return;
    }
    isInitialized = true;

    console.log('🚀 Initialisation du menu desktop...');

    // Sélection du wrapper
    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (!menuWrapper) {
        console.warn('⚠️ Menu wrapper non trouvé');
        return;
    }

    // Fermer le wrapper au démarrage
    menuWrapper.style.display = 'none';
    console.log('🔒 Wrapper fermé au démarrage');

    // Debug des sélecteurs
    console.log('🔍 Recherche des éléments...');
    console.log('Tous les éléments avec data-nav-link-desktop-parcs:', document.querySelectorAll('[data-nav-link-desktop-parcs]'));
    console.log('Tous les éléments avec data-nav-link:', document.querySelectorAll('[data-nav-link]'));
    console.log('Tous les éléments avec data-nav:', document.querySelectorAll('[data-nav]'));

    // Initialisation de chaque menu
    menuConfig.forEach(menu => {
        const menuButton = document.querySelector(menu.buttonSelector);
        const menuContainer = document.querySelector(menu.containerSelector);

        console.log('🔍 Éléments trouvés pour', menu.containerSelector, ':', {
            menuButton: menuButton ? '✅' : '❌',
            menuContainer: menuContainer ? '✅' : '❌'
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
        console.log('🔒 Menu fermé au démarrage:', menu.containerSelector);

        // Ajout de l'écouteur d'événement sur le bouton
        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Clic sur le bouton du menu:', menu.containerSelector);
            
            if (menu.isOpen) {
                // Si le menu est déjà ouvert, tout fermer
                closeAllMenusAndWrapper(menuWrapper);
            } else {
                // Ouvrir le wrapper si c'est le premier clic
                if (!isWrapperOpen) {
                    menuWrapper.style.display = 'flex';
                    isWrapperOpen = true;
                    console.log('🔓 Wrapper ouvert');
                }
                
                // Fermer tous les autres menus et retirer leurs classes active
                menuConfig.forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        const otherContainer = document.querySelector(otherMenu.containerSelector);
                        const otherButton = document.querySelector(otherMenu.buttonSelector);
                        if (otherContainer) {
                            otherContainer.style.display = 'none';
                            otherMenu.isOpen = false;
                            console.log('🔒 Menu fermé:', otherMenu.containerSelector);
                        }
                        if (otherButton) {
                            const otherNavMenuItem = otherButton.closest('.nav_menu_item');
                            if (otherNavMenuItem) {
                                otherNavMenuItem.classList.remove('active');
                            }
                        }
                    }
                });
                
                // Ouvrir le menu cliqué et ajouter la classe active au nav_menu_item
                menuContainer.style.display = 'block';
                menu.isOpen = true;
                const navMenuItem = menuButton.closest('.nav_menu_item');
                if (navMenuItem) {
                    navMenuItem.classList.add('active');
                }
                console.log('🔓 Menu ouvert:', menu.containerSelector);
            }
        });
    });

    // Fermeture du wrapper et des menus au clic en dehors
    document.addEventListener('click', (e) => {
        const isClickOutside = !menuConfig.some(menu => 
            e.target.closest(menu.buttonSelector) || 
            e.target.closest(menu.containerSelector)
        ) && !e.target.closest('.desktop_menu_wrapper');
        
        if (isClickOutside && isWrapperOpen) {
            closeAllMenusAndWrapper(menuWrapper);
        }
    });

    console.log('✅ Initialisation du menu desktop terminée');
}

// Initialisation au chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuDesktop);
} else {
    initMenuDesktop();
}
