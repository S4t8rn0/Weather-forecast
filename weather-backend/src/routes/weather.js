const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/weatherController');

const weatherController = new WeatherController();

router.get('/current', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getWeatherForecast);

module.exports = router;