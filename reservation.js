import {gsap} from 'gsap';

// window.Webflow = window.Webflow || [];
// window.Webflow.push(function() {
/* ========================================================================
   Smile-World Reservation – v7.0.0 (Refactored)
   (c) 2025 – Alex | Refactor by Gemini
   ====================================================================== */

export class SmileWorldReservation {
  constructor() {
    this.config = {
      defaultVideoUrl: 'https://player.vimeo.com/progressive_redirect/playback/1088767237/rendition/1080p/file.mp4?loc=external&signature=1d46b415bde9b315b01d645374b5f7319940ecff5995ac8ac213f847577f6536',
      ids: {
        initialContainer: 'container-initial',
        filteredContainer: 'container-filtre',
        hiddenMap: 'hidden-map',
        initialActivitiesPane: 'tab-pane-initial-activites',
        initialParksPane: 'tab-pane-initial-parcs',
        filteredActivitiesPane: 'tab-pane-filtre-activites',
        filteredParksPane: 'tab-pane-filtre-parcs',
        initialActivitiesTabLink: 'tab-link-initial-activites',
        initialParksTabLink: 'tab-link-initial-parcs',
        filteredActivitiesTabLink: 'tab-link-filtre-activites',
        filteredParksTabLink: 'tab-link-filtre-parcs',
        selectionWrapper: 'selection-wrapper',
        label: 'selection-label',
        reserveBtn: 'reserve-btn',
        iframeWrap: 'iframe-wrapper'
      }
    };

    this.state = {
      primarySelectionType: null,
      selectedInitialSlugs: new Set(),
      selectedInitialParkId: null,
      finalSelectedParkId: null,
      finalSelectedSlugs: new Set()
    };

    this.dom = {};
    this.mapItems = [];

    this.init();
  }

  // --- 1. INITIALISATION ---

  init() {
    if (!this._setupDomElements()) return;
    this._injectStyles();
    this._injectVideoPlayer();
    this._setupEventListeners();
    this._applyUrlParameters();
    this._setInitialUiState();
  }

  _setupDomElements() {
    for (const key in this.config.ids) {
      this.dom[key] = document.getElementById(this.config.ids[key]);
      if (!this.dom[key]) {
        console.error(`[SW-RSV] Essential element #${this.config.ids[key]} is missing.`);
        return false;
      }
    }
    this.dom.videoBackgroundDiv = document.querySelector('[data-attribute="video_background"]');
    this.dom.resetButton = document.querySelector('[data-attribute="reset_form"]');
    this.mapItems = Array.from(this.dom.hiddenMap.querySelectorAll('.map-item'));
    return true;
  }

  _setInitialUiState() {
    this.dom.filteredContainer.style.display = 'none';
    this.dom.reserveBtn.classList.add('disabled');
    this.dom.iframeWrap.style.display = 'none';
    if (this.dom.selectionWrapper) {
      window.gsap.set(this.dom.selectionWrapper, { opacity: 0.5, pointerEvents: 'none' });
      window.gsap.set(this.dom.label, { opacity: 0 });
    }
  }
  
  // --- 2. GESTIONNAIRES D'ÉVÉNEMENTS ---

  _setupEventListeners() {
    this.dom.initialActivitiesPane.addEventListener('click', this._handleSelection.bind(this, 'initialActivity'));
    this.dom.initialParksPane.addEventListener('click', this._handleSelection.bind(this, 'initialPark'));
    this.dom.filteredActivitiesPane.addEventListener('click', this._handleSelection.bind(this, 'finalActivity'));
    this.dom.filteredParksPane.addEventListener('click', this._handleSelection.bind(this, 'finalPark'));
    this.dom.reserveBtn.addEventListener('click', this._handleReserveClick.bind(this));
    if(this.dom.resetButton) {
      this.dom.resetButton.addEventListener('click', this._fullReset.bind(this));
    }
  }
  
  _handleSelection(type, event) {
      const button = event.target.closest('[data-activity-slug], [data-centre-apex-id]');
      if(!button) return;

      const slug = button.dataset.activitySlug;
      const parkId = button.dataset.centreApexId;

      switch(type) {
          case 'initialActivity':
              this._handleInitialActivitySelection(slug, button);
              break;
          case 'initialPark':
              this._handleInitialParkSelection(parkId, button);
              break;
          case 'finalActivity':
              this._handleFinalActivitySelection(slug, button);
              break;
          case 'finalPark':
              this._handleFinalParkSelection(parkId, button);
              break;
      }
  }

  // --- 3. LOGIQUE DE SÉLECTION ---

