// menu-desktop.js v6.0.0 - Stratégie "Ultime" (Événement Global)
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v6.0.0 chargé - Stratégie "Ultime"');

class GlobalDropdownClickHandler {
    constructor() {
        this.activeDropdown = null;
        this.isAnimating = false;
        this._addGlobalListener();
        console.log('✅ Gestionnaire de clic global pour les dropdowns est actif.');
    }

    _addGlobalListener() {
        document.body.addEventListener('click', (e) => {
            const toggle = e.target.closest('.w-dropdown-toggle');
            
            // Cas 1: On a cliqué sur un toggle de dropdown
            if (toggle) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = toggle.parentElement; // .w-dropdown est le parent direct
                this._toggleDropdown(dropdown);
                return;
            }

            // Cas 2: On a cliqué n'importe où ailleurs sur la page
            if (this.activeDropdown && !this.activeDropdown.contains(e.target)) {
                this._closeDropdown(this.activeDropdown);
            }
        });
    }

    _toggleDropdown(dropdown) {
        if (this.isAnimating) return;

        // Si on clique sur le dropdown déjà actif, on le ferme.
        if (this.activeDropdown === dropdown) {
            this._closeDropdown(dropdown);
        } else {
            // Sinon, on ferme l'ancien (s'il y en a un) et on ouvre le nouveau.
            if (this.activeDropdown) {
                this._closeDropdown(this.activeDropdown, false); 
            }
            this._openDropdown(dropdown);
        }
    }

    _openDropdown(dropdown) {
        this.isAnimating = true;
        this.activeDropdown = dropdown;
        
        const list = dropdown.querySelector('.w-dropdown-list');
        if (!list) {
            console.error("Structure de dropdown invalide: .w-dropdown-list manquant.", dropdown);
            this.isAnimating = false;
            return;
        }

        // Forcer la désactivation du hover natif de Webflow
        if (dropdown.dataset.hover === "true") dropdown.dataset.hover = "false";

        dropdown.classList.add('w--open');
        list.classList.add('w--open');

        // Animation d'ouverture
        window.gsap.set(list, { display: 'block' }); // On s'assure qu'il est visible avant l'anim
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

    _closeDropdown(dropdown, updateState = true) {
        if (!dropdown) return;
        this.isAnimating = true;

        const list = dropdown.querySelector('.w-dropdown-list');
        if (!list) {
            this.isAnimating = false;
            return;
        }

        // Animation de fermeture
        window.gsap.to(list, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            ease: 'power1.in',
            onComplete: () => {
                window.gsap.set(list, { display: 'none' });
                dropdown.classList.remove('w--open');
                list.classList.remove('w--open');
                this.isAnimating = false;
                if (updateState) {
                    this.activeDropdown = null;
                }
            }
        });
    }
}

export function initMenuDesktop() {
    // Il n'y a plus rien à vérifier. On lance le gestionnaire global.
    // Il attendra passivement les clics.
    new GlobalDropdownClickHandler();
}
