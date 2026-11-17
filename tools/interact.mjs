// interact.mjs — prova le interazioni: navigazione (tendine da computer, menu a gruppi del telefono), modulo (errori e
// invio), eroe da computer.
// Uso: node tools/interact.mjs <url-base> <cartella-uscita>
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright') // npm install (package.json) + npx playwright install --with-deps chromium;
const BASE = process.argv[2] || 'http://127.0.0.1:8765/riccardo/';
const OUT = process.argv[3] || 'shots';
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const errs = [];
const fails = [];
const ok = (cond, msg) => { console.log(`${cond ? 'ok  ' : 'NO  '} ${msg}`); if (!cond) fails.push(msg); };

// ---------- Navigazione da computer: la barra entra a 1280 px e a 1440 px ----------
for (const width of [1280, 1440]) {
  const ctx = await b.newContext({ viewport: { width, height: 900 }, locale: 'it-IT' });
  const q = await ctx.newPage();
  q.on('pageerror', (e) => errs.push(e.message));
  await q.goto(BASE + 'la-divisione-angel/', { waitUntil: 'networkidle' });
  await q.waitForTimeout(600);
  const fit = await q.evaluate(() => {
    const r = (s) => document.querySelector(s).getBoundingClientRect();
    const brand = r('.brand'); const nav = r('.nav'); const cta = r('.header__cta');
    return { brandR: Math.round(brand.right), navL: Math.round(nav.left), navR: Math.round(nav.right), ctaL: Math.round(cta.left), ctaR: Math.round(cta.right), w: innerWidth, menuBtn: getComputedStyle(document.querySelector('.menu-btn')).display };
  });
  ok(fit.brandR < fit.navL && fit.navR < fit.ctaL && fit.ctaR <= fit.w && fit.menuBtn === 'none', `barra a ${width}px: logo ${fit.brandR} < menu ${fit.navL}-${fit.navR} < bottone ${fit.ctaL}-${fit.ctaR} (≤ ${fit.w}), «Menu» nascosto`);
  const cur = await q.evaluate(() => [document.querySelector('.nav__item[data-current] .nav__toggle')?.textContent.trim(), document.querySelector('.nav__panel a[aria-current="page"]')?.textContent.trim()]);
  ok(cur[0] === 'Divisione Angel' && cur[1] === 'Divisione Angel', `gruppo e pagina attivi segnati: ${cur.join(' / ')}`);

  if (width === 1440) {
    const t = q.locator('.nav__toggle').nth(2); // Divisione Angel
    const item = q.locator('.nav__item').nth(2);
    const state = async () => q.evaluate(() => [...document.querySelectorAll('.nav__item')].map((i) => i.classList.contains('is-open') ? 1 : 0).join(''));
    await t.click();
    await q.waitForTimeout(450);
    ok((await t.getAttribute('aria-expanded')) === 'true' && (await state()) === '001000', 'clic: si apre la tendina giusta (aria-expanded=true)');
    await q.screenshot({ path: `${OUT}/nav-tendina-1440.png` });
    await q.keyboard.press('Escape');
    await q.waitForTimeout(300);
    ok((await t.getAttribute('aria-expanded')) === 'false' && await q.evaluate(() => document.activeElement?.classList.contains('nav__toggle')), 'Esc: si chiude e il focus torna sul bottone');
    await q.keyboard.press('ArrowDown');
    await q.waitForTimeout(250);
    ok(await q.evaluate(() => document.activeElement?.textContent.trim()) === 'Divisione Angel', 'freccia giù sul bottone: apre e porta il focus sul primo link');
    await q.keyboard.press('ArrowDown');
    ok(await q.evaluate(() => document.activeElement?.textContent.trim()) === 'Divisione Angel: il percorso', 'freccia giù nella tendina: link successivo');
    await q.keyboard.press('End');
    ok(await q.evaluate(() => document.activeElement?.textContent.trim()) === 'C4C: Coaching for Change', 'Fine: ultimo link');
    await q.keyboard.press('Tab');
    await q.waitForTimeout(250);
    ok((await state()) === '000000', `Tab che esce dal gruppo: tendina chiusa (focus su «${await q.evaluate(() => document.activeElement?.textContent.trim())}»)`);
    await q.mouse.move(10, 600);
    await item.hover();
    await q.waitForTimeout(400);
    ok((await state()) === '001000', 'passaggio del mouse: si apre');
    const box = await item.boundingBox();
    await q.mouse.move(box.x + 30, box.y + box.height + 12, { steps: 4 }); // scende dal bottone dentro la tendina
    await q.mouse.move(box.x + 40, box.y + box.height + 70, { steps: 4 });
    await q.waitForTimeout(400);
    ok((await state()) === '001000', 'mouse dal bottone alla tendina: resta aperta');
    await q.mouse.move(700, 700);
    await q.waitForTimeout(600);
    ok((await state()) === '000000', 'mouse fuori: si chiude');
    await q.locator('.nav__toggle').nth(0).click();
    await q.waitForTimeout(300);
    await q.mouse.click(700, 700);
    await q.waitForTimeout(400);
    ok((await state()) === '000000', 'clic fuori: si chiude');
    await q.locator('.nav__toggle').nth(4).hover();
    await q.waitForTimeout(450);
    const panel = await q.evaluate(() => { const r = document.querySelector('.nav__item:nth-child(5) .nav__panel').getBoundingClientRect(); return { r: Math.round(r.right), w: innerWidth }; });
    ok(panel.r <= panel.w, `ultima tendina dentro lo schermo (bordo destro ${panel.r} ≤ ${panel.w})`);
    await q.screenshot({ path: `${OUT}/nav-tendina-team-1440.png` });
  }
  await ctx.close();
}

