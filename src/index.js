import { fetchData } from './modules/network';
import HSLData from './modules/hsl/hsl-data';
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
  let date = new Date(parseInt(stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000);
  let localeSpecificTime = date.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });
  document.querySelector('#hsl-data').innerHTML = `<p>
    ${stop.name}<br> ${stop.stoptimesWithoutPatterns[0].trip.routeShortName} ${stop.stoptimesWithoutPatterns[0].headsign} ${localeSpecificTime.replace('PM', '')}
  </p>`;
});

/**
 * WEATHER
 */
let weather = {
  'apiKey': 'c042c0bcea83f22bde97ce234ae8c4f7',
  fetchWeather: function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Karamalmi&units=metric&lang=fi&appid='
      + this.apiKey)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;
    console.log(name, icon, description, temp);
    document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp.toFixed(0) + '°C';
  },
};
weather.fetchWeather();

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
