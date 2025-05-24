// Version: 2.0.0 - Version minimaliste pour reconstruction
console.log('🚀 centre-card.js v2.0.0 chargé - Prêt pour reconstruction');

// Configuration des sélecteurs
const SELECTORS = {
    CARD: '.centre-card._wrapper',
    CLICKABLE_BUTTON: '.clickable_button',
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
    console.log(`🔍 ${cards.length} cartes trouvées dans le DOM`);

    for (const card of cards) {
        console.log('🎴 Traitement de la carte:', card);
        
        // Initialiser les éléments à cacher
        SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
            const elements = card.querySelectorAll(selector);
            console.log(`📌 Recherche des éléments "${selector}": ${elements.length} trouvés`);
            
            elements.forEach(element => {
                console.log(`⚙️ Configuration de l'état initial pour:`, element);
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
            console.log('🏷️ Configuration du tag-holder:', tagHolder);
            gsap.set(tagHolder, { 
                display: 'block',
                opacity: 1
            });
        } else {
            console.warn('⚠️ Tag-holder non trouvé dans la carte');
        }

        // Configurer le bouton cliquable
        const clickableButton = card.querySelector(SELECTORS.CLICKABLE_BUTTON);
        if (clickableButton) {
            console.log('🔘 Bouton cliquable trouvé:', clickableButton);
            clickableButton.addEventListener('click', (event) => {
                console.log('👆 Clic détecté sur le bouton');
                event.preventDefault();
                event.stopPropagation();
                toggleCard(card);
            });
        } else {
            console.warn('⚠️ Bouton cliquable non trouvé dans la carte');
        }
    }
    
    console.log(`✅ Initialisation terminée: ${elementsInitialized} éléments configurés`);
}

// Gestion du toggle d'une carte
async function toggleCard(cardElement) {
    console.log('🔄 Début du toggle de la carte');
    console.log('🎴 Carte concernée:', cardElement);
    
    const isOpen = cardElement.classList.contains('is-open');
    console.log(`📌 État actuel de la carte: ${isOpen ? 'ouverte' : 'fermée'}`);
    
    // Animation des éléments
    const promises = SELECTORS.TOGGLE_ELEMENTS.map(selector => {
        const element = cardElement.querySelector(selector);
        if (element) {
            console.log(`🎭 Préparation de l'animation pour "${selector}"`);
            console.log(`📊 État actuel de l'élément:`, {
                display: window.getComputedStyle(element).display,
                opacity: window.getComputedStyle(element).opacity
            });
            
            return new Promise(resolve => {
                gsap.to(element, {
                    display: isOpen ? 'none' : 'flex',
                    opacity: isOpen ? 0 : 1,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onStart: () => console.log(`▶️ Début animation pour ${selector}`),
                    onComplete: () => {
                        console.log(`✅ Animation terminée pour ${selector}`);
                        console.log(`📊 Nouvel état de l'élément:`, {
                            display: window.getComputedStyle(element).display,
                            opacity: window.getComputedStyle(element).opacity
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
    console.log(`📌 État final de la carte: ${!isOpen ? 'ouverte' : 'fermée'}`);
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

    // Observer les changements dans le DOM pour gérer le contenu dynamique
    console.log('👀 Configuration de l\'observateur de mutations...');
    const observer = new MutationObserver(async (mutations) => {
        console.log(`🔄 ${mutations.length} mutation(s) détectée(s)`);
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                console.log(`➕ ${mutation.addedNodes.length} nouveau(x) nœud(s) détecté(s)`);
                console.log('📦 Nœuds ajoutés:', mutation.addedNodes);
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
