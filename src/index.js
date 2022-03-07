import { fetchData } from './modules/network';
import HSLData from './modules/hsl-data';
import FazerData from './modules/fazer-data';
import SodexoData from './modules/sodexo-data';
import announcementData from './modules/announcements-data';
import weatherData from './modules/weather-data';
import { getTodayIndex } from './modules/tools';

// Defining language
let langFi = true;

// Selecting DOM elements
const karamalmiBtn = document.querySelector('#karamalmi');
const myyrmakiBtn = document.querySelector('#myyrmaki');
const myllypuroBtn = document.querySelector('#myllypuro');
const arabiaBtn = document.querySelector('#arabia');
const navbuttons = document.querySelectorAll('.n-link');
const mobileBtn = document.querySelector('.nav-label');
const menuList = document.querySelector('.menu-list');
const lunchTopic = document.querySelector('.lunch-topic');
const restaurantName = document.querySelector('.restaurant');
const restaurantPrices = document.querySelector('.restaurant-prices');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const weekdayEl = document.getElementById('weekday');
const currentLangBtn = document.querySelector('.currentLang');
const switchLangBtn = document.querySelector('.switchLang');
const toggleCheck = document.querySelector('#toggleCheck');
const toggleCheckLanguage = document.querySelector('#toggleCheckLanguage');
const body = document.querySelector('body');


/**
 * HSL AREA
 */

HSLData.getHSLData(langFi);

// Hsl data updates every 30 seconds
setInterval(() => {
  HSLData.getHSLData(langFi);
}, 30000);


/**
 * CLOCK AND DATE
 */

/**
 * Function to add missing zero
 * @param {number} value current time without zero
 * @returns time with zero i.e. 15:05.
 */
const showMinutes = (value) => {
  if (value < 10) {
    return '0' + value;
  } else {
    return value;
  }
};

/**
 * Function to get date and time
 */
setInterval(() => {
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const weekdayFi = time.toLocaleString("Fi", { weekday: "long" });
  const weekdayEn = time.toLocaleString("En", { weekday: "long" });

  timeEl.innerHTML = hours + ':' + showMinutes(minutes);
  dateEl.innerHTML = date + '.' + month + '.' + year;

  if (langFi) {
    weekdayEl.innerHTML = weekdayFi;
  } else {
    weekdayEl.innerHTML = weekdayEn;
  }

}, 1000);

/**
 * WEATHER AREA
 */

weatherData.getWeatherData(langFi);

/**
 * Update weather every 30 minutes
 */
setInterval(() => {
  weatherData.getWeatherData();
  console.log('sää', weatherData.getWeatherData);
}, 1800000);


/**
 * LUNCH AREA
 */

/**
 * Function to render Fazer Karamalmi data
 * @param {boolean} fi defining lang as a parameter
 */
const renderFazerKaramalmi = (fi) => {
  restaurantName.textContent = `Fazer Karakaarenkuja`;
  restaurantPrices.textContent = ``;
  if (fi === true) {
    lunchTopic.textContent = `Päivän lounas`;
    fetchData(FazerData.fazerLunchMenuKaramalmiFiUrl, {}, true).then(data => {
      console.log('fazermenu: ', FazerData.fazerLunchMenuKaramalmiFiUrl);
      const menuData = JSON.parse(data.contents);
      console.log(menuData);
      let course = FazerData.parseFazerMenu(menuData.LunchMenus, getTodayIndex());
      const menu = course[0];
      const prices = course[1];
      showMenu(menu, menuList, prices);
    });
  } else {
    lunchTopic.textContent = `Today's lunch`;
    fetchData(FazerData.fazerLunchMenuKaramalmiEnUrl, {}, true).then(data => {
      const menuData = JSON.parse(data.contents);
      console.log(menuData);
      let course = FazerData.parseFazerMenu(menuData.LunchMenus, getTodayIndex());
      const menu = course[0];
      const prices = course[1];
      showMenu(menu, menuList, prices);
    });
  }
};


