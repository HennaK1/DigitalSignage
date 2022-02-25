import { fetchData } from './modules/network';
import HSLData from './modules/hsl-data';
import FazerData from './modules/fazer-data';

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

/**
 * LUNCH
 */

//Defining language
let langFi = true;

const menuList = document.querySelector('.menu-list');
let lunchTopic = document.querySelector('.lunch-topic');

const renderFazer = (fi) => {
  if (fi === true) {
    lunchTopic.textContent = `Päivän lounas`;
    fetchData(FazerData.fazerLunchMenuFiUrl, {}, true).then(data => {
      const menuData = JSON.parse(data.contents);
      console.log(menuData);
      let course = FazerData.parseFazerMenu(menuData.LunchMenus[0]);
      showMenu(course, menuList);
    });
  } else {
    lunchTopic.textContent = `Today's lunch`;
    fetchData(FazerData.fazerLunchMenuEnUrl, {}, true).then(data => {
      const menuData = JSON.parse(data.contents);
      console.log(menuData);
      let course = FazerData.parseFazerMenu(menuData.LunchMenus[0]);
      showMenu(course, menuList);
    });
  }
};

renderFazer(langFi);

/**
 * Function showing the menu
 *
 * @param {array} courses course's names
 * @param {array} menuList list of courses
 */
const showMenu = (courses, menuList) => {
  menuList.innerHTML = ``;
  for (let i = 0; i < courses.length; i++) {
    menuList.innerHTML += `
      <li>${courses[i]}</li>
      `;
  };
};

/**
 * LANGUAGE
 */

const currentLangBtn = document.querySelector('.currentLang');
const switchLangBtn = document.querySelector('.switchLang');
const infoTopic = document.querySelector('.info-topic');

const showInfo = (fi) => {
  if (fi === true) {
    infoTopic.textContent = `Koronatiedote`;
  } else {
    infoTopic.textContent = `Covid instructions`;
  }
};

showInfo(langFi);

const changeLanguage = () => {
  if (langFi) {
    currentLangBtn.src = "assets/img/united-kingdom.png";
    switchLangBtn.src = "assets/img/finland.png";
    langFi = false;
  } else {
    langFi = true;
    currentLangBtn.src = "assets/img/finland.png";
    switchLangBtn.src = "assets/img/united-kingdom.png";
  }
  renderFazer(langFi);
  showInfo(langFi);
};

switchLangBtn.addEventListener('click', changeLanguage);
