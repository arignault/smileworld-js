import Player from '@vimeo/player';

const MODULE_NAME = "menu-video";
const MODULE_VERSION = "1.0.0";

const log = (message, ...args) => console.log(`[SW-MENU-VIDEO] ${message}`, ...args);

export function initMenuVideo() {
    const activityLinks = document.querySelectorAll('[data-name]');
    const videoWrappers = document.querySelectorAll('[data-video-for-name]');

    if (activityLinks.length === 0 || videoWrappers.length === 0) {
        log("Éléments nécessaires non trouvés (liens avec [data-name] ou vidéos avec [data-video-for-name]). Module inactif.");
        return;
    }

    log(`Initialisation pour ${activityLinks.length} activités et ${videoWrappers.length} vidéos.`);

    // Map to store Vimeo Player instances
    const players = new Map();
    videoWrappers.forEach(wrapper => {
        const iframe = wrapper.querySelector('iframe');
        if (iframe) {
            const name = wrapper.dataset.videoForName;
            const player = new Player(iframe);
            players.set(name, player);
            // Set all videos to very low volume
            player.setVolume(0.1);
            player.pause();
        }
        // Initially hide all video wrappers
        wrapper.style.display = 'none';
    });
    
    // Show the first video by default
    if (videoWrappers.length > 0) {
        videoWrappers[0].style.display = 'block';
    }


    activityLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const name = link.dataset.name;
            log(`Survol de : ${name}`);

            // Pause all videos and hide all wrappers
            players.forEach((player, playerName) => {
                if (playerName !== name) {
                    player.pause();
                }
            });

            videoWrappers.forEach(wrapper => {
                wrapper.style.display = 'none';
            });

            // Find the corresponding video wrapper and player
            const targetWrapper = document.querySelector(`[data-video-for-name="${name}"]`);
            const targetPlayer = players.get(name);

            if (targetWrapper && targetPlayer) {
                targetWrapper.style.display = 'block';
                targetPlayer.play().catch(error => {
                    log(`Erreur de lecture automatique pour ${name}:`, error.name);
                });
            } else {
                log(`Vidéo correspondante non trouvée pour : ${name}`);
            }
        });
    });

    console.log(`🎬 ${MODULE_NAME}.js v${MODULE_VERSION} chargé et écouteurs actifs.`);
} 