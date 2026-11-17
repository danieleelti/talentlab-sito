# Talent Lab OS — il sito — note per Claude

## Cos'è e di chi è
Restyling del sito https://talentlabconsulting.it/ (Talent Lab OS — Strategic System, marchio di OCC Consulting Srl),
fatto il 17/11/2026 da Daniele (TeamBuilding.it) con Claude Code e passato a Riccardo, il titolare. **Da qui in avanti il
sito è di Riccardo**: questa cartella è il suo laboratorio, lui decide testi, foto, versione e quando pubblicare.
Le demo di partenza sono online (non indicizzate, restano finché Daniele le toglie):
**A «Notte e oro»** https://www.teambuildingsrl.it/riccardo/ · **B «Verde acido»** https://www.teambuildingsrl.it/riccardo2/.
Il repo è privato e lo resta: dentro ci sono le foto di Riccardo e la sua brochure.

## Vederlo subito (niente da compilare)
`sito/` (A) e `sito-b/` (B) sono già pronti. Dal server:
```bash
python3 -m http.server 3500 --bind 127.0.0.1 --directory sito      # versione A  (npm run anteprima)
python3 -m http.server 3500 --bind 127.0.0.1 --directory sito-b    # versione B  (npm run anteprima:b)
```
poi https://<dominio di Riccardo>/anteprima/ (la porta 3500 è quella dell'anteprima, con password). I link interni sono
relativi: il sito funziona sotto qualsiasi percorso. Se Riccardo vuole vederle tutte e due insieme, due server su due porte
oppure una cartella con due link (`riccardo -> sito`, `riccardo2 -> sito-b`) servita come radice.

## Struttura
- `design.md` — **la verità sul design**: direzione, token, testi pagina per pagina, animazioni, checklist, decisioni aperte
  (§9). Carattere e colori delle due versioni: `docs/design-A-notte-e-oro.md` e `docs/design-B-verde-acido.md` (i loro
  testi d'esempio NON vanno sul sito). Piano delle 16 pagine e contratto dei componenti: `docs/piano-pagine-nuove.md`.
- `src/partials/` (head, header, footer) + `src/pages/<chiave>.html` (16 pagine: elenco `PAGES` in `tools/build.mjs`,
  chiave = cartella di uscita) → `node tools/build.mjs` → `sito/` (A) e `sito-b/` (B: stesse pagine con
  `<html data-tema="b">` + `assets/css/tema-b.css`).
  Macro: `[[pic name=… sizes=… alt=… pos=… eager]]`, `[[icon nome]]` (sprite Phosphor light), `[[compass draw]]`, `[[dial]]`,
  `{{R}}` radice relativa, `{{cur:chiave}}` (aria-current), `{{group:chiave,chiave}}` (gruppo attivo della tendina).
  Title e description arrivano da `scrape/v2/<slug>.json`; il build segnala macro non risolte e link interni rotti.
- Componenti (nomi delle classi fissi): `.hero__sub`, `.split`, `.cards/.card`, `.phases/.phase`, `.tiles/.tile/.tile--poster`,
  `.band`, `.figure`; varianti in fondo a `site.css` (`.display--long`, `.quote--long`, `.card--wide`, `.hero__lead--narrow`,
  `.section--flush`). **Niente `style=` con misure o colori nelle pagine**: in B non si potrebbero adattare.
- `sito/assets/` — `css/site.css`, `js/site.js` (bussola a molla, polvere d'oro, pannelli impilati, frasi che si accendono,
  quadrante del processo, menu, modulo mailto), GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3, font self-hosted
  (A: Newsreader + Hanken Grotesk; B: Instrument Sans), immagini AVIF/WebP/JPG. `css/tema-b.css` = la B sopra site.css.
  **`sito/assets/` è l'unica sorgente degli assets**: `build.mjs` li copia in `sito-b/assets/` (mai modificare `sito-b/` a mano).
- `foto-titolare/` — le 6 foto del titolare (originali) + `riccardo-skyline-v2.jpg` (generata con Gemini, prompt in
  `docs/immagini/`). `scrape/` — il sito originale al 17/11/2026: testi (`*.txt`, `*.json`), HTML, immagini (`img/`,
  `v2/img/`), brochure PDF attuale e 2019. Senza screenshot.
- `tools/`: `build.mjs` (monta le pagine); `check.mjs` (Chromium: errori, overflow, screenshot statici e in movimento, telefono
  e computer); `interact.mjs` (tendine, menu, modulo); `audit-testi.py` (segnala testi che non stanno nel sito originale);
  `assets.sh` (rigenera immagini, logo, font, librerie, icone: serve solo se cambiano le sorgenti); `og.mjs` (anteprime social);
  `genera-immagine.mjs` (immagini con Gemini, chiave nel `.env`); `deploy.sh` (FTP, dati nel `.env`); `scrape*.mjs`, `shots.mjs` (storici).

## Strumenti e dipendenze
- Node 22 (nvm). `npm install` mette Playwright, GSAP e Lenis in `node_modules/` (servono a check/interact/og e ad assets.sh;
  il build no). Chromium per Playwright: `npx playwright install --with-deps chromium` (le dipendenze di sistema vogliono root).
- Python 3 per `audit-testi.py`. ImageMagick 7 (`magick`) solo per `assets.sh`; su Ubuntu con ImageMagick 6 usare `convert`
  o installare la 7.
- `.env` (da `.env.example`, mai su GitHub, nel vault): FTP dell'hosting per `deploy.sh`, `URL_A`/`URL_B` (indirizzi
  pubblici scritti nelle pagine come og:url), `GOOGLE_GENERATIVE_AI_API_KEY` per le immagini.

