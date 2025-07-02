/**
 * Event Form Visibility v1.3.0
 * Force la sélection d'un centre avant d'afficher le formulaire de devis
 * Gère automatiquement le conteneur #devis-form-wrapper
 * Chargé uniquement sur /smile-event
 */

class EventFormVisibility {
    constructor() {
        this.version = '1.3.0';
        this.initialized = false;
        this.selectors = {
            formWrapper: '#devis-form-wrapper',
            filterDropdowns: 'select[fs-list-field]',
            filterForms: '[fs-list-element="filters"]'
        };
        this.messages = {
            selectFilter: '👆 Sélectionnez un centre pour afficher le formulaire de demande de devis'
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
        
        console.log('✅ Logique d\'affichage du formulaire de devis activée - Sélectionnez un centre pour voir le formulaire');
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

        // Créer et afficher le message de sélection
        this.showSelectionMessage();
        
        console.log('🔒 Formulaire de devis caché - En attente de sélection de centre');
    }

    /**
     * Affiche le message demandant de sélectionner un centre
     */
    showSelectionMessage() {
        const formWrapper = document.querySelector(this.selectors.formWrapper);
        if (!formWrapper || !formWrapper.parentElement) return;

        // Supprimer l'ancien message s'il existe
        const existingMessage = formWrapper.parentElement.querySelector('.event-form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Créer le nouveau message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'event-form-message';
        messageDiv.style.cssText = `
            padding: 40px 20px;
            text-align: center;
            background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
            border-radius: 12px;
            margin: 20px 0;
            color: #1a2a4c;
            font-size: 18px;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(102, 166, 255, 0.3);
            animation: pulse 2s infinite;
        `;
        
        messageDiv.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 16px;">🏢</div>
            <div>${this.messages.selectFilter}</div>
        `;

        // Ajouter l'animation CSS
        if (!document.querySelector('#event-form-styles')) {
            const style = document.createElement('style');
            style.id = 'event-form-styles';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.02); opacity: 0.9; }
                }
                .event-form-message {
                    transition: all 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }

        formWrapper.parentElement.insertBefore(messageDiv, formWrapper);
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

        console.log(`🔗 ${filterDropdowns.length} dropdown(s) écouté(s)`);
    }

    /**
     * Gère les changements de filtres
     */
    handleFilterChange() {
        const selectedFilters = document.querySelectorAll(`${this.selectors.filterDropdowns}`);
        let hasSelection = false;
        
        selectedFilters.forEach(dropdown => {
            if (dropdown.value && dropdown.value !== '') {
                hasSelection = true;
            }
        });
        
        if (hasSelection) {
            console.log('✅ Centre sélectionné - Affichage du formulaire de devis');
            this.showFormWrapper();
            this.hideSelectionMessage();
        } else {
            console.log('🔒 Aucun centre sélectionné - Masquage du formulaire de devis');
            this.hideFormWrapper();
            this.showSelectionMessage();
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
     * Cache le message de sélection
     */
    hideSelectionMessage() {
        const message = document.querySelector('.event-form-message');
        if (message) {
            message.style.display = 'none';
        }
    }

    /**
     * Réinitialise le module
     */
    reset() {
        this.hideSelectionMessage();
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

console.log('🚀 event-form-visibility.js v1.3.0 chargé'); 