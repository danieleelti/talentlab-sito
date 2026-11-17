#!/bin/bash
# assets.sh — prepara in sito/assets/ tutto quello che serve al sito, partendo da scrape/, foto-titolare/ e node_modules/ (npm install):
# immagini responsive (AVIF + WebP), logo e favicon, font self-hosted (woff2, solo latin), librerie JS, sprite icone SVG.
# Idempotente. Uso: tools/assets.sh
set -euo pipefail
R=$(cd "$(dirname "$0")/.." && pwd)
SRC=$R/scrape/img
A=$R/sito/assets
mkdir -p "$A"/{img,fonts,js,css}

# ---------- immagini: nome-breve -> file sorgente ----------
declare -A IMG=(
  [bussola]="scrape/img/bussola__53165033.png"
  [futuro]="scrape/img/futuro__407f78ec.png"
  [vetta]="scrape/img/*__e06a726c.png"
  [uomo-skyline]="scrape/img/*__ac3dcbba.png"
  [due-professionisti]="scrape/img/01_hero_due_professionisti__3aa229ab.jpeg"
  [riunione]="scrape/img/*__386f3fb9.png"
  [bussola-dettaglio]="scrape/img/*__1ab03822.png"
  [palazzo]="scrape/img/*__e006f37a.png"
  [strada]="scrape/img/*__17e1181a.png"
  # foto del titolare create da Daniele il 17/11/2026 (originali in foto-titolare/)
  [titolare-ritratto]="foto-titolare/titolare-ritratto.png"
  [titolare-platea]="foto-titolare/titolare-platea.png"
  [titolare-formazione]="foto-titolare/titolare-formazione.jpg"
  [team-parco]="foto-titolare/team-parco.png"
  [team-lavagna]="foto-titolare/team-lavagna.png"
  [team-cerchio]="foto-titolare/team-cerchio.png"
  # Riccardo di spalle, generata con Gemini il 17/11/2026 (docs/immagini/riccardo-skyline.txt): scelta di Daniele la v2
  [riccardo-skyline-v2]="foto-titolare/riccardo-skyline-v2.jpg"
  # secondo scrape (scrape/v2/img/<hash8>.*): foto delle 12 pagine nuove (docs/piano-pagine-nuove.md).
  # NON usare 7fd16299 (logo bianco di TeamBuilding.it, vietato); 33f7caab (avviso Formazione) si trascrive soltanto.
  [ss-bivio]="scrape/v2/img/71f9f32b.*"
  [ss-persone]="scrape/v2/img/b0883d83.*"
  [ss-team]="scrape/v2/img/99196c12.*"
  [ss-organizzazioni]="scrape/v2/img/ea4c099b.*"
  [approccio-luce]="scrape/v2/img/514093fd.*"
  [approccio-corridoio]="scrape/v2/img/7a04c897.*"
  [campi-vetta]="scrape/v2/img/602ae3cc.*"
  [campo-choose]="scrape/v2/img/8006135e.*"
  [campo-develop]="scrape/v2/img/e7fc3c74.*"
  [campo-connect]="scrape/v2/img/ef9ac4de.*"
  [campo-grow]="scrape/v2/img/97de1baa.*"
  [cycle-colloquio]="scrape/v2/img/d5146c10.*"
  [bussola-taccuino]="scrape/v2/img/ee554312.*"
  [angel-roma]="scrape/v2/img/524c5c9e.*"
  [percorso-pontile]="scrape/v2/img/1f247d4e.*"
  [career-donna]="scrape/v2/img/71fcc9ff.*"
  [c4c-scrivania]="scrape/v2/img/92b2965e.*"
  [metodo-sartoria]="scrape/v2/img/d917a48c.*"
  [metodo-strumenti]="scrape/v2/img/4cb712ba.*"
  [tctb-scalata]="scrape/v2/img/d1cac468.*"
)
# immagini con testo dentro (infografica, schede-poster dei Campi di azione): qualità più alta, il testo resta nitido
declare -A HIQ=([metodo-strumenti]=1 [campo-choose]=1 [campo-develop]=1 [campo-connect]=1 [campo-grow]=1)
for k in "${!IMG[@]}"; do
  f=$(ls $R/${IMG[$k]} | head -1)
  w0=$(identify -format "%w" "$f")
  for w in 640 1024 1600 2000; do
    [ "$w" -gt "$w0" ] && [ "$w" -ne 640 ] && continue
    for ext in avif webp; do
      out="$A/img/$k-$w.$ext"
      [ -s "$out" ] && continue
      q=52; [ "$ext" = webp ] && q=74
      if [ -n "${HIQ[$k]:-}" ]; then q=70; [ "$ext" = webp ] && q=86; fi
      magick "$f" -resize "${w}x>" -strip -quality $q "$out"
    done
  done
  # jpg di riserva (anteprime social, vecchi browser; per le infografiche è anche la versione «grande» da aprire)
  qj=78; [ -n "${HIQ[$k]:-}" ] && qj=90
  [ -s "$A/img/$k-1600.jpg" ] || magick "$f" -resize "1600x>" -strip -interlace Plane -quality $qj "$A/img/$k-1600.jpg"
  echo "img $k ($w0 px)"
done

