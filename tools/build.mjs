// build.mjs — monta le pagine statiche del sito in sito/ da src/ (parti comuni + pagine) con poche macro:
//   [[pic name="bussola" sizes="100vw" alt="…" eager pos="70% 50%" cls="…"]]  → <picture> AVIF/WebP/JPG responsive
//   [[icon name]]                                                              → <svg><use> dallo sprite
//   [[compass draw cls="…"]]  [[dial]]                                         → bussola / quadrante SVG
//   {{R}} prefisso relativo verso la radice della demo
//   {{cur:chiave}}         → aria-current="page" se chiave è la pagina che si sta montando (menu, footer)
//   {{group:chiave,chiave}} → data-current se la pagina è una di quelle chiavi (gruppo della tendina che la contiene)
// Due versioni dagli stessi src/ (17/11/2026, docs/design-A-notte-e-oro.md e docs/design-B-verde-acido.md):
//   A «Notte e oro» → sito/   (indirizzo pubblico: URL_A del .env)
//   B «Verde acido» → sito-b/ (indirizzo pubblico: URL_B del .env): <html data-tema="b">, assets/css/tema-b.css
//     dopo site.css, Instrument Sans precaricato. Gli assets di sito-b/ sono una copia di sito/assets/ (l'unica
//     sorgente: CSS, JS, font, immagini), più .htaccess: sito-b/ si pubblica da solo (tools/deploy.sh --tema b).
// Macro del tema (src/partials/head.html): {{tema}} attributo di <html>, {{temacolor}} theme-color, {{fonts}} font da
// precaricare, {{temacss}} fogli di stile del tema.
// Alla fine controlla i link interni (href relativi) e segnala quelli che non portano a un file della cartella d'uscita.
// Uso: node tools/build.mjs
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import crypto from 'crypto';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
// .env del progetto (facoltativo, vedi .env.example): URL_A e URL_B = indirizzi pubblici delle due versioni, usati per
// og:url e per l'anteprima social. Finché non ci sono, si usa il dominio del sito vero.
const ENV_FILE = path.join(ROOT, '.env');
const ENV = Object.fromEntries((fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '').split('\n')
  .map((r) => r.match(/^\s*([A-Z_]+)=(.*)$/)).filter(Boolean).map((m) => [m[1], m[2].trim()]));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'sito'); // versione A, e sorgente degli assets per tutte e due
const IMG = path.join(OUT, 'assets/img');
const BROCHURE = 'https://files.supersite.aruba.it/media/21546_a3d995a052a4503fde577d8624b0b3c3f27c56b4.pdf/o/brochure%20talent%20lab%20os.pdf';

// Temi: cartella d'uscita, indirizzo pubblico, theme-color, font precaricati (assets/fonts/<nome>.woff2), CSS in più,
// anteprima social (assets/img/<og>, se manca og.jpg)
const TEMI = [
  { id: 'a', dir: 'sito', base: ENV.URL_A || 'https://www.talentlabconsulting.it/', attr: '', color: '#021629',
    fonts: ['newsreader-2', 'hanken-2'], css: [], og: 'og.jpg' },
  // emPunct: la punteggiatura subito dopo la parola chiave entra nella parola chiave («<em>metodo</em>.» →
  // «<em>metodo.</em>», come «Human <em>Impact.</em>»). Serve in B: con Instrument Sans e text-wrap: balance, mentre
  // SplitText spezza il titolo in righe il punto finiva da solo su una riga nuova. Il testo resta identico.
  { id: 'b', dir: 'sito-b', base: ENV.URL_B || 'https://www.talentlabconsulting.it/b/', attr: ' data-tema="b"', color: '#ffffff',
    fonts: ['instrument-1'], css: ['tema-b.css'], og: 'og-b.jpg', emPunct: true },
];

