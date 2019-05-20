import React, { useState, useEffect } from 'react';
import TemperatureUnits from './Components/TemperatureUnits'
import fetchWeatherData from './Components/fetchWeatherData'
import WeatherCards from './Components/WeatherCards'
import WeatherGraph from './Components/WeatherGraph'
import Paper from '@material-ui/core/Paper';
import './App.scss';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [weatherData, setWeatherData] = useState('');
    const [temperatureUnit, setTemperatureUnit] = useState('F');

    useEffect(() => {
        //Fetching Weather details for munich using open weather map api
        fetchWeatherData().then(function (data) {
            //hide the loader
            setIsLoading(false);
            if (!data) {
                return;
            }
            //Filter and get only required data
            const filteredWeatherData = data.list.map(({ main: { temp }, dt_txt }) => ({
                temp: Math.round(temp),
                dt_txt
            }))
            setWeatherData(filteredWeatherData);
        });
    }, []);

    useEffect(() => {
        //when temperature unit changes, change the temperature values accordingly
        setWeatherData(weatherData => updateWeatherData(weatherData));

        function updateWeatherData(weatherData) {
            if (!weatherData) {
                return;
            }
            return weatherData.map(function ({ temp, dt_txt }) {
                if (temperatureUnit === 'F') {
                    temp = (temp * 9 / 5) + 32;
                } else if (temperatureUnit === 'C') {
                    temp = (temp - 32) * 5 / 9;
                }
                temp = Math.round(temp);
                return {
                    temp,
                    dt_txt
                }
            })
        }
    }, [temperatureUnit])
    //show loader on mount
    if (isLoading) {
        return (
            <div className="loading-screen">
                Loading...
            </div>
        )
    }
    //only render main component if weather data is present
    if (weatherData) {
        return (
            <Paper className="container">
                <h1>Weather Checker</h1>
                <TemperatureUnits temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} />
                {<WeatherCards temperatureUnit={temperatureUnit} weatherData={weatherData} />}
                {<WeatherGraph temperatureUnit={temperatureUnit} weatherData={weatherData} />}
            </Paper>
        );
    }

    return null;
}

export default App;
