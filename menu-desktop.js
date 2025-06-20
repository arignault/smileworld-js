// menu-desktop.js v17.0.0 - Logique de survol déléguée
import { initMenuDesktopHoverActivite } from './menu-desktop-hover-activite.js';

const log = (message, ...args) => console.log(`[SW-DESK-MENU] ${message}`, ...args);

/**
 * Gère l'ouverture et la fermeture des panneaux du menu desktop
 * en se basant sur une stratégie de conteneur global.
 */
class WrapperBasedContractHandler {
    constructor() {
        this.menuWrapper = document.querySelector('.desktop_menu_wrapper');
        if (!this.menuWrapper) {
            log("Erreur : Le conteneur .desktop_menu_wrapper est introuvable.");
            return;
        }
        this.links = this.menuWrapper.querySelectorAll('[data-panel-target]');
        this.panels = this.menuWrapper.querySelectorAll('[data-panel-id]');
        this.init();
    }

    hideAllPanels() {
        this.panels.forEach(panel => {
            gsap.to(panel, { opacity: 0, duration: 0.2, onComplete: () => panel.style.display = 'none' });
            panel.querySelectorAll('video').forEach(video => {
                if (!video.paused) video.pause();
            });
        });
        this.links.forEach(link => link.classList.remove('active'));
    }

    showPanel(panelId) {
        this.hideAllPanels();
        const targetPanel = this.menuWrapper.querySelector(`[data-panel-id="${panelId}"]`);
        const targetLink = this.menuWrapper.querySelector(`[data-panel-target="${panelId}"]`);

        if (targetPanel) {
            targetPanel.style.display = 'block';
            gsap.to(targetPanel, { opacity: 1, duration: 0.2 });
            if (targetLink) targetLink.classList.add('active');
            
            // Si on ouvre le panneau des activités, on initialise le module de survol.
            if (panelId === 'activites') {
                initMenuDesktopHoverActivite();
            }
        }
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const panelId = link.dataset.panelTarget;
                this.showPanel(panelId);
            });
        });

        document.body.addEventListener('click', (e) => {
            if (!this.menuWrapper.contains(e.target)) {
                this.hideAllPanels();
            }
        });

        log('Gestionnaire de clic "Stratégie Wrapper" est actif.');
    }
}

export function initMenuDesktop() {
    log("Initialisation v17.0.0... Stratégie de panneaux uniquement.");
    new WrapperBasedContractHandler();
}
