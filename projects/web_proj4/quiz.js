const questions = [
    {
        question: "What does EC2 stand for?",
        answers: [
            { text: "Elastic Compute Cloud", correct: true },
            { text: "Elastic Container Service", correct: false },
            { text: "Elastic Cloud Compute", correct: false },
            { text: "Elastic Cache", correct: false }
        ]
    },
    {
        question: "Which AWS service is used for storage?",
        answers: [
            { text: "AWS Lambda", correct: false },
            { text: "Amazon S3", correct: true },
            { text: "AWS EC2", correct: false },
            { text: "Amazon RDS", correct: false }
        ]
    },
    {
        question: "What is AWS Lambda?",
        answers: [
            { text: "A compute service", correct: true },
            { text: "A database service", correct: false },
            { text: "A networking service", correct: false },
            { text: "A storage service", correct: false }
        ]
    },
    {
        question: "What does IAM stand for?",
        answers: [
            { text: "Identity and Access Management", correct: true },
            { text: "Internet Application Management", correct: false },
            { text: "Infrastructure Access Management", correct: false },
            { text: "Identity and Access Module", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = ""; // Clear initial score display
    nextButton.classList.add('hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        startTimer();
    } else {
        endGame(); // Call endGame when all questions are answered
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    clearInterval(timer);
    timerElement.innerText = 10; // Reset timer
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    let timeLeft = 10;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer(null); // No answer selected
        }
    }, 1000);
}

function selectAnswer(answer) {
    clearInterval(timer);
    const correct = answer ? answer.correct : false;
    if (correct) {
        score += 10; // Each question carries 10 marks
    }
    nextButton.classList.remove('hidden');
}

function endGame() {
    const totalScore = score;
    const totalQuestions = questions.length;
    questionContainer.innerHTML = `<h1>Your Total Score: ${totalScore}</h1>`; // Display total score
    answerButtons.innerHTML = ''; // Clear answer buttons
    nextButton.classList.add('hidden'); // Hide next button
    timerElement.classList.add('hidden'); // Hide timer

    // Check if all answers were correct
    if (totalScore === totalQuestions * 10) {
        questionContainer.innerHTML += `
            <div id="star" style="font-size: 50px; color: gold; margin-top: 20px;">⭐</div>
            <h2>Congratulations! All answers are correct!</h2>
        `;
    }
}

startGame();
