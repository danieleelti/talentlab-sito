#!/bin/bash
# deploy.sh — pubblica il sito via FTP sull'hosting (dati in .env: vedi .env.example). Prima ricostruisce tutte e due le
# versioni (tools/build.mjs). Carica solo i file cambiati dall'ultimo deploy di quel tema (--all: tutto).
#   versione A «Notte e oro»: sito/   → $FTP_REMOTE_A, visibile su $URL_A   (stamp tools/.ultimo-deploy)
#   versione B «Verde acido»: sito-b/ → $FTP_REMOTE_B, visibile su $URL_B   (stamp tools/.ultimo-deploy-b)
# Uso: tools/deploy.sh [--tema a|b] [--all]
# Prudenza: la prima volta puntare FTP_REMOTE_* a una cartella di prova dell'hosting (es. demo/), non alla radice del sito
# vero. Le credenziali passano a curl con un netrc temporaneo (600): non compaiono in `ps` né a schermo.
set -euo pipefail
R=$(cd "$(dirname "$0")/.." && pwd)
[ -f "$R/.env" ] || { echo "Manca $R/.env: copia .env.example in .env e compila FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_REMOTE_A/B, URL_A/B" >&2; exit 1; }
set -a; . "$R/.env"; set +a
TEMA=a; ALL=
while [ $# -gt 0 ]; do
  case "$1" in
    --all) ALL=1 ;;
    --tema) TEMA=${2:-}; shift ;;
    --tema=*) TEMA=${1#--tema=} ;;
    *) echo "uso: tools/deploy.sh [--tema a|b] [--all]" >&2; exit 2 ;;
  esac
  shift
done
case "$TEMA" in
  a) DIR=sito;   REMOTE=${FTP_REMOTE_A:-}; URL=${URL_A:-}; STAMP=$R/tools/.ultimo-deploy;   FONT=newsreader-2.woff2; OG=og.jpg ;;
  b) DIR=sito-b; REMOTE=${FTP_REMOTE_B:-}; URL=${URL_B:-}; STAMP=$R/tools/.ultimo-deploy-b; FONT=instrument-1.woff2; OG=og-b.jpg ;;
  *) echo "tema sconosciuto: $TEMA (a oppure b)" >&2; exit 2 ;;
esac
: "${FTP_HOST:?FTP_HOST mancante in .env}" "${FTP_USER:?FTP_USER mancante in .env}" "${FTP_PASSWORD:?FTP_PASSWORD mancante in .env}"
[ -n "$REMOTE" ] && [ -n "$URL" ] || { echo "In .env mancano FTP_REMOTE_$(echo "$TEMA" | tr a-z A-Z) o URL_$(echo "$TEMA" | tr a-z A-Z)" >&2; exit 1; }
case "$URL" in */) ;; *) URL="$URL/" ;; esac
PROTO=${FTP_PROTOCOL:-ftp}   # ftp, oppure ftps se l'hosting lo supporta (consigliato)

node "$R/tools/build.mjs" >/dev/null

NETRC=$(mktemp); chmod 600 "$NETRC"; trap 'rm -f "$NETRC"' EXIT
printf 'machine %s login %s password %s\n' "$FTP_HOST" "$FTP_USER" "$FTP_PASSWORD" > "$NETRC"
cd "$R/$DIR"
if [ -n "$ALL" ] || [ ! -f "$STAMP" ]; then FIND=(find . -type f); else FIND=(find . -type f -newer "$STAMP"); fi
n=0
while IFS= read -r -d '' f; do
  rel=${f#./}
  curl -sS --netrc-file "$NETRC" --ftp-create-dirs --max-time 180 -T "$f" "$PROTO://$FTP_HOST/$REMOTE/$rel"
  n=$((n + 1))
done < <("${FIND[@]}" -print0)
touch "$STAMP"
echo "Caricati $n file su $URL"

# verifica: tutte le pagine (cartelle tranne assets e prove) e qualche file chiave
[ -f "assets/img/$OG" ] || OG=og.jpg
EXTRA=
[ "$TEMA" = b ] && EXTRA=assets/css/tema-b.css
PAGINE=$(ls -d */ | grep -v -e '^assets/' -e '^prove/' | tr '\n' ' ')
for u in "" $PAGINE assets/css/site.css $EXTRA assets/js/site.js assets/img/icons.svg "assets/img/$OG" assets/img/bussola-1600.avif "assets/fonts/$FONT"; do
  curl -sS -o /dev/null -w "%{http_code} %{content_type} %{time_total}s  $URL$u\n" --max-time 30 "$URL$u"
done
curl -sSI --max-time 20 "$URL" | grep -i '^x-robots-tag' || echo "nota: nessun X-Robots-Tag (ok se il sito è quello definitivo, da indicizzare)"
