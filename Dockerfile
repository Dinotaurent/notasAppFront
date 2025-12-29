# --- ETAPA 1: Construcción (Build) ---
FROM node:20-alpine AS build
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código y construimos la app
COPY . .
RUN npm run build

# --- ETAPA 2: Ejecución (Runtime) ---
FROM node:20-alpine AS runtime
WORKDIR /app

# Copiamos solo lo necesario desde la etapa de construcción
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Variables de entorno para que sea accesible desde fuera del contenedor
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321

# Comando para arrancar el servidor de Astro
CMD ["node", "./dist/server/entry.mjs"]