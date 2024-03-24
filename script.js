const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]

    },
    {
        question: "What is the Capital of India?",
        answers: [
            {text: "New Delhi", correct: true},
            {text: "Mumbai", correct: false},
            {text: "Bengaluru", correct: false},
            {text: "Kolkota", correct: false},
        ]
    },
    {
        question: "Which is the national sport of India?",
        answers: [
            {text: "Cricket", correct: false},
            {text: "Chess", correct: false},
            {text: "Hockey", correct: true},
            {text: "Football", correct: false},
        ] 
    },
    {
        question: "Which is the largest city in the world?",
        answers: [
            {text: "Delhi", correct: false},
            {text: "Bangalore", correct: false},
            {text: "Mumbai", correct: false},
            {text: "Chennai", correct: true},
        ]
    },
    {
        question: "Which state is also known as the “land of rising sun”?",
        answers: [
            {text: "Assam", correct: false},
            {text: "Karnataka", correct: false},
            {text: "Arunachal Pradesh", correct: true},
            {text: "Odisha", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuize(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", checkAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function checkAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct == "true";
    if(iscorrect){ 
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuize();
    }
});

startQuize();

