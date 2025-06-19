// menu-desktop.js v3.0.0 - "Chef d'Orchestre" au clic
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v3.0.0 chargé - Stratégie "Chef d\'Orchestre"');

class MenuDesktopManager {
    constructor() {
        this.triggers = {
            parcs: document.querySelector('[data-attribute="nav-link-desktop-parcs"]'),
            activites: document.querySelector('[data-attribute="nav-link-desktop-activites"]'),
            offres: document.querySelector('[data-attribute="nav-link-desktop-offres"]')
        };

        this.menus = {
            parcs: document.querySelector('.parc_menu_desktop'),
            activites: document.querySelector('.activites_menu_desktop'),
            offres: document.querySelector('.offres_menu_desktop')
        };
        
        this.background = this._createBackground();
        
        this.activeMenu = null;
        this.isAnimating = false;

        this._setupInitialStyles();
        this._setupEventListeners();
        console.log('✅ Menu Desktop "Chef d\'Orchestre" initialisé.');
    }
    
    _createBackground() {
        const bg = document.createElement('div');
        bg.className = 'menu-desktop-background';
        document.body.appendChild(bg);
        return bg;
    }

    _setupInitialStyles() {
        Object.values(this.menus).forEach(menu => {
            if (menu) window.gsap.set(menu, { display: 'none', opacity: 0 });
        });
        window.gsap.set(this.background, { display: 'none', opacity: 0, backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 998 });
    }

    _setupEventListeners() {
        document.body.addEventListener('click', e => {
            if (this.isAnimating) return;

            // Trouver si un trigger a été cliqué
            const clickedTriggerKey = Object.keys(this.triggers).find(key => 
                this.triggers[key] && this.triggers[key].contains(e.target)
            );

            if (clickedTriggerKey) {
                e.preventDefault();
                e.stopPropagation();
                this._toggleMenu(clickedTriggerKey);
                return;
            }

            // Gérer le clic à l'extérieur
            if (this.activeMenu) {
                const activeMenuElement = this.menus[this.activeMenu];
                const activeTriggerElement = this.triggers[this.activeMenu];
                const isClickInside = activeMenuElement && activeMenuElement.contains(e.target);
                const isClickOnTrigger = activeTriggerElement && activeTriggerElement.contains(e.target);

                if (!isClickInside && !isClickOnTrigger) {
                    this._closeActiveMenu();
                }
            }
        });
    }

    _toggleMenu(key) {
        if (this.activeMenu === key) {
            this._closeActiveMenu();
        } else {
            // Ferme l'ancien menu instantanément s'il y en a un
            if (this.activeMenu) {
                const oldMenu = this.menus[this.activeMenu];
                if (oldMenu) window.gsap.set(oldMenu, { display: 'none', opacity: 0 });
            }
            this._openMenu(key);
        }
    }

    _openMenu(key) {
        const menuToOpen = this.menus[key];
        if (!menuToOpen) return;
        
        this.isAnimating = true;
        this.activeMenu = key;
        
        const tl = window.gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });

        tl.set(this.background, { display: 'block' })
          .set(menuToOpen, { display: 'block' })
          .to(this.background, { opacity: 1, duration: 0.3 })
          .to(menuToOpen, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, "-=0.2");
    }

    _closeActiveMenu() {
        if (!this.activeMenu) return;

        const menuToClose = this.menus[this.activeMenu];
        if (!menuToClose) return;

        this.isAnimating = true;
        const currentActiveMenuKey = this.activeMenu; // Sauvegarde la clé
        this.activeMenu = null;

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
    // Le script attendra que les éléments soient là, mais ne bloquera pas
    if (document.querySelector('[data-attribute="nav-link-desktop-parcs"]')) {
        new MenuDesktopManager();
    } else {
        console.warn('[MenuDesktop] Aucun trigger de menu desktop trouvé. Initialisation annulée.');
    }
}
