# ----------------------------------------------------
# Stage 1: Build the React Application
# ----------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies (using legacy-peer-deps for robust build)
RUN npm install --legacy-peer-deps

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
