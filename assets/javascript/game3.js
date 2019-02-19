//Yes, I did steal the example. I assumed that's what their  intended purpose was. 
//Why reinvent the wheel when I can just take this one. I did retype it multiple times

//modal windows - extra (optional) show 2 divs and based on which one is clicked
//timer


var selectedAnswer;
var wait10;
var incorrectGuess=0;
var correctGuess=0;
var playersGuess;
var questionIndex = 0;
var intervalId;//  Variable that will hold our setInterval that runs the stopwatch
var clockRunning = false;// prevents the clock from being sped up unnecessarily
var questionsArray;
var score;

$('#submit').hide();
$('.answers').hide();

window.onload = function () {
  $(".reset").on("click", stopwatch.reset);
  $(".start").on("click", stopwatch.start);
  $('#answers').on('click', '.answer', function() {
    var text = $(this).text();
    selectedAnswer = text;
  })
  $('#submit').on('click', function() {
    stopwatch.verify();
  })
};

questionsArray = [{
    question: "What does HTML mean?",
    answers: ["HyperText Markup Language", "Hypertech Markup Language", "Holly Toledo Make Loli", "Hyper Text Markup Language"],
    correctAnswer: "HyperText Markup Language",
    // questionIndex: 0,
  },
  {
    question: "What does API stand represent?",
    answers: ["Anti-Programming Initiative", "Application Programming Interface", "Application Properties Interface", "Applicaiton Proxy Interface"],
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
  // i think since the answer is symbol it is doing something weird
  // {
  //   question: "What symbol notates a class in CSS?",
  //   answers: ["@", "#", "%", "."],
  //   correctAnswer: ".",
  //   // questionIndex: 1,
  // },
  
];



var stopwatch = {
  //change this back to 30secs after testing***
  // time: 30,
  time: 15,
 

  reset: function () {
    stopwatch.time = 1000 * 15;
    $(".timer").text("Timer: 00:15");
    //change to 30
    this.time = 15
    $('#submit').hide();
    $('.answers').hide();
  },

  prepareNewQuestion: function () {
    //This will empty out the results, add 1 to the questions index, and clear intervals
    //before starting a new question
    $('#results').empty();
    questionIndex++;
    //way better solution than messing with the time just wait5.. ugh!!! Learned this with Jonathan in a studygroup at Dom's. 
    clearTimeout(wait10);
    clearInterval(intervalId);
    stopwatch.start();
    // stopwatch.time = 30;
    stopwatch.time = 15;
  },

  verify: function () {
    clockRunning = false;
    var selected = selectedAnswer;
    var correctAnswer = questionsArray[questionIndex].correctAnswer;
    $('#answers').empty();
    $('#submit').hide();

    var answerResult = $("<div>");
    answerResult.text("Your answer: " + selected);
    var correctResult = $("<div>");
    correctResult.text("Correct Answer: " + correctAnswer);

    $('#results').append(correctResult, answerResult);
    wait10 = setTimeout(stopwatch.prepareNewQuestion, 1000 * 10);
    if (selected === correctAnswer) {
      correctGuess++;
      $('.numberCorrect').text(correctGuess);
    } else {
      incorrectGuess++;
      $('.numberIncorrect').text(incorrectGuess);
    }
  },

  start: function () {
    if (!clockRunning) {
      //the reason this isn't a -1000 is because it has to count up like normal time you can't make it go backwards yet. 
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      $('#submit').show();
      $('#answer').show();
      
      //question area
      thisQuestion = questionsArray[questionIndex].question;
      $('.questionArea').text(thisQuestion);

      //answer area
      //debuggin questionIndex isn't defined. I tried adding a questionIndex  property under questionArray.question, but it caused line 86 to stop working. 
      //I don't understand why line 86 works and can define [questionIndex] but a function within the object the same level can't
      theseAnswers = questionsArray[questionIndex].answers;
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

    }
  },

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
        incorrectGuess++;
        $('.numberIncorrect').text(incorrectGuess);
        stopwatch.stop();
        $('#answers').empty();
                stopwatch.prepareNewQuestion();   
        
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



