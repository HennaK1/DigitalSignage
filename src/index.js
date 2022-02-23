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


const weatherNow = document.querySelector('.weather');
const weatherFuture = document.querySelector('.future-forecast');
const time = new Date();
const day = time.getDay();

const apiKey = 'c042c0bcea83f22bde97ce234ae8c4f7';



function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
        .then(res => res.json()).then(data => {

        console.log('weather-data', data);
        });

    });
}
getWeatherData();

let otherDayForecast = '';
data.current.forEach ((day, idx) => {
  if(idx == 0) {
    weatherNow.innerHTML = `
    <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-now">
            <div class="temp">${day.current.temp}&#176;C</div>
            <div class="description">${day.weather[0].description}</div>
    `;
  } else {
    otherDayForecast += `
    <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
              <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-future">
              <div class="temp">${day.current.temp}&#176 C</div>
    `;
  };
});

weatherFuture.innerHTML = otherDayForecast;


