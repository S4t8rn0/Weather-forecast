# 🌦️ Real-Time Weather Forecast

This is a real-time weather forecast project, developed with **HTML, CSS, and JavaScript** on the front-end, and a **Node.js back-end** using **Express** and **Axios** to securely fetch data from the OpenWeather API without exposing the API key publicly.

---

## 🚀 Technologies Used

- **Front-end**  
  - HTML5  
  - CSS3  
  - JavaScript  

- **Back-end**  
  - Node.js  
  - Express  
  - Axios  
  - Dotenv  

- **API**  
  - [OpenWeather](https://openweathermap.org/api)

---

## 📂 Project Structure

```
.
├── weather-backend/
│   ├── src/
│   │   ├── app.js                    # Entry point of the application
│   │   ├── weatherService.js         # API service layer
│   │   ├── routes/
│   │   │   └── weather.js            # Defines routes for the weather API
│   │   └── controllers/
│   │       └── weatherController.js  # Handles weather data requests
│   ├── .env                          # Environment variables (not in version control)
│   └── package.json                  # npm configuration file
│
├── weather-frontend/
│   ├── index.html                    # Main page
│   ├── style.css                     # Styles
│   ├── script.js                     # Front-end logic
│   ├── images/                       # Weather icons and assets
│   └── package.json                  # npm configuration file
│
├── .gitignore
└── README.md
```

---

## 🎯 Features

- Search real-time weather forecast by city.  
- Display temperature, weather condition, humidity, and weather icon.  
- **5-day weather forecast** with daily predictions.
- Sunrise and sunset times.
- Wind speed and rain probability.
- Other cities weather cards.
- Secure integration with OpenWeather API via back-end.  

---

## 📄 License
This project is free to use for study and learning purposes.

---

Made with ☕ and ☁️ by **Gabriella Fernandes**.
