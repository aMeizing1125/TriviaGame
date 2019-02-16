//Questions => array of obj
// questions = [{},{},{}]
//questions need an image

//modal windows - extra (optional) show 2 divs and based on which one is clicked
//timer


var time = 30; 
var counter;
var questionTimer;
var questionIndex= 0;
var currentQuestion;
var incorrect = 0;
var correct = 0;

var timeProgress = {
  start: function () {
    counter = setInterval(timeProgress.count, -1);
  },
  stop: function () {
    clearInterval(counter);
    time = 1000 * 30;
  },
  count: function () {
    time--;
    console.log(time);
  }
}

//game functionality 
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

function displayQuestion() {

}

var triviaGame = {

  currentQuestion: this.questionsArray[this.questionIndex].question,
  


  displayQuestion: function () {
    currentQuestion = $("<p>");
    //                do i need to do dotnoation here? like currentQuestion.questionsArray?
    $(".questionArea").text(currentQuestion.questionsArray);
    $(".questionArea").append(currentQuestion.questionsArray[i]);
  },

  nextQuestion: function () {
    this.questionIndex++ ,
      this.currentQuestion = this.questionsArray[this.questionIndex]
  },
  submit() {
    $(".questionArea").empty();
    nextQuestion();
  }


}

