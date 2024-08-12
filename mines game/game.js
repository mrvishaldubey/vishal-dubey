const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const gridSize = 5;
const mineCount = 4;
let cells = [];

function createBoard() {
    gameBoard.innerHTML = '';
    cells = [];

    // Create cells
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        gameBoard.appendChild(cell);
        cells.push(cell);
    }

    // Randomly place mines
    placeMines();
}

function placeMines() {
    let placedMines = 0;

    while (placedMines < mineCount) {
        const index = Math.floor(Math.random() * cells.length);
        if (!cells[index].classList.contains('mine')) {
            cells[index].classList.add('mine');
            placedMines++;
        }
    }
}

function handleClick(event) {
    const cell = event.target;

    if (cell.classList.contains('mine')) {
        cell.innerHTML = '<img src="boom.png" alt="Boom">';
        cell.classList.add('boom');
        alert('Boom! You clicked on a mine. Starting a new game.');
        createBoard();
    } else {
        cell.style.backgroundColor = '#dddddd';
        cell.style.cursor = 'default';
        cell.removeEventListener('click', handleClick);
    }
}

restartBtn.addEventListener('click', createBoard);

// Initialize the game
createBoard();
