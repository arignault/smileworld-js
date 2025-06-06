// Version: 1.1.2 - Nettoyage du code

// Configuration de l'animation
const config = {
    logoPopDuration: 0.3,
    fadeOutDuration: 0.4,
    fadeInDuration: 0.3,
    ease: "power2.out",
    logoPopScale: 1.1,
    logoShrinkScale: 0.8
};

let isInitialized = false;
let isHiding = false;

// Initialise l'écran de chargement
export function initLoadingScreen() {
    if (isInitialized) return Promise.resolve();
    
    const loadingScreen = document.querySelector('.loadingscreen');
    const logoWrap = document.querySelector('.loading_logo_wrap');

    if (!loadingScreen || !logoWrap) {
        isInitialized = false;
        return Promise.resolve(null);
    }

    gsap.set(loadingScreen, { 
        opacity: 1, 
        display: 'flex',
        backgroundColor: 'white'
    });
    gsap.set(logoWrap, { opacity: 1, scale: 1 });

    setupInternalLinkListener();
    isInitialized = true;
    return Promise.resolve(loadingScreen);
}

// Masque l'écran de chargement
export function hideLoadingScreen() {
    if (!isInitialized || isHiding) return;
    isHiding = true;

    const loadingScreen = document.querySelector('.loadingscreen');
    const logoWrap = document.querySelector('.loading_logo_wrap');
    
    if (!loadingScreen || !logoWrap) return;

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(loadingScreen, { display: 'none' });
            isHiding = false;
        }
    });

    tl.to(logoWrap, {
        scale: config.logoPopScale,
        duration: config.logoPopDuration / 2,
        ease: config.ease,
        yoyo: true,
        repeat: 1
    });

    tl.to(loadingScreen, {
        opacity: 0,
        duration: config.fadeOutDuration,
        ease: config.ease
    }, `-=${config.logoPopDuration / 2}`);
}

// Masque immédiatement l'écran de chargement
export function forceHideLoadingScreen() {
    const loadingScreen = document.querySelector('.loadingscreen');
    if (loadingScreen) {
        gsap.set(loadingScreen, { display: 'none' });
    }
    isHiding = false;
}

// Affiche l'écran de chargement pour les transitions
function showLoadingScreenForTransition(onComplete) {
    const loadingScreen = document.querySelector('.loadingscreen');
    if (!loadingScreen) {
        onComplete();
        return;
    }

    gsap.timeline({ onComplete })
        .set(loadingScreen, { display: 'flex', opacity: 0, backgroundColor: 'white' })
        .to(loadingScreen, { opacity: 1, duration: config.fadeInDuration, ease: config.ease });
}

// Écoute les clics sur les liens internes pour les transitions
function setupInternalLinkListener() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (!link) return;

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');

        if (!href || href.startsWith('#') || href.startsWith('http') || target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }
        
        e.preventDefault();
        
        showLoadingScreenForTransition(() => {
            window.location.href = href;
        });
    }, true);
} 