# Talent Lab OS — design del restyling «Bussola d'oro» · Versione A «Notte e oro»

Documento di design per il restyling di **talentlabconsulting.it** (Talent Lab OS — Strategic System, marchio di OCC
Consulting Srl). Serve a due cose: incollarlo in **Claude Design** per generare le schermate, e guidare la costruzione
della demo statica pubblicata su **https://www.teambuildingsrl.it/riccardo/** (non indicizzata).

**Versione A — «Notte e oro»**: carattere **Newsreader + Hanken Grotesk**, palette notte blu, platino e oro. È una delle
due direzioni scelte il 17/11 dopo le prove sul canvas; l'altra è la **Versione B — «Verde acido»**
(`design-B-verde-acido.md`). Le due versioni hanno la stessa struttura, gli stessi testi e le stesse immagini: cambiano
carattere e colori. In pratica la A è la demo di oggi con due correzioni: titoli in Newsreader al posto di Bodoni Moda
(§3.2) e bussola nascosta agli screen reader (§8).

- Data: 17/11/2026. Scritto da Claude (Opus) per Daniele, sul materiale raccolto il 17/11 da sito e brochure.
- Riferimento visivo: canvas «Talent Lab OS · restyling», pagina «Proposte», riga «Notte e oro», colonna A.
- Fonti: sito attuale (4 pagine, screenshot in `scrape/shots-small/`), brochure ufficiale «Talent Lab OS» (15 pagine,
  `scrape/brochure/`), immagini originali in `scrape/img/` (URL pubblici sotto, §10).
- Convenzione testi: senza etichetta = testo del sito attuale (riordinato, refusi corretti); **[brochure p.N]** = testo
  della brochure ufficiale; **[proposto]** = scritto da noi, da far approvare a Riccardo.

---

## 0. Prompt da incollare in Claude Design

> Ridisegna il sito di una boutique consultancy italiana di Executive Search e Executive Coaching per banche, reti di
> consulenza finanziaria, private banking e wealth management: Talent Lab OS. Segui il documento allegato
> (design-A-notte-e-oro.md): direzione «Bussola d'oro», notte blu + platino + luce dorata del tramonto, titoli in
> Newsreader con una parola chiave in corsivo oro, testi in Hanken Grotesk, una bussola d'oro come firma visiva. Quattro pagine: Home, Executive Search, Executive Coaching, Contatti,
> ognuna in versione telefono (390 px) e computer (1440 px). Usa i testi esatti del documento e le immagini dagli URL
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
- **Display: Newsreader** (Production Type; variabile, asse `opsz` 6-72, pesi 200-800, corsivo). Serif editoriale
  contemporaneo: tiene il registro del private banking senza l'aria ottocentesca di Bodoni Moda, che nelle prove del
  17/11 risultava vecchio, e resta nella famiglia dei serif del logo. Titoli in tondo 400, **una parola chiave per
  titolo in corsivo oro** (`--oro-300` su scuro, `--oro-700` su chiaro). `font-optical-sizing: auto` (oltre i 72 px
  usa il taglio display). Numeri grandi in Newsreader 300.
- Font da precaricare: Newsreader tondo e Hanken Grotesk tondo (variabili, woff2); Newsreader corsivo caricato
  normalmente (serve solo per le parole chiave).
- **Testo e interfaccia: Hanken Grotesk** (variabile 300-700, corsivo). Grottesco pulito e caldo, leggibile a 15-16 px.
- Etichette: Hanken 600, maiuscolo, `letter-spacing: .16em`, 12 px (il «TALENT LAB CONSULTING ——— 04» della brochure).

