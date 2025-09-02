==>Weather Application==>
Objective

The objective of this project is to build a weather forecasting application using React.js that allows users to search for any city, get live weather updates, and view daily forecasts.

****Description***

This weather application fetches data from the Open-Meteo API and provides:

City suggestions as the user types.

Current weather details (temperature, wind speed, time).

Daily weather forecast including maximum & minimum temperature and precipitation.

Weather icons (hot, snow, sunny) for better visualization.

Responsive design, suitable for both desktop and mobile screens.

The project demonstrates React fundamentals, API integration, state management using useState, side effects handling with useEffect, and conditional rendering.

**Technologies Used**

React.js – for building UI components

JavaScript (ES6+) – for logic and data handling

CSS – for styling and responsiveness

Open-Meteo API – for weather and geolocation data

React Icons – for weather condition icons

**How It Works**

The user enters a city name in the search box.

API fetches city suggestions from Open-Meteo Geocoding API.

On selecting a city (or pressing search), weather data is fetched using latitude and longitude.

The current weather and daily forecast are displayed.

A loader animation is shown while fetching data.

 Project Structure
src/
│── components/
│   └── ShowWeather.js  
│── App.js              
│── App.css             
│── index.js            

Steps to Run the Project

Clone the project

git clone https://github.com/saivivek122/weather_app/tree/main/weather_app/myapp


Move into the folder

cd weather-app


Install dependencies

npm install


Start the app

npm start


Open in browser:

http://localhost:3000

API Endpoints

City Search (Geocoding API)

https://geocoding-api.open-meteo.com/v1/search?name={cityName}


Weather Forecast API

https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum

📸 Sample Output

User enters "Warangal" → Suggestions appear.

On selecting, current temperature, wind speed, and daily forecast are shown.

Loader appears while fetching data.

***Learning Outcomes***

Implementing React hooks (useState, useEffect, useRef).

Handling API calls and managing asynchronous operations.

Conditional rendering based on API response.

Designing a responsive and user-friendly UI.