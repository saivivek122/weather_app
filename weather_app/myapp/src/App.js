
import { useState, useEffect, useRef } from 'react';
import './App.css';
import ShowWeather from "./components/ShowWeather"

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [loader, setLoader] = useState(false);
  const [suggestions,setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isSelecting = useRef(false);
 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!isSelecting.current && city.trim() !== "") {
        fetchSuggestions(city);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
      isSelecting.current = false;
    }, 500);

    return () => clearTimeout(delay);
  }, [city]);

  async function fetchSuggestions(query) {
    try {
      let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);
      let data = await res.json();
      if (data.results && data.results.length > 0) {
        setSuggestions(data.results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(true);
      }
    } catch (err) {
      console.log(err);
    }
  }


  async function fetchData(selectedCity) {
    try {
      setLoader(true);
      setSuggestions([]);
      setShowSuggestions(false);
      let currentGeoLocation = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${selectedCity}`);
      let geoData = await currentGeoLocation.json();
      if (!geoData || geoData.length === 0) {
        alert("city not found");
        return;
      }
      let { latitude, longitude, name } = geoData.results[0];

      let fetchWeatherData = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
      );
      let weatherResponseData = await fetchWeatherData.json();
      setWeatherData(weatherResponseData);
      setCity(name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className="weather">
      <h2>Find weather at your location</h2>
      <div className="search-button">
        <input
          type="text"
          placeholder="Enter Your City"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value === "") {
              setWeatherData("");
              setShowSuggestions(false);
            }
          }}
        />
        <button onClick={() => fetchData(city)}>Search</button>
      </div>

      {showSuggestions && (
        <div className='suggestions'>
          <ul className="suggestions-list">
            {suggestions.length > 0 ? (
              suggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => {
                    isSelecting.current = true;
                    setCity(s.name);
                    setShowSuggestions(false);
                    fetchData(s.name);
                  }}
                >
                  {s.name}, {s.country}
                </li>
              ))
            ) : (
              <li className="no-result">No city found</li>
            )}
          </ul>
        </div>
      )}


      {loader && <div className="loader"></div>}

      {weatherData && (
        <ShowWeather
          weather={weatherData.current_weather}
          city={city}
          daily={weatherData.daily}
        />
      )}
    </div>
  );
}

export default App;
