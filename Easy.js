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
question : "What is the national flower of india?",
choiceA : "rose",
choiceB : "lotus",
choiceC : "sunflower",
choiceD : "lily",
correct : "B"
},{
question : "What is the national sport of India?",
choiceA : "CRICKET",
choiceB : "HOCKEY",
choiceC : "FOOTBALL",
choiceD : "BADMINTON",
correct : "B"
},{
question : "Who is the Prime minister of India?",
choiceA : "Narendra Modi",
choiceB : "Rahul Gandhi",
choiceC : "Ramnath Kovind",
choiceD: "Mamta Banerjee",
correct : "A"
},{
question : "What is the capital of uttarpradesh",
choiceA : "Delhi",
choiceB : "Durgapur",
choiceC : "Kolkata",
choiceD : "lucknow",
correct : "D"
},{
question : "When is the Indian festival diwali celebrated ?",
choiceA : "Summer",
choiceB : "Spring",
choiceC : "Autumn",
choiceD : "Winter",
correct : "C"
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