
import React, { useState, useEffect } from "react";


const CurrentWeather = () => {
    const Label = {
        padding: "10px 20px",
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        width: '100%',
        left: 0,
        color: '#fff'
    };
    const clonds = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const [position, setPostion] = useState({
        latitude: null,
        longitude: null
    });
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPostion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
        } else {
            console.log("Geolocation is not available in your browser.");
        }
        getCurrentWeather();
    }, [])

    const getCurrentWeather = () => {
        const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${api_key}&units=metric`;

        fetch(`${url}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }
    console.log('weather', weather)
    return (
        <>
            <div>
                {weather ? (
                    <div style={Label}>
                        <div>User Location: {weather.name}</div>
                        <div style={clonds}><img className="" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        /> {weather.main.temp}°C</div>
                        <div>Weather: {weather.weather[0].description}</div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default CurrentWeather;