// Pagine (docs/piano-pagine-nuove.md). chiave = cartella di uscita (= slug del sito, tranne il coaching cycle senza
// doppio trattino) ed è la chiave di {{cur:…}} / {{group:…}}; sorgente src/pages/<chiave>.html.
// Title e description arrivano dallo scrape v2 (scrape/v2/<scrape>.json, senza « - talentlabconsulting»);
// description vuota o segnaposto → quella della home. preload = foto dell'eroe (avif precaricato).
const PAGES = [
  { key: 'home', src: 'index.html', out: 'index.html', R: './', path: '', scrape: 'home', preload: 'bussola' },
  { key: 'strategic-system', scrape: 'strategic-system', preload: 'ss-bivio' },
  { key: 'il-nostro-approccio', scrape: 'il-nostro-approccio', preload: 'approccio-luce' },
  { key: 'campi-di-azione', scrape: 'campi-di-azione', preload: 'campi-vetta' },
  { key: 'executive-search', scrape: 'executive-search', preload: 'riccardo-skyline-v2' },
  { key: 'executive-search-coaching-cycle', scrape: 'executive-search--coaching-cycle', preload: 'cycle-colloquio' },
  { key: 'la-divisione-angel', scrape: 'la-divisione-angel', preload: 'angel-roma' },
  { key: 'divisione-angel-il-percorso', scrape: 'divisione-angel-il-percorso', preload: 'bussola-taccuino' },
  { key: 'career-transition', scrape: 'career-transition', preload: 'career-donna', preloadSizes: '(min-width: 900px) 60vw, 100vw' },
  { key: 'coaching-4-change', scrape: 'coaching-4-change', preload: 'c4c-scrivania', preloadSizes: '(min-width: 900px) 60vw, 100vw' },
  { key: 'executive-coaching', scrape: 'executive-coaching', preload: 'titolare-platea', preloadSizes: '(min-width: 900px) 60vw, 100vw' },
  // sul sito questa pagina ha title e description della vecchia «Home Page»
  { key: 'executive-coaching-il-metodo', scrape: 'executive-coaching-il-metodo', preload: 'metodo-sartoria', preloadSizes: '(min-width: 900px) 60vw, 100vw',
    title: 'Executive Coaching: il metodo | Talent Lab OS', homeDescription: true },
  { key: 'team-coaching', scrape: 'team-coaching', preload: 'riunione' },
  { key: 'team-coaching-team-building', scrape: 'team-coaching-team-building', preload: 'tctb-scalata' },
  // sul sito title e description sono lo slug («learning-development»)
  { key: 'learning-development', scrape: 'learning-development', preload: 'futuro',
    title: 'Formazione & Sviluppo | Talent Lab OS', homeDescription: true },
  { key: 'contatti', scrape: 'contatti', preload: 'riunione' },
].map((p) => ({ src: `${p.key}.html`, out: `${p.key}/index.html`, R: '../', path: `${p.key}/`, ...p }));

const scraped = (slug) => JSON.parse(fs.readFileSync(path.join(ROOT, 'scrape/v2', `${slug}.json`), 'utf8'));
const HOME_DESCRIPTION = scraped('home').description;
for (const p of PAGES) {
  const j = scraped(p.scrape);
  p.title ??= j.title.replace(/\s*-\s*talentlabconsulting\s*$/, '');
  const d = (j.description || '').trim();
  p.description = !p.homeDescription && d && d !== p.scrape ? d : HOME_DESCRIPTION;
}
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// ---------- immagini: larghezze disponibili e proporzioni ----------
const imgInfo = {};
for (const f of fs.readdirSync(IMG)) {
  const m = f.match(/^(.+)-(\d+)\.(avif|webp|jpg)$/);
  if (!m) continue;
  const [, name, w, ext] = m;
  imgInfo[name] ??= { avif: [], webp: [], jpg: [] };
  imgInfo[name][ext].push(Number(w));
}
for (const [name, info] of Object.entries(imgInfo)) {
  for (const k of ['avif', 'webp', 'jpg']) info[k].sort((a, b) => a - b);
  const probe = path.join(IMG, `${name}-${info.webp.at(-1)}.webp`);
  const [w, h] = execFileSync('identify', ['-format', '%w %h', probe]).toString().trim().split(' ').map(Number);
  info.w = w; info.h = h;
}
const srcset = (R, name, ext) => imgInfo[name][ext].map((w) => `${R}assets/img/${name}-${w}.${ext} ${w}w`).join(', ');

