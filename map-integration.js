// Fichier : map-integration.js
console.log('🗺️ map-integration.js v1.1.0 chargé');

window.mapManager = {
    map: null,
    markers: [],
    infoWindow: null,
    // Coordonnées centrées pour couvrir Paris et sa petite couronne, y compris l'ouest.
    initialCenter: { lat: 48.82, lng: 2.25 },
    initialZoom: 10,

    /**
     * Initialise la carte, l'infobulle et crée les marqueurs pour chaque centre.
     * Cette fonction est appelée par le script de l'API Google Maps.
     */
    initMap: function() {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Erreur : L\'élément #map est introuvable dans le DOM.');
            return;
        }

        // 1. Initialisation de la carte
        this.map = new google.maps.Map(mapElement, {
            center: this.initialCenter,
            zoom: this.initialZoom,
            disableDefaultUI: true, // On peut désactiver l'UI par défaut pour un look plus épuré
            zoomControl: true,
            styles: [ /* TODO: Ajouter des styles custom pour la carte si désiré */ ]
        });
        this.infoWindow = new google.maps.InfoWindow();

        // 2. Création des marqueurs pour chaque centre
        this.createMarkers();
    },

    /**
     * Scanne le DOM pour les cartes de centre et crée un marqueur pour chacune.
     */
    createMarkers: function() {
        const centreItems = document.querySelectorAll('.w-dyn-item[data-place-id]');
        console.log(`📍 ${centreItems.length} cartes trouvées pour la création des marqueurs.`);

        centreItems.forEach(item => {
            const lat = parseFloat(item.dataset.lat);
            const lng = parseFloat(item.dataset.lng);
            const placeId = item.dataset.placeId;
            const cardId = item.getAttribute('id');

            if (!lat || !lng || !placeId) {
                console.warn('⚠️ Carte ignorée car il manque data-lat, data-lng ou data-place-id', item);
                return;
            }

            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: this.map,
                title: item.querySelector('h3')?.textContent || 'Centre Smile World',
                animation: google.maps.Animation.DROP
            });

            // Au clic sur un marqueur, on simule l'ouverture de la carte correspondante
            marker.addListener('click', () => {
                // Le clickable_wrap avec data-card-toggle est celui qui ouvre la carte
                const clickableElement = item.querySelector('.clickable_wrap[data-attribute="data-card-toggle"]');
                if (clickableElement) {
                    clickableElement.click();
                } else {
                    console.warn("Impossible de trouver l'élément cliquable pour ouvrir la carte", item);
                }
            });

            this.markers.push({ placeId, cardId, marker });
        });
    },

    /**
     * Zoome sur un centre spécifique et affiche son infobulle avec les détails de Google Places.
     * @param {string} placeId L'identifiant Google Place du centre.
     */
    focusOnCenter: function(placeId) {
        if (!placeId || !this.map) return;
        console.log(`🔎 Zoom sur le centre avec Place ID : ${placeId}`);

        const service = new google.maps.places.PlacesService(this.map);
        service.getDetails({
            placeId: placeId,
            fields: ['name', 'formatted_address', 'geometry', 'rating', 'website', 'url']
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
                this.map.panTo(place.geometry.location);
                this.map.setZoom(15);

                const content = `
                    <div class="map-infowindow-content">
                        <div class="map-infowindow-title">${place.name}</div>
                        <div class="map-infowindow-address">${place.formatted_address}</div>
                        ${place.rating ? `<div class="map-infowindow-rating">Note : ${place.rating} ★</div>` : ''}
                        <a href="${place.url}" target="_blank">Voir sur Google Maps</a>
                    </div>
                `;
                this.infoWindow.setContent(content);
                
                const targetMarker = this.markers.find(m => m.placeId === placeId)?.marker;
                if(targetMarker) {
                    this.infoWindow.open(this.map, targetMarker);
                }
            } else {
                console.error(`Erreur lors de la récupération des détails pour le Place ID ${placeId}: ${status}`);
            }
        });
    },

    /**
     * Réinitialise la vue de la carte à son état initial.
     */
    resetMapView: function() {
        if (!this.map) return;
        console.log('🔄 Réinitialisation de la vue de la carte.');
        this.infoWindow.close();
        this.map.panTo(this.initialCenter);
        this.map.setZoom(this.initialZoom);
    }
};

/**
 * Point d'entrée pour l'intégration de la carte.
 * Lit la clé API depuis l'élément #map et charge le script Google Maps.
 */
export function initMapIntegration() {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.warn('⚠️ L\'élément #map est introuvable, l\'intégration de la carte est annulée.');
        return;
    }

    const apiKey = mapElement.dataset.apiKey;
    if (!apiKey) {
        console.error('❌ Clé API Google Maps manquante. Veuillez l\'ajouter dans l\'attribut "data-api-key" de la div #map.');
        return;
    }

    if (window.google && window.google.maps) {
        console.log('🗺️ Google Maps API déjà chargée.');
        mapManager.initMap();
        return;
    }

    console.log('🗺️ Chargement de l\'API Google Maps...');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=mapManager.initMap`;
    script.async = true;
    document.head.appendChild(script);
} 