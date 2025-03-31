const words = ["EC2", "S3", "Lambda", "DynamoDB", "CloudFormation", "RDS", "CloudWatch", "IAM"];
let selectedWord = '';
let wrongLetters = [];
let correctLetters = [];
let attemptsLeft = 6;
let score = 0;

const wordContainer = document.getElementById('word-container');
const wrongLettersContainer = document.getElementById('wrong-letters-container');
const attemptsLeftElement = document.getElementById('attempts-left');
const scoreElement = document.getElementById('score');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const resetButton = document.getElementById('reset-button');

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    wrongLetters = [];
    correctLetters = [];
    attemptsLeft = 6;
    score = 0;

    wordContainer.innerHTML = '_ '.repeat(selectedWord.length).trim();
    wrongLettersContainer.innerHTML = 'Wrong Letters: ';
    attemptsLeftElement.innerText = `Attempts Left: ${attemptsLeft}`;
    scoreElement.innerText = `Score: ${score}`;
    letterInput.value = '';
    guessButton.classList.remove('hidden');
    resetButton.classList.add('hidden');
}

function updateGame(letter) {
    letter = letter.toUpperCase();

    if (correctLetters.includes(letter) || wrongLetters.includes(letter) || letter === '') {
        return; // Prevent repeating guesses or empty inputs
    }

    if (selectedWord.includes(letter)) {
        correctLetters.push(letter);
        const wordArray = wordContainer.innerText.split(' ');

        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                wordArray[i] = letter; // Reveal the correct letter
            }
        }
        wordContainer.innerText = wordArray.join(' ');
        score += 10; // Increase score for a correct guess
    } else {
        wrongLetters.push(letter);
        attemptsLeft--;
        wrongLettersContainer.innerText = `Wrong Letters: ${wrongLetters.join(', ')}`;
        attemptsLeftElement.innerText = `Attempts Left: ${attemptsLeft}`;
    }

    // Check for win or loss conditions
    if (attemptsLeft === 0) {
        endGame(false);
    } else if (!wordContainer.innerText.includes('_')) {
        endGame(true);
    }
}

function endGame(win) {
    guessButton.classList.add('hidden');
    resetButton.classList.remove('hidden');
    if (win) {
        scoreElement.innerText = `Score: ${score}. You guessed it! ⭐`;
    } else {
        scoreElement.innerText = `Score: ${score}. The word was: ${selectedWord}`;
    }
}

guessButton.addEventListener('click', () => {
    const letter = letterInput.value;
    if (letter.length === 1) {
        updateGame(letter);
        letterInput.value = '';
    }
});

resetButton.addEventListener('click', startGame);

// Start the game for the first time
startGame();
