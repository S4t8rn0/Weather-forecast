const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeatherByCity(city) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'pt_br'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

module.exports = { getWeatherByCity };