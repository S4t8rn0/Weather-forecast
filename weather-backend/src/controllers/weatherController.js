const { getWeatherByCity } = require('../weatherService');

class WeatherController {
    async getCurrentWeather(req, res) {
        const city = req.query.city;
        if (!city) {
            return res.status(400).json({ error: 'Cidade não informada.' });
        }
        try {
            const weatherData = await getWeatherByCity(city);
            res.status(200).json(weatherData);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar previsão do tempo', error });
        }
    }
    // Se quiser previsão estendida, pode implementar aqui
}

module.exports = WeatherController;