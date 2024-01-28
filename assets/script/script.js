document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("search-form");
    const enterCityInput = document.getElementById("enter-city");
    const currentWeatherDiv = document.getElementById("current-weather");
    const forecastDiv = document.getElementById("forecast");

    const APIKey = "16c97824543243c880f37b17a3cab0f4";

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const cityName = enterCityInput.value.trim();
        if (cityName !== "") {
            getWeather(cityName);
        }
    });

    function getWeather(cityName) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`)
            .then(function (response) {
                const weatherData = response.data;
                displayCurrentWeather(weatherData);
            })
            .catch(function (error) {
                console.log("Error fetching weather data:", error);
            });

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=metric`)
            .then(function (response) {
                const forecastData = response.data.list;
                displayForecast(forecastData);
            })
            .catch(function (error) {
                console.log("Error fetching forecast data:", error);
            });
    }

    function displayCurrentWeather(weatherData) {
        const { name, main, weather } = weatherData;
        const currentWeatherHTML = `
            <h2>${name}</h2>
            <p>${main.temp} &deg;C</p>
            <p>${weather[0].description}</p>
        `;
        currentWeatherDiv.innerHTML = currentWeatherHTML;
    }

    function displayForecast(forecastData) {
        forecastDiv.innerHTML = "";
        forecastData.forEach(function (forecast) {
            const { dt, main, weather } = forecast;
            const forecastDateTime = dayjs.unix(dt).format("ddd, MMM D");
            const forecastHTML = `
                <div class="col-md-2">
                    <h5>${forecastDateTime}</h5>
                    <p>${main.temp} &deg;C</p>
                    <p>${weather[0].description}</p>
                </div>
            `;
            forecastDiv.insertAdjacentHTML("beforeend", forecastHTML);
        });
    }
});
