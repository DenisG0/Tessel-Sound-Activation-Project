// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This servo module demo turns the servo around
1/10 of its full rotation  every 500ms, then
resets it after 10 turns, reading out position
to the console at each movement.
*********************************************/

var tessel = require('tessel');
var servolib = require('servo-pca9685');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['B']);

// ambient.on('error', function (err) {
//   console.log(err);
// });


var servo = servolib.use(tessel.port['A']);
var servo1 = 1;
var val = 0;

console.log("kicking off....");
ambient.on('ready', function () {
  ambient.setSoundTrigger(.07);
  console.log("Waiting for sound...");
  ambient.on('sound-trigger', function () {
    console.log("YAAAA inside the sound function...");
    ambient.getSoundLevel(function (err, sounddata) {
      if (err) throw err;
      var position = 0;
      servo.configure(servo1, 0.05, 0.12, function () {
        setInterval(function () {
          console.log('Position (in range 0-1):', position);
          servo.move(servo1, position);
          position += 1;
        }, 500); // Every 500 milliseconds
      })
    })
  });
})
