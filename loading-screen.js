// Version: 1.0.24 - Synchronisation des animations et réduction des durées
console.log('🎬 loading-screen.js chargé - Version 1.0.24');

// État du loading screen
let isLoadingScreenVisible = true;
let isInitialized = false;
let isTransitioning = false;
let isInitialLoad = true;

// Configuration de l'animation
const loadingConfig = {
    duration: 0.4, // Réduit de 0.6 à 0.4
    bounceScale: 1.2,
    ease: "elastic.out(1, 0.5)",
    dissolveDuration: 0.4, // Réduit de 0.9 à 0.4
    fastDissolveDuration: 0.2, // Nouvelle durée rapide pour la fin
    initialState: {
        scale: 1,
        opacity: 1
    }
};

// Fonction pour initialiser le loading screen
export function initLoadingScreen() {
    console.log('🔄 Initialisation du loading screen...');
    
    if (isInitialized) {
        console.log('⚠️ Loading screen déjà initialisé');
        return;
    }

    // Récupérer l'élément existant
    const loadingScreen = document.querySelector('.loadingscreen');
    if (!loadingScreen) {
        console.error('❌ Élément .loadingscreen non trouvé');
        return;
    }

    console.log('✅ Élément .loadingscreen trouvé');

    // Récupérer le logo wrap
    const logoWrap = loadingScreen.querySelector('.loading_logo_wrap');
    if (!logoWrap) {
        console.error('❌ .loading_logo_wrap non trouvé');
        return;
    }

    // Configuration minimale du loading screen
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        justify-content: center;
        align-items: center;
        opacity: 1;
        pointer-events: none;
        background-color: white;
        backdrop-filter: blur(0px);
        -webkit-backdrop-filter: blur(0px);
    `;

    // Définir l'état initial du logo (déjà visible)
    gsap.set(logoWrap, {
        scale: 1,
        opacity: 1
    });

    // Animation initiale
    playLoadingAnimation(loadingScreen, logoWrap, () => {
        isLoadingScreenVisible = false;
    });

    // Ajouter les écouteurs d'événements pour les liens internes
    setupInternalLinks();

    isInitialized = true;
    console.log('✅ Loading screen initialisé avec succès');
    return loadingScreen;
}

// Fonction pour jouer l'animation de chargement (IN)
function playLoadingAnimation(loadingScreen, logoWrap, onComplete) {
    // Animation simultanée du fond et du logo
    const tl = gsap.timeline();

    // Animation du fond (blur et transparence) en même temps que le rebond
    tl.to(loadingScreen, {
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'transparent',
        duration: loadingConfig.dissolveDuration,
        ease: "power2.inOut"
    });

    // Animation de rebond du logo en même temps
    tl.to(logoWrap, {
        scale: loadingConfig.bounceScale,
        duration: loadingConfig.duration * 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    }, "<"); // Le "<" fait démarrer cette animation en même temps que la précédente

    // Une fois les animations principales terminées
    tl.call(() => {
        if (isInitialLoad) {
            // Animation rapide de fade out
            gsap.to(loadingScreen, {
                opacity: 0,
                backdropFilter: 'blur(0px)',
                WebkitBackdropFilter: 'blur(0px)',
                duration: loadingConfig.fastDissolveDuration,
                ease: "power2.inOut",
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    isInitialLoad = false;
                    if (onComplete) onComplete();
                }
            });
            
            // Animation rapide de fade out du logo
            gsap.to(logoWrap, {
                opacity: 0,
                scale: 0.8,
                duration: loadingConfig.fastDissolveDuration,
                ease: "power2.inOut"
            });
        } else {
            if (onComplete) onComplete();
        }
    });
}

// Fonction pour jouer l'animation de transition (OUT)
function playTransitionAnimation(loadingScreen, logoWrap, onComplete) {
    const tl = gsap.timeline();

    // Animation simultanée du fond et du logo
    tl.to(logoWrap, {
        scale: loadingConfig.bounceScale,
        duration: loadingConfig.duration * 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });

    tl.to(loadingScreen, {
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'white',
        duration: loadingConfig.dissolveDuration,
        ease: "power2.inOut"
    }, "<");

    tl.call(() => {
        if (onComplete) onComplete();
    });
}

// Fonction pour configurer les écouteurs d'événements des liens internes
function setupInternalLinks() {
    document.addEventListener('click', (e) => {
        // Trouver le lien le plus proche
        const link = e.target.closest('a');
        if (!link) return;

        // Vérifier si c'est un lien interne
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }

        // Empêcher le comportement par défaut
        e.preventDefault();
        
        // Afficher le loading screen avec l'animation inverse
        showLoadingScreen(() => {
            // Rediriger vers la nouvelle page une fois l'animation terminée
            window.location.href = href;
        });
    });
}

// Fonction pour afficher le loading screen (animation inverse)
export function showLoadingScreen(onComplete) {
    if (isTransitioning) return;
    isTransitioning = true;

    const loadingScreen = document.querySelector('.loadingscreen');
    const logoWrap = loadingScreen.querySelector('.loading_logo_wrap');

    if (!loadingScreen || !logoWrap) {
        console.error('❌ Éléments du loading screen non trouvés');
        return;
    }

    // Réinitialiser les styles et s'assurer que le loading screen est visible
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1'; // Réinitialiser l'opacité
    loadingScreen.style.pointerEvents = 'auto';
    loadingScreen.style.backgroundColor = 'transparent';
    loadingScreen.style.backdropFilter = 'blur(0px)';
    loadingScreen.style.webkitBackdropFilter = 'blur(0px)';
    
    // S'assurer que le logo est dans l'état initial pour l'animation OUT
    gsap.set(logoWrap, {
        scale: 1,
        opacity: 1
    });

    // Jouer l'animation de transition
    playTransitionAnimation(loadingScreen, logoWrap, () => {
        isLoadingScreenVisible = true;
        if (onComplete) onComplete();
    });
}

// Fonction pour masquer le loading screen
export function hideLoadingScreen() {
    if (!isInitialized || isTransitioning) {
        console.warn('⚠️ Loading screen non initialisé ou en transition');
        return;
    }

    const loadingScreen = document.querySelector('.loadingscreen');
    if (!loadingScreen) {
        console.error('❌ Élément .loadingscreen non trouvé lors du masquage');
        return;
    }

    // On ne cache pas le loading screen pendant les transitions
    if (!isInitialLoad) {
        loadingScreen.style.display = 'none';
    }
    loadingScreen.style.pointerEvents = 'none';
    isLoadingScreenVisible = false;
    isTransitioning = false;
}

// Fonction pour vérifier si le loading screen est prêt
export async function waitForLoadingScreen() {
    console.log('⏳ Attente de la fin du loading screen...');
    
    return new Promise((resolve) => {
        const checkLoading = setInterval(() => {
            if (!isLoadingScreenVisible) {
                clearInterval(checkLoading);
                console.log('✅ Loading screen terminé, résolution de la promesse');
                resolve();
            }
        }, 100);

        // Timeout de sécurité après 10 secondes
        setTimeout(() => {
            if (isLoadingScreenVisible) {
                console.warn('⚠️ Timeout du loading screen après 10 secondes');
                clearInterval(checkLoading);
                hideLoadingScreen(); // Force le masquage
                resolve();
            }
        }, 10000);
    });
}

// Fonction pour forcer le masquage du loading screen
export function forceHideLoadingScreen() {
    console.log('⚠️ Forçage du masquage du loading screen');
    const loadingScreen = document.querySelector('.loadingscreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        loadingScreen.style.opacity = '0';
        isLoadingScreenVisible = false;
        isInitialized = false;
        isInitialLoad = true; // Réinitialiser le flag pour le prochain chargement
        console.log('✅ Loading screen forcé à se masquer');
    }
} 