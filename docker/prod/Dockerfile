# Copyright (C) 2025 The Hyve
# All rights reserved.
# This file is part of radarbase-console.

FROM --platform=$BUILDPLATFORM node:22.12.0-alpine AS builder

WORKDIR /code

COPY package*.json /code/

RUN npm ci --no-audit --no-fund --legacy-peer-deps

COPY . /code/

ARG configuration=production

RUN npm run build -- --configuration ${configuration}

WORKDIR /code/dist/radarbase-console/browser

FROM nginxinc/nginx-unprivileged:1.27-alpine3.20-perl

ENV BASE_HREF=/radarbase-console/

COPY docker/prod/nginx/optimization.conf /etc/nginx/conf.d/
COPY --chown=101 docker/prod/nginx/default.conf /etc/nginx/conf.d/
COPY docker/prod/nginx/30-env-subst.sh /docker-entrypoint.d/

COPY --from=builder --chown=101:101 /code/dist/radarbase-console/browser /usr/share/nginx/html

COPY --from=builder --chown=101:101 /code/dist/radarbase-console/browser/main* /code/dist/radarbase-console/browser/index.html* /usr/share/nginx/html/

USER root
RUN chown -R 101:101 /usr/share/nginx/html
USER 101

EXPOSE 8080