| Ruolo | Dimensione | Interlinea | Note |
|---|---|---|---|
| Display (H1 eroe) | `clamp(2.5rem, 1.35rem + 5.4vw, 6.5rem)` | 1.0 | Newsreader 400, `letter-spacing: -0.022em` |
| H2 | `clamp(1.9rem, 1.2rem + 3.1vw, 4.1rem)` | 1.04 | Newsreader 400, `letter-spacing: -0.022em` |
| H3 | `clamp(1.375rem, 1.1rem + 1.1vw, 2rem)` | 1.15 | Newsreader 500 |
| Citazione | `clamp(1.7rem, 1.05rem + 2.9vw, 3.6rem)` | 1.12 | Newsreader 350, `letter-spacing: -0.015em`, parola chiave in corsivo |
| Riga in evidenza | `clamp(1.3rem, 1rem + 1.1vw, 1.8rem)` | 1.25 | Newsreader 400 |
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

- Pagine: `index.html` (Home), `executive-search/`, `executive-coaching/`, `contatti/`. Privacy e cookie: link alle
  pagine originali (`https://talentlabconsulting.it/privacy-policy`, `/cookie-policy`). Link relativi (la demo vive in
  `/riccardo/`).
- **Testata**: logo platino a sinistra; su computer menu in chiaro — *Executive Search · Executive Coaching ·
  Team Development · Contatti* — e bottone oro «Parla con noi». Trasparente sull'eroe, poi vetro scuro; si nasconde
  scorrendo in giù e torna scorrendo in su. Voce attiva con filetto oro sotto.
- **Telefono**: logo + bottone «Menu» (parola + due linee). Menu a tutto schermo che si apre a cerchio dall'angolo del
  bottone: link grandi in Newsreader che entrano in cascata, bussola che ruota lenta sullo sfondo, in fondo WhatsApp e mail.
  Esc/«Chiudi» per uscire, focus intrappolato.
- **Pillola contatti (solo telefono)**: dopo l'eroe compare in basso una pillola con «WhatsApp» e «Scrivici» (48 px,
  rispetta la safe area); sparisce sul footer e col menu aperto.
- **Footer** (notte-950): grande riga «Talent Strategy. *Human Impact.*», menu, contatti, dati societari
  («Talent Lab OS è un marchio di OCC Consulting Srl · P.IVA e C.F. 02180480689»), privacy e cookie, «Torna su» con
  l'ago della bussola che punta in alto.
- Niente banner cookie nella demo: nessun cookie, nessun font o script di terze parti.

## 5. Pagina per pagina

Capitoli alternati: **scuro** (notte-900, foto al tramonto) per l'emozione, **chiaro** (avorio) per leggere.

### 5.1 Home

**H1 — Eroe (scuro, `min-height: 100svh`)**
- Foto `bussola` (bussola sulle rocce al tramonto) a tutto schermo, `object-position` sulla bussola; velatura da
  sinistra (notte-900 al 92% → 0% al 65%) per leggere il testo. Polvere d'oro su canvas che sale verso la luce.
- Testo allineato a sinistra:
  - Etichetta: «Boutique consultancy · Banking & Finance»
  - H1: «Talent Strategy. / Human *Impact.*»
  - Lead: «Siamo una boutique consultancy specializzata nello sviluppo del talento. Uniamo esperienza, rigore
    metodologico e una profonda attenzione alle persone per aiutare le aziende a costruire organizzazioni più forti,
    consapevoli e orientate al futuro.»
  - Bottoni: «Parla con il nostro team» (primario oro → `contatti/`) · «Scarica la brochure» (secondario, PDF).
- In basso: «Scorri» con filetto che scende; a destra la **bussola d'oro** (SVG, 132 px telefono / 188 px computer).
- Effetto: entrata orchestrata in 1,4 s (§6.2); la foto parte da `scale 1.12` e si assesta; scorrendo va in
  parallasse (−12%) e si scurisce; la bussola su computer segue il puntatore, su telefono oscilla con la velocità dello
  scorrimento e torna a Nord.

