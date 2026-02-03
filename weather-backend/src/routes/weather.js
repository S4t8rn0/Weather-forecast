const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/weatherController');

const weatherController = new WeatherController();

router.get('/', (req, res) => weatherController.getCurrentWeather(req, res));
router.get('/forecast', (req, res) => weatherController.getForecast(req, res));

module.exports = router;