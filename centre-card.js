// Version : 8.0.0 – Fusion de l'animation Marquee
console.log('🚀 centre-card.js v8.0.0 chargé – Fusion animation marquee');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '.clickable_wrap[data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder', '.tag_holder_wrapper'],
    ARROW: '.svg-holder.arrow',
    INTERNAL_LINKS: '.centre-card_button-holder a, .centre-card_button-holder button',
    MARQUEE_COMPONENT: '.tag_wrapper_gsap_loop:not(.w-dyn-list):not(.w-dyn-items)',
    MARQUEE_LIST_CONTAINER: '.tag_wrapper_gsap_loop.w-dyn-list',
    MARQUEE_ITEMS_LIST: '.w-dyn-items',
};

const initializedCards = new WeakSet();
let isAnimating = false;

// Configuration de l'effet de survol
const HOVER_CONFIG = {
    maxOffset: 0.1875, // Correspond à --_ui-styles---stroke--s
    defaultVerticalOffset: 0.1875, // Valeur verticale constante
    shadowColor: 'var(--colors--black)', // Utilisation de la variable de couleur
    threshold: 0.4, // Zone de transition plus large (était à 0.2)
    scaleAmount: 1.05, // Augmentation de la taille
    scaleDuration: 0.15, // Animation rapide
    scaleEase: "elastic.out(1, 0.3)" // Effet bouncy rapide
};

// --- Fonctions d'animation ---

/**
 * Ferme une carte en animant le contenu et la carte elle-même.
 * @param {Element} cardElement 
 */
async function closeCard(cardElement) {
    if (!cardElement || !cardElement.classList.contains('is-open')) return;
    
    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    const scrollWrapper = cardElement.querySelector('.centre-card_scroll_wrapper');
    
    cardElement.classList.remove('is-open');
    
    const tl = window.gsap.timeline({
        onStart: () => {
            if (scrollWrapper) {
                window.gsap.set(scrollWrapper, { height: '10rem' });
            }
        },
        onComplete: () => {
            window.gsap.set(elementsToAnimate, { display: 'none' });
            if (scrollWrapper) {
                window.gsap.set(scrollWrapper, { height: 0 });
            }
        }
    });

    tl.to(elementsToAnimate, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power1.in',
        stagger: {
            each: 0.02,
            from: 'start'
        }
    }, 0);

    if (arrow) {
        tl.to(arrow, {
            rotation: 0,
            duration: 0.25,
            ease: 'power2.inOut'
        }, 0);
    }

    if (scrollWrapper) {
        tl.to(scrollWrapper, {
            height: 0,
            duration: 0.4,
            ease: "back.in(1.7)"
        }, 0);
    }

    await tl;

    // Relance l'animation marquee si elle existe
    if (cardElement.marqueeTween) {
        cardElement.marqueeTween.play();
    }
}

/**
 * Ouvre une carte en animant la carte, la flèche et le contenu.
 * @param {Element} cardElement 
 */
async function openCard(cardElement) {
    if (!cardElement || cardElement.classList.contains('is-open')) return;

    cardElement.classList.add('is-open');

    // Met en pause l'animation marquee si elle existe
    if (cardElement.marqueeTween) {
        cardElement.marqueeTween.pause();
    }

    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    const scrollWrapper = cardElement.querySelector('.centre-card_scroll_wrapper');
    
    elementsToAnimate.forEach(el => {
        window.gsap.set(el, { 
            display: el.dataset.originalDisplay || 'block',
            opacity: 0,
            y: -20
        });
    });

    const tl = window.gsap.timeline({
        onStart: () => {
            if (scrollWrapper) {
                window.gsap.set(scrollWrapper, { height: 0 });
            }
        }
    });

    if (scrollWrapper) {
        tl.to(scrollWrapper, {
            height: '10rem',
            duration: 0.6,
            ease: 'elastic.out(1.2, 0.5)'
        }, 0);
    }

    if (arrow) {
        tl.to(arrow, {
            rotation: 90,
            duration: 0.25,
            ease: 'back.out(1.7)'
        }, '<');
    }

    tl.to(elementsToAnimate, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: {
            each: 0.035,
            from: 'start'
        }
    }, '<0.05');

    await tl;
}

async function toggleCard(cardElement) {
    if (isAnimating) return;
    isAnimating = true;

    try {
        const isOpen = cardElement.classList.contains('is-open');
        
        if (!isOpen) {
            const otherOpenCards = document.querySelectorAll(`${SELECTORS.CARD}.is-open`);
            await Promise.all(Array.from(otherOpenCards).map(card => closeCard(card)));
            await openCard(cardElement);

            /* DÉBUT DE LA MODIFICATION : Lignes supprimées
            const placeId = cardElement.closest('.w-dyn-item')?.dataset.placeId;
            if (placeId) {
                document.dispatchEvent(new CustomEvent('map:focus', { detail: { placeId } }));
            }
            */
        } else {
            await closeCard(cardElement);
            // document.dispatchEvent(new CustomEvent('map:reset')); // Ligne supprimée
        }
    } finally {
        isAnimating = false;
    }
}

/**
 * Calcule la position relative de la souris par rapport à l'élément
 * @param {MouseEvent} e - L'événement de la souris
 * @param {Element} element - L'élément survolé
 * @returns {{x: number}} - Position normalisée
 */
function calculateMousePosition(e, element) {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    
    return {
        x: -(x * 2 - 1)
    };
}

