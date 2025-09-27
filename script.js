const inputSearch = document.querySelector('.search');
const searchButton = document.querySelector('.search-btn');
const sugestionList = document.querySelector('.sugestion-list');

// API key removida do frontend. Agora o frontend faz requisições ao backend.

const mainContainer = document.querySelector('.main-container');

const countryTxt = document.querySelector('.country-txt');
const temperature = document.querySelector('.temp-celsius');
const tempMax = document.querySelector('.temps-max');
const tempMin = document.querySelector('.temps-min');
const weatherType = document.querySelector('.temp-type');
const feelsLike = document.querySelector('.feels-like');
const windStatus = document.querySelector('.wind-speed');
const humidityStatus = document.querySelector('.humidity-status');
const sunriseStatus = document.querySelector('.sunrise-status');
const sunsetStatus = document.querySelector('.sunset-status');
const weatherImg = document.querySelector('.weather-icon2');

const dateDay = document.querySelector('.date-day');
const dateWeek = document.querySelector('.date-week');

const forecastItemsContainer = document.querySelector('.days');
const tomorrowWeather = document.querySelector('.tomorrow-weather');
const tomorrowCelsius = document.querySelector('.tomorrow-celsius');
const tomorrowImg = document.querySelector('.tomorrow-img');
const query = inputSearch.value.trim();
let fixedCities = ['Rio de Janeiro', 'Los Angeles', 'Tokyo', 'Rome'];


searchButton.addEventListener('click', () => {
    if(query != '') {
        updateWeatherinfo(inputSearch.value)
        inputSearch.value = ''
        inputSearch.blur()
    }
})

