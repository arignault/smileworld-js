// Fichier : map-integration.js
// Version : 2.0.0 - Découplé avec un système d'événements
console.log('🗺️ map-integration.js v2.0.0 chargé');

const mapManager = {
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
        
        const mapId = mapElement.dataset.mapId;
        if (!mapId) {
            console.warn("⚠️ data-map-id n'est pas défini sur l'élément #map. Les marqueurs avancés pourraient ne pas fonctionner. Veuillez créer un Map ID dans votre projet Google Cloud et l'ajouter à l'élément #map.");
        }

        // 1. Initialisation de la carte
        this.map = new google.maps.Map(mapElement, {
            center: this.initialCenter,
            zoom: this.initialZoom,
            disableDefaultUI: true,
            zoomControl: true,
            mapId: mapId
        });
        this.infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(this.infoWindow, 'closeclick', () => {
            this.resetMapView();
        });

        // 2. Création des marqueurs pour chaque centre
        this.createMarkers();
        this.initInteractiveList();
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

            if (isNaN(lat) || isNaN(lng) || !placeId) {
                const name = item.querySelector('h3')?.textContent || 'Nom non trouvé';
                console.warn(`⚠️ Carte ignorée (nom: "${name}") car ses données de latitude ou longitude sont manquantes ou invalides dans le CMS.`, item);
                return;
            }

            const marker = new google.maps.marker.AdvancedMarkerElement({
                map: this.map,
                position: { lat, lng },
                title: item.querySelector('h3')?.textContent || 'Centre Smile World'
            });

            // Au clic sur un marqueur, on déclenche le focus sur le centre
            marker.addListener('click', () => {
                this.focusOnCenter(placeId);
            });

            this.markers.push({ placeId, cardId, marker });
        });
    },

    /**
     * Initialise les écouteurs de survol pour la liste interactive des centres.
     */
    initInteractiveList: function() {
        const items = document.querySelectorAll('[data-map-trigger="true"]');
        if (!items.length) {
            console.log('ℹ️ Aucun élément déclencheur de carte trouvé (data-map-trigger="true").');
            return;
        }
        console.log(`🤝 ${items.length} éléments déclencheurs de carte trouvés.`);

        items.forEach(item => {
            const placeId = item.dataset.placeId;
            if (!placeId) {
                console.warn('⚠️ Élément déclencheur ignoré car il manque data-place-id', item);
                return;
            }

            // On passe d'un événement de survol à un événement de clic
            item.addEventListener('click', () => {
                this.focusOnCenter(placeId);
            });
        });
    },

    /**
     * Zoome sur un centre spécifique et affiche son infobulle avec les détails de Google Places.
     * @param {string} placeId L'identifiant Google Place du centre.
     */
    focusOnCenter: async function(placeId) {
        if (!placeId || !this.map) return;
        console.log(`🔎 Zoom sur le centre avec Place ID : ${placeId}`);

        try {
            // Utilisation de la nouvelle API Places
            const { Place } = await google.maps.importLibrary("places");
            const place = new Place({ id: placeId });
            
            // On demande les nouveaux champs : avis, photos, horaires...
            const fields = [
                'displayName', 'formattedAddress', 'location', 'rating', 
                'googleMapsURI', 'photos', 'reviews', 'userRatingCount', 'regularOpeningHours'
            ];
            await place.fetchFields({ fields });

            if (place.location) {
                this.map.panTo(place.location);
                this.map.setZoom(15);

                const content = this.buildInfoWindowContent(place);
                this.infoWindow.setContent(content);
                
                const targetMarker = this.markers.find(m => m.placeId === placeId)?.marker;
                if(targetMarker) {
                    this.infoWindow.open(this.map, targetMarker);
                }
            } else {
                 console.error(`Aucune donnée de localisation trouvée pour le Place ID ${placeId}`);
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération des détails pour le Place ID ${placeId}:`, error);
        }
    },

    /**
     * Construit le contenu HTML pour la bulle d'info.
     * @param {google.maps.places.Place} place L'objet Place avec les données.
     * @returns {string} Le HTML de la bulle d'info.
     */
    buildInfoWindowContent: function(place) {
        let photoHtml = '';
        if (place.photos && place.photos.length > 0) {
            // On prend la première photo et on demande une URL.
            // La taille est limitée pour ne pas être trop grande dans la bulle.
            const photoUrl = place.photos[0].getURI({ maxWidth: 400, maxHeight: 200 });
            photoHtml = `<img src="${photoUrl}" alt="Photo de ${place.displayName}" style="width:100%; height:auto; border-radius: 8px; margin-bottom: 10px;">`;
        }

        let ratingHtml = '';
        if (place.rating) {
            const stars = '★'.repeat(Math.round(place.rating)) + '☆'.repeat(5 - Math.round(place.rating));
            ratingHtml = `<div class="map-infowindow-rating">${stars} ${place.rating.toFixed(1)} (${place.userRatingCount || 0} avis)</div>`;
        }

        let reviewsHtml = '';
        if (place.reviews && place.reviews.length > 0) {
            // On prend le premier avis comme exemple
            const review = place.reviews[0];
            reviewsHtml = `
                <div class="map-infowindow-review">
                    <p>"${review.text}"</p>
                    <span>- ${review.authorAttribution.displayName}</span>
                </div>
            `;
        }
        
        let hoursHtml = '';
        if (place.regularOpeningHours) {
            const today = new Date().getDay(); // 0 pour Dimanche, 1 pour Lundi...
             // L'API Google utilise 0 pour Dimanche, mais weekdayDescriptions est localisé. On prend le jour actuel.
            const todaysHours = place.regularOpeningHours.weekdayDescriptions[today-1] || place.regularOpeningHours.weekdayDescriptions[6]; // Fallback à Samedi si Dimanche
            hoursHtml = `<div class="map-infowindow-hours">Aujourd'hui : ${todaysHours}</div>`;
        }


        return `
            <div class="map-infowindow-content">
                ${photoHtml}
                <div class="map-infowindow-title">${place.displayName}</div>
                <div class="map-infowindow-address">${place.formattedAddress}</div>
                ${ratingHtml}
                ${hoursHtml}
                <a href="${place.googleMapsURI}" target="_blank">Voir sur Google Maps</a>
                ${reviewsHtml}
            </div>
        `;
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
    },

    /* DÉBUT DE LA MODIFICATION : Fonction supprimée
    listenForFocusEvents: function() {
        document.addEventListener('map:focus', (e) => {
            this.focusOnCenter(e.detail.placeId);
        });

        document.addEventListener('map:reset', () => {
            this.resetMapView();
        });
    }
    */
};

// Expose uniquement la fonction initMap à window pour le callback de l'API Google
window.initGoogleMap = mapManager.initMap.bind(mapManager);

/**
 * Point d'entrée pour l'intégration de la carte.
 * Lit la clé API depuis l'élément #map et charge le script Google Maps.
 */
export function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        // Pas une erreur, la carte n'est peut-être juste pas sur cette page.
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initGoogleMap`;
    script.async = true;
    script.setAttribute('loading', 'async');
    document.head.appendChild(script);
} 