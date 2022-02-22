import {fetchData} from './modules/network';
import HSLData from './modules/hsl-data';

/**
 * Fetching HSL data
 */
fetchData(HSLData.apiUrl, {
  method: 'POST',
  headers: {'Content-Type': 'application/graphql'},
  body: HSLData.getQueryForNextRidesByStopId(2132226)
}).then(response => {
  // TODO: create separate render HSL data functions (in HSLData module maybe?)
  console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);
  const stop = response.data.stop;

  document.querySelector('#hsl-data').innerHTML = `<p>
    ${stop.name}<br> ${stop.stoptimesWithoutPatterns[0].trip.routeShortName} ${stop.stoptimesWithoutPatterns[0].headsign}
  </p>`;
});
