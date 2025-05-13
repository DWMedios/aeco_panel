FROM node:21.7.3-slim AS build-stage

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --force esbuild@0.25.4 && \
    npm install

# Copiar el archivo .env antes de construir
COPY .env* ./
COPY . .

RUN npm run build

FROM nginx:alpine
# Copia los archivos construidos
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expone el puerto 80 y 443
EXPOSE 80 443