const questions = [
    {
        question: "✨ Siapakah Nabi pertama yang Allah SWT ciptakan?",
        options: ["Nabi Adam AS 👨", "Nabi Idris AS 📚", "Nabi Nuh AS 🚢", "Nabi Ibrahim AS 🕌"],
        correct: 0,
        fact: "Nabi Adam AS adalah manusia dan Nabi pertama yang Allah SWT ciptakan. Beliau adalah Bapak dari seluruh manusia. 🌟"
    },
    {
        question: "✨ Nabi manakah yang membuat kapal besar atas perintah Allah?",
        options: ["Nabi Musa AS 🌊", "Nabi Nuh AS 🚢", "Nabi Ibrahim AS 🕌", "Nabi Isa AS 👋"],
        correct: 1,
        fact: "Nabi Nuh AS membuat kapal besar untuk menyelamatkan orang-orang yang beriman dan berbagai jenis hewan dari banjir besar. 🌊"
    },
    {
        question: "✨ Siapakah Nabi yang mendapat gelar 'Kekasih Allah' (Khalilullah)?",
        options: ["Nabi Muhammad SAW 🕌", "Nabi Musa AS 📜", "Nabi Ibrahim AS ⭐", "Nabi Isa AS 🕊️"],
        correct: 2,
        fact: "Nabi Ibrahim AS adalah Khalilullah (Kekasih Allah) karena ketaatan dan pengorbanan beliau yang luar biasa. ❤️"
    },
    {
        question: "✨ Nabi siapakah yang bisa berbicara dengan hewan?",
        options: ["Nabi Dawud AS 🎵", "Nabi Sulaiman AS 👑", "Nabi Yusuf AS 🌟", "Nabi Yunus AS 🐋"],
        correct: 1,
        fact: "Nabi Sulaiman AS bisa berbicara dengan hewan dan memimpin jin. Keren sekali ya! 🦁"
    },
    {
        question: "✨ Siapakah Nabi terakhir yang Allah SWT utus?",
        options: ["Nabi Isa AS ", "Nabi Yahya AS ", "Nabi Muhammad SAW ", "Nabi Ibrahim AS "],
        correct: 2,
        fact: "Nabi Muhammad SAW adalah Nabi dan Rasul terakhir yang mengajarkan Islam dengan sempurna. ✨"
    }
];

let currentQuestion = 0;
let score = 0;
let usedQuestions = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomQuestions(count) {
    const shuffled = shuffleArray([...questions]);
    return shuffled.slice(0, count);
}

function showQuestion() {
    const questionData = usedQuestions[currentQuestion];
    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-4 text-white">${questionData.question}</h2>
    `;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn w-full text-xl p-3';
        button.textContent = option;
        button.onclick = () => checkAnswer(index, questionData);
        optionsContainer.appendChild(button);
    });
}

function showResult(isCorrect, fact) {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <div class="${isCorrect ? 'text-green-300' : 'text-red-300'} text-3xl font-bold mb-6">
            ${isCorrect ? '🎉 Hebat! Jawabanmu Benar!' : '✨ Ups! Ayo Coba Lagi!'}
        </div>
        <div class="text-xl mb-6 text-white">
            ${fact}
        </div>
        <button onclick="nextQuestion()" class="option-btn w-full max-w-md mx-auto text-xl p-3">
            ${currentQuestion < usedQuestions.length - 1 ? '🚀 Lanjut Petualangan!' : '🌟 Lihat Hasil!'}
        </button>
    `;
    document.getElementById('optionsContainer').innerHTML = '';
}

function checkAnswer(selectedIndex, questionData) {
    const isCorrect = selectedIndex === questionData.correct;
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === questionData.correct) {
            button.classList.add('correct-answer');
        } else if (index === selectedIndex && !isCorrect) {
            button.classList.add('wrong-answer');
        }
    });

    if (isCorrect) {
        score += 20;
        document.getElementById('score').textContent = score;
    }

    setTimeout(() => showResult(isCorrect, questionData.fact), 1000);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < usedQuestions.length) {
        showQuestion();
    } else {
        showFinalResult();
    }
}

function saveQuizResult(score) {
// Ambil data history yang sudah ada atau inisialisasi array kosong
let evaluationHistory = JSON.parse(localStorage.getItem('evaluationHistory')) || [];

// Buat objek hasil quiz baru
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

const quizResult = {
no: evaluationHistory.length + 1,
tanggal: formattedDate,
score: score
};

// Tambahkan hasil baru ke array
evaluationHistory.push(quizResult);

// Simpan kembali ke localStorage
localStorage.setItem('evaluationHistory', JSON.stringify(evaluationHistory));
}

// Modifikasi function showFinalResult()
function showFinalResult() {
// Simpan hasil quiz
saveQuizResult(score);

document.querySelector('.bg-white.bg-opacity-10').classList.add('hidden');
document.getElementById('resultContainer').classList.remove('hidden');
document.getElementById('finalScore').textContent = score;

let emoji = '', message = '';

if (score === 100) {
emoji = '🌟 LUAR BIASA! 🌟';
message = 'Kamu Sangat Pintar!';
} else if (score >= 80) {
emoji = '✨ HEBAT! ✨';
message = 'Kamu Sudah Sangat Baik!';
} else if (score >= 60) {
emoji = '🌈 BAGUS! 🌈';
message = 'Terus Semangat Belajar!';
} else {
emoji = '💪 SEMANGAT! 💪';
message = 'Ayo Coba Lagi!';
}

const resultMessage = document.querySelector('#resultContainer p');
resultMessage.innerHTML = `
<div class="text-4xl mb-4">${emoji}</div>
<div class="text-2xl mb-4">${message}</div>
<div class="text-3xl">Skor Kamu: <span class="text-yellow-300 font-bold">${score}</span></div>
`;

if (score >= 60) {
createConfetti();
}
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

function startGame() {
    document.querySelectorAll('.confetti').forEach(c => c.remove());
    
    currentQuestion = 0;
    score = 0;
    usedQuestions = getRandomQuestions(5);
    document.getElementById('score').textContent = score;
    document.querySelector('.bg-white.bg-opacity-10').classList.remove('hidden');
    document.getElementById('resultContainer').classList.add('hidden');
    showQuestion();
}



window.onload = showQuestion;
// Start the game when the page loads
startGame();
