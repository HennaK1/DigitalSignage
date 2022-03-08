let title = document.getElementById('weather-change');
let subtitle = document.getElementById('city-subtitle');
const weatherForecastEl = document.getElementById('weather-today');
const futureForecast = document.getElementById('next-week');
const karamalmiBtn = document.querySelector('#karamalmi');
const myyrmakiBtn = document.querySelector('#myyrmaki');
const myllypuroBtn = document.querySelector('#myllypuro');
const arabiaBtn = document.querySelector('#arabia');

const apiKey = 'a780aec63d26475dc332d6581f98a0b3';

/**
 * Weather based of campus coordinates
 * @param {boolean} fi default language finnish
 */
const getWeatherData = (fi) => {
  if (fi === true) {
    title.textContent = `Sää`;
    subtitle.textContent = `Tänään`;
  } else {
    title.textContent = `Weather`;
    subtitle.textContent = `Today`;
  }

  // Karaportti
  if (karamalmiBtn.classList.contains('active') && fi) {
    let latitude = 60.224097114822314;
    let longitude = 24.758621186912713;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=fi&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {
        console.log('weather-data karaportti', data);
        showWeatherData(data, fi);
      });
  } else if (karamalmiBtn.classList.contains('active')) {
    let latitude = 60.224097114822314;
    let longitude = 24.758621186912713;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=en&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {
        console.log('weather-data karaportti enkku', data);
        showWeatherData(data, fi);
      });
    // Myyräki
  } else if (myyrmakiBtn.classList.contains('active') && fi) {
    let latitude = 60.25884867471396;
    let longitude = 24.844753125550763;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=fi&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {
        console.log('weather-data myrtsi', data);
        showWeatherData(data, fi);
      });
  } else if (myyrmakiBtn.classList.contains('active')) {
    let latitude = 60.25884867471396;
    let longitude = 24.844753125550763;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=en&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {
        console.log('weather-data myrtsi enkku', data);
        showWeatherData(data, fi);
      });
    // Myllypuro
  } else if (myllypuroBtn.classList.contains('active') && fi) {
    let latitude = 60.223621656949845;
    let longitude = 25.07790114089043;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=fi&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {
        console.log('weather-data myltsi', data);
        showWeatherData(data, fi);
      });
  } else if (myllypuroBtn.classList.contains('active')) {
    let latitude = 60.223621656949845;
    let longitude = 25.07790114089043;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=en&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {
        console.log('weather-data myltsi enkku', data);
        showWeatherData(data, fi);
      });
    // Arabia
  } else if (arabiaBtn.classList.contains('active') && fi) {
    let latitude = 60.21003815822953;
    let longitude = 24.976775827395574;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=fi&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {
        console.log('weather-data arabia', data);
        showWeatherData(data, fi);
      });
  } else if (arabiaBtn.classList.contains('active')) {
    let latitude = 60.21003815822953;
    let longitude = 24.976775827395574;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=en&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {
        console.log('weather-data arabia', data);
        showWeatherData(data, fi);
      });
  }
};


/**
 * Function to show renderd weather data
 * @param {json} data Data from api
 */

const showWeatherData = (data, fi) => {
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
    }
    if (idx > 0 && idx < 4 && fi) {
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
    } else if (idx > 0 && idx < 4) {
      console.log('HALOO ENKKU!');
      futureForecast.innerHTML += `
          <div class="next-week">
            <div class="day">
            <div class="days" id="days">${humanDateFormEn}</div>
              <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-future">
              <div class="temp">${day.temp.day.toFixed(0)}&#176;C</div>
            </div>
          </div>
          `;
      console.log('english sää', idx);
    }
  });
};

const weatherData = { getWeatherData, showWeatherData };
export default weatherData;
