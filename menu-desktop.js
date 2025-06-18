// Version: 2.0.0 - Refactorisation avec classes CSS
import { gsap } from 'gsap';

// Variables globales
let isInitialized = false;
let isWrapperOpen = false;
let isAnimating = false;
let menuButtons = new Map();
let clickOutsideListener = null;
let originalBodyStyle = '';
let openMenu = null;

// Configuration des menus
const menuConfig = [
    { buttonId: 'nav-link-desktop-parcs', containerSelector: '.parc_menu_desktop' },
    { buttonId: 'nav-link-desktop-activites', containerSelector: '.activites_menu_desktop' },
    { buttonId: 'nav-link-desktop-offres', containerSelector: '.offres_menu_desktop' }
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
function closeAllMenus(menuWrapper) {
    if (isAnimating) return;
    isAnimating = true;
    
    document.body.classList.remove('scroll-lock');
    menuWrapper.classList.remove('is-open');

    const openContainers = menuConfig
        .map(menu => document.querySelector(menu.containerSelector))
        .filter(container => container && container.classList.contains('is-open'));
        
    gsap.to(openContainers, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
            openContainers.forEach(c => c.classList.remove('is-open'));
            isAnimating = false;
            openMenu = null;
        }
    });
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
            closeAllMenus(menuWrapper);
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

            if (openMenu === menu) {
                closeAllMenus(menuWrapper);
            } else {
                openMenuContainer(menu, menuWrapper);
            }
        });
    });

    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (!menuWrapper.contains(e.target) && openMenu) {
            closeAllMenus(menuWrapper);
        }
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

function openMenuContainer(menu, menuWrapper) {
    if (isAnimating) return;
    isAnimating = true;

    // Fermer les autres menus d'abord
    const otherMenus = menuConfig.filter(m => m !== menu);
    otherMenus.forEach(m => {
        const container = document.querySelector(m.containerSelector);
        if(container) container.classList.remove('is-open');
    });

    const targetContainer = document.querySelector(menu.containerSelector);
    if (!targetContainer) {
        isAnimating = false;
        return;
    }

    document.body.classList.add('scroll-lock');
    menuWrapper.classList.add('is-open');
    targetContainer.classList.add('is-open');

    gsap.fromTo(targetContainer, 
        { opacity: 0 },
        {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
                isAnimating = false;
                openMenu = menu;
            }
        }
    );
}
