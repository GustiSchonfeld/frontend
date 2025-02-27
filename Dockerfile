# Etapa 1: Construir la aplicación con Node.js
FROM node:18-alpine as build

WORKDIR /app/frontend

# Copiar el resto de los archivos
COPY ./ ./

# Instalar las dependencias
RUN npm install

# Construir la aplicación React
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos construidos al contenedor de Nginx
COPY --from=build /app/frontend/build /usr/share/nginx/html

