/**
 * Mandatory Filter Selection v1.2.1
 * Force la sélection d'un filtre (parc ou type d'offre) avant d'afficher la liste CMS
 * Gère automatiquement le slider CMS avec id="cms-slider-offres" et le texte d'aide id="helper-text"
 * Chargé uniquement sur /offres et /anniversaires
 */

class MandatoryFilterSelection {
    constructor() {
        this.version = '1.2.1';
        this.initialized = false;
        this.selectors = {
            collectionList: '[fs-list-element="list"]',
            collectionItems: '[fs-list-element="item"]',
            filterInputs: 'input[fs-list-field]',
            noItemsMessage: '.w-dyn-empty',
            filterForms: '[fs-list-element="filters"]',
            cmsSlider: '#cms-slider-offres',
            helperText: '#helper-text'
        };
        this.messages = {
            selectFilter: '👆 Sélectionnez un parc ou un type d\'offre pour voir nos offres disponibles',
            noResults: 'Aucune offre ne correspond à vos critères. Essayez une autre sélection.'
        };
    }

    /**
     * Initialise le module si on est sur les bonnes pages
     */
    init() {
        const currentPath = window.location.pathname;
        const targetPages = ['/offres', '/anniversaires'];
        
        if (!targetPages.includes(currentPath)) {
            console.log(`🚫 mandatory-filter-selection.js - Page ${currentPath} non concernée`);
            return;
        }

        if (this.initialized) {
            console.log('⚠️ mandatory-filter-selection.js déjà initialisé');
            return;
        }

        console.log(`🎯 mandatory-filter-selection.js v${this.version} - Initialisation sur ${currentPath}`);
        
        this.setupInitialState();
        this.bindEvents();
        this.initialized = true;
        
        console.log('✅ Filtrage obligatoire activé - Sélectionnez un filtre pour voir les offres');
    }

    /**
     * Configure l'état initial - cache toutes les offres
     */
    setupInitialState() {
        const collectionList = document.querySelector(this.selectors.collectionList);
        const collectionItems = document.querySelectorAll(this.selectors.collectionItems);
        
        if (!collectionList) {
            console.log('❌ Collection list non trouvée');
            return;
        }

        // Cacher tous les items de collection
        collectionItems.forEach(item => {
            item.style.display = 'none';
        });

        // Créer et afficher le message de sélection
        this.showSelectionMessage();
        
        // Cacher le slider CMS au départ (aucun filtre sélectionné)
        this.hideCmsSlider();
        // Afficher le texte d'aide au départ
        this.showHelperText();
        
        console.log(`🔒 ${collectionItems.length} offres cachées - En attente de sélection de filtre`);
    }