**H2 — Il punto di partenza (chiaro)**
- Griglia 7/5: a sinistra testo, a destra foto `futuro` (scale verso il cielo) verticale 4:5.
  - Etichetta: «Il punto di partenza»
  - H2: «L'esperienza diventa *metodo*.»
  - Corpo: «Le organizzazioni non hanno semplicemente bisogno di trovare persone competenti: hanno bisogno di
    riconoscere il potenziale, attrarlo, farlo evolvere e trasformarlo in valore.»
  - Riga in evidenza [brochure p.2]: «Il talento non è il punto di arrivo. È il punto da cui partire.»
- Sotto, a tutta larghezza: citazione «Il talento genera valore / quando il potenziale trova una *direzione*.» con un
  filetto oro che si disegna da sinistra.
- Effetto: la foto si apre con una tendina (`clip-path: inset(100% 0 0 0)` → `inset(0)`) e dentro si muove in
  parallasse; titoli che salgono da una maschera, riga per riga.

**H2b — Chi siamo (chiaro alternato, avorio-100)** [aggiunta 17/11 con le foto del titolare]
- Griglia 5/7: a sinistra il **ritratto del titolare** (`titolare-ritratto`, cornice 4:5 con tendina); sull'angolo un
  **sigillo** blu notte con l'emblema Φ e la scritta circolare «TALENT LAB OS · STRATEGIC SYSTEM · HUMAN IMPACT» che gira
  piano e accelera (anche al contrario) con lo scroll.
  - Etichetta: «Chi siamo»
  - H2 [proposto]: «Esperienza vera, *dalla parte delle persone*.»
  - Lead [brochure 2023, «Chi siamo»]: «Siamo un team di specialisti nel campo dell'Executive Financial Head Hunting,
    della formazione manageriale e del business coaching.»
  - Citazione [brochure p.7, Divisione Angel]: «Non cerchiamo una persona per un'azienda. Cerchiamo l'azienda giusta
    *per la persona*.»
  - Numero che conta da 0 entrando: «25+ · anni di esperienza» [brochure 2023: «oltre 25 anni di esperienza»], accanto
    le tre specializzazioni in elenco.
  - Link «Parla con noi →». Nessun nome in didascalia finché Riccardo non lo conferma.

**H3 — Fascia in movimento (scuro, 1 riga)**
- [brochure p.1, p.5] «People · Ideas · Methods · Results · Talent is not a resource. It is a strategic choice. ·»
  in Newsreader corsivo platino, alternato a parole in tondo oro. Scorre lenta, accelera e inverte con lo scroll.

**H4 — Un sistema completo (scuro)**
- Intestazione in griglia 5/7:
  - Etichetta: «Il framework»
  - H2: «Un sistema completo per un impatto *ad alto valore*.»
  - Lead: «Un sistema integrato di soluzioni per attrarre, sviluppare e connettere le persone, generando un impatto
    misurabile e duraturo.»
  - Riga [brochure p.4]: «Stessi principi. Contesti diversi. Risultati concreti.»
- **Tre pannelli che si impilano** (sticky): ogni pannello si ferma sotto la testata e il successivo gli scorre sopra;
  quello sotto si rimpicciolisce a 0.94 e si scurisce. Pannello = foto a sinistra (computer) / sopra (telefono, 16:10)
  + testo. Numeri grandi in Newsreader sottile oro.
  1. **01 · Choose — Strategy Recruiting** · foto `uomo-skyline` · «Attraiamo e selezioniamo i migliori talenti, in
     linea con i valori e gli obiettivi della tua organizzazione.» · [brochure p.4] «Le persone giuste. Le condizioni
     giuste. Per generare valore.» · link «Executive Search →» (`executive-search/`)
  2. **02 · Develop — Leadership & Coaching** · foto `titolare-formazione` (il titolare in aula) · «Supportiamo la crescita di leader e team
     attraverso percorsi di sviluppo su misura e strumenti evidence-based.» · link «Executive Coaching →»
  3. **03 · Connect — Team Development** · foto `team-cerchio` (il team in cerchio visto dal basso) · «Costruiamo team più coesi, consapevoli e performanti,
     valorizzando le relazioni e la collaborazione.» · [brochure p.4] «Persone che collaborano. Team che performano.
     Organizzazioni che crescono.» · link «Team Coaching + Team Building →» (`#team`)
