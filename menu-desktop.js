// menu-desktop.js v2.3.0 - Utilise la délégation d'événements
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v2.3.0 chargé');

class MenuDesktop {
    constructor() {
        this.elements = {
            wrapper: document.querySelector('.desktop_menu_wrapper'),
            parcs: document.querySelector('.parc_menu_desktop'),
            activites: document.querySelector('.activites_menu_desktop'),
            offres: document.querySelector('.offres_menu_desktop')
        };
        this.navBar = document.querySelector('.w-nav'); // Le conteneur parent fiable
        this.currentMenu = null;
        this.currentTimeline = null;
        this.leaveTimeout = null;

        if (!this.navBar || !this.elements.wrapper) {
            console.error('[MenuDesktop] Barre de navigation (.w-nav) ou wrapper (.desktop_menu_wrapper) introuvable. Initialisation annulée.');
            return;
        }

        this._setupEventListeners();
        console.log('✅ Menu Desktop initialisé avec la délégation d\'événements.');
    }

    _setupEventListeners() {
        // Utilise mouseover qui "bulle" (bubble) contrairement à mouseenter
        this.navBar.addEventListener('mouseover', e => {
            const trigger = e.target.closest('[data-menu-target]');
            if (trigger) {
                this._handleMenuEnter(trigger);
            }
        });

        this.elements.wrapper.addEventListener('mouseleave', this._handleMenuLeave.bind(this));
    }

    _handleMenuEnter(trigger) {
        clearTimeout(this.leaveTimeout); // Annule toute fermeture en cours
        const menuKey = trigger.dataset.menuTarget;

        // Si on survole déjà le bon trigger, ne rien faire
        if (this.currentMenu && this.currentMenu === this.elements[menuKey]) {
            return;
        }
        
        // Fermer le menu précédent avant d'en ouvrir un nouveau
        if (this.currentMenu) {
            this._animateMenuClose(false); // Fermeture rapide sans cacher le fond
        }
        
        this._animateMenuOpen(menuKey);
    }

    _handleMenuLeave() {
        this.leaveTimeout = setTimeout(() => {
            this._animateMenuClose(true); // Fermeture complète
        }, 50);
    }
    
    _animateMenuClose(hideWrapper) {
        console.log('🎬 Animation de fermeture du menu', this.currentMenu);
        if (this.currentMenu) {
            const menuContent = this.currentMenu.querySelector('.menu-desktop-content');
            
            if (this.currentTimeline && this.currentTimeline.isActive()) {
                this.currentTimeline.kill();
            }

            this.currentTimeline = window.gsap.timeline({
                onComplete: () => {
                    this.currentMenu.classList.remove('is-active');
                    if (hideWrapper) {
                        this.elements.wrapper.classList.remove('is-active');
                    }
                    this.currentMenu = null;
                }
            });
            
            this.currentTimeline.to(menuContent, {
                opacity: 0,
                duration: 0.2,
                ease: 'power1.in'
            });
        }
    }

    _animateMenuOpen(menuKey) {
        if (!this.elements[menuKey]) return;

        this.currentMenu = this.elements[menuKey];
        const menuContent = this.currentMenu.querySelector('.menu-desktop-content');
        
        console.log('🎬 Animation d\'ouverture du menu', this.currentMenu);
        
        if (this.currentTimeline && this.currentTimeline.isActive()) {
            this.currentTimeline.kill();
        }

        this.elements.wrapper.classList.add('is-active');
        
        // S'assurer que les autres menus sont bien cachés
        ['parcs', 'activites', 'offres'].forEach(key => {
            if (key !== menuKey && this.elements[key]) {
                this.elements[key].classList.remove('is-active');
                 const content = this.elements[key].querySelector('.menu-desktop-content');
                 if(content) window.gsap.set(content, {opacity: 0});
            }
        });
        
        this.currentMenu.classList.add('is-active');
        
        this.currentTimeline = window.gsap.from(menuContent, {
            opacity: 0,
            y: '-10px',
            duration: 0.3,
            ease: 'power2.out'
        });
    }
}

let menuInitAttempts = 0;
const MAX_MENU_INIT_ATTEMPTS = 50; // Attend max 5 secondes

function tryToInitMenu() {
    if (document.querySelector('.desktop_menu_wrapper')) {
        console.log('✅ .desktop_menu_wrapper trouvé. Initialisation du menu desktop.');
        new MenuDesktop();
    } else {
        menuInitAttempts++;
        if (menuInitAttempts < MAX_MENU_INIT_ATTEMPTS) {
            console.log(`[MenuDesktop] Wrapper non trouvé, nouvelle tentative dans 100ms (${menuInitAttempts}/${MAX_MENU_INIT_ATTEMPTS})`);
            setTimeout(tryToInitMenu, 100);
        } else {
            console.error('[MenuDesktop] Initialisation annulée après 5 secondes. .desktop_menu_wrapper introuvable.');
        }
    }
}

export function initMenuDesktop() {
    tryToInitMenu();
}
