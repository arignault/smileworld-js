// menu-desktop.js v15.1.0 - Logique de survol vidéo améliorée
const log = (message, ...args) => console.log(`[SW-DESK-MENU] ${message}`, ...args);

/**
 * Gère le survol des activités pour jouer les vidéos correspondantes.
 * @requires gsap
 */
function initActivityHover() {
    log("Initialisation du survol des activités (v2).");

    const videoListContainer = document.querySelector('.desktop_menu_content.right .w-dyn-items');
    const menuItems = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');

    if (!videoListContainer || menuItems.length === 0) {
        log("Conteneurs de vidéos ou éléments de menu introuvables. La fonctionnalité de survol est désactivée.");
        return;
    }

    const videos = Array.from(videoListContainer.children);
    let activeVideoWrapper = null; // Pour suivre la vidéo actuellement visible

    log(`${videos.length} wrappers de vidéos trouvés.`);

    // Cacher toutes les vidéos au départ
    videos.forEach(videoWrapper => {
        gsap.set(videoWrapper, { display: 'none', opacity: 0 });
    });

    menuItems.forEach(item => {
        const activityName = item.getAttribute('data-name');
        if (!activityName) return;

        const targetVideoWrapper = videos.find(v => {
            const videoElement = v.querySelector('video');
            return videoElement && videoElement.getAttribute('data-video-name') === activityName;
        });

        if (!targetVideoWrapper) return;

        item.addEventListener('mouseenter', () => {
            // Si on survole le même élément, on ne fait rien
            if (targetVideoWrapper === activeVideoWrapper) {
                return;
            }

            // S'il y a une vidéo active, on la cache proprement
            if (activeVideoWrapper) {
                const oldVideo = activeVideoWrapper.querySelector('video');
                gsap.to(activeVideoWrapper, { 
                    opacity: 0, 
                    duration: 0.2, 
                    onComplete: () => {
                        gsap.set(activeVideoWrapper, { display: 'none' });
                        if (oldVideo) {
                            oldVideo.pause();
                            oldVideo.currentTime = 0;
                        }
                    }
                });
            }

            // On active et on joue la nouvelle vidéo
            activeVideoWrapper = targetVideoWrapper;
            const newVideo = activeVideoWrapper.querySelector('video');
            
            gsap.set(activeVideoWrapper, { display: 'block' });
            gsap.to(activeVideoWrapper, { opacity: 1, duration: 0.2 });
            
            if (newVideo) {
                // On s'assure que la vidéo est chargée avant de la jouer
                newVideo.play().catch(error => log(`Erreur de lecture pour ${activityName}:`, error));
            }
        });
    });

    log("Survol des activités configuré (v2).");
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

            // Correction : On met en pause toutes les vidéos dans le panneau qui se ferme
            panel.querySelectorAll('video').forEach(video => {
                if (!video.paused) {
                    video.pause();
                }
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
            if (targetLink) {
                targetLink.classList.add('active');
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
            // Si on clique en dehors du conteneur global du menu, on ferme tout
            if (!this.menuWrapper.contains(e.target)) {
                this.hideAllPanels();
            }
        });

        log('Gestionnaire de clic "Stratégie Wrapper" est actif.');
    }
}

export function initMenuDesktop() {
    log("Initialisation v15.1.0... Stratégie 'Wrapper' + Hover Vidéo amélioré");
    new WrapperBasedContractHandler();
    initActivityHover();
}
