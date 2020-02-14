const request = require('request');



const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);

    }


    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`
      callback(Error(msg), null)
      return;
    }

    const ip = JSON.parse(body).ip
    callback(null, ip)
    

  }

  )

}

const fetchCoordsByIP = function (ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const latitude = JSON.parse(body).data.latitude;
    const longitude = JSON.parse(body).data.longitude;
    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.latitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null)
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null)
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null)
        }
        callback(null, nextPasses)
      })
    })
  })
}

module.exports = { nextISSTimesForMyLocation };
// module.exports = { fetchISSFlyOverTimes, fetchCoordsByIP, fetchMyIP };