# audit-testi.py — elenca i testi visibili della demo che NON compaiono nel sito originale.
# Regola di Daniele (17/11/2026): sul sito solo testi e nomi del sito scrapato. Uso: python3 -I tools/audit-testi.py
# Corpus (tutto quello che il sito dice):
#   - primo scrape: scrape/*.txt + title, description e testi dei link di scrape/*.json (4 pagine);
#   - secondo scrape: scrape/v2/*.txt (17 pagine; tolte le colonne «y x [font]» di ogni riga), sia nell'ordine di
#     lettura sia riga per riga della stessa colonna (i testi a capo interrotti da una colonna vicina), più title,
#     description e testi dei link di scrape/v2/*.json;
#   - le voci del menu del sito (dall'HTML renderizzato della home, scrape/v2/home.html);
#   - scrape/v2/testi-immagini.txt: testo trascritto dalle immagini (righe con # = note, escluse).
# Pagine controllate: tutte quelle costruite in sito/ (index.html e */index.html, tranne assets/ e prove/).
import html, json, re, sys
from html.parser import HTMLParser
from pathlib import Path

R = Path(__file__).resolve().parent.parent
V2 = R / 'scrape' / 'v2'

def norm(s):
    s = html.unescape(s).lower().replace('’', "'").replace('‘', "'").replace(' ', ' ')
    s = s.replace('è', 'e').replace('é', 'e').replace("'", ' ')  # refusi corretti del sito: «Perchè»→«Perché», «E'»→«È», «un organizzazione»→«un'organizzazione»
    s = re.sub(r"[.,;:!?«»\"“”„·—–\-*()+/|]", ' ', s)
    return re.sub(r'\s+', ' ', s).strip()

parts = []
# --- primo scrape (4 pagine)
for f in ['home', 'executive-search', 'executive-coaching', 'contatti']:
    parts.append((R / 'scrape' / f'{f}.txt').read_text())
    j = json.loads((R / 'scrape' / f'{f}.json').read_text())
    parts.append(j['title'] + ' ' + ' '.join(m['c'] for m in j['metas'] if m['n'] == 'description'))
    parts.append(' '.join(l['text'] for l in j['links']))

# --- secondo scrape (17 pagine)
LINE = re.compile(r'\s*(\d+)\s+(\d+)\s+\[([\d.]+)px\s+\d+\]\s?(.*)$')
def v2_lines(path):
    out = []
    for raw in path.read_text().splitlines():
        m = LINE.match(raw)
        if m and m[4].strip():
            out.append((int(m[1]), int(m[2]), float(m[3]), m[4].strip()))
    return out

def columns(lines):
    """Unisce le righe di una stessa colonna (x vicina, stessa dimensione, distanza ≤ 4 righe): così un testo andato a
    capo resta intero anche se, nell'ordine per y, in mezzo cade una riga della colonna accanto."""
    nxt = {}
    for i, (y, x, fs, _) in enumerate(lines):
        for j in range(i + 1, len(lines)):
            y2, x2, fs2, _ = lines[j]
            if y2 - y > 4 * fs + 12:
                break
            if y2 > y and abs(x2 - x) <= 100 and abs(fs2 - fs) <= 2:
                nxt[i] = j
                break
    starts = [i for i in range(len(lines)) if i not in nxt.values()]
    out = []
    for i in starts:
        chain = [lines[i][3]]
        while i in nxt:
            i = nxt[i]
            chain.append(lines[i][3])
        if len(chain) > 1:
            out.append(' '.join(chain))
    return out

pages_v2 = sorted(p for p in V2.glob('*.txt') if p.name != 'testi-immagini.txt')
for p in pages_v2:
    lines = v2_lines(p)
    parts.append(' '.join(t for *_, t in lines))
    parts.extend(columns(lines))
    j = json.loads(p.with_suffix('.json').read_text())
    parts.append(re.sub(r'\s*-\s*talentlabconsulting\s*$', '', j['title']) + ' ' + (j.get('description') or ''))
    parts.append(' '.join(l['text'] for l in j['links']))

# --- voci del menu del sito (non sono link <a>: div con attributo deeplink nell'HTML renderizzato)
menu = re.findall(r'deeplink="[^"]*"[^>]*>\s*<div[^>]*>\s*(?:<div[^>]*>)?\s*([^<]+?)\s*<', (V2 / 'home.html').read_text())
if len(menu) < 15:
    sys.exit(f'voci del menu trovate: {len(menu)} (attese 16): controlla scrape/v2/home.html')
parts.extend(html.unescape(m) for m in menu)

# --- testo trascritto dalle immagini
parts.extend(l for l in (V2 / 'testi-immagini.txt').read_text().splitlines() if l.strip() and not l.lstrip().startswith('#'))

corpus = ' | '.join(norm(x) for x in parts)

UI = {norm(x) for x in ['Salta al contenuto', 'Menu', 'Chiudi', 'Scorri', 'Copia', 'Riapri la mail', 'Copia il messaggio',
      'Stiamo aprendo la tua app di posta.', 'Fase', 'PDF', 'WhatsApp', 'E-mail', 'Servizi', 'Privacy', 'Torna su', 'Home',
      'Brochure', '©', 'Talent Lab OS', '+39 380 633 8747', '00', '01', '02', '03', '04', '05', '+',
      'Il messaggio è già scritto: premi «Invia» nella mail. Se non si apre niente, scrivi a info@talentlabconsulting.it oppure copia il testo.']}

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.out = []; self.inbody = False
    def handle_starttag(self, t, a):
        if t == 'body': self.inbody = True
        if t in ('script', 'style', 'svg', 'head', 'title'): self.skip += 1
    def handle_endtag(self, t):
        if t in ('script', 'style', 'svg', 'head', 'title'): self.skip -= 1
    def handle_data(self, d):
        if self.inbody and not self.skip and d.strip(): self.out.append(d.strip())

SITO = R / 'sito'
pages = [SITO / 'index.html'] + sorted(p for p in SITO.glob('*/index.html') if p.parent.name not in ('assets', 'prove'))
bad = 0
for page in pages:
    p = P(); p.feed(page.read_text())
    for t in dict.fromkeys(p.out):
        n = norm(t)
        if not n or n in UI or n in corpus or re.fullmatch(r'[\d ]+', n): continue
        print(f'{page.relative_to(SITO)}: «{t}»'); bad += 1
print(f'pagine controllate: {len(pages)} · voci del menu del sito: {len(menu)}')
print('testi fuori dal sito:', bad)