  _handleInitialActivitySelection(slug, button) {
    if (this.state.primarySelectionType === 'parks') {
      this._resetInitialSelections('parks');
      this._resetInitialTabs();
    }
    this.state.primarySelectionType = 'activities';
    
    button.classList.toggle('isSelected');
    if (button.classList.contains('isSelected')) {
      this.state.selectedInitialSlugs.add(slug);
    } else {
      this.state.selectedInitialSlugs.delete(slug);
    }
    this._resetFinalSelections();
    
    if (this.state.selectedInitialSlugs.size > 0) {
      this.dom.initialParksTabLink.style.display = 'none';
      
      const parksForEachSlug = Array.from(this.state.selectedInitialSlugs).map(s =>
        new Set(this.mapItems.filter(item => item.dataset.activitySlug === s).map(item => item.dataset.centreApexId))
      );
      const initialSet = parksForEachSlug.length > 0 ? parksForEachSlug[0] : new Set();
      const compatibleParkIds = parksForEachSlug.reduce((intersection, currentSet) => new Set([...intersection].filter(id => currentSet.has(id))), initialSet);

      this.dom.filteredParksPane.querySelectorAll('[data-centre-apex-id]').forEach(parkItem => {
        parkItem.style.display = compatibleParkIds.has(parkItem.dataset.centreApexId) ? 'block' : 'none';
      });
      
      this.dom.filteredContainer.style.display = 'flex';
      this._switchFilteredTab('parks');
    } else {
      this._resetInitialTabs();
      this.dom.filteredContainer.style.display = 'none';
      this._resetFilteredTabs();
      this.state.primarySelectionType = null;
    }
    this._updateStateAndButton();
  }

  _handleInitialParkSelection(parkId, button) {
    if (this.state.primarySelectionType === 'activities') {
      this._resetInitialSelections('activities');
      this._resetInitialTabs();
    }
    this.state.primarySelectionType = 'parks';
    const isDeselecting = this.state.selectedInitialParkId === parkId;
    this._resetFinalSelections();
    
    if (isDeselecting) {
      this.state.selectedInitialParkId = null;
      button.classList.remove('isSelected');
      this._resetInitialTabs();
      this.dom.filteredContainer.style.display = 'none';
      this._resetFilteredTabs();
      this._updateVideoSource(null);
    } else {
      this.dom.initialParksPane.querySelectorAll('[data-centre-apex-id]').forEach(b => b.classList.remove('isSelected'));
      this.state.selectedInitialParkId = parkId;
      button.classList.add('isSelected');
      this._updateVideoSource(button);
      this.dom.initialActivitiesTabLink.style.display = 'none';
      
      const compatibleSlugs = new Set(this.mapItems.filter(item => item.dataset.centreApexId === parkId).map(item => item.dataset.activitySlug));
      this.dom.filteredActivitiesPane.querySelectorAll('[data-activity-slug]').forEach(activityItem => {
        activityItem.style.display = compatibleSlugs.has(activityItem.dataset.activitySlug) ? 'block' : 'none';
      });
      
      this.dom.filteredContainer.style.display = 'flex';
      this._switchFilteredTab('activities');
    }
    this._updateStateAndButton();
  }

  _handleFinalParkSelection(parkId, button) {
    if (this.state.primarySelectionType !== 'activities') return;
    
    if (this.state.finalSelectedParkId === parkId) {
      this.state.finalSelectedParkId = null;
      button.classList.remove('isSelected');
      this._updateVideoSource(null);
    } else {
      this.dom.filteredParksPane.querySelectorAll('[data-centre-apex-id]').forEach(b => b.classList.remove('isSelected'));
      this.state.finalSelectedParkId = parkId;
      button.classList.add('isSelected');
      this._updateVideoSource(button);
    }
    this._updateStateAndButton();
  }

  _handleFinalActivitySelection(slug, button) {
    if (this.state.primarySelectionType !== 'parks') return;
    button.classList.toggle('isSelected');
    if (button.classList.contains('isSelected')) {
      this.state.finalSelectedSlugs.add(slug);
    } else {
      this.state.finalSelectedSlugs.delete(slug);
    }
    this._updateStateAndButton();
  }

  _handleReserveClick(e) {
    if (this.dom.reserveBtn.classList.contains('disabled')) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const url = this.dom.reserveBtn.href;
    if (url && url !== '#') {
      this.dom.iframeWrap.innerHTML = `<iframe src="${url}" style="width: 100%; height: 100vh; border: none;"></iframe>`;
      this.dom.iframeWrap.style.display = 'block';

      const iframeTop = this.dom.iframeWrap.getBoundingClientRect().top + window.scrollY;
      const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const offset = 7 * remInPx;

      window.scrollTo({ top: iframeTop - offset, behavior: 'smooth' });
    }
  }

  // --- 4. MISE À JOUR DE L'ÉTAT ET DE L'UI ---

