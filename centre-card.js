// Version: 2.0.0 - Version minimaliste pour reconstruction
console.log('🚀 centre-card.js v2.2.0 chargé - Prêt pour reconstruction Cursor AI');

// Configuration des sélecteurs
const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '#data-card-toggle, [data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: [
        '.centre-card_scroll_wrapper',
        '.centre-card_list',
        '.centre-card_button-holder'
    ],
    ALWAYS_VISIBLE: '.tag-holder-wrapper'
};

// Fonction pour appliquer les styles en fonction de l'élément
function applyInitialStyles(element) {
    const isScrollWrapper = element.classList.contains('centre-card_scroll_wrapper');
    
    // Styles de base pour tous les éléments
    const baseStyles = `
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        overflow: hidden !important;
        pointer-events: none !important;
    `;

    // Styles spécifiques pour le scroll wrapper (sans height)
    const scrollWrapperStyles = baseStyles;

    // Styles pour les autres éléments (avec height)
    const otherStyles = baseStyles + `height: 0 !important;`;

    // Appliquer les styles appropriés
    const stylesToApply = isScrollWrapper ? scrollWrapperStyles : otherStyles;
    element.style.cssText = stylesToApply;
    element.setAttribute('style', stylesToApply);
}

// Vérifier l'état d'affichage d'un élément
function logElementState(element, context) {
    const style = window.getComputedStyle(element);
    console.log(`📊 État de ${context}:`, {
        display: style.display,
        opacity: style.opacity,
        visibility: style.visibility,
        height: style.height,
        element: element
    });
}

