let title = document.getElementById('weather-change');
let subtitle = document.getElementById('city-subtitle');
const weatherForecastEl = document.getElementById('weather-today');
const futureForecast = document.getElementById('next-week');

// Defining language
let langFi = true;

const apiKey = 'c042c0bcea83f22bde97ce234ae8c4f7';

/**
 * Weather based of location
 * @param {boolean} fi default language finnish
 */
const getWeatherData = (fi) => {
  if (fi === true) {
    title.textContent = `Sää`;
    subtitle.textContent = `Tänään`;
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=fi&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
        .then(res => res.json()).then(data => {

          console.log('weather-data', data);
          showWeatherData(data);
        });
    });
  } else {
    title.textContent = `Weather`;
    subtitle.textContent = `Today`;
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=en&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
        .then(res => res.json()).then(data => {

          console.log('weather-data', data);
          showWeatherData(data);
        });
    });
  }
};


/**
 * Function to show renderd weather data
 * @param {json} data Data from api
 */

 const showWeatherData = (data) => {
  weatherForecastEl.innerHTML = ``;
  futureForecast.innerHTML = ``;
  data.daily.forEach((day, idx) => {

    const unixTimestamp = day.dt;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormFi = dateObject.toLocaleString("Fi", { weekday: "short" });
    const humanDateFormEn = dateObject.toLocaleString("En", { weekday: "short" });

    if (idx === 0) {
      weatherForecastEl.innerHTML += `
          <div class="weather-today" id="weather-today">
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-now">
            <div class="temp">${day.temp.day.toFixed(0)}&#176;C</div>
            <div class="description">${day.weather[0].description}</div>
          </div>
          `;
      console.log('tänään', day.weather[0]);
      console.log('indeksi tänään', idx);
    } else if (idx > 0 && idx < 4 && langFi) {
      futureForecast.innerHTML += `
          <div class="next-week">
            <div class="day">
            <div class="days" id="days">${humanDateFormFi}</div>
              <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-future">
              <div class="temp">${day.temp.day.toFixed(0)}&#176;C</div>
            </div>
          </div>
          `;
      console.log('indeksi next', idx);
    } else if (idx > 0 && idx < 4 && !langFi) {
      futureForecast.innerHTML += `
          <div class="next-week">
            <div class="day">
            <div class="days" id="days">${humanDateFormEn}</div>
              <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-future">
              <div class="temp">${day.temp.day.toFixed(0)}&#176;C</div>
            </div>
          </div>
          `;
      console.log('english sää',idx);
    }
  });
};

const weatherData = {getWeatherData, showWeatherData};
export default weatherData;