- Su schermi bassi (altezza < 640 px) o con movimento ridotto: pannelli in colonna normale.

**H5 — Riconoscere il potenziale (scuro, foto `vetta`)**
- Sezione alta 200svh (telefono 170svh) con interno sticky a tutto schermo: foto della vetta al tramonto.
- Frase che **si accende parola per parola** scorrendo (opacità .16 → 1, le ultime due parole in oro):
  «Riconoscere il potenziale è l'inizio. / Trasformarlo in valore è *la vera sfida*.»
- Mentre la frase si accende la luce del tramonto cresce (velatura che si schiarisce, alone caldo in alto a destra).
  È sticky, non blocca: si scorre sempre alla velocità del dito.

**H6 — Connect: Team Coaching + Team Building (chiaro, `id="team"`)** [brochure p.14]
- Etichetta: «Connect · Team Development»
- H2: «L'esperienza attiva il team. *Il coaching la trasforma.*»
- Corpo: «Integrare Team Building e Team Coaching significa trasformare l'esperienza in insight concreti e risultati
  duraturi, accelerando l'evoluzione del team.»
- Foto larga 21:9 (4:3 sul telefono) `team-parco` con tendina e parallasse, prima del modello.
- Modello in 6 passi (linea orizzontale su computer, verticale su telefono; la linea oro si disegna e i punti si
  accendono in sequenza): **Experience** — Il team vive un'esperienza concreta e sfidante · **Observe** — Emergono
  comportamenti, dinamiche e opportunità · **Debrief** — L'esperienza viene riletta attraverso il coaching ·
  **Insight** — Il team riconosce pattern, risorse e aree di evoluzione · **Transfer** — Gli insight vengono riportati
  nel contesto professionale reale · **Change** — Nuovi comportamenti diventano pratica di lavoro.
- Riquadro partner (bordo 1 px oro-600): «Team Building · Strategic Partner — Per la progettazione e la realizzazione
  delle attività di team building, Talent Lab Consulting opera in partnership con **TeamBuilding.it**, partner
  strategico specializzato nella creazione di esperienze di team building ad alto valore.» · link «Le attività su
  teambuilding.it →» (`https://www.teambuilding.it/formazione/`). Solo testo, niente logo.

**H7 — Chiamata finale (scuro, foto `strada-tramonto`)**
- H2: «Parla con il nostro *team* di esperti.»
- Corpo: «Per informazioni sui nostri servizi o per essere ricontattato.»
- Bottoni: «Scrivici» (primario → `contatti/`) · «WhatsApp» · «Brochure (PDF)».
- Effetto: entrando, la bussola grande in filigrana ruota e **si ferma esatta sul Nord**: fine del viaggio.

### 5.2 Executive Search

**S1 — Eroe (scuro, foto `uomo-skyline`)**
- Etichetta: «01 · Choose — Executive Search»
- H1: «Specializzazione che diventa *metodo*.»
- Sottotitolo etichetta: «Banking & Finance Specialist Practice»
- Settori in fila, separati da punti [brochure p.5]: «Banking · Private Banking · Wealth Management · Financial Advisory»
- Lead: «Un percorso progettato per Banche, Reti di Consulenza Finanziaria, Private Banking e Wealth Management,
  costruito sulla conoscenza delle dinamiche professionali, organizzative e di sviluppo del settore.»
- A destra in corsivo: «Persone giuste. / Organizzazioni più forti.»

