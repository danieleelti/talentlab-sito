# Talent Lab OS — design del restyling · Versione B «Verde acido»

Documento di design per il restyling di **talentlabconsulting.it** (Talent Lab OS — Strategic System, marchio di OCC
Consulting Srl). Serve a due cose: incollarlo in **Claude Design** per generare le schermate, e guidare la costruzione
di una seconda demo statica, non indicizzata, accanto a quella su **https://www.teambuildingsrl.it/riccardo/**.

**Versione B — «Verde acido»**: tutto in **Instrument Sans**, palette bianco, inchiostro quasi nero e un solo accento
verde acido. È una delle due direzioni scelte il 17/11 dopo le prove sul canvas; l'altra è la **Versione A — «Notte e
oro»** (`design-A-notte-e-oro.md`). Le due versioni hanno la stessa struttura, gli stessi testi e le stesse immagini:
in B cambiano carattere, colori e trattamento delle foto (bianco e nero).

- Data: 17/11/2026. Scritto da Claude (Opus) per Daniele, sul materiale raccolto il 17/11 da sito e brochure.
- Riferimento visivo: canvas «Talent Lab OS · restyling», pagina «Proposte», riga «Verde acido su bianco», colonna B.
- Fonti: sito attuale (4 pagine, screenshot in `scrape/shots-small/`), brochure ufficiale «Talent Lab OS» (15 pagine,
  `scrape/brochure/`), immagini originali in `scrape/img/` e `foto-titolare/` (URL pubblici sotto, §10).
- Convenzione testi: senza etichetta = testo del sito attuale (riordinato, refusi corretti); **[brochure p.N]** = testo
  della brochure ufficiale; **[proposto]** = scritto da noi, da far approvare a Riccardo. *Parola* = parola chiave del
  titolo: in B **non va in corsivo**, si segna con il verde (§3.2, §7).

---

## 0. Prompt da incollare in Claude Design

> Ridisegna il sito di una boutique consultancy italiana di Executive Search e Executive Coaching per banche, reti di
> consulenza finanziaria, private banking e wealth management: Talent Lab OS. Segui il documento allegato
> (design-B-verde-acido.md): direzione «Verde acido», fondo bianco, testo quasi nero, un solo accento verde acido
> #c5f53b usato come evidenziatore sotto la parola chiave di ogni titolo, sui bottoni e sull'ago della bussola; capitoli
> neri per i momenti forti, chiamata finale su verde pieno, foto in bianco e nero. Tutto in Instrument Sans. Una bussola
> a linee nere con l'ago verde come firma visiva. Quattro pagine: Home, Executive Search, Executive Coaching, Contatti,
> ognuna in versione telefono (390 px) e computer (1440 px). Usa i testi esatti del documento e le immagini dagli URL
> del §10, in bianco e nero. Nitido e contemporaneo ma da private banking: verde acido mai come colore del testo su
> bianco, niente oro, niente blu notte, niente sfumature colorate, niente card tutte uguali. Il telefono viene prima.

---

## 1. Concept

**«Verde acido»: chiarezza e un segno deciso.** Pagina bianca, inchiostro quasi nero, un solo accento verde acido. Il
verde lavora come l'evidenziatore di un consulente: segna quello che conta (la parola chiave di ogni titolo, la fase del
processo, il bottone da premere) e diventa l'ago della bussola che «trova la direzione» — la frase del cliente: *il
talento genera valore quando il potenziale trova una direzione*. Le foto passano in bianco e nero, così il verde resta
l'unico colore: il sito sembra uno studio contemporaneo, non una banca d'altri tempi. Effetti netti e veloci; lo
scorrimento resta sempre libero e il telefono viene prima.

**Cosa cambia rispetto alla versione A** (stessa struttura, stessi testi): niente notte blu, platino e oro; capitoli
bianchi per leggere, neri per i momenti forti, chiamate finali su verde pieno; un solo carattere; foto in bianco e nero;
al posto della polvere d'oro, l'evidenziatore che si disegna sotto le parole chiave.

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

### 3.1 Colori (60% bianco · 30% inchiostro · 10% verde acido)
| Token | Hex | Ruolo |
|---|---|---|
| `--carta-0` | `#ffffff` | fondo principale, capitoli chiari, titoli su nero |
| `--carta-50` | `#f3f4ef` | fascia chiara alternata |
| `--carta-100` | `#e5e8de` | superfici su chiaro, segnaposto delle immagini |
| `--inchiostro-950` | `#0c0d0b` | testo e titoli su chiaro, fondo dei capitoli neri, linee della bussola |
| `--inchiostro-800` | `#1d1f1b` | superfici su nero (pannelli) |
| `--inchiostro-700` | `#2c2f29` | bordi attivi, hover su nero |
| `--grafite-600` | `#3b3f38` | testo secondario su bianco (lead, corpo) |
| `--grafite-500` | `#4a4e45` | testo secondario su `--carta-50` |
| `--grafite-400` | `#5f645a` | etichette e didascalie su chiaro |
| `--nebbia-200` | `#c9cdc3` | testo su nero |
| `--nebbia-400` | `#9a9f93` | testo secondario su nero |
| `--acido-400` | `#c5f53b` | **l'accento**: bottone primario, evidenziatore, ago, barre; come testo solo su nero |
| `--acido-300` | `#d4f86a` | hover del bottone primario |
| `--errore` | `#b3261e` | errori dei campi |
| `--linea-chiara` | `rgba(12,13,11,.12)` | filetti 1 px su chiaro |
| `--linea-scura` | `rgba(255,255,255,.14)` | filetti 1 px su nero |

