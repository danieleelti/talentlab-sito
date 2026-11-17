// scrape2.mjs — secondo giro sul sito (17/11/2026): tutte le pagine della sitemap (le voci del menu non sono link <a>,
// quindi il primo giro ne aveva viste solo 4). Per ogni pagina: testo in ORDINE DI LETTURA (blocchi ordinati per
// posizione sulla pagina), HTML renderizzato, JSON (immagini, sfondi, link), screenshot senza banner cookie.
// In più apre il MENU della home e ne salva voci e screenshot.
// Uso: node tools/scrape2.mjs <cartella-uscita>
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright') // npm install (package.json) + npx playwright install --with-deps chromium;

const OUT = path.resolve(process.argv[2] || 'scrape/v2');
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
const BASE = 'https://talentlabconsulting.it/';
const xml = await (await fetch(BASE + 'sitemap.xml')).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log('pagine nella sitemap:', urls.length);

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'it-IT' });
const page = await ctx.newPage();

function readingOrder() {
  const out = [];
  const seen = new Set();
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    if (el.closest('[id*="cookie" i], [class*="cookie" i], .cb-banner, #boxOscuratorePopup, script, style, noscript')) continue;
    const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
    if (!own) continue;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.width === 0 || r.height === 0 || cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const key = `${Math.round(r.top + scrollY)}|${Math.round(r.left)}|${own}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ y: Math.round(r.top + scrollY), x: Math.round(r.left), t: own.replace(/\s+/g, ' '), fs: cs.fontSize, fw: cs.fontWeight, ff: cs.fontFamily.split(',')[0].replace(/"/g, '') });
  }
  out.sort((a, b) => (Math.abs(a.y - b.y) < 10 ? a.x - b.x : a.y - b.y));
  return out;
}
function assets() {
  const abs = (u) => { try { return new URL(u, location.href).href; } catch { return null; } };
  const imgs = [...document.images].filter((i) => i.width > 0).map((i) => ({ src: i.currentSrc || i.src, alt: i.alt, y: Math.round(i.getBoundingClientRect().top + scrollY), shown: [i.width, i.height] }));
  const bgs = [];
  document.querySelectorAll('body *').forEach((el) => {
    const m = getComputedStyle(el).backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (m && el.offsetWidth > 120) bgs.push({ src: abs(m[1]), y: Math.round(el.getBoundingClientRect().top + scrollY), w: el.offsetWidth, h: el.offsetHeight });
  });
  const links = [...document.querySelectorAll('a[href]')].map((a) => ({ href: abs(a.getAttribute('href')), text: (a.innerText || '').trim().slice(0, 100) }));
  const videos = [...document.querySelectorAll('video, iframe')].map((v) => v.src || v.currentSrc).filter(Boolean);
  return { title: document.title, description: document.querySelector('meta[name=description]')?.content || '', height: document.documentElement.scrollHeight, imgs, bgs, links, videos };
}
async function settle(p) {
  await p.getByText('Rifiuta', { exact: true }).first().click({ timeout: 3000 }).catch(() => {});
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 450) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 130)); } scrollTo(0, 0); });
  await p.waitForTimeout(900);
}

const index = [];
for (const url of urls) {
  const slug = new URL(url).pathname.replace(/^\/|\/$/g, '') || 'home';
  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await settle(page);
    const lines = await page.evaluate(readingOrder);
    const data = await page.evaluate(assets);
    fs.writeFileSync(path.join(OUT, `${slug}.html`), await page.content());
    fs.writeFileSync(path.join(OUT, `${slug}.txt`), lines.map((l) => `${String(l.y).padStart(5)} ${String(l.x).padStart(4)} [${l.fs} ${l.fw}] ${l.t}`).join('\n'));
    fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify({ url, status: resp?.status(), ...data, lines }, null, 1));
    await page.screenshot({ path: path.join(OUT, 'shots', `${slug}.png`), fullPage: true });
    index.push({ url, slug, status: resp?.status(), title: data.title, height: data.height, blocks: lines.length, imgs: data.imgs.length + data.bgs.length });
    console.log('ok', resp?.status(), slug, lines.length, 'blocchi');
  } catch (e) {
    console.log('ERR', url, e.message.split('\n')[0]);
    index.push({ url, slug, error: e.message.split('\n')[0] });
  }
}
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 1));

// Menu della home: clic su MENU, voci visibili e screenshot
await page.goto(BASE, { waitUntil: 'networkidle' });
await settle(page);
await page.getByText('MENU', { exact: true }).first().click({ timeout: 5000 }).catch((e) => console.log('menu: clic non riuscito', e.message.split('\n')[0]));
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(OUT, 'shots', 'menu-aperto.png') });
const menu = await page.evaluate(() => [...document.querySelectorAll('body *')].filter((el) => {
  const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
  return r.width && r.height && r.top < innerHeight && cs.visibility !== 'hidden' && +cs.opacity > 0 && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
}).map((el) => ({ t: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 80), tag: el.tagName, href: el.closest('a')?.href || el.getAttribute('data-href') || el.closest('[onclick]')?.getAttribute('onclick')?.slice(0, 120) || '', y: Math.round(el.getBoundingClientRect().top), x: Math.round(el.getBoundingClientRect().left) })));
fs.writeFileSync(path.join(OUT, 'menu.json'), JSON.stringify(menu, null, 1));
console.log('voci visibili col menu aperto:', menu.length);
await b.close();
