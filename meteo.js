const apiKey = "f9bda136e3329132515259581196349c";

async function LoadWeatherData() {
    const data = await fetch("./conf.json")
    .then(response => response.json());
    const city = data.city;
    const { location, temp, feels_like, humidity, weather, icon } = await fetchApi(city);
    updateDom(location, temp, feels_like, humidity, weather, icon);
}
LoadWeatherData();


async function fetchApi(city) {
    const data = await fetch(getApiURL(city))
        .then((res) => res.json())
        .catch(err => {
            console.log(err);
        });
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    return {
        location: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        weather: data.weather[0].description,
        icon: iconUrl
    };
}
function getApiURL(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
}

async function updateDom(location, temp, feels_like, humidity, weather, icon) {
    setLocation(location);
    setTemp(temp);
    setFeelsLike(feels_like);
    setHumidity(humidity);
    setWeather(weather);
    setIcon(icon);
}
function setLocation(location) {
    const el = document.getElementById("location");
    el.innerText = location;
}
function setTemp(temp) {
    const el = document.getElementById("temp");
    el.innerText = `${temp}°C`;
}
function setFeelsLike(feels_like) {
    const el = document.getElementById("feels-like");
    el.innerText = `${feels_like}°C`;
}
function setHumidity(humidity) {
    const el = document.getElementById("humid");
    el.innerText = `${humidity}%`
}
function setWeather(weather) {
    const el = document.getElementById("weather");
    el.innerText = weather
}
function setIcon(icon) {
    const el = document.getElementById("icon");
    el.src = icon;
}