Contrasti verificati (WCAG): inchiostro-950 su bianco 19,5:1 · grafite-600 10,7:1 · grafite-400 6,1:1 · grafite-500 su
carta-50 7,7:1 · inchiostro su acido-400 (bottone, evidenziatore) 15,3:1 · acido-400 su inchiostro (testo su nero)
15,3:1 · nebbia-200 su inchiostro 12,1:1 · nebbia-400 7,2:1 · errore su bianco 6,5:1. **Regola fissa: il verde acido non
è mai colore del testo su bianco** (1,3:1): su chiaro sta sotto il testo nero (evidenziatore, bottone), su nero può
essere testo. Il nero è sempre inchiostro `#0c0d0b`, mai `#000`. Un solo accento: il verde.

### 3.2 Tipografia (font self-hosted, woff2, `font-display: swap`)
- **Tutto in Instrument Sans** (Instrument; variabile: larghezza `wdth` 75-100, pesi 400-700, corsivo). Grottesco
  contemporaneo, leggermente stretto, nitido a ogni misura. Un solo file da precaricare (tondo variabile); il corsivo
  non serve.
- Titoli in 500 con spaziatura stretta. **La parola chiave non va in corsivo**: su chiaro resta nera con l'evidenziatore
  verde sotto, su nero diventa verde, sul verde va in un riquadro nero con il testo verde (§7).
- Numeri grandi (framework, fasi del processo, «25+»): Instrument Sans 500 stretto (`font-stretch: 75%`), cifre
  tabellari (`font-variant-numeric: tabular-nums`).
- Etichette: Instrument Sans 600, maiuscolo, `letter-spacing: .14em`, 12 px (il «TALENT LAB CONSULTING ——— 04» della
  brochure).

| Ruolo | Dimensione | Interlinea | Note |
|---|---|---|---|
| Display (H1 eroe) | `clamp(2.25rem, 1.2rem + 4.8vw, 5.8rem)` | 0.96 | 500, `letter-spacing: -0.035em` |
| H2 | `clamp(1.75rem, 1.08rem + 2.75vw, 3.65rem)` | 1.0 | 500, `letter-spacing: -0.035em` |
| H3 | `clamp(1.25rem, 1rem + 1vw, 1.8rem)` | 1.15 | 500, `letter-spacing: -0.02em` |
| Citazione | `clamp(1.5rem, 0.95rem + 2.6vw, 3.25rem)` | 1.12 | 400, `letter-spacing: -0.03em` |
| Riga in evidenza | `clamp(1.125rem, 0.95rem + 0.95vw, 1.6rem)` | 1.25 | 500, `letter-spacing: -0.02em` |
| Lead | `clamp(1.0625rem, 1rem + .4vw, 1.3125rem)` | 1.6 | 400 |
| Corpo | `1rem` → `1.0625rem` da 900 px | 1.65 (1.72 su nero) | 400, max 62ch |
| Etichetta | `.75rem` | 1.3 | 600 maiuscolo |

### 3.3 Spazi, griglia, forme
- Scala 4 pt: `--sp-3xs 4` · `2xs 8` · `xs 12` · `sm 16` · `md 24` · `lg 32` · `xl 48` · `2xl 64` · `3xl 96` · `4xl 144`.
- Sezioni: padding verticale `clamp(80px, 11vw, 168px)`; margini laterali `clamp(20px, 5vw, 64px)`; contenuto max 1320 px.
- Griglia 12 colonne (gap 24-32 px) da 900 px; 1 colonna sotto 900 px (niente layout asimmetrici sul telefono).
- Raggi: 2 px immagini e pannelli, 4 px bottoni e campi, 999 px solo per la pillola contatti del telefono.
- Ombre neutre: su chiaro `0 24px 48px -28px rgba(12,13,11,.22)`; su nero `0 40px 80px -40px rgba(0,0,0,.6)`.
- Materia: niente grana; filetti 1 px; vetro solo per la testata quando si scorre — chiaro sui capitoli bianchi
  (`rgba(255,255,255,.8)` + `backdrop-filter: blur(14px) saturate(140%)` + bordo 1 px `--linea-chiara`), scuro sui
  capitoli neri (`rgba(12,13,11,.72)` + bordo `--linea-scura`).
- **Evidenziatore**: `background-image: linear-gradient(transparent 54%, var(--acido-400) 54%, var(--acido-400) 90%,
  transparent 90%)`, `background-repeat: no-repeat`, `background-size: 100% 100%` (si anima da `0% 100%`),
  `padding: 0 .08em`, `box-decoration-break: clone`.
- **Foto in bianco e nero**: tutte, esportate già convertite (scala di grigi, contrasto +5%), non con `filter` in CSS.
- Breakpoint: 640 · 900 · 1200 · 1600.

## 4. Architettura

