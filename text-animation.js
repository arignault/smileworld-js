// Version: 2.1.0 - Prêt pour le build
// import { gsap } from 'gsap';
// import { SplitText } from 'gsap/SplitText';

console.log('🚀 text-animation.js v2.1.0 chargé');

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

// L'initialisation est maintenant gérée par main_gsap.js
// function checkGSAPLoaded() {
//     if (typeof gsap !== 'undefined') {
//         setTimeout(initTextAnimation, 100);
//     } else {
//         setTimeout(checkGSAPLoaded, 100);
//     }
// }
// checkGSAPLoaded();

function animateText(element) {
    if (!element.hasAttribute('data-text-animated')) {
        const type = element.dataset.textAnimation || 'chars';
        const mySplitText = new window.gsap.SplitText(element, { type: type });
        
        let split;
        if (type === 'chars') {
            split = mySplitText.chars;
        } else if (type === 'words') {
            split = my.SplitText.words;
        } else {
            split = mySplitText.lines;
        }

        window.gsap.from(split, {
            duration: 0.8,
            opacity: 0,
            y: 20,
            ease: 'power2.out',
            stagger: 0.05,
            onComplete: () => {
                mySplitText.revert();
            }
        });
        element.setAttribute('data-text-animated', 'true');
    }
}

// Lancer l'animation pour les éléments déjà visibles 