// Dark Mode toggle function
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Change button text based on current mode
    const darkModeToggle = document.querySelector('.dark-mode-toggle button');
    const isDarkMode = body.classList.contains('dark-mode');
    darkModeToggle.innerText = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Tic Tac Toe game logic
const board = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'X';
let gameOver = false;

function makeMove(index) {
    if (!board[index] && !gameOver) {
        board[index] = currentPlayer;
        checkWinner();
        switchPlayer();
        updateBoard();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = board[index] || '';
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            displayWinner(board[a]);
        }
    }

    if (!board.includes(null) && !gameOver) {
        gameOver = true;
        displayDraw();
    }
}

function displayWinner(winner) {
    const message = document.getElementById('message');
    message.innerText = `Player ${winner} wins!`;
}

function displayDraw() {
    const message = document.getElementById('message');
    message.innerText = "It's a draw!";
}

function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    gameOver = false;
    updateBoard();
    const message = document.getElementById('message');
    message.innerText = '';
}
