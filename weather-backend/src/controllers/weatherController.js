class WeatherController {
    constructor(apiService) {
        this.apiService = apiService;
    }

    async getWeather(req, res) {
        const city = req.params.city;
        try {
            const weatherData = await this.apiService.fetchWeatherData(city);
            res.status(200).json(weatherData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching weather data', error: error.message });
        }
    }
}

export default WeatherController;