// État initial des éléments à cacher
async function initializeCardElements() {
    console.log('📝 Initialisation des éléments des cartes...');
    let elementsInitialized = 0;
    
    // Attendre que les cartes soient disponibles
    const waitForCards = () => {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 50; // Limite à 50 tentatives (5 secondes max)
            
            const checkCards = () => {
                const cards = document.querySelectorAll(SELECTORS.CARD);
                console.log(`🔍 Recherche des cartes avec le sélecteur: "${SELECTORS.CARD}"`);
                
                if (cards.length > 0 && cards.length <= 100) {
                    console.log(`✅ ${cards.length} cartes trouvées après ${attempts} tentatives`);
                    // Log des premières cartes pour vérification
                    Array.from(cards).slice(0, 3).forEach((card, index) => {
                        console.log(`📌 Carte ${index + 1} classes:`, card.className);
                    });
                    resolve(cards);
                } else if (attempts >= maxAttempts) {
                    console.log(`⚠️ Limite d'attente atteinte après ${attempts} tentatives. Cartes trouvées: ${cards.length}`);
                    // Vérifier si le sélecteur est correct
                    const allCards = document.querySelectorAll('.centre-card_wrapper');
                    const allShadowCards = document.querySelectorAll('.effect-cartoon-shadow');
                    console.log('🔍 Diagnostic des sélecteurs:', {
                        'Toutes les cartes (.centre-card_wrapper)': allCards.length,
                        'Tous les éléments avec shadow (.effect-cartoon-shadow)': allShadowCards.length,
                        'Sélecteur combiné': cards.length
                    });
                    resolve(cards); // On résout quand même avec les cartes trouvées
                } else {
                    attempts++;
                    console.log(`⏳ Tentative ${attempts}/${maxAttempts} - Cartes trouvées: ${cards.length}`);
                    setTimeout(checkCards, 100);
                }
            };
            checkCards();
        });
    };

    const cards = await waitForCards();
    console.log(`🔍 ${cards.length} cartes trouvées dans le DOM`);

    // Fermer toutes les cartes au démarrage et forcer le display none immédiatement
    cards.forEach(card => {
        console.log('\n🔒 Fermeture initiale de la carte:', card);
        card.classList.remove('is-open');
        
        // Forcer immédiatement le display none de tous les éléments
        SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
            const elements = card.querySelectorAll(selector);
            elements.forEach(element => {
                applyInitialStyles(element);
                
                // Vérification immédiate
                const computedStyle = window.getComputedStyle(element);
                console.log(`📊 État immédiat après forçage pour ${selector}:`, {
                    display: computedStyle.display,
                    opacity: computedStyle.opacity,
                    visibility: computedStyle.visibility,
                    height: computedStyle.height,
                    isScrollWrapper: element.classList.contains('centre-card_scroll_wrapper')
                });
            });
        });
    });

    for (const card of cards) {
        console.log('\n🎴 Traitement de la carte:', card);
        
        // Vérifier l'état initial de la carte
        console.log('📊 État initial de la carte:', {
            isOpen: card.classList.contains('is-open'),
            display: window.getComputedStyle(card).display
        });
        
        // Forcer l'état initial de tous les éléments
        SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
            const elements = card.querySelectorAll(selector);
            console.log(`\n⚙️ Configuration de "${selector}": ${elements.length} éléments trouvés`);
            
            elements.forEach(element => {
                const isAlreadyInitialized = element.dataset.initialized === 'true';
                if (!isAlreadyInitialized) {
                    applyInitialStyles(element);
                    
                    // Ajouter une classe pour le suivi
                    element.classList.add('force-hidden');
                    element.dataset.initialized = 'true';
                    elementsInitialized++;
                    
                    // Vérification immédiate après modification
                    const computedStyle = window.getComputedStyle(element);
                    console.log(`📊 État après initialisation de ${selector}:`, {
                        display: computedStyle.display,
                        opacity: computedStyle.opacity,
                        visibility: computedStyle.visibility,
                        height: computedStyle.height,
                        forceHidden: element.classList.contains('force-hidden'),
                        isScrollWrapper: element.classList.contains('centre-card_scroll_wrapper')
                    });
                } else {
                    console.log('ℹ️ Élément déjà initialisé:', element);
                }
            });
        });

        // Configurer l'élément cliquable
        const clickableWrap = card.querySelector(SELECTORS.CLICKABLE_WRAP);
        if (clickableWrap) {
            console.log('\n🔘 Élément cliquable trouvé:', clickableWrap);
            
            // Supprimer les anciens écouteurs s'ils existent
            const newClickableWrap = clickableWrap.cloneNode(true);
            clickableWrap.parentNode.replaceChild(newClickableWrap, clickableWrap);
            
            newClickableWrap.addEventListener('click', (event) => {
                console.log('\n👆 Clic détecté sur l\'élément cliquable');
                event.preventDefault();
                event.stopPropagation();
                
                // Vérifier l'état avant le toggle
                console.log('📌 État des éléments avant toggle:');
                SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
                    const elements = card.querySelectorAll(selector);
                    elements.forEach(element => {
                        const style = window.getComputedStyle(element);
                        console.log(`- ${selector}:`, {
                            display: style.display,
                            opacity: style.opacity,
                            visibility: style.visibility
                        });
                    });
                });
                
                toggleCard(card);
            });
        }
    }
    
    // Vérification finale de l'état de toutes les cartes
    console.log('\n📊 Vérification finale de toutes les cartes:');
    cards.forEach((card, index) => {
        const elements = Array.from(card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(',')));
        console.log(`\nCarte ${index + 1}:`, {
            isOpen: card.classList.contains('is-open'),
            display: window.getComputedStyle(card).display,
            elements: elements.map(el => ({
                selector: el.className,
                display: window.getComputedStyle(el).display,
                opacity: window.getComputedStyle(el).opacity,
                forceHidden: el.classList.contains('force-hidden')
            }))
        });
    });

    console.log(`\n✅ Initialisation terminée: ${elementsInitialized} éléments configurés`);
}

