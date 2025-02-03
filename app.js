
const express = require('express');
const axios = require('axios');
const redis = require('redis');
const app = express();

    const api_key =  API_KEY="796dde60799fd404ff29e69cca40b265";

    
// Ustawienia widoków i statycznych plików
app.set("view engine", "pug");
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Tworzenie połączenia z Redis
const client = redis.createClient({ url: 'redis://redis:6379' });
client.connect();



let searchHistory = [];

// Strona główna
app.get('/', (req, res) => {
    res.render('file.pug', { weather: null, error: null, history: searchHistory });
});

// Strona pogody
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.render('file.pug', { weather: null, error: 'Please enter a city', history: searchHistory });
    }

    try {
        const cachedData = await client.get(city);
        if (cachedData) {
            console.log("redis work");
            return res.render('file.pug', { weather: JSON.parse(cachedData), error: null, history: searchHistory });
            
        }

        
        const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        const response = await axios.get(uri);
        console.log("api works");
        const weather = response.data;

        await client.setEx(city, 600, JSON.stringify(weather));

        const temp = weather.main.temp;
        if (!searchHistory.some(entry => entry.city.toLowerCase() === city.toLowerCase())) {
            searchHistory.push({ city, temp });
            if (searchHistory.length > 5) searchHistory.shift();
        }

        res.render('file.pug', { weather, error: null, history: searchHistory });
    } catch (err) {
        res.render('file.pug', { weather: null, error: "Error fetching weather data.", history: searchHistory });
    }
});

// Obsługuje błędy 404
app.use((req, res) => res.status(404).send('Something went wrong'));

// Uruchomienie serwera na porcie 3000
app.listen(3000, () => console.log("Server running on port 3000"));
