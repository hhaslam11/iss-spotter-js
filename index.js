const { fetchMyIP , fetchCoordsByIp, fetchISSFlyOverTimes} = require('./iss');


//Test code, doesnt really matter. Delete later
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   fetchCoordsByIp(ip, (error, locationData) => {
//     fetchISSFlyOverTimes(locationData, (error, flyOverData) => {
//       console.log(flyOverData);
//     });
//   });
// });