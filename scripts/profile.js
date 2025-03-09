// Get evaluation results from localStorage or initialize empty array
let evaluationHistory = JSON.parse(localStorage.getItem('evaluationHistory')) || [];
        
// Function to add new evaluation result
function addEvaluationResult(score) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    evaluationHistory.push({
        no: evaluationHistory.length + 1,
        tanggal: formattedDate,
        score: score
    });
    
    // Save to localStorage
    localStorage.setItem('evaluationHistory', JSON.stringify(evaluationHistory));
    
    // Update the table
    populateEvaluationTable();
}

// Function to populate evaluation table
function populateEvaluationTable() {
    const tbody = document.getElementById('evaluasiTable');
    tbody.innerHTML = evaluationHistory.map(row => `
        <tr class="border-b hover:bg-gray-50">
            <td class="py-2 px-4">${row.no}</td>
            <td class="py-2 px-4">${row.tanggal}</td>
            <td class="py-2 px-4">${row.score}</td>
        </tr>
    `).join('');
}

// Function to handle quiz completion
function handleQuizCompletion(finalScore) {
    addEvaluationResult(finalScore);
}

// Initialize the table on page load
    document.addEventListener('DOMContentLoaded', () => {
populateEvaluationTable();
populateQuizTable(); // Tambahkan ini
});


// Connect with the quiz completion event
function showFinalResult() {
    const finalScore = score; // This is from your quiz code
    handleQuizCompletion(finalScore);
    
    document.querySelector('.bg-white.bg-opacity-10').classList.add('hidden');
    document.getElementById('resultContainer').classList.remove('hidden');
    document.getElementById('finalScore').textContent = finalScore;
    
    let emoji = '', message = '';
    
    if (finalScore === 100) {
        emoji = '🌟 LUAR BIASA! 🌟';
        message = 'Kamu Sangat Pintar!';
    } else if (finalScore >= 80) {
        emoji = '✨ HEBAT! ✨';
        message = 'Kamu Sudah Sangat Baik!';
    } else if (finalScore >= 60) {
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
        <div class="text-3xl">Skor Kamu: <span class="text-yellow-300 font-bold">${finalScore}</span></div>
    `;

    if (finalScore >= 60) {
        createConfetti();
    }
}

// Initialize quiz variables and functions from your existing quiz code
let currentQuestion = 0;
let score = 0;
let usedQuestions = [];

function populateQuizTable() {
const tbody = document.getElementById('quizTable');
const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];

tbody.innerHTML = quizHistory.map(row => `
<tr class="border-b hover:bg-gray-50">
    <td class="py-2 px-4">${row.no}</td>
    <td class="py-2 px-4">${row.tanggal}</td>
    <td class="py-2 px-4">${row.score}</td>
</tr>
`).join('');
}

// Your existing quiz functions here...
// Make sure to call handleQuizCompletion when the quiz is finished