  _updateStateAndButton() {
    let finalParkId = null;
    let finalSlugs = null;

    if (this.state.primarySelectionType === 'activities') {
      finalParkId = this.state.finalSelectedParkId;
      finalSlugs = this.state.selectedInitialSlugs;
    } else if (this.state.primarySelectionType === 'parks') {
      finalParkId = this.state.selectedInitialParkId;
      finalSlugs = this.state.finalSelectedSlugs;
    }

    if (finalParkId && finalSlugs && finalSlugs.size > 0) {
      const finalActivityApexIds = Array.from(finalSlugs).map(slug => {
          const mapItem = this.mapItems.find(item => item.dataset.centreApexId === finalParkId && item.dataset.activitySlug === slug);
          return mapItem ? mapItem.dataset.activityApexId : null;
      }).filter(Boolean);

      if (finalActivityApexIds.length === finalSlugs.size) {
        const categories = finalActivityApexIds.join(',');
        this.dom.reserveBtn.href = `https://www.apex-timing.com/gokarts/sessions_booking.php?center=${finalParkId}&categories=${categories}&language=fr&iframe_id=axiframe_0`;
        this.dom.reserveBtn.classList.remove('disabled');

        const parkButton = (this.state.primarySelectionType === 'activities')
          ? this.dom.filteredParksPane.querySelector(`[data-centre-apex-id="${finalParkId}"]`)
          : this.dom.initialParksPane.querySelector(`[data-centre-apex-id="${finalParkId}"]`);
        const parkName = parkButton ? parkButton.dataset.parkLabel : '';
        
        const activityLabels = Array.from(finalSlugs).map(slug => {
          const activityButton = (this.state.primarySelectionType === 'activities')
            ? this.dom.initialActivitiesPane.querySelector(`[data-activity-slug="${slug}"]`)
            : this.dom.filteredActivitiesPane.querySelector(`[data-activity-slug="${slug}"]`);
          return activityButton ? activityButton.dataset.activityLabel : slug;
        });

        this.dom.label.textContent = `C'est parti pour ${activityLabels.map(l => `un ${l}`).join(' & ')} à ${parkName} !`;
        this._animateSelectionAppearance();
      } else {
        this.dom.reserveBtn.href = '#';
        this.dom.reserveBtn.classList.add('disabled');
        this.dom.label.textContent = 'La combinaison sélectionnée est invalide.';
        this._resetSelectionAppearance();
      }
    } else {
      this.dom.reserveBtn.href = '#';
      this.dom.reserveBtn.classList.add('disabled');
      this.dom.label.textContent = 'Veuillez terminer votre sélection.';
      this._resetSelectionAppearance();
    }
  }

  _switchFilteredTab(target) {
    const activeClass = 'w--current';
    const toShow = target === 'parks' ? 'Parks' : 'Activities';
    const toHide = target === 'parks' ? 'Activities' : 'Parks';

    this.dom[`filtered${toShow}TabLink`].classList.add(activeClass);
    this.dom[`filtered${toHide}TabLink`].classList.remove(activeClass);
    this.dom[`filtered${toShow}Pane`].classList.add(activeClass);
    this.dom[`filtered${toHide}Pane`].classList.remove(activeClass);

    this.dom[`filtered${toShow}TabLink`].style.display = 'inline-block';
    this.dom[`filtered${toShow}Pane`].style.display = 'block';
    this.dom[`filtered${toHide}TabLink`].style.display = 'none';
    this.dom[`filtered${toHide}Pane`].style.display = 'none';
  }

  _animateSelectionAppearance() {
    if (!this.dom.selectionWrapper) return;
    const tl = window.gsap.timeline();
    tl.to(this.dom.selectionWrapper, { opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: 'power2.inOut' })
      .from(this.dom.selectionWrapper, { scale: 0.9, ease: 'elastic.out(1, 0.6)', duration: 1.2 }, "-=0.2")
      .to(this.dom.label, { opacity: 1, duration: 0.5 }, "-=1");
  }

  _resetSelectionAppearance() {
    if (!this.dom.selectionWrapper) return;
    window.gsap.to(this.dom.selectionWrapper, { opacity: 0.5, pointerEvents: 'none', duration: 0.3 });
    window.gsap.to(this.dom.label, { opacity: 0, duration: 0.2 });
  }

  _updateVideoSource(parkButton) {
    if (!this.dom.videoBackgroundDiv) return;
    const videoSource = this.dom.videoBackgroundDiv.querySelector('source');
    const video = this.dom.videoBackgroundDiv.querySelector('video');
    if (!videoSource || !video) return;

    const newSrc = parkButton && parkButton.dataset.video ? parkButton.dataset.video : this.config.defaultVideoUrl;
    if (videoSource.src !== newSrc) {
      videoSource.src = newSrc;
      video.load();
      video.play().catch(() => {});
    }
  }

