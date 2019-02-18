//Questions => array of obj
// questions = [{},{},{}]
//questions need an image
//Yes, I did steal the example. I assumed that's what their  intended purpose was. 
//Why reinvent the wheel when I can just take this one. I did retype it multiple times

//modal windows - extra (optional) show 2 divs and based on which one is clicked
//timer

window.onload = function () {
  $(".reset").on("click", stopwatch.reset);
  $(".start").on("click", stopwatch.start);
};

var quesitonIndex = 0;
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
// prevents the clock from being sped up unnecessarily
var clockRunning = false;

questionsArray = [{
    question: "What does HTML mean?",
    answers: ["HyperText Markup Language", "Hypertech Markup Language", "Holly Toledo Make Loli", "Hyper Text Markup Language"],
    correctAnswer: "HyperText Markup Language",
    // questionIndex: 0,
  },
  {
    question: "What symbol notates a class in CSS?",
    answers: ["@", "#", "%", "."],
    correctAnswer: ".",
    // questionIndex: 1,
  },
  {
    question: "What does API stand represent?",
    answers: ["Anti-Pornography Initiative", "Application Programming Interface", "Application Properties Interface", "Applicaiton Proxy Interface"],
    correctAnswer: "Application Programming Interface",
    // questionIndex: 2,
  },
  {
    question: "Variables can be declared in Javascript using the ___ keyword", 
    answers: ["varr", "variable", "val", "var"],
    correctAnswer: "var",
    // questionIndex: 3,  
  },
  {
    question: "A very useful too for testing code and debugging is ?", 
    answers: ["bash", "github", "console.log", "for loops"],
    correctAnswer: "console.log",
    // questionIndex: 4,  
  },
  {
    question: "A function's ___ are only visible from within the function body.", 
    answers: ["arguments", "definitions", "keys", "values"],
    correctAnswer: "arguments",
    // questionIndex: 5,  
  },
  {
    question: "We can use Javascript to directly write to the HTML page using which?", 
    answers: ["console.log", "document.write", "$('document').write", "variables"],
    correctAnswer: "document.write",
    // questionIndex: 6,  
  },
  {
    question: "Iterations always start counting with which number?", 
    answers: ["1", "2", "3", "0"],
    correctAnswer: "0",
    // questionIndex: 7,  
  },
  {
    question: "You can get the number of elements in an array using the ___property.", 
    answers: ["variable.length", "array.length", "var.length", "array.index"],
    correctAnswer: "array.length",
    // questionIndex: 8,  
  },
  {
    question: "We can hook onto the event of a user pressing and releasing a key by referring to ____.", 
    answers: ["event.key", "browser.event", "page.key", "document.onkeyup"],
    correctAnswer: "document.onkeyup",
    // questionIndex: 9,  
  },
  {
    question: "What does DRY stand for?", 
    answers: ["Don't recommend yellowtail", "Don't repeat yourself", "Don't remove yourself", "Don't relive yesterday"],
    correctAnswer: "Don't repeat yourself",
    // questionIndex: 10,  
  },
  
];


//game var's
var playersGuess;

//stuff hide() before game start 
$('#submit').hide();
$('.answers').hide();
//changed it to 1 div class answer instead of one div for each answer. 




var stopwatch = {
  //change this back to 30secs after testing***
  // time: 30,
  time: 5,
 

  reset: function () {
    stopwatch.time = 1000 * 5;
    $(".timer").text("Timer: 00:05");
    //change to 30
    this.time = 5;
    $('#submit').hide();
    $('.answers').hide();
  },

  prepareNewQuestion: function () {
    //This will empty out the results, add 1 to the quesitons index, and clear intervals
    //before starting a new question
    $('#results').empty();
    questionIndex++;
    //way better solution than messing with the time just wait5.. ugh!!! Learned this with Jonathan in a studygroup at Dom's. 
    clearTimeout(wait5);
    clearInterval(intervalId);
    stopwatch.start();
    // stopwatch.time = 30;
    topwatch.time = 5;
  },

  verify: function () {
    clockRunning = false;
    //this stores the correct answer, and the selected answer in variables. 
    var selectedAnswer = $('.selected').text();

    var correctAnswer = questionsArray[quesitonIndex].correctAnswer;
    //this will empty the question area and clear the answer radio buttons as well as the submit
    $('#submit').hide();
    var correctResult = $("<div>").text("The correct answer: " + correctAnswer);
    correctAnswer.addClass("result");
    var answerResult = $("<div>").text("Your answer: " + selectedAnswer);
    answerResult.addClass("result");
    $("#results").empty();
    console.log("Correct answer: " + correctAnswer);
    console.log("Correct answer: " + selectedAnswer);
    $("#answers").empty();
    $("#submit").hide();
    $("#results").append(correctResult, answerResult);
    wait5 = setTimeout(stopwatch.prepareNewQuestion, 1000 * 10);

  },

  start: function () {
    if (!clockRunning) {
      //the reason this isn't a -1000 is because it has to count up like normal time you can't make it go backwards yet. 
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      $('#submit').show();
      $('#answer').show();
      intervalId = setInterval(stopwatch.count, 1000);

      //question area
      thisQuestion = questionsArray[questionIndex].question;
      $('.questionArea').text(thisQuestion);

      //answer area
      //debuggin questionIndex isn't defined. I tried adding a quesitonIndex  property under questionArray.question, but it caused line 86 to stop working. 
      //I don't understand why line 86 works and can define [questionIndex] but a function within the object the same level can't
      theseAnswers = questionArray[questionIndex].answers;
      for (i = 0; i < theseAnswers.length; i++) {
        //makes a new button and stores it
        thisAnswer = $("<button>");
        //This gives the new answer <button> a type and a class
        thisAnswer.attr({
          type: "radio",
          class: "answer",
        })
        thisAnswer.text(theseAnswers[i]);
        //with attaches the button to the multiple choice answer area'

        $("#answers").append(thisAnswer);
      };



    } else {
      alert("You've already clicked start. Pick an answer quick!");
    }
    allAnswers - $('.answer');
    allAnswers.on('click', function () {
      //toggle means switch between the selected options. 
      $(".selected").toggleClass("selected");
      $(this).toggleClass("selected");
    })
    //makes sure the selected answer is verfied as the correctAnswer. 
    $("#submit").on("click", stopwatch.verify);
  },
  //I've tried move this here and making it work outside the start counting fuction
  //it never works when I do. 
  // nextQuestion: function() {

  // },
  stop: function () {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },

  count: function () {
    if (clockRunning === true) {
      stopwatch.time--;
      var converted = stopwatch.timeConverter(stopwatch.time);

      // DONE: Use the variable we just created to show the converted time in the "display" div.
      $(".timer").text(converted);

      //this prevents the countdown going into the negative numbers. 
      if (stopwatch.time === 0) {
        // you have to do stopwatch.stop() is because object within a function. 
        stopwatch.stop();
      }
    }
  },
  //so I moved this from underneath the count()  so it would be separate and I could call it. 
  //for some reason it seemed smarter than leaving it within the count() 

  timeConverter: function (t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      // minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
};



