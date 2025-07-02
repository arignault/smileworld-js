/**
 * Event Form Visibility v1.0.0
 * Affiche le formulaire de devis (iframe) uniquement lorsqu'un centre est sélectionné.
 * Spécifique à la page /smile-event
 * Assurez-vous que le conteneur du formulaire a l'ID "devis-form-wrapper"
 * et que le dropdown de filtre Finsweet a l'attribut [fs-list-field="centre"]
 */
class EventFormVisibility {
    constructor() {
        this.version = '1.1.0';
        this.initialized = false;
        this.selectors = {
            filterDropdown: '[fs-list-element="filters"] select',
            formWrapper: '#devis-form-wrapper'
        };
        this.messageText = '👆 Sélectionnez un centre pour afficher le formulaire de demande de devis.';
    }

    init() {
        const currentPath = window.location.pathname;
        if (currentPath !== '/smile-event') {
            // Pas sur la bonne page, on ne fait rien.
            return;
        }

        if (this.initialized) {
            console.log('⚠️ event-form-visibility.js déjà initialisé');
            return;
        }

        console.log(`🎯 event-form-visibility.js v${this.version} - Initialisation`);
        
        this.formWrapperEl = document.querySelector(this.selectors.formWrapper);
        this.filterDropdownEl = document.querySelector(this.selectors.filterDropdown);

        if (!this.formWrapperEl) {
             console.error(`❌ event-form-visibility.js - Conteneur du formulaire non trouvé. Vérifiez que l'élément avec le sélecteur "${this.selectors.formWrapper}" existe.`);
            return;
        }

        if (!this.filterDropdownEl) {
            console.error(`❌ event-form-visibility.js - Dropdown de filtre non trouvé. Vérifiez qu'un <select> existe bien dans votre bloc de filtres [fs-list-element="filters"].`);
            return;
        }

        this.setupInitialState();
        this.bindEvents();
        this.initialized = true;
        console.log('✅ Logique d\'affichage du formulaire de devis activée.');
    }

    setupInitialState() {
        this.formWrapperEl.style.display = 'none';
        this.showPromptMessage();
        // On vérifie immédiatement l'état du dropdown au cas où une valeur serait déjà sélectionnée au chargement
        this.handleFilterChange({ target: this.filterDropdownEl }); 
    }

    showPromptMessage() {
        let messageDiv = this.formWrapperEl.parentElement.querySelector('.event-form-prompt');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'event-form-prompt';
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
            `;
            this.formWrapperEl.parentElement.insertBefore(messageDiv, this.formWrapperEl);
        }
        messageDiv.innerHTML = `<div style="font-size: 48px; margin-bottom: 16px;">🏢</div><div>${this.messageText}</div>`;
        messageDiv.style.display = 'block';
    }

    hidePromptMessage() {
        const messageDiv = this.formWrapperEl.parentElement.querySelector('.event-form-prompt');
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
    }

    bindEvents() {
        this.filterDropdownEl.addEventListener('change', (event) => {
            this.handleFilterChange(event);
        });
    }

    handleFilterChange(event) {
        const selectedValue = event.target.value;
        if (selectedValue && selectedValue !== '') {
            this.formWrapperEl.style.display = '';
            this.hidePromptMessage();
        } else {
            this.formWrapperEl.style.display = 'none';
            this.showPromptMessage();
        }
    }
}

// Instance globale pour un accès facile depuis la console de débogage si nécessaire
window.eventFormVisibility = new EventFormVisibility();

// Auto-initialisation si le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.eventFormVisibility.init();
    });
} else {
    window.eventFormVisibility.init();
}

export default EventFormVisibility; 