  // --- 5. FONCTIONS DE RÉINITIALISATION ---

  _fullReset(e) {
    if(e) e.preventDefault();
    this.state.primarySelectionType = null;
    this._resetInitialSelections('activities');
    this._resetInitialSelections('parks');
    this._resetFinalSelections();
    this._resetInitialTabs();
    this._resetFilteredTabs();
    this.dom.filteredContainer.style.display = 'none';
    this.dom.iframeWrap.style.display = 'none';
    this._updateStateAndButton();
  }

  _resetInitialTabs() {
    if (this.dom.initialActivitiesTabLink) this.dom.initialActivitiesTabLink.style.display = 'flex';
    if (this.dom.initialParksTabLink) this.dom.initialParksTabLink.style.display = 'flex';
  }

  _resetInitialSelections(typeToClear) {
    if (typeToClear === 'activities') {
      this.dom.initialActivitiesPane.querySelectorAll('[data-activity-slug]').forEach(btn => btn.classList.remove('isSelected'));
      this.state.selectedInitialSlugs.clear();
    } else if (typeToClear === 'parks') {
      this.dom.initialParksPane.querySelectorAll('[data-centre-apex-id]').forEach(btn => btn.classList.remove('isSelected'));
      this.state.selectedInitialParkId = null;
      this._updateVideoSource(null);
    }
  }

  _resetFinalSelections() {
    this.dom.filteredActivitiesPane.querySelectorAll('[data-activity-slug]').forEach(btn => btn.classList.remove('isSelected'));
    this.state.finalSelectedSlugs.clear();
    this.dom.filteredParksPane.querySelectorAll('[data-centre-apex-id]').forEach(btn => btn.classList.remove('isSelected'));
    this.state.finalSelectedParkId = null;
  }

  _resetFilteredTabs() {
    this.dom.filteredActivitiesTabLink.style.display = 'inline-block';
    this.dom.filteredParksTabLink.style.display = 'inline-block';
  }

  // --- 6. UTILS ---

  _injectStyles() {
    const style = document.createElement('style');
    style.id = 'sw-rsv-styles';
    style.textContent = `
        .isSelected .tags_content { background-color: black !important; color: white !important; }
        .isSelected .tags_content * { color: white !important; }`;
    document.head.appendChild(style);
  }
  
  _injectVideoPlayer() {
    this.dom.videoBackgroundDiv.innerHTML = `<video playsinline autoplay muted loop class="background-video_element"><source src="${this.config.defaultVideoUrl}" type="video/mp4"></video>`;
  }
  
  _applyUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const activitySlug = params.get('activite');
    const parkId = params.get('parc');

    if (!activitySlug && !parkId) return;

    // Logique de gestion des onglets et sélections
    if (parkId && activitySlug) {
        // --- CAS 1: Parc ET Activité sont présélectionnés ---
        // On commence par la vue "Parcs"
        if (this.dom.initialParksTabLink) {
            this.dom.initialParksTabLink.click();
        }
        
        // On attend un court instant que le DOM soit à jour, puis on clique
        setTimeout(() => {
            const parkButton = this.dom.initialParksPane.querySelector(`[data-centre-apex-id="${parkId}"]`);
            if (parkButton) {
                parkButton.click(); // Sélectionne le parc, ce qui affiche et filtre les activités
            }

            // On attend encore un peu pour que la seconde interaction se fasse bien
            setTimeout(() => {
                const finalActivityButton = this.dom.filteredActivitiesPane.querySelector(`[data-activity-slug="${activitySlug}"]`);
                if (finalActivityButton) {
                    finalActivityButton.click(); // Sélectionne l'activité dans la liste filtrée
                }
            }, 100);
        }, 100);

    } else if (activitySlug) {
        // --- CAS 2: Seule l'activité est présélectionnée ---
        if (this.dom.initialActivitiesTabLink) {
            this.dom.initialActivitiesTabLink.click();
        }
        setTimeout(() => {
            const activityButton = this.dom.initialActivitiesPane.querySelector(`[data-activity-slug="${activitySlug}"]`);
            if (activityButton) {
                activityButton.click();
            }
        }, 100);

    } else if (parkId) {
        // --- CAS 3: Seul le parc est présélectionné ---
        if (this.dom.initialParksTabLink) {
            this.dom.initialParksTabLink.click();
        }
        setTimeout(() => {
            const parkButton = this.dom.initialParksPane.querySelector(`[data-centre-apex-id="${parkId}"]`);
            if (parkButton) {
                parkButton.click();
            }
        }, 100);
    }
  }
}

/**
 * Point d'entrée pour l'initialisation du module de réservation.
 */
export function initReservation() {
  new SmileWorldReservation();
}

// --- Lancement ---
// new SmileWorldReservation();
// }); 
