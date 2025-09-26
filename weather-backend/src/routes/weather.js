const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/weatherController');

const weatherController = new WeatherController();

router.get('/', (req, res) => weatherController.getCurrentWeather(req, res));

module.exports = router;