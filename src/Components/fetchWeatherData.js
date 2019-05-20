const fetchWeatherData = async () => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=10&units=imperial`);
        let data = await response.json()
        return data;
    } catch (error) {
        console.error(error);
        alert('Api failure, try later');
        return '';
    }
}

export default fetchWeatherData;