const request = require('request');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  }
};
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
  request('http://ip-api.com/json/' + ip, (error, response, data) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      cb('Server error: ' + response.statusCode, null);
    }
    cb(null,
      {
        latitude: JSON.parse(data).lat,
        longitude: JSON.parse(data).lon
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

const nextISSTimesForMyLocation = function(cb) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log(error);
      process.exit();
    }
    fetchCoordsByIp(ip, (error, locationData) => {
      if (error) {
        console.log(error);
        process.exit();
      }
      fetchISSFlyOverTimes(locationData, (error, flyOverData) => {
        if (error) {
          cb(error, null);
        }
        cb(null, flyOverData);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation, printPassTimes};
