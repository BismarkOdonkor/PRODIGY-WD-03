// script.js

const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `It's ${currentPlayer}'s turn`;
    } else {
        message.textContent = 'Draw!';
        gameActive = false;
    }
};

const checkWin = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    return roundWon;
};

const restartGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
