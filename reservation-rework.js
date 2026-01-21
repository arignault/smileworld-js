
(function () {
  // N'activer ce module que sur la page Réservation
  if (!window.location.pathname.includes('/reservation')) return;
  const APEX_BASE = 'https://www.apex-timing.com/gokarts/sessions_booking.php?center=';
  const ITEM_SELECTOR = '[data-attribute="parc-item"]';
  const NO_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NEWTAB_ONLY = true; // Désactive l'overlay et ouvre toujours en nouvel onglet

  // Mode nouvel onglet uniquement: pas d'overlay ni d'iframe injectés
  if (NEWTAB_ONLY) {
    // Clic sur un centre → ouvre dans un nouvel onglet et empêche toute navigation locale
    document.addEventListener('click', (e) => {
      const item = e.target.closest(ITEM_SELECTOR);
      if (!item) return;
      const apexId = item.getAttribute('data-apex-id');
      if (!/^\d{3}$/.test(apexId)) return;
      const url = APEX_BASE + apexId;
      // Empêche la navigation par défaut de l'élément cliqué (liens, etc.)
      try {
        e.preventDefault();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      } catch (_) {}
      window.open(url, '_blank', 'noopener');
      // On reste toujours sur /reservation, même si l'ouverture est bloquée
      return false;
    });

    // Ouverture auto via ?parc=XXX (si testé/manuellement)
    try {
      const params = new URLSearchParams(window.location.search);
      const parkId = params.get('parc');
      if (parkId && /^\d{3}$/.test(parkId)) {
        const url = APEX_BASE + parkId;
        window.open(url, '_blank', 'noopener');
        // Si bloqué par le navigateur, on ne redirige pas la fenêtre actuelle
      }
    } catch (_) {}

    return; // On n'exécute pas la logique d'overlay en-dessous
  }

  // ===== CSS injecté =====
  const css = `
  :root { --booking-bar-h: 56px; }

  #booking_overlay {
    position: fixed; inset: 0;
    width: 100vw; height: 100vh;
    z-index: 9999; background: #0c0c0f;
    display: none; opacity: 0;
    pointer-events: none;
    overscroll-behavior: contain; /* bloque la propagation du scroll vers le body */
    touch-action: pan-y; /* améliore le geste de scroll vertical mobile */
  }
  #booking_overlay.is-open {
    display: block;
    pointer-events: auto; /* bloque bien les clics derrière */
  }
  #booking_overlay.is-visible {
    opacity: 1;
    transition: opacity 220ms ease;
  }

  .booking-bar {
    position: absolute; top: 0; left: 0; right: 0;
    display: flex; align-items: center; gap: 12px;
    padding: 10px 16px; background: #111; color: #fff;
    border-bottom: 1px solid rgba(255,255,255,.12);
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    z-index: 2; /* superpose le bandeau au-dessus du panel */
  }
  .booking-bar__btn {
    background: #ffc31f; color: #000; font-weight: 700;
    border: 0; border-radius: 13px; padding: 10px 16px; cursor: pointer;
  }
  .booking-bar__title { font-weight: 700; opacity: .9; }

  .booking-panel {
    position: absolute; left: 0; right: 0;
    top: 0;
    height: 100%;
    transform: scale(.985); opacity: 0;
    overflow-y: auto; /* permet de scroller le contenu (iframe) */
    -webkit-overflow-scrolling: touch; /* inertie iOS */
    touch-action: pan-y;
    z-index: 1;
  }
  .booking-panel.is-in {
    transform: scale(1); opacity: 1;
    transition: transform 320ms cubic-bezier(.2,.7,0,1), opacity 260ms ease;
  }

  #booking_iframe {
    position: absolute; inset: 0; width: 100%; height: 100%;
    border: 0; background: #fff;
    /* s'assure que l'iframe capte bien les interactions */
    pointer-events: auto;
  }

  @media (max-width: 767px) {
    .booking-bar { flex-direction: column; align-items: stretch; gap: 8px; padding: 12px; }
    .booking-bar__btn { width: 100%; }
    .booking-bar__title { text-align: center; }
  }

  @media (prefers-reduced-motion: reduce) {
    #booking_overlay.is-visible { transition: none; }
    .booking-panel.is-in { transition: none; }
  }`;
  const styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  // Charger le script Apex ax.iframe.js une seule fois par page
  const APEX_AX_SCRIPT = 'https://www.apex-timing.com/gokarts/javascript/ax.iframe.js';
  (function ensureApexIframeScript(){
    try {
      if (!document.querySelector('script[src*="apex-timing.com/gokarts/javascript/ax.iframe.js"]')) {
        const s = document.createElement('script');
        s.src = APEX_AX_SCRIPT;
        s.async = true;
        document.head.appendChild(s);
      }
    } catch (_) {}
  })();

  // ===== DOM overlay =====
  const overlay = document.createElement('div');
  overlay.id = 'booking_overlay';

  const bar = document.createElement('div');
  bar.className = 'booking-bar';

  const backBtn = document.createElement('button');
  backBtn.className = 'booking-bar__btn';
  backBtn.textContent = '← Changer de centre';

  const titleEl = document.createElement('div');
  titleEl.className = 'booking-bar__title';
  titleEl.textContent = 'Réservation';

  bar.appendChild(backBtn);
  bar.appendChild(titleEl);

  const panel = document.createElement('div');
  panel.className = 'booking-panel';

  const iframe = document.createElement('iframe');
  iframe.id = 'booking_iframe';
  iframe.title = 'Réservation';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.classList.add('axiframe');
  iframe.setAttribute('scrolling', 'yes');

  panel.appendChild(iframe);
  overlay.appendChild(bar);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // ===== Helpers =====
  let __scrollLockY = 0;
  function lockBodyScroll() {
    try {
      __scrollLockY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${__scrollLockY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      // On évite de mettre overflow:hidden sur html/body qui casse le scroll des iframes sur certains navigateurs
    } catch (_) {}
  }

  function unlockBodyScroll() {
    try {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, __scrollLockY || 0);
    } catch (_) {}
  }

  function updateBarHeightVar() {
    const h = Math.ceil(bar.getBoundingClientRect().height || 56);
    overlay.style.setProperty('--booking-bar-h', h + 'px');
  }

  function showOverlayAnimated() {
    overlay.classList.add('is-open');
    updateBarHeightVar();
    if (NO_MOTION) {
      overlay.classList.add('is-visible');
      panel.classList.add('is-in');
    } else {
      requestAnimationFrame(() => {
        overlay.classList.add('is-visible');
        requestAnimationFrame(() => panel.classList.add('is-in'));
      });
    }
    lockBodyScroll();
  }

  function hideOverlayAnimated() {
    panel.classList.remove('is-in');
    overlay.classList.remove('is-visible');
    const finish = () => {
      overlay.classList.remove('is-open'); // cache → display:none & pointer-events:none
      overlay.removeEventListener('transitionend', onEnd);
    };
    const onEnd = (e) => {
      if (e.target === overlay && e.propertyName === 'opacity') finish();
    };
    if (NO_MOTION) {
      finish();
    } else {
      overlay.addEventListener('transitionend', onEnd);
      setTimeout(finish, 350); // fallback sécurité
    }
    unlockBodyScroll();
  }

  // ===== Events =====
  backBtn.addEventListener('click', hideOverlayAnimated);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) hideOverlayAnimated();
  });

  // Clic sur un centre
  document.addEventListener('click', (e) => {
    const item = e.target.closest(ITEM_SELECTOR);
    if (!item) return;
    const apexId = item.getAttribute('data-apex-id');
    const centreName =
      item.getAttribute('data-centre-name') ||
      (item.querySelector('.h6, h3, .centre_card_title')?.textContent || '').trim();
    if (!/^\d{3}$/.test(apexId)) return;
    const url = APEX_BASE + apexId;
    // Ouvre dans un nouvel onglet et n'utilise plus l'iframe
    window.open(url, '_blank', 'noopener');
  });

  // Mise à jour hauteur du bandeau si resize
  const ro = new ResizeObserver(updateBarHeightVar);
  ro.observe(bar);
  window.addEventListener('resize', updateBarHeightVar);

  // Ouverture auto via paramètre d'URL ?parc=XXX (peut être bloqué par pop-up blockers)
  try {
    const params = new URLSearchParams(window.location.search);
    const parkId = params.get('parc');
    if (parkId && /^\d{3}$/.test(parkId)) {
      const url = APEX_BASE + parkId;
      window.open(url, '_blank', 'noopener');
    }
  } catch (_) {}
})();
