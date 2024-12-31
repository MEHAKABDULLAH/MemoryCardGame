const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let gameCards = [...cardValues, ...cardValues]; // Duplicate values for pairs
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;

const gameBoard = document.getElementById('gameBoard');
const resultText = document.getElementById('resultText');
const restartButton = document.getElementById('restartButton');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
        matchedCards += 2;
        if (matchedCards === gameCards.length) {
            resultText.innerText = 'You won! 🎉';
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    alert(`You found a match: ${firstCard.dataset.value}!`); // Alert for match
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerText = '';
        secondCard.innerText = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startGame() {
    shuffle(gameCards);
    gameBoard.innerHTML = '';
    matchedCards = 0;
    resultText.innerText = '';
    gameCards.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });
}

restartButton.addEventListener('click', startGame);
startGame();