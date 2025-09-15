
(function () {
  // N'activer ce module que sur la page Réservation
  if (!window.location.pathname.includes('/reservation')) return;
  const APEX_BASE = 'https://www.apex-timing.com/gokarts/sessions_booking.php?center=';
  const ITEM_SELECTOR = '[data-attribute="parc-item"]';
  const NO_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== CSS injecté =====
  const css = `
  :root { --booking-bar-h: 56px; }

  #booking_overlay {
    position: fixed; inset: 0;
    width: 100vw; height: 100vh;
    z-index: 9999; background: #0c0c0f;
    display: none; opacity: 0;
    pointer-events: none;
    overscroll-behavior: none; /* évite la propagation du scroll au body */
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
  }
  .booking-bar__btn {
    background: #ffc31f; color: #000; font-weight: 700;
    border: 0; border-radius: 13px; padding: 10px 16px; cursor: pointer;
  }
  .booking-bar__title { font-weight: 700; opacity: .9; }

  .booking-panel {
    position: absolute; left: 0; right: 0;
    top: var(--booking-bar-h);
    height: calc(100% - var(--booking-bar-h));
    transform: scale(.985); opacity: 0;
  }
  .booking-panel.is-in {
    /* Utiliser none comme état final pour éviter un parent transformé qui peut bloquer le scroll dans certains navigateurs Android */
    transform: none; opacity: 1;
    transition: transform 320ms cubic-bezier(.2,.7,0,1), opacity 260ms ease;
  }

  #booking_iframe {
    position: absolute; inset: 0; width: 100%; height: 100%;
    border: 0; background: #fff;
    /* Améliore la gestion des gestes de défilement sur Android/Samsung Internet */
    touch-action: pan-y;
    -ms-touch-action: pan-y;
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
  iframe.setAttribute('scrolling', 'yes');

  panel.appendChild(iframe);
  overlay.appendChild(bar);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // ===== Helpers =====
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
    iframe.src = APEX_BASE + apexId;
    titleEl.textContent = centreName ? `Réservation · ${centreName}` : 'Réservation';
    showOverlayAnimated();
  });

  // Mise à jour hauteur du bandeau si resize
  const ro = new ResizeObserver(updateBarHeightVar);
  ro.observe(bar);
  window.addEventListener('resize', updateBarHeightVar);

  // Ouverture auto via paramètre d'URL ?parc=XXX
  try {
    const params = new URLSearchParams(window.location.search);
    const parkId = params.get('parc');
    if (parkId && /^\d{3}$/.test(parkId)) {
      iframe.src = APEX_BASE + parkId;
      titleEl.textContent = 'Réservation';
      showOverlayAnimated();
    }
  } catch (_) {}
})();
