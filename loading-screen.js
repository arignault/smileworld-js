// Version: 1.1.3 - Nettoyage du code
// import { gsap } from 'gsap';

console.log('🚀 loading-screen.js v1.3.0 chargé');

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
    return new Promise((resolve) => {
        if (!window.gsap) {
            console.error("GSAP n'est pas chargé.");
            resolve();
            return;
        }

        const loader = document.querySelector('.loadingscreen');

        if (!loader) {
            console.warn("Élément .loadingscreen introuvable. L'animation ne peut pas démarrer.");
            resolve(); // On résout pour ne pas bloquer la suite
            return;
        }

        const tl = window.gsap.timeline({
            onComplete: () => {
                console.log("Animation du loader terminée.");
                if (loader) loader.style.display = 'none';
                resolve(); // On signale que l'animation est finie
            }
        });

        tl.to(loader, {
            autoAlpha: 0,
            duration: 0.5,
            delay: 1
        });
    });
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

    console.log('🎬 Démarrage de l\'animation de masquage');
    const tl = window.gsap.timeline({
        onComplete: () => {
            console.log('✅ Animation de masquage terminée');
            window.gsap.set(loadingScreen, { display: 'none' });
            isHiding = false;
        }
    });

    // Animation de sortie simplifiée et unifiée
    tl.to(loadingScreen, {
        opacity: 0,
        duration: config.fadeOutDuration,
        ease: config.ease
    });
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
