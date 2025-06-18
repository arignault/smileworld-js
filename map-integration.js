// Fichier : map-integration.js
console.log('🗺️ map-integration.js v1.0.0 chargé');

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
        const centreCards = document.querySelectorAll('.centre-card_wrapper');
        console.log(`📍 ${centreCards.length} cartes trouvées pour la création des marqueurs.`);

        centreCards.forEach(card => {
            const lat = parseFloat(card.dataset.lat);
            const lng = parseFloat(card.dataset.lng);
            const placeId = card.dataset.placeId;
            const cardId = card.closest('.w-dyn-item')?.getAttribute('id'); // Un ID unique si possible

            if (!lat || !lng || !placeId) {
                console.warn('⚠️ Carte ignorée car il manque data-lat, data-lng ou data-place-id', card);
                return;
            }

            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: this.map,
                title: card.querySelector('h3')?.textContent || 'Centre Smile World',
                animation: google.maps.Animation.DROP
            });

            // Au clic sur un marqueur, on simule l'ouverture de la carte correspondante
            marker.addListener('click', () => {
                const clickableElement = card.parentElement.querySelector('.clickable_wrap');
                if (clickableElement) {
                    clickableElement.click();
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