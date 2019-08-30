const request = require('request-promise-native');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  }
};

const trimError = e => String(e).split('\n')[0];

const fetchMyIp = () => {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIp = ip => {
  const ipRaw = JSON.parse(ip).ip;
  return request('http://ip-api.com/json/' + ipRaw);
};

const fetchISSFlyOverTimes = locationInfo => {
  return request('http://api.open-notify.org/iss-pass.json?lat=' + locationInfo.latitude + '&lon=' + locationInfo.longitude);
};

const nextISSTimesForMyLocation = () => {
  fetchMyIp()
    .then(fetchCoordsByIp)
    .then(data => {
      const lat = JSON.parse(data).lat;
      const lon = JSON.parse(data).lon;
      const coords = {
        latitude: lat,
        longitude: lon
      };
      return fetchISSFlyOverTimes(coords);
    })
    .then(data => {
      printPassTimes(JSON.parse(data).response);
    })
    .catch(e => {
      console.log('Woops! Something went wrong.\n' + trimError(e));
    });
};

module.exports = nextISSTimesForMyLocation;