- Pagine: `index.html` (Home), `executive-search/`, `executive-coaching/`, `contatti/`. Privacy e cookie: link alle
  pagine originali (`https://talentlabconsulting.it/privacy-policy`, `/cookie-policy`). Link relativi (la cartella
  della demo B è da decidere, §9).
- **Testata**: logo a sinistra, **in versione scura** sui capitoli bianchi e platino su quelli neri (il logo originale è
  platino su trasparente: nella demo basta ricolorarlo con `filter: brightness(0)`; per la produzione serve il file
  nero, §9). Su computer menu in chiaro — Executive Search · Executive Coaching · Team Development · Contatti — e
  bottone verde «Parla con noi». Trasparente sull'eroe, poi vetro (chiaro o scuro secondo il capitolo sotto); si
  nasconde scorrendo in giù e torna scorrendo in su. Voce attiva con l'evidenziatore verde.
- **Telefono**: logo + bottone «Menu» (parola + due linee). Menu a tutto schermo **nero** che si apre a cerchio
  dall'angolo del bottone: link grandi in bianco che entrano in cascata, voce attiva in verde, bussola (linee bianche,
  ago verde) che ruota lenta sullo sfondo, in fondo WhatsApp e mail. Esc/«Chiudi» per uscire, focus intrappolato.
- **Pillola contatti (solo telefono)**: dopo l'eroe compare in basso una pillola nera con «WhatsApp» (bottone verde) e
  «Scrivici» (bianco), 48 px, rispetta la safe area; sparisce sul footer e col menu aperto.
- **Footer** (nero): grande riga «Talent Strategy. Human *Impact.*» con «Impact.» in verde, menu, contatti, dati
  societari («Talent Lab OS è un marchio di OCC Consulting Srl · P.IVA e C.F. 02180480689»), privacy e cookie, «Torna
  su» con l'ago della bussola che punta in alto.
- Niente banner cookie nella demo: nessun cookie, nessun font o script di terze parti.

## 5. Pagina per pagina

Stessa struttura e stessi testi della versione A. I capitoli alternano **bianco** per leggere e **nero** per i momenti
forti; le chiamate finali chiudono su **verde pieno**:

| Capitolo | Fondo | Note |
|---|---|---|
| Eroi Home, Executive Search, Executive Coaching (H1, S1, C1) | bianco | foto B/N, velatura bianca da sinistra |
| Eroe Contatti (K1) | nero | foto `riunione` B/N velata all'80% |
| Capitoli di lettura (H2, H2b, H6, S3, C2, C4, K2) | bianco o `--carta-50`, alternati | |
| Fasce, framework, vetta, processo, aree, citazioni (H3, H4, H5, S2, C3, C5, C6) | nero `--inchiostro-950` | testo bianco e nebbia, parole chiave in verde |
| Chiamate finali (H7, S4, C7) | **verde acido** | testo e bottoni neri |
| Footer, menu telefono | nero | |

### 5.1 Home

**H1 — Eroe (bianco, `min-height: 100svh`)**
- Foto `bussola` in B/N a tutto schermo, `object-position` sulla bussola; velatura bianca da sinistra (bianco al 100% →
  0% al 65%) per leggere il testo. Niente particelle.
- Testo allineato a sinistra:
  - Etichetta: «Boutique consultancy · Banking & Finance»
  - H1: «Talent Strategy. / Human *Impact.*»
  - Lead: «Siamo una boutique consultancy specializzata nello sviluppo del talento. Uniamo esperienza, rigore
    metodologico e una profonda attenzione alle persone per aiutare le aziende a costruire organizzazioni più forti,
    consapevoli e orientate al futuro.»
  - Bottoni: «Parla con il nostro team» (primario verde → `contatti/`) · «Scarica la brochure» (secondario, PDF).
- In basso: «Scorri» con filetto che scende; a destra la **bussola** (SVG a linee nere, ago verde; 132 px telefono /
  188 px computer).
- Effetto: entrata orchestrata in 1,2 s (§6.2); la foto parte da `scale 1.08` e si assesta; l'evidenziatore si disegna
  sotto «Impact.»; scorrendo la foto va in parallasse (−12%); la bussola su computer segue il puntatore, su telefono
  oscilla con la velocità dello scorrimento e torna a Nord.

**H2 — Il punto di partenza (`--carta-50`)**
- Griglia 7/5: a sinistra testo, a destra foto `futuro` (scale verso il cielo, B/N) verticale 4:5.
  - Etichetta: «Il punto di partenza»
  - H2: «L'esperienza diventa *metodo*.»
  - Corpo: «Le organizzazioni non hanno semplicemente bisogno di trovare persone competenti: hanno bisogno di
    riconoscere il potenziale, attrarlo, farlo evolvere e trasformarlo in valore.»
  - Riga in evidenza [brochure p.2]: «Il talento non è il punto di arrivo. È il punto da cui partire.»
- Sotto, a tutta larghezza: citazione «Il talento genera valore / quando il potenziale trova una *direzione*.» con una
  barra verde (120 × 10 px) che si allunga da sinistra.
- Effetto: la foto si apre con una tendina (`clip-path: inset(100% 0 0 0)` → `inset(0)`) e dentro si muove in
  parallasse; titoli che salgono da una maschera, riga per riga, poi l'evidenziatore.

