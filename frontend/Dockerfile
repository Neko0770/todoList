FROM node:20-slim

WORKDIR /app

# Copiar los archivos de configuración e instalar paquetes
COPY package*.json /app/
RUN npm install

# Copiar el resto del código del frontend
COPY . /app/

EXPOSE 5173