// Gestion du toggle d'une carte
async function toggleCard(cardElement) {
    console.log('\n🔄 Début du toggle de la carte');
    const isOpen = cardElement.classList.contains('is-open');
    console.log(`📌 État actuel de la carte: ${isOpen ? 'ouverte' : 'fermée'}`);
    
    // Animation des éléments
    const promises = SELECTORS.TOGGLE_ELEMENTS.map(selector => {
        const element = cardElement.querySelector(selector);
        if (element) {
            console.log(`\n🎭 Animation de "${selector}"`);
            return new Promise(resolve => {
                const isScrollWrapper = element.classList.contains('centre-card_scroll_wrapper');
                
                // Styles de base pour tous les éléments
                const baseStyles = isOpen ? `
                    display: none !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    overflow: hidden !important;
                    pointer-events: none !important;
                ` : `
                    display: flex !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    overflow: visible !important;
                    pointer-events: auto !important;
                `;

                // Styles spécifiques pour le scroll wrapper (sans height)
                const scrollWrapperStyles = baseStyles;

                // Styles pour les autres éléments (avec height)
                const otherStyles = isOpen ? 
                    baseStyles + `height: 0 !important;` : 
                    baseStyles + `height: auto !important;`;

                // Appliquer les styles appropriés
                const stylesToApply = isScrollWrapper ? scrollWrapperStyles : otherStyles;
                element.style.cssText = stylesToApply;
                element.setAttribute('style', stylesToApply);

                gsap.to(element, {
                    opacity: isOpen ? 0 : 1,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onStart: () => {
                        console.log(`▶️ Début animation pour ${selector}`);
                        const style = window.getComputedStyle(element);
                        console.log(`📊 État au début de l'animation:`, {
                            display: style.display,
                            opacity: style.opacity,
                            visibility: style.visibility,
                            height: style.height,
                            isScrollWrapper: isScrollWrapper
                        });
                    },
                    onComplete: () => {
                        console.log(`✅ Animation terminée pour ${selector}`);
                        const style = window.getComputedStyle(element);
                        console.log(`📊 État à la fin de l'animation:`, {
                            display: style.display,
                            opacity: style.opacity,
                            visibility: style.visibility,
                            height: style.height,
                            isScrollWrapper: isScrollWrapper
                        });
                        resolve();
                    }
                });
            });
        } else {
            console.warn(`⚠️ Élément "${selector}" non trouvé dans la carte`);
            return Promise.resolve();
        }
    });

    // Attendre que toutes les animations soient terminées
    await Promise.all(promises);

    // Mise à jour de l'état
    cardElement.classList.toggle('is-open');
    console.log(`\n📌 État final de la carte: ${!isOpen ? 'ouverte' : 'fermée'}`);
    
    // Vérifier l'état final de tous les éléments
    console.log('📊 État final des éléments:');
    SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
        const elements = cardElement.querySelectorAll(selector);
        elements.forEach(element => {
            logElementState(element, `État final de ${selector}`);
        });
    });
}

// Fonction d'initialisation principale
export async function initCentreCards() {
    console.log('🚀 Démarrage de l\'initialisation des cartes...');
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        console.log('⏳ DOM en cours de chargement, attente de DOMContentLoaded...');
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM chargé');
                resolve();
            });
        });
    } else {
        console.log('📄 DOM déjà chargé');
    }

    console.log('🔄 Début de l\'initialisation des cartes...');
    await initializeCardElements();

    // Observer les changements dans le DOM
    console.log('👀 Configuration de l\'observateur de mutations...');
    const observer = new MutationObserver(async (mutations) => {
        console.log(`\n🔄 ${mutations.length} mutation(s) détectée(s)`);
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                console.log(`➕ ${mutation.addedNodes.length} nouveau(x) nœud(s) détecté(s)`);
                await initializeCardElements();
            }
        }
    });

    const cardsContainer = document.querySelector('.collection-list-centre-wrapper');
    if (cardsContainer) {
        console.log('🎯 Conteneur de cartes trouvé, démarrage de l\'observation');
        observer.observe(cardsContainer, {
            childList: true,
            subtree: true
        });
    } else {
        console.warn('⚠️ Conteneur de cartes non trouvé, observation impossible');
    }

    console.log('✅ Initialisation des cartes terminée');
    return Promise.resolve();
}

