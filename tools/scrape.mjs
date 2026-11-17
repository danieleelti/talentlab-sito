// scrape.mjs — rende con Chromium tutte le pagine interne di talentlabconsulting.it (sito Aruba SuperSite,
// contenuto caricato via JS) e salva per ognuna: HTML renderizzato, testo, JSON (link, immagini, sfondi,
// colori, font, titoli, form), screenshot desktop a pagina intera. Più uno screenshot da telefono della home.
// Uso: node tools/scrape.mjs <cartella-uscita>
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright') // npm install (package.json) + npx playwright install --with-deps chromium;

const OUT = path.resolve(process.argv[2] || 'scrape');
const START = 'https://talentlabconsulting.it/';
const HOST = new URL(START).host;
const MAX_PAGES = 30;
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });

const norm = (u) => {
  const x = new URL(u);
  x.hash = '';
  x.search = '';
  let s = x.href;
  if (s.endsWith('/') && x.pathname !== '/') s = s.slice(0, -1);
  return s;
};
const slugOf = (u) => {
  const p = new URL(u).pathname.replace(/^\/|\/$/g, '');
  return p ? p.replace(/[^a-z0-9]+/gi, '-').toLowerCase() : 'home';
};

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA, locale: 'it-IT' });
const page = await ctx.newPage();

async function settle() {
  await page.evaluate(async () => {
    const h = () => document.documentElement.scrollHeight;
    for (let y = 0; y < h(); y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

function extract() {
  const abs = (u) => { try { return new URL(u, location.href).href; } catch { return null; } };
  const count = (o, k) => { o[k] = (o[k] || 0) + 1; };
  const links = [...document.querySelectorAll('a[href]')].map((a) => ({
    href: abs(a.getAttribute('href')), text: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 120),
  }));
  const imgs = [...document.images].map((i) => ({
    src: i.currentSrc || i.src, alt: i.alt, natural: [i.naturalWidth, i.naturalHeight], shown: [i.width, i.height],
  }));
  const bgs = [];
  const colors = {}, bgColors = {}, fonts = {};
  document.querySelectorAll('body *').forEach((el) => {
    const cs = getComputedStyle(el);
    const b = cs.backgroundImage;
    if (b && b !== 'none' && b.includes('url(')) {
      const m = b.match(/url\(["']?([^"')]+)["']?\)/);
      if (m) bgs.push({ src: abs(m[1]), tag: el.tagName, w: el.offsetWidth, h: el.offsetHeight });
    }
    if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && el.offsetWidth > 50 && el.offsetHeight > 20)
      count(bgColors, cs.backgroundColor);
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (ownText) {
      count(colors, cs.color);
      count(fonts, `${cs.fontFamily.split(',')[0].replace(/"/g, '')} ${cs.fontWeight} ${cs.fontSize}`);
    }
  });
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({ tag: h.tagName, text: h.innerText.trim() }));
  const iframes = [...document.querySelectorAll('iframe')].map((f) => f.src);
  const videos = [...document.querySelectorAll('video, video source')].map((v) => v.src || v.currentSrc);
  const forms = [...document.querySelectorAll('form')].map((f) => ({
    action: f.action, method: f.method,
    fields: [...f.elements].map((e) => ({ tag: e.tagName, name: e.name, type: e.type, placeholder: e.placeholder, label: e.labels?.[0]?.innerText })),
  }));
  const metas = [...document.querySelectorAll('meta')].map((m) => ({ n: m.name || m.getAttribute('property'), c: m.content })).filter((m) => m.n);
  return {
    url: location.href, title: document.title, metas, height: document.documentElement.scrollHeight,
    text: document.body.innerText, headings, links, imgs, bgs, colors, bgColors, fonts, iframes, videos, forms,
  };
}

const seen = new Set();
const queue = [norm(START)];
const index = [];
while (queue.length && index.length < MAX_PAGES) {
  const url = queue.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await settle();
    const data = await page.evaluate(extract);
    const slug = slugOf(url);
    fs.writeFileSync(path.join(OUT, `${slug}.html`), await page.content());
    fs.writeFileSync(path.join(OUT, `${slug}.txt`), data.text);
    fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(data, null, 1));
    await page.screenshot({ path: path.join(OUT, 'shots', `${slug}-desktop.png`), fullPage: true });
    index.push({ url, slug, status: resp?.status(), title: data.title, height: data.height, chars: data.text.length });
    for (const l of data.links) {
      if (!l.href) continue;
      let u;
      try { u = new URL(l.href); } catch { continue; }
      if (u.host !== HOST || !/^https?:$/.test(u.protocol)) continue;
      if (/\.(pdf|jpe?g|png|gif|webp|svg|zip|docx?)$/i.test(u.pathname)) continue;
      const n = norm(u.href);
      if (!seen.has(n) && !queue.includes(n)) queue.push(n);
    }
    console.log('ok', resp?.status(), url, data.text.length, 'car.');
  } catch (e) {
    console.log('ERR', url, e.message.split('\n')[0]);
    index.push({ url, error: e.message.split('\n')[0] });
  }
}
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 1));

// Home da telefono (il sito originale dichiara viewport=1024: su telefono si vede rimpicciolito)
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'it-IT',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
});
const mp = await mctx.newPage();
await mp.goto(START, { waitUntil: 'networkidle', timeout: 60000 });
await mp.waitForTimeout(1500);
await mp.screenshot({ path: path.join(OUT, 'shots', 'home-mobile-first.png') });
await browser.close();
console.log('pagine:', index.length);