**S2 — Il nostro processo (scuro) — firma: il quadrante**
- Etichetta: «Il nostro processo» · H2: «Un approccio consulenziale, *concreto, misurabile*.» [brochure p.5]
- Corpo [brochure p.5]: «Ogni progetto nasce dalla comprensione dell'organizzazione, dei suoi obiettivi di crescita,
  del mercato di riferimento e delle caratteristiche dei professionisti che desidera attrarre.»
- **Quadrante-bussola** con 5 tacche (una ogni 72°, numerate 01-05): l'ago punta la fase che stai leggendo e alla fine
  torna a Nord (il processo è un ciclo). Computer: quadrante sticky a sinistra (420 px), le 5 fasi scorrono a destra,
  la fase attiva piena e le altre al 35%. Telefono: barra sticky sotto la testata con quadrante da 88 px e nome della
  fase attiva; le fasi scorrono sotto.
  1. **Analisi** · *Analyze* — «Analisi dell'azienda committente, del contesto, degli obiettivi di sviluppo e del
     bisogno di talenti.» (titolo dalla brochure: sul sito mancava)
  2. **Definizione** · *Define* — «Definizione del profilo del candidato target e dei criteri di ricerca e valutazione.»
  3. **Progettazione** · *Design* — «Progettazione della strategia e dell'iter di Executive Search, su misura per
     l'organizzazione.»
  4. **Azione** · *Act* — «Scouting, contatto, screening, assessment, colloqui e affiancamento al processo di scelta.»
  5. **Revisione** · *Review* — «Analisi delle attività, feedback e reportistica per misurare i risultati e
     valorizzare l'investimento.»

**S3 — Più di una ricerca (chiaro)**
- Griglia: foto `team-lavagna` (verticale: il titolare alla lavagna con i manager) · testo · foto `palazzo-people-ideas` (verticale, sfalsata di 64 px).
  - Etichetta: «Più di una ricerca»
  - H2: «Un percorso di sviluppo per chi *guida il cambiamento*.»
  - Corpo: «Affianchiamo manager e organizzazioni con formazione tecnica e supporto operativo, per sviluppare le
    competenze necessarie a gestire direttamente sourcing, colloquio, valutazione e negoziazione.»
- Tre voci come elenco tipografico con filetti (non card): **Formazione manageriale** — Metodi, strumenti,
  simulazioni · **Affiancamento ai colloqui** — Conduzione one to one, analisi e valutazione · **Analisi e
  reportistica** — Dati, insight e raccomandazioni. [titoli e testi brochure p.5]
- Citazione [brochure p.5]: «Dalla ricerca della persona *alla qualità della decisione*.»

**S4 — Chiamata finale** come H7 (testo: «Cerchi la persona giusta per la tua rete?» [proposto] + bottoni).

### 5.3 Executive Coaching

**C1 — Eroe diviso (scuro, foto `titolare-platea`)**
- Computer: griglia 5/7, testo a sinistra sul blu, a destra il **titolare che parla sorridendo a un gruppo di manager**
  a tutta altezza, sfumato verso il blu sul bordo sinistro. Telefono: foto sopra (56svh), testo sotto.
- Etichetta: «02 · Develop — Executive Coaching»
- H1 [brochure p.11]: «Dal ruolo *all'impatto*.»
- Lead: «Percorsi di sviluppo per chi guida persone, decisioni e organizzazioni.» · bottone «Parliamone» [proposto]
- Sotto, in corsivo [brochure p.11]: «Persone più consapevoli. Organizzazioni più forti. Un impatto più duraturo.»

**C2 — Manifesto (chiaro)**
- Testo grande in Newsreader che **si accende riga per riga**: «Il coaching per noi non è uno spazio astratto di
  riflessione. È un intervento costruito intorno alla persona, al ruolo e al contesto organizzativo reale, per
  trasformare consapevolezza e potenziale in comportamenti capaci di produrre *impatto e valore*.»
