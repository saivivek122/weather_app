import React from 'react'
import "./showWeather.css"
import { WiSnow, WiHot, WiDaySunny, WiRaindrops } from "react-icons/wi"

const ShowWeather = ({ weather, city, daily }) => {
    let icon

    if (weather.temperature > 30) {

        icon = <WiHot size={40} color="red" />
    }
    else if (weather.temperature < 15) {
        icon = <WiSnow size={40} color="blue" />
    }

    else {
        icon = <WiDaySunny size={40} color="orange" />
    }
    return (
        //    console.log(city)
        <div>
            <div className="weather-container">
                {/* <div className='icon'>{icon}</div> */}
                <h1>{city}</h1>
                <p>⏰ Time: {weather.time}</p>
                <div className='icon'>{icon}</div>
                <p>🌡️ Temperature: {weather.temperature}°C</p>
                <p>💨 Wind Speed: {weather.windspeed} km/h</p>

                {daily.time.map((day, i) => (
                    <div key={day} className="daily-card">
                        <p>{day}</p>
                        <p>🌡️ Max: {daily.temperature_2m_max[i]}°C</p>
                        <p>🌡️ Min: {daily.temperature_2m_min[i]}°C</p>
                        <p>💧 {daily.precipitation_sum[i]} mm</p>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default ShowWeather
