let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
  
];


let instructionDiv = document.getElementById('instruction');
let container = document.getElementById('container');
let question = document.getElementById('question');
let result = document.getElementById('result');

let questionCount = 0;
let question_count=1;
let timeValue = 15;
let timer = 0;
let interval = 0;
let questionIndex;
let mouseClicked=0;
let correctAnswer=0;

function startQuiz(){
    instructionDiv.style.display="flex";
    container.style.display="none";
}

function exitBtn(){
    instructionDiv.style.display="none";
    container.style.display="flex";
    
}

function continueBtn(){
    instructionDiv.style.display="none";
    question.style.display="flex";
    showQuestion(0);
    questionCounter(question_count);
    interval = setInterval(countDown, 1000);

}



function nextBtn(){
    if(questionCount < questions.length - 1){
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
        questionCount++;
        question_count++;
        showQuestion(questionCount);
        questionCounter(question_count);
    }else{
        showResult()
    }
}


let countDown = () => {
  if (timer === 15) {
      clearInterval(interval);
      nextBtn();
  } else {
      timer++;
      document.getElementById('timer').innerHTML= '<p>' + timer + '</p>';
  }
}

function showQuestion(index){
    questionIndex=index;
    timer=0;
    document.getElementById('que_head').innerText= questions[index].numb + " . " +questions[index].question; 
    document.getElementById('option_container').innerHTML= `<button class="options" value="${questions[index].options[0]}" id="options" onclick="answerCheck(this.value,questionIndex,mouseClicked=1)"> ${questions[index].options[0]} </button>
    <button class="options" value="${questions[index].options[1]}" id="options" onclick="answerCheck(this.value,questionIndex,mouseClicked=1)"> ${questions[index].options[1]}</button>
    <button class="options" value="${questions[index].options[2]}" id="options" onclick="answerCheck(this.value,questionIndex,mouseClicked=1)"> ${questions[index].options[2]} </button>
    <button class="options" value="${questions[index].options[3]}" id="options" onclick="answerCheck(this.value,questionIndex,mouseClicked=1)"> ${questions[index].options[3]} </button>`;
}


function questionCounter(index){
    document.getElementById('que_count').innerHTML = '<p>' + index + ' of ' + questions.length + ' questions </p>';
}

function answerCheck(value,index,click){
  let answer = questions[index].answer;
  if(click){
    nextBtn()
  }
  if(value===answer){
    return correctAnswer++;
    console.log("correct")
  }
  else if(value!==answer || value===""){
    return correctAnswer+=0;
  }
  else{
    return correctAnswer+=0;
  }
  
}


function showResult(){
    question.style.display = 'none';
    result.style.display = 'flex';
    clearInterval(interval);
    document.getElementById('mark').innerText='Congragulations! You ' + correctAnswer + ' out of ' + questions.length + '.';

}

function replayBtn(){
    correctAnswer=0;
    result.style.display = 'none';
    question.style.display = 'flex';
    questionCount = 0;
    question_count=1;
    showQuestion(questionCount);
    questionCounter(question_count);
    interval = setInterval(countDown, 1000);

}

function quitQuiz(){
    window.location.reload();
}

