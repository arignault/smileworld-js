// Version: 2.0.0 - Refactorisation avec classes CSS et simplification
// import { gsap } from 'gsap';

console.log('🚀 menu-mobile.js v2.0.0 chargé');

class MenuMobile {
    constructor() {
        this.elements = {
            menu: document.querySelector('.menu-mobile'),
            // Les boutons sont recherchés dynamiquement par la délégation
        };
        this.navBar = document.querySelector('.w-nav');
        this.animation = null;

        if (!this.navBar || !this.elements.menu) {
            console.error('[MenuMobile] Barre de navigation (.w-nav) ou menu (.menu-mobile) introuvable. Initialisation annulée.');
            return;
        }

        this._setupEventListeners();
        console.log('✅ Menu Mobile initialisé avec la délégation d\'événements.');
    }

    _setupEventListeners() {
        this.navBar.addEventListener('click', e => {
            const openBtn = e.target.closest('.menu-button-open');
            const closeBtn = e.target.closest('.menu-button-close');

            if (openBtn) {
                this._animateOpen();
            } else if (closeBtn) {
                this._animateClose();
            }
        });
    }

    _animateOpen() {
        if (this.animation && this.animation.isActive()) return;

        this.animation = window.gsap.timeline();
        this.animation
            .set(this.elements.menu, { display: 'block' })
            .to(this.elements.menu, { right: '0%', duration: 0.5, ease: 'power3.inOut' });
    }

    _animateClose() {
        if (this.animation && this.animation.isActive()) return;

        this.animation = window.gsap.timeline();
        this.animation
            .to(this.elements.menu, { right: '-100%', duration: 0.5, ease: 'power3.inOut' })
            .set(this.elements.menu, { display: 'none' });
    }
}

export function initMenuMobile() {
    new MenuMobile();
}
  
  
  
  