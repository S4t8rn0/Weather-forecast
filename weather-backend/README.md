# Weather Forecast Backend

This project is a backend service for a weather forecast application. It provides an API to fetch weather data securely using an API key stored in environment variables.

## Project Structure

```
weather-backend
├── src
│   ├── app.js                # Entry point of the application
│   ├── routes
│   │   └── weather.js        # Defines routes for the weather API
│   └── controllers
│       └── weatherController.js # Contains methods for handling weather data requests
├── .env                       # Environment variables (not included in version control)
├── package.json               # npm configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd weather-backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file:**
   In the root directory, create a `.env` file and add your weather API key:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the server:**
   ```
    OPENWEATHER_API_KEY=coloque_sua_api_key_aqui
   ```

## Usage

- The API provides endpoints to fetch weather data. You can access the routes defined in `src/routes/weather.js`.

## Security

- The API key is stored in the `.env` file and is not included in version control to ensure security. Make sure to keep this file private.
## License

This project is licensed under the MIT License.