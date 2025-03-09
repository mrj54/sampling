 // Game Data
 const questions = [
    {
        question: "Siapa nabi pertama?",
        options: ["Adam AS", "Nuh AS", "Ibrahim AS", "Musa AS"],
        correct: 0,
        fact: "Adam AS adalah manusia dan nabi pertama di Bumi!"
    },
    {
        question: "Nabi manakah yang membangun bahtera besar?",
        options: ["Ibrahim AS", "Nuh AS", "Isa AS", "Musa AS"],
        correct: 1,
        fact: "Nuh AS membangun bahtera untuk menyelamatkan orang-orang beriman dan hewan dari banjir besar!"
    },
    {
        question: "Siapa yang membangun Ka'bah?",
        options: ["Musa AS", "Isa AS", "Ibrahim AS", "Sulaiman AS"],
        correct: 2,
        fact: "Ibrahim AS membangun Ka'bah bersama putranya Ismail AS!"
    },
    {
        question: "Nabi manakah yang membelah laut?",
        options: ["Dawud AS", "Yusuf AS", "Nuh AS", "Musa AS"],
        correct: 3,
        fact: "Musa AS membelah laut dengan tongkatnya atas izin Allah!"
    },
    {
        question: "Siapakah nabi terakhir?",
        options: ["Muhammad SAW", "Isa AS", "Yusuf AS", "Ibrahim AS"],
        correct: 0,
        fact: "Muhammad SAW adalah utusan terakhir Allah!"
    }
];

// Game State
let currentScore = 0;
let currentLevel = 1;
let lives = 3;
let currentQuestionIndex = 0;
let correctStreak = 0;

// DOM Elements
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const livesElement = document.getElementById('lives');
const gameArea = document.getElementById('gameArea');
const welcomeScreen = document.getElementById('welcomeScreen');
const quizArea = document.getElementById('quizArea');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const resultModal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const resultDescription = document.getElementById('resultDescription');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');

