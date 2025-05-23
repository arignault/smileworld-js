// Version: 2.0.0 - Version minimaliste pour reconstruction
console.log('🚀 centre-card.js v2.0.0 chargé - Prêt pour reconstruction');

// Configuration des sélecteurs
const SELECTORS = {
    CARD: '.centre-card._wrapper',
    CLICKABLE: '.clickable_wrap, .clickable_button',
    TOGGLE_ELEMENTS: [
        '.centre-card_scroll_wrapper',
        '.centre-card_list',
        '.centre-card_button-holder'
    ],
    ALWAYS_VISIBLE: '.tag-holder-wrapper'
};

// État initial des éléments à cacher
function initializeCardElements() {
    console.log('📝 Initialisation des éléments des cartes...');
    let elementsInitialized = 0;
    
    // Initialiser les éléments à cacher
    SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        console.log(`🔍 Recherche des éléments "${selector}": ${elements.length} trouvés`);
        
        elements.forEach(element => {
            gsap.set(element, { 
                display: 'none',
                opacity: 0
            });
            elementsInitialized++;
        });
    });

    // S'assurer que tag-holder-wrapper est visible
    const tagHolders = document.querySelectorAll(SELECTORS.ALWAYS_VISIBLE);
    tagHolders.forEach(element => {
        gsap.set(element, { 
            display: 'block',
            opacity: 1
        });
    });
    
    console.log(`✅ Initialisation terminée: ${elementsInitialized} éléments configurés`);
}

// Gestion du toggle d'une carte
function toggleCard(cardElement) {
    const isOpen = cardElement.classList.contains('is-open');
    console.log(`🔄 Toggle de la carte: ${isOpen ? 'fermeture' : 'ouverture'}`);
    console.log('🎴 Élément carte:', cardElement);
    
    // Animation des éléments
    SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
        const element = cardElement.querySelector(selector);
        if (element) {
            console.log(`🎭 Animation de "${selector}" vers ${isOpen ? 'none' : 'flex'}`);
            gsap.to(element, {
                display: isOpen ? 'none' : 'flex',
                opacity: isOpen ? 0 : 1,
                duration: 0.3,
                ease: 'power2.inOut',
                onStart: () => console.log(`▶️ Début animation pour ${selector}`),
                onComplete: () => console.log(`✅ Animation terminée pour ${selector}`)
            });
        } else {
            console.warn(`⚠️ Élément "${selector}" non trouvé dans la carte`);
        }
    });

    // Mise à jour de l'état
    cardElement.classList.toggle('is-open');
    console.log(`📌 État de la carte mis à jour: ${!isOpen ? 'ouverte' : 'fermée'}`);
}

// Gestionnaire d'événements pour les cartes
function setupCardListeners() {
    console.log('🎯 Configuration des écouteurs d\'événements...');
    
    // Utiliser une délégation d'événements au niveau du conteneur
    const cardsContainer = document.querySelector('.collection-list-centre-wrapper');
    if (!cardsContainer) {
        console.warn('⚠️ Conteneur de cartes non trouvé');
        return;
    }

    cardsContainer.addEventListener('click', (event) => {
        // Vérifier si le clic provient d'un élément cliquable
        const clickable = event.target.closest(SELECTORS.CLICKABLE);
        if (!clickable) return;

        event.preventDefault();
        console.log('👆 Clic détecté sur un élément cliquable');
        
        // Trouver la carte parente
        const card = clickable.closest(SELECTORS.CARD);
        if (card) {
            console.log('🎴 Carte parente trouvée:', card);
            toggleCard(card);
        } else {
            console.warn('⚠️ Aucune carte parente trouvée pour cet élément');
            console.log('🔍 Élément cliqué:', clickable);
            console.log('🔍 Chemin DOM:', clickable.parentElement);
        }
    });

    console.log('✅ Écouteur d\'événements configuré sur le conteneur');
}

// Fonction d'initialisation principale
export function initCentreCards() {
    console.log('🚀 Démarrage de l\'initialisation des cartes...');
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        console.log('⏳ DOM en cours de chargement, attente de DOMContentLoaded...');
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM chargé, initialisation des cartes...');
            initializeCardElements();
            setupCardListeners();
        });
    } else {
        console.log('📄 DOM déjà chargé, initialisation immédiate...');
        initializeCardElements();
        setupCardListeners();
    }

    // Observer les changements dans le DOM pour gérer le contenu dynamique
    console.log('👀 Configuration de l\'observateur de mutations...');
    const observer = new MutationObserver((mutations) => {
        console.log(`🔄 ${mutations.length} mutation(s) détectée(s)`);
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                console.log(`➕ ${mutation.addedNodes.length} nouveau(x) nœud(s) détecté(s)`);
                initializeCardElements();
                // Pas besoin de réinitialiser les écouteurs car on utilise la délégation d'événements
            }
        });
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
