// shots.mjs — screenshot a pagina intera senza banner dei cookie (clic su «Rifiuta»), desktop 1440 e telefono 390.
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright') // npm install (package.json) + npx playwright install --with-deps chromium;
const OUT = process.argv[2] || 'scrape/shots-clean';
fs.mkdirSync(OUT, { recursive: true });
const pages = ['', 'executive-search', 'executive-coaching', 'contatti'];
const b = await chromium.launch();
for (const [tag, opts] of [
  ['desktop', { viewport: { width: 1440, height: 900 } }],
  ['mobile', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }],
]) {
  const ctx = await b.newContext({ ...opts, locale: 'it-IT' });
  const p = await ctx.newPage();
  for (const s of pages) {
    await p.goto('https://talentlabconsulting.it/' + s, { waitUntil: 'networkidle', timeout: 60000 });
    await p.getByText('Rifiuta', { exact: true }).first().click({ timeout: 5000 }).catch(() => {});
    await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); });
    await p.waitForTimeout(800);
    await p.screenshot({ path: `${OUT}/${s || 'home'}-${tag}.png`, fullPage: true });
    console.log('ok', tag, s || 'home');
  }
  await ctx.close();
}
await b.close();
