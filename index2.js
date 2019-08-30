const fetchMyIp = require('./iss_promised');

fetchMyIp().then(data => {
  console.log(JSON.parse(data).ip);
});