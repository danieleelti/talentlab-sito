# Piano: tutte le pagine del sito nella demo (17/11/2026)

Il sito vero ha 17 pagine (sitemap), la demo ne aveva 4. Obiettivo: mettere nella demo **tutti i contenuti del sito**
con il design «Bussola d'oro» già fatto (vedi `design.md`, `sito/assets/css/site.css`, `sito/assets/js/site.js`).

## Regole fisse (Daniele)
1. **Testi e nomi solo dal sito**: la fonte è `scrape/v2/<slug>.txt` (testo in ordine di lettura: colonne `y x [font] testo`)
   con lo screenshot `scrape/v2/shots/<slug>.png` per capire la struttura. Si può riordinare, spezzare titolo/testo,
   sistemare punteggiatura e refusi evidenti («organizzazzioni» → «organizzazioni», «Perchè» → «Perché», «E' ciò» → «È
   ciò», «un organizzazione» → «un'organizzazione»). Niente testi inventati, niente titoli che il sito non ha (se una
   voce sul sito non ha titolo, resta senza), niente nomi di persone. Il nome del titolare (Riccardo) NON va sul sito.
2. Controllo: `python3 -I tools/audit-testi.py` deve dire «testi fuori dal sito: 0».
3. Mai usare il logo bianco di TeamBuilding.it (`scrape/v2/img/7fd16299.png`): TeamBuilding.it solo come testo/link.
4. Telefono prima; scorrimento mai bloccato; `prefers-reduced-motion` sempre rispettato.
5. Niente segreti nei file; commit frequenti (i subagenti in parallelo NON fanno commit: lo fa la regia).

