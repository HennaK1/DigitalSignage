import { fetchData } from '../modules/network';

const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

const karamalmiBtn = document.querySelector('#karamalmi');
const myyrmakiBtn = document.querySelector('#myyrmaki');
const myllypuroBtn = document.querySelector('#myllypuro');
const arabiaBtn = document.querySelector('#arabia');
let busstop = document.getElementById('find-stop');
const route = document.querySelector('.route');
const dest = document.querySelector('.dest');
const leaving = document.querySelector('.leaving');

/**
 * https://digitransit.fi/en/developers/apis/1-routing-api/stops/#query-scheduled-departure-and-arrival-times-of-a-stop
 * @param {number} id - id number of the hsl stop (e.g.  "HSL:2132207" => "Karanristi")
 */
const getQueryForNextRidesByStopId = (id) => {
  return `{
    stop(id: "HSL:${id}") {
      name
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip {
          routeShortName
          tripHeadsign
        }
      }
    }
  }`;
};

/**
 *
 * @param {boolean} fi defining language as a parameter
 */
const getHSLData = (fi) => {
  if (fi === true) {
    route.textContent = `Linja`;
    dest.textContent = `Määränpää`;
    leaving.textContent = `Saapuu`;
  } else {
    route.textContent = `Route`;
    dest.textContent = `Destination`;
    leaving.textContent = `Arriving`;
  }
  if (karamalmiBtn.classList.contains('active')) {
    console.log('moi');
    fetchData(HSLData.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/graphql' },
      body: HSLData.getQueryForNextRidesByStopId(2132207)
    }).then(response => {
      const stop = response.data.stop;
      const hslContent = document.querySelector('.hsl-stuff');

      hslContent.innerHTML = ``;
      busstop.innerHTML = `${stop.name}`;
      for (let i = 0; i < 4; i++) {
        let date = new Date(parseInt(stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
        let localeSpecificTime = date.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });
        hslContent.innerHTML += `
        <div class="transport-info">
          <div id="bus-nmbr">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
          <div id="bus-destination">${stop.stoptimesWithoutPatterns[i].headsign}</div>
          <div id="bus-arriving">${localeSpecificTime.replace('PM', '')}</div>
        </div>
        `;
      };
    });
  } else if (myyrmakiBtn.classList.contains('active')) {
    fetchData(HSLData.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/graphql' },
      body: HSLData.getQueryForNextRidesByStopId(4150296)
    }).then(response => {
      const stop = response.data.stop;
      const hslContent = document.querySelector('.hsl-stuff');

      hslContent.innerHTML = ``;
      busstop.innerHTML = `${stop.name}`;
      for (let i = 0; i < 4; i++) {
        let date = new Date(parseInt(stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
        let localeSpecificTime = date.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });
        hslContent.innerHTML += `
        <div class="transport-info">
          <div id="bus-nmbr">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
          <div id="bus-destination">${stop.stoptimesWithoutPatterns[i].headsign}</div>
          <div id="bus-arriving">${localeSpecificTime.replace('PM', '')}</div>
        </div>
        `;
      };
    });
  } else if (myllypuroBtn.classList.contains('active')) {
    fetchData(HSLData.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/graphql' },
      body: HSLData.getQueryForNextRidesByStopId(1454141)
    }).then(response => {
      const stop = response.data.stop;
      const hslContent = document.querySelector('.hsl-stuff');

      hslContent.innerHTML = ``;
      busstop.innerHTML = `${stop.name}`;
      for (let i = 0; i < 4; i++) {
        let date = new Date(parseInt(stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
        let localeSpecificTime = date.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });

        if (stop.stoptimesWithoutPatterns[i].headsign === null) {
          console.log('moromoro');
          hslContent.innerHTML += `
          <div class="transport-info">
          <div id="bus-nmbr">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
          <div id="bus-destination">Tylypahka</div>
          <div id="bus-arriving">${localeSpecificTime.replace('PM', '')}</div>
        </div>`;
        } else {
          console.log('hellohello');
          hslContent.innerHTML += `
          <div class="transport-info">
          <div id="bus-nmbr">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
          <div id="bus-destination">${stop.stoptimesWithoutPatterns[i].headsign}</div>
          <div id="bus-arriving">${localeSpecificTime.replace('PM', '')}</div>
        </div>`;
        }
      };
    });
  } else if (arabiaBtn.classList.contains('active')) {
    fetchData(HSLData.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/graphql' },
      body: HSLData.getQueryForNextRidesByStopId(1230104)
    }).then(response => {
      const stop = response.data.stop;
      const hslContent = document.querySelector('.hsl-stuff');

      hslContent.innerHTML = ``;
      busstop.innerHTML = `${stop.name}`;
      for (let i = 0; i < 4; i++) {
        let date = new Date(parseInt(stop.stoptimesWithoutPatterns[i].realtimeArrival + stop.stoptimesWithoutPatterns[i].serviceDay) * 1000);
        let localeSpecificTime = date.toLocaleTimeString('fi-FI', { hour: 'numeric', minute: 'numeric' });
        hslContent.innerHTML += `
        <div class="transport-info">
          <div id="bus-nmbr">${stop.stoptimesWithoutPatterns[i].trip.routeShortName}</div>
          <div id="bus-destination">${stop.stoptimesWithoutPatterns[i].headsign}</div>
          <div id="bus-arriving">${localeSpecificTime.replace('PM', '')}</div>
        </div>
        `;
      };
    });
  }
};

const HSLData = { apiUrl, getQueryForNextRidesByStopId, getHSLData };
export default HSLData;



