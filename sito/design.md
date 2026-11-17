# Talent Lab OS — design del restyling «Bussola d'oro»

Documento di design per il restyling di **talentlabconsulting.it** (Talent Lab OS — Strategic System, marchio di OCC
Consulting Srl). Serve a due cose: incollarlo in **Claude Design** per generare le schermate, e guidare la costruzione
della demo statica pubblicata su **https://www.teambuildingsrl.it/riccardo/** (non indicizzata).

- Data: 17/11/2026. Scritto da Claude (Opus) per Daniele, sul materiale raccolto il 17/11 dal sito.
- Fonti: sito attuale (primo giro: 4 pagine, testi in `scrape/*.txt`, screenshot in `scrape/shots-small/`; secondo giro
  del 17/11: tutte le 17 pagine della sitemap in `scrape/v2/`, piano in `docs/piano-pagine-nuove.md`), immagini originali
  in `scrape/img/` e `scrape/v2/img/`, foto del titolare in `foto-titolare/` (URL pubblici sotto, §10). La brochure
  (`scrape/brochure/`) è servita solo come riferimento visivo.
- **Testi: solo quelli del sito attuale** (decisione di Daniele, 17/11/2026): vedi la regola all'inizio del §5.
- **Due versioni da valutare (17/11/2026)**: per carattere e colori valgono `docs/design-A-notte-e-oro.md` (A «Notte e
  oro», Newsreader al posto di Bodoni Moda + Hanken Grotesk, demo https://www.teambuildingsrl.it/riccardo/) e
  `docs/design-B-verde-acido.md` (B «Verde acido», Instrument Sans, bianco/inchiostro/verde acido, foto in bianco e
  nero, demo https://www.teambuildingsrl.it/riccardo2/). Struttura, testi e animazioni restano quelli di questo file:
  i testi d'esempio dei due documenti (alcuni presi dalla brochure) non vanno sul sito.

---

## 0. Prompt da incollare in Claude Design

> Ridisegna il sito di una boutique consultancy italiana di Executive Search e Executive Coaching per banche, reti di
> consulenza finanziaria, private banking e wealth management: Talent Lab OS. Segui il documento allegato (design.md):
> direzione «Bussola d'oro», notte blu + platino + luce dorata del tramonto, titoli in Bodoni Moda, testi in Hanken
> Grotesk, una bussola d'oro come firma visiva. Le pagine sono quelle del sito (Home, Executive Search, Executive
> Coaching, Contatti più le 12 del §5.5), ognuna in versione telefono (390 px) e computer (1440 px). Usa i testi esatti del documento (sono tutti presi dal sito
> attuale: non aggiungerne, non inventare nomi) e le immagini dagli URL
> del §10. Effetti forti ma eleganti da private banking: niente neon, niente viola, niente card tutte uguali, niente
> testo sfumato. Il telefono viene prima.

---

## 1. Concept

**«Bussola d'oro»: il sito diventa la versione viva della brochure.** Notte blu, platino del logo Φ, luce dorata
dell'ora del tramonto: è già l'identità di Talent Lab OS (brochure, foto, logo), il sito attuale semplicemente non la
esprime. La firma è una **bussola d'oro** che attraversa il sito e «trova la direzione» mentre si scorre — è la frase
del cliente: *il talento genera valore quando il potenziale trova una direzione*. Effetti forti ma da private banking:
luce, profondità, precisione, materiali (platino, carta avorio, vetro scuro); lo scorrimento resta sempre libero e il
telefono viene prima.

**Direzioni considerate** (scelta la A):
- **A. Bussola d'oro** — notte/avorio a capitoli, bussola animata come filo conduttore, luce dorata. Massimo «wow»
  coerente col brand, leggero su telefono.
- B. Carta e inchiostro — tutto chiaro, editoriale, foto virate oro, effetti solo tipografici. Elegante ma poco «wow»:
  non stupisce.
- C. Cinema — scrollytelling a scene pinnate a tutto schermo, video. Molto «wow» ma pesante su telefono e con scene che
  «si bloccano»: contro i gusti di Daniele.

## 2. Il sito attuale: cosa non va

1. **Non è responsive**: `viewport=1024` fisso, sul telefono si vede il desktop rimpicciolito (testo a 6-7 px).
2. Tutto in posizione assoluta (Aruba SuperSite): ordine di lettura casuale per screen reader e motori.
3. Menu solo «hamburger» anche su computer; nessuna CTA visibile in testata.
4. Icone raster generate con ChatGPT, sgranate e incoerenti (alcune con fondo nero).
5. Titoli mancanti: la prima fase del processo e due aree del coaching non hanno titolo.
6. «Segui la nostra pagina LinkedIn» non è un link; il form dipende dal backend Aruba.
7. Banner cookie invasivo che copre metà schermo; caricati 5 font Google (Muli, Open Sans, Poppins, Cormorant, Roboto).
8. Gerarchia piatta: tutto della stessa importanza, nessun ritmo tra sezioni; la brochure è molto più curata del sito.

## 3. Token

### 3.1 Colori (60% notte/avorio · 30% platino/inchiostro · 10% oro)
| Token | Hex | Ruolo |
|---|---|---|
| `--notte-950` | `#050c18` | fondo più profondo (footer, menu telefono) |
| `--notte-900` | `#021629` | **blu del brand** (testata originale `rgb(0,22,41)`), fondo dei capitoli scuri |
| `--notte-800` | `#0a2140` | superfici su scuro (pannelli, card) |
| `--notte-700` | `#143058` | bordi attivi, hover su scuro |
| `--platino-50` | `#f2f4f7` | titoli su scuro |
| `--platino-200` | `#c9d1db` | testo su scuro |
| `--platino-400` | `#8f9bab` | testo secondario su scuro |
| `--avorio-50` | `#f6f2ea` | fondo dei capitoli chiari («carta») |
| `--avorio-100` | `#ece5d8` | fascia chiara alternata |
| `--inchiostro-900` | `#0b1626` | testo su chiaro |
| `--inchiostro-600` | `#46536a` | testo secondario su chiaro |
| `--oro-300` | `#e2bd78` | oro su scuro: parole in corsivo, numeri, linee |
| `--oro-400` | `#d4a14f` | oro pieno: bottone primario, ago della bussola |
| `--oro-600` | `#9a6b22` | oro su chiaro solo per linee e testo grande |
| `--oro-700` | `#835a1b` | oro su chiaro per testo piccolo |
| `--linea-scura` | `rgba(233,237,242,.14)` | filetti 1 px su scuro |
| `--linea-chiara` | `rgba(11,22,38,.12)` | filetti 1 px su chiaro |

Contrasti verificati (WCAG): platino-50 su notte-900 16,6:1 · platino-200 11,9:1 · platino-400 6,5:1 · oro-300 10,3:1 ·
inchiostro-900 su avorio-50 16,3:1 · inchiostro-600 7,0:1 · oro-700 5,5:1 · notte-900 su oro-400 (testo del bottone)
7,8:1. Niente nero puro né bianco puro. Un solo accento: l'oro.

### 3.2 Tipografia (font self-hosted, woff2, `font-display: swap`)
- **Display: Bodoni Moda** (variabile, asse `opsz` 6-96, pesi 400-700, corsivo). Bodoni è di Parma: precisione
  italiana, il registro del private banking. Sostituisce Cormorant Garamond restando nella famiglia dei serif classici
  del logo. Titoli in tondo 500, **una parola chiave per titolo in corsivo oro** (`--oro-300` su scuro, `--oro-700`
  su chiaro). `font-optical-sizing: auto`.
- **Testo e interfaccia: Hanken Grotesk** (variabile 300-700, corsivo). Grottesco pulito e caldo, leggibile a 15-16 px.
- Etichette: Hanken 600, maiuscolo, `letter-spacing: .16em`, 12 px (il «TALENT LAB CONSULTING ——— 04» della brochure).

| Ruolo | Dimensione | Interlinea | Note |
|---|---|---|---|
| Display (H1 eroe) | `clamp(2.6rem, 1.4rem + 5.6vw, 6.75rem)` | 0.98 | Bodoni 500, `letter-spacing: -0.015em` |
| H2 | `clamp(2rem, 1.25rem + 3.2vw, 4.25rem)` | 1.02 | Bodoni 500 |
| H3 | `clamp(1.375rem, 1.1rem + 1.1vw, 2rem)` | 1.15 | Bodoni 500 |
| Citazione | `clamp(1.75rem, 1.1rem + 3vw, 3.75rem)` | 1.12 | Bodoni 400 corsivo/tondo |
| Lead | `clamp(1.0625rem, 1rem + .4vw, 1.3125rem)` | 1.6 | Hanken 400 |
| Corpo | `1rem` → `1.0625rem` da 900 px | 1.65 (1.72 su scuro) | Hanken 400, max 62ch |
| Etichetta | `.75rem` | 1.3 | Hanken 600 maiuscolo |

### 3.3 Spazi, griglia, forme
- Scala 4 pt: `--sp-3xs 4` · `2xs 8` · `xs 12` · `sm 16` · `md 24` · `lg 32` · `xl 48` · `2xl 64` · `3xl 96` · `4xl 144`.
- Sezioni: padding verticale `clamp(80px, 11vw, 168px)`; margini laterali `clamp(20px, 5vw, 64px)`; contenuto max 1320 px.
- Griglia 12 colonne (gap 24-32 px) da 900 px; 1 colonna sotto 900 px (niente layout asimmetrici sul telefono).
- Raggi: 2 px immagini e pannelli, 4 px bottoni e campi, 999 px solo per la pillola contatti del telefono.
- Ombre tinte di blu: su scuro `0 40px 80px -40px rgba(1,6,14,.75)`; su chiaro `0 24px 48px -28px rgba(11,22,38,.28)`.
- Materia: grana pellicola leggerissima (SVG `feTurbulence`, opacità .05) su uno strato fisso; filetti 1 px platino;
  vetro scuro solo per la testata quando si scorre (`backdrop-filter: blur(14px) saturate(140%)` + bordo 1 px).
- Breakpoint: 640 · 900 · 1200 · 1600.

## 4. Architettura

- Pagine: le 16 del menu del sito (la sitemap ne ha 17: in più `home-new`, una variante della home fuori menu): `index.html` (Home) e
  una cartella per pagina con lo slug del sito (`executive-search--coaching-cycle` diventa
  `executive-search-coaching-cycle/`): elenco e struttura in §5.5. Privacy e cookie: link alle pagine originali
  (`https://talentlabconsulting.it/privacy-policy`, `/cookie-policy`). Link relativi (la demo vive in `/riccardo/`).
- **Menu = voci del menu del sito, a gruppi** (solo quelle etichette):
  **Strategic System** (Strategic System · Il nostro approccio · Campi di azione) · **Executive Search** (Executive
  Financial Search · Coaching Cycle) · **Divisione Angel** (Divisione Angel · Divisione Angel: il percorso · Career
  Transition · C4C: Coaching for Change) · **Executive Coaching** (Executive Coaching · Il metodo) · **Team Coaching**
  (Team Coaching · Team Coaching + Team Building) · poi **Formazione & Sviluppo** e **Contatti**. La Home si apre dal logo.
- **Testata da computer (≥ 1280 px)**: logo platino a sinistra; barra con i 5 gruppi a tendina + «Contatti» + bottone
  oro «Parla con il nostro Team». Ogni gruppo è un bottone (`aria-expanded`) che apre una tendina di vetro scuro con i
  link in Bodoni: si apre con clic, tastiera (Invio/Spazio, freccia giù; frecce, Inizio/Fine dentro la tendina) e
  passaggio del mouse; si chiude con Esc (il focus torna al bottone), clic fuori, Tab che esce dal gruppo, o quando la
  testata si nasconde. Gruppo della pagina attiva con filetto oro sotto, pagina attiva in corsivo oro (`aria-current`).
  Formazione & Sviluppo non sta nella barra (non c'è spazio a 1280 px): è nel menu del telefono, nel footer e nelle
  schede dei Campi di azione. Trasparente sull'eroe, poi vetro scuro; si nasconde scorrendo in giù e torna scorrendo in su.
- **Sotto i 1280 px** (telefono e tablet): logo + (da 900 px) bottone oro + bottone «Menu» (parola + due linee). Menu a
  tutto schermo che si apre a cerchio dall'angolo del bottone: i gruppi con etichetta piccola oro e link in Bodoni (1
  colonna sul telefono, 2 da 640 px, 3 da 1000 px) che entrano in cascata; la parte centrale scorre se è più alta dello
  schermo; bussola che ruota lenta sullo sfondo; in fondo, fissi, «Chatta con noi» (WhatsApp) e «Scrivici».
  Logo = Home, Esc/«Chiudi» per uscire, focus intrappolato.
- **Pillola contatti (solo telefono)**: dopo l'eroe compare in basso una pillola con «Chatta con noi» e «Scrivici» (48 px,
  rispetta la safe area); sparisce sul footer e col menu aperto.