**H2b — Chi siamo (bianco)** [aggiunta 17/11 con le foto del titolare]
- Griglia 5/7: a sinistra il **ritratto del titolare** (`titolare-ritratto`, B/N, cornice 4:5 con tendina); sull'angolo
  un **sigillo** nero con l'emblema Φ bianco, un punto verde al centro e la scritta circolare «TALENT LAB OS · STRATEGIC
  SYSTEM · HUMAN IMPACT» che gira piano e accelera (anche al contrario) con lo scroll.
  - Etichetta: «Chi siamo»
  - H2 [proposto]: «Esperienza vera, *dalla parte delle persone*.»
  - Lead [brochure 2023, «Chi siamo»]: «Siamo un team di specialisti nel campo dell'Executive Financial Head Hunting,
    della formazione manageriale e del business coaching.»
  - Citazione [brochure p.7, Divisione Angel]: «Non cerchiamo una persona per un'azienda. Cerchiamo l'azienda giusta
    *per la persona*.»
  - Numero che conta da 0 entrando: «25+ · anni di esperienza» [brochure 2023: «oltre 25 anni di esperienza»], in cifre
    grandi strette; accanto le tre specializzazioni in elenco.
  - Link «Parla con noi →». Nessun nome in didascalia finché Riccardo non lo conferma.

**H3 — Fascia in movimento (nero, 1 riga)**
- [brochure p.1, p.5] «People · Ideas · Methods · Results · Talent is not a resource. It is a strategic choice. ·»
  in Instrument Sans 500 bianco, alternato a parole in verde. Scorre lenta, accelera e inverte con lo scroll.

**H4 — Un sistema completo (nero)**
- Intestazione in griglia 5/7:
  - Etichetta: «Il framework»
  - H2: «Un sistema completo per un impatto *ad alto valore*.»
  - Lead: «Un sistema integrato di soluzioni per attrarre, sviluppare e connettere le persone, generando un impatto
    misurabile e duraturo.»
  - Riga [brochure p.4]: «Stessi principi. Contesti diversi. Risultati concreti.»
- **Tre pannelli che si impilano** (sticky): ogni pannello si ferma sotto la testata e il successivo gli scorre sopra;
  quello sotto si rimpicciolisce a 0.94 e si scurisce. Pannello (`--inchiostro-800`) = foto B/N a sinistra (computer) /
  sopra (telefono, 16:10) + testo. Numeri grandi stretti in verde.
  1. **01 · Choose — Strategy Recruiting** · foto `uomo-skyline` · «Attraiamo e selezioniamo i migliori talenti, in
     linea con i valori e gli obiettivi della tua organizzazione.» · [brochure p.4] «Le persone giuste. Le condizioni
     giuste. Per generare valore.» · link «Executive Search →» (`executive-search/`)
  2. **02 · Develop — Leadership & Coaching** · foto `titolare-formazione` (il titolare in aula) · «Supportiamo la
     crescita di leader e team attraverso percorsi di sviluppo su misura e strumenti evidence-based.» · link
     «Executive Coaching →»
  3. **03 · Connect — Team Development** · foto `team-cerchio` (il team in cerchio visto dal basso) · «Costruiamo team
     più coesi, consapevoli e performanti, valorizzando le relazioni e la collaborazione.» · [brochure p.4] «Persone
     che collaborano. Team che performano. Organizzazioni che crescono.» · link «Team Coaching + Team Building →»
     (`#team`)
- Su schermi bassi (altezza < 640 px) o con movimento ridotto: pannelli in colonna normale.

**H5 — Riconoscere il potenziale (nero, foto `vetta` B/N)**
- Sezione alta 200svh (telefono 170svh) con interno sticky a tutto schermo: foto della vetta in bianco e nero.
- Frase che **si accende parola per parola** scorrendo (opacità .16 → 1, le ultime due parole in verde):
  «Riconoscere il potenziale è l'inizio. / Trasformarlo in valore è *la vera sfida*.»
- Mentre la frase si accende la foto si schiarisce (velatura nera dal 75% al 45%) e una barra verde sotto la frase si
  allunga fino a fine riga. È sticky, non blocca: si scorre sempre alla velocità del dito.

**H6 — Connect: Team Coaching + Team Building (bianco, `id="team"`)** [brochure p.14]
- Etichetta: «Connect · Team Development»
- H2: «L'esperienza attiva il team. *Il coaching la trasforma.*»
- Corpo: «Integrare Team Building e Team Coaching significa trasformare l'esperienza in insight concreti e risultati
  duraturi, accelerando l'evoluzione del team.»
- Foto larga 21:9 (4:3 sul telefono) `team-parco` B/N con tendina e parallasse, prima del modello.
- Modello in 6 passi (linea orizzontale su computer, verticale su telefono; la linea nera si disegna e i punti si
  accendono in verde in sequenza): **Experience** — Il team vive un'esperienza concreta e sfidante · **Observe** —
  Emergono comportamenti, dinamiche e opportunità · **Debrief** — L'esperienza viene riletta attraverso il coaching ·
  **Insight** — Il team riconosce pattern, risorse e aree di evoluzione · **Transfer** — Gli insight vengono riportati
  nel contesto professionale reale · **Change** — Nuovi comportamenti diventano pratica di lavoro.
