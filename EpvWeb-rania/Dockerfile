# Étape de build pour ReactJS
FROM node:16 AS build

WORKDIR /app

# Copier les fichiers package.json et installer les dépendances
COPY EpvWeb-rania/package*.json ./
RUN npm install

# Copier le reste des fichiers et construire l'application
COPY EpvWeb-rania/ ./
RUN npm run build

# Étape d'exécution
FROM nginx:alpine

# Copier les fichiers construits dans le dossier de production d'Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
