// menu-desktop-hover-activite.js v2.0.0 - Logique originale restaurée pour les vidéos
import { gsap } from 'gsap';

const MODULE_NAME = "menu-desktop-hover-activite";
const MODULE_VERSION = "2.0.0";
const log = (message, ...args) => console.log(`[SW-HOVER-VIDEO] ${message}`, ...args);

export function initMenuDesktopHoverActivite() {
    log(`Initialisation... (${MODULE_NAME} v${MODULE_VERSION})`);

    const videoListContainer = document.querySelector('.desktop_menu_content.right .w-dyn-items');
    const menuItems = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');

    if (!videoListContainer) {
        log("ERREUR: Conteneur de vidéos (.desktop_menu_content.right .w-dyn-items) introuvable.");
        return;
    }
    if (menuItems.length === 0) {
        log("ERREUR: Aucun item de menu (.desktop_menu_list.acitivt-s .default-container) trouvé.");
        return;
    }

    const videoWrappers = Array.from(videoListContainer.children);
    const activeAnimations = new Map();
    log(`${videoWrappers.length} wrappers de vidéo trouvés. ${menuItems.length} items de menu trouvés.`);

    // Cacher toutes les vidéos au démarrage
    videoWrappers.forEach(wrapper => gsap.set(wrapper, { display: 'none', opacity: 0 }));

    const handleVideoDisplay = (activityName, isEntering) => {
        const targetWrapper = videoWrappers.find(wrapper => {
            const video = wrapper.querySelector('video');
            return video && video.id === activityName;
        });

        if (!targetWrapper) {
            log(`Vidéo pour "${activityName}" non trouvée.`);
            return;
        }

        log(`handleVideoDisplay: name=${activityName}, isEntering=${isEntering}`);

        // Annuler toute animation en cours sur le wrapper cible pour éviter les conflits
        if (activeAnimations.has(targetWrapper)) {
            activeAnimations.get(targetWrapper).kill();
        }

        if (isEntering) {
            // Cacher toutes les autres vidéos
            videoWrappers.forEach(wrapper => {
                if (wrapper !== targetWrapper) {
                    // On ne fait l'animation que si elle est visible
                    if (gsap.getProperty(wrapper, 'opacity') > 0) {
                        if (activeAnimations.has(wrapper)) activeAnimations.get(wrapper).kill();
                        const anim = gsap.to(wrapper, {
                            opacity: 0,
                            duration: 0.15,
                            onComplete: () => {
                                gsap.set(wrapper, { display: 'none' });
                                const video = wrapper.querySelector('video');
                                if (video) video.pause();
                            }
                        });
                        activeAnimations.set(wrapper, anim);
                    }
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
            activeAnimations.set(targetWrapper, showAnim);
        } else {
            // Au mouseleave, on cache simplement la vidéo qu'on vient de quitter
            const video = targetWrapper.querySelector('video');
            const hideAnim = gsap.to(targetWrapper, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    gsap.set(targetWrapper, { display: 'none' });
                    if (video) video.pause();
                }
            });
            activeAnimations.set(targetWrapper, hideAnim);
        }
    };

    menuItems.forEach((item, index) => {
        const name = item.getAttribute('data-name');
        if (!name) {
            log(`Item de menu #${index} n'a pas de data-name.`);
            return;
        }

        item.addEventListener('mouseenter', () => handleVideoDisplay(name, true));
        item.addEventListener('mouseleave', () => handleVideoDisplay(name, false));
    });

    log("Tous les écouteurs de survol ont été ajoutés.");
} 