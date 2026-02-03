const axios = require('axios');

module.exports = async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'Cidade não informada.' });
    }

    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        const errorData = error.response?.data || { message: 'Erro ao buscar previsão do tempo' };
        return res.status(error.response?.status || 500).json(errorData);
    }
};