/**
 * Function to render Fazer Arabia data
 * @param {boolean} fi defining lang as a parameter
 */
const renderFazerArabia = (fi) => {
  restaurantName.textContent = `Fazer Arabianranta`;
  restaurantPrices.textContent = ``;
  if (fi === true) {
    lunchTopic.textContent = `Päivän lounas`;
    fetchData(FazerData.fazerLunchMenuKaramalmiFiUrl, {}, true).then(data => {
      const menuData = JSON.parse(data.contents);
      console.log(menuData);
      let course = FazerData.parseFazerMenu(menuData.LunchMenus, getTodayIndex());
      const menu = course[0];
      const prices = course[1];
      showMenu(menu, menuList, prices);
    });
  } else {
    lunchTopic.textContent = `Today's lunch`;
    fetchData(FazerData.fazerLunchMenuKaramalmiEnUrl, {}, true).then(data => {
      const menuData = JSON.parse(data.contents);
      console.log(menuData);
      let course = FazerData.parseFazerMenu(menuData.LunchMenus, getTodayIndex());
      const menu = course[0];
      const prices = course[1];
      showMenu(menu, menuList, prices);
    });
  }
};


/**
 * Function to render Sodexo Myyrmäki data
 * @param {boolean} fi defining lang as a parameter
 */
const renderSodexoMyyrmaki = (fi) => {
  restaurantName.textContent = `Sodexo Myyrmäki`;
  if (langFi) {
    restaurantPrices.textContent = `Opiskelija / Henkilökunta / Muut`;
  } else {
    restaurantPrices.textContent = `Student / Personnel / Other`;
  }

  fetchData(SodexoData.sodexoMyyrmakiDataUrl).then(data => {
    let courses = SodexoData.parseSodexoMenu(data.courses);
    console.log('sodexo', courses);
    const coursesFi = courses[0];
    const coursesEn = courses[1];
    const prices = courses[2];
    if (fi === true) {
      lunchTopic.textContent = `Päivän lounas`;
      showMenu(coursesFi, menuList, prices);
    } else {
      lunchTopic.textContent = `Today's lunch`;
      showMenu(coursesEn, menuList, prices);
    }
  });
};


/**
 * Function to render Sodexo Myllypuro data
 * @param {boolean} fi defining lang as a parameter
 */
const renderSodexoMyllypuro = (fi) => {
  restaurantName.textContent = `Sodexo Myllypuro`;
  if (langFi) {
    restaurantPrices.textContent = `Opiskelija / Henkilökunta / Muut`;
  } else {
    restaurantPrices.textContent = `Student / Personnel / Other`;
  }
  fetchData(SodexoData.sodexoMyllypuroDataUrl).then(data => {
    let courses = SodexoData.parseSodexoMenu(data.courses);
    console.log('sodexo', courses);
    const coursesFi = courses[0];
    const coursesEn = courses[1];
    const prices = courses[2];
    if (fi === true) {
      lunchTopic.textContent = `Päivän lounas`;
      showMenu(coursesFi, menuList, prices);
    } else {
      lunchTopic.textContent = `Today's lunch`;
      showMenu(coursesEn, menuList, prices);
    }
  });
};


/**
 * Function showing the daily menu, courses names and prices
 *
 * @param {array} courses course's names
 * @param {array} menuList list of courses
 * @param {array} prices list of prices
 */
const showMenu = (courses, menuList, prices) => {
  menuList.innerHTML = ``;
  for (let i = 0; i < courses.length; i++) {
    if (prices[i] === null) {
      menuList.innerHTML += `
      <li class="menu-course">${courses[i]}</li>
      `;
    } else {
      menuList.innerHTML += `
      <li class="menu-course">${courses[i]}</li>
      <li class="menu-price">${prices[i]}</li>
      `;
    }
  };

};

/**
 * INFO AREA
 */

announcementData.showInfo(langFi);

