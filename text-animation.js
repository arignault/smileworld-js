// Version: 1.0.1 - Nettoyage du code

// Initialise l'animation de texte
export function initTextAnimation() {
    const spanMover = document.querySelector('.span_mover');
    const displays = document.querySelectorAll('.display');

    if (!spanMover || displays.length === 0) return;

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

        let currentIndex = 0;
        let isAnimating = false;

        function animate() {
            if (isAnimating) return;
            isAnimating = true;

            const sequence = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                    gsap.to(spanMover, {
                        y: config.positions.start,
                        duration: config.duration,
                        ease: config.ease,
                        onComplete: () => {
                            currentIndex = 0;
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

            for (let i = 0; i < positions.length; i++) {
                sequence.to(spanMover, {
                    y: positions[i],
                    duration: config.duration,
                    ease: config.ease
                });
                sequence.to({}, { duration: config.pauseDuration });
            }

            sequence.play();
        }

        animate();

        window.addEventListener('beforeunload', () => {
            gsap.killTweensOf(spanMover);
        });
    } catch (error) {}
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