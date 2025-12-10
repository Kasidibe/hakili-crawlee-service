FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

COPY package*.json ./

RUN npm install

# Installer tous les navigateurs Playwright dans l’image Docker
RUN npx playwright install --with-deps

COPY . .

RUN mkdir -p /app/storage

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

CMD ["npm", "start"]
