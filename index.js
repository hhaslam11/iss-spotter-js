const { nextISSTimesForMyLocation, printPassTimes } = require('./iss');


//Test code, doesnt really matter. Delete later
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});