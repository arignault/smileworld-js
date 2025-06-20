import { gsap } from "gsap";

const MODULE_NAME = "card-tags-animation";
const MODULE_VERSION = "3.1.0"; // Added extensive logging

const log = (message, ...args) => console.log(`[SW-TAGS] ${message}`, ...args);

function setupAnimationForCard(cardElement) {
    log(`1. ENTERING setupAnimationForCard for card:`, cardElement);
    const tagWrapper = cardElement.querySelector(".tag-wrapper-gsap-loop");

    if (!tagWrapper) {
        log(`1.1. EXIT setupAnimationForCard: Wrapper .tag-wrapper-gsap-loop introuvable.`);
        return;
    }

    // On attend un instant pour s'assurer que le rendu est terminé et que les largeurs sont correctes.
    setTimeout(() => {
        log(`2. INSIDE setTimeout for card:`, cardElement);
        // On s'assure de ne travailler qu'avec les tags originaux, pas les clones
        const tags = Array.from(tagWrapper.children).filter(c => !c.classList.contains('clone'));
        
        log(`2.1. Found ${tags.length} original tags.`);

        // Vider les clones existants au cas où la fonction serait appelée plusieurs fois
        const existingClones = tagWrapper.querySelectorAll('.clone');
        if (existingClones.length > 0) {
            log(`2.2. Removing ${existingClones.length} existing clones.`);
            existingClones.forEach(clone => clone.remove());
        }
        
        if (tags.length <= 1) {
            log(`2.3. EXIT setupAnimationForCard: Not enough tags to animate (${tags.length}).`);
            return;
        }

        log(`3. Initializing animation logic...`);

        // La distance de l'animation est la largeur totale des tags originaux
        let distance = 0;
        tags.forEach((tag, i) => {
            const width = tag.offsetWidth;
            log(`3.1. Tag ${i} width: ${width}px`, tag);
            distance += width;
        });

        log(`3.2. Total animation distance calculated: ${distance}px.`);
        
        // S'il n'y a rien à animer, on arrête
        if (distance === 0) {
            log(`3.3. EXIT setupAnimationForCard: Total distance is 0, animation cancelled.`);
            return;
        }
        
        log(`4. Cloning ${tags.length} tags for seamless loop.`);
        // Clone tags to create a seamless loop only if needed
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

        const duration = tags.length * 2.5;
        log(`5. CREATING GSAP timeline. Duration: ${duration}s, Distance: -=${distance}px.`);

        timeline.to(tagWrapper, {
            x: `-=${distance}`,
            duration: duration,
        });
        
        log(`✅ Animation timeline created and started for card:`, cardElement);

    }, 500); // Augmenté pour être sûr que Finsweet a le temps de rendre les éléments.
}


export function initCardTagsAnimation() {
    console.log(`🏷️ ${MODULE_NAME}.js v${MODULE_VERSION} prêt à être initialisé`);

    const cardWrappers = document.querySelectorAll('.centre_card_pro_wrapper');
    if (cardWrappers.length === 0) {
        log("INIT: Aucun wrapper de carte '.centre_card_pro_wrapper' trouvé.");
        return;
    }

    log(`INIT: ${cardWrappers.length} wrappers de carte trouvés. Mise en place des observateurs.`);

    cardWrappers.forEach((card, index) => {
        log(`[Card ${index}] Setting up...`, card);
        
        const initialTagWrapper = card.querySelector(".tag-wrapper-gsap-loop");
        if (initialTagWrapper && initialTagWrapper.children.length > 0) {
            log(`[Card ${index}] Tags déjà présents, initialisation directe.`);
            setupAnimationForCard(card);
            return;
        }

        log(`[Card ${index}] Tags not present. Creating MutationObserver.`);
        const observer = new MutationObserver((mutationsList, obs) => {
            log(`[Card ${index}] MutationObserver FIRED. Checking for tags...`);
            const tagWrapper = card.querySelector(".tag-wrapper-gsap-loop");
            
            if (tagWrapper && tagWrapper.children.length > 0) {
                log(`[Card ${index}] Tags détectés via MutationObserver. Initialisation...`);
                setupAnimationForCard(card);
                obs.disconnect();
                log(`[Card ${index}] Observer disconnected.`);
            }
        });

        observer.observe(card, {
            childList: true,
            subtree: true
        });
        log(`[Card ${index}] Observer is now watching.`);
        
        setTimeout(() => {
            const stillObserving = (observer.takeRecords().length > 0) || document.body.contains(card);
            if(stillObserving) {
                 observer.disconnect();
                 log(`[Card ${index}] Observer timed out after 10s and disconnected.`);
                 
                 const finalCheckTagWrapper = card.querySelector(".tag-wrapper-gsap-loop");
                 if (!finalCheckTagWrapper || finalCheckTagWrapper.children.length === 0) {
                    log(`[Card ${index}] Timeout: Aucun tag n'est apparu pour la carte après 10 secondes.`);
                 } else {
                    log(`[Card ${index}] Timeout: Tags found on final check. Initializing animation.`);
                    setupAnimationForCard(card);
                 }
            }
        }, 10000);
    });
}