//Yes, I did steal the example. I assumed that's what their  intended purpose was. 
//Why reinvent the wheel when I can just take this one. I did retype it multiple times
//start psuedo coding in categories of inputs and outputs. 
//put all the inputs in one area. when you are psuedo coding things out in the beginning.

var questionIndex = 0; //  Variable that will hold our setInterval that runs the stopwatch
var intervalId; // prevents the clock from being sped up.
var clockRunning = false;
var questionsArray;
var wait8; //pause after submitting a selected
var incorrectGuess = 0;
var correctGuess = 0;
var playersGuess;
var selectedAnswer = [];
var scorePoints;
var wins = 0;
var losses = 0;

$('#submit').hide();
$('.answers').hide();

window.onload = function () {
  $("#reset").on("click", stopwatch.reset);
  $(".start").on("click", stopwatch.start);
  //I had to phrase it this way since .answer hasn't been created at the start of the window onload
  $('#answers').on("click", '.answer', function () {
    var text = $(this).text();
    selectedAnswer = text;
  })
  $('#submit').on("click", function () {
    stopwatch.verify();
  })
};

questionsArray = [{
    question: "What does HTML mean?",
    answers: ["HyperText Markup Language", "Hypertech Markup Language", "Holly Toledo Make Loli", "Hyper Text Markup Language"],
    correctAnswer: "HyperText Markup Language",
  },
  {
    question: "What does API stand represent?",
    answers: ["Anti-Programming Initiative", "Application Programming Interface", "Application Properties Interface", "Applicaiton Proxy Interface"],
    correctAnswer: "Application Programming Interface",
  },
  // {
  //   question: "Variables can be declared in Javascript using the ___ keyword",
  //   answers: ["varr", "variable", "val", "var"],
  //   correctAnswer: "var",
  // },
  // {
  //   question: "A very useful tool for testing code and debugging is ?",
  //   answers: ["bash", "github", "console.log", "for loops"],
  //   correctAnswer: "console.log",
  // },
  // {
  //   question: "A function's ___ are only visible from within the function body.",
  //   answers: ["arguments", "definitions", "keys", "values"],
  //   correctAnswer: "arguments",
  // },
  // {
  //   question: "We can use Javascript to directly write to the HTML page using which?",
  //   answers: ["console.log", "document.write", "$('document').write", "variables"],
  //   correctAnswer: "document.write",
  // },
  // {
  //   question: "Which number does Iterations USUALLY start counting with?",
  //   answers: ["1", "2", "3", "0"],
  //   correctAnswer: "0",
  // },
  // {
  //   question: "You can get the number of elements in an array using the ___property.",
  //   answers: ["variable.length", "array.length", "var.length", "array.index"],
  //   correctAnswer: "array.length",
  // },
  // {
  //   question: "We can hook onto the event of a user pressing and releasing a key by referring to ____.",
  //   answers: ["event.key", "browser.event", "page.key", "document.onkeyup"],
  //   correctAnswer: "document.onkeyup",
  // },
  // {
  //   question: "What does DRY stand for?",
  //   answers: ["Don't recommend yellowtail", "Don't repeat yourself", "Don't remove yourself", "Don't relive yesterday"],
  //   correctAnswer: "Don't repeat yourself",
  // },
];


var stopwatch = {
  //change this back to 30secs after testing***
  // time: 30,
  time: 30,

  reset: function () {
    clearInterval(intervalId);// trying this randomly in a haze
    questionIndex = 0;
    console.log('resetting');
    $(".timer").text("Timer: 00:30");
    this.time = 30;
    // stopwatch.time = 1000 * 8;
    // $(".timer").text("Timer: 00:08");
    // this.time = 8;
    $('#submit').hide();
    $('#answers').empty();
    $('#answers').show();
    $('.questionArea').empty();
        incorrectGuess = 0;
    correctGuess = 0;
    $('.numberCorrect').text(correctGuess);
    $('.numberIncorrect').text(incorrectGuess);
    stopwatch.start();
    $('#results').empty();//added this after studying with Aaron
        

  },

  prepareNewQuestion: function () {
    //This will empty out the results, add 1 to the questions index, and clear intervals
    //before starting a new question
    $('#results').empty();
    questionIndex++;
    //way better solution than messing with the time just wait5.. ugh!!! Learned this with Jonathan in a studygroup at Dom's. 
    clearTimeout(wait8);
    clearInterval(intervalId);
    stopwatch.start();
    stopwatch.time = 30;
    // stopwatch.time = 15;
  },

  verify: function () {
    clockRunning = false;
    var selected = selectedAnswer;
    selectedAnswer = $('.selected').text();
    var correctAnswer = questionsArray[questionIndex].correctAnswer;
    $('#answers').empty();
    $('#submit').hide();

    var answerResult = $("<div>");
    answerResult.text("Your Answer: " + selected);
    var correctResult = $("<div>");
    correctResult.text("Correct Answer: " + correctAnswer);

    $("#results").append(correctResult, answerResult);
    wait8 = setTimeout(stopwatch.prepareNewQuestion, 1000 * 5);
    if (selected === correctAnswer) {
      correctGuess++;
      $('.numberCorrect').text(correctGuess);
    } else {
      incorrectGuess++;
      $('.numberIncorrect').text(incorrectGuess);
    }
  },

  start: function () {
    if (questionIndex === questionsArray.length) {
      stopwatch.endGame(); //was way overthinking it I don't need to put this.. duh! //I have tried this so many ways.  $(this).endGame();    $(this).stopwatch.endGame();    this.stopwatch.endGame(); 
    } else {
      if (!clockRunning) {
        console.log("it is starting the time and answers");
        //the reason this isn't a -1000 is because it has to count up like normal time you can't make it go backwards yet. 
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
        $('#submit').show();
        $('#answers').show();
        $(".start").hide();

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
      };
    }
    // The below code made it to where if you selected multiple answers it would append all the selections instead of the last one only. WHY?!
    //okay so I need to toggle and remove the added class if toggled. hmm....
    //I should be able to add it to the onclick... hrrmmm

    allAnswers = $('.answer');
    allAnswers.on('click', function () {
      $(".answer").removeClass("selected");
      allAnswers.add(".selected");
      console.log(".selected");
    })
    //makes sure the selected answer is verfied as the correctAnswer. 
    // $("#submit").on("click", stopwatch.verify);
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
    } else if (questionIndex === questionsArray.length) {
      endGame();
    }
  },

  endGame: function () {
    clockRunning = false;
    $(".questionArea").empty();
    $("#answers").empty();
    $('#submit').show();

    console.log("endGame()");
    if (correctGuess >= 2) {
    // if (correctGuess >= 7) {
      $('.questionArea').empty();
      $('.questionArea').prepend('<img  src="assets/images/winner.jpg" />')
      wins++;
      $('.wins').text('Wins: ' + wins);
      $('.submit').show();
      time = 30;
       } else {
      $('.questionArea').prepend('<img  src="assets/images/loser.jpg" />')
      losses++;
      $('.losses').text('Losses: ' + losses)
      $('.submit').show();
      time = 30;
      $(".start").show();
    }
  },
  //so I moved this from underneath the count()  so it would be separate and I could call it. 
  //for some reason it seemed smarter than leaving it within the count() 
  // score: function() {
  // score = correctGuess*100;
  // $('#score').text("Score: " + score);
  // },

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