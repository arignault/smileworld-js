// menu-desktop.js v15.0.0 - Réintégration du hover vidéo
const log = (message, ...args) => console.log(`[SW-DESK-MENU] ${message}`, ...args);

/**
 * Gère le survol des activités pour jouer les vidéos correspondantes.
 * @requires gsap
 */
function initActivityHover() {
    log("Initialisation du survol des activités.");

    const videoListContainer = document.querySelector('.desktop_menu_content.right .w-dyn-items');
    const menuItems = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');

    if (!videoListContainer || menuItems.length === 0) {
        log("Conteneurs de vidéos ou éléments de menu introuvables. La fonctionnalité de survol est désactivée.");
        return;
    }

    const videos = Array.from(videoListContainer.children);
    log(`${videos.length} wrappers de vidéos trouvés.`);

    // On cache toutes les vidéos au départ
    videos.forEach(videoWrapper => {
        gsap.set(videoWrapper, { display: 'none', opacity: 0 });
    });

    menuItems.forEach(item => {
        const activityName = item.getAttribute('data-name');
        if (!activityName) {
            log("Attribut data-name manquant sur l'élément de menu :", item);
            return;
        }

        const targetVideoWrapper = videos.find(v => {
            const videoElement = v.querySelector('video');
            return videoElement && videoElement.getAttribute('data-video-name') === activityName;
        });

        if (!targetVideoWrapper) {
            log(`Aucun wrapper de vidéo trouvé pour l'activité : ${activityName}`);
            return;
        }

        const videoElement = targetVideoWrapper.querySelector('video');
        if (!videoElement) {
            log(`Aucune balise <video> trouvée dans le wrapper pour : ${activityName}`);
            return;
        }

        item.addEventListener('mouseenter', () => {
            // Cacher toutes les autres vidéos d'abord
            videos.forEach(otherVideoWrapper => {
                if (otherVideoWrapper !== targetVideoWrapper) {
                    gsap.to(otherVideoWrapper, { opacity: 0, duration: 0.2, onComplete: () => {
                        gsap.set(otherVideoWrapper, { display: 'none' });
                        const otherVideo = otherVideoWrapper.querySelector('video');
                        if (otherVideo) {
                            otherVideo.pause();
                            otherVideo.currentTime = 0; // Rembobine la vidéo
                        }
                    }});
                }
            });
            
            // Afficher et lancer la vidéo cible
            gsap.set(targetVideoWrapper, { display: 'block' });
            gsap.to(targetVideoWrapper, { opacity: 1, duration: 0.2 });
            videoElement.play().catch(error => log(`Erreur de lecture vidéo pour ${activityName}:`, error));
        });
    });

    log("Survol des activités configuré.");
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
            if (!this.menuWrapper.contains(e.target)) {
                this.hideAllPanels();
            }
        });

        log('Gestionnaire de clic "Stratégie Wrapper" est actif.');
    }
}

export function initMenuDesktop() {
    log("Initialisation v15.0.0... Stratégie 'Wrapper' + Hover Vidéo");
    new WrapperBasedContractHandler();
    initActivityHover();
}
