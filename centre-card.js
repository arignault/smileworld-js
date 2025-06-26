// Version : 6.1.0 – Corrections majeures
console.log('🚀 centre-card.js v6.1.0 chargé');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '.clickable_wrap[data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder', '.tag_holder_wrapper'],
    ARROW: '.svg-holder.arrow',
    INTERNAL_LINKS: '.centre-card_button-holder a, .centre-card_button-holder button'
};

const initializedCards = new WeakSet();
let isAnimating = false;



// --- Fonctions d'animation ---

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
}

async function openCard(cardElement) {
    if (!cardElement || cardElement.classList.contains('is-open')) return;

    cardElement.classList.add('is-open');
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

            // Réactivation des événements map
            const placeId = cardElement.closest('.w-dyn-item')?.dataset.placeId;
            if (placeId) {
                document.dispatchEvent(new CustomEvent('map:focus', { detail: { placeId } }));
                console.log('📍 Événement map:focus émis pour:', placeId);
            }
        } else {
            await closeCard(cardElement);
            document.dispatchEvent(new CustomEvent('map:reset'));
            console.log('🗺️ Événement map:reset émis');
        }
    } finally {
        isAnimating = false;
    }
}

// --- Fonctions d'initialisation ---

function initializeCard(card) {
    if (!card || initializedCards.has(card)) {
        console.log('⏭️ Carte déjà initialisée, ignorée');
        return;
    }

    console.log('🔧 Initialisation de la carte:', card);

    // Chercher clickable wrap avec fallback
    let clickableWrap = card.parentElement?.querySelector(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) {
        // Fallback : chercher sans attribut spécifique
        clickableWrap = card.parentElement?.querySelector('.clickable_wrap');
        if (clickableWrap) {
            console.log('✅ Clickable wrap trouvé sans attribut data-card-toggle');
        }
    }
    
    if (!clickableWrap) {
        console.log('❌ Clickable wrap non trouvé pour la carte:', card);
        return;
    }

    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    console.log(`📋 Éléments à basculer trouvés: ${elementsToToggle.length}`);
    
    // Sauvegarder l'état d'affichage original
    elementsToToggle.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        el.dataset.originalDisplay = computedStyle.display;
        console.log(`💾 Display original sauvé pour ${el.className}: ${computedStyle.display}`);
    });
    
    // S'assurer que la carte démarre fermée (toutes les cartes démarrent fermées)
    window.gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -20 });
    console.log('🔒 Carte fermée par défaut');

    const handleCardToggle = (event) => {
        if (event.target.closest(SELECTORS.INTERNAL_LINKS)) {
            console.log('🔗 Clic sur lien interne, toggle ignoré');
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        console.log('👆 Clic sur carte détecté');
        toggleCard(card);
    };

    clickableWrap.addEventListener('click', handleCardToggle);
    initializedCards.add(card);
    console.log('✅ Carte initialisée avec succès');
}

function setupMutationObserver() {
    const cardsContainer = document.querySelector('.collection-list-centre-wrapper');
    if (!cardsContainer) return;

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.matches(SELECTORS.CARD)) {
                            initializeCard(node);
                        }
                        node.querySelectorAll(SELECTORS.CARD).forEach(card => initializeCard(card));
                    }
                });
            }
        }
    });

    observer.observe(cardsContainer, { childList: true, subtree: true });
}

function findCardBySlug(targetSlug) {
    if (!targetSlug) return null;
    
    const collectionItems = document.querySelectorAll('.w-dyn-item');
    
    for (const item of collectionItems) {
        const centreCard = item.querySelector(SELECTORS.CARD);
        if (!centreCard) continue;
        
        const links = item.querySelectorAll('a[href*="/nos-parcs-a-paris-region-parisienne/' + targetSlug + '"]');
        if (links.length > 0) {
            return centreCard;
        }
    }
    
    return null;
}

function setupMenuParcsListener() {
    console.log('🎯 Configuration de l\'écoute du menu Parcs...');
    
    // Écouter les clics sur les liens des centres dans le menu Parcs
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href*="/nos-parcs-a-paris-region-parisienne/"]');
        if (!link) return;
        
        // Vérifier si on est sur une page activités par centre
        if (!window.location.pathname.includes('/activites-par-centre/')) return;
        
        const href = link.getAttribute('href');
        const centreSlug = href.split('/nos-parcs-a-paris-region-parisienne/')[1];
        
        console.log('🖱️ Clic détecté sur lien centre:', centreSlug);
        
        // Petite pause pour laisser le menu se fermer
        setTimeout(() => {
            const targetCard = findCardBySlug(centreSlug);
            if (targetCard) {
                console.log('✅ Carte trouvée pour le centre cliqué, ouverture...');
                
                // Fermer toutes les autres cartes d'abord
                const allOpenCards = document.querySelectorAll(`${SELECTORS.CARD}.is-open`);
                allOpenCards.forEach(card => {
                    if (card !== targetCard) {
                        closeCard(card);
                    }
                });
                
                // Ouvrir la carte ciblée
                if (!targetCard.classList.contains('is-open')) {
                    openCard(targetCard);
                }
            } else {
                console.log('❌ Aucune carte trouvée pour le centre:', centreSlug);
            }
        }, 300);
    });
    
    console.log('✅ Écoute du menu Parcs configurée');
}

export function initCentreCards() {
    console.log('🚀 === INITIALISATION DES CARTES DE CENTRE ===');
    console.log('📍 Page actuelle:', window.location.pathname);
    console.log('🏗️ DOM ready state:', document.readyState);
    
    if (!window.gsap) {
        console.log('❌ GSAP non disponible, initialisation annulée');
        return;
    }

    // Chercher les cartes avec fallback
    let cards = document.querySelectorAll(SELECTORS.CARD);
    
    if (cards.length === 0) {
        console.log('⚠️ Aucune carte trouvée avec le sélecteur principal. Tentative avec sélecteurs alternatifs...');
        
        // Sélecteurs de fallback
        const fallbackSelectors = [
            '.centre-card_wrapper',
            '[class*="centre-card"]',
            '.card-centre_wrapper'
        ];
        
        for (const selector of fallbackSelectors) {
            cards = document.querySelectorAll(selector);
            if (cards.length > 0) {
                console.log(`✅ Cartes trouvées avec sélecteur alternatif: ${selector} (${cards.length} éléments)`);
                break;
            }
        }
    }

    console.log(`📊 ${cards.length} cartes trouvées au total`);

    if (cards.length === 0) {
        console.log('❌ Aucune carte trouvée, initialisation annulée');
        return;
    }

    // S'assurer qu'aucune carte n'est ouverte au démarrage
    cards.forEach(card => {
        if (card.classList.contains('is-open')) {
            console.log('🔒 Fermeture forcée de carte ouverte au démarrage');
            card.classList.remove('is-open');
        }
    });

    // Initialiser chaque carte
    cards.forEach((card, index) => {
        console.log(`🔧 Initialisation carte ${index + 1}/${cards.length}`);
        initializeCard(card);
    });
    
    // Configurer l'observateur de mutations
    setupMutationObserver();
    
    // Configurer l'écoute du menu Parcs
    setupMenuParcsListener();
    
    console.log('✅ === INITIALISATION TERMINÉE ===');
}