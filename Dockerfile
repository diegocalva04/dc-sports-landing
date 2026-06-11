FROM node:24-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm ci

COPY index.html vite.config.js eslint.config.js ./
COPY public/favicon.svg public/icons.svg ./public/
COPY src/main.jsx src/App.jsx src/index.css ./src/
COPY src/services/*.js ./src/services/
COPY src/components/*.jsx ./src/components/
COPY src/hooks/*.js ./src/hooks/
COPY src/sections/*.jsx ./src/sections/
COPY src/assets/*.svg src/assets/*.png ./src/assets/
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine

COPY nginx.conf.template /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

USER 101
EXPOSE 8080
