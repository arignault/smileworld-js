// menu-mobile.js v4.0.0 - Stratégie "Ultra Patiente"
// import { gsap } from 'gsap';

console.log('🚀 menu-mobile.js v4.0.0 chargé - Stratégie "Ultra Patiente"');

class MenuMobileManager {
    constructor() {
        // On ne stocke que les sélecteurs, pas les éléments eux-mêmes.
        this.selectors = {
            mainPanel: '#main-menu-mobile',
            openButton: '#hamburger-menu',
            closeButton: '.button-close_menu-mobile',
            navLinks: {
                parcs: '#parcs-nav_button_mobile',
                activites: '#activites-nav_button_mobile',
                offres: '#formules-nav_button_mobile',
            },
            panels: {
                main: '#main-menu-mobile',
                parcs: '#parc-menu-mobile',
                activites: '#activite-menu-mobile',
                offres: '#offres-menu-mobile',
            },
            backButtons: '.button-back-menu',
        };

        this.activePanelKey = 'main';
        this.isAnimating = false;
        
        this._setupEventListeners();
        console.log('✅ Menu Mobile "Ultra Patient" initialisé.');
    }

    _setupEventListeners() {
        document.body.addEventListener('click', e => {
            if (this.isAnimating) return;

            // --- Open / Close ---
            if (e.target.closest(this.selectors.openButton)) {
                e.preventDefault();
                this._openMainMenu();
                return;
            }
            if (e.target.closest(this.selectors.closeButton)) {
                e.preventDefault();
                this._closeMainMenu();
                return;
            }

            // --- Navigation vers sous-menu ---
            const clickedNavKey = Object.keys(this.selectors.navLinks).find(key => 
                e.target.closest(this.selectors.navLinks[key])
            );
            if (clickedNavKey) {
                e.preventDefault();
                this._navigateToPanel(clickedNavKey);
                return;
            }

            // --- Navigation retour ---
            if (e.target.closest(this.selectors.backButtons)) {
                e.preventDefault();
                this._navigateToPanel('main', true);
                return;
            }
        });
    }

    _openMainMenu() {
        const mainPanel = document.querySelector(this.selectors.mainPanel);
        if (!mainPanel) return console.warn('[MenuMobile] Panneau principal #main-menu-mobile introuvable au clic.');

        this.isAnimating = true;
        // Styles appliqués juste avant l'animation
        window.gsap.set(mainPanel, { display: 'block', x: '100%' });
        
        window.gsap.to(mainPanel, { 
            x: '0%', 
            duration: 0.5, 
            ease: 'power3.out',
            onComplete: () => { this.isAnimating = false; }
        });
        document.body.style.overflow = 'hidden';
    }

    _closeMainMenu() {
        const mainPanel = document.querySelector(this.selectors.mainPanel);
        if (!mainPanel) return; // Si le menu n'est plus là, on ne fait rien
        
        this.isAnimating = true;
        this._resetToMainPanel(); // On s'assure de revenir au menu principal
        
        window.gsap.to(mainPanel, {
            x: '100%',
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                window.gsap.set(mainPanel, { display: 'none' });
                this.isAnimating = false;
                document.body.style.overflow = '';
            }
        });
    }
    
    _navigateToPanel(targetPanelKey, isGoingBack = false) {
        const currentPanel = document.querySelector(this.selectors.panels[this.activePanelKey]);
        const targetPanel = document.querySelector(this.selectors.panels[targetPanelKey]);

        if (!currentPanel || !targetPanel || this.activePanelKey === targetPanelKey) return;

        this.isAnimating = true;
        const movePercent = isGoingBack ? 100 : -100;

        window.gsap.set(targetPanel, { display: 'flex', x: `${-movePercent}%`, opacity: 1 });

        const tl = window.gsap.timeline({
            onComplete: () => {
                window.gsap.set(currentPanel, { display: 'none' });
                this.activePanelKey = targetPanelKey;
                this.isAnimating = false;
            }
        });

        tl.to(currentPanel, { x: `${movePercent}%`, duration: 0.4, ease: 'power2.inOut' })
          .to(targetPanel, { x: '0%', duration: 0.4, ease: 'power2.inOut' }, '-=0.4');
    }

    _resetToMainPanel() {
        Object.keys(this.selectors.panels).forEach(key => {
            const panel = document.querySelector(this.selectors.panels[key]);
            if (panel) {
                const isMainPanel = key === 'main';
                window.gsap.set(panel, { 
                    display: isMainPanel ? 'flex' : 'none', 
                    x: '0%' 
                });
            }
        });
        this.activePanelKey = 'main';
    }
}

export function initMenuMobile() {
    // On initialise directement, l'écouteur sur 'body' est toujours disponible.
    new MenuMobileManager();
}
  
  
  
  