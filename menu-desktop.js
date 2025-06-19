// menu-desktop.js v5.0.0 - Stratégie "Vérité du DOM"
// import { gsap } from 'gsap';

console.log('🚀 menu-desktop.js v5.0.0 chargé - Stratégie "Vérité du DOM"');

class WebflowDropdownManager {
    constructor(desktopNav) {
        this.desktopNav = desktopNav;
        this.dropdowns = Array.from(this.desktopNav.querySelectorAll('.w-dropdown'));
        this.activeDropdown = null;
        this.isAnimating = false;

        if (this.dropdowns.length === 0) {
            console.warn('[MenuDesktop] Aucun dropdown Webflow (.w-dropdown) trouvé.');
            return;
        }

        this._prepareDropdowns();
        this._addEventListeners();
        console.log(`✅ ${this.dropdowns.length} dropdown(s) Webflow initialisé(s) en mode clic.`);
    }

    _prepareDropdowns() {
        this.dropdowns.forEach(dd => {
            const list = dd.querySelector('.w-dropdown-list');
            if (list) {
                // On s'assure que le menu est caché et prêt pour l'animation GSAP
                window.gsap.set(list, { display: 'none', opacity: 0, y: -10 });
                // On désactive la gestion par survol de Webflow
                dd.dataset.hover = "false";
            }
        });
    }

    _addEventListeners() {
        this.dropdowns.forEach(dd => {
            const toggle = dd.querySelector('.w-dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault(); // Empêche toute action par défaut du lien
                    e.stopPropagation(); // Arrête la propagation pour éviter de fermer immédiatement
                    this._toggleDropdown(dd);
                });
            }
        });

        // Clic à l'extérieur pour fermer
        document.addEventListener('click', (e) => {
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
            // Fermer l'ancien menu s'il existe
            if (this.activeDropdown) {
                this._closeDropdown(this.activeDropdown, false); // Ferme sans changer l'état global tout de suite
            }
            this._openDropdown(dropdown);
        }
    }

    _openDropdown(dropdown) {
        this.isAnimating = true;
        this.activeDropdown = dropdown;
        
        const list = dropdown.querySelector('.w-dropdown-list');
        if (!list) return;

        dropdown.classList.add('w--open');
        list.classList.add('w--open');

        window.gsap.to(list, {
            display: 'block',
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => { this.isAnimating = false; }
        });
    }

    _closeDropdown(dropdown, updateState = true) {
        this.isAnimating = true;

        const list = dropdown.querySelector('.w-dropdown-list');
        if (!list) return;

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
    const desktopNav = document.querySelector('.topnav.is-desktop');
    if (desktopNav) {
        new WebflowDropdownManager(desktopNav);
    } else {
        // C'est normal sur mobile, donc pas d'erreur, juste un log discret.
        console.log('[MenuDesktop] Barre de navigation desktop non trouvée. Initialisation annulée.');
    }
}
