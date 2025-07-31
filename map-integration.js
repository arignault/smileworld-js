// Fichier : map-integration-v2.js
// Version : 2.1.2 - Suppression affichage dernier avis
console.log('🗺️ map-integration.js v2.1.2 chargé');

const mapManager = {
    map: null,
    markers: [],
    infoWindow: null,
    bottomSheetElement: null,
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

        this.injectBottomSheet();
        this.createMarkers();
    },

    injectBottomSheet: function() {
        const style = document.createElement('style');
        style.textContent = `
            .map-bottom-sheet {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: white;
                border-top-left-radius: 16px;
                border-top-right-radius: 16px;
                box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
                transform: translateY(100%);
                transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                z-index: 1000;
                max-height: 85vh;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                visibility: hidden;
            }
            .map-bottom-sheet.is-visible {
                transform: translateY(0);
                visibility: visible;
            }
            .map-bottom-sheet__content {
                padding: 24px;
                padding-top: 50px;
            }
            .map-bottom-sheet__close-btn {
                position: absolute;
                top: 12px;
                right: 12px;
                background: #f0f0f0;
                border: none;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                font-size: 22px;
                line-height: 32px;
                text-align: center;
                cursor: pointer;
                font-weight: bold;
                color: #333;
                z-index: 2;
            }
            .map-bottom-sheet__handle {
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 4px;
                background-color: #ccc;
                border-radius: 2px;
            }
        `;
        document.head.appendChild(style);

        const sheetHtml = `
            <div id="map-bottom-sheet" class="map-bottom-sheet" aria-hidden="true">
                <div class="map-bottom-sheet__handle"></div>
                <button class="map-bottom-sheet__close-btn" aria-label="Fermer">&times;</button>
                <div class="map-bottom-sheet__content"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', sheetHtml);
        this.bottomSheetElement = document.getElementById('map-bottom-sheet');
        
        this.bottomSheetElement.querySelector('.map-bottom-sheet__close-btn').addEventListener('click', () => {
            this.hideBottomSheet();
        });
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
                if (window.matchMedia("(max-width: 768px)").matches) {
                    this.showBottomSheetForPlace(placeId);
                } else {
                    this.focusOnCenter(placeId, marker);
                }
            });

            this.markers.push({ placeId, marker });
        });
    },

    focusOnCenter: async function(placeId, marker) {
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

                const content = this.buildInfoWindowContent(place, false);
                this.infoWindow.setContent(content);
                
                const targetMarker = marker || this.markers.find(m => m.placeId === placeId)?.marker;
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

    showBottomSheetForPlace: async function(placeId) {
        if (!placeId || !this.map) return;
        console.log(`📱 Affichage du panneau mobile pour Place ID : ${placeId}`);

        try {
            const { Place } = await google.maps.importLibrary("places");
            const place = new Place({ id: placeId });
            
            const fields = [
                'displayName', 'formattedAddress', 'location', 'rating', 
                'googleMapsURI', 'photos', 'reviews', 'userRatingCount', 'regularOpeningHours'
            ];
            await place.fetchFields({ fields });

            if (place.location) {
                this.map.panTo(place.location);
                this.map.setZoom(15);

                const contentHtml = this.buildInfoWindowContent(place, true);
                this.bottomSheetElement.querySelector('.map-bottom-sheet__content').innerHTML = contentHtml;

                this.bottomSheetElement.classList.add('is-visible');
                this.bottomSheetElement.setAttribute('aria-hidden', 'false');

            } else {
                 console.error(`Aucune donnée de localisation trouvée pour le Place ID ${placeId}`);
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération des détails pour le Place ID ${placeId}:`, error);
        }
    },

    hideBottomSheet: function() {
        if (!this.bottomSheetElement || !this.map) return;
        this.bottomSheetElement.classList.remove('is-visible');
        this.bottomSheetElement.setAttribute('aria-hidden', 'true');

        // Réinitialiser la vue de la carte à son état initial
        console.log('🔙 Réinitialisation de la vue de la carte...');
        this.map.panTo(this.initialCenter);
        this.map.setZoom(this.initialZoom);
    },

    buildInfoWindowContent: function(place, isBottomSheet = false) {
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
        // (v2.1.2) Affichage du dernier avis supprimé conformément au cahier des charges.
        // Nous conservons ratingHtml ci-dessus pour afficher la note et le nombre d'avis.

        
        let hoursHtml = '';
        if (place.regularOpeningHours && place.regularOpeningHours.weekdayDescriptions) {
            const today = new Date().getDay();
            const dayIndex = today === 0 ? 6 : today - 1;
            const todaysHours = place.regularOpeningHours.weekdayDescriptions[dayIndex];
            hoursHtml = `<div style="font-size: 13px; color: #333; margin-bottom: 12px; display: flex; align-items: center;"><svg viewBox="0 0 24 24" style="width:16px; height:16px; margin-right: 8px; fill: #555;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4V7z"></path></svg><span>${todaysHours}</span></div>`;
        }

        const containerStyle = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; ${isBottomSheet ? '' : 'max-width: 290px;'} padding: 5px;`;

        return `
            <div style="${containerStyle}">
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
        this.hideBottomSheet();
        this.map.panTo(this.initialCenter);
        this.map.setZoom(this.initialZoom);
    }
};

window.initGoogleMap = mapManager.initMap.bind(mapManager);
window.mapManager = mapManager;

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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initGoogleMap&loading=async&language=fr`;
    script.async = true;
    document.head.appendChild(script);
} 