## Pagine (percorso nella demo = slug del sito, tranne il coaching cycle senza doppio trattino)
| Pagina | Sorgente scrape | Uscita demo | Foto eroe | Altre foto |
|---|---|---|---|---|
| Home | home | `index.html` (c'è) | bussola | — |
| Strategic System | strategic-system | `strategic-system/` | ss-bivio | ss-persone, ss-team, ss-organizzazioni |
| Il nostro approccio | il-nostro-approccio | `il-nostro-approccio/` | approccio-luce | approccio-corridoio (banda finale) |
| Campi di azione | campi-di-azione | `campi-di-azione/` | campi-vetta | campo-choose, campo-develop, campo-connect, campo-grow (schede con testo dentro) |
| Executive Financial Search | executive-search | `executive-search/` (c'è) | riccardo-skyline-v2 | team-lavagna, palazzo |
| Coaching Cycle | executive-search--coaching-cycle | `executive-search-coaching-cycle/` | cycle-colloquio | bussola-taccuino (banda finale) |
| Divisione Angel | la-divisione-angel | `la-divisione-angel/` | angel-roma | campi-vetta (banda «Il nostro vero cliente sei tu») |
| Divisione Angel: il percorso | divisione-angel-il-percorso | `divisione-angel-il-percorso/` | bussola-taccuino | percorso-pontile (banda finale) |
| Career Transition | career-transition | `career-transition/` | career-donna | campi-vetta (banda finale) |
| C4C: Coaching for Change | coaching-4-change | `coaching-4-change/` | c4c-scrivania | strada (banda finale) |
| Executive Coaching | executive-coaching | `executive-coaching/` (c'è) | titolare-platea | strada |
| Il metodo | executive-coaching-il-metodo | `executive-coaching-il-metodo/` | metodo-sartoria | metodo-strumenti (infografica) |
| Team Coaching | team-coaching | `team-coaching/` | riunione | — |
| Team Coaching + Team Building | team-coaching-team-building | `team-coaching-team-building/` | tctb-scalata | — |
| Formazione & Sviluppo | learning-development | `learning-development/` | futuro (sfondo velato) | — (sul sito c'è solo l'avviso «Stiamo aggiornando la sezione Formazione / saremo online a breve», dentro l'immagine 33f7caab: trascriverlo come testo) |
| Contatti | contatti | `contatti/` (c'è) | riunione | — |

Title delle pagine: dal JSON `scrape/v2/<slug>.json` (togliere « - talentlabconsulting»); description dal JSON, se vuota
quella della home. Il metodo ha title sbagliato sul sito («Home Page»): usare «Executive Coaching: il metodo | Talent
Lab OS». Formazione & Sviluppo: «Formazione & Sviluppo | Talent Lab OS».

## Foto nuove (in `scrape/v2/img/<hash8>.<ext>`) → nome asset (da aggiungere in `tools/assets.sh`)
ss-bivio=71f9f32b · ss-persone=b0883d83 · ss-team=99196c12 · ss-organizzazioni=ea4c099b · approccio-luce=514093fd ·
approccio-corridoio=7a04c897 · campi-vetta=602ae3cc · campo-choose=8006135e · campo-develop=e7fc3c74 ·
campo-connect=ef9ac4de · campo-grow=97de1baa · cycle-colloquio=d5146c10 · bussola-taccuino=ee554312 ·
angel-roma=524c5c9e · percorso-pontile=1f247d4e · career-donna=71fcc9ff · c4c-scrivania=92b2965e ·
metodo-sartoria=d917a48c · metodo-strumenti=4cb712ba · tctb-scalata=d1cac468. (Non usare 7fd16299 = logo bianco TB;
33f7caab = avviso Formazione, solo da trascrivere.)

## Navigazione (gruppi = voci del menu del sito)
- **Strategic System**: Strategic System · Il nostro approccio · Campi di azione
- **Executive Search**: Executive Financial Search · Coaching Cycle
- **Divisione Angel**: Divisione Angel · Divisione Angel: il percorso · Career Transition · C4C: Coaching for Change
- **Executive Coaching**: Executive Coaching · Il metodo
- **Team Coaching**: Team Coaching · Team Coaching + Team Building
- poi **Formazione & Sviluppo** e **Contatti**; Home dal logo.
Computer (≥1280 px): barra con i 5 gruppi a tendina (bottone con `aria-expanded`, si apre con clic, tastiera e
passaggio del mouse, si chiude con Esc e clic fuori) + Contatti + bottone oro «Parla con il nostro Team».
Sotto i 1280 px: bottone «Menu» → menu a tutto schermo con i gruppi (etichetta piccola oro + link in Bodoni), che
scorre se è più alto dello schermo; in fondo «Chatta con noi» e «Scrivici». Footer: colonne per gruppo + Formazione &
Sviluppo + Contatti + Privacy.

## Componenti nuovi (markup da usare identico nelle pagine; CSS in `site.css`)
```html
<!-- Eroe interno: c'è già .hero.hero--page; in più il sottotitolo -->
<p class="hero__sub" data-hero-item>Sottotitolo in Bodoni corsivo</p>

<!-- Testo a due colonne: titolo a sinistra, testo a destra -->
<div class="split"><div><p class="label" data-reveal>Etichetta</p><h2 class="h2" data-split>Titolo <em>chiave</em>.</h2></div>
  <div><p class="lead" data-reveal>Testo</p></div></div>

<!-- Schede (voci non in sequenza). --cols 2..4; telefono 1 colonna, tablet 2. Icona, titolo e testo facoltativi -->
<div class="cards" style="--cols:3">
  <article class="card" data-reveal data-spotlight><span class="card__icon">[[icon nome]]</span>
    <h3 class="card__title">Titolo</h3><p>Testo</p></article>
</div>

<!-- Fasi con elenco puntato (Divisione Angel: il percorso) -->
<ol class="phases"><li class="phase" data-reveal><span class="phase__num">01</span><h3 class="phase__title">Titolo</h3>
  <ul><li>Voce</li></ul></li></ol>

<!-- Tessere con foto (Strategic System: ambiti; Campi di azione: schede-poster con link) -->
<div class="tiles" style="--cols:3">
  <article class="tile" data-reveal><div class="tile__media">[[pic name="…" sizes="(min-width: 900px) 33vw, 100vw" alt="…"]]</div>
    <div class="tile__body"><h3 class="tile__title">Persone</h3><p>Testo</p></div></article>
  <a class="tile tile--poster" href="{{R}}executive-search/" data-reveal><div class="tile__media">[[pic …]]</div></a>
</div>

<!-- Banda finale con foto e frase grande (non sticky) -->
<section class="band section--dark" aria-label="…"><div class="band__media">[[pic name="…" sizes="100vw" alt="…"]]</div>
  <div class="band__veil"></div><div class="wrap band__inner"><p class="quote" data-split>Frase <em>finale</em>.</p></div></section>

<!-- Immagine-documento (infografica) in cornice, cliccabile per vederla grande -->
<figure class="figure" data-reveal><a href="{{R}}assets/img/metodo-strumenti-1600.jpg" target="_blank" rel="noopener">[[pic …]]</a></figure>
```
Già pronti e da riusare: `.track` (passi in sequenza con linea oro, `--n` fino a 6, `.track__icon` o `.track__num`),
`.areas` (2×2 asimmetrico), `.featlist`, `.steps` + quadrante (solo Executive Search), `.lightup` (frase che si accende,
sticky: al massimo una per pagina), `.cta` (chiamata finale). Ogni pagina nuova finisce con: banda finale del sito (se
c'è) → `.cta` standard («Parla con il nostro *Team*.» + «Per richiedere informazioni sui nostri servizi o per essere
ricontattato dal nostro Team di esperti.» + Scrivici / Chatta con noi). Icone: sprite Phosphor light in
`sito/assets/img/icons.svg` (si aggiungono in `tools/assets.sh`, variabile ICONS).

## Contenuti per pagina (struttura; i testi esatti dallo scrape)
- **Strategic System**: eroe (Il nostro framework / Un sistema più possibilità di intervento / testo / a destra «Un
  framework comune · interventi indipendenti · soluzioni costruite sul bisogno»); «Come funziona lo Strategic System» +
  testo; schede Struttura solida · Flessibilità · Integrazione; «Ambiti di applicazione»: tessere 01 Persone · 02 Team ·
  03 Organizzazioni (solo i testi che il sito ha); banda «Diversi ambiti un'unica direzione» + bottone «Scopri il nostro
  framework» → campi-di-azione.
- **Il nostro approccio**: eroe «Il Talento non è punto di arrivo è il punto da cui partire» + i 3 testi; «Il nostro
  approccio» / «Dall'identificazione allo sviluppo» / «Un percorso integrato» + testo; track Orientare · Sviluppare ·
  Generare valore (con i testi; il primo elemento del sito ha solo l'icona); «La nostra convinzione» = `.lightup` «Il
  Talento genera valore quando il potenziale trova una direzione» su approccio-corridoio.
- **Campi di azione**: eroe (Campi di azione / Un framework diversi campi di azione / testo / «Stessi principi contesti
  diversi risultati concreti»); 4 tessere-poster con link: Choose → executive-search, Develop → executive-coaching,
  Connect → team-coaching, Grow → learning-development (alt = testo scritto nell'immagine); «Un framework integrato e
  flessibile» + testo (con «autonomamente» e «dialogare» in evidenza); schede Metodologie integrate · Competenze
  multidisciplinari · Valore sostenibile; banda «Diversi ambiti un'unica direzione».
- **Executive Financial Search** (aggiornare): «Più di una ricerca» ora ha: Formazione manageriale — Metodi, strumenti,
  simulazioni · (senza titolo) Conduzione one to one, analisi e valutazione · Analisi e reportistica — Dati, insight e
  raccomandazioni.
- **Coaching Cycle**: eroe (Develop / Executive Search Coaching Cycle / Trasformare l'esperienza di recruiting in
  competenza manageriale / testo); «Il nostro processo»: track Analisi · (senza titolo: Affiancamento su colloqui
  reali…) · Debrief · Sviluppo e consolidamento + frase «Dall'esperienza delle persone alla crescita delle
  organizzazioni»; «Gli strumenti del sistema»: schede Executive Search Coaching Cycle · Affiancamento al colloquio ·
  Executive Search Advisor · (senza titolo: Sessione dedicata al candidato…) · Talent Units; banda su bussola-taccuino
  con «Executive Search Coaching Cycle» + testo finale.
- **Divisione Angel**: eroe (Divisione Angel / Non cerchiamo una persona per un'azienda, cerchiamo l'azienda giusta per
  la persona / sottotitolo Executive Career Advisory… / testo); track Rilevare · Ricercare · Selezionare · Connettere +
  bottone «Scopri» → il percorso; «Perché Divisione Angel» (+ «Un percorso su misura dalla persona all'opportunità»):
  schede Approccio sartoriale · Conoscenza del mercato · Esperienza nel settore · Talent Units; banda su campi-vetta «Il
  nostro vero cliente sei tu».
- **Il percorso**: eroe (Divisione Angel / Il percorso / Dalla tua storia alle migliori opportunità / testo / «Stessa
  professione nuove opportunità per il tuo futuro»); «Le fasi del percorso»: `.phases` Analisi personale · (lente,
  senza titolo: mappatura del settore…) · Definizione delle opportunità · Accompagnamento nel processo · 05 (sul sito ha
  di nuovo il titolo «Accompagnamento nel processo»: qui senza titolo, solo l'elenco); banda su percorso-pontile «Nuove
  prospettive Stessa passione».
- **Career Transition**: eroe (Career Transition / Prima di scegliere l'azienda scegli la professione / Comprendere il
  ruolo… / testo); schede (6, `--cols:3`) Profession & Economics · Role & Organization · (senza titolo: Strategie e
  modalità di comunicazione…) · Skill & Fit · Market Potential · Business Planning; banda su campi-vetta «Prima di
  scegliere l'azienda è importante comprendere e scegliere la professione».
- **C4C**: eroe (C4C / Coaching for Change / Cambiare non significa solo scegliere. Significa prepararsi alla scelta /
  2 testi); «Le fasi del percorso»: track Preparazione · (senza titolo: Analisi post colloquio…) · Profilo · Mercato ·
  Clientela (ordine dallo screenshot); schede Metodo ed esperienza nel settore · Approccio personalizzato · Visione
  realistica · Supporto continuativo; banda su strada «Nuove strade nuove prospettive».
- **Executive Coaching** (aggiornare): aree ora con titolo Leadership · Decision making · People management ·
  Performance; approccio Centrato sulla persona · Utilizzo di framework proprietari · Orientato all'azione · Impatto
  nel tempo (testi dallo scrape v2); rivedere eroe e banda come sul sito ora.
- **Il metodo**: eroe (Il metodo / Executive Coaching / Un percorso su misura per un impatto reale / testo); «Le fasi
  del percorso»: track Mapping · Deep scan · Focus · Action · Evolution con i testi del sito (NB: sul sito le prime 4
  riusano i testi delle aree di intervento: riportarli così e segnalarlo nel resoconto); «I nostri strumenti
  proprietari»: `.figure` con metodo-strumenti (alt con il testo leggibile).
- **Team Coaching**: eroe (Connect / Team Coaching / Team più consapevoli, risultati duraturi / testo); «Le aree di
  intervento»: schede Alignment · (senza titolo: Fiducia, ascolto…) · Collaboration · Performance (senza testo sul sito)
  + link «Team Coaching + Team Building».
- **Team Coaching + Team Building**: eroe (Connect / Team Coaching + Team Building / L'esperienza attiva il team… /
  testo); «Il nostro modello di integrazione»: track Experience · Observe · Debrief · Insight · Transfer · Change;
  «Team Building Strategic Partner»: testo con Teambuilding.it + riquadro «Per informazioni sulle attività di Team
  Building» + bottone «Vai alla sezione Formazione» → https://www.teambuilding.it/formazione/ (target _blank).
- **Formazione & Sviluppo**: eroe corto con l'avviso trascritto dall'immagine.
- **Home** (aggiornare): pannello 03 Connect con «Scopri di più» → team-coaching-team-building/ (come il sito).

## Prove (per ogni pagina)
`node tools/build.mjs` → `python3 -I tools/audit-testi.py` (0) → server locale
(`python3 -m http.server 8765 --bind 127.0.0.1 --directory <dir con link riccardo → sito>`) →
`node tools/check.mjs http://127.0.0.1:8765/riccardo/ <out> all <pagine>`: 0 errori, niente scorrimento orizzontale;
guardare gli screenshot (telefono e computer). La pubblicazione (`tools/deploy.sh`) la fa la regia.
