/**
 * Event Form Visibility v1.6.0
 * Force la sélection d'un centre avant d'afficher le formulaire de devis
 * Gère automatiquement le conteneur #devis-form-wrapper
 * Initialise aussi la carte Google Maps avec les données des centres
 * Chargé uniquement sur /smile-event
 */

class EventFormVisibility {
    constructor() {
        this.version = '1.6.0';
        this.initialized = false;
        this.selectors = {
            formWrapper: '#devis-form-wrapper',
            filterElements: '[fs-list-value]',
            filterForms: '[fs-list-element="filters"]',
            mapElement: '#map'
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
        this.setupMapData();
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
     * Configure les données pour la carte Google Maps
     */
    setupMapData() {
        const mapElement = document.querySelector(this.selectors.mapElement);
        if (!mapElement) {
            console.log('ℹ️ Aucun élément #map trouvé, pas d\'initialisation de carte');
            return;
        }

        // Récupérer les données des centres depuis le dropdown
        const filterDropdown = document.querySelector('select[fs-list-field]');
        if (!filterDropdown) {
            console.log('❌ Dropdown des centres non trouvé pour récupérer les données de la carte');
            return;
        }

        // Créer un conteneur invisible pour les données des centres
        const dataContainer = document.createElement('div');
        dataContainer.id = 'centres-data-container';
        dataContainer.style.display = 'none';
        document.body.appendChild(dataContainer);

        // Parcourir les options du dropdown pour extraire les données
        let centresAdded = 0;
        Array.from(filterDropdown.options).forEach((option, index) => {
            if (index === 0 || !option.value) return; // Skip la première option vide

            // Extraire les données depuis les attributs data- ou le text de l'option
            // Ces données doivent être ajoutées côté Webflow sur les options du dropdown
            const placeId = option.dataset.placeId;
            const lat = option.dataset.lat;
            const lng = option.dataset.lng;
            const centreName = option.textContent.trim();

            if (placeId && lat && lng) {
                // Créer un élément de données pour la carte
                const centreDataElement = document.createElement('div');
                centreDataElement.className = 'w-dyn-item';
                centreDataElement.setAttribute('data-place-id', placeId);
                centreDataElement.setAttribute('data-lat', lat);
                centreDataElement.setAttribute('data-lng', lng);
                
                // Ajouter un titre pour map-integration.js
                const titleElement = document.createElement('h3');
                titleElement.textContent = centreName;
                centreDataElement.appendChild(titleElement);
                
                dataContainer.appendChild(centreDataElement);
                centresAdded++;
            } else {
                console.warn(`⚠️ Données manquantes pour le centre "${centreName}". Vérifiez les attributs data-place-id, data-lat, data-lng sur l'option du dropdown.`);
            }
        });

        if (centresAdded > 0) {
            console.log(`🗺️ ${centresAdded} centres configurés pour la carte Google Maps`);
            
            // Réinitialiser la carte si map-integration.js est déjà chargé
            if (window.mapManager) {
                window.mapManager.createMarkers();
            }
        } else {
            console.log('⚠️ Aucune donnée de centre trouvée pour la carte. Ajoutez les attributs data-place-id, data-lat, data-lng aux options du dropdown côté Webflow.');
        }
    }

    /**
     * Lie les événements aux éléments de filtres
     */
    bindEvents() {
        const filterElements = document.querySelectorAll(this.selectors.filterElements);
        
        filterElements.forEach(element => {
            element.addEventListener('change', () => {
                this.handleFilterChange();
            });
            element.addEventListener('click', () => {
                this.handleFilterChange();
            });
        });

        // Écouter les événements Finsweet pour détecter les changements
        window.addEventListener('list-updated', () => {
            this.handleFilterChange();
        });

        console.log(`🔗 ${filterElements.length} élément(s) de filtre écouté(s)`);
    }

    /**
     * Gère les changements de filtres
     */
    handleFilterChange() {
        const filterElements = document.querySelectorAll(this.selectors.filterElements);
        let hasSelection = false;
        
        filterElements.forEach(element => {
            // Vérifier si l'élément est sélectionné/actif
            if (element.checked || element.classList.contains('w--current') || 
                (element.tagName.toLowerCase() === 'select' && element.value && element.value !== '')) {
                const filterValue = element.getAttribute('fs-list-value');
                if (filterValue) {
                    hasSelection = true;
                    console.log(`🎯 Filtre actif détecté: ${filterValue}`);
                }
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
        
        // Nettoyer le conteneur de données de centres si il existe
        const dataContainer = document.getElementById('centres-data-container');
        if (dataContainer) {
            dataContainer.remove();
        }
        
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

console.log('🚀 event-form-visibility.js v1.6.0 chargé'); 