// ---------- Telefono: menu a tutto schermo con i gruppi, scorrevole ----------
const mob = await b.newContext({ viewport: { width: 390, height: 664 }, isMobile: true, hasTouch: true, locale: 'it-IT' });
const p = await mob.newPage();
p.on('pageerror', (e) => errs.push(e.message));
await p.goto(BASE + 'career-transition/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await p.tap('.menu-btn');
await p.waitForTimeout(1100);
await p.screenshot({ path: `${OUT}/menu-open.png` });
ok(await p.evaluate(() => document.documentElement.classList.contains('menu-open')), `menu aperto (focus su: ${await p.evaluate(() => document.activeElement?.className)})`);
const sc = await p.evaluate(async () => {
  const n = document.querySelector('.menu__nav');
  const before = n.scrollTop; n.scrollTop = 9999; await new Promise((r) => setTimeout(r, 100));
  return { h: n.scrollHeight, c: n.clientHeight, before, after: n.scrollTop, cur: document.querySelector('.menu__group a[aria-current="page"]')?.textContent.trim() };
});
ok(sc.h > sc.c && sc.after > sc.before, `il menu scorre (contenuto ${sc.h}px in ${sc.c}px, scrollTop ${sc.before}→${sc.after})`);
ok(sc.cur === 'Career Transition', `pagina attiva segnata nel menu: ${sc.cur}`);
await p.screenshot({ path: `${OUT}/menu-open-fondo.png` });
await p.keyboard.press('Escape');
await p.waitForTimeout(900);
ok(!(await p.evaluate(() => document.documentElement.classList.contains('menu-open'))), 'menu chiuso con Esc');

// ---------- Modulo dei contatti ----------
await p.setViewportSize({ width: 390, height: 844 });
await p.goto(BASE + 'contatti/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
await p.evaluate(() => document.querySelector('#modulo').scrollIntoView());
await p.waitForTimeout(1500);
await p.click('#modulo button[type=submit]');
await p.waitForTimeout(700);
const invalid = await p.evaluate(() => [...document.querySelectorAll('#modulo .is-invalid')].map((e) => e.querySelector('.field__error span')?.textContent));
ok(invalid.length === 4, `errori mostrati: ${invalid.length}`);
await p.screenshot({ path: `${OUT}/form-errors.png` });
await p.fill('#f-nome', 'Mario Bianchi');
await p.fill('#f-email', 'mario.bianchi@banca-esempio.it');
await p.fill('#f-msg', 'Vorrei parlare di un percorso di coaching per i manager della nostra rete.');
await p.check('input[name=privacy]');
await p.click('#modulo button[type=submit]');
await p.waitForTimeout(900);
const sent = await p.evaluate(() => ({ visible: document.querySelector('.form__ok').classList.contains('is-visible'), href: document.querySelector('[data-ok-mailto]').getAttribute('href').slice(0, 60) }));
ok(sent.visible && sent.href.startsWith('mailto:'), `conferma visibile e mailto pronto (${sent.href}…)`);
await p.screenshot({ path: `${OUT}/form-ok.png` });

// ---------- Eroe da computer ----------
const desk = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'it-IT' });
const q = await desk.newPage();
q.on('pageerror', (e) => errs.push(e.message));
await q.goto(BASE, { waitUntil: 'networkidle' });
await q.mouse.move(300, 300);
await q.waitForTimeout(2800);
await q.screenshot({ path: `${OUT}/hero-desktop.png` });
ok(!errs.length, `errori JS: ${errs.length ? errs.join(' | ') : 'nessuno'}`);
await b.close();
console.log(fails.length ? `PROVE FALLITE: ${fails.length}` : 'tutte le prove di interazione ok');
process.exitCode = fails.length ? 1 : 0;
