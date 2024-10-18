const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (gameState[index] !== null) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`${currentPlayer} Ganador!`);
        restartGame();
    } else if (gameState.every(cell => cell !== null)) {
        alert('No hay Ganador!');
        restartGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] !== null &&
               gameState[a] === gameState[b] &&
               gameState[a] === gameState[c];
    });
}

function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}
