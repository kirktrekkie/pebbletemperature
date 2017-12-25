// PebbleKit JS (pkjs)

Pebble.on('message', function(event) {
  console.log("Pebble.on message");
  // Get the message that was passed
  var message = event.data;

  if (message.fetch) {
      var weekNumber = getWeekNumber(new Date());
      var url = 'http://temperaturenhemma.000webhostapp.com/temp_now.json';

      request(url, 'GET', function(respText) {
        var response = JSON.parse(respText);
        //var response = respText;
        console.log("response:" + response);
        Pebble.postMessage({
          'response': {
            'temp_in': response.temp_in,
            'temp_out': response.temp_out
          }
        });
      });
  }
});

function request(url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    // HTTP 4xx-5xx are errors:
    if (xhr.status >= 400 && xhr.status < 600) {
      console.error('Request failed with HTTP status ' + xhr.status + ', body: ' + this.responseText);
      return;
    }
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}