//Questions => array of obj
// questions = [{},{},{}]
//questions need an image

//modal windows - extra (optional) show 2 divs and based on which one is clicked
//timer

window.onload = function() {
  $(".reset").on("click", stopwatch.reset);
  $(".start").on("click", stopwatch.start);
};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object

var stopwatch = {

  time: 30,
  // lap: 1,

  reset: function() {
    stopwatch.time = 1000 * 30;
    $(".timer").text("Timer: 00:30");
  },

  start: function() {
    if (!clockRunning) {
      //the reason this isn't a -1000 is because it has to count up like normal time you can't make ti go backwards yet. 
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
    }
  },
  stop: function() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
 
  count: function() {
    stopwatch.time--;

    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $(".timer").text(converted);
    //this prevents the countdown going into the negative numbers. 
    if (stopwatch.time === 0 ) {
      clearInterval(stopwatch)
    }
  },
  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      // minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};