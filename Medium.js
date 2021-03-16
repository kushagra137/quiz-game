const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
let questions = [
{
question : "Who is the father of Computers?",
choiceA : "Galileo",
choiceB : "Charles Babbage",
choiceC : "John Adams",
choiceD : "Dennis Ritchie",
correct : "B"
},{
question : "When was Computer invented?",
choiceA : "1820",
choiceB : "1822",
choiceC : "1823",
choiceD : "1824",
correct : "B"
},{
question : "When was the computer first built?",
choiceA : "1822",
choiceB : "1891",
choiceC : "1991",
choiceD: "1990",
correct : "C"
},{
question : "What is the first Programming Language?",
choiceA : "ALGOL",
choiceB : "C",
choiceC : "FORTRAN",
choiceD : "LISP",
correct : "C"
},{
question : "What is the capital of India ?",
choiceA : "Delhi",
choiceB : "Mumbai",
choiceC : "Bengaluru",
choiceD : "Pune",
correct : "A"
}
];

/*fetch('Easy.json')
  .then( res =>{
      return res.json();
  } )
  .then(loadedQuestions => {
      console.log(loadedQuestions);
      questions = loadedQuestions;
      startQuiz();
  });*/

const lastQ = questions.length - 1;
let currentQ = 0;
let count = 0;
const QTime = 30;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / QTime;
let timer;
let score = 0;
function renderQuestion(){
     let q = questions[currentQ];
     question.innerHTML = "<p>"+ q.question +"</p>";
      choiceA.innerHTML = q.choiceA;
      choiceB.innerHTML = q.choiceB;
      choiceC.innerHTML = q.choiceC;
      choiceD.innerHTML = q.choiceD;
}
start.addEventListener("click",startQuiz);
function startQuiz(){
start.style.display = "none";
renderQuestion();
quiz.style.display = "block";
renderProgress();
renderCounter();
timer = setInterval(renderCounter,1000);
}
function renderProgress(){
for(let qIndex = 0; qIndex <= lastQ; qIndex++){
progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
}
}
function renderCounter(){
if(count <= QTime){
counter.innerHTML = count;
timeGauge.style.width = count * gaugeUnit + "px";
count++
}else{
  count = 0;
answerIsWrong();
if(currentQ < lastQ){
currentQ++;
renderQuestion();
}else{
clearInterval(timer);
scoreRender();
}
}
}
function checkAnswer(answer){
   if( answer == questions[currentQ].correct){
      score++;
     answerIsCorrect();
}
else{
      answerIsWrong();
}
     count = 0;
    if(currentQ < lastQ){
     currentQ++;
    renderQuestion();
} 
else{
clearInterval(timer);
scoreRender();
}
}
function answerIsCorrect(){
document.getElementById(currentQ).style.backgroundColor = "#389393";
}
function answerIsWrong(){
document.getElementById(currentQ).style.backgroundColor = "#fa7f72";
}
function scoreRender(){
scoreDiv.style.display = "block";
const scorePerCent = Math.round(100 * score/questions.length);
scoreDiv.innerHTML += "<h1>"+ scorePerCent +"%</h1>";
}