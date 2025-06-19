// menu-desktop.js v4.0.0 - Stratégie "Ultra Patiente"
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v4.0.0 chargé - Stratégie "Ultra Patiente"');

class MenuDesktopManager {
    constructor() {
        // On ne stocke que les sélecteurs, pas les éléments eux-mêmes.
        this.triggerSelectors = {
            parcs: '[data-attribute="nav-link-desktop-parcs"]',
            activites: '[data-attribute="nav-link-desktop-activites"]',
            offres: '[data-attribute="nav-link-desktop-offres"]'
        };

        this.menuSelectors = {
            parcs: '.parc_menu_desktop',
            activites: '.activites_menu_desktop',
            offres: '.offres_menu_desktop'
        };
        
        this.background = this._createBackground();
        
        this.activeMenuKey = null;
        this.isAnimating = false;

        this._setupInitialStyles();
        this._setupEventListeners();
        console.log('✅ Menu Desktop "Ultra Patient" initialisé.');
    }
    
    _createBackground() {
        const bg = document.createElement('div');
        bg.className = 'menu-desktop-background';
        document.body.appendChild(bg);
        return bg;
    }

    _setupInitialStyles() {
        // On ne prépare que le fond, car les menus n'existent peut-être pas encore.
        window.gsap.set(this.background, { 
            display: 'none', 
            opacity: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100vh', 
            zIndex: 998 
        });
    }

    _setupEventListeners() {
        document.body.addEventListener('click', e => {
            if (this.isAnimating) return;

            // Trouver si un trigger a été cliqué en utilisant closest()
            const clickedTriggerKey = Object.keys(this.triggerSelectors).find(key => 
                e.target.closest(this.triggerSelectors[key])
            );

            if (clickedTriggerKey) {
                e.preventDefault();
                e.stopPropagation();
                this._toggleMenu(clickedTriggerKey);
                return;
            }

            // Gérer le clic à l'extérieur pour fermer le menu
            if (this.activeMenuKey) {
                const activeMenuElement = document.querySelector(this.menuSelectors[this.activeMenuKey]);
                
                // Si le menu actif est toujours dans le DOM
                if (activeMenuElement && !activeMenuElement.contains(e.target)) {
                    this._closeActiveMenu();
                }
            }
        });
    }

    _toggleMenu(key) {
        if (this.activeMenuKey === key) {
            this._closeActiveMenu();
        } else {
            // Ferme l'ancien menu instantanément s'il y en a un
            if (this.activeMenuKey) {
                const oldMenu = document.querySelector(this.menuSelectors[this.activeMenuKey]);
                if (oldMenu) window.gsap.set(oldMenu, { display: 'none', opacity: 0 });
            }
            this._openMenu(key);
        }
    }

    _openMenu(key) {
        // On cherche le menu SEULEMENT au moment du clic
        const menuToOpen = document.querySelector(this.menuSelectors[key]);
        
        if (!menuToOpen) {
            console.warn(`[MenuDesktop] Panneau "${this.menuSelectors[key]}" introuvable au moment du clic.`);
            return;
        }
        
        this.isAnimating = true;
        this.activeMenuKey = key;
        
        const tl = window.gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });

        tl.set(this.background, { display: 'block' })
          .set(menuToOpen, { display: 'block', opacity: 0, y: -10 }) // Préparation JIT
          .to(this.background, { opacity: 1, duration: 0.3 })
          .to(menuToOpen, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, "-=0.2");
    }

    _closeActiveMenu() {
        if (!this.activeMenuKey) return;

        const menuToClose = document.querySelector(this.menuSelectors[this.activeMenuKey]);
        const currentActiveMenuKey = this.activeMenuKey; // Sauvegarde de la clé
        this.activeMenuKey = null;

        if (!menuToClose) {
            // Si le menu n'est plus là, on ferme au moins le fond
            window.gsap.to(this.background, { opacity: 0, duration: 0.3, onComplete: () => {
                window.gsap.set(this.background, { display: 'none' });
            }});
            return;
        }

        this.isAnimating = true;

        const tl = window.gsap.timeline({
            onComplete: () => {
                this.isAnimating = false;
                window.gsap.set(this.background, { display: 'none' });
                window.gsap.set(menuToClose, { display: 'none' });
            }
        });
        
        tl.to(menuToClose, { opacity: 0, y: -10, duration: 0.2, ease: 'power1.in' })
          .to(this.background, { opacity: 0, duration: 0.3 }, "-=0.1");
    }
}

export function initMenuDesktop() {
    // On initialise directement, car l'écouteur est sur 'body' et n'a besoin d'aucun élément au départ.
    new MenuDesktopManager();
}
