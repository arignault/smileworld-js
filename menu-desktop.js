// menu-desktop.js v7.0.0 - Stratégie "Anti-Conflit"
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v7.0.0 chargé - Stratégie "Anti-Conflit"');

class DataAttributeDropdownHandler {
    constructor() {
        this.activeDropdownParent = null;
        this.isAnimating = false;
        
        // Sélecteurs basés uniquement sur les data-attributes personnalisés
        this.triggerSelectors = [
            '[data-attribute="nav-link-desktop-parcs"]',
            '[data-attribute="nav-link-desktop-activites"]',
            '[data-attribute="nav-link-desktop-offres"]'
        ].join(',');

        this._addGlobalListener();
        console.log('✅ Gestionnaire de clic "Anti-Conflit" est actif.');
    }

    _addGlobalListener() {
        document.body.addEventListener('click', (e) => {
            const trigger = e.target.closest(this.triggerSelectors);

            // Cas 1: On a cliqué sur un de nos triggers
            if (trigger) {
                e.preventDefault();
                e.stopPropagation();
                
                // On remonte au conteneur commun, qui est le w-dropdown
                const dropdownParent = trigger.closest('.w-dropdown');
                if (!dropdownParent) {
                    console.error("Impossible de trouver le parent .w-dropdown pour le trigger:", trigger);
                    return;
                }
                
                this._toggleDropdown(dropdownParent);
                return;
            }

            // Cas 2: Clic à l'extérieur pour fermer
            if (this.activeDropdownParent && !this.activeDropdownParent.contains(e.target)) {
                this._closeDropdown(this.activeDropdownParent);
            }
        });
    }

    _toggleDropdown(dropdownParent) {
        if (this.isAnimating) return;

        if (this.activeDropdownParent === dropdownParent) {
            this._closeDropdown(dropdownParent);
        } else {
            if (this.activeDropdownParent) {
                this._closeDropdown(this.activeDropdownParent, false);
            }
            this._openDropdown(dropdownParent);
        }
    }

    _openDropdown(dropdownParent) {
        this.isAnimating = true;
        this.activeDropdownParent = dropdownParent;
        
        // On trouve le panneau à l'intérieur du parent
        const list = dropdownParent.querySelector('.w-dropdown-list');
        if (!list) {
            console.error("Structure invalide: .w-dropdown-list manquant dans", dropdownParent);
            this.isAnimating = false;
            return;
        }

        // Forcer la désactivation du hover natif
        if (dropdownParent.dataset.hover === "true") dropdownParent.dataset.hover = "false";

        dropdownParent.classList.add('w--open');
        
        window.gsap.set(list, { display: 'block' });
        window.gsap.fromTo(list, 
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

    _closeDropdown(dropdownParent, updateState = true) {
        if (!dropdownParent) return;
        this.isAnimating = true;

        const list = dropdownParent.querySelector('.w-dropdown-list');
        if (!list) {
            this.isAnimating = false;
            return;
        }

        window.gsap.to(list, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            ease: 'power1.in',
            onComplete: () => {
                window.gsap.set(list, { display: 'none' });
                dropdownParent.classList.remove('w--open');
                this.isAnimating = false;
                if (updateState) {
                    this.activeDropdownParent = null;
                }
            }
        });
    }
}

export function initMenuDesktop() {
    new DataAttributeDropdownHandler();
}
