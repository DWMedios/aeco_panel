FROM node:21.7.3-slim AS build-stage

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --force esbuild@0.25.4 && \
    npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/dist/ /usr/share/nginx/html