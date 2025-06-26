// Version : 6.3.0 – Détection page active et style adaptatif
console.log('🚀 centre-card.js v6.3.0 chargé – Détection page active et style adaptatif');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '.clickable_wrap[data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder', '.tag_holder_wrapper'],
    ARROW: '.svg-holder.arrow',
    INTERNAL_LINKS: '.centre-card_button-holder a, .centre-card_button-holder button'
};

const initializedCards = new WeakSet();
let isAnimating = false;

// --- Fonctions de détection de page active ---

function extractSlugFromPath() {
    const path = window.location.pathname;
    console.log('🔍 Détection de page active, path:', path);
    
    // Pour les pages centres : /nos-parcs-a-paris-region-parisienne/slug-centre
    if (path.includes('/nos-parcs-a-paris-region-parisienne/')) {
        const slug = path.split('/nos-parcs-a-paris-region-parisienne/')[1];
        console.log('📍 Page centre détectée, slug:', slug);
        return slug;
    }
    
    // Pour les pages activités par centre : /activites-par-centre/activite-slug
    // Il faudra récupérer le centre associé via les données CMS
    if (path.includes('/activites-par-centre/')) {
        const activitySlug = path.split('/activites-par-centre/')[1];
        console.log('🎯 Page activité par centre détectée, slug activité:', activitySlug);
        return findCentreFromActivity(activitySlug);
    }
    
    return null;
}

function findCentreFromActivity(activitySlug) {
    console.log('🎯 Recherche du centre associé à l\'activité:', activitySlug);
    
    // Chercher dans les éléments de collection d'activités par centre
    const activityItems = document.querySelectorAll('.w-dyn-item');
    
    for (const item of activityItems) {
        // Chercher si cet item correspond à notre activité
        const links = item.querySelectorAll('a[href*="' + activitySlug + '"]');
        if (links.length > 0) {
            console.log('✅ Item d\'activité trouvé pour slug:', activitySlug);
            
            // Chercher les liens vers les centres dans cet item
            const centreLinks = item.querySelectorAll('a[href*="/nos-parcs-a-paris-region-parisienne/"]');
            if (centreLinks.length > 0) {
                const centreHref = centreLinks[0].getAttribute('href');
                const centreSlug = centreHref.split('/nos-parcs-a-paris-region-parisienne/')[1];
                console.log('🏢 Centre associé trouvé, slug:', centreSlug);
                return centreSlug;
            }
            
            // Alternative : chercher via les données CMS dans le DOM
            const centreData = item.querySelector('[data-centre-slug], [data-wf-collection-item-id]');
            if (centreData) {
                const centreSlug = centreData.getAttribute('data-centre-slug') || 
                                 centreData.textContent?.toLowerCase().replace(/\s+/g, '-');
                if (centreSlug) {
                    console.log('🏢 Centre trouvé via données CMS:', centreSlug);
                    return centreSlug;
                }
            }
            
            // Dernière tentative : chercher dans les textes de nom de centre
            const textElements = item.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span');
            for (const textEl of textElements) {
                const text = textEl.textContent?.toLowerCase();
                // Patterns typiques de noms de centres SmileWorld
                const centrePatterns = [
                    'montigny-le-bretonneux',
                    'creteil-soleil', 
                    'paris-15-lecourbe',
                    'bercy-2',
                    'evry-2'
                ];
                
                for (const pattern of centrePatterns) {
                    if (text && text.includes(pattern.replace('-', ' '))) {
                        console.log('🏢 Centre trouvé via pattern textuel:', pattern);
                        return pattern;
                    }
                }
            }
        }
    }
    
    console.log('❌ Aucun centre trouvé pour l\'activité:', activitySlug);
    return null;
}

function findCardBySlug(targetSlug) {
    if (!targetSlug) return null;
    
    console.log('🔍 Recherche de carte pour slug:', targetSlug);
    
    // Chercher dans les éléments de collection des centres
    const collectionItems = document.querySelectorAll('.w-dyn-item');
    
    for (const item of collectionItems) {
        // Vérifier si cet item contient une carte centre
        const centreCard = item.querySelector(SELECTORS.CARD);
        if (!centreCard) continue;
        
        // Méthode 1 : Chercher dans les liens vers les pages centres
        const links = item.querySelectorAll('a[href*="/nos-parcs-a-paris-region-parisienne/' + targetSlug + '"]');
        if (links.length > 0) {
            console.log('✅ Carte trouvée via lien exact pour slug:', targetSlug);
            return centreCard;
        }
        
        // Méthode 2 : Chercher par correspondance partielle dans les href
        const allLinks = item.querySelectorAll('a[href*="/nos-parcs-a-paris-region-parisienne/"]');
        for (const link of allLinks) {
            const href = link.getAttribute('href');
            if (href && href.includes(targetSlug)) {
                console.log('✅ Carte trouvée via lien partiel pour slug:', targetSlug);
                return centreCard;
            }
        }
        
        // Méthode 3 : Chercher dans les textes (noms de centres)
        const textElements = item.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span');
        for (const el of textElements) {
            const text = el.textContent?.toLowerCase();
            if (text) {
                // Correspondance exacte du slug
                if (text.includes(targetSlug.toLowerCase())) {
                    console.log('✅ Carte trouvée via texte exact pour slug:', targetSlug);
                    return centreCard;
                }
                
                // Correspondance avec formats alternatifs (espaces vs tirets)
                const slugVariants = [
                    targetSlug.replace(/-/g, ' '),
                    targetSlug.replace(/\s+/g, '-'),
                    targetSlug.replace(/-/g, '')
                ];
                
                for (const variant of slugVariants) {
                    if (text.includes(variant.toLowerCase())) {
                        console.log('✅ Carte trouvée via variante textuelle:', variant, 'pour slug:', targetSlug);
                        return centreCard;
                    }
                }
            }
        }
    }
    
    console.log('❌ Aucune carte trouvée pour slug:', targetSlug);
    return null;
}