inputSearch.addEventListener('keydown', (event)=> {
    if (event.key == 'Enter' && inputSearch.value.trim() != '') {
        updateWeatherinfo(inputSearch.value)
        inputSearch.value = ''
        inputSearch.blur()
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `http://localhost:3000/api/weather?endPoint=${endPoint}&city=${encodeURIComponent(city)}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Erro ao buscar dados do clima');
    return response.json();
}

function getCurrentDate() {
    const currentDate = new Date ();

    const weekDay = currentDate.toLocaleDateString('en-US', { 
        weekday: 'long' });
    const dayMonthYear = currentDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month:'short',
        year: 'numeric'
    })

    return {weekDay, dayMonthYear};
}

function getWeatherIcon(id) {
    if(id <= 232) return 'thunderstorm.svg'
    if(id <= 321) return 'drizzle.svg'
    if(id <= 531) return 'rain.svg'
    if(id <= 622) return 'snow.svg'
    if(id <= 781) return 'atmosphere.svg'
    if(id <= 800) return 'sun.svg'
    else return 'clouds.svg'
}

function convertUnixToHour(unixTimestamp, timezoneOffset) {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    const hourss = date.getUTCHours().toString().padStart(2,'0');
    const minutess = date.getUTCMinutes().toString().padStart(2,'0');
    return `${hourss}:${minutess}`
}

async function updateWeatherinfo(city) {
    const weatherData = await getFetchData('weather', city)
    console.log(weatherData) 

    const {
        name: country,
        main: {temp, feels_like, humidity, temp_max, temp_min},
        weather: [{id, main}],
        wind: { speed },
        sys: {sunrise, sunset},
        timezone
    } = weatherData;

    const sunriseTime = convertUnixToHour(sunrise, timezone);
    const sunsetTime = convertUnixToHour(sunset, timezone);

    countryTxt.textContent = country
    temperature.textContent = Math.round(temp) + '°C'
    weatherType.textContent = main
    tempMax.textContent = 'High: ' + Math.round(temp_max) + '°C'
    tempMin.textContent = 'Low: ' + Math.round(temp_min) + '°C'
    feelsLike.textContent = 'Feels like ' + Math.round(feels_like) + '°C'
    windStatus.textContent = speed + ' m/s'
    humidityStatus.textContent = humidity +'%'
    sunriseStatus.textContent = `Sunrise: ${sunriseTime}`;
    sunsetStatus.textContent =  `Sunset: ${sunsetTime}`;

    const {weekDay, dayMonthYear} = getCurrentDate()
    dateWeek.textContent = weekDay;
    dateDay.textContent = dayMonthYear;

    console.log(getCurrentDate());
    weatherImg.src = `./images/weather-icons/${getWeatherIcon(id)}`

    await updateForecastsInfo(city)
    await updateOtherCities(city);
    await updateRainChance(city);
    const fadeInAnim = document.querySelectorAll('.fade-in');
    restartFadeIn(fadeInAnim);
}

async function updateForecastsInfo(city) {
    const forecastsData = await getFetchData('forecast', city);
    const forecastElements = document.querySelectorAll('.day-day');
    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T')[0];

    const filteredForecasts = forecastsData.list.filter(
        (forecast) =>
            forecast.dt_txt.includes(timeTaken) &&
            !forecast.dt_txt.includes(todayDate)
    ).sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt));

    filteredForecasts.forEach((forecast, index) => {
        const block = forecastElements[index];
        if (!block) return;

        const {
        dt_txt,
        weather: [{ id }],
        main: { temp },
        } = forecast;

        const date = new Date(dt_txt);
        const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        });

        block.querySelector('.day-forecast').textContent = formattedDate;
        block.querySelector('.temp-forecast').textContent = `${Math.round(temp)}°C`;
        block.querySelector('img').src = `./images/weather-icons/${getWeatherIcon(id)}`;
    });

    updateTomorrowInfo(filteredForecasts);
}

function updateForecastsItems(weatherData) {
        const {
            dt_txt: date,
            weather : [{ id }],
            main: {temp}
        } = weatherData;

        const dateTaken = new Date(date);
        const dateOption = {
            month: 'short',
            day: '2-digit'
        };
        const dateResult = dateTaken.toLocaleDateString('en-US', dateOption);

        const forecastItem = `
            <div class="day-day fade-in">
                <p class="day-forecast">${dateResult}</p>
                <img class="tomorrow-img" src="./images/weather-icons/${getWeatherIcon(id)}" alt="">
                <p class="temp-forecast">${Math.round(temp)}°C</p>
            </div>
        `;
  
        forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem);
}

function updateTomorrowInfo(forecastList) {
    if (!forecastList || forecastList.length === 0) return;
    const tomorrow = forecastList[0];

    const tomorrowDate = new Date()
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dateString = tomorrowDate.toISOString().split('T')[0]

    const forecastForTomorrow = forecastList.find(forecast => {
        return forecast.dt_txt.startsWith(dateString) && forecast.dt_txt.includes('12:00:00');
    });

    if(!forecastForTomorrow) return;

    const {
        weather:[{id, main}],
        main: {temp}
    } = forecastForTomorrow;

    tomorrowWeather.textContent = main;
    tomorrowCelsius.textContent = `${Math.round(temp)}°C`;
    tomorrowImg.src = `./images/weather-icons/${getWeatherIcon(id)}?v=${Date.now()}`;
}
const defaultCity = 'Zermatt';
updateWeatherinfo(defaultCity);

async function updateOtherCities(currentCity) {
    const citiesContainer = document.querySelector('#cities .cards');

    const countryMap = {
        JP: 'Japan',
        BR: 'Brazil',
        IT: 'Italy',
        US: 'USA',
        CH: 'Switzerland',
    };

    const displayCities = fixedCities.map(city => {
        if (city.toLowerCase() === currentCity.toLowerCase()) {
        return 'Zermatt';
    }
    return city;
    })

    const uniqueCities = [...new Set(displayCities)];
    citiesContainer.innerHTML = '';

    for(const city of uniqueCities) {
        const data = await getFetchData('weather', city);
        const {
            name,
            main: {temp},
            weather: [{id}],
            sys: {country}
        } = data; 
        
        let displayName = name;
        if (city === 'Zermatt') displayName = 'Zermatt';

        let displayCountry = countryMap[country] || country;
        if (name === 'Rome') displayCountry = 'Italy';
        if (name === 'Los Angeles') displayCountry = 'USA';
        if (name === 'Tokyo') displayCountry = 'Japan';
        if (name === 'Rio de Janeiro') displayCountry = 'Brazil';

        const cityCard = `
            <div class="city">
                <div class="left-side fade-in">
                    <h3>${Math.round(temp)}°C</h3>
                    <p>${displayName}<br><span class="country">${displayCountry}</span></p>
                </div>
                <div class="right-side fade-in">
                    <img src="./images/weather-icons/${getWeatherIcon(id)}" alt="${id}">
                </div>
            </div>
        `;

        citiesContainer.insertAdjacentHTML('beforeend', cityCard);
    }   
}

async function updateRainChance(city) {
  const forecastData = await getFetchData('forecast', city);

  const todayDate = new Date().toISOString().split('T')[0];
  const rainForecast = forecastData.list.find(forecast =>
    forecast.dt_txt.startsWith(todayDate) && forecast.pop !== undefined
  );

  const rainMM= rainForecast?.rain?.["3h"] ?? 0;
  const rainPop = rainForecast?.pop ?? 0;

  const mmRain = document.querySelector('.mm-rain');
  const porcRain = document.querySelector('.porc-rain');

  mmRain.textContent = `${rainMM.toFixed(1)} mm`;
  porcRain.textContent = `${(rainPop * 100).toFixed(1)}%`;

  console.log('Chance de chuva:', rainPop, 'mm', rainMM);
}

function restartFadeIn(elements) {
  elements.forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'fadeIn 0.6s ease-in-out';
  });
}