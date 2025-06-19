// menu-desktop.js v13.0.0 - Stratégie "Contrat par Classe"
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v13.0.0 chargé - Stratégie "Contrat par Classe"');

class ClassBasedContractHandler {
    constructor() {
        this.activePanel = null;
        this.isAnimating = false;
        
        this.triggerSelector = '[data-attribute^="nav-link-desktop-"]';
        this.panelClassMap = {
            'parc': '.parc_menu_desktop',
            'activites': '.activites_menu_desktop',
            'offres': '.offres_menu_desktop'
        };

        this._addGlobalListener();
        console.log('✅ Gestionnaire de clic "Contrat par Classe" est actif.');
    }

    _addGlobalListener() {
        document.body.addEventListener('click', (e) => {
            const trigger = e.target.closest(this.triggerSelector);
            
            if (trigger) {
                e.preventDefault();
                e.stopPropagation();

                const triggerAttr = trigger.getAttribute('data-attribute');
                if (!triggerAttr) return;

                const key = triggerAttr.replace('nav-link-desktop-', '');
                const targetPanelSelector = this.panelClassMap[key];

                if (!targetPanelSelector) {
                    console.error(`Aucune classe de panneau correspondante trouvée pour la clé: ${key}`);
                    return;
                }
                
                const targetPanel = document.querySelector(targetPanelSelector);
                if (!targetPanel) {
                    console.error(`Panneau cible ${targetPanelSelector} non trouvé. Avez-vous ajouté la classe au panneau dans Webflow ?`);
                    return;
                }
                
                this._toggleDropdown(targetPanel, key);
                return;
            }

            if (this.activePanel && !this.activePanel.contains(e.target)) {
                 const triggerKey = this.activePanel.dataset.panelKey;
                 if (triggerKey) {
                    const triggerForActivePanel = document.querySelector(`[data-attribute="nav-link-desktop-${triggerKey}"]`);
                     if (!triggerForActivePanel || (triggerForActivePanel && !triggerForActivePanel.contains(e.target))) {
                        this._closeDropdown(this.activePanel);
                     }
                 } else {
                    // Fallback for safety, though should not be reached with the new logic
                    this._closeDropdown(this.activePanel);
                 }
            }
        });
    }

    _toggleDropdown(panel, key) {
        if (this.isAnimating) return;

        if (this.activePanel === panel) {
            this._closeDropdown(panel);
        } else {
            if (this.activePanel) {
                this._closeDropdown(this.activePanel, false);
            }
            this._openDropdown(panel, key);
        }
    }

    _openDropdown(panel, key) {
        this.isAnimating = true;
        this.activePanel = panel;
        panel.dataset.panelKey = key;
        
        window.gsap.set(panel, { display: 'block' });
        window.gsap.fromTo(panel, 
            { opacity: 0, y: -10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => { this.isAnimating = false; }
            }
        );
    }

    _closeDropdown(panel, updateState = true) {
        if (!panel) return;
        this.isAnimating = true;

        if (panel.dataset.panelKey) {
            delete panel.dataset.panelKey;
        }

        window.gsap.to(panel, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            ease: 'power1.in',
            onComplete: () => {
                window.gsap.set(panel, { display: 'none' });
                this.isAnimating = false;
                if (updateState) {
                    this.activePanel = null;
                }
            }
        });
    }
}

// L'initialisation se fait directement dans le script
// pour éviter les problèmes de modules dans Webflow.
new ClassBasedContractHandler();
