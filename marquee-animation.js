import { gsap } from "gsap";

const MODULE_NAME = "marquee-animation";
const MODULE_VERSION = "1.0.0";

const log = (message, ...args) => console.log(`[SW-MARQUEE] ${message}`, ...args);

function initMarquee(marqueeElement) {
    const track = marqueeElement.querySelector('.cms_slider_wrapper');
    if (!track) {
        log(`No '.cms_slider_wrapper' found inside`, marqueeElement);
        return;
    }

    const items = Array.from(track.children).filter(child => child.classList.contains('activite-item'));
    if (items.length === 0) {
        log('No ".activite-item" items to animate in track', track);
        return;
    }

    // Set styles for the animation to work correctly
    gsap.set(track, { display: 'flex', flexWrap: 'nowrap' });
    gsap.set(items, { flexShrink: 0, marginRight: '20px' }); // Add some space between items
    
    // Use a timeout to ensure all images are loaded and widths are correct
    setTimeout(() => {
        const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth + 20, 0); // Include margin
        const containerWidth = marqueeElement.offsetWidth;
        
        // Only animate if the content overflows
        if (totalWidth <= containerWidth) {
            log('Content does not overflow, animation not needed for', marqueeElement);
            return;
        }

        log(`Initializing marquee for`, marqueeElement);
        
        // Clone items to create a seamless loop
        let clones = [];
        let currentWidth = totalWidth;
        // Clone until the track is at least twice the width of the container
        while (currentWidth < containerWidth * 2) {
             items.forEach(item => {
                const clone = item.cloneNode(true);
                clone.classList.add('clone');
                track.appendChild(clone);
                clones.push(clone);
                currentWidth += item.offsetWidth + 20;
            });
        }
        
        const timeline = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" }
        });

        // The duration is proportional to the total width to maintain a constant speed
        const distance = totalWidth;
        const duration = distance / 100; // Speed factor: lower is faster

        timeline.to(track, {
            x: `-=${distance}`,
            duration: duration
        });

        // Optional: slow down on hover
        marqueeElement.addEventListener('mouseenter', () => timeline.timeScale(0.2));
        marqueeElement.addEventListener('mouseleave', () => timeline.timeScale(1));

    }, 300); // Delay to allow for rendering and image loading
}

export function initMarqueeAnimation() {
    console.log(`🎬 ${MODULE_NAME}.js v${MODULE_VERSION} chargé`);
    const marquees = document.querySelectorAll('.activit_wrapper');
    if (marquees.length > 0) {
        log(`${marquees.length} marquee container(s) found. Initializing...`);
        marquees.forEach(initMarquee);
    }
} 