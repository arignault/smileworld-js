// Version: 1.4.0 - Animation de sortie améliorée et sessionStorage
// import { gsap } from 'gsap';

console.log('🚀 loading-screen.js v1.4.0 chargé');

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
let isReadyToHide = false;
let minimumTimeElapsed = false;

// Tente de masquer l'écran de chargement si les deux conditions sont remplies
function tryHide() {
    if (isReadyToHide && minimumTimeElapsed) {
        hideLoadingScreen();
    }
}

// Initialise l'écran de chargement
export function initLoadingScreen() {
    // PISTE 2: Le "Session Storage Trick" pour n'afficher le loader qu'une fois.
    try {
        if (sessionStorage.getItem('preloaderShown')) {
            console.log('✅ Preloader déjà affiché dans cette session, on le cache immédiatement.');
            const loadingScreen = document.querySelector('.loadingscreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            isInitialized = true;
            isHiding = true; // Bloque toute autre logique de masquage
            return Promise.resolve();
        }
    } catch (e) {
        console.warn("Impossible d'accéder à sessionStorage, le preloader s'affichera à chaque fois.", e);
    }

    console.log('🎬 initLoadingScreen - Début de l\'initialisation (0.9s)');
    if (isInitialized) {
        console.log('ℹ️ Écran de chargement déjà initialisé');
        return Promise.resolve();
    }
    
    const loadingScreen = document.querySelector('.loadingscreen');
    const logoWrap = document.querySelector('.loading_logo_wrap');

    console.log('🔍 Éléments trouvés:', {
        loadingScreen: !!loadingScreen,
        logoWrap: !!logoWrap
    });

    if (!loadingScreen || !logoWrap) {
        console.warn('⚠️ Éléments manquants:', {
            loadingScreen: !loadingScreen ? 'Non trouvé' : 'OK',
            logoWrap: !logoWrap ? 'Non trouvé' : 'OK'
        });
        isInitialized = false;
        return Promise.resolve(null);
    }

    console.log('🎨 Configuration des styles initiaux');
    window.gsap.set(loadingScreen, { 
        opacity: 1, 
        display: 'flex',
        backgroundColor: 'white'
    });
    
    // Animation d'entrée pour le logo
    window.gsap.set(logoWrap, { opacity: 0, scale: 0.9 });
    window.gsap.to(logoWrap, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.1,
        ease: config.ease
    });

    // Lancement du minuteur pour la durée minimale - RÉDUIT À 0.9s
    setTimeout(() => {
        console.log('⏱️ 0.9 secondes écoulées.');
        minimumTimeElapsed = true;
        tryHide(); // Tente de masquer si l'autre condition est déjà remplie
    }, 900); // 900ms au lieu de 1500ms

    isInitialized = true;
    console.log('✅ Écran de chargement initialisé avec succès (0.9s)');
    return Promise.resolve(loadingScreen);
}

// L'application est prête, on peut demander à masquer l'écran
export function requestHideLoadingScreen() {
    console.log('🟢 Application prête, demande de masquage de l\'écran de chargement.');
    isReadyToHide = true;
    tryHide(); // Tente de masquer si le temps est déjà écoulé
}

// Masque l'écran de chargement (logique interne)
function hideLoadingScreen() {
    console.log('🎬 hideLoadingScreen - Début du masquage');
    if (!isInitialized) {
        console.warn('⚠️ Écran de chargement non initialisé');
        return;
    }
    if (isHiding) {
        console.log('ℹ️ Masquage déjà en cours');
        return;
    }
    
    isHiding = true;
    const loadingScreen = document.querySelector('.loadingscreen');
    const logoWrap = document.querySelector('.loading_logo_wrap');
    
    console.log('🔍 Éléments trouvés pour le masquage:', {
        loadingScreen: !!loadingScreen,
        logoWrap: !!logoWrap
    });

    if (!loadingScreen || !logoWrap) {
        console.warn('⚠️ Éléments manquants pour le masquage');
        isHiding = false;
        return;
    }

    console.log('🎬 Démarrage de l\'animation de masquage améliorée');
    const tl = window.gsap.timeline({
        onComplete: () => {
            console.log('✅ Animation de masquage terminée');
            window.gsap.set(loadingScreen, { display: 'none' });
            isHiding = false;
            // On enregistre que le preloader a été montré pour cette session
            try {
                sessionStorage.setItem('preloaderShown', 'true');
            } catch (e) {
                console.warn("Impossible d'enregistrer l'état du preloader dans sessionStorage.", e);
            }
        }
    });

    // PISTE 1: Animation de sortie améliorée en deux temps
    // 1. Le logo (et le lottie) se réduit et disparaît
    tl.to(logoWrap, {
        opacity: 0,
        scale: config.logoShrinkScale,
        duration: config.logoPopDuration,
        ease: config.ease
    })
    // 2. Puis l'écran entier disparaît en fondu
    .to(loadingScreen, {
        opacity: 0,
        duration: config.fadeOutDuration,
        ease: config.ease
    }, "-=0.1"); // On fait se chevaucher légèrement les animations pour plus de fluidité
}

// Masque immédiatement l'écran de chargement
export function forceHideLoadingScreen() {
    const loadingScreen = document.querySelector('.loadingscreen');
    if (loadingScreen) {
        window.gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                window.gsap.set(loadingScreen, { display: 'none' });
            }
        });
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

    window.gsap.timeline({ onComplete })
        .set(loadingScreen, { display: 'flex', opacity: 0, backgroundColor: 'white' })
        .to(loadingScreen, { opacity: 1, duration: config.fadeInDuration, ease: config.ease });
}

// Écoute les clics sur les liens internes pour les transitions
function setupInternalLinkListener() {
    // document.addEventListener('click', (e) => {
    //     const link = e.target.closest('a');

    //     if (!link) return;

    //     const href = link.getAttribute('href');
    //     const target = link.getAttribute('target');

    //     if (!href || href.startsWith('#') || href.startsWith('http') || target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:')) {
    //         return;
    //     }
        
    //     e.preventDefault();
        
    //     showLoadingScreenForTransition(() => {
    //         window.location.href = href;
    //     });
    // }, true);
} 
