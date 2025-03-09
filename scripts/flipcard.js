const prophets = [
    { name: 'Adam', story: 'First human and prophet' },
    { name: 'Nuh', story: 'Built a great ark' },
    { name: 'Ibrahim', story: 'Built the Kaaba' },
    { name: 'Musa', story: 'Parted the sea' },
    { name: 'Isa', story: 'Could heal the sick' },
    { name: 'Muhammad', story: 'The final prophet' }
];

let score = 0;
let level = 1;
let gameMode = 'learning';

// Learning Mode Setup
function setupLearningMode() {
    const learningContent = document.getElementById('learningContent');
    learningContent.innerHTML = '';

    prophets.forEach((prophet, index) => {
        const button = document.createElement('button');
        button.className = 'prophet-btn bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold py-4 px-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = prophet.name;
        nameSpan.className = 'text-lg';
        
        button.appendChild(nameSpan);
        button.addEventListener('click', () => showProphetInfo(prophet));
        
        learningContent.appendChild(button);
    });
}

// Game Mode Setup
function setupGameMode() {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';

    // Create matching pairs
    const gamePairs = [...prophets].slice(0, level); // Increase pairs with each level
    const gameCards = [...gamePairs, ...gamePairs].sort(() => Math.random() - 0.5);

    gameCards.forEach((card, index) => {
        const cardElement = createGameCard(card, index);
        gameGrid.appendChild(cardElement);
    });
}

function createGameCard(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'game-card relative h-32 cursor-pointer';
    cardDiv.innerHTML = `
        <div class="game-card-inner absolute w-full h-full">
            <div class="game-card-front bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                <span class="text-4xl">?</span>
            </div>
            <div class="game-card-back bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center p-4">
                <span class="text-white text-center font-bold">${card.name}</span>
            </div>
        </div>
    `;

    cardDiv.addEventListener('click', () => flipCard(cardDiv, card));
    return cardDiv;
}

let flippedCards = [];
let canFlip = true;

function flipCard(cardElement, card) {
    if (!canFlip || cardElement.classList.contains('flipped') || flippedCards.length >= 2) return;

    cardElement.classList.add('flipped');
    flippedCards.push({ element: cardElement, card });

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    canFlip = false;

    const [first, second] = flippedCards;

    if (first.card.name === second.card.name) {
        score += 10;
        document.getElementById('score').textContent = score;
        createConfetti();

        setTimeout(() => {
            first.element.style.visibility = 'hidden';
            second.element.style.visibility = 'hidden';
            checkLevelComplete();
            flippedCards = [];
            canFlip = true;
        }, 1000);
    } else {
        setTimeout(() => {
            first.element.classList.remove('flipped');
            second.element.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function checkLevelComplete() {
    const matchedCards = document.querySelectorAll('.game-card[style*="visibility: hidden"]');
    if (matchedCards.length === level * 2) {
        level++;
        document.getElementById('levelIndicator').innerHTML = `<span class="text-orange-500 font-bold">Level: ${level}</span>`;
        setTimeout(setupGameMode, 1000);
    }
}

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
        confetti.innerText = '✨';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

function showProphetInfo(prophet) {
    alert(`Learn about ${prophet.name}: ${prophet.story}`);
}

document.getElementById('learningMode').addEventListener('click', () => {
    gameMode = 'learning';
    document.getElementById('learningContent').classList.remove('hidden');
    document.getElementById('gameContent').classList.add('hidden');
    setupLearningMode();
});

document.getElementById('gameMode').addEventListener('click', () => {
    gameMode = 'game';
    document.getElementById('learningContent').classList.add('hidden');
    document.getElementById('gameContent').classList.remove('hidden');
    setupGameMode();
});

setupLearningMode();