/**
 * LANGUAGE OPTIONS
 */

/**
 * Function for language change
 */
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
  if (karamalmiBtn.classList.contains('active')) {
    renderFazerKaramalmi(langFi);
  } else if (myyrmakiBtn.classList.contains('active')) {
    renderSodexoMyyrmaki(langFi);
  } else if (myllypuroBtn.classList.contains('active')) {
    renderSodexoMyllypuro(langFi);
  } else {
    renderFazerArabia(langFi);
  }
  announcementData.showInfo(langFi);
  weatherData.getWeatherData(langFi);
  HSLData.getHSLData(langFi);
};


/**
 * Changing language automatically every 30 seconds only
 * when screen size is over 1500px (widescreen)
 */
setInterval(() => {
  if (window.matchMedia("(min-width: 1900px)").matches) {
    console.log("Screen width is over 1900px");
    console.log('kielen vaihto', changeLanguage);
    changeLanguage();
  } else {
    console.log("Screen less than 1900px");
  }
}, 30000);


/**
 * FUNCTIONS CHANGING THE CAMPUS
 */

const showCampusKaramalmi = () => {
  karamalmiBtn.classList.add('active');
  mobileBtn.innerHTML = `Karamalmi <img class="down-arrow" src="assets/img/simple-arrow-orange.png" alt="arrow-down">`;
  renderFazerKaramalmi(langFi);
  HSLData.getHSLData(langFi);
};

const showCampusMyyrmaki = () => {
  myyrmakiBtn.classList.add('active');
  mobileBtn.innerHTML = `Myyrmäki <img class="down-arrow" src="assets/img/simple-arrow-orange.png" alt="arrow-down">`;
  renderSodexoMyyrmaki(langFi);
  HSLData.getHSLData(langFi);
};

const showCampusMyllypuro = () => {
  mobileBtn.innerHTML = `Myllypuro <img class="down-arrow" src="assets/img/simple-arrow-orange.png" alt="arrow-down">`;
  myllypuroBtn.classList.add('active');
  renderSodexoMyllypuro(langFi);
  HSLData.getHSLData(langFi);
};

const showCampusArabia = () => {
  mobileBtn.innerHTML = `Arabia <img class="down-arrow" src="assets/img/simple-arrow-orange.png" alt="arrow-down">`;
  arabiaBtn.classList.add('active');
  renderFazerArabia(langFi);
  HSLData.getHSLData(langFi);
};

/**
 * EVENT LISTENERS
 */
karamalmiBtn.addEventListener('click', () => {
  navbuttons.forEach(elem => {
    elem.classList.remove('active');
  });
  showCampusKaramalmi();
});

myyrmakiBtn.addEventListener('click', () => {
  navbuttons.forEach(elem => {
    elem.classList.remove('active');
  });
  showCampusMyyrmaki();
});

myllypuroBtn.addEventListener('click', () => {
  navbuttons.forEach(elem => {
    elem.classList.remove('active');
  });
  showCampusMyllypuro();
});

arabiaBtn.addEventListener('click', () => {
  navbuttons.forEach(elem => {
    elem.classList.remove('active');
  });
  showCampusArabia();
});

switchLangBtn.addEventListener('click', () => {
  toggleCheckLanguage.checked = false;
  body.classList.remove('hideOverflow');
  changeLanguage();
});

toggleCheck.addEventListener('click', () => {
  if (toggleCheck.checked === true) {
    console.log('klikkasit menun auki');
    body.classList.add('hideOverflow');
  } else {
    console.log('suljit menun');
    body.classList.remove('hideOverflow');
  }
});

for (let i = 0; i < navbuttons.length; i++) {
  navbuttons[i].addEventListener('click', () => {
    console.log('klikkasit elementtiä');
    toggleCheck.checked = false;
    body.classList.remove('hideOverflow');
  });
};


/**
 * Init function to show Karamalmi data by default
 */
const init = () => {
  showCampusKaramalmi();
};

init();












