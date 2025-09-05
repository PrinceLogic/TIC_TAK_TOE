// Get elements from the page
var board = document.getElementById('board');
var statusDiv = document.getElementById('status');
var restartBtn = document.getElementById('restart');
var cells = document.getElementsByClassName('cell');

// Game variables
var currentPlayer = 'X';
var gameActive = true;
var gameState = ['', '', '', '', '', '', '', '', ''];

// All possible winning combinations
var winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

// When a cell is clicked
function handleCellClick(event) {
    var cell = event.target;
    var idx = parseInt(cell.getAttribute('data-index'));
    if (!gameActive) return;
    if (gameState[idx] !== '') return;
    gameState[idx] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    if (checkWin()) {
        statusDiv.textContent = 'Player ' + currentPlayer + ' wins!';
        gameActive = false;
        highlightWin();
        return;
    }
    if (isDraw()) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    // Switch player
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    statusDiv.textContent = 'Player ' + currentPlayer + "'s turn";
}

// Check if someone has won
function checkWin() {
    for (var i = 0; i < winPatterns.length; i++) {
        var a = winPatterns[i][0];
        var b = winPatterns[i][1];
        var c = winPatterns[i][2];
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

// Highlight the winning cells
function highlightWin() {
    for (var i = 0; i < winPatterns.length; i++) {
        var a = winPatterns[i][0];
        var b = winPatterns[i][1];
        var c = winPatterns[i][2];
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            cells[a].style.background = '#b2f2bb';
            cells[b].style.background = '#b2f2bb';
            cells[c].style.background = '#b2f2bb';
        }
    }
}

// Check if the game is a draw
function isDraw() {
    for (var i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            return false;
        }
    }
    return true;
}

// Restart the game
function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    for (var i = 0; i < gameState.length; i++) {
        gameState[i] = '';
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].classList.remove('taken');
        cells[i].style.background = '';
    }
    statusDiv.textContent = 'Player ' + currentPlayer + "'s turn";
}

// Add click event to each cell
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleCellClick);
}
// Add click event to restart button
restartBtn.addEventListener('click', restartGame);

// Show initial status
statusDiv.textContent = 'Player ' + currentPlayer + "'s turn";
