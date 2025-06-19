// menu-mobile.js v3.0.0 - "Chef d'Orchestre" au clic
// import { gsap } from 'gsap';

console.log('🚀 menu-mobile.js v3.0.0 chargé - Stratégie "Chef d\'Orchestre"');

class MenuMobileManager {
    constructor() {
        this.elements = {
            mainPanel: document.querySelector('.menu-mobile'),
            openButton: document.querySelector('#hamburger-menu'),
            closeButton: document.querySelector('.button-close_menu-mobile'),
            
            navLinks: {
                parcs: document.querySelector('#parcs-nav_button_mobile'),
                activites: document.querySelector('#activites-nav_button_mobile'),
                offres: document.querySelector('#formules-nav_button_mobile'),
            },
            
            panels: {
                main: document.querySelector('#main-menu-mobile'),
                parcs: document.querySelector('#parc-menu-mobile'),
                activites: document.querySelector('#activites-menu-mobile'),
                offres: document.querySelector('#offres-menu-mobile'),
            },

            backButtons: document.querySelectorAll('.button-back-menu'),
        };

        this.activePanel = this.elements.panels.main;
        this.isAnimating = false;
        
        if (!this.elements.mainPanel) {
            console.warn('[MenuMobile] Panneau principal .menu-mobile introuvable. Initialisation annulée.');
            return;
        }

        this._setupInitialStyles();
        this._setupEventListeners();
        console.log('✅ Menu Mobile "Chef d\'Orchestre" initialisé.');
    }

    _setupInitialStyles() {
        window.gsap.set(this.elements.mainPanel, { x: '100%', display: 'none' });
        Object.values(this.elements.panels).forEach((panel, index) => {
            if (panel) {
                const isMainPanel = panel === this.elements.panels.main;
                window.gsap.set(panel, { 
                    display: isMainPanel ? 'flex' : 'none', 
                    opacity: isMainPanel ? 1 : 0, 
                    x: '0%' 
                });
            }
        });
    }

    _setupEventListeners() {
        document.body.addEventListener('click', e => {
            if (this.isAnimating) return;

            // --- Open / Close ---
            if (this.elements.openButton && this.elements.openButton.contains(e.target)) {
                e.preventDefault();
                this._openMainMenu();
                return;
            }
            if (this.elements.closeButton && this.elements.closeButton.contains(e.target)) {
                e.preventDefault();
                this._closeMainMenu();
                return;
            }

            // --- Navigation vers sous-menu ---
            const clickedNavKey = Object.keys(this.elements.navLinks).find(key => 
                this.elements.navLinks[key] && this.elements.navLinks[key].contains(e.target)
            );
            if (clickedNavKey) {
                e.preventDefault();
                const targetPanel = this.elements.panels[clickedNavKey];
                if (targetPanel) this._navigateToPanel(targetPanel);
                return;
            }

            // --- Navigation retour ---
            const clickedBackButton = Array.from(this.elements.backButtons).find(btn => btn.contains(e.target));
            if (clickedBackButton) {
                e.preventDefault();
                this._navigateToPanel(this.elements.panels.main, true);
                return;
            }
        });
    }

    _openMainMenu() {
        this.isAnimating = true;
        window.gsap.set(this.elements.mainPanel, { display: 'block' });
        window.gsap.to(this.elements.mainPanel, { 
            x: '0%', 
            duration: 0.5, 
            ease: 'power3.out',
            onComplete: () => { this.isAnimating = false; }
        });
        document.body.style.overflow = 'hidden';
    }

    _closeMainMenu() {
        this.isAnimating = true;
        // Avant de fermer, s'assurer que seul le menu principal est visible
        this._resetToMainPanel();
        
        window.gsap.to(this.elements.mainPanel, {
            x: '100%',
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                window.gsap.set(this.elements.mainPanel, { display: 'none' });
                this.isAnimating = false;
            }
        });
        document.body.style.overflow = '';
    }
    
    _navigateToPanel(targetPanel, isGoingBack = false) {
        if (!this.activePanel || !targetPanel || this.activePanel === targetPanel) return;

        this.isAnimating = true;
        const currentPanel = this.activePanel;
        const movePercent = isGoingBack ? 100 : -100;

        window.gsap.set(targetPanel, { display: 'flex', x: `${-movePercent}%`, opacity: 1 });

        const tl = window.gsap.timeline({
            onComplete: () => {
                window.gsap.set(currentPanel, { display: 'none' });
                this.activePanel = targetPanel;
                this.isAnimating = false;
            }
        });

        tl.to(currentPanel, { x: `${movePercent}%`, duration: 0.4, ease: 'power2.inOut' })
          .to(targetPanel, { x: '0%', duration: 0.4, ease: 'power2.inOut' }, '-=0.4');
    }

    _resetToMainPanel() {
        Object.values(this.elements.panels).forEach(panel => {
            if (panel) {
                if (panel === this.elements.panels.main) {
                    window.gsap.set(panel, { display: 'flex', x: '0%' });
                } else {
                    window.gsap.set(panel, { display: 'none' });
                }
            }
        });
        this.activePanel = this.elements.panels.main;
    }
}

export function initMenuMobile() {
    if (document.querySelector('.menu-mobile')) {
        new MenuMobileManager();
    } else {
        console.warn('[MenuMobile] Élément .menu-mobile non trouvé. Initialisation annulée.');
    }
}
  
  
  
  