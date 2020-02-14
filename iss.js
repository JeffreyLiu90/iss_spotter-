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
    console.log(ip)

  }

  )

}

const fetchCoordsByIP = function(ip, callback) {
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
module.exports = { fetchCoordsByIP };
// module.exports = { fetchMyIP };

