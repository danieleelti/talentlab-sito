// check.mjs — prova la demo con Chromium: errori in console, richieste fallite, scorrimento orizzontale,
// screenshot statici (movimento ridotto, pagina intera) e in movimento (viewport a più altezze).
// Uso: node tools/check.mjs <url-base> <cartella-uscita> [static|motion|all] [pagine,separate,da,virgola]
// Senza elenco prova tutte le pagine (le stesse di tools/build.mjs; «home» = la radice).
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright') // npm install (package.json) + npx playwright install --with-deps chromium;

const ALL = [
  'home', 'strategic-system', 'il-nostro-approccio', 'campi-di-azione',
  'executive-search', 'executive-search-coaching-cycle',
  'la-divisione-angel', 'divisione-angel-il-percorso', 'career-transition', 'coaching-4-change',
  'executive-coaching', 'executive-coaching-il-metodo',
  'team-coaching', 'team-coaching-team-building',
  'learning-development', 'contatti',
];
const BASE = process.argv[2] || 'http://127.0.0.1:3500/';
const OUT = process.argv[3] || 'shots';
const MODE = process.argv[4] || 'all';
const PAGES = process.argv[5] ? process.argv[5].split(',') : ALL;
fs.mkdirSync(OUT, { recursive: true });

const DEVICES = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: {
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  },
};
const urlOf = (p) => BASE + (p === 'home' ? '' : `${p}/`);
const report = [];
const b = await chromium.launch();

for (const [dev, opts] of Object.entries(DEVICES)) {
  for (const mode of MODE === 'all' ? ['static', 'motion'] : [MODE]) {
    const ctx = await b.newContext({ ...opts, locale: 'it-IT', reducedMotion: mode === 'static' ? 'reduce' : 'no-preference' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));
    page.on('response', (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
    for (const p of PAGES) {
      errors.length = 0;
      await page.goto(urlOf(p), { waitUntil: 'networkidle' });
      await page.waitForTimeout(mode === 'motion' ? 2600 : 600);
      const tag = `${p}-${dev}-${mode}`;
      if (mode === 'static') {
        // le foto sono loading="lazy": nella cattura a pagina intera resterebbero vuote. Le carica tutte (e così
        // controlla anche che nessuna dia errore), poi scatta.
        await page.evaluate(async () => {
          const imgs = [...document.images];
          imgs.forEach((i) => { if (i.loading === 'lazy') i.loading = 'eager'; });
          await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => {
            i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); setTimeout(r, 8000);
          }))));
          await Promise.all(imgs.map((i) => i.decode?.().catch(() => {})));
        });
        await page.screenshot({ path: `${OUT}/${tag}.png`, fullPage: true });
      } else {
        await page.screenshot({ path: `${OUT}/${tag}-0.png` });
        const H = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
        const stops = [0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1];
        let i = 1;
        for (const f of stops) {
          // scorre a piccoli passi, come un dito: fa partire le animazioni legate allo scroll
          const target = Math.round(H * f);
          await page.evaluate(async (t) => {
            const step = 120;
            while (Math.abs(scrollY - t) > step) { scrollTo(0, scrollY + Math.sign(t - scrollY) * step); await new Promise((r) => setTimeout(r, 16)); }
            scrollTo(0, t);
          }, target);
          await page.waitForTimeout(1300);
          await page.screenshot({ path: `${OUT}/${tag}-${i++}.png` });
        }
      }
      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const bad = [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > w + 1) && getComputedStyle(el).position !== 'fixed' && !el.closest('.marquee, .menu, .hero__media, .lightup__media, .cta__media, .cta__compass, .menu__compass'); })
          .slice(0, 8).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(el.getBoundingClientRect().right)}`);
        return { scrollW: document.documentElement.scrollWidth, clientW: w, bad };
      });
      report.push({ tag, errors: [...new Set(errors)], overflow });
      console.log(tag, 'errori:', errors.length, 'scrollW', overflow.scrollW, '/', overflow.clientW, overflow.bad.length ? overflow.bad : '');
      for (const e of new Set(errors)) console.log('   ', e.slice(0, 220));
    }
    await ctx.close();
  }
}
await b.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
const nErr = report.reduce((n, r) => n + r.errors.length, 0);
const wide = report.filter((r) => r.overflow.scrollW > r.overflow.clientW || r.overflow.bad.length).map((r) => r.tag);
console.log(`TOTALE: ${report.length} prove · errori ${nErr} · scorrimento orizzontale ${wide.length ? wide.join(', ') : 'nessuno'}`);
