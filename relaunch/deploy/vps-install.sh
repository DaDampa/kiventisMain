#!/usr/bin/env bash
# =============================================================================
# KIVENTIS – Installation auf dem VPS
#
# Holt den Stand aus dem Git-Repository und legt ihn ins Webroot.
# Standardmäßig nur eine Vorschau (Trockenlauf); mit --apply wird geschrieben.
#
#   ./vps-install.sh <quelle> [zielverzeichnis] [--apply]
#
# <quelle> ist entweder ein lokales Verzeichnis (z. B. ./relaunch nach dem Klonen)
# oder eine Git-URL, aus der das Paket geklont wird.
#
# Beispiel auf dem VPS:
#   git clone https://github.com/DaDampa/kiventisMain.git
#   ./kiventisMain/relaunch/deploy/vps-install.sh ./kiventisMain/relaunch /var/www/kiventis --apply
#
# Was das Skript macht:
#   1. Repository in ein temporäres Verzeichnis klonen
#   2. bestehendes index.html einmalig als app.html sichern (React-App bleibt Fallback)
#   3. Seiten, Demos, Bilder und Schriften ins Webroot kopieren (tools/, deploy/, .git bleiben draußen)
#   4. Dateirechte prüfen und Erinnerung für nginx ausgeben
# =============================================================================
set -euo pipefail

REPO="${1:-}"
TARGET="${2:-/var/www/kiventis}"
APPLY="false"
for arg in "$@"; do
  if [[ "$arg" == "--apply" ]]; then APPLY="true"; fi
done

if [[ -z "$REPO" ]]; then
  echo "Aufruf: $0 <repo-url> [zielverzeichnis] [--apply]" >&2
  exit 1
fi

if [[ ! -d "$TARGET" ]]; then
  echo "Zielverzeichnis $TARGET existiert nicht." >&2
  exit 1
fi

WORKROOT="$(mktemp -d)"
trap 'rm -rf "$WORKROOT"' EXIT
WORK="$WORKROOT"

echo "→ Quelle: $REPO"
if [[ -d "$REPO" ]]; then
  # lokales Verzeichnis (geklontes Repository) direkt verwenden
  WORK="$(cd "$REPO" && pwd)"
else
  git clone --depth 1 --quiet "$REPO" "$WORKROOT/src"
  WORK="$WORKROOT/src"
fi

FILES=(
  index.html en impressum.html datenschutz.html llms.txt favicon.svg
  og-image.png apple-touch-icon.png assets beispiele
)

echo
echo "→ Folgende Dateien würden in $TARGET landen:"
for f in "${FILES[@]}"; do
  [[ -e "$WORK/$f" ]] || { echo "   FEHLT: $f" >&2; exit 1; }
  printf '   %-24s %s\n' "$f" "$(du -sh "$WORK/$f" | cut -f1)"
done

if [[ ! -f "$TARGET/app.html" && -f "$TARGET/index.html" ]] \
   && ! grep -q 'KIVENTIS-RELAUNCH' "$TARGET/index.html"; then
  echo
  echo "→ Sicherung: aktuelles index.html wird zu app.html (einmalig)"
fi

if [[ "$APPLY" != "true" ]]; then
  echo
  echo "Trockenlauf. Mit --apply werden die Dateien geschrieben."
  exit 0
fi

if [[ ! -f "$TARGET/app.html" && -f "$TARGET/index.html" ]] \
   && ! grep -q 'KIVENTIS-RELAUNCH' "$TARGET/index.html"; then
  cp -p "$TARGET/index.html" "$TARGET/app.html"
  echo "   app.html angelegt"
fi

for f in "${FILES[@]}"; do
  if [[ -d "$WORK/$f" ]]; then
    mkdir -p "$TARGET/$f"
    cp -R "$WORK/$f/." "$TARGET/$f/"
  else
    cp -p "$WORK/$f" "$TARGET/$f"
  fi
done
chmod -R a+r "$TARGET"

echo
echo "✓ Dateien kopiert."
echo
echo "Nächste Schritte:"
echo "  1. nginx-Block aus deploy/nginx-kiventis.conf übernehmen (TLS-Block unverändert)."
echo "  2. nginx -t && systemctl reload nginx"
echo "  3. curl -sI 'https://www.kiventis.com/?lang=en' | head -1     → muss 301 liefern"
echo "  4. curl -s https://www.kiventis.com/ | grep -c '<h1'          → muss 1 ergeben"
echo
echo "Rollback: app.html wieder nach index.html kopieren, nginx neu laden."
