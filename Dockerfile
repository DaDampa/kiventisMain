# ----------------------------------------------------
# Stage 1: Build der React-Anwendung (Bundle unter /app/)
# ----------------------------------------------------
FROM node:20-bookworm-slim AS builder

WORKDIR /build

# Abhängigkeiten der App
COPY app/package*.json ./
ENV NODE_ENV=development
RUN npm install --legacy-peer-deps --no-audit --no-fund

# App-Quelldateien (app/index.html ist der Vite-Entry)
COPY app/ ./

# Produktionsbuild nach /build/dist
# base: "/app/" in vite.config.ts: gehashte Bundles unter /app/assets/,
# damit das Root-Assets/-Verzeichnis der statischen Seite frei bleibt.
RUN npm run build

# ----------------------------------------------------
# Stage 2: Statische Seite + App, served by Nginx
# ----------------------------------------------------
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

# 1) Build-Ergebnis der App komplett ins Webroot:
#    - gehashte Bundles in dist/assets/
#    - vorrenderte SEO-Seiten (wissen/, blog/, tools/,
#      beispiele/bom-designer/ ...) unter exakt denselben
#      Pfaden, damit Crawler sie unter der gewohnten URL
#      vorfinden
#    - robots.txt, sitemap.xml, favicon.svg, og-Dateien
COPY --from=builder /build/dist/ /usr/share/nginx/html/

# 2) App-Bundle nach /app/ verschieben (vite base: /app/)
RUN mv /usr/share/nginx/html/assets /usr/share/nginx/html/app_assets \
 && mkdir -p /usr/share/nginx/html/app \
 && mv /usr/share/nginx/html/app_assets /usr/share/nginx/html/app/assets

# 3) App-Startseite als SPA-Fallback bereitstellen
RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/app.html

# 4) Neue Startseite, Demos, Bilder, Schriften, Rechtliches.
#    Jede Quelle einzeln, damit Ordner als Ordner landen.
#    Gleichnamige Dateien aus dem App-Build
#    (index.html, favicon.svg, llms.txt, og-image.png,
#    apple-touch-icon.png, beispiele/index.html) werden
#    damit ersetzt.
COPY index.html /usr/share/nginx/html/index.html
COPY en/index.html /usr/share/nginx/html/en/index.html
COPY impressum.html /usr/share/nginx/html/impressum.html
COPY datenschutz.html /usr/share/nginx/html/datenschutz.html
COPY llms.txt /usr/share/nginx/html/llms.txt
COPY favicon.svg /usr/share/nginx/html/favicon.svg
COPY og-image.png /usr/share/nginx/html/og-image.png
COPY apple-touch-icon.png /usr/share/nginx/html/apple-touch-icon.png
COPY assets/ /usr/share/nginx/html/assets/
COPY beispiele/ /usr/share/nginx/html/beispiele/

# 5) Rechte: Nginx-Worker läuft als User "nginx"
RUN find /usr/share/nginx/html -type d -exec chmod 755 {} + \
 && find /usr/share/nginx/html -type f -exec chmod 644 {} +

# 6) Container-eigene Nginx-Konfiguration (siehe nginx.conf)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
