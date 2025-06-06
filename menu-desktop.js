// Version: 1.1.0 - Removed console logs for cleaner execution
console.log('🚀 menu-desktop.js v1.1.0 chargé');

// Variables globales
let isInitialized = false;
let isAnimating = false;
let clickOutsideListener = null;

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

// Fonction pour fermer tous les menus
function closeAllMenus(menuWrapper, onComplete = () => {}) {
    if (isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(menuWrapper, { display: 'none' });
            menuConfig.forEach(menu => menu.isOpen = false);
            disableClickOutsideCheck();
            isAnimating = false;
            onComplete();
        }
    });

    tl.to([menuWrapper, ...document.querySelectorAll('.parc_menu_desktop, .activites_menu_desktop, .offres_menu_desktop')], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
    });
}

// Fonction pour activer la vérification des clics en dehors
function enableClickOutsideCheck(menuWrapper) {
    if (clickOutsideListener) return;
    clickOutsideListener = (e) => {
        if (isAnimating) return;
        
        const isClickInside = e.target.closest('.desktop_menu_wrapper') || menuConfig.some(menu => e.target.closest(`#${menu.buttonId}`));
        
        if (!isClickInside) {
            closeAllMenus(menuWrapper);
        }
    };
    document.addEventListener('click', clickOutsideListener, true);
}

// Fonction pour désactiver la vérification des clics en dehors
function disableClickOutsideCheck() {
    if (clickOutsideListener) {
        document.removeEventListener('click', clickOutsideListener, true);
        clickOutsideListener = null;
    }
}

// Fonction pour initialiser le menu desktop
export function initMenuDesktop() {
    if (isInitialized) return;
    isInitialized = true;

    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (!menuWrapper) {
        console.warn('⚠️ Menu desktop wrapper not found');
        return;
    }

    menuConfig.forEach(menu => {
        const menuButton = document.getElementById(menu.buttonId);
        const menuContainer = document.querySelector(menu.containerSelector);

        if (!menuButton || !menuContainer) {
            console.warn(`⚠️ Menu desktop elements not found for ${menu.containerSelector}`);
            return;
        }

        gsap.set(menuContainer, { opacity: 0, display: 'none' });

        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (menu.isOpen) {
                closeAllMenus(menuWrapper);
            } else {
                openMenu(menu, menuContainer, menuWrapper);
            }
        });
    });

    console.log('✅ Menu desktop initialisé.');
}

// Fonction pour obtenir le display calculé par Webflow
function getComputedDisplay(element) {
    return element ? window.getComputedStyle(element).display : 'none';
}

// Fonction pour ouvrir un menu
function openMenu(menu, menuContainer, menuWrapper) {
    if (isAnimating) return;
    isAnimating = true;

    // First, close any other open menus
    const otherOpenMenus = menuConfig.filter(m => m.isOpen && m !== menu);
    const closePromises = otherOpenMenus.map(m => {
        const container = document.querySelector(m.containerSelector);
        if (container) {
            return new Promise(resolve => {
                gsap.to(container, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.set(container, { display: 'none' });
                        m.isOpen = false;
                        resolve();
                    }
                });
            });
        }
        return Promise.resolve();
    });

    Promise.all(closePromises).then(() => {
        // Now open the target menu
        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
            }
        });

        // Ensure wrapper is visible
        if (window.getComputedStyle(menuWrapper).display === 'none') {
            gsap.set(menuWrapper, { display: 'flex' });
            tl.to(menuWrapper, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
        }

        gsap.set(menuContainer, { display: getComputedDisplay(menuContainer) });
        tl.to(menuContainer, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0);
        
        menu.isOpen = true;
        enableClickOutsideCheck(menuWrapper);
    });
}

