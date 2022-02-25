import { fetchData } from './modules/network';
import HSLData from './modules/hsl-data';

/**
 * Fetching HSL data
 */
fetchData(HSLData.apiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/graphql' },
  body: HSLData.getQueryForNextRidesByStopId(2132226)
}).then(response => {
  // TODO: create separate render HSL data functions (in HSLData module maybe?)
  console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);
  const stop = response.data.stop;

  document.querySelector('#hsl-data').innerHTML = `<p>
    ${stop.name}<br> ${stop.stoptimesWithoutPatterns[0].trip.routeShortName} ${stop.stoptimesWithoutPatterns[0].headsign}
  </p>`;
});

/**
 * WEATHER
 */

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const weatherForecastEl = document.getElementById('weather-today');
const futureForecast = document.getElementById('forecast');

const daysFI = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];
// const daysEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const apiKey = 'c042c0bcea83f22bde97ce234ae8c4f7';


//  Time and date
setInterval(() => {
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth()+1;
  const year = time.getFullYear();
  const day = time.getDay();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  timeEl.innerHTML = hours + ':' + minutes;
  dateEl.innerHTML = date + '.' + month + '.' + year;

}, 1000);


/**
 * Weather based of location
 */
const getWeatherData = () => {
  navigator.geolocation.getCurrentPosition((success) => {

    let {latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
    .then(res => res.json()).then(data => {

    console.log('weather-data', data);
    showWeatherData(data);
    });
  });
};
getWeatherData();

const showWeatherData = (data) => {
  let nextDayForecast = '';
  let weatherForecast = '';
    data.daily.forEach((day, idx) => {
        if(idx == 0) {
          weatherForecast += `
          <div class="weather-today" id="weather-today">
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-now">
            <div class="temp">${day.temp.day.toFixed(0)}</div>
            <div class="description">${day.weather[0].main}</div>
          </div>
          `;
          console.log('tänään', day.weather[0]);

        } else if(idx <= 3){
          nextDayForecast += `
          <div class="future-forecast-item">
            <div class="day"></div>
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-future">
            <div class="temp">${day.temp.day.toFixed(0)}</div>
          </div>
          `;
        }
});
  futureForecast.innerHTML = nextDayForecast;
  weatherForecastEl.innerHTML = weatherForecast;
};
