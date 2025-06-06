// Version: 1.1.0 - Refactored to use a single, looping GSAP timeline
console.log('🚀 text-animation.js v1.1.0 chargé');

export function initTextAnimation() {
    const spanMover = document.querySelector('.span_mover');
    if (!spanMover) {
        console.warn('⚠️ Span mover for text animation not found');
        return;
    }

    const config = {
        totalItems: 3,
        itemHeight: 100, // in percentage (e.g., -100%)
        duration: 0.8,
        ease: 'power2.inOut',
        cycleDelay: 3 // seconds
    };

    function createLoopingAnimation() {
        const masterTl = gsap.timeline({
            repeat: -1,
            repeatDelay: config.cycleDelay
        });

        // Loop through each text item
        for (let i = 1; i < config.totalItems; i++) {
            const yPos = -i * config.itemHeight;
            masterTl.to(spanMover, {
                y: `${yPos}%`,
                duration: config.duration,
                ease: config.ease
            }, `+=${config.cycleDelay}`);
        }
        
        // Add a final step to go back to the start for a seamless loop
        masterTl.to(spanMover, {
            y: '0%',
            duration: config.duration,
            ease: config.ease
        }, `+=${config.cycleDelay}`);
    }

    createLoopingAnimation();
    console.log('✅ Text animation initialisée.');
} 