- Riquadro partner (fondo `--carta-50`, filetto nero in alto): «Team Building · Strategic Partner — Per la
  progettazione e la realizzazione delle attività di team building, Talent Lab Consulting opera in partnership con
  **TeamBuilding.it**, partner strategico specializzato nella creazione di esperienze di team building ad alto valore.» ·
  link «Le attività su teambuilding.it →» (`https://www.teambuilding.it/formazione/`). Solo testo, niente logo.

**H7 — Chiamata finale (verde acido pieno)**
- H2: «Parla con il nostro *team* di esperti.» — sul verde la parola chiave va in un riquadro nero con il testo verde.
- Corpo: «Per informazioni sui nostri servizi o per essere ricontattato.»
- Bottoni: «Scrivici» (primario nero con testo verde → `contatti/`) · «WhatsApp» · «Brochure (PDF)» (secondari, bordo
  nero).
- Effetto: entrando, la bussola grande in filigrana (linee nere al 10%) ruota e **si ferma esatta sul Nord**: fine del
  viaggio.

### 5.2 Executive Search

**S1 — Eroe (bianco, foto `uomo-skyline` B/N)**
- Etichetta: «01 · Choose — Executive Search»
- H1: «Specializzazione che diventa *metodo*.»
- Sottotitolo etichetta: «Banking & Finance Specialist Practice»
- Settori in fila, separati da punti [brochure p.5]: «Banking · Private Banking · Wealth Management · Financial Advisory»
- Lead: «Un percorso progettato per Banche, Reti di Consulenza Finanziaria, Private Banking e Wealth Management,
  costruito sulla conoscenza delle dinamiche professionali, organizzative e di sviluppo del settore.»
- A destra, grande in grafite: «Persone giuste. / Organizzazioni più forti.»

**S2 — Il nostro processo (nero) — firma: il quadrante**
- Etichetta: «Il nostro processo» · H2: «Un approccio consulenziale, *concreto, misurabile*.» [brochure p.5]
- Corpo [brochure p.5]: «Ogni progetto nasce dalla comprensione dell'organizzazione, dei suoi obiettivi di crescita,
  del mercato di riferimento e delle caratteristiche dei professionisti che desidera attrarre.»
- **Quadrante-bussola** (linee bianche, ago verde) con 5 tacche (una ogni 72°, numerate 01-05): l'ago punta la fase che
  stai leggendo e alla fine torna a Nord (il processo è un ciclo). Computer: quadrante sticky a sinistra (420 px), le 5
  fasi scorrono a destra, la fase attiva piena con la barra verde, le altre al 35%. Telefono: barra sticky sotto la
  testata con quadrante da 88 px e nome della fase attiva; le fasi scorrono sotto.
  1. **Analisi** · Analyze — «Analisi dell'azienda committente, del contesto, degli obiettivi di sviluppo e del
     bisogno di talenti.» (titolo dalla brochure: sul sito mancava)
  2. **Definizione** · Define — «Definizione del profilo del candidato target e dei criteri di ricerca e valutazione.»
  3. **Progettazione** · Design — «Progettazione della strategia e dell'iter di Executive Search, su misura per
     l'organizzazione.»
  4. **Azione** · Act — «Scouting, contatto, screening, assessment, colloqui e affiancamento al processo di scelta.»
  5. **Revisione** · Review — «Analisi delle attività, feedback e reportistica per misurare i risultati e
     valorizzare l'investimento.»

**S3 — Più di una ricerca (bianco)**
- Griglia: foto `team-lavagna` (verticale: il titolare alla lavagna con i manager) · testo · foto
  `palazzo-people-ideas` (verticale, sfalsata di 64 px); entrambe in B/N.
  - Etichetta: «Più di una ricerca»
  - H2: «Un percorso di sviluppo per chi *guida il cambiamento*.»
  - Corpo: «Affianchiamo manager e organizzazioni con formazione tecnica e supporto operativo, per sviluppare le
    competenze necessarie a gestire direttamente sourcing, colloquio, valutazione e negoziazione.»
- Tre voci come elenco tipografico con filetti (non card): **Formazione manageriale** — Metodi, strumenti,
  simulazioni · **Affiancamento ai colloqui** — Conduzione one to one, analisi e valutazione · **Analisi e
  reportistica** — Dati, insight e raccomandazioni. [titoli e testi brochure p.5]
- Citazione [brochure p.5]: «Dalla ricerca della persona *alla qualità della decisione*.»

**S4 — Chiamata finale** come H7, su verde pieno (testo: «Cerchi la persona giusta per la tua rete?» [proposto] +
bottoni).

### 5.3 Executive Coaching

**C1 — Eroe diviso (bianco, foto `titolare-platea` B/N)**
- Computer: griglia 5/7, testo a sinistra sul bianco, a destra il **titolare che parla sorridendo a un gruppo di
  manager** a tutta altezza, sfumato verso il bianco sul bordo sinistro. Telefono: foto sopra (56svh), testo sotto.
- Etichetta: «02 · Develop — Executive Coaching»
- H1 [brochure p.11]: «Dal ruolo *all'impatto*.»
- Lead: «Percorsi di sviluppo per chi guida persone, decisioni e organizzazioni.» · bottone «Parliamone» [proposto]
- Sotto, in grafite [brochure p.11]: «Persone più consapevoli. Organizzazioni più forti. Un impatto più duraturo.»

