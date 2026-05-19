# Copyright (C) 2025 The Hyve
# All rights reserved.
# This file is part of radarbase-console.

FROM --platform=$BUILDPLATFORM node:22.12.0-alpine AS builder

WORKDIR /code

COPY package*.json /code/

RUN npm i --no-audit --no-fund --legacy-peer-deps

COPY . /code/

EXPOSE 9000

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "9000", "--serve-path", "/radarbase-console/"]
#CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "9000", "--serve-path", "/radarbase-console/", "--public-host", "localhost:9000", "--live-reload", "false" ]
#CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "9000", "--serve-path", "/radarbase-console/", "--live-reload", "false" ]

#CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "9000", "--serve-path", "/radarbase-console/", "--public-host", "localhost:9000", "--hmr"]