/**
 * Applique l'effet de shadow et de scale en fonction de la position de la souris
 * @param {MouseEvent} e - L'événement de la souris
 * @param {Element} card - La carte survolée
 */
function handleCardHover(e, card) {
    if (!card || card.classList.contains('is-open')) return;

    const pos = calculateMousePosition(e, card);
    const offsetX = pos.x * HOVER_CONFIG.maxOffset;

    card.style.boxShadow = `${offsetX}rem ${HOVER_CONFIG.defaultVerticalOffset}rem 0 0 ${HOVER_CONFIG.shadowColor}`;
}

/**
 * Gère l'entrée de la souris sur la carte
 * @param {MouseEvent} e - L'événement de la souris
 * @param {Element} card - La carte survolée
 */
function handleCardEnter(e, card) {
    if (!card || card.classList.contains('is-open')) return;

    window.gsap.to(card, {
        scale: HOVER_CONFIG.scaleAmount,
        duration: HOVER_CONFIG.scaleDuration,
        ease: HOVER_CONFIG.scaleEase,
        overwrite: true
    });

    // Ralentit le marquee
    if (card.marqueeTween) {
        gsap.to(card.marqueeTween, { timeScale: 0.2, duration: 0.5 });
    }

    handleCardHover(e, card);
}

/**
 * Gère la sortie de la souris de la carte
 * @param {Element} card - La carte survolée
 */
function handleCardLeave(card) {
    if (!card || card.classList.contains('is-open')) return;

    card.style.boxShadow = `0 ${HOVER_CONFIG.defaultVerticalOffset}rem 0 0 ${HOVER_CONFIG.shadowColor}`;
    
    window.gsap.to(card, {
        scale: 1,
        duration: HOVER_CONFIG.scaleDuration,
        ease: HOVER_CONFIG.scaleEase,
        overwrite: true
    });

    // Ré-accélère le marquee
    if (card.marqueeTween) {
        gsap.to(card.marqueeTween, { timeScale: 1, duration: 0.5 });
    }
}

// --- Fonctions d'initialisation ---

/**
 * Initialise l'animation marquee pour une carte donnée.
 * @param {Element} card 
 */
function _initializeMarquee(card) {
    const component = card.querySelector(SELECTORS.MARQUEE_COMPONENT);
    if (!component) return;
    
    const listContainer = component.querySelector(SELECTORS.MARQUEE_LIST_CONTAINER);
    const itemsList = listContainer ? listContainer.querySelector(SELECTORS.MARQUEE_ITEMS_LIST) : null;

    if (!itemsList || itemsList.children.length <= 1) {
        return;
    }

    if (listContainer.dataset.marqueeInitialized) return;
    listContainer.dataset.marqueeInitialized = 'true';

    component.style.overflow = 'hidden';
    listContainer.style.display = 'flex';
    listContainer.style.flexWrap = 'nowrap';

    const applyStylesToList = (list) => {
        list.style.display = 'flex';
        list.style.flexWrap = 'nowrap';
        list.style.width = 'auto';
        list.style.flexShrink = '0';
    };

    applyStylesToList(itemsList);
    
    const listClone = itemsList.cloneNode(true);
    applyStylesToList(listClone);
    listContainer.appendChild(listClone);

    const speed = 50;
    const duration = itemsList.offsetWidth / speed;

    card.marqueeTween = gsap.to([itemsList, listClone], {
        xPercent: -100,
        duration: duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
            xPercent: gsap.utils.unitize(gsap.utils.wrap(-100, 0))
        }
    });
}

/**
 * Configure l'état visuel initial d'une carte (contenu fermé, marquee lancé).
 * Ne doit être appelée que sur une carte visible.
 * @param {Element} card 
 */
function _setCardVisualState(card) {
    if (!card || card.dataset.visualStateInitialized) return;

    // Masque le contenu dépliable
    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    elementsToToggle.forEach(el => {
        // Sauvegarde l'affichage original uniquement si ce n'est pas déjà fait
        if (!el.dataset.originalDisplay) {
            el.dataset.originalDisplay = window.getComputedStyle(el).display;
        }
    });
    window.gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -20 });

    // Lance l'animation marquee
    _initializeMarquee(card);
    
    card.dataset.visualStateInitialized = 'true';
}

function initializeCard(card) {
    if (initializedCards.has(card)) return;

    // --- Ajout des comportements (une seule fois par carte) ---
    const clickableWrap = card.parentElement.querySelector(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) return;

    // Masque le contenu dépliable
    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    elementsToToggle.forEach(el => {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
    });
    window.gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -20 });

    const handleCardToggle = (event) => {
        if (event.target.closest(SELECTORS.INTERNAL_LINKS)) return;
        event.preventDefault();
        event.stopPropagation();
        toggleCard(card);
    };

    clickableWrap.addEventListener('click', handleCardToggle);

    card.addEventListener('mousemove', (e) => handleCardHover(e, card));
    card.addEventListener('mouseleave', () => handleCardLeave(card));
    card.addEventListener('mouseenter', (e) => handleCardEnter(e, card));

    initializedCards.add(card);

    // Initialise l'animation marquee pour cette carte
    _initializeMarquee(card);
}

export function initCentreCards() {
    const cards = document.querySelectorAll(SELECTORS.CARD);
    cards.forEach(initializeCard);
}

export function reinitCardsInContainer(container) {
    if (!container) return;
    const cardsInContainer = container.querySelectorAll(SELECTORS.CARD);
    cardsInContainer.forEach(initializeCard);
}
