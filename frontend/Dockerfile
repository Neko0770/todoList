<<<<<<< HEAD
FROM node:20-slim

WORKDIR /app

# Copiar los archivos de configuración e instalar paquetes
COPY package*.json /app/
RUN npm install

# Copiar el resto del código del frontend
COPY . /app/

EXPOSE 5173
=======
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
>>>>>>> 40590bc5eb97f5f29eab6555ad06ff1a23aeb1fa
