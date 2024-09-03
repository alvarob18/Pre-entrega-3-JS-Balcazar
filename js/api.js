const CargarApiWeather = () => {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=BuenosAires&appid=a04ef7859918f3c2d4f69fd740908abd')
        .then(response => response.json())
        .then(latLongArray => {
            if (latLongArray.length > 0) {
                const latLong = latLongArray[0]; 
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong.lat}&lon=${latLong.lon}&units=metric&lang=es&appid=a04ef7859918f3c2d4f69fd740908abd`);
            } else {
                throw new Error("No se encontró la ubicación.");
            }
        })
        .then(response => response.json())
        .then(weather => new Promise((resolve) => {
            $('#localidad').text(weather.name);
            $('#weather-description').text(weather.weather[0].description);
            $('#temperatura').text(weather.main.temp);
            $('#sensacionTermica').text(weather.main.feels_like);
            $('#temperaturaMax').text(weather.main.temp_max);
            $('#temperaturaMin').text(weather.main.temp_min);
            $('#humedad').text(weather.main.humidity);
            setTimeout(() => {
                resolve(weather);
            }, 3000);
        }))
        .catch(error => alert(error.message));
};

document.addEventListener('DOMContentLoaded', () => {
    CargarApiWeather();
});