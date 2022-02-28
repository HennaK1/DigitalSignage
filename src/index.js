import { fetchData } from './modules/network';
import HSLData from './modules/hsl-data';
import FazerData from './modules/fazer-data';
import announcementData from './modules/announcements-data';


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
const weekdayEl = document.getElementById('weekday');
const weatherForecastEl = document.getElementById('weather-today');
const futureForecast = document.getElementById('next-week');


const daysFI = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];
// const daysEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const apiKey = 'c042c0bcea83f22bde97ce234ae8c4f7';

const showMinutes = (value) => {
  if (value < 10) {
    return '0' + value;
  } else {
    return value;
  }
};

//  Time and date
setInterval(() => {
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const weekday = time.toLocaleString("Fi", { weekday: "long" });

  timeEl.innerHTML = hours + ':' + showMinutes(minutes);
  dateEl.innerHTML = date + '.' + month + '.' + year;
  weekdayEl.innerHTML = weekday;

}, 1000);


/**
 * Weather based of location
 */
const getWeatherData = () => {
  navigator.geolocation.getCurrentPosition((success) => {

    let { latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=fi&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
      .then(res => res.json()).then(data => {

        console.log('weather-data', data);
        showWeatherData(data);
      });
  });
};
getWeatherData();

const showWeatherData = (data) => {
  const time = new Date();
  const next = time.getDay();
  data.daily.forEach((day, idx) => {
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
    } else if (idx > 0 && idx < 4) {
      futureForecast.innerHTML += `
          <div class="next-week">
          <div class="days"></div>
            <div class="day">
              <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-future">
              <div class="temp">${day.temp.day.toFixed(0)}&#176;C</div>
            </div>
          </div>
          `;
      console.log('indeksi next', idx);
    }
  });
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
 * ANNOUNCEMENTS
 */

const infoText = document.querySelector('.info-text');
const infoTopic = document.querySelector('.info-topic');
const infoDate = document.querySelector('.info-date');

const showInfo = (fi) => {
  if (fi === true) {
    infoTopic.textContent = announcementData.announcementsFi.Announcements[0].Name;
    infoText.textContent = announcementData.announcementsFi.Announcements[0].Information;
    infoDate.textContent = announcementData.announcementsFi.Announcements[0].Date;
  } else {
    infoTopic.textContent = announcementData.announcementsEn.Announcements[0].Name;
    infoText.textContent = announcementData.announcementsEn.Announcements[0].Information;
    infoDate.textContent = announcementData.announcementsEn.Announcements[0].Date;
  }

};

showInfo(langFi);

/**
 * LANGUAGE
 */

const currentLangBtn = document.querySelector('.currentLang');
const switchLangBtn = document.querySelector('.switchLang');

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
