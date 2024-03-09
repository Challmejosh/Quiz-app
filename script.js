const questions = [
    {
        question: 'Which is the largest animal in the world',
        answers:[
            {text: "shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: 'Which is the smallest continent in the world',
        answers:[
            {text: "Asia", correct: false},
            {text: "Arctic", correct: false},
            {text: "Australia", correct: true},
            {text: "Africa", correct: false},
        ]
    },
    {
        question: 'Which is the largest desert in the world',
        answers:[
            {text: "Antarctica", correct:true},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Kalahari", correct: false},
        ]
    }
];

const questionElement = document.querySelector(".question");
const answerBtn = document.querySelector(".answer-btn");
const nextBtn = document.querySelector(".next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.textContent = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + "." + currentQuestion.question;



    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('ans-btn');
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add('correct');
        score++;
    }else{
        selectBtn.classList.add('incorrect');
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    nextBtn.style.display = 'block';
}



function showScore(){
    resetState();
    questionElement.textContent = `You score ${score} out of ${questions.length}!`;
    nextBtn.style.display ='block';
    nextBtn.textContent = 'Play Again';
}


function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore();
    }
}

nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    } else {
        startQuiz();
    }
})



function resetState(){
    nextBtn.style.display = 'none';
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}


startQuiz();
