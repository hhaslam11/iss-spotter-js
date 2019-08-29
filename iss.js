const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A cb (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(cb) {
  request('https://api.ipify.org/?format=json', (error, response, data) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      cb('Server error: ' + response.statusCode, null);
    }
    cb(null, JSON.parse(data).ip);
  });
};

const fetchCoordsByIp = function(ip, cb) {
  request('https://ipvigilante.com/' + ip, (error, response, data) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      cb('Server error: ' + response.statusCode, null);
    }
    cb(null,
      {
        latitude: JSON.parse(data).data.latitude,
        longitude: JSON.parse(data).data.longitude
      });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(locationInfo, cb) {
  request('http://api.open-notify.org/iss-pass.json?lat=' + locationInfo.latitude + '&lon=' + locationInfo.longitude, (error, response, data) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      cb('Server error: ' + response.statusCode, null);
    }
    cb(null, JSON.parse(data).response);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes};