// Create Stars Background
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'stars';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 1}s`;
        starsContainer.appendChild(star);
    }
}
createStars();

// Update Progress Bar
function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Start Game
document.getElementById('startBtn').addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    quizArea.classList.remove('hidden');
    showQuestion();
});

function saveQuizResult(score) {
// Ambil data quiz yang sudah ada atau inisialisasi array kosong
let quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];

// Buat objek hasil quiz baruconsole.log('Game Data:', questions);
console.log('Game State:', currentScore, currentLevel, lives, currentQuestionIndex, correctStreak);

// ...

function showQuestion() {
console.log('Showing question:', questions[currentQuestionIndex].question);
// ...
}

function checkAnswer(selectedIndex) {
console.log('Checking answer:', selectedIndex);
// ...
}

function showResult(isCorrect, fact) {
console.log('Showing result:', isCorrect, fact);
// ...
}

function gameOver() {
console.log('Game over!');
// ...
}

function showGameCompletion() {
console.log('Game completion!');
// ...
}

function resetGame() {
console.log('Resetting game...');
// ...
}

const hours = new Date().getHours()
const minutes = new Date().getMinutes()
const createdAt = minutes >= 58 ? ((hours === 23 ? hours + 1 : '00') + '0') : (hours + ':' + (minutes + 2))

const newResult = {
username: localStorage.getItem('username'),
no: quizHistory.length + 1,
tanggal: new Date().toISOString().split('T')[0],
score: score,
hours: createdAt,
minutes: createdAt
};

// Tambahkan hasil baru ke array
quizHistory.push(newResult);

// Simpan kembali ke localStorage
localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
}

function showQuestion() {
    // Check if we've reached the end of questions
    if (currentQuestionIndex >= questions.length) {
        showGameCompletion();
        return;
    }

    updateProgressBar();
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full mb-2 transition-transform hover:scale-105';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        currentScore += 10;
        correctStreak++;
        scoreElement.textContent = currentScore;
        showResult(true, question.fact);
    } else {
        lives--;
        livesElement.textContent = '❤️'.repeat(lives);
        correctStreak = 0;
        if (lives <= 0) {
            saveQuizResult(currentScore);
            gameOver();
        } else {
            showResult(false, "Jawaban salah. Coba lagi.");
        }
    }
}
function showResult(isCorrect, fact) {
resultModal.classList.remove('hidden');
resultText.textContent = isCorrect ? "Benar!" : "Salah!"; // Fixed duplicated text
resultDescription.textContent = fact;
resultIcon.innerHTML = isCorrect ? "🎉" : "😔";

// Update button text based on game state
if (currentQuestionIndex === questions.length - 1 && isCorrect) {
    nextBtn.textContent = "Selesaikan Quest!";
} else {
    nextBtn.textContent = isCorrect ? "Pertanyaan Berikutnya" : "Coba Lagi";
}

// Remove old event listener before adding new one
nextBtn.onclick = () => {
    resultModal.classList.add('hidden');
    
    if (isCorrect) {
        currentQuestionIndex++;
        showQuestion();
    }
};
}

function gameOver() {
    quizArea.classList.add('hidden');
    
    const gameOverScreen = document.createElement('div');
    gameOverScreen.className = 'text-center py-10';
    gameOverScreen.innerHTML = `
        <div class="mb-8">
            <img src="/api/placeholder/180/180" alt="Game Over" class="mx-auto rounded-full">
        </div>
        <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-red-300 to-red-500 text-transparent bg-clip-text">
            Game Over
        </h2>
        <p class="mb-4 text-xl text-red-100">Skor Akhir: ${currentScore}</p>
        <p class="mb-8 text-lg text-red-100">Jangan menyerah! Coba lagi untuk skor yang lebih baik!</p>
        <button id="restartBtn" class="group relative px-8 py-4 bg-gradient-to-r from-red-400 to-orange-500 rounded-full font-bold text-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-purple-900">
            Mulai Lagi
        </button>
    `;
    
    gameArea.appendChild(gameOverScreen);
    
    document.getElementById('restartBtn').addEventListener('click', () => {
        resetGame();
        gameOverScreen.remove();
        quizArea.classList.remove('hidden');
    });
}

function showGameCompletion() {
// Simpan hasil quiz
saveQuizResult(currentScore);

quizArea.classList.add('hidden');

    const completionScreen = document.createElement('div');
    completionScreen.className = 'text-center py-10';
    completionScreen.innerHTML = `
        <div class="mb-8">
            <img src="/api/placeholder/180/180" alt="Trophy" class="mx-auto rounded-full floating-icon glowing">
        </div>
        <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
            Quest Selesai!
        </h2>
        <p class="mb-4 text-xl text-yellow-100">Skor Akhir: ${currentScore}</p>
        <p class="mb-8 text-lg text-yellow-100">Kamu telah menyelesaikan semua pertanyaan tentang para Nabi!</p>
        <div class="space-y-4">
            <p class="text-md text-yellow-100">
                ${getCompletionMessage(currentScore)}
            </p>
            <button id="restartBtn" class="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-900">
                Mulai Quest Baru
            </button>
        </div>
    `;
    
    gameArea.appendChild(completionScreen);
    
    document.getElementById('restartBtn').addEventListener('click', () => {
        resetGame();
        completionScreen.remove();
        quizArea.classList.remove('hidden');
    });
}

function getCompletionMessage(score) {
    const maxScore = questions.length * 10;
    const percentage = (score / maxScore) * 100;
    
    if (percentage === 100) {
        return "Mashaa Allah! Kamu mendapat nilai sempurna! 🌟";
    } else if (percentage >= 80) {
        return "Alhamdulillah! Hasil yang sangat bagus! ✨";
    } else if (percentage >= 60) {
        return "Bagus! Terus tingkatkan pengetahuanmu! 💫";
    } else {
        return "Semangat! Coba lagi untuk hasil yang lebih baik! 💪";
    }
}

function resetGame() {
    currentQuestionIndex = 0;
    currentScore = 0;
    lives = 3;
    correctStreak = 0;
    scoreElement.textContent = currentScore;
    levelElement.textContent = currentLevel;
    livesElement.textContent = '❤️'.repeat(lives);
    progressBar.style.width = '0%';
    showQuestion();
}

// Initialize game
livesElement.textContent = '❤️'.repeat(lives);
