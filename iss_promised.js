const request = require('request-promise-native');

const fetchMyIp = () => {
  return request('https://api.ipify.org/?format=json');
};

module.exports = fetchMyIp;