# ----------------------------------------------------
# Stage 1: Build the React Application
# ----------------------------------------------------
# Use Debian slim for 100% glibc native module compatibility (Tailwind Oxide, LightningCSS, Vite)
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Ensure devDependencies are installed during build
ENV NODE_ENV=development

# Copy dependency manifests
COPY package*.json ./

# Install dependencies cleanly with legacy-peer-deps to prevent peer conflicts
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy application source files
COPY . .

# Build production assets (outputs to /app/dist)
RUN npm run build

# ----------------------------------------------------
# Stage 2: Serve with high-performance Nginx
# ----------------------------------------------------
FROM nginx:alpine AS runner

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (handles SPA routing, gzip, caching)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose web port
EXPOSE 80

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
