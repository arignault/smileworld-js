// menu-desktop.js v10.0.0 - Stratégie "Adaptation à Finsweet"
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v10.0.0 chargé - Stratégie "Adaptation à Finsweet"');

class FinsweetAwareDropdownHandler {
    constructor() {
        this.activeListItem = null;
        this.isAnimating = false;
        
        this.triggerSelectors = [
            '[data-attribute="nav-link-desktop-parcs"]',
            '[data-attribute="nav-link-desktop-activites"]',
            '[data-attribute="nav-link-desktop-offres"]'
        ].join(',');

        this._addGlobalListener();
        console.log('✅ Gestionnaire de clic "Adaptation à Finsweet" est actif.');
    }

    _addGlobalListener() {
        document.body.addEventListener('click', (e) => {
            const trigger = e.target.closest(this.triggerSelectors);
            
            if (trigger) {
                e.preventDefault();
                e.stopPropagation();

                const listItem = trigger.closest('li');
                if (!listItem) {
                    console.error("Erreur critique: Le trigger n'est pas dans un <li>.", trigger);
                    return;
                }
                
                this._toggleDropdown(listItem);
                return;
            }

            if (this.activeListItem && !this.activeListItem.contains(e.target)) {
                this._closeDropdown(this.activeListItem);
            }
        });
    }

    _toggleDropdown(listItem) {
        if (this.isAnimating) return;

        if (this.activeListItem === listItem) {
            this._closeDropdown(listItem);
        } else {
            if (this.activeListItem) {
                this._closeDropdown(this.activeListItem, false);
            }
            this._openDropdown(listItem);
        }
    }

    _openDropdown(listItem) {
        this.isAnimating = true;
        this.activeListItem = listItem;
        
        const list = listItem.querySelector('.w-dropdown-list');
        if (!list) {
            console.error("Structure invalide: .w-dropdown-list manquant dans le <li>", listItem);
            this.isAnimating = false;
            return;
        }
        
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

    _closeDropdown(listItem, updateState = true) {
        if (!listItem) return;
        this.isAnimating = true;

        const list = listItem.querySelector('.w-dropdown-list');
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
                this.isAnimating = false;
                if (updateState) {
                    this.activeListItem = null;
                }
            }
        });
    }
}

export function initMenuDesktop() {
    new FinsweetAwareDropdownHandler();
}
