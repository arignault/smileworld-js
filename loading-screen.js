// Version: 1.0.2 - Amélioration de la gestion d'état et des logs
console.log('🎬 loading-screen.js chargé');

// État du loading screen
let isLoadingScreenVisible = true;
let isInitialized = false;

// Configuration de l'animation
const loadingConfig = {
    duration: 1.5,
    ease: "power2.inOut"
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

    // S'assurer que le loading screen est visible
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
    `;

    // Animation du logo
    const logoWrap = loadingScreen.querySelector('.loading_logo_wrap');
    if (logoWrap) {
        console.log('✅ Élément .loading_logo_wrap trouvé, démarrage des animations');
        
        // Animation de rotation du logo
        gsap.to(logoWrap, {
            rotation: 360,
            duration: loadingConfig.duration,
            repeat: -1,
            ease: loadingConfig.ease,
            transformOrigin: "center center"
        });

        // Animation de scale pour un effet de pulsation
        gsap.to(logoWrap, {
            scale: 1.1,
            duration: loadingConfig.duration / 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    } else {
        console.warn('⚠️ Élément .loading_logo_wrap non trouvé');
    }

    isInitialized = true;
    console.log('✅ Loading screen initialisé avec succès');
    return loadingScreen;
}

// Fonction pour masquer le loading screen
export function hideLoadingScreen() {
    console.log('🔄 Tentative de masquage du loading screen...');
    
    if (!isInitialized) {
        console.warn('⚠️ Loading screen non initialisé, impossible de le masquer');
        return;
    }

    const loadingScreen = document.querySelector('.loadingscreen');
    if (!loadingScreen) {
        console.error('❌ Élément .loadingscreen non trouvé lors du masquage');
        return;
    }

    console.log('✅ Élément .loadingscreen trouvé, début de la transition');

    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => {
            console.log('🔄 Début de la transition de masquage');
        },
        onComplete: () => {
            loadingScreen.style.display = 'none';
            isLoadingScreenVisible = false;
            console.log('✅ Loading screen masqué avec succès');
        }
    });
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
        console.log('✅ Loading screen forcé à se masquer');
    }
} 