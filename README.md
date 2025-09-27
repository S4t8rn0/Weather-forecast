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
│  ├── src
│  │   ├── app.js                # Entry point of the application
│  │   ├── weatherService.js     # Get the API
│  │   ├── routes
│  │   │   └── weather.js        # Defines routes for the weather API
│  │   └── controllers
│  │       └── weatherController.js # Contains methods for handling weather data requests
│  ├── .env                       # Environment variables (not included in version control)
│  └── package.json               # npm configuration file
├── frontend/
│   ├── index.html      # Main page
│   ├── style.css       # Styles
│   └── script.js       # Front-end logic
└── README.md
```

---

## 🎯 Features

- Search real-time weather forecast by city.  
- Display temperature, weather condition, humidity, and weather icon.  
- Secure integration with OpenWeather API via back-end.  

---

## 📌 Next Steps (To-Do)

- [ ] Improve mobile responsiveness.  
- [ ] Add multi-language support.  
- [ ] Display forecast for upcoming days.  

---

## 📄 License
This project is free to use for study and learning purposes.

---

Made with ☕ and ☁️ by **Gabriella Fernandes**.
