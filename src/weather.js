
// let weather = {
//   'apiKey': 'c042c0bcea83f22bde97ce234ae8c4f7',
//   fetchWeather: function () {
//     fetch('https://api.openweathermap.org/data/2.5/weather?q=Karamalmi&units=metric&lang=fi&appid='
//     + this.apiKey)
//     .then((response) => response.json())
//     .then((data) => this.displayWeather(data));
//   },
//   displayWeather: function(data) {
//     const {name} = data;
//     const {icon, description} = data.weather[0];
//     const {temp} = data.main;
//     console.log(name, icon, description, temp);
//     document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
//     document.querySelector('.description').innerText = description;
//     document.querySelector('.temp').innerText = temp.toFixed(0) + '°C';
//   },
// };
// weather.fetchWeather();

// getWeatherData();
// function getWeatherData () {
//     navigator.geolocation.getCurrentPosition((success) => {

//         let {latitude, longitude } = success.coords;

//         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

//         console.log(data);
//         showWeatherData(data);
//         });

//     });
// }

