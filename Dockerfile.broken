# Image Node.js légère
FROM node:18-slim

# Installer dépendances système pour Playwright
RUN apt-get update && apt-get install -y \
    wget git ca-certificates \
    fonts-liberation libasound2 libatk1.0-0 libatk-bridge2.0-0 \
    libcups2 libdbus-1-3 libdrm2 libgbm1 libglib2.0-0 libgtk-3-0 \
    libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 \
    libxfixes3 libxrandr2 libxss1 libxtst6 xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Dossier de l'app
WORKDIR /app

# Copier package.json et package-lock.json si existe
COPY package*.json ./

# Installer les dépendances Node.js
RUN npm install

# Installer Chromium pour Playwright
RUN npx playwright install --with-deps chromium

# Copier tout le code
COPY . .

# Créer dossier de stockage Crawlee
RUN mkdir -p /app/storage

# Commande de lancement
CMD ["npm", "start"]
