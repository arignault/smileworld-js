// Version: 2.1.0 - Refactorisation pour plus de robustesse
import { gsap } from 'gsap';

const MENU_CONFIG = [
    { buttonId: 'nav-link-desktop-parcs', containerSelector: '.parc_menu_desktop' },
    { buttonId: 'nav-link-desktop-activites', containerSelector: '.activites_menu_desktop' },
    { buttonId: 'nav-link-desktop-offres', containerSelector: '.offres_menu_desktop' }
];

let isAnimating = false;
let currentOpenMenu = null;

function closeCurrentMenu(wrapper, onComplete = () => {}) {
    if (!currentOpenMenu || isAnimating) {
        if (onComplete) onComplete();
        return;
    }

    isAnimating = true;
    const menuToClose = currentOpenMenu;
    const containerToClose = document.querySelector(menuToClose.containerSelector);
    
    document.body.classList.remove('scroll-lock');
    wrapper.classList.remove('is-open');

    gsap.to(containerToClose, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
            containerToClose.classList.remove('is-open');
            isAnimating = false;
            currentOpenMenu = null;
            if (onComplete) onComplete();
        }
    });
}

function openMenu(menu, wrapper) {
    if (isAnimating) return;
    isAnimating = true;

    const container = document.querySelector(menu.containerSelector);
    if (!container) {
        console.error(`Conteneur de menu non trouvé pour ${menu.buttonId}`);
        isAnimating = false;
        return;
    }

    document.body.classList.add('scroll-lock');
    wrapper.classList.add('is-open');
    container.classList.add('is-open');
    
    gsap.fromTo(container, { opacity: 0 }, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
            isAnimating = false;
            currentOpenMenu = menu;
        }
    });
}

function handleClickOutside(event, wrapper) {
    if (isAnimating || !currentOpenMenu) return;

    const isClickOnButton = MENU_CONFIG.some(menu => document.getElementById(menu.buttonId)?.contains(event.target));
    const isClickInsideContainer = currentOpenMenu && document.querySelector(currentOpenMenu.containerSelector)?.contains(event.target);

    if (!isClickOnButton && !isClickInsideContainer) {
        closeCurrentMenu(wrapper);
    }
}

export function initMenuDesktop() {
    console.log('🚀 Initialisation du menu desktop (v2.1.0)');

    const menuWrapper = document.querySelector('.desktop_menu_wrapper');
    if (!menuWrapper) {
        console.error('❌ Menu wrapper (.desktop_menu_wrapper) non trouvé. Abandon.');
        return;
    }

    MENU_CONFIG.forEach(menuConf => {
        const button = document.getElementById(menuConf.buttonId);
        const container = document.querySelector(menuConf.containerSelector);

        if (!button) {
            console.warn(`Bouton de menu #${menuConf.buttonId} non trouvé.`);
            return;
        }
        if (!container) {
            console.warn(`Conteneur de menu ${menuConf.containerSelector} non trouvé.`);
            return;
        }

        // Cacher les conteneurs au départ
        container.classList.remove('is-open');
        gsap.set(container, { opacity: 0 });

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (isAnimating) return;

            // Si le menu cliqué est déjà ouvert, on le ferme.
            if (currentOpenMenu === menuConf) {
                closeCurrentMenu(menuWrapper);
            } else {
                // Sinon, on ferme l'ancien menu (s'il y en a un) puis on ouvre le nouveau.
                closeCurrentMenu(menuWrapper, () => {
                    openMenu(menuConf, menuWrapper);
                });
            }
        });
    });

    // Gestion du clic extérieur pour fermer le menu
    document.addEventListener('click', (e) => handleClickOutside(e, menuWrapper));

    console.log('✅ Menu desktop initialisé.');
}