**C2 — Manifesto (`--carta-50`)**
- Testo grande in Instrument Sans che **si accende riga per riga**: «Il coaching per noi non è uno spazio astratto di
  riflessione. È un intervento costruito intorno alla persona, al ruolo e al contesto organizzativo reale, per
  trasformare consapevolezza e potenziale in comportamenti capaci di produrre *impatto e valore*.»
- Corpo: «Sviluppiamo percorsi di coaching individuale per leader, manager e professionisti che desiderano ampliare la
  propria consapevolezza per generare un impatto concreto e sostenibile nel proprio contesto professionale.»
  [brochure p.11] «Lavoriamo con Executive, Senior Manager e Manager sulle sfide che incontrano concretamente nel
  proprio ruolo.»

**C3 — Le aree di intervento (nero)** — griglia 2×2 asimmetrica (righe 7/5 e 5/7), pannelli con bordo che si
illumina di verde sotto il puntatore; su telefono colonna con numeri grandi.
1. **Leadership** — «Identità manageriale, autorevolezza e capacità di guida. Una leadership più consapevole,
   pragmatica e sostenibile.»
2. **Decision making** — «Gestione della complessità, responsabilità e qualità delle decisioni. Dalla riflessione
   all'azione, con maggiore lucidità e sicurezza.»
3. **People management** — «Relazioni, comunicazione, feedback e sviluppo delle persone. Team più motivati, allineati
   e orientati al risultato.»
4. **Performance** — «Priorità, execution e trasformazione delle intenzioni in azione. Risultati più concreti e un
   impatto duraturo nel tempo.»
(«Leadership» e «Performance» mancavano sul sito: titoli dalla brochure p.11.)

**C4 — Il nostro approccio (bianco)** — quattro tappe su una linea nera che si disegna (come una strada); ogni tappa
si accende in verde quando la linea la raggiunge:
1. **Esperienza reale** [titolo proposto] — «Un percorso strutturato, basato su esperienza reale nel mondo del Banking
   & Finance.»
2. **Framework proprietari** — «Framework di pronto utilizzo per le diverse esigenze del coachee e strumenti
   personalizzati sulle esigenze specifiche.»
3. **Orientato all'azione** — «Dalla consapevolezza personale e di ruolo al comportamento.»
4. **Impatto nel tempo** — «Cambiamento sostenibile e crescita continua.»

**C5 — Fascia in movimento (nero)** [brochure p.11]: «Insight · Better questions · Bolder action · Real impact ·»

**C6 — Citazione (nero, foto `strada-tramonto` B/N)**: «La consapevolezza diventa valore / quando cambia *il modo di
agire*.» — si accende parola per parola, l'uomo cammina verso la luce (parallasse lenta).

**C7 — Chiamata finale** come H7, su verde pieno («Il cambiamento inizia da come guardi le cose.» [brochure p.11]).

### 5.4 Contatti

