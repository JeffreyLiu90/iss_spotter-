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

module.exports = { fetchMyIP };

// request("https://api.ipify.org?format=json", (error, response, body) => { // go to that url, end of url which is 'q=' you add sibe which will go to the page with Siberian cat info
// // if (error) return callback(error, null); // if something goes wrong, it becomes error i.e. url is broken
// // const data = JSON.parse(body); // parse the data into object
// // if (data.length === 0) { // if the cat doesn't exist, create a call back labeled (erro,null, because in index.js theres two parameters, so if it is error, it will become error, and desc becomes null). it returns empty array if its wrong cat name
// //   error = "Error, cat not found";
//   callback(error, null);
// } else {
//   callback(null, data[0].description.trim()); // if cat is found, error becomes null and description is cat's description
// }
// });
// };