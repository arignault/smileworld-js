// Version: 2.0.0 - Version minimaliste pour reconstruction
console.log('🚀 centre-card.js v2.2.0 chargé - Prêt pour reconstruction Cursor');

// Configuration des sélecteurs
const SELECTORS = {
    CARD: '.centre-card._wrapper',
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
    element.style.display = 'none';
    element.style.opacity = '0';
    gsap.set(element, { 
        display: 'none !important',
        opacity: 0,
        clearProps: 'all'
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
            const checkCards = () => {
                const cards = document.querySelectorAll(SELECTORS.CARD);
                if (cards.length > 0) {
                    console.log(`✅ ${cards.length} cartes trouvées après attente`);
                    resolve(cards);
                } else {
                    console.log('⏳ Attente des cartes...');
                    setTimeout(checkCards, 100);
                }
            };
            checkCards();
        });
    };

    const cards = await waitForCards();
    console.log(`🔍 ${cards.length} cartes trouvées dans le DOM`);

    for (const card of cards) {
        console.log('\n🎴 Traitement de la carte:', card);
        
        // Forcer l'état initial de tous les éléments
        SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
            const elements = card.querySelectorAll(selector);
            console.log(`\n⚙️ Configuration de "${selector}": ${elements.length} éléments trouvés`);
            
            elements.forEach(element => {
                forceInitialState(element);
                elementsInitialized++;
                logElementState(element, `État après initialisation de ${selector}`);
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
                gsap.to(element, {
                    display: isOpen ? 'none' : 'flex',
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

