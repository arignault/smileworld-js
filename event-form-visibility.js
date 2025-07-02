/**
 * Event Form Visibility v1.4.0
 * Force la sélection d'un centre avant d'afficher le formulaire de devis
 * Gère automatiquement le conteneur #devis-form-wrapper
 * Chargé uniquement sur /smile-event
 */

class EventFormVisibility {
    constructor() {
        this.version = '1.4.0';
        this.initialized = false;
        this.selectors = {
            formWrapper: '#devis-form-wrapper',
            filterDropdowns: 'select[fs-list-field]',
            filterForms: '[fs-list-element="filters"]'
        };
    }

    /**
     * Initialise le module si on est sur la bonne page
     */
    init() {
        const currentPath = window.location.pathname;
        const targetPages = ['/smile-event'];
        
        if (!targetPages.includes(currentPath)) {
            console.log(`🚫 event-form-visibility.js - Page ${currentPath} non concernée`);
            return;
        }

        if (this.initialized) {
            console.log('⚠️ event-form-visibility.js déjà initialisé');
            return;
        }

        console.log(`🎯 event-form-visibility.js v${this.version} - Initialisation sur ${currentPath}`);
        
        this.setupInitialState();
        this.bindEvents();
        this.initialized = true;
        
        console.log('✅ Logique d\'affichage du formulaire de devis activée');
    }

    /**
     * Configure l'état initial - cache le formulaire de devis
     */
    setupInitialState() {
        const formWrapper = document.querySelector(this.selectors.formWrapper);
        
        if (!formWrapper) {
            console.log('❌ Conteneur du formulaire de devis non trouvé');
            return;
        }

        // Cacher le formulaire de devis
        formWrapper.style.display = 'none';
        
        console.log('🔒 Formulaire de devis caché - En attente de sélection de centre');
    }

    /**
     * Lie les événements aux dropdowns de filtres
     */
    bindEvents() {
        const filterDropdowns = document.querySelectorAll(this.selectors.filterDropdowns);
        
        filterDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', () => {
                this.handleFilterChange();
            });
        });

        // Écouter les événements Finsweet pour détecter les changements
        window.addEventListener('list-updated', () => {
            this.handleFilterChange();
        });

        console.log(`🔗 ${filterDropdowns.length} dropdown(s) écouté(s)`);
    }

    /**
     * Gère les changements de filtres
     */
    handleFilterChange() {
        const filterDropdowns = document.querySelectorAll(this.selectors.filterDropdowns);
        let hasSelection = false;
        
        filterDropdowns.forEach(dropdown => {
            if (dropdown.value && dropdown.value !== '' && dropdown.value !== dropdown.options[0].value) {
                hasSelection = true;
            }
        });
        
        if (hasSelection) {
            console.log('✅ Centre sélectionné - Affichage du formulaire de devis');
            this.showFormWrapper();
        } else {
            console.log('🔒 Aucun centre sélectionné - Masquage du formulaire de devis');
            this.hideFormWrapper();
        }
    }

    /**
     * Affiche le conteneur du formulaire de devis
     */
    showFormWrapper() {
        const formWrapper = document.querySelector(this.selectors.formWrapper);
        if (formWrapper) {
            formWrapper.style.display = '';
        }
    }

    /**
     * Cache le conteneur du formulaire de devis
     */
    hideFormWrapper() {
        const formWrapper = document.querySelector(this.selectors.formWrapper);
        if (formWrapper) {
            formWrapper.style.display = 'none';
        }
    }

    /**
     * Réinitialise le module
     */
    reset() {
        this.hideFormWrapper();
        this.initialized = false;
        console.log('🔄 Logique du formulaire de devis réinitialisée');
    }
}

// Instance globale
window.eventFormVisibility = new EventFormVisibility();

// Auto-initialisation si le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.eventFormVisibility.init();
    });
} else {
    window.eventFormVisibility.init();
}

// Export pour utilisation dans d'autres modules
export { EventFormVisibility };

console.log('🚀 event-form-visibility.js v1.4.0 chargé'); 