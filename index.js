
// const { fetchISSFlyOverTimes, fetchCoordsByIP, fetchMyIP} = require('./iss');
const  { nextISSTimesForMyLocation}  = require('./iss');
// const { fetchISSFlyOverTimes} = require('./iss');




// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('162.245.144.188', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned Coords:' , coords);
// });


// fetchCoordsByIP('162.245.144.188', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned Coords:' , coords);
// });

// const coordinates = { latitude: '49.26200', longitude: '-123.09230' }

// fetchISSFlyOverTimes(coordinates, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned Coords:' , coords);
// });


  const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  
  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    printPassTimes(passTimes);
  });





//   for(time of passTimes) {
//     let risetime = time.risetime
//     document.write(time.toTimeString());
//     console.log(`Next pass at ${epochToJsDate(time.risetime)} for ${time.duration} seconds! `)
//   }
//   function epochToJsDate(time) {
//     return new Date(time*1000).toUTCString() 
// }
// });

// // var date = new Date();
// document.write(time.toTimeString());