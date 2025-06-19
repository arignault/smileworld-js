// menu-desktop.js v12.0.0 - Stratégie "Contrat par Data-Attribute"
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v12.0.0 chargé - Stratégie "Contrat par Data-Attribute"');

class DataAttributeContractHandler {
    constructor() {
        this.activePanel = null;
        this.isAnimating = false;
        
        this.triggerSelector = '[data-attribute^="nav-link-desktop-"]';

        this._addGlobalListener();
        console.log('✅ Gestionnaire de clic "Contrat par Data-Attribute" est actif.');
    }

    _getTargetPanelSelector(trigger) {
        const triggerAttr = trigger.getAttribute('data-attribute');
        if (!triggerAttr) return null;
        const panelAttr = triggerAttr.replace('nav-link-desktop-', 'nav-panel-desktop-');
        return `[data-attribute="${panelAttr}"]`;
    }

    _addGlobalListener() {
        document.body.addEventListener('click', (e) => {
            const trigger = e.target.closest(this.triggerSelector);
            
            if (trigger) {
                e.preventDefault();
                e.stopPropagation();

                const targetPanelSelector = this._getTargetPanelSelector(trigger);
                if (!targetPanelSelector) return;
                
                const targetPanel = document.querySelector(targetPanelSelector);
                if (!targetPanel) {
                    console.error(`Panneau cible ${targetPanelSelector} non trouvé. Avez-vous ajouté le data-attribute au panneau dans Webflow ?`);
                    return;
                }
                
                this._toggleDropdown(targetPanel);
                return;
            }

            if (this.activePanel && !this.activePanel.contains(e.target)) {
                 const triggerForActivePanel = document.querySelector(`[data-attribute="${this.activePanel.getAttribute('data-attribute').replace('nav-panel-desktop-', 'nav-link-desktop-')}"]`);
                 if (triggerForActivePanel && !triggerForActivePanel.contains(e.target)) {
                    this._closeDropdown(this.activePanel);
                 }
            }
        });
    }

    _toggleDropdown(panel) {
        if (this.isAnimating) return;

        if (this.activePanel === panel) {
            this._closeDropdown(panel);
        } else {
            if (this.activePanel) {
                this._closeDropdown(this.activePanel, false);
            }
            this._openDropdown(panel);
        }
    }

    _openDropdown(panel) {
        this.isAnimating = true;
        this.activePanel = panel;
        
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

export function initMenuDesktop() {
    new DataAttributeContractHandler();
}
