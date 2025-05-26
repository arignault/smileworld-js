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

// Forcer l'état initial des éléments
function forceInitialState(element) {
    console.log('🔒 Forçage de l\'état initial pour:', element);
    
    // Vérifier l'état avant modification
    const beforeStyle = window.getComputedStyle(element);
    console.log('📊 État avant modification:', {
        display: beforeStyle.display,
        opacity: beforeStyle.opacity,
        visibility: beforeStyle.visibility,
        height: beforeStyle.height
    });

    // Appliquer les styles de manière plus agressive pour les éléments spécifiques
    if (element.classList.contains('centre-card_scroll_wrapper') ||
        element.classList.contains('centre-card_list') ||
        element.classList.contains('centre-card_button-holder')) {
        
        // Forcer le display none avec !important
        element.setAttribute('style', `
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
            pointer-events: none !important;
        `);

        // Double vérification avec GSAP
        gsap.set(element, { 
            display: 'none',
            opacity: 0,
            visibility: 'hidden',
            height: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            clearProps: 'all'
        });

        // Ajouter une classe pour le suivi
        element.classList.add('force-hidden');
    }

    // Vérifier l'état après modification
    const afterStyle = window.getComputedStyle(element);
    console.log('📊 État après modification:', {
        display: afterStyle.display,
        opacity: afterStyle.opacity,
        visibility: afterStyle.visibility,
        height: afterStyle.height,
        forceHidden: element.classList.contains('force-hidden')
    });
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

    // Fermer toutes les cartes au démarrage
    cards.forEach(card => {
        console.log('\n🔒 Fermeture initiale de la carte:', card);
        card.classList.remove('is-open');
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
                // Vérifier si l'élément est déjà initialisé
                const isAlreadyInitialized = element.dataset.initialized === 'true';
                if (!isAlreadyInitialized) {
                    forceInitialState(element);
                    element.dataset.initialized = 'true';
                    elementsInitialized++;
                    logElementState(element, `État après initialisation de ${selector}`);
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
                        logElementState(element, `État avant toggle de ${selector}`);
                    });
                });
                
                toggleCard(card);
            });
        } else {
            console.warn('⚠️ Élément cliquable non trouvé dans la carte');
        }
    }
    
    console.log(`\n✅ Initialisation terminée: ${elementsInitialized} éléments configurés`);
    
    // Vérification finale de l'état de toutes les cartes
    cards.forEach(card => {
        console.log('\n📊 État final de la carte:', {
            isOpen: card.classList.contains('is-open'),
            display: window.getComputedStyle(card).display,
            elements: Array.from(card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','))).map(el => ({
                selector: el.className,
                display: window.getComputedStyle(el).display,
                opacity: window.getComputedStyle(el).opacity
            }))
        });
    });
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
                // Forcer le display avec !important lors du toggle
                if (!isOpen) {
                    element.setAttribute('style', `
                        display: flex !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        height: auto !important;
                        overflow: visible !important;
                        pointer-events: auto !important;
                    `);
                } else {
                    element.setAttribute('style', `
                        display: none !important;
                        opacity: 0 !important;
                        visibility: hidden !important;
                        height: 0 !important;
                        overflow: hidden !important;
                        pointer-events: none !important;
                    `);
                }

                gsap.to(element, {
                    opacity: isOpen ? 0 : 1,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onStart: () => {
                        console.log(`▶️ Début animation pour ${selector}`);
                        logElementState(element, `État au début de l'animation de ${selector}`);
                    },
                    onComplete: () => {
                        console.log(`✅ Animation terminée pour ${selector}`);
                        logElementState(element, `État à la fin de l'animation de ${selector}`);
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

