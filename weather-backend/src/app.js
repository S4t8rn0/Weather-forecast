const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente do .env na raiz do backend
dotenv.config({ path: path.join(__dirname, '../.env') });

const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/weather', weatherRoutes);

// Rota separada para forecast (consistente com Vercel Serverless Functions)
const WeatherController = require('./controllers/weatherController');
const forecastController = new WeatherController();
app.get('/api/forecast', (req, res) => forecastController.getForecast(req, res));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});