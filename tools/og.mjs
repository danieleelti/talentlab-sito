// og.mjs — anteprime social 1200×630 delle due versioni: l'eroe della Home a movimento ridotto (tutto visibile).
// Scrive sito/assets/img/og.jpg (versione A, /riccardo/) e sito/assets/img/og-b.jpg (versione B, /riccardo2/);
// build.mjs le copia in sito-b/ e mette og:image giusta in ciascuna versione.
// Uso, con il server locale che serve riccardo → sito e riccardo2 → sito-b (vedi CLAUDE.md), in quest'ordine:
//   node tools/build.mjs        (sito-b prende il CSS nuovo)
//   node tools/og.mjs http://127.0.0.1:8773/
//   node tools/build.mjs        (copia og-b.jpg in sito-b)
import { createRequire } from 'module';
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright') // npm install (package.json) + npx playwright install --with-deps chromium;

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BASE = process.argv[2] || 'http://127.0.0.1:8773/';
const b = await chromium.launch();
for (const [dir, out] of [['riccardo/', 'og.jpg'], ['riccardo2/', 'og-b.jpg']]) {
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
  await p.goto(BASE + dir, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const png = path.join(os.tmpdir(), `og-${process.pid}.png`);
  await p.screenshot({ path: png });
  execFileSync('magick', [png, '-strip', '-interlace', 'Plane', '-quality', '82', path.join(ROOT, 'sito/assets/img', out)]);
  fs.rmSync(png);
  console.log('ok', out);
  await p.close();
}
await b.close();