- **Footer** (notte-950): grande riga «Talent Strategy. *Human Impact.*», «Siamo una Boutique consultancy specializzata
  nello sviluppo del talento.», mappa del sito con una colonna per gruppo del menu più «Formazione & Sviluppo»
  (2 colonne sul telefono, 3 da 700 px), «Contatti» (e-mail, «Chatta con noi · +39 380 633 8747», «Scarica la nostra
  Brochure»), «Privacy» («Informativa sulla privacy», «Informativa sui Cookie», «Scrivici»), dati societari («Marchio di
  Proprietà di OCC Consulting Srl · P.iva: 02180480689 · CF: 02180480689»), «Torna su» con l'ago della bussola che punta
  in alto.
- Niente banner cookie nella demo: nessun cookie, nessun font o script di terze parti.

## 5. Pagina per pagina

**Regola dei testi (Daniele, 17/11/2026): sul sito solo testi e nomi del sito attuale** (`scrape/*.txt`, title e
description delle pagine, testi dei link). Niente frasi della brochure, niente testi scritti da noi, niente nomi di
persone o aziende che il sito non nomina. Si può solo riordinare, spezzare in titolo + testo e sistemare la
punteggiatura. Controllo automatico: `python3 -I tools/audit-testi.py` deve dire «testi fuori dal sito: 0» (fanno
eccezione le parole d'interfaccia: Menu, Chiudi, Scorri, Copia, Fase, Torna su, messaggi del modulo).

Capitoli alternati: **scuro** (notte-900, foto al tramonto) per l'emozione, **chiaro** (avorio) per leggere.

### 5.1 Home

**H1 — Eroe (scuro, 100svh)** · foto `bussola`, polvere d'oro su canvas, bussola d'oro nell'angolo in basso a destra
- Etichetta (title del sito): «Executive Search e Coaching per banche e reti»
- H1: «Talent Strategy. / Human *Impact.*»
- Lead (description del sito): «Talent Lab OS affianca banche e reti di consulenza finanziaria nella ricerca di talenti
  e nello sviluppo di leader e team con coaching e formazione.»
- Bottoni: «Parla con il nostro Team» (→ contatti) · «Scarica la nostra Brochure» (PDF)
- Effetto: entrata in 1,4 s (§6.2), foto da `scale 1.12`, parallasse in uscita; la bussola segue il puntatore su
  computer e oscilla con lo scroll sul telefono.

**H2 — Il punto di partenza (chiaro)** · griglia 7/5, foto `futuro` verticale con tendina
- Etichetta «Il punto di partenza» · H2 «L'esperienza diventa *metodo*.»
- Lead: «Le organizzazioni non hanno semplicemente bisogno di trovare persone competenti, hanno bisogno di riconoscere
  il potenziale, attrarlo, farlo evolvere e trasformarlo in valore.»
- Sotto, a tutta larghezza, con filetto oro che si disegna: «Il talento genera valore quando il potenziale trova una
  *direzione*.»

**H2b — Il titolare (chiaro alternato, avorio-100)** · ritratto `titolare-ritratto` 4:5 con tendina + sigillo rotante
- Sigillo blu notte con l'emblema Φ e la scritta circolare «TALENT LAB OS · STRATEGIC SYSTEM · HUMAN IMPACT» (parole
  del logo e del sito): gira piano e accelera, anche al contrario, con lo scroll.
