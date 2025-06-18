// Version: 2.0.0 - Nettoyé et simplifié
import { gsap } from 'gsap';

// Initialise l'animation de texte
export function initTextAnimation() {
    const spanMover = document.querySelector('.span_mover');
    if (!spanMover) return;

    try {
        const config = {
            duration: 0.6,
            ease: "back.out(1.7)",
            pauseDuration: 1.5,
            cycleDelay: 0.5,
            positions: {
                start: "0%",
                middle: "-34%",
                end: "-68%"
            }
        };

        let isAnimating = false;

        function animate() {
            if (isAnimating) return;
            isAnimating = true;

            const sequence = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                    // Revenir au début pour le prochain cycle
                    gsap.to(spanMover, {
                        y: config.positions.start,
                        duration: config.duration,
                        ease: config.ease,
                        onComplete: () => {
                            setTimeout(animate, config.cycleDelay * 1000);
                        }
                    });
                }
            });

            const positions = [
                config.positions.start,
                config.positions.middle,
                config.positions.end
            ];

            // Créer la séquence d'animation
            for (let i = 0; i < positions.length; i++) {
                sequence.to(spanMover, {
                    y: positions[i],
                    duration: config.duration,
                    ease: config.ease
                });
                // Ajouter une pause après chaque mouvement, sauf le dernier
                if (i < positions.length -1 ) {
                    sequence.to({}, { duration: config.pauseDuration });
                }
            }

            sequence.play();
        }

        animate();

        // Nettoyer l'animation lors du déchargement de la page
        window.addEventListener('beforeunload', () => {
            gsap.killTweensOf(spanMover);
        });
    } catch (error) {
        console.error("Erreur dans l'animation de texte:", error);
    }
}

// Vérifie que GSAP est chargé
function checkGSAPLoaded() {
    if (typeof gsap !== 'undefined') {
        setTimeout(initTextAnimation, 100);
    } else {
        setTimeout(checkGSAPLoaded, 100);
    }
}

checkGSAPLoaded(); 