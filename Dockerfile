# Używamy oficjalnego obrazu Node.js
FROM node:18

# Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /PAI

# Kopiujemy pliki package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy cały projekt do kontenera
COPY . .

# Ustawiamy zmienne środowiskowe
ENV REDIS_HOST=redis
ENV PORT=3000

# Otwieramy port 3000
EXPOSE 3000

# Uruchamiamy aplikację
CMD ["node", "app.js"]
