// menu-desktop.js v8.0.0 - Stratégie "Vérité du DOM Ultime"
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v8.0.0 chargé - Stratégie "Vérité du DOM Ultime"');

class FinalDropdownHandler {
    constructor() {
        this.activeDropdown = null;
        this.isAnimating = false;
        
        this.triggerSelectors = [
            '[data-attribute="nav-link-desktop-parcs"]',
            '[data-attribute="nav-link-desktop-activites"]',
            '[data-attribute="nav-link-desktop-offres"]'
        ].join(',');

        this._addGlobalListener();
        console.log('✅ Gestionnaire de clic "Vérité du DOM Ultime" est actif.');
    }

    _addGlobalListener() {
        document.body.addEventListener('click', (e) => {
            const trigger = e.target.closest(this.triggerSelectors);

            if (trigger) {
                e.preventDefault();
                e.stopPropagation();

                const dropdownContainer = trigger.closest('.w-dropdown');
                if (!dropdownContainer) {
                    console.error("Erreur critique : Le trigger n'est pas dans un .w-dropdown.", trigger);
                    return;
                }
                
                this._toggleDropdown(dropdownContainer);
                return;
            }

            if (this.activeDropdown && !this.activeDropdown.contains(e.target)) {
                this._closeDropdown(this.activeDropdown);
            }
        });
    }

    _toggleDropdown(dropdown) {
        if (this.isAnimating) return;

        if (this.activeDropdown === dropdown) {
            this._closeDropdown(dropdown);
        } else {
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
            console.error("Structure invalide: .w-dropdown-list manquant dans", dropdown);
            this.isAnimating = false;
            return;
        }

        if (dropdown.dataset.hover === "true") dropdown.dataset.hover = "false";
        
        dropdown.classList.add('w--open');
        
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

    _closeDropdown(dropdown, updateState = true) {
        if (!dropdown) return;
        this.isAnimating = true;

        const list = dropdown.querySelector('.w-dropdown-list');
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
                dropdown.classList.remove('w--open');
                this.isAnimating = false;
                if (updateState) {
                    this.activeDropdown = null;
                }
            }
        });
    }
}

export function initMenuDesktop() {
    new FinalDropdownHandler();
}