## Come si lavora
1. Capire cosa vuole Riccardo (una domanda alla volta), poi modificare `src/` o `sito/assets/`; `node tools/build.mjs`.
2. Anteprima sulla 3500 e far guardare a Riccardo. Prima di dire «fatto»: `node tools/check.mjs http://127.0.0.1:3500/ prove-out all`
   (tutte le 16 pagine, nessun errore, nessun overflow) e, se si sono toccati i testi, `python3 -I tools/audit-testi.py`.
3. Commit + push a ogni passo buono (repo privato di Riccardo). Il `.env` non si committa: va nel vault.
4. Fable per ripensare una pagina o il design; Opus per eseguire. Le regole di casa del kit valgono anche qui («vai», due
   elenchi, segreti mai in chat).

## Testi, nomi, foto: decide Riccardo
- Durante la demo valeva una regola di Daniele: solo testi presi dal sito originale, niente frasi inventate, niente nome del
  titolare in pagina. `audit-testi.py` la controlla (deve dire 0). **Per Riccardo è uno strumento, non una regola**: è il
  suo sito, può scrivere quello che vuole; l'audit serve a vedere cosa è nuovo rispetto all'originale.
- Le foto del titolare in `foto-titolare/` sono generate (non scatti veri) tranne dove Riccardo dirà il contrario: se
  arrivano foto vere, si sostituiscono con `assets.sh` (mappa `IMG` in testa allo script) e `node tools/build.mjs`.
- Decisioni aperte ereditate da `design.md` §9: versione A o B (o un misto); carattere dei titoli (Newsreader oggi, Bodoni
  Moda o Cormorant in alternativa); URL LinkedIn; il modulo dei contatti oggi compone una mail (`mailto`): un invio vero
  richiede un servizio (es. Formspree) o un piccolo backend; il pilastro «Grow»; la brochure linkata (oggi quella su Aruba).

## Pubblicare sul dominio vero (quando Riccardo lo decide, non prima)
- Il sito attuale di talentlabconsulting.it è su **Aruba SuperSite** (costruttore di siti): lì **non si caricano file**. Due strade:
  (a) **il server di Riccardo**: vhost nginx che serve la cartella `sito/` (o `sito-b/`) come radice, certificato Let's Encrypt,
  DNS del dominio verso il server; (b) un **hosting con FTP** (es. Aruba Hosting Linux): `.env` compilato e `tools/deploy.sh`
  (`--tema b` per la B), **prima su una cartella di prova** (`FTP_REMOTE_A=…/demo`), poi sulla radice.
- Al momento della pubblicazione definitiva: togliere il `noindex` (meta robots in `src/partials/head.html` e `X-Robots-Tag`
  in `sito/.htaccess`, che vale solo su Apache), mettere `URL_A` giusto nel `.env` e rifare il build (og:url), controllare
  privacy e cookie policy (le pagine attuali riprendono i testi del sito originale), far provare il modulo contatti.
- Finché il sito nuovo non sostituisce quello vecchio, resta `noindex`: non deve fare concorrenza al sito vero su Google.

## Storia (per non rifare il lavoro)
- 17/11/2026, Daniele: scrape del sito (17 pagine dalla sitemap), design «Bussola d'oro» (`design.md`), 16 pagine, due versioni
  dal design di Claude Design (A Newsreader/oro su notte, B Instrument Sans/verde acido con foto in bianco e nero), 6 foto
  del titolare integrate, immagine «Riccardo di spalle» generata con Gemini, prove Playwright su tutte le pagine (telefono e
  computer, statico e in movimento) senza errori. Regola seguita allora: «il sito va bene, non stravolgerlo, niente
  animazioni tolte: cambiano solo lettering e palette».

## Da dove ripartire
- 17/11/2026: repo appena ricevuto da Daniele. Primo passo: anteprima della A e della B, Riccardo le guarda e dice cosa
  cambiare; poi `npm install` e `npx playwright install --with-deps chromium` per avere `check.mjs`. Nessun `.env` ancora.