const attrs = (s) => {
  const o = {};
  for (const m of s.matchAll(/([\w-]+)(?:="([^"]*)")?/g)) o[m[1]] = m[2] ?? true;
  return o;
};

function pic(a, R) {
  const info = imgInfo[a.name];
  if (!info) throw new Error(`immagine sconosciuta: ${a.name}`);
  const sizes = a.sizes || '100vw';
  const eager = !!a.eager;
  const style = a.pos ? ` style="--pos:${a.pos}"` : '';
  return `<picture${a.cls ? ` class="${a.cls}"` : ''}>`
    + `<source type="image/avif" srcset="${srcset(R, a.name, 'avif')}" sizes="${sizes}">`
    + `<source type="image/webp" srcset="${srcset(R, a.name, 'webp')}" sizes="${sizes}">`
    + `<img src="${R}assets/img/${a.name}-${info.jpg.at(-1)}.jpg" width="${info.w}" height="${info.h}" alt="${a.alt || ''}"${style}`
    + (eager ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"') + '></picture>';
}

const icon = (name, R) => `<svg class="icon" aria-hidden="true" focusable="false"><use href="${R}assets/img/icons.svg?v=${ver('assets/img/icons.svg')}#i-${name}"></use></svg>`;

// ---------- bussola ----------
const P = (ang, r) => { const t = (ang - 90) * Math.PI / 180; return [+(r * Math.cos(t)).toFixed(2), +(r * Math.sin(t)).toFixed(2)]; };
function roseAndNeedle(scale = 1, needle = 70) {
  let rose = '';
  for (const a of [0, 90, 180, 270]) {
    const [tx, ty] = P(a, 64 * scale); const [lx, ly] = P(a - 45, 10 * scale); const [rx, ry] = P(a + 45, 10 * scale);
    rose += `<path class="a" d="M${tx} ${ty}L${lx} ${ly}L0 0Z"/><path class="b" d="M${tx} ${ty}L${rx} ${ry}L0 0Z"/>`;
  }
  for (const a of [45, 135, 225, 315]) {
    const [tx, ty] = P(a, 38 * scale); const [lx, ly] = P(a - 45, 7 * scale); const [rx, ry] = P(a + 45, 7 * scale);
    rose += `<g class="minor"><path class="a" d="M${tx} ${ty}L${lx} ${ly}L0 0Z"/><path class="b" d="M${tx} ${ty}L${rx} ${ry}L0 0Z"/></g>`;
  }
  const n = needle;
  const nd = `<g class="c-needle"><path class="ns" d="M0 ${n}L6 0L-6 0Z"/><path class="nn" d="M0 -${n}L6 0L-6 0Z"/><circle r="4.6"/></g>`;
  return { rose: `<g class="c-rose">${rose}</g>`, needle: nd };
}
function compass(a = {}) {
  let ticks = '';
  for (let i = 0; i < 72; i++) {
    const ang = i * 5; const maj = ang % 45 === 0;
    const [x1, y1] = P(ang, 90); const [x2, y2] = P(ang, maj ? 80 : 85.5);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${maj ? ' class="maj"' : ''}/>`;
  }
  const L = [['N', 0, 'n'], ['E', 90, ''], ['S', 180, ''], ['O', 270, '']].map(([t, ang, c]) => {
    const [x, y] = P(ang, 72); return `<text x="${x}" y="${y}"${c ? ` class="${c}"` : ''}>${t}</text>`;
  }).join('');
  const { rose, needle } = roseAndNeedle(1, 66);
  return `<svg class="compass${a.cls ? ` ${a.cls}` : ''}" viewBox="-100 -100 200 200"${a.draw ? ' data-draw' : ''} aria-hidden="true" focusable="false">`
    + `<circle class="c-ring" r="97" pathLength="1"/><circle class="c-ring c-ring--in" r="90" pathLength="1"/>`
    + `<g class="c-ticks">${ticks}</g>${rose}<g class="c-letters">${L}</g>${needle}</svg>`;
}
function dial() {
  let ticks = '';
  for (let i = 0; i < 120; i++) {
    const ang = i * 3; const maj = ang % 72 === 0;
    const [x1, y1] = P(ang, 100); const [x2, y2] = P(ang, maj ? 90 : 96);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${maj ? ' class="maj"' : ''}/>`;
  }
  let marks = '';
  for (let i = 0; i < 5; i++) {
    const [cx, cy] = P(i * 72, 100); const [tx, ty] = P(i * 72, 119);
    marks += `<g class="d-mark"><circle cx="${cx}" cy="${cy}" r="6"/><text x="${tx}" y="${ty}">0${i + 1}</text></g>`;
  }
  const { rose, needle } = roseAndNeedle(1.12, 76);
  const [nx, ny] = P(0, 62);
  return `<svg class="compass dial" viewBox="-132 -132 264 264" data-draw aria-hidden="true" focusable="false">`
    + `<circle class="c-ring" r="108" pathLength="1"/><circle class="c-ring c-ring--in" r="100" pathLength="1"/>`
    + `<g class="c-ticks">${ticks}</g>${rose}<g class="c-letters"><text x="${nx}" y="${ny}" class="n">N</text></g>`
    + `<g class="d-marks">${marks}</g>${needle}</svg>`;
}

// sigillo: testo che gira in cerchio attorno all'emblema Φ
function seal(R) {
  const text = 'TALENT LAB OS · STRATEGIC SYSTEM · HUMAN IMPACT · ';
  return '<svg class="seal__svg" viewBox="-64 -64 128 128" aria-hidden="true" focusable="false">'
    + '<circle class="seal__bg" r="62"/><circle class="seal__ring" r="59.5"/><circle class="seal__ring" r="33"/>'
    + '<g class="seal__spin"><path id="seal-path" d="M0,-46 a46,46 0 1,1 0,92 a46,46 0 1,1 0,-92" fill="none"/>'
    + `<text><textPath href="#seal-path" textLength="286" lengthAdjust="spacing">${text}</textPath></text></g>`
    + `<image href="${R}assets/img/emblema-240.webp" x="-23" y="-23" width="46" height="46"/></svg>`;
}

// ---------- montaggio ----------
const partial = (n) => fs.readFileSync(path.join(SRC, 'partials', n), 'utf8');
// versione dei file nell'indirizzo: la cache del browser (7 giorni) non tiene CSS/JS vecchi dopo un deploy
const ver = (rel) => crypto.createHash('md5').update(fs.readFileSync(path.join(OUT, rel))).digest('hex').slice(0, 8);

const head = partial('head.html');
const header = partial('header.html');
const footer = partial('footer.html');

function render(tpl, page, tema) {
  const R = page.R;
  const og = fs.existsSync(path.join(IMG, tema.og)) ? tema.og : 'og.jpg';
  let s = tpl
    .replaceAll('{{tema}}', tema.attr)
    .replaceAll('{{temacolor}}', tema.color)
    .replaceAll('{{fonts}}', tema.fonts.map((f) => `<link rel="preload" href="{{R}}assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join('\n'))
    .replaceAll('{{temacss}}', tema.css.map((f) => `<link rel="stylesheet" href="{{R}}assets/css/${f}">`).join('\n'))
    .replace(/\[\[pic([^\]]*)\]\]/g, (_, a) => pic(attrs(a), R))
    .replace(/\[\[icon ([\w-]+)\]\]/g, (_, n) => icon(n, R))
    .replace(/\[\[compass([^\]]*)\]\]/g, (_, a) => compass(attrs(a)))
    .replace(/\[\[dial\]\]/g, () => dial())
    .replace(/\[\[seal\]\]/g, () => seal(R));
  s = s.replace(/\{\{cur:([\w-]+)\}\}/g, (_, k) => (k === page.key ? 'aria-current="page"' : ''))
    .replace(/\{\{group:([\w,-]+)\}\}/g, (_, ks) => (ks.split(',').includes(page.key) ? 'data-current' : ''))
    .replace(/\{\{R\}\}(assets\/(?:css\/(?:site|tema-b)\.css|js\/site\.js|img\/icons\.svg))/g, (_, rel) => `${R}${rel}?v=${ver(rel)}`)
    .replaceAll('{{R}}', R)
    .replaceAll('{{BROCHURE}}', BROCHURE)
    .replaceAll('{{title}}', esc(page.title))
    .replaceAll('{{description}}', esc(page.description))
    .replaceAll('{{url}}', tema.base + page.path)
    .replaceAll('{{og}}', `${tema.base}assets/img/${og}`)
    .replaceAll('{{scrivi}}', page.key === 'contatti' ? '#modulo' : `${R}contatti/`);
  return s;
}

// copia from → to: solo i file nuovi o cambiati, con la stessa data (il deploy incrementale carica solo quelli);
// toglie da `to` quello che in `from` non c'è più. Salta i file nascosti (es. i temporanei di assets.sh).
function mirror(from, to) {
  let n = 0;
  fs.mkdirSync(to, { recursive: true });
  const keep = new Set();
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    keep.add(e.name);
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    if (e.isDirectory()) { n += mirror(a, b); continue; }
    const sa = fs.statSync(a);
    const sb = fs.existsSync(b) ? fs.statSync(b) : null;
    if (sb && sb.size === sa.size && Math.trunc(sb.mtimeMs) === Math.trunc(sa.mtimeMs)) continue;
    fs.copyFileSync(a, b);
    fs.utimesSync(b, sa.atime, sa.mtime);
    n++;
  }
  for (const e of fs.readdirSync(to)) if (!keep.has(e) && !e.startsWith('.')) { fs.rmSync(path.join(to, e), { recursive: true, force: true }); n++; }
  return n;
}

let broken = 0;
for (const tema of TEMI) {
  const DIR = path.join(ROOT, tema.dir);
  if (DIR !== OUT) {
    const n = mirror(path.join(OUT, 'assets'), path.join(DIR, 'assets'));
    fs.copyFileSync(path.join(OUT, '.htaccess'), path.join(DIR, '.htaccess')); // noindex (X-Robots-Tag) e cache come in sito/
    console.log(`ok ${tema.dir}/assets (copiati da sito/assets: ${n} file cambiati) e .htaccess`);
  }
  const built = [];
  for (const page of PAGES) {
    const pre = imgInfo[page.preload];
    if (!pre) throw new Error(`${page.key}: foto dell'eroe da precaricare sconosciuta: ${page.preload}`);
    const body = fs.readFileSync(path.join(SRC, 'pages', page.src), 'utf8');
    // il preload deve avere gli stessi sizes della foto dell'eroe ([[pic … eager]]), se no il browser scarica due file:
    // vince quello che dice la pagina; preloadSizes (eroi divisi: 60vw da 900 px) vale se la pagina non lo dice
    const heroPic = [...body.matchAll(/\[\[pic([^\]]*)\]\]/g)].map((m) => attrs(m[1])).find((a) => a.name === page.preload && a.eager);
    const sizes = (heroPic && heroPic.sizes) || page.preloadSizes || '100vw';
    if (tema === TEMI[0] && heroPic && heroPic.sizes && page.preloadSizes && heroPic.sizes !== page.preloadSizes) {
      console.warn(`ATTENZIONE ${page.key}: la foto dell'eroe ha sizes="${heroPic.sizes}", in PAGES preloadSizes="${page.preloadSizes}" (precarico allineato alla foto)`);
    }
    const preload = `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset(page.R, page.preload, 'avif')}" imagesizes="${sizes}" fetchpriority="high">`;
    let doc = render(head.replace('{{preload}}', preload) + header + body + footer, page, tema)
      .replace(/[ \t]+$/gm, '');
    if (tema.emPunct) doc = doc.replace(/<\/em>([.,;:!?…]+)/g, '$1</em>');
    const leftover = doc.match(/\{\{[^}]*\}\}|\[\[[^\]]*\]\]/);
    if (leftover) throw new Error(`${tema.dir}/${page.out}: macro non risolta ${leftover[0]}`);
    const out = path.join(DIR, page.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, doc);
    built.push({ page, out, doc });
    console.log('ok', `${tema.dir}/${page.out}`, `${(doc.length / 1024).toFixed(1)} kB`);
  }

  // link interni: ogni href relativo deve portare a un file che esiste nella cartella d'uscita (pagine = cartelle con index.html)
  for (const { page, out, doc } of built) {
    for (const [, href] of doc.matchAll(/href="([^"]*)"/g)) {
      if (!href || /^(?:[a-z]+:|#|\/\/)/i.test(href)) continue;
      let rel = decodeURI(href.split('#')[0].split('?')[0]);
      if (!rel || rel.endsWith('/') || rel === '.' || rel === '..') rel = path.join(rel, 'index.html');
      if (!fs.existsSync(path.join(path.dirname(out), rel))) { console.warn(`ATTENZIONE ${tema.dir}/${page.out}: link rotto ${href}`); broken++; }
    }
  }
}
console.log(broken ? `link interni rotti: ${broken}` : 'link interni: tutti ok');

// design.md scaricabile dalla demo: https://www.teambuildingsrl.it/riccardo/design.md (download, UTF-8: vedi sito/.htaccess)
fs.copyFileSync(path.join(ROOT, 'design.md'), path.join(OUT, 'design.md'));
console.log('ok design.md');
