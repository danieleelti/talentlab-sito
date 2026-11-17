/* Talent Lab OS — demo «Bussola d'oro» (design.md §6).
   Vanilla JS + GSAP 3.15 (ScrollTrigger, SplitText) + Lenis 1.3. Senza GSAP o con «riduci movimento» il sito resta
   completo e fermo: qui sotto prima le funzioni che servono sempre, poi il movimento. */
(() => {
  'use strict';
  const d = document;
  const html = d.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const anim = html.classList.contains('anim') && !reduce && !!window.gsap && !!window.ScrollTrigger;
  // Versione B «Verde acido» (docs/design-B-verde-acido.md, /riccardo2/): stesso JS, cambiano i dettagli di colore:
  // niente polvere d'oro, evidenziatore che si disegna sotto le parole chiave, testata che cambia tono, barra verde.
  const B = html.dataset.tema === 'b';
  html.classList.add('anim-ready');

  const $ = (s, r = d) => r.querySelector(s);
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const live = (msg) => { const l = $('#live'); if (l) { l.textContent = ''; setTimeout(() => { l.textContent = msg; }, 30); } };

  /* ================= Sempre attivi ================= */

  // Testata: vetro scuro dopo l'eroe, si nasconde scorrendo in giù e torna scorrendo in su
  (function header() {
    const h = $('.site-header');
    if (!h) return;
    let lastY = scrollY;
    let ticking = false;
    // B: tono della testata = luminosità del fondo del capitolo che ha sotto (vetro chiaro sul bianco e sul verde,
    // scuro sul nero). Si sale dall'elemento sotto la testata fino al primo fondo pieno.
    const tone = () => {
      const y = Math.round(h.offsetHeight / 2);
      for (const el of d.elementsFromPoint(innerWidth / 2, y)) {
        if (el.closest('.site-header, .progress, .dock, .menu, .skip')) continue;
        for (let n = el; n && n !== html; n = n.parentElement) {
          const c = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
          if (!c || (c.length > 3 && Number(c[3]) < 0.5)) continue;
          const [r, g, b] = c.map(Number);
          return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.5 ? 'light' : 'dark';
        }
        break;
      }
      return 'dark';
    };
    const update = () => {
      const y = scrollY;
      h.classList.toggle('is-solid', y > 24);
      if (B) { const t = tone(); if (h.dataset.tone !== t) h.dataset.tone = t; }
      if (!html.classList.contains('menu-open')) {
        if (y > lastY + 4 && y > 180) {
          if (!h.classList.contains('is-hidden')) d.dispatchEvent(new CustomEvent('nav:close')); // la testata sparisce: chiude le tendine
          h.classList.add('is-hidden');
        } else if (y < lastY - 4 || y <= 180) h.classList.remove('is-hidden');
      }
      html.classList.toggle('header-hidden', h.classList.contains('is-hidden'));
      lastY = y;
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    if (B) addEventListener('resize', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  })();

  // Menu del telefono: cerchio che si apre dal bottone, focus intrappolato, Esc per chiudere
  (function menu() {
    const m = $('#menu');
    const openBtn = $('.menu-btn');
    const closeBtn = $('.menu__close');
    if (!m || !openBtn || !closeBtn) return;
    let lastFocus = null;
    const open = () => {
      const r = openBtn.getBoundingClientRect();
      m.style.setProperty('--ox', `${r.left + r.width / 2}px`);
      m.style.setProperty('--oy', `${r.top + r.height / 2}px`);
      lastFocus = d.activeElement;
      m.removeAttribute('inert');
      m.setAttribute('aria-hidden', 'false');
      html.classList.add('menu-open');
      openBtn.setAttribute('aria-expanded', 'true');
      window.__lenis?.stop();
      setTimeout(() => closeBtn.focus({ preventScroll: true }), 80);
      d.dispatchEvent(new CustomEvent('menu:open'));
    };
    const close = () => {
      if (!html.classList.contains('menu-open')) return;
      html.classList.remove('menu-open');
      openBtn.setAttribute('aria-expanded', 'false');
      m.setAttribute('aria-hidden', 'true');
      m.setAttribute('inert', '');
      window.__lenis?.start();
      lastFocus?.focus?.({ preventScroll: true });
    };
    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    m.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a && a.hash && a.pathname === location.pathname) close(); // ancora nella stessa pagina
    });
    d.addEventListener('keydown', (e) => {
      if (!html.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const f = $$('a[href], button', m);
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    matchMedia('(min-width: 1280px)').addEventListener('change', (e) => { if (e.matches) close(); });
    addEventListener('pageshow', () => close());
  })();

  // Navigazione da computer (≥ 1280 px): i gruppi del menu del sito a tendina. Si aprono con clic, tastiera
  // (Invio/Spazio, freccia giù) e passaggio del mouse; si chiudono con Esc, clic fuori, Tab che esce dal gruppo.
  (function dropdowns() {
    const nav = $('.nav');
    if (!nav) return;
    const items = $$('.nav__item', nav).filter((it) => $('.nav__toggle', it) && $('.nav__panel', it));
    if (!items.length) return;
    const btn = (it) => $('.nav__toggle', it);
    const links = (it) => $$('.nav__panel a', it);
    const isOpen = (it) => it.classList.contains('is-open');
    const timers = new Map();
    const later = (it, fn, ms) => { clearTimeout(timers.get(it)); timers.set(it, setTimeout(fn, ms)); };
    const close = (it, refocus = false) => {
      clearTimeout(timers.get(it));
      if (!isOpen(it)) return;
      it.classList.remove('is-open');
      btn(it).setAttribute('aria-expanded', 'false');
      if (refocus) btn(it).focus();
    };
    const closeAll = (except) => items.forEach((it) => { if (it !== except) close(it); });
    // how: 'hover' (si richiude quando il mouse esce) oppure 'click'/'key' (resta aperta fino a Esc o clic fuori)
    const open = (it, how) => {
      clearTimeout(timers.get(it));
      closeAll(it);
      if (!isOpen(it)) {
        it.classList.add('is-open');
        btn(it).setAttribute('aria-expanded', 'true');
        it.byHover = how === 'hover';
      } else if (how !== 'hover') it.byHover = false; // aperta col mouse e poi cliccata: resta aperta
    };
    items.forEach((it) => {
      const b = btn(it);
      b.addEventListener('click', () => { if (isOpen(it) && !it.byHover) close(it); else open(it, 'click'); });
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); open(it, 'key'); links(it)[0]?.focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); open(it, 'key'); links(it).at(-1)?.focus(); }
      });
      $('.nav__panel', it).addEventListener('keydown', (e) => {
        const l = links(it);
        const i = l.indexOf(d.activeElement);
        let to = null;
        if (e.key === 'ArrowDown') to = l[(i + 1) % l.length];
        else if (e.key === 'ArrowUp') to = l[(i - 1 + l.length) % l.length];
        else if (e.key === 'Home') to = l[0];
        else if (e.key === 'End') to = l[l.length - 1];
        if (to) { e.preventDefault(); to.focus(); }
      });
      it.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') later(it, () => open(it, 'hover'), 70); });
      it.addEventListener('pointerleave', (e) => {
        if (e.pointerType !== 'mouse') return;
        if (isOpen(it) && it.byHover) later(it, () => close(it), 260);
        else clearTimeout(timers.get(it));
      });
      it.addEventListener('focusout', (e) => { if (e.relatedTarget && !it.contains(e.relatedTarget)) close(it); });
    });
    d.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const it = items.find(isOpen);
      if (it) close(it, it.contains(d.activeElement));
    });
    d.addEventListener('pointerdown', (e) => { if (!nav.contains(e.target)) closeAll(); });
    d.addEventListener('nav:close', () => closeAll());
    matchMedia('(min-width: 1280px)').addEventListener('change', () => closeAll());
    addEventListener('pageshow', () => closeAll());
  })();

  // Pillola contatti del telefono: compare dopo l'eroe, sparisce sul footer
  (function dock() {
    const k = $('.dock');
    const hero = $('[data-hero]');
    const foot = $('.site-footer');
    if (!k || !hero || !foot) return;
    let heroIn = true;
    let footIn = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroIn = e.isIntersecting;
        if (e.target === foot) footIn = e.isIntersecting;
      }
      k.classList.toggle('is-visible', !heroIn && !footIn);
    }, { rootMargin: '-55% 0px 0px 0px' });
    io.observe(hero);
    io.observe(foot);
  })();

  // Copia negli appunti con conferma
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const text = b.dataset.copy;
    try { await navigator.clipboard.writeText(text); }
    catch {
      const t = d.createElement('textarea');
      t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      d.body.append(t); t.select(); d.execCommand('copy'); t.remove();
    }
    const label = $('[data-copy-label]', b) || b;
    const old = label.textContent;
    label.textContent = 'Copiato';
    b.classList.add('is-done');
    live('Copiato negli appunti');
    setTimeout(() => { label.textContent = old; b.classList.remove('is-done'); }, 2200);
  }));

  // Modulo contatti: valida in linea, poi compone la mail (la demo non ha backend)
  (function form() {
    const f = $('[data-form]');
    if (!f) return;
    const rules = {
      nome: (v) => v.trim().length >= 2 || 'Scrivi il tuo nome.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Controlla l'indirizzo e-mail.",
      messaggio: (v) => v.trim().length >= 10 || 'Scrivi qualche parola in più (almeno 10 caratteri).',
      privacy: (_, el) => el.checked || 'Serve il consenso per poterti ricontattare.',
    };
    const check = (el) => {
      const rule = rules[el.name];
      if (!rule) return true;
      const res = rule(el.value, el);
      const ok = res === true;
      const box = el.closest('.field, .check-wrap');
      box.classList.toggle('is-invalid', !ok);
      el.setAttribute('aria-invalid', String(!ok));
      const msg = $('.field__error span', box);
      if (msg) msg.textContent = ok ? '' : res;
      return ok;
    };
    f.addEventListener('focusout', (e) => { if (e.target.name in rules && (e.target.value || e.target.type === 'checkbox')) check(e.target); });
    f.addEventListener('input', (e) => { if (e.target.closest('.is-invalid')) check(e.target); });
    f.addEventListener('change', (e) => { if (e.target.type === 'checkbox') check(e.target); });
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const bad = [...f.elements].filter((el) => el.name in rules).filter((el) => !check(el));
      if (bad.length) { bad[0].focus(); live('Ci sono campi da correggere'); return; }
      const v = Object.fromEntries(new FormData(f));
      const subject = 'Richiesta informazioni dal sito';
      const body = `Nome: ${v.nome.trim()}\nE-mail: ${v.email.trim()}\n\n${v.messaggio.trim()}\n`;
      const href = `mailto:info@talentlabconsulting.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const ok = $('.form__ok', f);
      $('[data-ok-mailto]', ok).href = href;
      $('[data-copy]', ok).dataset.copy = `A: info@talentlabconsulting.it\nOggetto: ${subject}\n\n${body}`;
      ok.classList.add('is-visible');
      ok.focus({ preventScroll: true });
      live('Stiamo aprendo la tua app di posta');
      location.href = href;
    });
  })();

  $$('[data-year]').forEach((e) => { e.textContent = String(new Date().getFullYear()); });

  if (!anim) { html.classList.remove('anim'); return; }

  /* ================= Movimento ================= */
  const { gsap, ScrollTrigger, SplitText } = window;
  gsap.registerPlugin(ScrollTrigger);
  if (SplitText) gsap.registerPlugin(SplitText);
  gsap.defaults({ ease: 'expo.out' });

  // Rotella morbida su computer, tocco nativo sul telefono
  if (window.Lenis) {
    const lenis = new window.Lenis({ lerp: 0.12, anchors: { offset: -90 }, autoRaf: false });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Bussole: ago con fisica a molla ---------- */
  const compasses = [];
  const makeCompass = (svg, o = {}) => {
    const c = { needle: $('.c-needle', svg), a: o.a ?? 0, v: 0, target: o.target ?? 0, k: o.k ?? 80, damp: o.damp ?? 10, on: true, last: null };
    if (!c.needle) return c;
    compasses.push(c);
    new IntersectionObserver(([e]) => { c.on = e.isIntersecting; }).observe(svg);
    return c;
  };
  const nearestNorth = (a) => Math.round(a / 360) * 360;
  gsap.ticker.add((time, dtms) => {
    const dt = Math.min(dtms, 40) / 1000;
    for (const c of compasses) {
      if (!c.on) continue;
      const acc = -c.k * (c.a - c.target) - c.damp * c.v;
      c.v = clamp(c.v + acc * dt, -900, 900);
      c.a += c.v * dt;
      if (Math.abs(c.v) < 0.01 && Math.abs(c.a - c.target) < 0.01) { c.a = c.target; c.v = 0; }
      if (c.a !== c.last) { c.needle.setAttribute('transform', `rotate(${c.a.toFixed(2)})`); c.last = c.a; }
    }
  });

  const drawCompass = (svg, delay = 0) => {
    const tl = gsap.timeline({ delay });
    tl.to($$('.c-ring', svg), { strokeDashoffset: 0, duration: 1.6, ease: 'power3.inOut', stagger: 0.15 }, 0)
      .fromTo($('.c-ticks', svg), { opacity: 0, rotation: -50, svgOrigin: '0 0' }, { opacity: 1, rotation: 0, duration: 1.6, ease: 'expo.out' }, 0.2)
      .fromTo($('.c-rose', svg), { opacity: 0, scale: 0.4, svgOrigin: '0 0' }, { opacity: 1, scale: 1, duration: 1.3, ease: 'expo.out' }, 0.45)
      .to($('.c-letters', svg), { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.8);
    return tl;
  };

  /* ---------- Testi: righe a maschera, parole che si accendono ---------- */
  // B: l'evidenziatore (o il riquadro nero sul verde) sotto la parola chiave si disegna da sinistra (design-B §6.2).
  // Con lo stile «slice» del fondo, su più righe si disegna una riga dopo l'altra.
  const mark = (el) => {
    if (!B) return;
    const ems = $$('em', el);
    if (ems.length) gsap.fromTo(ems, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', duration: 0.6, ease: 'expo.out', stagger: 0.12 });
  };
  const splitIn = (el, vars = {}) => {
    if (!SplitText) { gsap.set(el, { visibility: 'visible' }); mark(el); return gsap.timeline(); }
    const h = el.offsetHeight;
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' });
    gsap.set(el, { visibility: 'visible' });
    // Spezzato in righe il titolo deve andare a capo come il testo normale (con text-wrap: balance a volte una
    // parola scivola sulla riga dopo): se ha una riga in più, niente maschere, sale intero e alla fine non salta.
    if (el.offsetHeight - h > (parseFloat(getComputedStyle(el).lineHeight) || 40) / 2) {
      split.revert();
      return gsap.from(el, { y: 36, opacity: 0, duration: 1.1, ease: 'expo.out', onComplete() { mark(el); } });
    }
    return gsap.from(split.lines, {
      yPercent: 115, duration: 1.1, stagger: 0.1, ease: 'expo.out', ...vars,
      onComplete() { split.revert(); mark(el); }, // torna testo normale: si riadatta a ogni larghezza
    });
  };

  const start = () => {
    /* ---------- Eroe ---------- */
    const hero = $('[data-hero]');
    if (hero) {
      const img = $('.hero__media img', hero);
      const tl = gsap.timeline();
      if (img) tl.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 2.6, ease: 'power2.out' }, 0);
      const veil = $('.hero__veil', hero);
      if (veil) tl.fromTo(veil, { opacity: 0.5 }, { opacity: 1, duration: 1.8, ease: 'power2.out' }, 0);
      tl.call(() => $('.brand')?.classList.add('is-shining'), null, 0.15);
      const h1 = $('[data-split]', hero);
      if (h1) tl.add(splitIn(h1, { stagger: 0.12 }), 0.3);
      tl.to($$('[data-hero-item]', hero), { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'expo.out' }, 0.62);

      // Parallasse in uscita (eroe diviso: si muove la foto dentro la sua colonna)
      const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
      if (hero.classList.contains('hero--split')) {
        const pic = $('.hero__media picture', hero);
        if (pic) gsap.to(pic, { yPercent: 8, ease: 'none', scrollTrigger: st });
      } else {
        gsap.to($('.hero__media', hero), { yPercent: 14, ease: 'none', scrollTrigger: st });
      }
      const shade = $('.hero__shade', hero);
      if (shade) gsap.to(shade, { opacity: 0.6, ease: 'none', scrollTrigger: { ...st } });
      gsap.to($('.hero__inner', hero), { y: -60, ease: 'none', scrollTrigger: { ...st } });

      // Bussola dell'eroe: si disegna, oscilla, poi segue il puntatore (computer) o lo scroll (telefono)
      const hsvg = $('.hero__compass svg', hero);
      if (hsvg) {
        drawCompass(hsvg, 0.55);
        const hc = makeCompass(hsvg, { a: -160, target: 0, k: 70, damp: 7 });
        gsap.delayedCall(0.7, () => { hc.target = 0; });
        if (fine) {
          let idle;
          addEventListener('pointermove', (e) => {
            const r = hsvg.getBoundingClientRect();
            if (r.bottom < 0) return;
            const ang = Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
            let delta = ((ang - hc.target) % 360 + 540) % 360 - 180; // via più breve
            hc.target += delta;
            clearTimeout(idle);
            idle = setTimeout(() => { hc.target = nearestNorth(hc.a); }, 2600);
          }, { passive: true });
        }
        ScrollTrigger.create({
          trigger: hero, start: 'top top', end: 'bottom top',
          onUpdate: (self) => { hc.v += clamp(self.getVelocity() * (fine ? 0.004 : 0.008), -40, 40); },
        });
      }

      // Polvere d'oro (solo versione A: in B al suo posto c'è l'evidenziatore)
      const cv = $('[data-dust]', hero);
      if (cv && !B) dust(cv);
    }

    /* ---------- Titoli a maschera ---------- */
    $$('[data-split]').filter((el) => !el.closest('[data-hero]')).forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => splitIn(el) });
    });

    /* ---------- Comparse ---------- */
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 90%', once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.09, ease: 'expo.out', overwrite: true }),
    });

    /* ---------- Foto con tendina e parallasse interna ---------- */
    $$('[data-clip]').forEach((fr) => {
      const img = $('img', fr);
      ScrollTrigger.create({
        trigger: fr, start: 'top 86%', once: true,
        onEnter: () => {
          gsap.to(fr, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' });
          if (img) gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.9, ease: 'expo.out' });
        },
      });
      const pic = $('picture', fr);
      if (pic) gsap.fromTo(pic, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: fr, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* ---------- Filetti oro che si disegnano ---------- */
    $$('.statement__line').forEach((l) => {
      gsap.to(l, { scaleX: 1, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 85%', once: true } });
    });

    /* ---------- Parallasse delle foto di sfondo (chiamata finale e bande con frase) ---------- */
    $$('.cta, .band').forEach((s) => {
      const m = $('.cta__media, .band__media', s);
      if (m) gsap.fromTo(m, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    const mm = gsap.matchMedia();

    /* ---------- Pannelli impilati (Home) ---------- */
    mm.add('(min-height: 680px)', () => {
      const items = $$('.stack__item');
      items.forEach((item, i) => {
        const next = items[i + 1];
        if (!next) return;
        gsap.timeline({
          scrollTrigger: {
            trigger: next, start: 'top bottom', end: () => `top ${parseFloat(getComputedStyle(next).top) || 100}px`,
            scrub: true, invalidateOnRefresh: true,
          },
        }).to($('.panel', item), { scale: 0.93, ease: 'none' }, 0)
          .to($('.panel__shade', item), { opacity: 0.6, ease: 'none' }, 0);
      });
    });

    /* ---------- Frasi che si accendono ---------- */
    $$('[data-lightup]').forEach((sec) => {
      const q = $('[data-words]', sec);
      if (!q || !SplitText) return;
      const split = SplitText.create(q, { type: 'words', wordsClass: 'w' });
      const n = split.words.length;
      const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
      tl.to(split.words, { opacity: 1, ease: 'none', duration: 1, stagger: 0.55 }, 0);
      const span = 1 + (n - 1) * 0.55;
      tl.to($('.lightup__veil', sec), { opacity: 0.5, ease: 'none', duration: span }, 0)
        .to($('.lightup__glow', sec), { opacity: 1, ease: 'none', duration: span }, 0)
        .fromTo($('.lightup__media img', sec), { scale: 1.08 }, { scale: 1, ease: 'none', duration: span }, 0);
      if (B) tl.fromTo(q, { '--bar': 0 }, { '--bar': 1, ease: 'none', duration: span }, 0); // B: la barra verde si allunga
      tl.to({}, { duration: span * 0.25 }); // pausa con tutta la frase accesa
    });
    $$('[data-words]:not([data-lightup] [data-words])').forEach((q) => {
      if (!SplitText) { mark(q); return; }
      const split = SplitText.create(q, { type: 'words', wordsClass: 'w' });
      const tl = gsap.timeline({ scrollTrigger: { trigger: q, start: 'top 82%', end: 'bottom 48%', scrub: 0.6 } });
      tl.to(split.words, { opacity: 1, ease: 'none', stagger: 0.5 });
      const ems = B ? $$('em', q) : [];
      if (ems.length) tl.fromTo(ems, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', ease: 'none', duration: 1.5 }); // B: evidenziatore alla fine
    });

    /* ---------- Modelli a passi: linea oro che si disegna, punti che si accendono ---------- */
    mm.add({ wide: '(min-width: 900px)', narrow: '(max-width: 899px)' }, (ctx) => {
      const { wide } = ctx.conditions;
      $$('[data-track]').forEach((tr) => {
        const fill = $('.track__fill', tr);
        const steps = $$('.track__step', tr);
        gsap.fromTo(fill, { [wide ? 'scaleX' : 'scaleY']: 0 }, {
          [wide ? 'scaleX' : 'scaleY']: 1, ease: 'none',
          scrollTrigger: {
            trigger: tr, start: wide ? 'top 78%' : 'top 70%', end: wide ? 'top 30%' : 'bottom 60%', scrub: 0.5,
            onUpdate: (self) => steps.forEach((s, i) => s.classList.toggle('is-on', self.progress >= (i / Math.max(1, steps.length - 1)) * 0.97)),
          },
        });
      });
    });

    /* ---------- Quadrante del processo (Executive Search) ---------- */
    const proc = $('[data-process]');
    if (proc) {
      proc.classList.add('js-process');
      const dsvg = $('.process__dial svg', proc);
      drawCompass(dsvg, 0);
      const dc = makeCompass(dsvg, { a: -90, target: 0, k: 60, damp: 11 });
      const steps = $$('.step', proc);
      const marks = $$('.d-mark', proc);
      const num = $('[data-now-num]', proc);
      const name = $('[data-now-name]', proc);
      let cur = -1;
      const set = (i) => {
        if (i === cur) return;
        cur = i;
        dc.target = i * 72;
        steps.forEach((s, j) => s.classList.toggle('is-active', j === i));
        marks.forEach((mk, j) => { mk.classList.toggle('is-active', j === i); mk.classList.toggle('is-done', j < i); });
        num.textContent = String(i + 1).padStart(2, '0');
        name.textContent = steps[i].dataset.name;
      };
      steps.forEach((s, i) => ScrollTrigger.create({ trigger: s, start: 'top 58%', end: 'bottom 58%', onToggle: (self) => { if (self.isActive) set(i); } }));
      ScrollTrigger.create({
        trigger: $('.steps', proc), start: 'bottom 58%',
        onEnter: () => { // il ciclo si chiude: l'ago torna a Nord
          dc.target = 360;
          marks.forEach((mk) => { mk.classList.remove('is-active'); mk.classList.add('is-done'); });
        },
        onLeaveBack: () => { cur = -1; set(steps.length - 1); },
      });
      set(0);
    }

    /* ---------- Bussole di chiusura e del menu ---------- */
    $$('[data-compass="final"]').forEach((w) => {
      const svg = $('svg', w);
      const c = makeCompass(svg, { a: 0, target: 0, k: 38, damp: 6.5 });
      ScrollTrigger.create({ trigger: w.closest('section') || w, start: 'top 72%', once: true, onEnter: () => { c.a = -250; c.v = 0; c.target = 0; } });
    });
    const msvg = $('.menu__compass svg');
    if (msvg) {
      const c = makeCompass(msvg, { k: 50, damp: 7 });
      d.addEventListener('menu:open', () => { c.a = 140; c.v = 0; c.target = 0; });
    }
    $$('[data-totop]').forEach((a) => {
      const svg = $('svg', a);
      if (!svg) return;
      const c = makeCompass(svg, { k: 120, damp: 6 });
      a.addEventListener('pointerenter', () => { c.v += 320; });
    });

    /* ---------- Sigillo che gira (accelera e inverte con lo scroll) e conteggio degli anni ---------- */
    $$('[data-seal]').forEach((sealEl) => {
      const spin = $('.seal__spin', sealEl);
      if (!spin) return;
      let a = 0;
      let boost = 0;
      let dir = 1;
      let vis = false;
      new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(sealEl);
      ScrollTrigger.create({
        trigger: sealEl, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => { dir = self.direction; boost = Math.min(Math.abs(self.getVelocity()) / 40, 160); },
      });
      gsap.fromTo(sealEl, { scale: 0.6, rotation: -40, opacity: 0 }, {
        scale: 1, rotation: 0, opacity: 1, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: sealEl, start: 'top 92%', once: true },
      });
      gsap.ticker.add((t, dtms) => {
        if (!vis) return;
        boost *= 0.94;
        a += dir * (14 + boost) * Math.min(dtms, 50) / 1000;
        spin.setAttribute('transform', `rotate(${a.toFixed(2)})`);
      });
    });
    $$('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count) || 0;
      const o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, {
        v: end, duration: 1.8, ease: 'power3.out',
        onUpdate: () => { el.textContent = String(Math.round(o.v)); },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    /* ---------- Fasce in movimento: velocità legata allo scroll ---------- */
    $$('[data-marquee]').forEach((m) => {
      const track = $('.marquee__track', m);
      track.innerHTML += track.innerHTML;
      let half = track.scrollWidth / 2;
      let x = 0;
      let dir = -1;
      let boost = 0;
      let vis = false;
      new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(m);
      ScrollTrigger.addEventListener('refresh', () => { half = track.scrollWidth / 2; });
      ScrollTrigger.create({
        trigger: m, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => { dir = self.direction === 1 ? -1 : 1; boost = Math.min(Math.abs(self.getVelocity()) / 350, 7); },
      });
      const setX = gsap.quickSetter(track, 'x', 'px');
      gsap.ticker.add((t, dtms) => {
        if (!vis) return;
        boost *= 0.95;
        x += dir * 42 * (1 + boost) * Math.min(dtms, 50) / 1000;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        setX(x);
      });
    });

    /* ---------- Micro-interazioni (solo puntatore) ---------- */
    if (fine) {
      $$('[data-magnetic]').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
        el.addEventListener('pointermove', (e) => {
          const r = el.getBoundingClientRect();
          xTo(clamp((e.clientX - (r.left + r.width / 2)) * 0.22, -8, 8));
          yTo(clamp((e.clientY - (r.top + r.height / 2)) * 0.3, -6, 6));
        });
        el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
      });
      $$('[data-spotlight]').forEach((el) => el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      }));
    }

    ScrollTrigger.refresh();
  };

  /* ---------- Polvere d'oro su canvas ---------- */
  function dust(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const N = fine ? 70 : 36;
    const sprite = d.createElement('canvas');
    sprite.width = sprite.height = 64;
    const s = sprite.getContext('2d');
    const g = s.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,232,178,1)');
    g.addColorStop(0.22, 'rgba(242,196,112,.6)');
    g.addColorStop(1, 'rgba(242,196,112,0)');
    s.fillStyle = g;
    s.fillRect(0, 0, 64, 64);
    let W = 0;
    let H = 0;
    let on = true;
    let t = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (p, fresh) => Object.assign(p, {
      x: W * Math.pow(Math.random(), 0.55), y: fresh ? Math.random() * H : H + 12,
      r: 3 + Math.random() * 11, vy: -(7 + Math.random() * 20), vx: 3 + Math.random() * 9,
      ph: Math.random() * 6.28, amp: 5 + Math.random() * 12, tw: 0.5 + Math.random() * 1.5, a: 0.2 + Math.random() * 0.6,
    });
    resize();
    const parts = Array.from({ length: N }, () => spawn({}, true));
    addEventListener('resize', resize);
    new IntersectionObserver(([e]) => { on = e.isIntersecting; }).observe(canvas);
    gsap.ticker.add((time, dtms) => {
      if (!on || d.hidden) return;
      const dt = Math.min(dtms, 50) / 1000;
      t += dt;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of parts) {
        p.y += p.vy * dt;
        p.x += (p.vx + Math.sin(t * 0.6 + p.ph) * p.amp * 0.3) * dt;
        if (p.y < -20 || p.x > W + 20) spawn(p, false);
        ctx.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(t * p.tw + p.ph));
        ctx.drawImage(sprite, p.x - p.r / 2, p.y - p.r / 2, p.r, p.r);
      }
      ctx.globalAlpha = 1;
    });
  }

  // Parte quando i font sono pronti (le righe dei titoli si misurano giuste), al massimo dopo 1,2 s
  const go = () => { if (go.done) return; go.done = true; start(); };
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(go);
  setTimeout(go, 1200);
})();
