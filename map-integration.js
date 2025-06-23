// Fichier : map-integration-v2.js
// Version : 2.0.1 - Correction langue et affichage
console.log('🗺️ map-integration.js v2.0.1 chargé');

const mapManager = {
    map: null,
    markers: [],
    infoWindow: null,
    initialCenter: { lat: 48.82, lng: 2.25 },
    initialZoom: 10,

    initMap: function() {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Erreur : L\'élément #map est introuvable dans le DOM.');
            return;
        }

        const mapId = mapElement.dataset.mapId;
        if (!mapId) {
            console.warn("⚠️ data-map-id n'est pas défini sur l'élément #map. Les marqueurs avancés pourraient ne pas fonctionner.");
        }

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

        this.createMarkers();
    },

    createMarkers: function() {
        const centreItems = document.querySelectorAll('.w-dyn-item[data-place-id]');
        console.log(`📍 ${centreItems.length} cartes trouvées pour la création des marqueurs.`);

        centreItems.forEach(item => {
            const lat = parseFloat(item.dataset.lat);
            const lng = parseFloat(item.dataset.lng);
            const placeId = item.dataset.placeId;

            if (isNaN(lat) || isNaN(lng) || !placeId) {
                const name = item.querySelector('h3')?.textContent || 'Nom non trouvé';
                console.warn(`⚠️ Carte ignorée (nom: "${name}") car ses données de latitude/longitude sont manquantes ou invalides.`, item);
                return;
            }

            const marker = new google.maps.marker.AdvancedMarkerElement({
                map: this.map,
                position: { lat, lng },
                title: item.querySelector('h3')?.textContent || 'Centre Smile World'
            });

            marker.addListener('click', () => {
                this.focusOnCenter(placeId);
            });

            this.markers.push({ placeId, marker });
        });
    },

    focusOnCenter: async function(placeId) {
        if (!placeId || !this.map) return;
        console.log(`🔎 Zoom sur le centre avec Place ID : ${placeId}`);

        try {
            const { Place } = await google.maps.importLibrary("places");
            const place = new Place({ id: placeId });
            
            const fields = [
                'displayName', 'formattedAddress', 'location', 'rating', 
                'googleMapsURI', 'photos', 'reviews', 'userRatingCount', 'regularOpeningHours'
            ];
            // On demande les champs avec la langue spécifiée globalement
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

    buildInfoWindowContent: function(place) {
        let photoHtml = '';
        if (place.photos && place.photos.length > 0) {
            const photoUrl = place.photos[0].getURI({ maxWidth: 400, maxHeight: 200 });
            photoHtml = `<img src="${photoUrl}" alt="Photo de ${place.displayName}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;">`;
        }

        let ratingHtml = '';
        if (place.rating) {
            const stars = '★'.repeat(Math.round(place.rating)) + '☆'.repeat(5 - Math.round(place.rating));
            ratingHtml = `
                <div style="display: flex; align-items: center; color: #555; margin-bottom: 8px; font-size: 14px;">
                    <span style="color: #f8b400; font-size: 18px; margin-right: 8px;">${stars}</span>
                    <span style="font-weight: bold; color: #111; margin-right: 5px;">${place.rating.toFixed(1)}</span>
                    <span>(${place.userRatingCount || 0} avis)</span>
                </div>`;
        }

        let reviewsHtml = '';
        if (place.reviews && place.reviews.length > 0) {
            const review = place.reviews[0];
            if (review.text) {
                 reviewsHtml = `
                    <div style="margin-top: 16px;">
                        <strong style="display: block; font-size: 14px; color: #111; margin-bottom: 8px; font-weight: 600;">Dernier avis</strong>
                        <div style="border-left: 3px solid #f0f0f0; padding-left: 12px; font-style: italic;">
                            <p style="margin: 0 0 5px 0; font-size: 13px; color: #555;">"${review.text.substring(0, 100)}..."</p>
                            <span style="font-weight: 500; font-size: 12px; color: #333;">- ${review.authorAttribution.displayName}</span>
                        </div>
                    </div>
                `;
            }
        }
        
        let hoursHtml = '';
        if (place.regularOpeningHours && place.regularOpeningHours.weekdayDescriptions) {
            const today = new Date().getDay();
            const dayIndex = today === 0 ? 6 : today - 1;
            const todaysHours = place.regularOpeningHours.weekdayDescriptions[dayIndex];
            hoursHtml = `<div style="font-size: 13px; color: #333; margin-bottom: 12px; display: flex; align-items: center;"><svg viewBox="0 0 24 24" style="width:16px; height:16px; margin-right: 8px; fill: #555;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4V7z"></path></svg><span>${todaysHours}</span></div>`;
        }

        return `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 290px; padding: 5px;">
                ${photoHtml}
                <div style="font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px;">${place.displayName}</div>
                <div style="font-size: 13px; color: #555; margin-bottom: 8px;">${place.formattedAddress}</div>
                ${ratingHtml}
                ${hoursHtml}
                <a href="${place.googleMapsURI}" target="_blank" style="display: inline-block; margin-top: 8px; font-size: 13px; color: #1a73e8; text-decoration: none; font-weight: 500;">Voir sur Google Maps</a>
                ${reviewsHtml}
            </div>
        `;
    },

    resetMapView: function() {
        if (!this.map) return;
        console.log('🔄 Réinitialisation de la vue de la carte.');
        this.infoWindow.close();
        this.map.panTo(this.initialCenter);
        this.map.setZoom(this.initialZoom);
    }
};

window.initGoogleMap = mapManager.initMap.bind(mapManager);

export function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initGoogleMap&language=fr`;
    script.async = true;
    script.setAttribute('loading', 'async');
    document.head.appendChild(script);
} 