# ---------- logo: taglio dei margini trasparenti, versioni per testata e footer ----------
L=$SRC/talent-lab-os-platino__8014aa39.png
magick "$L" -trim +repage "$A/img/logo-trim.png"
for h in 96 160; do
  magick "$A/img/logo-trim.png" -resize "x$h" -strip -quality 90 "$A/img/logo-$h.webp"
  magick "$A/img/logo-trim.png" -resize "x$h" -strip "$A/img/logo-$h.png"
done
rm -f "$A/img/logo-trim.png"
echo "logo: $(identify -format '%wx%h' "$A/img/logo-96.png") / $(identify -format '%wx%h' "$A/img/logo-160.png")"

# ---------- font (Google Fonts, licenza OFL) ----------
# Numerazione dei file = ordine dei blocchi nel CSS di Google: prima il corsivo, poi il tondo (-1 corsivo, -2 tondo;
# con un solo stile, -1). Versione A «Notte e oro» (sito/): Newsreader (titoli) + Hanken Grotesk (testo).
# Versione B «Verde acido» (sito-b/, assets copiati da build.mjs): Instrument Sans, solo tondo (larghezza 75-100).
# Bodoni Moda (prima demo) non serve più dal 17/11/2026.
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
fetch_font() { # $1 = query css2, $2 = prefisso file
  local css; css=$(curl -sS -A "$UA" "https://fonts.googleapis.com/css2?family=$1&display=swap")
  # tiene solo i blocchi /* latin */ (non latin-ext, cirillico, ecc.)
  echo "$css" | awk '/\/\* latin \*\//{f=1} f&&/src:/{print} /}/{f=0}' | grep -oE 'https://[^)]+\.woff2' | nl -ba | while read -r i url; do
    out="$A/fonts/$2-$i.woff2"
    [ -s "$out" ] || curl -sS -o "$out" "$url"
    echo "font $out $(stat -c %s "$out")"
  done
}
fetch_font "Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800" newsreader
fetch_font "Hanken+Grotesk:ital,wght@0,300..700;1,300..700" hanken
fetch_font "Instrument+Sans:wdth,wght@75..100,400..700" instrument

# ---------- librerie (GSAP 3.15.0, Lenis 1.3.27 da package.json: prima `npm install`) ----------
NM=$R/node_modules
[ -d "$NM/gsap/dist" ] && [ -d "$NM/lenis/dist" ] || { echo "manca node_modules: lancia npm install" >&2; exit 1; }
cp "$NM/gsap/dist/gsap.min.js" "$NM/gsap/dist/ScrollTrigger.min.js" "$NM/gsap/dist/SplitText.min.js" "$A/js/"
cp "$NM/lenis/dist/lenis.min.js" "$A/js/"
cp "$NM/lenis/dist/lenis.css" "$A/css/"
echo "librerie copiate"

# ---------- sprite icone (Phosphor «light», MIT) ----------
# Nomi: https://phosphoricons.com (versione light). Ogni icona viene scaricata con curl -f: se un nome non esiste
# (404) lo script si ferma senza toccare lo sprite (un 404 dentro lo sprite lo romperebbe).
ICONS="magnifying-glass user-focus compass-tool handshake chart-line-up graduation-cap chats-circle presentation-chart envelope-simple whatsapp-logo file-pdf arrow-right arrow-up-right arrow-up copy check x list mountains binoculars chat-circle-dots lightbulb target chart-bar warning-circle"
# 17/11/2026, pagine nuove: interfaccia (tendina, ingrandisci, link esterno) e concetti delle schede/fasi
ICONS="$ICONS caret-down arrows-out-simple arrow-square-out"
ICONS="$ICONS user users users-three buildings building-office identification-card user-check user-circle-gear user-switch student chalkboard-teacher"
ICONS="$ICONS cube stack squares-four puzzle-piece intersect graph tree-structure flow-arrow path steps strategy sliders-horizontal arrows-split arrows-out-cardinal shuffle circles-three circles-three-plus infinity arrows-clockwise"
ICONS="$ICONS compass navigation-arrow signpost map-trifold map-pin trend-up plant leaf rocket-launch flag crosshair scan lightning"
ICONS="$ICONS diamond sparkle coins medal trophy seal-check certificate chats ear megaphone eye link hand-heart lifebuoy fingerprint"
ICONS="$ICONS clipboard-text calendar-check presentation notebook briefcase list-checks funnel scissors globe"
TMP=$(mktemp "$A/img/.icons.XXXXXX") # sullo stesso disco dello sprite: il mv finale è atomico
trap 'rm -f "$TMP"' EXIT # niente file temporanei lasciati in sito/ (deploy.sh caricherebbe anche quelli)
(
  echo '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">'
  for n in $ICONS; do
    svg=$(curl -fsS "https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2.1.1/assets/light/$n-light.svg") || { echo "icona inesistente: $n" >&2; exit 1; }
    vb=$(echo "$svg" | grep -oE 'viewBox="[^"]+"' | head -1)
    [ -n "$vb" ] || { echo "icona senza viewBox: $n" >&2; exit 1; }
    inner=$(echo "$svg" | sed -E 's/<svg[^>]*>//; s#</svg>##')
    echo "<symbol id=\"i-$n\" $vb>$inner</symbol>"
  done
  echo '</svg>'
) > "$TMP" || { rm -f "$TMP"; echo "sprite icone NON aggiornato" >&2; exit 1; }
mv "$TMP" "$A/img/icons.svg"
chmod 644 "$A/img/icons.svg"
echo "icone: $(grep -c '<symbol' "$A/img/icons.svg")"
du -sh "$A"
