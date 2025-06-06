// Version: 1.1.1 - Graceful failure when loading screen elements are not present
console.log('🎬 loading-screen.js chargé - Version 1.1.1');

// Configuration de l'animation
const config = {
    // Durations
    logoPopDuration: 0.3,
    fadeOutDuration: 0.4,
    fadeInDuration: 0.3,

    // Easing
    ease: "power2.out",
    
    // Scale
    logoPopScale: 1.1,
    logoShrinkScale: 0.8
};

let isInitialized = false;
let isHiding = false;

// --- PUBLIC API ---

// Called by main_gsap.js to set up the loading screen
export function initLoadingScreen() {
    if (isInitialized) return Promise.resolve();
    
    const loadingScreen = document.querySelector('.loadingscreen');
    const logoWrap = document.querySelector('.loading_logo_wrap');

    if (!loadingScreen || !logoWrap) {
        console.log('ℹ️ Éléments du loading screen non trouvés sur cette page, initialisation ignorée.');
        isInitialized = false; // Important: marquer comme non initialisé
        return Promise.resolve(null); // Renvoyer une promesse résolue pour ne pas bloquer
    }

    // Set initial styles for a clean start
    gsap.set(loadingScreen, { 
        opacity: 1, 
        display: 'flex',
        backgroundColor: 'white' // Start with a solid background
    });
    gsap.set(logoWrap, { opacity: 1, scale: 1 });

    setupInternalLinkListener();
    isInitialized = true;
    console.log('✅ Loading screen initialisé');
    return Promise.resolve(loadingScreen);
}

// Called by main_gsap.js when all modules are loaded
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

    // 1. Pop the logo slightly
    tl.to(logoWrap, {
        scale: config.logoPopScale,
        duration: config.logoPopDuration / 2,
        ease: config.ease,
        yoyo: true,
        repeat: 1
    });

    // 2. Fade out the entire screen
    tl.to(loadingScreen, {
        opacity: 0,
        duration: config.fadeOutDuration,
        ease: config.ease
    }, `-=${config.logoPopDuration / 2}`); // Start fade out during the logo pop
}

// This is not used by main_gsap.js but is kept for potential future use or if called by other modules.
// It immediately hides the screen without animation.
export function forceHideLoadingScreen() {
    const loadingScreen = document.querySelector('.loadingscreen');
    if (loadingScreen) {
        gsap.set(loadingScreen, { display: 'none' });
    }
    isHiding = false;
}

// --- PRIVATE FUNCTIONS ---

// Shows the loading screen for page transitions
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

// Listen for internal link clicks to trigger the transition
function setupInternalLinkListener() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (!link) return;

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');

        // Ignore external links, anchor links, and special protocols
        if (!href || href.startsWith('#') || href.startsWith('http') || target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }
        
        e.preventDefault();
        
        showLoadingScreenForTransition(() => {
            window.location.href = href;
        });
    }, true); // Use capture to catch the event early
} 