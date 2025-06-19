// menu-desktop.js v14.0.0 - Stratégie "Wrapper"
console.log('🚀 menu-desktop.js v14.0.0 chargé - Stratégie "Wrapper"');

class WrapperBasedContractHandler {
    constructor() {
        this.activePanel = null;
        this.isAnimating = false;
        
        this.triggerSelector = '[data-attribute^="nav-link-desktop-"]';
        this.wrapperSelector = '.desktop_menu_wrapper'; // Le sélecteur pour votre conteneur
        this.panelClassMap = {
            'parcs': '.parc_menu_desktop',
            'activites': '.activites_menu_desktop',
            'offres': '.offres_menu_desktop'
        };

        this._addGlobalListener();
        console.log('✅ Gestionnaire de clic "Stratégie Wrapper" est actif.');
    }

    _addGlobalListener() {
        document.body.addEventListener('click', (e) => {
            if (this.isAnimating) return;

            const trigger = e.target.closest(this.triggerSelector);
            const wrapper = document.querySelector(this.wrapperSelector);

            // --- Débogage Clic Extérieur ---
            if (!trigger && this.activePanel) {
                console.log('--- Débogage Clic Extérieur ---');
                console.log('Cible du clic:', e.target);
                console.log('Wrapper trouvé:', !!wrapper);
                if(wrapper) {
                    console.log('Le clic est DANS le wrapper:', wrapper.contains(e.target));
                }
                console.log('Condition de fermeture (doit être true):', !!(!trigger && this.activePanel && wrapper && !wrapper.contains(e.target)));
            }

            // Clic en dehors du wrapper (si un menu est ouvert)
            if (!trigger && this.activePanel && wrapper && !wrapper.contains(e.target)) {
                console.log('✅ Conditions remplies, fermeture du menu.');
                this._closeAll();
                return;
            }

            // Si ce n'est ni un clic sur un trigger, ni un clic "dehors", on ignore
            if (!trigger) return;

            // ---- A partir d'ici, on a cliqué sur un trigger ----
            e.preventDefault();
            e.stopPropagation();

            if (!wrapper) {
                console.error(`Wrapper introuvable avec le sélecteur: ${this.wrapperSelector}`);
                return;
            }

            const key = trigger.getAttribute('data-attribute').replace('nav-link-desktop-', '');
            const targetPanel = wrapper.querySelector(this.panelClassMap[key]);

            if (!targetPanel) {
                console.error(`Panneau cible pour la clé "${key}" non trouvé dans le wrapper.`);
                return;
            }

            const isSamePanel = this.activePanel === targetPanel;
            const noPanelOpen = !this.activePanel;

            if (isSamePanel) {
                this._closeAll();
            } else if (noPanelOpen) {
                this._openWrapperAndPanel(targetPanel);
            } else {
                this._switchPanels(this.activePanel, targetPanel);
            }
        });
    }

    _openWrapperAndPanel(panel) {
        const wrapper = document.querySelector(this.wrapperSelector);
        this.isAnimating = true;

        // Prépare les états avant animation
        window.gsap.set(wrapper, { display: 'flex', opacity: 0 });
        // On s'assure que seul le bon panneau est visible
        Object.values(this.panelClassMap).forEach(selector => {
            const p = wrapper.querySelector(selector);
            if (p) window.gsap.set(p, { display: 'none' });
        });
        window.gsap.set(panel, { display: 'flex' });

        // Animation d'apparition du wrapper
        window.gsap.to(wrapper, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                this.isAnimating = false;
                this.activePanel = panel;
            }
        });
    }

    _closeAll() {
        const wrapper = document.querySelector(this.wrapperSelector);
        if (!this.activePanel || !wrapper) return;
        
        this.isAnimating = true;

        // Animation de disparition du wrapper
        window.gsap.to(wrapper, {
            opacity: 0,
            duration: 0.2,
            ease: 'power1.in',
            onComplete: () => {
                window.gsap.set(wrapper, { display: 'none' });
                // On cache aussi le panneau par sécurité
                if (this.activePanel) {
                    window.gsap.set(this.activePanel, { display: 'none' });
                }
                this.activePanel = null;
                this.isAnimating = false;
            }
        });
    }

    _switchPanels(oldPanel, newPanel) {
        this.isAnimating = true;

        const tl = window.gsap.timeline({
            onComplete: () => {
                this.isAnimating = false;
                this.activePanel = newPanel;
            }
        });

        // Cache l'ancien panneau
        tl.to(oldPanel, {
            opacity: 0,
            duration: 0.15,
            onComplete: () => window.gsap.set(oldPanel, { display: 'none' })
        });

        // Affiche le nouveau
        tl.set(newPanel, { display: 'flex', opacity: 0 });
        tl.to(newPanel, {
            opacity: 1,
            duration: 0.15
        });
    }
}

export function initMenuDesktop() {
    new WrapperBasedContractHandler();
}
