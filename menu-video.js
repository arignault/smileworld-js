const MODULE_NAME = "menu-video";
const MODULE_VERSION = "2.0.0"; // Switched to src-swapping method

const log = (message, ...args) => console.log(`[SW-MENU-VIDEO] ${message}`, ...args);

export function initMenuVideo() {
    const activityLinks = document.querySelectorAll('[data-video-src]');
    const videoEmbed = document.querySelector('[data-menu-video="target"]');

    if (activityLinks.length === 0 || !videoEmbed) {
        log("Éléments nécessaires non trouvés (liens avec [data-video-src] ou un embed avec [data-menu-video='target']). Module inactif.");
        return;
    }

    const iframe = videoEmbed.querySelector('iframe');
    if (!iframe) {
        log("Aucun iframe trouvé dans l'élément [data-menu-video='target'].");
        return;
    }

    log(`Initialisation pour ${activityLinks.length} activités et un iframe cible.`);

    // Set the initial video to the first activity's video
    const firstVideoSrc = activityLinks[0].dataset.videoSrc;
    if (firstVideoSrc) {
        // Ensure Vimeo autoplay and muted parameters are present for a good UX
        const url = new URL(firstVideoSrc);
        url.searchParams.set('autoplay', '1');
        url.searchParams.set('muted', '1');
        url.searchParams.set('background', '1'); // Hides controls, etc.
        iframe.src = url.toString();
        log(`Vidéo initiale chargée : ${iframe.src}`);
    }

    activityLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const videoSrc = link.dataset.videoSrc;
            if (!videoSrc) {
                log(`Lien survolé, mais pas de data-video-src trouvé.`);
                return;
            }

            const newUrl = new URL(videoSrc);
            newUrl.searchParams.set('autoplay', '1');
            newUrl.searchParams.set('muted', '1');
            newUrl.searchParams.set('background', '1');
            
            const newSrcString = newUrl.toString();

            // Only update the src if it's different to avoid unnecessary reloads
            if (iframe.src !== newSrcString) {
                log(`Changement de vidéo pour : ${newSrcString}`);
                iframe.src = newSrcString;
            }
        });
    });

    console.log(`🎬 ${MODULE_NAME}.js v${MODULE_VERSION} (méthode src-swap) chargé et écouteurs actifs.`);
} 