/**
 * Fetches (GET) JSON data from APIs
 *
 * @param {string} url - api endpoint url
 */
const fetchData = async (url, options = {}, useProxy = false) => {
  if (useProxy) {
    url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  }
  let jsonData;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    jsonData = await response.json();
    // Allorigins returns json payload in data.contents property as a string
    if (useProxy === 'allorigins') {
      jsonData = JSON.parse(jsonData.contents);
    }
  } catch (error) {
    console.error('fetchData() error', error);
    jsonData = {};
  }
  return jsonData;
};

export { fetchData };


