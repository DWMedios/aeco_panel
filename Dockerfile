FROM node:23.11.0-slim AS builder

WORKDIR /app
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm install
RUN npm run build

FROM nginx:1.25.4-alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]