import { gsap } from "gsap";

const MODULE_NAME = "card-tags-animation";
const MODULE_VERSION = "4.0.0"; // Correct selector + Two-level observer strategy

const log = (message, ...args) => console.log(`[SW-TAGS] ${message}`, ...args);

// The core animation logic for a single card
function setupAnimationForCard(cardElement) {
    // Specific selector to target the inner container that actually holds the tags.
    const tagWrapper = cardElement.querySelector("div.tag_wrapper_gsap_loop[role='list']");

    if (!tagWrapper) {
        log(`ERROR: setupAnimationForCard called, but could not find the specific tag wrapper in card:`, cardElement);
        return;
    }
    
    // A small delay to ensure Finsweet has rendered everything and widths are calculated.
    setTimeout(() => {
        const tags = Array.from(tagWrapper.children).filter(c => !c.classList.contains('clone'));
        
        // Clean up previous clones if this function is ever re-run on the same element.
        tagWrapper.querySelectorAll('.clone').forEach(clone => clone.remove());
        
        if (tags.length <= 1) {
            return; // Not enough tags to create a meaningful scroll animation.
        }

        log(`Animating ${tags.length} tags for card:`, cardElement);

        const distance = tags.reduce((acc, tag) => acc + tag.offsetWidth, 0);
        
        if (distance === 0) {
            log(`Animation cancelled, total tag width is 0 for card:`, cardElement);
            return;
        }
        
        // Clone the tags to create a seamless, infinite loop.
        tags.forEach(tag => {
            const clone = tag.cloneNode(true);
            clone.classList.add('clone');
            tagWrapper.appendChild(clone);
        });
        
        gsap.set(tagWrapper, { x: 0 });

        const timeline = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" }
        });

        // The duration is proportional to the number of tags to keep a consistent speed.
        timeline.to(tagWrapper, {
            x: `-=${distance}`,
            duration: tags.length * 2.5,
        });
    }, 500); // 500ms safety delay for rendering.
}

// Sets up an observer on a single card to wait for tags to be populated.
function setupObserverForCard(cardElement) {
    log(`Setting up tag observer for card:`, cardElement);

    // First, check if tags are already present when this is called.
    const initialTagWrapper = cardElement.querySelector("div.tag_wrapper_gsap_loop[role='list']");
    if (initialTagWrapper && initialTagWrapper.children.length > 0) {
        log(`Tags found immediately in card. Setting up animation.`);
        setupAnimationForCard(cardElement);
        return; // No need to observe if tags are already there.
    }

    // If tags are not there, create an observer to wait for them.
    const tagObserver = new MutationObserver((mutations, obs) => {
        const tagWrapper = cardElement.querySelector("div.tag_wrapper_gsap_loop[role='list']");
        // Once the container has children, we can proceed.
        if (tagWrapper && tagWrapper.children.length > 0) {
            log(`Tags detected by MutationObserver in card. Setting up animation.`);
            setupAnimationForCard(cardElement);
            obs.disconnect(); // We've found the tags, no need to observe this card anymore.
        }
    });

    tagObserver.observe(cardElement, { childList: true, subtree: true });

    // Safety timeout to prevent the observer from running forever.
    setTimeout(() => {
        try {
            tagObserver.disconnect();
        } catch(e) {}
    }, 10000);
}

// Main entry point for the module, called from main_gsap.js
export function initCardTagsAnimation() {
    console.log(`🏷️ ${MODULE_NAME}.js v${MODULE_VERSION} loaded and waiting for cards.`);

    // Level 1 Observer: Wait for the cards themselves to appear on the page.
    const initialCards = document.querySelectorAll('.centre_card_pro_wrapper');
    if (initialCards.length > 0) {
        log(`${initialCards.length} cards found on load. Setting up tag observers for each.`);
        initialCards.forEach(setupObserverForCard);
    } else {
        log(`No cards found on load. Setting up an observer on the body to wait for them.`);
        const bodyObserver = new MutationObserver((mutations, obs) => {
            const detectedCards = document.querySelectorAll('.centre_card_pro_wrapper');
            if (detectedCards.length > 0) {
                log(`${detectedCards.length} cards detected via body observer. Setting up tag observers.`);
                obs.disconnect(); // Stop observing the whole page.
                detectedCards.forEach(setupObserverForCard);
            }
        });
        bodyObserver.observe(document.body, { childList: true, subtree: true });
        
        // Safety timeout for the body observer.
        setTimeout(() => {
            try {
                bodyObserver.disconnect();
            } catch(e) {}
        }, 15000);
    }
}