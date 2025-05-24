// Version: 2.0.0 - Version minimaliste pour reconstruction
console.log('🚀 centre-card.js v2.0.0 chargé - Prêt pour reconstruction');

// Configuration des sélecteurs
const SELECTORS = {
    CARD: '.centre-card._wrapper',
    CARD_HEADER: '.centre-card_header',
    CLICKABLE: '#data-card-toggle',
    TOGGLE_ELEMENTS: [
        '.centre-card_scroll_wrapper',
        '.centre-card_list',
        '.centre-card_button-holder'
    ],
    ALWAYS_VISIBLE: '.tag-holder-wrapper',
    DYNAMIC_ELEMENTS: '[fs-list-element]'
};

// Attendre que les éléments dynamiques soient chargés
function waitForDynamicElements(card) {
    return new Promise((resolve) => {
        const observer = new MutationObserver((mutations, obs) => {
            const dynamicElements = card.querySelectorAll(SELECTORS.DYNAMIC_ELEMENTS);
            if (dynamicElements.length > 0) {
                console.log('✅ Éléments dynamiques chargés:', dynamicElements.length);
                obs.disconnect();
                resolve();
            }
        });

        observer.observe(card, {
            childList: true,
            subtree: true
        });

        // Timeout de sécurité après 5 secondes
        setTimeout(() => {
            observer.disconnect();
            console.log('⚠️ Timeout atteint pour le chargement des éléments dynamiques');
            resolve();
        }, 5000);
    });
}

// État initial des éléments à cacher
async function initializeCardElements() {
    console.log('📝 Initialisation des éléments des cartes...');
    let elementsInitialized = 0;
    
    const cards = document.querySelectorAll(SELECTORS.CARD);
    console.log(`🔍 ${cards.length} cartes trouvées`);

    for (const card of cards) {
        // Attendre le chargement des éléments dynamiques
        await waitForDynamicElements(card);
        
        // Initialiser les éléments à cacher
        SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
            const elements = card.querySelectorAll(selector);
            elements.forEach(element => {
                gsap.set(element, { 
                    display: 'none',
                    opacity: 0
                });
                elementsInitialized++;
            });
        });

        // S'assurer que tag-holder-wrapper est visible
        const tagHolder = card.querySelector(SELECTORS.ALWAYS_VISIBLE);
        if (tagHolder) {
            gsap.set(tagHolder, { 
                display: 'block',
                opacity: 1
            });
        }

        // Ajouter un gestionnaire de clic sur l'en-tête de la carte
        const header = card.querySelector(SELECTORS.CARD_HEADER);
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => toggleCard(card));
        }
    }
    
    console.log(`✅ Initialisation terminée: ${elementsInitialized} éléments configurés`);
}

// Gestion du toggle d'une carte
async function toggleCard(cardElement) {
    console.log('🔄 Toggle de la carte');
    
    // Attendre que les éléments dynamiques soient chargés si nécessaire
    await waitForDynamicElements(cardElement);
    
    const isOpen = cardElement.classList.contains('is-open');
    console.log(`📌 État actuel: ${isOpen ? 'ouverte' : 'fermée'}`);
    
    // Animation des éléments
    const promises = SELECTORS.TOGGLE_ELEMENTS.map(selector => {
        const element = cardElement.querySelector(selector);
        if (element) {
            console.log(`🎭 Animation de "${selector}"`);
            return new Promise(resolve => {
                gsap.to(element, {
                    display: isOpen ? 'none' : 'flex',
                    opacity: isOpen ? 0 : 1,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onComplete: resolve
                });
            });
        }
        return Promise.resolve();
    });

    // Attendre que toutes les animations soient terminées
    await Promise.all(promises);

    // Mise à jour de l'état
    cardElement.classList.toggle('is-open');
    console.log(`✅ État mis à jour: ${!isOpen ? 'ouverte' : 'fermée'}`);
}

// Fonction d'initialisation principale
export async function initCentreCards() {
    console.log('🚀 Démarrage de l\'initialisation des cartes...');
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        console.log('⏳ DOM en cours de chargement, attente de DOMContentLoaded...');
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
        });
    }

    console.log('📄 DOM chargé, initialisation des cartes...');
    await initializeCardElements();

    // Observer les changements dans le DOM pour gérer le contenu dynamique
    console.log('👀 Configuration de l\'observateur de mutations...');
    const observer = new MutationObserver(async (mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                console.log(`➕ ${mutation.addedNodes.length} nouveau(x) nœud(s) détecté(s)`);
                await initializeCardElements();
            }
        }
    });

    // Observer le conteneur principal des cartes
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
