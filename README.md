# Weather App with Redis

A simple weather forecasting app that fetches weather data from the OpenWeatherAPI, stores and caches the data using Redis, and serves it through a Node.js application. The app uses Docker for easy deployment and scalability.

## Technologies

- **Node.js**: The backend of the application, handling the server logic and API connections.
- **Redis**: An in-memory database used to cache weather data to improve performance by avoiding unnecessary repeated API calls.
- **Docker**: Containerization tool that helps run the app and Redis in separate containers for easy deployment.
- **Pug**: HTML templating engine used to generate views.
- **OpenWeatherAPI**: An API used to fetch weather data for the app.

## Getting Started

### Prerequisites

- Docker installed on your machine. [Download Docker](https://www.docker.com/get-started)
- An API key from [OpenWeatherAPI](https://openweathermap.org/api).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/v1kaa/WeatherApp.git
   cd WeatherApp

### Set Up the API Key in `app.js`

1. Open the `app.js` file and locate the line:

   ```javaScript
   const api_key = API_KEY = "YOUR_API_KEY";

  2 Replace "YOUR_API_KEY" with your actual OpenWeatherAPI key:

      
      const api_key = API_KEY = "your-openweather-api-key-here";

### Build and Run the App with Docker
Run the following command to build and start the application:

    docker-compose up --build


The application will be available at: http://localhost:3000.

To stop the application, run:

      
      
      docker-compose down
