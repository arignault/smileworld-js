import Player from '@vimeo/player';
import { gsap } from 'gsap';

const MODULE_NAME = "menu-video";
const MODULE_VERSION = "3.0.0"; // Logic based on old script (show/hide with GSAP)

const log = (message, ...args) => console.log(`[SW-MENU-VIDEO] ${message}`, ...args);

export function initMenuVideo() {
    const activityLinks = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');
    const videoList = document.querySelector('.desktop_menu_content.left .w-dyn-items');

    if (!activityLinks.length || !videoList) {
        log("Éléments nécessaires non trouvés. Vérifiez les sélecteurs. Module inactif.");
        return;
    }

    log(`Initialisation pour ${activityLinks.length} activités.`);

    // Prepare players and video elements map
    const videos = new Map();
    const players = new Map();

    Array.from(videoList.children).forEach(videoWrapper => {
        const name = videoWrapper.getAttribute('data-video-for');
        const iframe = videoWrapper.querySelector('iframe');
        if (name && iframe) {
            videos.set(name, videoWrapper);
            players.set(name, new Player(iframe));
            gsap.set(videoWrapper, { display: 'none', opacity: 0 });
        }
    });

    // Set a default video to show
    const defaultVideoName = "Bowling"; // Change if needed
    const defaultVideoWrapper = videos.get(defaultVideoName);
    const defaultPlayer = players.get(defaultVideoName);

    if (defaultVideoWrapper) {
        gsap.set(defaultVideoWrapper, { display: 'block', opacity: 1 });
    }

    let activeVideoWrapper = defaultVideoWrapper;
    let activePlayer = defaultPlayer;

    activityLinks.forEach(link => {
        const name = link.getAttribute('data-name');
        if (!name) return;

        link.addEventListener('mouseenter', () => {
            const newVideoWrapper = videos.get(name);
            const newPlayer = players.get(name);

            if (!newVideoWrapper || newVideoWrapper === activeVideoWrapper) return;
            
            // Hide the currently active video
            if (activeVideoWrapper) {
                gsap.to(activeVideoWrapper, { 
                    opacity: 0, 
                    duration: 0.2, 
                    onComplete: () => {
                        if (activeVideoWrapper !== newVideoWrapper) { // Don't hide if it's the new target
                           gsap.set(activeVideoWrapper, { display: 'none' });
                        }
                    } 
                });
                if (activePlayer) {
                    activePlayer.pause();
                }
            }
            
            // Show the new video
            gsap.set(newVideoWrapper, { display: 'block' });
            gsap.to(newVideoWrapper, { opacity: 1, duration: 0.2 });
            
            if (newPlayer) {
                newPlayer.setVolume(0);
                newPlayer.play().catch(e => log(`Autoplay error for ${name}: ${e.name}`));
            }

            activeVideoWrapper = newVideoWrapper;
            activePlayer = newPlayer;
        });
    });
    
    // Optional: Handle mouse leaving the entire menu area to reset to default
    const menuWrapper = document.querySelector('.desktop_menu_content.left');
    if (menuWrapper) {
        menuWrapper.addEventListener('mouseleave', () => {
            if (activeVideoWrapper !== defaultVideoWrapper) {
                gsap.to(activeVideoWrapper, { 
                    opacity: 0, 
                    duration: 0.2, 
                    onComplete: () => gsap.set(activeVideoWrapper, { display: 'none' }) 
                });
                if (activePlayer) {
                    activePlayer.pause();
                }

                if (defaultVideoWrapper) {
                    gsap.set(defaultVideoWrapper, { display: 'block' });
                    gsap.to(defaultVideoWrapper, { opacity: 1, duration: 0.2 });
                    // No need to autoplay the default one
                }
                
                activeVideoWrapper = defaultVideoWrapper;
                activePlayer = defaultPlayer;
            }
        });
    }

    console.log(`🎬 ${MODULE_NAME}.js v${MODULE_VERSION} (GSAP show/hide) chargé.`);
} 