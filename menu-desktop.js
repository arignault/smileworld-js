// menu-desktop.js v16.0.0 - Logique de survol vidéo originale restaurée
const log = (message, ...args) => console.log(`[SW-DESK-MENU] ${message}`, ...args);

/**
 * Re-implémentation de la logique de survol de 'menu-desktop-hover-activite.js'
 * adaptée pour les vidéos, avec une gestion propre des animations.
 * @requires gsap
 */
function initActivityHoverRestored() {
    log("Initialisation du survol des activités (Logique originale restaurée).");

    const videoListContainer = document.querySelector('.desktop_menu_content.right .w-dyn-items');
    const menuItems = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');

    if (!videoListContainer || menuItems.length === 0) {
        log("Éléments nécessaires (conteneur vidéo ou items de menu) introuvables.");
        return;
    }

    const videoWrappers = Array.from(videoListContainer.children);
    const animations = new Map(); // Pour gérer et annuler les animations concurrentes

    // Cacher toutes les vidéos au démarrage
    videoWrappers.forEach(wrapper => {
        gsap.set(wrapper, { display: 'none', opacity: 0 });
    });

    const handleVideoDisplay = (activityName, isEntering) => {
        const targetWrapper = videoWrappers.find(wrapper => {
            const video = wrapper.querySelector('video');
            return video && video.id === activityName;
        });

        if (!targetWrapper) return;
        
        // Annule toute animation précédente sur cet élément pour éviter les conflits
        if (animations.has(targetWrapper)) {
            animations.get(targetWrapper).kill();
        }

        if (isEntering) {
            // Arrêter et cacher toutes les autres vidéos
            videoWrappers.forEach(wrapper => {
                if (wrapper !== targetWrapper) {
                    if (animations.has(wrapper)) animations.get(wrapper).kill();
                    
                    const anim = gsap.to(wrapper, {
                        opacity: 0,
                        duration: 0.15,
                        onComplete: () => {
                            gsap.set(wrapper, { display: 'none' });
                            const video = wrapper.querySelector('video');
                            if (video) video.pause();
                        }
                    });
                    animations.set(wrapper, anim);
                }
            });

            // Afficher et jouer la vidéo cible
            const video = targetWrapper.querySelector('video');
            gsap.set(targetWrapper, { display: 'block' });
            
            const showAnim = gsap.to(targetWrapper, {
                opacity: 1,
                duration: 0.2,
                onComplete: () => {
                    if (video) {
                        video.currentTime = 0;
                        video.play().catch(e => log(`Erreur de lecture pour ${activityName}: ${e.message}`));
                    }
                }
            });
            animations.set(targetWrapper, showAnim);

        } else {
            // Au mouseleave, on se contente de cacher la vidéo qui était affichée.
            const video = targetWrapper.querySelector('video');
            const hideAnim = gsap.to(targetWrapper, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    gsap.set(targetWrapper, { display: 'none' });
                    if (video) video.pause();
                }
            });
            animations.set(targetWrapper, hideAnim);
        }
    };

    menuItems.forEach(item => {
        const name = item.getAttribute('data-name');
        if (!name) return;

        item.addEventListener('mouseenter', () => handleVideoDisplay(name, true));
        item.addEventListener('mouseleave', () => handleVideoDisplay(name, false));
    });

    log("Logique de survol vidéo originale restaurée et configurée.");
}


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
    log("Initialisation v16.0.0... Logique survol vidéo restaurée.");
    new WrapperBasedContractHandler();
    initActivityHoverRestored();
}
