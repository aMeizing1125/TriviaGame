//Questions => array of obj
// questions = [{},{},{}]
//questions need an image
//Yes, I did steal the example. I assumed that's what their  intended purpose was. 
//Why reinvent the wheel when I can just take this one. I did retype it multiple times

//modal windows - extra (optional) show 2 divs and based on which one is clicked
//timer

window.onload = function() {
  $(".reset").on("click", stopwatch.reset);
  $(".start").on("click", stopwatch.start);
};



questionsArray = [
  {
    question: "What does HTML mean?",
    answers: ["HyperText Markup Language", "Hypertech Markup Language", "Holly Toledo Make Loli", "Hyper Text Markup Language"],
    correctAnswer: "HyperText Markup Language",
  },
  {
    question: "What symbol notates a class in CSS?",
    answers: ["@", "#", "%", "."],
    correctAnswer: ".",
  },
  {
    question: "What does API stand represent?",
    answer: ["Anti-Pornography Initiative", "Application Programming Interface", "Application Properties Interface", "Applicaiton Proxy Interface"],
    correctAnswer: "Application Programming Interface",
  }
];
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;


//game var's
var playersGuess;

$('#submit').hide();
// Our stopwatch object

var stopwatch = {
//change this back to 30secs after testing***
  // time: 30,
  time: 5,
  // lap: 1,

  reset: function() {
    stopwatch.time = 1000 * 30;
    $(".timer").text("Timer: 00:30");
  },

  start: function() {
    if (!clockRunning) {
      //the reason this isn't a -1000 is because it has to count up like normal time you can't make it go backwards yet. 
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      $('#submit').show();
      nextQuestion();
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

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $(".timer").text(converted);
    //this prevents the countdown going into the negative numbers. 
    if (stopwatch.time === 0 ) {
      // you have to do stopwatch.stop() is because object within a function. 
      stopwatch.stop();
      console.log("yes it works below 0")
    }
  },
//so I moved this from underneath the count()  so it would be separate and I could call it. 
//for some reason it seemed smarter than leaving it within the count() 
  nextQuestion: function() {

    $('.questionArea').text(questionsArray[0].question);
    //the answers aren't displaying 
    $('.answer1').text(questionsArray[0].answer[0]);
    $('.answer2').text(questionsArray[0].answer[1]);
    $('.answer3').text(questionsArray.answer[2]);
    $('.answer4').text(questionsArray.answer[3]);

    
      // you need to record the users choice and compare
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



//randomizes questions
// function selectRandomQuestion(){
//   var randomIndex = Math.floor(Math.random()*questionsArray.length);
//   currentQuestion = questionsArray[randomIndex];

//   // remove question from array.  
//   questionsArray.splice(randomIndex,1);
// }