    /**
     * Affiche le message demandant de sélectionner un filtre
     */
    showSelectionMessage() {
        const collectionList = document.querySelector(this.selectors.collectionList);
        if (!collectionList) return;

        // Supprimer l'ancien message s'il existe
        const existingMessage = collectionList.querySelector('.mandatory-filter-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Créer le nouveau message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'mandatory-filter-message';
        messageDiv.style.cssText = `
            padding: 40px 20px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            margin: 20px 0;
            color: white;
            font-size: 18px;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
            animation: pulse 2s infinite;
        `;
        
        messageDiv.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
            <div>${this.messages.selectFilter}</div>
        `;

        // Ajouter l'animation CSS
        if (!document.querySelector('#mandatory-filter-styles')) {
            const style = document.createElement('style');
            style.id = 'mandatory-filter-styles';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.02); opacity: 0.9; }
                }
                .mandatory-filter-message {
                    transition: all 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }

        collectionList.appendChild(messageDiv);
    }

    /**
     * Lie les événements aux inputs de filtres
     */
    bindEvents() {
        const filterInputs = document.querySelectorAll(this.selectors.filterInputs);
        
        filterInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.handleFilterChange();
            });
        });

        // Écouter les événements Finsweet pour détecter les changements
        window.addEventListener('list-updated', () => {
            this.handleListUpdate();
        });

        console.log(`🔗 ${filterInputs.length} filtres écoutés`);
    }

    /**
     * Gère les changements de filtres
     */
    handleFilterChange() {
        const checkedFilters = document.querySelectorAll(`${this.selectors.filterInputs}:checked`);
        
        if (checkedFilters.length > 0) {
            console.log(`✅ ${checkedFilters.length} filtre(s) sélectionné(s) - Affichage des offres`);
            this.showCollectionItems();
            this.hideSelectionMessage();
            this.showCmsSlider(); // AFFICHE le slider CMS quand un filtre est sélectionné
            this.hideHelperText(); // CACHE le texte d'aide quand un filtre est sélectionné
        } else {
            console.log('🔒 Aucun filtre sélectionné - Masquage des offres');
            this.hideCollectionItems();
            this.showSelectionMessage();
            this.hideCmsSlider(); // CACHE le slider CMS quand aucun filtre
            this.showHelperText(); // AFFICHE le texte d'aide quand aucun filtre
        }
    }

    /**
     * Gère les mises à jour de la liste Finsweet
     */
    handleListUpdate() {
        const checkedFilters = document.querySelectorAll(`${this.selectors.filterInputs}:checked`);
        const visibleItems = document.querySelectorAll(`${this.selectors.collectionItems}:not([style*="display: none"])`);
        
        if (checkedFilters.length > 0 && visibleItems.length === 0) {
            console.log('⚠️ Aucun résultat pour les filtres sélectionnés');
            this.showNoResultsMessage();
        }
    }

    /**
     * Affiche les items de collection
     */
    showCollectionItems() {
        const collectionItems = document.querySelectorAll(this.selectors.collectionItems);
        collectionItems.forEach(item => {
            item.style.display = '';
        });
    }

    /**
     * Cache les items de collection
     */
    hideCollectionItems() {
        const collectionItems = document.querySelectorAll(this.selectors.collectionItems);
        collectionItems.forEach(item => {
            item.style.display = 'none';
        });
    }

    /**
     * Cache le message de sélection
     */
    hideSelectionMessage() {
        const message = document.querySelector('.mandatory-filter-message');
        if (message) {
            message.style.display = 'none';
        }
    }

    /**
     * Affiche le slider CMS des offres (quand un filtre est sélectionné)
     */
    showCmsSlider() {
        const cmsSlider = document.querySelector(this.selectors.cmsSlider);
        if (cmsSlider) {
            cmsSlider.style.display = '';
            console.log('👁️ Slider CMS des offres affiché (filtre sélectionné)');
        }
    }

    /**
     * Cache le slider CMS des offres (quand aucun filtre sélectionné)
     */
    hideCmsSlider() {
        const cmsSlider = document.querySelector(this.selectors.cmsSlider);
        if (cmsSlider) {
            cmsSlider.style.display = 'none';
            console.log('🙈 Slider CMS des offres masqué (aucun filtre)');
        }
    }

    /**
     * Affiche le texte d'aide (quand aucun filtre sélectionné)
     */
    showHelperText() {
        const helperText = document.querySelector(this.selectors.helperText);
        if (helperText) {
            helperText.style.display = '';
            console.log('👁️ Texte d\'aide affiché (aucun filtre)');
        }
    }

    /**
     * Cache le texte d'aide (quand un filtre est sélectionné)
     */
    hideHelperText() {
        const helperText = document.querySelector(this.selectors.helperText);
        if (helperText) {
            helperText.style.display = 'none';
            console.log('🙈 Texte d\'aide masqué (filtre sélectionné)');
        }
    }

    /**
     * Affiche le message "aucun résultat"
     */
    showNoResultsMessage() {
        const collectionList = document.querySelector(this.selectors.collectionList);
        if (!collectionList) return;

        const existingMessage = collectionList.querySelector('.no-results-message');
        if (existingMessage) return; // Message déjà affiché

        const messageDiv = document.createElement('div');
        messageDiv.className = 'no-results-message';
        messageDiv.style.cssText = `
            padding: 30px 20px;
            text-align: center;
            background: #f8f9fa;
            border-radius: 8px;
            margin: 20px 0;
            color: #6c757d;
            font-size: 16px;
        `;
        
        messageDiv.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 12px;">😕</div>
            <div>${this.messages.noResults}</div>
        `;

        collectionList.appendChild(messageDiv);

        // Supprimer le message après 3 secondes
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }

    /**
     * Réinitialise le module
     */
    reset() {
        this.hideSelectionMessage();
        this.showCollectionItems();
        this.hideCmsSlider(); // Reset: cache le slider CMS
        this.showHelperText(); // Reset: affiche le texte d'aide
        this.initialized = false;
        console.log('🔄 Filtrage obligatoire réinitialisé');
    }
}

// Instance globale
window.mandatoryFilterSelection = new MandatoryFilterSelection();

// Auto-initialisation si le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.mandatoryFilterSelection.init();
    });
} else {
    window.mandatoryFilterSelection.init();
}

// Export pour utilisation dans d'autres modules
export { MandatoryFilterSelection };

console.log('🚀 mandatory-filter-selection.js v1.2.1 chargé'); 