- Etichetta «Talent Lab OS» · H2 «Siamo una Boutique consultancy specializzata nello *sviluppo del talento*.»
- Lead: «Uniamo esperienza, rigore metodologico e una profonda attenzione alle persone per supportare le aziende nel
  costruire organizzazioni più forti, consapevoli e orientate al futuro.»
- Link «Parla con il nostro Team →». Nessun nome in didascalia (il sito non lo nomina).

**H3 — Fascia in movimento (scuro)**: «Talent Strategy · Human Impact · Choose · Develop · Connect ·» in Bodoni,
corsivo platino alternato a tondo oro; scorre lenta, accelera e inverte con lo scroll.

**H4 — Un sistema completo (scuro)**
- H2 «Un sistema completo per un impatto *ad alto valore*.» · lead «Un sistema integrato di soluzioni per attrarre,
  sviluppare e connettere le persone, generando un impatto misurabile e duraturo.»
- Tre pannelli che si impilano (sticky; quello sotto scala a 0.93 e si scurisce):
  1. **01 Choose** — Strategy Recruiting · foto `uomo-skyline` · «Attraiamo e selezioniamo i migliori talenti, in linea
     con i valori e gli obiettivi della tua organizzazione.» · «Scopri di più →» (`executive-search/`)
  2. **02 Develop** — Leadership & Coaching · foto `titolare-formazione` · «Supportiamo la crescita di leader e team,
     attraverso percorsi di sviluppo su misura e strumenti evidence-based.» · «Scopri di più →» (`executive-coaching/`)
  3. **03 Connect** — Team Development · foto `team-cerchio` · «Costruiamo Team più coesi, consapevoli e performanti,
     valorizzando le relazioni e la collaborazione.» · «Scopri di più →» (`team-coaching-team-building/`, come sul
     sito ora); ancora `#connect`.

**H5 — Riconoscere il potenziale (scuro, 200svh con interno sticky)** · foto `vetta`
- Frase che si accende parola per parola: «Riconoscere il potenziale è l'inizio. Trasformarlo in valore è *la vera
  sfida.*» Mentre si accende, la luce del tramonto cresce.

**H7 — Chiamata finale (scuro)** · foto `team-parco` velata; la bussola grande in filigrana si ferma sul Nord
- H2 «Parla con il nostro *Team*.» · lead «Per richiedere informazioni sui nostri servizi o per essere ricontattato dal
  nostro Team di esperti.»
- Bottoni: «Scrivici» · «Chatta con noi» (WhatsApp) · «Scarica la nostra Brochure»

### 5.2 Executive Search

