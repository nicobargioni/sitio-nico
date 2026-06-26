#!/bin/zsh
# Automatización diaria del mapa del sitio (alternativa local a GitHub Actions).
# La dispara un LaunchAgent: ~/Library/LaunchAgents/com.nicobargioni.sitemap-daily.plist
#
# Flujo: crawlea el sitio en vivo y lo contrasta contra /mapa-del-sitio. Si
# detecta páginas nuevas (cambió data/sitemap-extra.json), rebuildea, deploya a
# Firebase y commitea el cambio.
set -u

# launchd arranca con un PATH mínimo: agregamos node (nvm), git y homebrew.
export PATH="/Users/nico/.nvm/versions/node/v22.18.0/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
REPO="/Users/nico/Documents/vscode/nomadic/experimentos/sitio-nico"

cd "$REPO" || { echo "no pude entrar a $REPO"; exit 1; }
echo "========== $(date '+%Y-%m-%d %H:%M:%S') =========="

# 1) Crawl + contraste (escribe data/sitemap-extra.json si falta alguna).
node scripts/check-sitemap.mjs || true

# 2) ¿Cambió el override? Si no, no hay nada que publicar.
if git diff --quiet -- data/sitemap-extra.json; then
  echo "Sin páginas nuevas. Nada que hacer."
  exit 0
fi

echo "Páginas nuevas detectadas → rebuild + deploy."
npm run build || { echo "build falló, aborto"; exit 1; }
npx --yes firebase-tools deploy --only hosting --project nicobargioni-web --non-interactive

# 3) Persistir el cambio en git (push best-effort).
git add data/sitemap-extra.json
git commit -m "chore(sitemap): páginas detectadas por el crawler diario"
git push origin main || echo "push falló (el commit quedó local)."
echo "Listo."
