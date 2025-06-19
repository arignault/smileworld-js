// Version: 2.0.0 - Refactorisation avec classes CSS et simplification
// import { gsap } from 'gsap';

console.log('🚀 menu-mobile.js v1.2.0 chargé');

// Sélecteurs
const SELECTORS = {
    MENU_BUTTON: '#hamburger-menu',
    MAIN_MENU: '#main-menu-mobile',
    PARC_MENU: '#parc-menu-mobile',
    ACTIVITE_MENU: '#activite-menu-mobile',
    OFFRES_MENU: '#offres-menu-mobile',
    ALL_MENUS: '#main-menu-mobile, #parc-menu-mobile, #activite-menu-mobile, #offres-menu-mobile',
    SUB_MENU_TRIGGERS: {
        '#parcs-nav_button_mobile': '#parc-menu-mobile',
        '#activites-nav_button_mobile': '#activite-menu-mobile',
        '#formules-nav_button_mobile': '#offres-menu-mobile',
    },
    CLOSE_BUTTONS: '.button-close',
    BACK_BUTTONS: '.button-back-menu'
};

let menuButton;
let hamburgerTimeline;
let scrollPosition = 0;

// Fonctions de gestion du scroll
function disableScroll() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPosition}px`;
}

function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
}

// Fonctions d'animation des menus
function animateMenuOpen(menu) {
    if (!menu) return;
    menu.classList.add('is-open');
    hamburgerTimeline.fromTo(menu, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power2.out' });
}

function animateMenuClose(menu, onComplete) {
    if (!menu) return;
    hamburgerTimeline.to(menu, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            menu.classList.remove('is-open');
            if (onComplete) onComplete();
        }
    });
}

function closeAllMenus() {
    document.querySelectorAll(SELECTORS.ALL_MENUS).forEach(menu => {
        if(menu.classList.contains('is-open')) {
            animateMenuClose(menu);
        }
    });
    hamburgerTimeline.reverse();
    enableScroll();
}

function openMainMenu() {
    closeAllMenus();
    const mainMenu = document.querySelector(SELECTORS.MAIN_MENU);
    animateMenuOpen(mainMenu);
    hamburgerTimeline.play();
    disableScroll();
}

function openSubMenu(selector) {
    const mainMenu = document.querySelector(SELECTORS.MAIN_MENU);
    const subMenu = document.querySelector(selector);
    
    animateMenuClose(mainMenu);
    animateMenuOpen(subMenu);
}

function backToMainMenu() {
    const openSubMenu = document.querySelector('.is-open:not(#main-menu-mobile)');
    const mainMenu = document.querySelector(SELECTORS.MAIN_MENU);
    
    if (openSubMenu) {
        animateMenuClose(openSubMenu);
    }
    animateMenuOpen(mainMenu);
}


export function initMenuMobile() {
    menuButton = document.querySelector(SELECTORS.MENU_BUTTON);
    if (!menuButton) return;

    // Initialisation de la timeline du hamburger
    hamburgerTimeline = window.gsap.timeline({ paused: true })
        .to(menuButton, { rotation: 90, duration: 0.4, ease: "elastic.out(1, 0.5)" });

    // Clic sur le bouton hamburger
    menuButton.addEventListener('click', () => {
        const anyMenuOpen = document.querySelector(SELECTORS.ALL_MENUS + '.is-open');
        if (anyMenuOpen) {
            closeAllMenus();
        } else {
            openMainMenu();
        }
    });

    // Clic sur les triggers de sous-menu
    for (const trigger in SELECTORS.SUB_MENU_TRIGGERS) {
        document.querySelector(trigger)?.addEventListener('click', () => {
            openSubMenu(SELECTORS.SUB_MENU_TRIGGERS[trigger]);
        });
    }
    
    // Clic sur les boutons de fermeture
    document.querySelectorAll(SELECTORS.CLOSE_BUTTONS).forEach(btn => {
        btn.addEventListener('click', closeAllMenus);
    });

    // Clic sur les boutons retour
    document.querySelectorAll(SELECTORS.BACK_BUTTONS).forEach(btn => {
        btn.addEventListener('click', backToMainMenu);
    });

    console.log('✅ Écouteurs d\'événements pour le menu mobile configurés');
}
  
  
  
  