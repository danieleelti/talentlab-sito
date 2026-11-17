# Talent Lab OS — il sito

Restyling del sito https://talentlabconsulting.it/ (Talent Lab OS — Strategic System), in due versioni: **A «Notte e oro»**
e **B «Verde acido»**. Sito statico: HTML, CSS, JS, font e immagini, niente database, niente server applicativo.
Fatto il 17/11/2026 da Daniele (TeamBuilding.it) con Claude Code; da qui è di Riccardo, che lo fa evolvere con il suo Claude Code.

- `sito/` e `sito-b/` — le due versioni **già pronte da vedere**: `python3 -m http.server 3500 --bind 127.0.0.1 --directory sito`
- `src/` — i sorgenti (16 pagine + testata, piè di pagina, head) → `node tools/build.mjs` → `sito/` e `sito-b/`
- `design.md` — il design completo (direzione, colori, caratteri, testi pagina per pagina, animazioni)
- `docs/` — design delle due versioni, piano delle pagine, prompt delle immagini generate
- `foto-titolare/` — le foto del titolare (originali); `scrape/` — testi, immagini e brochure del sito originale (17/11/2026)
- `tools/` — build, controllo con Chromium, verifica dei testi, rigenerazione immagini/font/icone, pubblicazione FTP

Le istruzioni per Claude sono in `CLAUDE.md`. Per gli strumenti: Node 22, `npm install`, Python 3.