**S1 — Eroe (scuro)** · foto `riccardo-skyline-v2`: il titolare di spalle davanti allo skyline al tramonto (sul computer
l'inquadratura lo porta a destra del testo)
- Etichetta «Executive Search» · H1 «Specializzazione che diventa *metodo*.» · sotto-etichetta «Banking & Finance
  Specialist Practice»
- Lead: «Un percorso progettato per Banche, Reti di Consulenza Finanziaria, Private Banking e Wealth Management,
  costruito sulla conoscenza delle dinamiche professionali, organizzative e di sviluppo del settore.»
- In corsivo, a destra: «Persone giuste. / Organizzazioni forti.»

**S2 — Il nostro processo (scuro) — firma: il quadrante**
- H2 «Il nostro *processo*.»
- Quadrante-bussola con 5 tacche (una ogni 72°): l'ago punta la fase che si sta leggendo e alla fine torna a Nord.
  Computer: quadrante sticky a sinistra, fasi a destra (attiva piena, le altre al 35%). Telefono: barra sticky sotto la
  testata con quadrante piccolo e nome della fase.
  1. **Analisi** — «Analisi dell'azienda committente, del contesto, degli obiettivi di sviluppo e del bisogno di
     talenti.» (sul sito senza titolo: il titolo è la prima parola del testo)
  2. **Definizione** — «Definizione del profilo del candidato target e dei criteri di ricerca e valutazione.»
  3. **Progettazione** — «Progettazione della strategia e dell'iter di Executive Search, su misura per
     l'organizzazione.»
  4. **Azioni** — «Scouting, contatto, screening, assessment, colloqui e affiancamento al processo di scelta.»
  5. **Revisione** — «Analisi delle attività, feedback e reportistica per misurare i risultati e valorizzare
     l'investimento.»

**S3 — Più di una ricerca (chiaro)** · foto `team-lavagna` e `palazzo-people-ideas` verticali, sfalsate
- Etichetta «Più di una ricerca» · H2 «Un percorso di sviluppo per chi *guida il cambiamento*.»
- Lead: «Affianchiamo manager ed organizzazioni con formazione tecnica e supporto operativo per sviluppare le
  competenze necessarie a gestire direttamente sourcing, colloquio, valutazione e negoziazione.»
- Elenco con filetti e icone, come sul sito ora: «Formazione manageriale — Metodi, strumenti, simulazioni» · (senza
  titolo, il testo in Bodoni) «Conduzione one to one, analisi e valutazione» · «Analisi e reportistica — Dati, insight e
  raccomandazioni»

**S4 — Chiamata finale** come H7, con foto `strada-tramonto`.

### 5.3 Executive Coaching

**C1 — Eroe diviso (scuro)** · foto `titolare-platea`: il titolare che parla sorridendo a un gruppo di manager
- Computer: griglia 5/7, testo a sinistra sul blu, foto a tutta altezza a destra sfumata verso il blu. Telefono: foto
  sopra (56svh), testo sotto.
- Etichetta «Leadership & Coaching» · H1 «Executive *Coaching*.» · sottotitolo in Bodoni corsivo (come sul sito ora)
  «Percorsi di sviluppo per chi guida persone, decisioni e organizzazioni.» · bottone «Parla con il nostro Team»

**C2 — Coaching for change (chiaro)**
- Etichetta «Coaching for change» · testo grande in Bodoni che si accende parola per parola: «Il coaching per noi non è
  uno spazio astratto di riflessione, è un intervento costruito intorno alla persona, al ruolo e al contesto
  organizzativo reale, per trasformare consapevolezza e potenziale in comportamenti capaci di produrre *impatto e
  valore*.»
- Sotto: «Sviluppiamo percorsi di coaching individuale per leader, manager e professionisti che desiderano ampliare la
  propria consapevolezza per generare un impatto concreto e sostenibile nel proprio contesto professionale.»

**C3 — Le aree di intervento (scuro)** · griglia 2×2 asimmetrica (7/5 e 5/7), bordo che si illumina d'oro sotto il
puntatore; numero grande, titolo in Bodoni, testo. Come sul sito ora (scrape v2): tutte hanno il titolo; People
management non ha più il testo (vedi §9)
1. **Leadership** — «Identità manageriale, autorevolezza e capacità di guida. Una leadership più consapevole,
   pragmatica e sostenibile.»
2. **Decision making** — «Gestione delle complessità, responsabilità e qualità delle decisioni. Dalla riflessione
   all'azione, con maggiore lucidità e sicurezza.»
3. **People management** (senza testo sul sito ora; prima era «Relazioni, comunicazione, feedback e sviluppo delle
   persone. Team più motivati, allineati e orientati al risultato.»)
4. **Performance** — «Priorità, execution e trasformazione delle intenzioni in azione. Risultati più concreti e un
   impatto duraturo nel tempo.»

**C4 — Il nostro approccio (chiaro)** · quattro tappe su una linea oro che si disegna
1. **Centrato sulla persona** (senza testo sul sito ora; prima la tappa era senza titolo con «Un percorso strutturato
   basato su esperienza reale nel mondo del Banking & Finance.»)
2. **Utilizzo di framework proprietari** — «Utilizzo di framework di pronto utilizzo in risposta alle differenti
   esigenze del coachee. Creazione di strumenti customizzati sulle esigenze specifiche.»
3. **Orientato all'azione** — «Dalla consapevolezza personale e di ruolo al comportamento.»
4. **Impatto nel tempo** — «Cambiamento sostenibile e crescita continua.»

**C5 — Fascia in movimento**: «Coaching for change · Leadership · Decision making · People management · Performance ·»

**C6 — Citazione (scuro, sticky)** · foto `strada-tramonto`: «La consapevolezza diventa valore quando cambia *il modo
di agire.*» — si accende parola per parola.

**C7 — Chiamata finale** come H7, con foto `vetta`.

### 5.4 Contatti

**K1 — Eroe corto (scuro)** · foto `riunione` velata all'85%
- Etichetta «Contatti» · H1 «Parla con il nostro *Team*.» · lead «Per richiedere informazioni sui nostri servizi o per
  essere ricontattato dal nostro Team di esperti.»

**K2 — Due colonne (chiaro)**
- Sinistra, righe grandi con icona a tratto: **E-mail** info@talentlabconsulting.it (Copia, con conferma) · **Chatta
  con noi** +39 380 633 8747 (WhatsApp) · **Brochure** «Scarica la nostra Brochure». Sotto: «Marchio di Proprietà di
  OCC Consulting Srl · P.iva: 02180480689 · CF: 02180480689». LinkedIn: il sito dice «Segui la nostra pagina Linkedin»
  ma senza link; nella demo compare quando arriva l'URL.
- Destra, modulo «Scrivici» (etichette sopra i campi): **Nome** · **E-mail** · **Messaggio** · casella «Privacy
  Policy *» (link all'informativa) · bottone «Invia». Senza backend: valida in linea (errori sotto il campo,
  `aria-live`), poi compone una mail a info@ con oggetto «Richiesta informazioni dal sito»; conferma «Stiamo aprendo la
  tua app di posta» con «Copia il messaggio» come alternativa. In produzione si collega a un vero invio.

### 5.5 Pagine aggiunte (17/11/2026)

Le 12 pagine del secondo scrape (piano completo in `docs/piano-pagine-nuove.md`). Testi solo da `scrape/v2/<slug>.txt`
(ordine e struttura dallo screenshot `scrape/v2/shots/<slug>.png`): dove il sito non dà un titolo, la voce resta senza.
Ogni pagina: eroe interno (`.hero--page`, etichetta + H1 + eventuale `.hero__sub`) → sezioni → banda finale del sito
(`.band`, se c'è) → chiamata finale standard (`.cta`: «Parla con il nostro *Team*.» + «Per richiedere informazioni sui
nostri servizi o per essere ricontattato dal nostro Team di esperti.» + Scrivici / Chatta con noi). Componenti in §7.

- **Strategic System** (`strategic-system/`, eroe `ss-bivio`): «Il nostro framework» · «Un sistema più possibilità di
  intervento» · testo · a destra «Un framework comune · interventi indipendenti · soluzioni costruite sul bisogno» →
  `.split` «Come funziona lo Strategic System» → `.cards` Struttura solida · Flessibilità · Integrazione → «Ambiti di
  applicazione»: `.tiles` 01 Persone · 02 Team · 03 Organizzazioni (`ss-persone`, `ss-team`, `ss-organizzazioni`) →
  `.band` «Diversi ambiti un'unica direzione» + bottone «Scopri il nostro framework» (→ Campi di azione).
- **Il nostro approccio** (`il-nostro-approccio/`, eroe `approccio-luce`): «Il Talento non è punto di arrivo è il punto
  da cui partire» + i 3 testi → «Il nostro approccio / Dall'identificazione allo sviluppo / Un percorso integrato» +
  testo → `.track` Orientare · Sviluppare · Generare valore → «La nostra convinzione»: `.lightup` «Il Talento genera
  valore quando il potenziale trova una direzione» su `approccio-corridoio`.
- **Campi di azione** (`campi-di-azione/`, eroe `campi-vetta`): «Campi di azione» · «Un framework diversi campi di
  azione» · testo · «Stessi principi contesti diversi risultati concreti» → `.tiles` 4 `.tile--poster` con link
  (Choose → Executive Search, Develop → Executive Coaching, Connect → Team Coaching, Grow → Formazione & Sviluppo;
  `campo-*`, alt = testo dell'immagine, in `scrape/v2/testi-immagini.txt`) → `.split` «Un framework integrato e
  flessibile» (con «autonomamente» e «dialogare» in evidenza) → `.cards` Metodologie integrate · Competenze
  multidisciplinari · Valore sostenibile → `.band` «Diversi ambiti un'unica direzione».
- **Executive Financial Search** (`executive-search/`): §5.2.
- **Coaching Cycle** (`executive-search-coaching-cycle/`, eroe `cycle-colloquio`): «Develop» · «Executive Search
  Coaching Cycle» · «Trasformare l'esperienza di recruiting in competenza manageriale» · testo → «Il nostro processo»:
  `.track` Analisi · (senza titolo) · Debrief · Sviluppo e consolidamento + «Dall'esperienza delle persone alla crescita
  delle organizzazioni» → «Gli strumenti del sistema»: `.cards` (5) → `.band` su `bussola-taccuino` «Executive Search
  Coaching Cycle» + testo finale.
- **Divisione Angel** (`la-divisione-angel/`, eroe `angel-roma`): «Divisione Angel» · «Non cerchiamo una persona per
  un'azienda, cerchiamo l'azienda giusta per la persona» · «Executive Career Advisory…» · testo → `.track` Rilevare ·
  Ricercare · Selezionare · Connettere + «Scopri» (→ il percorso) → «Perché Divisione Angel» / «Un percorso su misura
  dalla persona all'opportunità»: `.cards` Approccio sartoriale · Conoscenza del mercato · Esperienza nel settore ·
  Talent Units → `.band` su `campi-vetta` «Il nostro vero cliente sei tu».
- **Divisione Angel: il percorso** (`divisione-angel-il-percorso/`, eroe `bussola-taccuino`): «Il percorso» · «Dalla tua
  storia alle migliori opportunità» · testo · «Stessa professione nuove opportunità per il tuo futuro» → «Le fasi del
  percorso»: `.phases` (5, due senza titolo) → `.band` su `percorso-pontile` «Nuove prospettive Stessa passione».
- **Career Transition** (`career-transition/`, eroe `career-donna`): «Prima di scegliere l'azienda scegli la
  professione» · «Comprendere il ruolo…» · testo → `.cards` (6, `--cols:3`) Profession & Economics · Role &
  Organization · (senza titolo) · Skill & Fit · Market Potential · Business Planning → `.band` su `campi-vetta` «Prima
  di scegliere l'azienda è importante comprendere e scegliere la professione».
- **C4C: Coaching for Change** (`coaching-4-change/`, eroe `c4c-scrivania`): «C4C» · «Coaching for Change» · «Cambiare
  non significa solo scegliere. Significa prepararsi alla scelta» · 2 testi → «Le fasi del percorso»: `.track`
  Preparazione · (senza titolo) · Profilo · Mercato · Clientela → `.cards` Metodo ed esperienza nel settore · Approccio
  personalizzato · Visione realistica · Supporto continuativo → `.band` su `strada` «Nuove strade nuove prospettive».
- **Il metodo** (`executive-coaching-il-metodo/`, eroe `metodo-sartoria`): «Il metodo» · «Executive Coaching» · «Un
  percorso su misura per un impatto reale» · testo → «Le fasi del percorso»: `.track` Mapping · Deep scan · Focus ·
  Action · Evolution (sul sito le prime 4 riusano i testi delle aree di Executive Coaching) → «I nostri strumenti
  proprietari»: `.figure` con `metodo-strumenti` (alt = testo dell'infografica).
- **Team Coaching** (`team-coaching/`, eroe `riunione`): «Connect» · «Team Coaching» · «Team più consapevoli, risultati
  duraturi» · testo → «Le aree di intervento»: `.cards` Alignment · (senza titolo) · Collaboration · Performance (senza
  testo) + link «Team Coaching + Team Building».
- **Team Coaching + Team Building** (`team-coaching-team-building/`, eroe `tctb-scalata`): «Connect» · «Team Coaching +
  Team Building» · «L'esperienza attiva il team…» · testo → «Il nostro modello di integrazione»: `.track` Experience ·
  Observe · Debrief · Insight · Transfer · Change → «Team Building Strategic Partner»: testo con Teambuilding.it (solo
  testo/link, mai il logo bianco) + riquadro «Per informazioni sulle attività di Team Building» + «Vai alla sezione
  Formazione» (→ https://www.teambuilding.it/formazione/, nuova scheda).
- **Formazione & Sviluppo** (`learning-development/`, eroe `futuro` velato): sul sito c'è solo l'avviso dentro
  un'immagine, qui trascritto come testo: «Stiamo aggiornando la sezione *Formazione*» · «saremo online a breve» ·
  «quando il potenziale trova direzione genera valore».

## 6. Motion system

### 6.1 Principi
1. **Una firma, tanti dettagli silenziosi**: la bussola e la luce dorata sono il «wow»; tutto il resto (rivelazioni,
   hover, bottoni) è preciso e breve.
2. **Lo scorrimento non si blocca mai**: niente scroll-jacking. Solo `position: sticky` dentro sezioni più alte
   (massimo 200svh) e animazioni legate allo scroll con `scrub` morbido (0.6 s).
3. **Solo `transform` e `opacity`** (più `clip-path` per le tendine). Niente animazioni di layout.
4. **Telefono prima**: su touch niente puntatore, parallasse più corta (±8%), meno particelle, scorrimento nativo.

### 6.2 Tempi e curve
- Curve: `--ease-out-expo: cubic-bezier(.16,1,.3,1)` (entrate) · `--ease-out-quart: cubic-bezier(.25,1,.5,1)`
  (interfaccia) · GSAP `expo.out` / `power3.out`. Niente rimbalzi né elastici.
- Durate: feedback 120-160 ms · stati 220-300 ms · rivelazioni 800-1000 ms · uscite al 75% dell'entrata.
- Cascate: 80-120 ms tra elementi; titoli riga per riga (`yPercent 110 → 0`, maschera).
- **Entrata dell'eroe (1,4 s)**: 0 ms foto da `scale 1.12` + velatura (2,4 s, continua sotto) · 150 ms riflesso
  platino sul logo · 250 ms etichetta · 350 ms H1 riga per riga · 700 ms lead · 850 ms bottoni · 600 ms la bussola si
  disegna (tratto) e l'ago oscilla smorzato fino a fermarsi.

### 6.3 Catalogo
| Effetto | Dove | Computer | Telefono | Movimento ridotto |
|---|---|---|---|---|
| Polvere d'oro (canvas) | eroe Home | 70 particelle, DPR ≤ 1.5 | 36 particelle | assente |
| Bussola (molla) | eroe, menu, H7, footer | segue il puntatore, torna a Nord | oscilla con la velocità di scroll | ferma a Nord |
| Quadrante del processo | Executive Search S2 | sticky 420 px, ago sulla fase | barra sticky 88 px | fasi in colonna, ago fermo |
| Pannelli impilati | Home H4 | sticky + scala .94 | sticky | colonna normale |
| Frase che si accende | Home H5, Coaching C2/C6 | scrub parola per parola | uguale | tutto acceso |
| Tendina sulle foto | foto di sezione | `clip-path` + parallasse interna | uguale, parallasse ±8% | foto ferma |
| Titoli a maschera | tutti gli H1/H2 | righe in cascata | uguale | statici |
| Fascia in movimento | Home H3, Coaching C5 | velocità legata allo scroll | uguale | ferma |
| Linea oro che si disegna | modelli a passi, citazioni | SVG `stroke-dashoffset` | uguale | linea piena |
| Bottoni magnetici + riflesso | bottoni primari | attrazione 6 px + riflesso | solo riflesso al tocco | solo cambio colore |
| Bordo che si illumina | pannelli delle aree, schede `.card` | luce oro sotto il puntatore | bordo statico | bordo statico |
| Parallasse delle bande | `.band`, `.cta` | foto ±8% (la foto è più alta della banda) | uguale | foto ferma |
| Tessere-poster | `.tile--poster`, `.figure` | zoom 1.045 + bordo oro al passaggio | bordo oro al tocco | solo bordo |
| Tendine della navigazione | testata ≥ 1280 px | dissolvenza + 8 px, freccia che ruota | — (menu a gruppi) | apertura secca |
| Barra di avanzamento | in cima | 2 px oro (CSS scroll-timeline) | uguale | assente |
| Cambio pagina | tutte | View Transitions: dissolvenza + 12 px, logo fermo | uguale | nessuna |
| Testata intelligente | tutte | si nasconde giù / torna su | uguale | uguale |

### 6.4 Librerie
GSAP 3.15 + ScrollTrigger + SplitText (righe con maschera), Lenis 1.3 (rotella più morbida su computer; sul telefono
scorrimento nativo). Tutto in locale, caricato in coda (`defer`). CSS per hover e stati.

## 7. Componenti
- **Bottone primario**: fondo oro-400, testo notte-900 (7,8:1), Hanken 600 15 px, padding 16×26, raggio 4; hover:
  riflesso diagonale che attraversa (600 ms) + attrazione magnetica; `:active` scala .98; focus: anello 2 px oro-300
  con distacco 3 px.
- **Bottone secondario**: bordo 1 px platino al 40% (su scuro) / inchiostro al 25% (su chiaro), testo pieno; hover
  bordo oro.
- **Link testuale**: sottolineatura 1 px che si disegna da sinistra (`scaleX`), freccia che avanza di 4 px.
- **Etichetta di sezione**: trattino oro 28 px + testo maiuscolo spaziato.
- **Pannello del framework**: notte-800, bordo `--linea-scura`, foto con alone caldo in alto, numero Bodoni 300 oro.
- **Fase del processo**: numero Bodoni grande, nome IT in H3, nome EN in etichetta, testo; attiva = piena + filetto oro.
- **Campi**: etichetta sopra, fondo avorio-50, bordo 1 px inchiostro al 25%, focus bordo oro-600 + anello; errore in
  `#a3341f` sotto il campo con icona.
- **Menu telefono**: vedi §4. **Pillola contatti**: vetro scuro, due bottoni da 48 px.
- **Componenti delle pagine aggiunte** (17/11; markup nel piano `docs/piano-pagine-nuove.md`, CSS in fondo a
  `site.css`; i nomi delle classi sono un contratto). Tutti prendono i colori dal capitolo (`.section--dark` /
  `.section--light`: variabili `--surface`, `--glow`, `--card-shadow`), quindi funzionano su scuro e su chiaro.
  - `.hero__sub`: sottotitolo dell'eroe in Bodoni corsivo, platino.
  - `.split`: titolo a sinistra (6/12), testo a destra (5/12) da 900 px; il testo parte all'altezza del titolo.
  - `.cards` / `.card` (`--cols` 2..4): telefono 1 colonna, tablet 2 (l'ultima dispari prende la riga), da 1100 px
    `--cols`. Superficie notte-800 (scuro) o carta #fbf9f4 con ombra (chiaro), icona oro 32 px, titolo Bodoni; la scheda
    senza titolo mostra il testo in Bodoni. Bordo che si illumina sotto il puntatore come `.area`.
  - `.phases` / `.phase`: numero Bodoni oro, titolo, elenco con trattini oro; filetto sopra con segmento oro;
    1 → 2 → 3 colonne (`--cols`).
  - `.tiles` / `.tile`: foto 16:10 + titolo e testo; `.tile--poster` 3:4 senza testo (è nell'immagine), link con zoom
    leggero e bordo oro al passaggio.
  - `.band`: foto a tutta larghezza (min 80svh), velo scuro a sinistra, frase grande `.quote` (+ testo o bottone);
    se segue una `.cta`, la foto della chiamata finale parte sfumata.
  - `.figure`: immagine-documento in cornice carta con bottone tondo «ingrandisci»; apre il JPG grande in un'altra scheda.
- **Icone**: SVG a tratto 1.5 px (set Phosphor «light»), mai sopra ogni titolo: solo nei contatti, nelle fasi e nei
  passi del modello. Concetti: lente (Analisi), profilo (Definizione), squadra/compasso (Progettazione), stretta di
  mano (Azione), grafico (Revisione), cappello (Formazione), dialogo (Colloqui), documento-grafico (Reportistica),
  busta, WhatsApp, file PDF, freccia.

## 8. Accessibilità, prestazioni, SEO
- Struttura semantica (header/nav/main/section/footer), un solo H1 per pagina, «Salta al contenuto», ordine di lettura
  = ordine visivo, `alt` in italiano su ogni foto, focus visibile, menu con `aria-expanded` ed Esc.
- `prefers-reduced-motion`: niente Lenis, particelle, parallasse, scrub; tutti i testi visibili; bussola ferma.
- LCP < 2,5 s su 4G: foto dell'eroe AVIF/WebP in 640/1024/1600/2000 px con `fetchpriority="high"` e `preload`; le
  altre `loading="lazy"`; font precaricati (2 file); JS totale < 120 kB compresso; canvas in pausa fuori schermo.
- Title e description: quelli originali per pagina. Demo: `<meta name="robots" content="noindex, nofollow">` +
  intestazione `X-Robots-Tag` (non deve fare concorrenza al sito vero).

## 9. Decisioni aperte (per Daniele / Riccardo)
1. Font: Bodoni Moda (proposta) o restare su Cormorant Garamond come oggi.
2. URL della pagina LinkedIn (il sito dice «Segui la nostra pagina Linkedin» ma non ha il link).
3. Modulo contatti: in produzione serve un invio vero (servizio form o script sul suo hosting).
4. Executive Coaching: sul sito ora (scrape v2) «People management» e «Centrato sulla persona» non hanno testo (nel
   primo scrape, la mattina del 17/11, c'erano: vedi §5.3). La demo segue il sito di adesso; si possono rimettere.

Decise da Daniele il 17/11/2026: testi e nomi solo dal sito attuale (fuori le frasi della brochure, il pilastro «Grow»,
la sezione Team Coaching + Team Building con TeamBuilding.it e i testi scritti da noi); niente nome sotto il ritratto.

## 10. Immagini (originali a piena risoluzione, URL pubblici)
| Nome breve | File locale | URL | Dove |
|---|---|---|---|
| `logo` | `scrape/img/talent-lab-os-platino__8014aa39.png` (1774×887, trasparente) | https://files.supersite.aruba.it/media/21546_8014aa393acc88bf17f5911edc36986ed515b764.png | testata, footer |
| `bussola` | `scrape/img/bussola__53165033.png` (1672×941) | https://files.supersite.aruba.it/media/21546_53165033e0249de9fdf46ee4dedcacce320d619b.png | eroe Home |
| `futuro` | `scrape/img/futuro__407f78ec.png` (1672×941) | https://files.supersite.aruba.it/media/21546_407f78ecf5a48aee699050cc884056c28bf8e4f0.png | Home H2 |
| `vetta` | `scrape/img/immagine-chatgpt-29-set-2026-10_44_33__e06a726c.png` (1672×941) | https://files.supersite.aruba.it/media/21546_e06a726c9a4403f30f32f6b3a05801f348eef1fb.png | Home H5, Coaching C7 |
| `uomo-skyline` | `scrape/img/immagine-chatgpt-13-ott-2026-10_14_15-2__ac3dcbba.png` (1672×941) | https://files.supersite.aruba.it/media/21546_ac3dcbbac4840990695fcf403953be7f81c3fd75.png | Home H4 (01) |
| `riccardo-skyline-v2` | `foto-titolare/riccardo-skyline-v2.jpg` (2752×1536) | https://www.teambuildingsrl.it/riccardo/assets/img/riccardo-skyline-v2-1600.jpg | eroe Executive Search |
| `titolare-ritratto` | `foto-titolare/titolare-ritratto.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/titolare-ritratto-1600.jpg | Home H2b |
| `titolare-platea` | `foto-titolare/titolare-platea.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/titolare-platea-1600.jpg | eroe Coaching |
| `titolare-formazione` | `foto-titolare/titolare-formazione.jpg` (2752×1536) | https://www.teambuildingsrl.it/riccardo/assets/img/titolare-formazione-1600.jpg | Home H4 (02) |
| `team-cerchio` | `foto-titolare/team-cerchio.png` (1536×1024) | https://www.teambuildingsrl.it/riccardo/assets/img/team-cerchio-1600.jpg | Home H4 (03) |
| `team-parco` | `foto-titolare/team-parco.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/team-parco-1600.jpg | Home H7 (chiamata finale) |
| `team-lavagna` | `foto-titolare/team-lavagna.png` (1671×941) | https://www.teambuildingsrl.it/riccardo/assets/img/team-lavagna-1600.jpg | Search S3 |
| `riunione` | `scrape/img/riunione-aziendale-al-tavolo-marmoreo__386f3fb9.png` (1983×793) | https://files.supersite.aruba.it/media/21546_386f3fb98011bb66fdeb95d6f48b4ce5bc473c3e.png | eroe Contatti |
| `palazzo-people-ideas` | `scrape/img/immagine-chatgpt-13-ott-2026-10_14_17-4__e006f37a.png` (1448×1086) | https://files.supersite.aruba.it/media/21546_e006f37abda6c328d3deb1df1024c13d388266f1.png | Search S3 |
| `strada-tramonto` | `scrape/img/verso-lâ-orizzonte-dorato__17e1181a.png` (1983×793) | https://files.supersite.aruba.it/media/21546_17e1181aa90d9436e57807528a2ee344c272f6d8.png | Search S4, Coaching C6 |
| `ss-bivio` | `scrape/v2/img/71f9f32b.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/ss-bivio-1600.jpg | eroe Strategic System |
| `ss-persone` | `scrape/v2/img/b0883d83.png` (1600×663, «01» nell'immagine) | https://www.teambuildingsrl.it/riccardo/assets/img/ss-persone-1600.jpg | Strategic System, tessera Persone |
| `ss-team` | `scrape/v2/img/99196c12.png` (1600×674, «02») | https://www.teambuildingsrl.it/riccardo/assets/img/ss-team-1600.jpg | Strategic System, tessera Team |
| `ss-organizzazioni` | `scrape/v2/img/ea4c099b.png` (1600×665, «03») | https://www.teambuildingsrl.it/riccardo/assets/img/ss-organizzazioni-1600.jpg | Strategic System, tessera Organizzazioni |
| `approccio-luce` | `scrape/v2/img/514093fd.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/approccio-luce-1600.jpg | eroe Il nostro approccio |
| `approccio-corridoio` | `scrape/v2/img/7a04c897.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/approccio-corridoio-1600.jpg | Il nostro approccio, «La nostra convinzione» |
| `campi-vetta` | `scrape/v2/img/602ae3cc.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/campi-vetta-1600.jpg | eroe Campi di azione; bande di Divisione Angel e Career Transition |
| `campo-choose` | `scrape/v2/img/8006135e.png` (1086×1448, testo nell'immagine) | https://www.teambuildingsrl.it/riccardo/assets/img/campo-choose-1600.jpg | Campi di azione, poster 01 Choose (JPG largo 1086 px) |
| `campo-develop` | `scrape/v2/img/e7fc3c74.png` (1086×1448, testo) | https://www.teambuildingsrl.it/riccardo/assets/img/campo-develop-1600.jpg | Campi di azione, poster 02 Develop |
| `campo-connect` | `scrape/v2/img/ef9ac4de.png` (1086×1448, testo) | https://www.teambuildingsrl.it/riccardo/assets/img/campo-connect-1600.jpg | Campi di azione, poster 03 Connect |
| `campo-grow` | `scrape/v2/img/97de1baa.png` (1086×1448, testo) | https://www.teambuildingsrl.it/riccardo/assets/img/campo-grow-1600.jpg | Campi di azione, poster 04 Grow |
| `cycle-colloquio` | `scrape/v2/img/d5146c10.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/cycle-colloquio-1600.jpg | eroe Coaching Cycle |
| `bussola-taccuino` | `scrape/v2/img/ee554312.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/bussola-taccuino-1600.jpg | banda Coaching Cycle, eroe Il percorso |
| `angel-roma` | `scrape/v2/img/524c5c9e.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/angel-roma-1600.jpg | eroe Divisione Angel |
| `percorso-pontile` | `scrape/v2/img/1f247d4e.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/percorso-pontile-1600.jpg | banda Il percorso |
| `career-donna` | `scrape/v2/img/71fcc9ff.png` (2043×770) | https://www.teambuildingsrl.it/riccardo/assets/img/career-donna-1600.jpg | eroe Career Transition |
| `c4c-scrivania` | `scrape/v2/img/92b2965e.png` (1983×793) | https://www.teambuildingsrl.it/riccardo/assets/img/c4c-scrivania-1600.jpg | eroe C4C |
| `metodo-sartoria` | `scrape/v2/img/d917a48c.png` (2021×778) | https://www.teambuildingsrl.it/riccardo/assets/img/metodo-sartoria-1600.jpg | eroe Il metodo |
| `metodo-strumenti` | `scrape/v2/img/4cb712ba.png` (1672×941, infografica) | https://www.teambuildingsrl.it/riccardo/assets/img/metodo-strumenti-1600.jpg | Il metodo, «I nostri strumenti proprietari» (`.figure`) |
| `tctb-scalata` | `scrape/v2/img/d1cac468.jpeg` (2560×920) | https://www.teambuildingsrl.it/riccardo/assets/img/tctb-scalata-1600.jpg | eroe Team Coaching + Team Building |

- Le foto del titolare sono state create da Daniele il 17/11/2026 (originali in `foto-titolare/`); `riccardo-skyline`
  (il titolare di spalle) è generata con Gemini `gemini-3-pro-image` lo stesso giorno: prompt in
  `docs/immagini/riccardo-skyline.txt`, tre varianti in `docs/immagini/out/` (scelta di Daniele: la v2).
- Di riserva, non usate: `due-professionisti` (https://files.supersite.aruba.it/media/21546_3aa229ab095ce49ce1ebf772437bab04b3954dea.jpeg),
  `bussola-dettaglio` (https://files.supersite.aruba.it/media/21546_1ab038224ed4ab153978964a0e036ef8a4dc0d96.png).
- Le 13 icone raster tonde (navy con disegno bianco) non si usano: diventano icone SVG a tratto (§7).
- Foto del secondo scrape: URL originali su files.supersite.aruba.it in `scrape/v2/img/list.txt`. Le infografiche e i
  poster con testo sono esportati a qualità più alta (`tools/assets.sh`, `HIQ`). **Mai** `7fd16299` (logo bianco di
  TeamBuilding.it: vietato); `33f7caab` (avviso Formazione) non si usa come immagine, è trascritto in
  `scrape/v2/testi-immagini.txt`.
- Brochure PDF: https://files.supersite.aruba.it/media/21546_a3d995a052a4503fde577d8624b0b3c3f27c56b4.pdf/o/brochure%20talent%20lab%20os.pdf

## 11. Checklist di accettazione
**Telefono (iPhone 390 px e Android 360 px)**
- [ ] Niente scorrimento orizzontale in nessuna pagina; testo corpo ≥ 16 px; bottoni ≥ 48 px.
- [ ] L'eroe si legge in un colpo d'occhio, con bottone «Parla con il nostro team» visibile senza scorrere.
- [ ] Scorrendo veloce non c'è mai una scena che si blocca; i pannelli impilati e la frase che si accende seguono il dito.
- [ ] Menu: si apre, si chiude, porta alle pagine; pillola WhatsApp/Scrivici sempre a portata di pollice.
- [ ] Modulo: errori chiari, poi si apre la mail già scritta.
**Computer (1440 px)**
- [ ] Menu in chiaro, testata che sparisce e ritorna; bussola che segue il puntatore e torna a Nord.
- [ ] Processo: l'ago punta la fase che sto leggendo, alla fine torna a Nord.
- [ ] Cambio pagina con dissolvenza (Chrome, Edge, Safari).
**Sempre**
- [ ] Con «riduci movimento» attivo il sito è completo e bello, fermo.
- [ ] Lighthouse telefono: Prestazioni ≥ 85, Accessibilità ≥ 95; nessun errore in console.
- [ ] `noindex` presente (meta + intestazione).