- Corpo: «Sviluppiamo percorsi di coaching individuale per leader, manager e professionisti che desiderano ampliare la
  propria consapevolezza per generare un impatto concreto e sostenibile nel proprio contesto professionale.»
  [brochure p.11] «Lavoriamo con Executive, Senior Manager e Manager sulle sfide che incontrano concretamente nel
  proprio ruolo.»

**C3 — Le aree di intervento (scuro)** — griglia 2×2 asimmetrica (righe 7/5 e 5/7), pannelli con bordo che si
illumina d'oro sotto il puntatore; su telefono colonna con numeri grandi.
1. **Leadership** — «Identità manageriale, autorevolezza e capacità di guida. Una leadership più consapevole,
   pragmatica e sostenibile.»
2. **Decision making** — «Gestione della complessità, responsabilità e qualità delle decisioni. Dalla riflessione
   all'azione, con maggiore lucidità e sicurezza.»
3. **People management** — «Relazioni, comunicazione, feedback e sviluppo delle persone. Team più motivati, allineati
   e orientati al risultato.»
4. **Performance** — «Priorità, execution e trasformazione delle intenzioni in azione. Risultati più concreti e un
   impatto duraturo nel tempo.»
(«Leadership» e «Performance» mancavano sul sito: titoli dalla brochure p.11.)

**C4 — Il nostro approccio (chiaro)** — quattro tappe su una linea che si disegna (come una strada):
1. **Esperienza reale** [titolo proposto] — «Un percorso strutturato, basato su esperienza reale nel mondo del Banking
   & Finance.»
2. **Framework proprietari** — «Framework di pronto utilizzo per le diverse esigenze del coachee e strumenti
   personalizzati sulle esigenze specifiche.»
3. **Orientato all'azione** — «Dalla consapevolezza personale e di ruolo al comportamento.»
4. **Impatto nel tempo** — «Cambiamento sostenibile e crescita continua.»

**C5 — Fascia in movimento** [brochure p.11]: «Insight · Better questions · Bolder action · Real impact ·»

**C6 — Citazione (scuro, foto `strada-tramonto`)**: «La consapevolezza diventa valore / quando cambia *il modo di
agire*.» — si accende parola per parola, l'uomo cammina verso la luce (parallasse lenta).

**C7 — Chiamata finale** come H7 («Il cambiamento inizia da come guardi le cose.» [brochure p.11]).

### 5.4 Contatti

**K1 — Eroe corto (scuro, foto `riunione` velata al 85%)**
- H1 [proposto]: «Parliamo del *prossimo passo*.»
- Lead: «Per informazioni sui nostri servizi o per essere ricontattato dal nostro team di esperti.»

**K2 — Due colonne (chiaro)**
- Sinistra, contatti come righe grandi interattive (icona a tratto + testo + azione):
  - **E-mail** — info@talentlabconsulting.it · azioni «Scrivi» (mailto) e «Copia» (con conferma «Copiato»)
  - **WhatsApp** — «Chatta con noi · +39 380 633 8747» → `https://wa.me/393806338747`
  - **Brochure** — «Talent Lab OS, 15 pagine (PDF)» → download
  - **LinkedIn** — da aggiungere quando Riccardo ci dà l'URL (oggi sul sito non è un link): nella demo non compare.
- Destra, modulo (etichette sopra i campi): **Nome** · **E-mail** · **Messaggio** · casella «Ho letto l'informativa
  privacy» (link) · bottone «Invia richiesta». Senza backend: valida in linea (errori sotto il campo, `aria-live`),
  poi **compone una mail** a info@ con oggetto «Richiesta informazioni dal sito» e testo; stato di conferma «Stiamo
  aprendo la tua app di posta» con «Copia il messaggio» come alternativa. In produzione si collega a un vero invio.
