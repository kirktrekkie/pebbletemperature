// rocky index.js
var rocky = require('rocky');

// Global object to store weather data
var response;

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  console.log("Message received");
  var message = event.data;

  if (message.response) {
    // Save the weather data
    response = message.response;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});

rocky.on('draw', function(event) {
  console.log("Start rocky.on");
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  ctx.fillStyle = 'lightgray';
  ctx.textAlign = 'center';
  ctx.font = '16px Gothic';
  ctx.fillText('Temperaturen hemma', ctx.canvas.unobstructedWidth / 2, 10);
  ctx.fillText('', ctx.canvas.unobstructedWidth / 2, 145);
  // Draw the conditions (before clock hands, so it's drawn underneath them)
  if (response) {
    drawTemp(ctx, response);

  }
});


function drawTemp(ctx, temp) {
  var inString;
  var outString;
  inString = 'Inne: ' + temp.temp_in + ' C';
  outString = 'Ute: ' + temp.temp_out + ' C';

  // Draw the text, top center
  ctx.fillStyle = 'lightgray';
  ctx.textAlign = 'center';
  ctx.font = '22px Gothic';
  ctx.fillText(inString, ctx.canvas.unobstructedWidth / 2, 50);
  ctx.fillText(outString, ctx.canvas.unobstructedWidth / 2,100);
}