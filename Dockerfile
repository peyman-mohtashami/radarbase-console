# Multi-stage Docker build for Angular app "radarbase-console"
# 1) Build the production bundle with Node
# 2) Serve the static site with NGINX (with SPA routing)

# ---- Build stage ----
# Angular CLI v20 requires Node >= v20.19 or >= v22.12. Use a compatible default.
ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source and build
COPY . .
# Set NODE_ENV for Angular/TS tools
ENV NODE_ENV=production
RUN npm run build

# ---- Runtime stage ----
FROM nginx:1.27-alpine AS runner

# Remove default site config
RUN rm -f /etc/nginx/conf.d/default.conf

# Basic NGINX config with SPA fallback to index.html and sensible caching headers
RUN set -eux; \
    echo 'server {'                                                   >  /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  listen 80; '                                             >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  server_name _; '                                         >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  sendfile on; '                                           >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  default_type application/octet-stream; '                  >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  gzip on; '                                               >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript; ' >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  root /usr/share/nginx/html; '                            >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  location / {'                                            >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '    try_files $uri $uri/ /index.html; '                    >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  }'                                                       >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  location ~* \.(?:css|js|woff2?|ttf|eot|ico|png|jpg|jpeg|gif|svg)$ {' >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '    expires 30d; add_header Cache-Control "public, immutable"; ' >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '  }'                                                       >> /etc/nginx/conf.d/radarbase-console.conf; \
    echo '}'                                                         >> /etc/nginx/conf.d/radarbase-console.conf;

# Copy built artifacts from builder
# Angular CLI (application builder) outputs to dist/<project-name>/browser by default
COPY --from=builder /app/dist/radarbase-console/browser /usr/share/nginx/html

EXPOSE 80

# Optional healthcheck (container considered healthy if index is served)
HEALTHCHECK --interval=30s --timeout=3s --retries=5 CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1

# Default command
CMD ["nginx", "-g", "daemon off;"]

# --- Usage ---
# Build:   docker build -t radarbase-console:latest .
# Run:     docker run --rm -p 8080:80 radarbase-console:latest
# Open:    http://localhost:8080
