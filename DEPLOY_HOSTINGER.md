# 🚀 Hostinger VPS & Docker Deployment Guide (Traefik & GHCR)

Dieses Setup wurde speziell an die Anforderungen deines **Hostinger VPS mit Docker Manager** und dem zentralen **Traefik Reverse Proxy** angepasst.

---

## 🏗️ Funktionsweise der Architektur

1. **GitHub Container Registry (GHCR):**
   * Hostinger Docker Manager baut Container-Images nicht lokal auf dem VPS, sondern zieht fertige Images aus einer Registry.
   * Image: `ghcr.io/dadampa/kiventismain:latest`
2. **GitHub Actions CI/CD Pipeline:**
   * Bei jedem `git push` auf den Branch `main` (oder `master`) im Repository `dadampa/kiventismain` baut GitHub Actions automatisch das schlanke Nginx-Docker-Image und veröffentlicht es auf GHCR.
3. **Traefik Reverse Proxy & Let's Encrypt:**
   * Auf deinem Hostinger VPS verwaltet Traefik alle eingehenden Anfragen auf Port 80 und 443 (HTTPS) sowie die kostenlosen SSL-Zertifikate.
   * Deshalb bindet der Container keine Host-Ports direkt (kein Portkonflikt mit 80/443), sondern kommuniziert über das interne Docker-Netzwerk `traefik` und wird über Labels gesteuert.

---

## 📁 Enthaltene Dateien

- **`Dockerfile`**: Schlanker Multi-Stage-Build (Node.js 20 Builder + Alpine Nginx Server mit SPA-Routing und Gzip-Kompression).
- **`.github/workflows/deploy.yml`**: GitHub Actions Workflow, der das Docker-Image baut und zu `ghcr.io/dadampa/kiventismain:latest` pusht.
- **`docker-compose.yml`**: Für Hostinger VPS optimiert – nutzt das GHCR-Image, Traefik-Labels und Traefik-Netzwerk.
- **`docker-compose.local.yml`**: Fallback für lokale Tests auf dem Rechner (`docker compose -f docker-compose.local.yml up --build`).
- **`nginx.conf`**: Nginx-Konfiguration mit Client-seitigem Router-Fallback (`try_files $uri $uri/ /index.html;`) und Caching.

---

## 🛠️ Einmalige Vorbereitung auf GitHub

### 1. Repository-Sichtbarkeit für Packages prüfen
Damit dein Hostinger VPS das Image von GHCR ohne Authentifizierungsprobleme ziehen kann:
1. Öffne dein GitHub-Profil oder Repo: `https://github.com/dadampa/kiventismain`.
2. Sobald die erste GitHub Action durchgelaufen ist, findest du rechts unter **Packages** das Paket `kiventismain`.
3. Klicke auf das Paket ➔ **Package Settings** ➔ ganz unten bei **Danger Zone** ➔ **Change visibility** ➔ auf **Public** stellen (oder Hostinger mit einem GitHub Personal Access Token (PAT) `read:packages` autorisieren).

### 2. Domain in `docker-compose.yml` anpassen
In der Datei `docker-compose.yml`:
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.kiventismain.rule=Host(`deinedomain.de`) || Host(`www.deinedomain.de`)"
  - "traefik.http.routers.kiventismain.entrypoints=websecure"
  - "traefik.http.routers.kiventismain.tls=true"
  - "traefik.http.routers.kiventismain.tls.certresolver=letsencrypt"
  - "traefik.http.services.kiventismain.loadbalancer.server.port=80"
```
Ersetze `deinedomain.de` durch deine gewünschte Domain, die per DNS A-Record auf deine Hostinger-VPS-IP zeigt.

---

## 🚀 Deployment auf Hostinger ausführen

### Variante 1: Über den Hostinger Docker Manager
1. Öffne das **Hostinger hPanel** ➔ **VPS** ➔ **Docker**.
2. Wähle dein Projekt / Compose-Bereich aus.
3. Füge den Inhalt der angepassten `docker-compose.yml` ein oder wähle dein Repository.
4. Klicke auf **Deploy** / **Start**.
5. Traefik erkennt den Container sofort, generiert automatisch das SSL-Zertifikat und leitet den Traffic verschlüsselt weiter!

### Variante 2: Per SSH auf dem VPS
Falls du per SSH auf dem VPS arbeiten möchtest:
```bash
ssh root@DEINE_VPS_IP

# Projektverzeichnis erstellen oder klonen
cd /opt/kiventismain  # oder dein bevorzugter Pfad

# Aktuelles Image ziehen und starten
docker compose pull
docker compose up -d
```

---

## 🔄 Updates nach Codeänderungen

Ab sofort ist der Deployment-Prozess vollautomatisch:
1. Du machst Code-Änderungen und pushst sie zu GitHub:
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   ```
2. GitHub Actions baut das Docker-Image automatisch neu.
3. Im Hostinger Docker Manager klickst du auf **Redeploy** (oder via SSH `docker compose pull && docker compose up -d`).