async function applyActiveCardBehavior(cardElement) {
    if (!cardElement) {
        console.log('❌ Aucune carte fournie pour applyActiveCardBehavior');
        return;
    }
    
    console.log('🎯 Application du comportement carte active:', cardElement);
    
    // Juste ouvrir la carte active, rien d'autre
    console.log('🔓 Ouverture automatique de la carte active...');
    
    // Attendre un peu que toutes les cartes soient initialisées
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('🔍 État carte avant ouverture:', cardElement.classList.contains('is-open') ? 'OUVERTE' : 'FERMÉE');
    
    if (!cardElement.classList.contains('is-open')) {
        console.log('📤 Ouverture via toggleCard...');
        
        try {
            await toggleCard(cardElement);
            console.log('✅ Ouverture de la carte active terminée');
        } catch (error) {
            console.error('❌ Erreur lors de l\'ouverture de la carte active:', error);
        }
    } else {
        console.log('✅ Carte déjà ouverte, parfait !');
    }
    
    console.log('✅ Comportement carte active appliqué');
}

async function detectAndHighlightActivePage() {
    console.log('🎯 === DÉTECTION DE LA PAGE ACTIVE ===');
    
    const targetSlug = extractSlugFromPath();
    console.log('📍 Slug détecté:', targetSlug);
    
    if (targetSlug) {
        console.log('🔍 Recherche de la carte correspondante...');
        const activeCard = findCardBySlug(targetSlug);
        
        if (activeCard) {
            console.log('✅ Carte active trouvée, application du comportement...');
            await applyActiveCardBehavior(activeCard);
        } else {
            console.log('❌ Aucune carte trouvée pour le slug:', targetSlug);
            
            // Debug : lister toutes les cartes disponibles
            const allCards = document.querySelectorAll(SELECTORS.CARD);
            console.log('📋 Cartes disponibles:', allCards.length);
            allCards.forEach((card, index) => {
                const item = card.closest('.w-dyn-item');
                const links = item ? item.querySelectorAll('a[href*="/nos-parcs-a-paris-region-parisienne/"]') : [];
                console.log(`  Carte ${index + 1}:`, links.length > 0 ? links[0].getAttribute('href') : 'Pas de lien trouvé');
            });
        }
    } else {
        console.log('ℹ️ Aucun slug détecté, pas de page active à mettre en évidence');
    }
    
    console.log('🏁 === FIN DÉTECTION PAGE ACTIVE ===');
}

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

function initializeCard(card, shouldPreserveOpen = false) {
    if (!card || initializedCards.has(card)) {
        console.log('⏭️ Carte déjà initialisée, ignorée');
        return;
    }

    console.log('🔧 Initialisation de la carte:', card);
    if (shouldPreserveOpen) {
        console.log('🛡️ Carte à préserver ouverte');
    }

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
    
    // S'assurer que la carte démarre fermée SEULEMENT si elle n'est pas déjà ouverte ET qu'on ne doit pas la préserver
    if (!card.classList.contains('is-open') || !shouldPreserveOpen) {
        if (shouldPreserveOpen && card.classList.contains('is-open')) {
            console.log('🛡️ Carte ouverte préservée, pas de modification GSAP');
            // Ne rien faire, laisser la carte dans son état ouvert
        } else {
            window.gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -20 });
            console.log('🔒 Carte fermée par défaut');
        }
    } else {
        console.log('🔓 Carte déjà ouverte, état préservé');
    }

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
                            initializeCard(node, false);
                        }
                        node.querySelectorAll(SELECTORS.CARD).forEach(card => initializeCard(card, false));
                    }
                });
            }
        }
    });

    observer.observe(cardsContainer, { childList: true, subtree: true });
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

    // Détecter d'abord quelle carte doit être active
    const targetSlug = extractSlugFromPath();
    let activeCardToPreserve = null;
    if (targetSlug) {
        activeCardToPreserve = findCardBySlug(targetSlug);
        console.log('🎯 Carte à préserver de la fermeture:', activeCardToPreserve ? 'TROUVÉE' : 'NON TROUVÉE');
    }

    // S'assurer qu'aucune carte n'est ouverte au démarrage (sauf celle qui sera activée)
    cards.forEach(card => {
        if (card.classList.contains('is-open')) {
            if (card === activeCardToPreserve) {
                console.log('✅ Carte active préservée, pas de fermeture forcée');
            } else {
                console.log('🔒 Fermeture forcée de carte ouverte au démarrage');
                card.classList.remove('is-open');
            }
        }
    });

    // Initialiser chaque carte
    cards.forEach((card, index) => {
        console.log(`🔧 Initialisation carte ${index + 1}/${cards.length}`);
        const shouldPreserveOpen = card === activeCardToPreserve;
        initializeCard(card, shouldPreserveOpen);
    });
    
    // Configurer l'observateur de mutations
    setupMutationObserver();
    
    // Configurer l'écoute du menu Parcs
    setupMenuParcsListener();
    
    // Détecter et mettre en évidence la page active (avec délai pour s'assurer que le DOM est prêt)
    setTimeout(async () => {
        console.log('🔍 Début détection page active...');
        await detectAndHighlightActivePage();
    }, 100);
    
    console.log('✅ === INITIALISATION TERMINÉE ===');
}