// Fonction d'initialisation qui sera appelée une fois que tout est chargé
export function initTextAnimation() {
    console.log('🚀 Initialisation de l\'animation de texte');

    // Sélection des éléments
    const spanMover = document.querySelector('.span_mover');
    const displays = document.querySelectorAll('.display');

    // Log des éléments trouvés
    console.log('🔍 Éléments trouvés:', {
        spanMover: spanMover ? '✅ Trouvé' : '❌ Non trouvé',
        nombreDisplays: displays.length,
        displays: Array.from(displays).map(d => d.textContent)
    });

    // Vérification que tous les éléments nécessaires sont présents
    if (!spanMover || displays.length === 0) {
        console.error('❌ Éléments manquants pour l\'animation de texte');
        return;
    }

    try {
        // Configuration de l'animation
        const config = {
            duration: 0.6,
            ease: "back.out(1.7)",
            pauseDuration: 1.5, // Durée de pause identique pour chaque étape
            cycleDelay: 0.5,   // Délai entre les cycles
            positions: {
                start: "0%",
                middle: "-34%",
                end: "-68%"
            }
        };

        let currentIndex = 0;
        let isAnimating = false;

        function animate() {
            if (isAnimating) return;
            isAnimating = true;

            const sequence = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                    // Retour à la position initiale et redémarrage immédiat
                    gsap.to(spanMover, {
                        y: config.positions.start,
                        duration: config.duration,
                        ease: config.ease,
                        onComplete: () => {
                            currentIndex = 0;
                            // Redémarrer l'animation après un court délai
                            setTimeout(animate, config.cycleDelay * 1000);
                        }
                    });
                }
            });

            // Animation pour chaque position
            const positions = [
                config.positions.start,  // Position initiale
                config.positions.middle, // Position du milieu
                config.positions.end     // Position finale
            ];

            // Animer vers chaque position avec pause égale
            for (let i = 0; i < positions.length; i++) {
                // Animation vers la position
                sequence.to(spanMover, {
                    y: positions[i],
                    duration: config.duration,
                    ease: config.ease
                });

                // Pause égale sur chaque position
                sequence.to({}, { duration: config.pauseDuration });
            }

            sequence.play();
        }

        // Démarrer l'animation
        animate();

        // Nettoyage
        window.addEventListener('beforeunload', () => {
            gsap.killTweensOf(spanMover);
        });

    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de l\'animation de texte:', error);
    }
}

// Vérification que GSAP est chargé
function checkGSAPLoaded() {
    if (typeof gsap !== 'undefined') {
        console.log('✅ GSAP est chargé, démarrage de l\'animation');
        setTimeout(initTextAnimation, 100);
    } else {
        console.log('⏳ En attente de GSAP...');
        setTimeout(checkGSAPLoaded, 100);
    }
}

// Démarrage de la vérification
checkGSAPLoaded(); 