- Sotto: «Talent Lab OS è un marchio di proprietà di OCC Consulting Srl · P.IVA e C.F. 02180480689».

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
| Bordo che si illumina | pannelli delle aree | luce oro sotto il puntatore | bordo statico | bordo statico |
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
- **Pannello del framework**: notte-800, bordo `--linea-scura`, foto con alone caldo in alto, numero Newsreader 300 oro.
- **Fase del processo**: numero Newsreader grande, nome IT in H3, nome EN in etichetta, testo; attiva = piena + filetto oro.
- **Campi**: etichetta sopra, fondo avorio-50, bordo 1 px inchiostro al 25%, focus bordo oro-600 + anello; errore in
  `#a3341f` sotto il campo con icona.
- **Menu telefono**: vedi §4. **Pillola contatti**: vetro scuro, due bottoni da 48 px.
- **Icone**: SVG a tratto 1.5 px (set Phosphor «light»), mai sopra ogni titolo: solo nei contatti, nelle fasi e nei
  passi del modello. Concetti: lente (Analisi), profilo (Definizione), squadra/compasso (Progettazione), stretta di
  mano (Azione), grafico (Revisione), cappello (Formazione), dialogo (Colloqui), documento-grafico (Reportistica),
  busta, WhatsApp, file PDF, freccia.

## 8. Accessibilità, prestazioni, SEO
- Struttura semantica (header/nav/main/section/footer), un solo H1 per pagina, «Salta al contenuto», ordine di lettura
  = ordine visivo, `alt` in italiano su ogni foto, focus visibile, menu con `aria-expanded` ed Esc.
- Bussole e sigillo sono decorativi: SVG con `aria-hidden="true"` e `focusable="false"`. Oggi nella demo le lettere
  N E S O finiscono nel testo letto da screen reader e motori: «Torna su NESO» e un'etichetta «NESO» sopra la chiamata
  finale.
- `prefers-reduced-motion`: niente Lenis, particelle, parallasse, scrub; tutti i testi visibili; bussola ferma.
- LCP < 2,5 s su 4G: foto dell'eroe AVIF/WebP in 640/1024/1600/2000 px con `fetchpriority="high"` e `preload`; le
  altre `loading="lazy"`; font precaricati (2 file); JS totale < 120 kB compresso; canvas in pausa fuori schermo.
- Title e description: quelli originali per pagina. Demo: `<meta name="robots" content="noindex, nofollow">` +
  intestazione `X-Robots-Tag` (non deve fare concorrenza al sito vero).

## 9. Decisioni aperte (per Daniele / Riccardo)
1. Font: **deciso il 17/11**, Newsreader + Hanken Grotesk. Resta da decidere con Riccardo quale versione, A o B, va in
   produzione.
2. Contenuti presi dalla brochure (§5: processo in 5 fasi, partner TeamBuilding.it, frasi brevi): ok da pubblicare?
3. Il quarto pilastro della brochure, **04 · Grow — Learning & Development**, non è sul sito: aggiungerlo?
4. URL della pagina LinkedIn.
5. Modulo contatti: in produzione serve un invio vero (servizio form o script sul suo hosting).
6. Foto: le 6 foto del titolare (17/11) sono in Home, Executive Search e Coaching; restano IA le foto di paesaggio.
7. Nome e ruolo del titolare per una didascalia sotto il ritratto di «Chi siamo» (oggi niente nome).

