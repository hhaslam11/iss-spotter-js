const { fetchMyIP , fetchCoordsByIp} = require('./iss');


//Test code, doesnt really matter. Delete later
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
//   fetchCoordsByIp(ip, (error, locationData) => {
//     console.log(locationData);
//   });
// });