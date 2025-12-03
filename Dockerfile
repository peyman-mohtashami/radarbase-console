# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Stage 1, "build-stage", based on Node.js, to build and compile Angular
FROM --platform=$BUILDPLATFORM node:22.12.0-alpine as builder

WORKDIR /code

COPY package*.json /code/

RUN npm ci --no-audit --no-fund

COPY . /code/

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration ${configuration}

WORKDIR /code/dist/out

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginxinc/nginx-unprivileged:1.27-alpine3.20-perl

ENV BASE_HREF=/radarbase-console/

# add init script
COPY docker/optimization.conf /etc/nginx/conf.d/
COPY --chown=101 docker/default.conf /etc/nginx/conf.d/
COPY docker/30-env-subst.sh /docker-entrypoint.d/

COPY --from=builder /code/dist/radarbase-console/browser /usr/share/nginx/html

COPY --from=builder --chown=101 /code/dist/radarbase-console/browser/main* /code/dist/radarbase-console/browser/index.html* /usr/share/nginx/html/

EXPOSE 8080

# Optional healthcheck (container considered healthy if index is served)
HEALTHCHECK --interval=30s --timeout=3s --retries=5 CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1

# --- Usage ---
# Build:   docker build -t radarbase-console:latest .
# Run:     docker run --rm -p 8080:8080 radarbase-console:latest
# Open:    http://localhost:8080
