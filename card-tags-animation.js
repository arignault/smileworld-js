import { gsap } from "gsap";

const MODULE_NAME = "card-tags-animation";
const MODULE_VERSION = "3.0.0"; // Logique d'initialisation via MutationObserver

const log = (message, ...args) => console.log(`[SW-TAGS] ${message}`, ...args);

function setupAnimationForCard(cardElement) {
    const tagWrapper = cardElement.querySelector(".tag-wrapper-gsap-loop");

    if (!tagWrapper) {
        log(`Wrapper .tag-wrapper-gsap-loop introuvable dans la carte :`, cardElement);
        return;
    }

    // On attend un instant pour s'assurer que le rendu est terminé et que les largeurs sont correctes.
    setTimeout(() => {
        // On s'assure de ne travailler qu'avec les tags originaux, pas les clones
        const tags = Array.from(tagWrapper.children).filter(c => !c.classList.contains('clone'));
        
        // Vider les clones existants au cas où la fonction serait appelée plusieurs fois
        Array.from(tagWrapper.querySelectorAll('.clone')).forEach(clone => clone.remove());
        
        if (tags.length <= 1) {
            log(`Pas assez de tags pour une animation dans la carte :`, cardElement);
            return;
        }

        log(`Initialisation de l'animation pour la carte :`, cardElement);

        // La distance de l'animation est la largeur totale des tags originaux
        const distance = tags.reduce((acc, tag) => acc + tag.offsetWidth, 0);
        
        // S'il n'y a rien à animer, on arrête
        if (distance === 0) {
            log(`Largeur totale des tags nulle, animation annulée pour la carte:`, cardElement);
            return;
        }
        
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

        timeline.to(tagWrapper, {
            x: `-=${distance}`,
            duration: tags.length * 2.5, // Ralentir un peu l'animation
        });

    }, 100); // Court délai pour garantir le calcul de offsetWidth
}


export function initCardTagsAnimation() {
    console.log(`🏷️ ${MODULE_NAME}.js v${MODULE_VERSION} prêt à être initialisé`);

    const cardWrappers = document.querySelectorAll('.centre_card_pro_wrapper');
    if (cardWrappers.length === 0) {
        log("Aucun wrapper de carte '.centre_card_pro_wrapper' trouvé.");
        return;
    }

    log(`${cardWrappers.length} wrappers de carte trouvés. Mise en place des observateurs de mutation.`);

    cardWrappers.forEach(card => {
        // Vérifier si les tags sont déjà là au cas où le script s'exécute tardivement
        const initialTagWrapper = card.querySelector(".tag-wrapper-gsap-loop");
        if (initialTagWrapper && initialTagWrapper.children.length > 0) {
            log(`Tags déjà présents pour la carte, initialisation directe.`, card);
            setupAnimationForCard(card);
            return; // On passe à la carte suivante
        }

        const observer = new MutationObserver((mutationsList, obs) => {
            const tagWrapper = card.querySelector(".tag-wrapper-gsap-loop");
            // On s'assure que le wrapper existe ET qu'il a des enfants
            if (tagWrapper && tagWrapper.children.length > 0) {
                log(`Tags détectés via MutationObserver pour la carte. Initialisation...`, card);
                setupAnimationForCard(card);
                obs.disconnect(); // On a trouvé, on arrête d'observer cette carte
            }
        });

        observer.observe(card, {
            childList: true,
            subtree: true
        });
        
        // Sécurité: on déconnecte l'observateur après un certain temps pour éviter les fuites
        setTimeout(() => {
            const stillObserving = (observer.takeRecords().length > 0) || document.body.contains(card); // Basic check if still observing
            if(stillObserving) {
                 observer.disconnect();
                 // Vérifier une dernière fois si les tags sont apparus
                 const finalCheckTagWrapper = card.querySelector(".tag-wrapper-gsap-loop");
                 if (!finalCheckTagWrapper || finalCheckTagWrapper.children.length === 0) {
                    log(`Timeout: Aucun tag n'est apparu pour la carte après 10 secondes.`, card);
                 }
            }
        }, 10000);
    });
}