## 10. Immagini (originali a piena risoluzione, URL pubblici)
| Nome breve | File locale (`scrape/img/`) | URL | Dove |
|---|---|---|---|
| `logo` | `talent-lab-os-platino__8014aa39.png` (1774×887, trasparente) | https://files.supersite.aruba.it/media/21546_8014aa393acc88bf17f5911edc36986ed515b764.png | testata, footer |
| `bussola` | `bussola__53165033.png` (1672×941) | https://files.supersite.aruba.it/media/21546_53165033e0249de9fdf46ee4dedcacce320d619b.png | eroe Home |
| `futuro` | `futuro__407f78ec.png` (1672×941) | https://files.supersite.aruba.it/media/21546_407f78ecf5a48aee699050cc884056c28bf8e4f0.png | Home H2 |
| `vetta` | `immagine-chatgpt-29-set-2026-10_44_33__e06a726c.png` (1672×941) | https://files.supersite.aruba.it/media/21546_e06a726c9a4403f30f32f6b3a05801f348eef1fb.png | Home H5 |
| `uomo-skyline` | `immagine-chatgpt-13-ott-2026-10_14_15-2__ac3dcbba.png` (1672×941) | https://files.supersite.aruba.it/media/21546_ac3dcbbac4840990695fcf403953be7f81c3fd75.png | Home H4 (01), eroe Search |
| `due-professionisti` | `01_hero_due_professionisti__3aa229ab.jpeg` (1983×793) | https://files.supersite.aruba.it/media/21546_3aa229ab095ce49ce1ebf772437bab04b3954dea.jpeg | Home H4 (02), eroe Coaching |
| `riunione` | `riunione-aziendale-al-tavolo-marmoreo__386f3fb9.png` (1983×793) | https://files.supersite.aruba.it/media/21546_386f3fb98011bb66fdeb95d6f48b4ce5bc473c3e.png | Home H4 (03), eroe Contatti |
| `bussola-dettaglio` | `immagine-chatgpt-13-ott-2026-10_14_16-3__1ab03822.png` (1448×1086) | https://files.supersite.aruba.it/media/21546_1ab038224ed4ab153978964a0e036ef8a4dc0d96.png | Search S3 |
| `palazzo-people-ideas` | `immagine-chatgpt-13-ott-2026-10_14_17-4__e006f37a.png` (1448×1086) | https://files.supersite.aruba.it/media/21546_e006f37abda6c328d3deb1df1024c13d388266f1.png | Search S3 |
| `strada-tramonto` | `verso-lâ-orizzonte-dorato__17e1181a.png` (1983×793) | https://files.supersite.aruba.it/media/21546_17e1181aa90d9436e57807528a2ee344c272f6d8.png | Home H7, Coaching C6 |

| `titolare-ritratto` | `foto-titolare/titolare-ritratto.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/titolare-ritratto-1600.jpg | Home H2b |
| `titolare-platea` | `foto-titolare/titolare-platea.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/titolare-platea-1600.jpg | eroe Coaching |
| `titolare-formazione` | `foto-titolare/titolare-formazione.jpg` (2752×1536) | https://www.teambuildingsrl.it/riccardo/assets/img/titolare-formazione-1600.jpg | Home H4 (02) |
| `team-cerchio` | `foto-titolare/team-cerchio.png` (1536×1024) | https://www.teambuildingsrl.it/riccardo/assets/img/team-cerchio-1600.jpg | Home H4 (03) |
| `team-parco` | `foto-titolare/team-parco.png` (1672×941) | https://www.teambuildingsrl.it/riccardo/assets/img/team-parco-1600.jpg | Home H6 |
| `team-lavagna` | `foto-titolare/team-lavagna.png` (1671×941) | https://www.teambuildingsrl.it/riccardo/assets/img/team-lavagna-1600.jpg | Search S3 |

Le foto del titolare sono state create da Daniele il 17/11/2026 (originali in `foto-titolare/`).
Non più usate nella demo: `due-professionisti`, `bussola-dettaglio` (restano nella tabella come riserva).

Le 13 icone raster tonde (navy con disegno bianco) non si usano: diventano icone SVG a tratto (§7).
Brochure PDF: https://files.supersite.aruba.it/media/21546_a3d995a052a4503fde577d8624b0b3c3f27c56b4.pdf/o/brochure%20talent%20lab%20os.pdf

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
- [ ] Nessun «NESO» nel testo letto: bussole e sigillo con `aria-hidden="true"`.
