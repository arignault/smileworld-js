import { g as o } from "./main_gsap-TzcwUw7S.mjs";
class p {
  constructor() {
    this.config = {
      defaultVideoUrl: "https://player.vimeo.com/progressive_redirect/playback/1088767237/rendition/1080p/file.mp4?loc=external&signature=1d46b415bde9b315b01d645374b5f7319940ecff5995ac8ac213f847577f6536",
      ids: {
        initialContainer: "container-initial",
        filteredContainer: "container-filtre",
        hiddenMap: "hidden-map",
        initialActivitiesPane: "tab-pane-initial-activites",
        initialParksPane: "tab-pane-initial-parcs",
        filteredActivitiesPane: "tab-pane-filtre-activites",
        filteredParksPane: "tab-pane-filtre-parcs",
        initialActivitiesTabLink: "tab-link-initial-activites",
        initialParksTabLink: "tab-link-initial-parcs",
        filteredActivitiesTabLink: "tab-link-filtre-activites",
        filteredParksTabLink: "tab-link-filtre-parcs",
        selectionWrapper: "selection-wrapper",
        label: "selection-label",
        reserveBtn: "reserve-btn",
        iframeWrap: "iframe-wrapper"
      }
    }, this.state = {
      primarySelectionType: null,
      selectedInitialSlugs: /* @__PURE__ */ new Set(),
      selectedInitialParkId: null,
      finalSelectedParkId: null,
      finalSelectedSlugs: /* @__PURE__ */ new Set()
    }, this.dom = {}, this.mapItems = [], this.init();
  }
  // --- 1. INITIALISATION ---
  init() {
    this._setupDomElements() && (this._injectStyles(), this._injectVideoPlayer(), this._setupEventListeners(), this._applyUrlParameters(), this._setInitialUiState());
  }
  _setupDomElements() {
    for (const e in this.config.ids)
      if (this.dom[e] = document.getElementById(this.config.ids[e]), !this.dom[e])
        return console.error(`[SW-RSV] Essential element #${this.config.ids[e]} is missing.`), !1;
    return this.dom.videoBackgroundDiv = document.querySelector('[data-attribute="video_background"]'), this.dom.resetButton = document.querySelector('[data-attribute="reset_form"]'), this.mapItems = Array.from(this.dom.hiddenMap.querySelectorAll(".map-item")), !0;
  }
  _setInitialUiState() {
    this.dom.filteredContainer.style.display = "none", this.dom.reserveBtn.classList.add("disabled"), this.dom.iframeWrap.style.display = "none", this.dom.selectionWrapper && (o.set(this.dom.selectionWrapper, { opacity: 0.5, pointerEvents: "none" }), o.set(this.dom.label, { opacity: 0 }));
  }
  // --- 2. GESTIONNAIRES D'ÉVÉNEMENTS ---
  _setupEventListeners() {
    this.dom.initialActivitiesPane.addEventListener("click", this._handleSelection.bind(this, "initialActivity")), this.dom.initialParksPane.addEventListener("click", this._handleSelection.bind(this, "initialPark")), this.dom.filteredActivitiesPane.addEventListener("click", this._handleSelection.bind(this, "finalActivity")), this.dom.filteredParksPane.addEventListener("click", this._handleSelection.bind(this, "finalPark")), this.dom.reserveBtn.addEventListener("click", this._handleReserveClick.bind(this)), this.dom.resetButton && this.dom.resetButton.addEventListener("click", this._fullReset.bind(this));
  }
  _handleSelection(e, t) {
    const i = t.target.closest("[data-activity-slug], [data-centre-apex-id]");
    if (!i) return;
    const s = i.dataset.activitySlug, a = i.dataset.centreApexId;
    switch (e) {
      case "initialActivity":
        this._handleInitialActivitySelection(s, i);
        break;
      case "initialPark":
        this._handleInitialParkSelection(a, i);
        break;
      case "finalActivity":
        this._handleFinalActivitySelection(s, i);
        break;
      case "finalPark":
        this._handleFinalParkSelection(a, i);
        break;
    }
  }
  // --- 3. LOGIQUE DE SÉLECTION ---
  _handleInitialActivitySelection(e, t) {
    if (this.state.primarySelectionType === "parks" && (this._resetInitialSelections("parks"), this._resetInitialTabs()), this.state.primarySelectionType = "activities", t.classList.toggle("isSelected"), t.classList.contains("isSelected") ? this.state.selectedInitialSlugs.add(e) : this.state.selectedInitialSlugs.delete(e), this._resetFinalSelections(), this.state.selectedInitialSlugs.size > 0) {
      this.dom.initialParksTabLink.style.display = "none";
      const i = Array.from(this.state.selectedInitialSlugs).map(
        (l) => new Set(this.mapItems.filter((n) => n.dataset.activitySlug === l).map((n) => n.dataset.centreApexId))
      ), s = i.length > 0 ? i[0] : /* @__PURE__ */ new Set(), a = i.reduce((l, n) => new Set([...l].filter((r) => n.has(r))), s);
      this.dom.filteredParksPane.querySelectorAll("[data-centre-apex-id]").forEach((l) => {
        l.style.display = a.has(l.dataset.centreApexId) ? "block" : "none";
      }), this.dom.filteredContainer.style.display = "flex", this._switchFilteredTab("parks");
    } else
      this._resetInitialTabs(), this.dom.filteredContainer.style.display = "none", this._resetFilteredTabs(), this.state.primarySelectionType = null;
    this._updateStateAndButton();
  }
  _handleInitialParkSelection(e, t) {
    this.state.primarySelectionType === "activities" && (this._resetInitialSelections("activities"), this._resetInitialTabs()), this.state.primarySelectionType = "parks";
    const i = this.state.selectedInitialParkId === e;
    if (this._resetFinalSelections(), i)
      this.state.selectedInitialParkId = null, t.classList.remove("isSelected"), this._resetInitialTabs(), this.dom.filteredContainer.style.display = "none", this._resetFilteredTabs(), this._updateVideoSource(null);
    else {
      this.dom.initialParksPane.querySelectorAll("[data-centre-apex-id]").forEach((a) => a.classList.remove("isSelected")), this.state.selectedInitialParkId = e, t.classList.add("isSelected"), this._updateVideoSource(t), this.dom.initialActivitiesTabLink.style.display = "none";
      const s = new Set(this.mapItems.filter((a) => a.dataset.centreApexId === e).map((a) => a.dataset.activitySlug));
      this.dom.filteredActivitiesPane.querySelectorAll("[data-activity-slug]").forEach((a) => {
        a.style.display = s.has(a.dataset.activitySlug) ? "block" : "none";
      }), this.dom.filteredContainer.style.display = "flex", this._switchFilteredTab("activities");
    }
    this._updateStateAndButton();
  }
  _handleFinalParkSelection(e, t) {
    this.state.primarySelectionType === "activities" && (this.state.finalSelectedParkId === e ? (this.state.finalSelectedParkId = null, t.classList.remove("isSelected"), this._updateVideoSource(null)) : (this.dom.filteredParksPane.querySelectorAll("[data-centre-apex-id]").forEach((i) => i.classList.remove("isSelected")), this.state.finalSelectedParkId = e, t.classList.add("isSelected"), this._updateVideoSource(t)), this._updateStateAndButton());
  }
  _handleFinalActivitySelection(e, t) {
    this.state.primarySelectionType === "parks" && (t.classList.toggle("isSelected"), t.classList.contains("isSelected") ? this.state.finalSelectedSlugs.add(e) : this.state.finalSelectedSlugs.delete(e), this._updateStateAndButton());
  }
  _handleReserveClick(e) {
    if (this.dom.reserveBtn.classList.contains("disabled")) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const t = this.dom.reserveBtn.href;
    if (t && t !== "#") {
      this.dom.iframeWrap.innerHTML = `<iframe src="${t}" style="width: 100%; height: 100vh; border: none;"></iframe>`, this.dom.iframeWrap.style.display = "block";
      const i = this.dom.iframeWrap.getBoundingClientRect().top + window.scrollY, a = 7 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      window.scrollTo({ top: i - a, behavior: "smooth" });
    }
  }
  // --- 4. MISE À JOUR DE L'ÉTAT ET DE L'UI ---
  _updateStateAndButton() {
    let e = null, t = null;
    if (this.state.primarySelectionType === "activities" ? (e = this.state.finalSelectedParkId, t = this.state.selectedInitialSlugs) : this.state.primarySelectionType === "parks" && (e = this.state.selectedInitialParkId, t = this.state.finalSelectedSlugs), e && t && t.size > 0) {
      const i = Array.from(t).map((s) => {
        const a = this.mapItems.find((l) => l.dataset.centreApexId === e && l.dataset.activitySlug === s);
        return a ? a.dataset.activityApexId : null;
      }).filter(Boolean);
      if (i.length === t.size) {
        const s = i.join(",");
        this.dom.reserveBtn.href = `https://www.apex-timing.com/gokarts/sessions_booking.php?center=${e}&categories=${s}&language=fr&iframe_id=axiframe_0`, this.dom.reserveBtn.classList.remove("disabled");
        const a = this.state.primarySelectionType === "activities" ? this.dom.filteredParksPane.querySelector(`[data-centre-apex-id="${e}"]`) : this.dom.initialParksPane.querySelector(`[data-centre-apex-id="${e}"]`), l = a ? a.dataset.parkLabel : "", n = Array.from(t).map((r) => {
          const d = this.state.primarySelectionType === "activities" ? this.dom.initialActivitiesPane.querySelector(`[data-activity-slug="${r}"]`) : this.dom.filteredActivitiesPane.querySelector(`[data-activity-slug="${r}"]`);
          return d ? d.dataset.activityLabel : r;
        });
        this.dom.label.textContent = `C'est parti pour ${n.map((r) => `un ${r}`).join(" & ")} à ${l} !`, this._animateSelectionAppearance();
      } else
        this.dom.reserveBtn.href = "#", this.dom.reserveBtn.classList.add("disabled"), this.dom.label.textContent = "La combinaison sélectionnée est invalide.", this._resetSelectionAppearance();
    } else
      this.dom.reserveBtn.href = "#", this.dom.reserveBtn.classList.add("disabled"), this.dom.label.textContent = "Veuillez terminer votre sélection.", this._resetSelectionAppearance();
  }
  _switchFilteredTab(e) {
    const t = "w--current", i = e === "parks" ? "Parks" : "Activities", s = e === "parks" ? "Activities" : "Parks";
    this.dom[`filtered${i}TabLink`].classList.add(t), this.dom[`filtered${s}TabLink`].classList.remove(t), this.dom[`filtered${i}Pane`].classList.add(t), this.dom[`filtered${s}Pane`].classList.remove(t), this.dom[`filtered${i}TabLink`].style.display = "inline-block", this.dom[`filtered${i}Pane`].style.display = "block", this.dom[`filtered${s}TabLink`].style.display = "none", this.dom[`filtered${s}Pane`].style.display = "none";
  }
  _animateSelectionAppearance() {
    if (!this.dom.selectionWrapper) return;
    o.timeline().to(this.dom.selectionWrapper, { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: "power2.inOut" }).from(this.dom.selectionWrapper, { scale: 0.9, ease: "elastic.out(1, 0.6)", duration: 1.2 }, "-=0.2").to(this.dom.label, { opacity: 1, duration: 0.5 }, "-=1");
  }
  _resetSelectionAppearance() {
    this.dom.selectionWrapper && (o.to(this.dom.selectionWrapper, { opacity: 0.5, pointerEvents: "none", duration: 0.3 }), o.to(this.dom.label, { opacity: 0, duration: 0.2 }));
  }
  _updateVideoSource(e) {
    if (!this.dom.videoBackgroundDiv) return;
    const t = this.dom.videoBackgroundDiv.querySelector("source"), i = this.dom.videoBackgroundDiv.querySelector("video");
    if (!t || !i) return;
    const s = e && e.dataset.video ? e.dataset.video : this.config.defaultVideoUrl;
    t.src !== s && (t.src = s, i.load(), i.play().catch(() => {
    }));
  }
  // --- 5. FONCTIONS DE RÉINITIALISATION ---
  _fullReset(e) {
    e && e.preventDefault(), this.state.primarySelectionType = null, this._resetInitialSelections("activities"), this._resetInitialSelections("parks"), this._resetFinalSelections(), this._resetInitialTabs(), this._resetFilteredTabs(), this.dom.filteredContainer.style.display = "none", this.dom.iframeWrap.style.display = "none", this._updateStateAndButton();
  }
  _resetInitialTabs() {
    this.dom.initialActivitiesTabLink && (this.dom.initialActivitiesTabLink.style.display = "flex"), this.dom.initialParksTabLink && (this.dom.initialParksTabLink.style.display = "flex");
  }
  _resetInitialSelections(e) {
    e === "activities" ? (this.dom.initialActivitiesPane.querySelectorAll("[data-activity-slug]").forEach((t) => t.classList.remove("isSelected")), this.state.selectedInitialSlugs.clear()) : e === "parks" && (this.dom.initialParksPane.querySelectorAll("[data-centre-apex-id]").forEach((t) => t.classList.remove("isSelected")), this.state.selectedInitialParkId = null, this._updateVideoSource(null));
  }
  _resetFinalSelections() {
    this.dom.filteredActivitiesPane.querySelectorAll("[data-activity-slug]").forEach((e) => e.classList.remove("isSelected")), this.state.finalSelectedSlugs.clear(), this.dom.filteredParksPane.querySelectorAll("[data-centre-apex-id]").forEach((e) => e.classList.remove("isSelected")), this.state.finalSelectedParkId = null;
  }
  _resetFilteredTabs() {
    this.dom.filteredActivitiesTabLink.style.display = "inline-block", this.dom.filteredParksTabLink.style.display = "inline-block";
  }
  // --- 6. UTILS ---
  _injectStyles() {
    const e = document.createElement("style");
    e.id = "sw-rsv-styles", e.textContent = `
        .isSelected .tags_content { background-color: black !important; color: white !important; }
        .isSelected .tags_content * { color: white !important; }`, document.head.appendChild(e);
  }
  _injectVideoPlayer() {
    this.dom.videoBackgroundDiv && (this.dom.videoBackgroundDiv.innerHTML = `
        <div style="width: 100%; height: 100%;" class="w-background-video w-background-video-atom">
          <video playsinline loop muted autoplay data-wf-ignore="true" data-object-fit="cover">
            <source src="${this.config.defaultVideoUrl}" data-wf-ignore="true"/>
          </video>
        </div>`);
  }
  _applyUrlParameters() {
    const e = new URLSearchParams(window.location.search), t = e.get("activite"), i = e.get("parc");
    !t && !i || setTimeout(() => {
      if (i && t) {
        const s = this.dom.initialParksPane.querySelector(`[data-centre-apex-id="${i}"]`);
        if (s) {
          this._handleInitialParkSelection(i, s);
          const a = this.dom.filteredActivitiesPane.querySelector(`[data-activity-slug="${t}"]`);
          a && this._handleFinalActivitySelection(t, a);
        }
      } else if (i) {
        const s = this.dom.initialParksPane.querySelector(`[data-centre-apex-id="${i}"]`);
        s && s.click();
      } else if (t) {
        const s = this.dom.initialActivitiesPane.querySelector(`[data-activity-slug="${t}"]`);
        s && s.click();
      }
    }, 100);
  }
}
export {
  p as SmileWorldReservation
};