**K1 — Eroe corto (nero, foto `riunione` B/N velata all'80%)**
- H1 [proposto]: «Parliamo del *prossimo passo*.»
- Lead: «Per informazioni sui nostri servizi o per essere ricontattato dal nostro team di esperti.»

**K2 — Due colonne (bianco)**
- Sinistra, contatti come righe grandi interattive (icona a tratto + testo + azione):
  - **E-mail** — info@talentlabconsulting.it · azioni «Scrivi» (mailto) e «Copia» (con conferma «Copiato»)
  - **WhatsApp** — «Chatta con noi · +39 380 633 8747» → `https://wa.me/393806338747`
  - **Brochure** — «Talent Lab OS, 15 pagine (PDF)» → download
  - **LinkedIn** — da aggiungere quando Riccardo ci dà l'URL (oggi sul sito non è un link): nella demo non compare.
- Destra, modulo (etichette sopra i campi): **Nome** · **E-mail** · **Messaggio** · casella «Ho letto l'informativa
  privacy» (link) · bottone verde «Invia richiesta». Senza backend: valida in linea (errori sotto il campo,
  `aria-live`), poi **compone una mail** a info@ con oggetto «Richiesta informazioni dal sito» e testo; stato di
  conferma «Stiamo aprendo la tua app di posta» con «Copia il messaggio» come alternativa. In produzione si collega a
  un vero invio.
- Sotto: «Talent Lab OS è un marchio di proprietà di OCC Consulting Srl · P.IVA e C.F. 02180480689».

## 6. Motion system

### 6.1 Principi
1. **Una firma, tanti dettagli silenziosi**: la bussola con l'ago verde e l'evidenziatore che si disegna sono il
   «wow»; tutto il resto (rivelazioni, hover, bottoni) è preciso e breve.
2. **Lo scorrimento non si blocca mai**: niente scroll-jacking. Solo `position: sticky` dentro sezioni più alte
   (massimo 200svh) e animazioni legate allo scroll con `scrub` morbido (0.6 s).
3. **Solo `transform` e `opacity`** (più `clip-path` per le tendine e `background-size` per l'evidenziatore). Niente
   animazioni di layout.
4. **Telefono prima**: su touch niente puntatore, parallasse più corta (±8%), scorrimento nativo.

### 6.2 Tempi e curve
- Curve: `--ease-out-expo: cubic-bezier(.16,1,.3,1)` (entrate) · `--ease-out-quart: cubic-bezier(.25,1,.5,1)`
  (interfaccia) · GSAP `expo.out` / `power3.out`. Niente rimbalzi né elastici.
- Durate: feedback 120-160 ms · stati 220-300 ms · rivelazioni 700-900 ms · uscite al 75% dell'entrata. Un po' più
  rapide della versione A: il bianco vuole ritmo.
- Cascate: 80-120 ms tra elementi; titoli riga per riga (`yPercent 110 → 0`, maschera).
- **Evidenziatore**: dopo l'ultima riga del titolo la fascia verde si disegna da sinistra (`background-size: 0% 100%`
  → `100% 100%`, 600 ms, `--ease-out-expo`); su più righe, una riga dopo l'altra.
- **Entrata dell'eroe (1,2 s)**: 0 ms foto da `scale 1.08` (2 s, continua sotto) · 200 ms etichetta · 300 ms H1 riga
  per riga · 500 ms la bussola si disegna (tratto) e l'ago oscilla smorzato fino a fermarsi · 650 ms evidenziatore sotto
  «Impact.» · 700 ms lead · 850 ms bottoni.

### 6.3 Catalogo
| Effetto | Dove | Computer | Telefono | Movimento ridotto |
|---|---|---|---|---|
| Evidenziatore che si disegna | parole chiave su chiaro | da sinistra, dopo il titolo | uguale | già disegnato |
| Bussola (molla) | eroe, menu, H7, footer | segue il puntatore, torna a Nord | oscilla con la velocità di scroll | ferma a Nord |
| Quadrante del processo | Executive Search S2 | sticky 420 px, ago sulla fase | barra sticky 88 px | fasi in colonna, ago fermo |
| Pannelli impilati | Home H4 | sticky + scala .94 | sticky | colonna normale |
| Frase che si accende | Home H5, Coaching C2/C6 | scrub parola per parola | uguale | tutto acceso |
| Tendina sulle foto | foto di sezione | `clip-path` + parallasse interna | uguale, parallasse ±8% | foto ferma |
| Titoli a maschera | tutti gli H1/H2 | righe in cascata | uguale | statici |
| Fascia in movimento | Home H3, Coaching C5 | velocità legata allo scroll | uguale | ferma |
| Linea che si disegna | modelli a passi, citazioni | SVG `stroke-dashoffset` (nera); barre verdi in `scaleX` | uguale | linea piena |
| Bottoni magnetici + riflesso | bottoni primari | attrazione 6 px + riflesso bianco | solo riflesso al tocco | solo cambio colore |
| Bordo che si illumina | pannelli delle aree | luce verde sotto il puntatore | bordo statico | bordo statico |
| Barra di avanzamento | in cima | 3 px verde (CSS scroll-timeline) | uguale | assente |
| Testata che cambia tono | tutte | vetro chiaro sul bianco, scuro sul nero | uguale | uguale |
| Cambio pagina | tutte | View Transitions: dissolvenza + 12 px, logo fermo | uguale | nessuna |
| Testata intelligente | tutte | si nasconde giù / torna su | uguale | uguale |

### 6.4 Librerie
GSAP 3.15 + ScrollTrigger + SplitText (righe con maschera), Lenis 1.3 (rotella più morbida su computer; sul telefono
scorrimento nativo). Tutto in locale, caricato in coda (`defer`). CSS per hover e stati.

## 7. Componenti
- **Bottone primario**: fondo `--acido-400`, testo `--inchiostro-950` (15,3:1), Instrument Sans 600 15 px, padding
  16×26, raggio 4; hover `--acido-300` + riflesso diagonale bianco che attraversa (600 ms) + attrazione magnetica;
  `:active` scala .98; focus: anello 2 px inchiostro con distacco 3 px (su nero: anello verde). **Sul verde** (chiamate
  finali) si inverte: fondo nero, testo verde.
- **Bottone secondario**: bordo 1 px inchiostro al 35% su chiaro, bianco al 40% su nero, nero pieno sul verde; testo
  pieno; hover: bordo pieno.
- **Link testuale**: testo con sottolineatura 1 px; hover: l'evidenziatore si disegna sotto la parola e la freccia
  avanza di 4 px. Su nero: testo bianco, hover verde.
- **Parola chiave** (la *parola* dei titoli): su chiaro nera con l'evidenziatore (§3.3); su nero testo verde; sul verde
  testo verde in un riquadro nero (`padding: 0 .12em`). Mai corsivo.
- **Etichetta di sezione**: trattino 28 px (nero su chiaro, verde su nero) + testo maiuscolo spaziato.
- **Pannello del framework**: `--inchiostro-800`, bordo `--linea-scura`, foto B/N, numero grande stretto in verde.
- **Fase del processo**: numero grande stretto, nome IT in H3, nome EN in etichetta, testo; attiva = piena + barra
  verde.
- **Campi**: etichetta sopra, fondo bianco, bordo 1 px inchiostro al 25%, focus bordo inchiostro + anello verde 3 px;
  errore in `--errore` sotto il campo con icona.
- **Bussola**: SVG a linee (inchiostro su chiaro, bianche su nero, nere al 10% in filigrana sul verde), tacche,
  N E S O, ago nord `--acido-400` con contorno inchiostro, ago sud inchiostro (bianco su nero). Sempre
  `aria-hidden="true"`.
- **Menu telefono**: vedi §4. **Pillola contatti**: nera, WhatsApp verde e Scrivici bianco, bottoni da 48 px.
- **Icone**: SVG a tratto 1.5 px (set Phosphor «light»), mai sopra ogni titolo: solo nei contatti, nelle fasi e nei
  passi del modello. Concetti: lente (Analisi), profilo (Definizione), squadra/compasso (Progettazione), stretta di
  mano (Azione), grafico (Revisione), cappello (Formazione), dialogo (Colloqui), documento-grafico (Reportistica),
  busta, WhatsApp, file PDF, freccia.

## 8. Accessibilità, prestazioni, SEO
- Struttura semantica (header/nav/main/section/footer), un solo H1 per pagina, «Salta al contenuto», ordine di lettura
  = ordine visivo, `alt` in italiano su ogni foto, focus visibile, menu con `aria-expanded` ed Esc.
- Bussole e sigillo sono decorativi: SVG con `aria-hidden="true"` e `focusable="false"` (nella demo di oggi le lettere
  N E S O finiscono nel testo letto: «Torna su NESO»).
- Il verde acido non è mai colore del testo su bianco; ogni stato (focus, errore, fase attiva) si legge anche senza
  colore.
- `prefers-reduced-motion`: niente Lenis, parallasse, scrub; tutti i testi visibili; evidenziatori già disegnati;
  bussola ferma.
- LCP < 2,5 s su 4G: foto dell'eroe AVIF/WebP (già in B/N) in 640/1024/1600/2000 px con `fetchpriority="high"` e
  `preload`; le altre `loading="lazy"`; un solo font precaricato; JS totale < 120 kB compresso.
- Title e description: quelli originali per pagina. Demo: `<meta name="robots" content="noindex, nofollow">` +
  intestazione `X-Robots-Tag` (non deve fare concorrenza al sito vero).

## 9. Decisioni aperte (per Daniele / Riccardo)
1. Dove pubblicare la demo B: proposta `https://www.teambuildingsrl.it/riccardo-b/`, accanto alla A (stesso `noindex`).
2. **Logo scuro** per i fondi bianchi: va chiesto a Riccardo; nella demo basta ricolorare il PNG platino.
3. **Foto in bianco e nero**: ok per Riccardo? L'alternativa è tenerle a colori solo nei capitoli neri.
4. Contenuti presi dalla brochure (§5: processo in 5 fasi, partner TeamBuilding.it, frasi brevi): ok da pubblicare?
5. Il quarto pilastro della brochure, **04 · Grow — Learning & Development**, non è sul sito: aggiungerlo?
6. URL della pagina LinkedIn.
7. Modulo contatti: in produzione serve un invio vero (servizio form o script sul suo hosting).
8. Nome e ruolo del titolare per una didascalia sotto il ritratto di «Chi siamo» (oggi niente nome).

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

**In B tutte le foto vanno in bianco e nero**: file già convertiti (scala di grigi, contrasto +5%), AVIF/WebP in
640/1024/1600/2000 px; per non confonderli con quelli della A, suffisso `-bn` (es. `bussola-bn-1600.avif`). Il logo
serve anche in versione scura (§4, §9).

## 11. Checklist di accettazione
**Telefono (iPhone 390 px e Android 360 px)**
- [ ] Niente scorrimento orizzontale in nessuna pagina; testo corpo ≥ 16 px; bottoni ≥ 48 px.
- [ ] L'eroe si legge in un colpo d'occhio, con bottone «Parla con il nostro team» visibile senza scorrere.
- [ ] Scorrendo veloce non c'è mai una scena che si blocca; i pannelli impilati e la frase che si accende seguono il dito.
- [ ] Menu: si apre, si chiude, porta alle pagine; pillola WhatsApp/Scrivici sempre a portata di pollice.
- [ ] Modulo: errori chiari, poi si apre la mail già scritta.
**Computer (1440 px)**
- [ ] Menu in chiaro, testata che sparisce, ritorna e cambia tono sui capitoli neri; bussola che segue il puntatore e
  torna a Nord.
- [ ] Processo: l'ago punta la fase che sto leggendo, alla fine torna a Nord.
- [ ] Cambio pagina con dissolvenza (Chrome, Edge, Safari).
**Sempre**
- [ ] Il verde acido non compare mai come colore del testo su bianco; nessun oro e nessun blu notte rimasti.
- [ ] Logo leggibile su bianco (versione scura) e su nero.
- [ ] Tutte le foto in bianco e nero.
- [ ] Nessun «NESO» nel testo letto: bussole e sigillo con `aria-hidden="true"`.
- [ ] Con «riduci movimento» attivo il sito è completo e bello, fermo.
- [ ] Lighthouse telefono: Prestazioni ≥ 85, Accessibilità ≥ 95; nessun errore in console.
- [ ] `noindex` presente (meta + intestazione).
