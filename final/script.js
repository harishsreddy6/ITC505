let boardSize = 5;
let gameBoard = [];
let moves = 0;
let targetMoves = 0;
let timer;
let elapsedTime = 0;
let bestScore = Infinity;

function startGame(size) {
    boardSize = size;
    moves = 0;
    elapsedTime = 0;
    targetMoves = Math.floor(size * 1.5); // Set target moves based on board size
    updateDisplay();
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");

    if (timer) clearInterval(timer); // Reset the timer
    timer = setInterval(() => {
        elapsedTime++;
        updateTimer();
    }, 1000);

    generateBoard(size);
}

function updateDisplay() {
    document.getElementById("target-moves").textContent = targetMoves; // Show target moves
    document.getElementById("current-moves").textContent = moves; // Show current moves
}

function updateTimer() {
    const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
    const seconds = String(elapsedTime % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function generateBoard(size) {
    const board = document.getElementById("game-board");
    board.innerHTML = ""; // Clear the board
    board.style.gridTemplateColumns = `repeat(${size}, 40px)`;

    gameBoard = Array(size).fill().map(() => Array(size).fill(false)); // Initialize the game state

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = row;
            square.dataset.col = col;
            square.addEventListener("click", () => handleSquareClick(row, col));
            board.appendChild(square);
        }
    }

    randomizeBoard(size); // Ensure a solvable board
}

function handleSquareClick(row, col) {
    moves++; // Increment moves count
    toggleSquare(row, col); // Toggle the clicked square and neighbors
    updateDisplay(); // Update the display with current moves
}

function toggleSquare(row, col) {
    const toggle = (r, c) => {
        if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
            const square = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            gameBoard[r][c] = !gameBoard[r][c]; // Toggle the cell state
            square.classList.toggle("is-off", !gameBoard[r][c]); // Toggle the visual state
        }
    };

    toggle(row, col);
    toggle(row - 1, col);
    toggle(row + 1, col);
    toggle(row, col - 1);
    toggle(row, col + 1);

    checkWin();
}

function randomizeBoard(size) {
    for (let i = 0; i < size * size; i++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        toggleSquare(row, col); // Simulate random toggles to create a solvable board
    }
}

function checkWin() {
    if (gameBoard.every(row => row.every(cell => !cell))) {
        clearInterval(timer); // Stop the timer
        showWinMessage(); // Show animated "You Win!" message

        // Update best score if the current moves are better
        if (moves < bestScore) {
            bestScore = moves;
            document.getElementById("best-score").textContent = bestScore; // Update only the best score display
        }
    }
}

function resetGame() {
    startGame(boardSize); // Restart the game with the current board size
}

function showWinMessage() {
    alert("🎉 You win! 🎉"); // Display the win message (replace with animation if needed)
}

function showTutorial() {
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("tutorial").classList.remove("hidden");
}

function showAddendum() {
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("addendum").classList.remove("hidden");
}

function goBack() {
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("tutorial").classList.add("hidden");
    document.getElementById("addendum").classList.add("hidden");
    document.getElementById("welcome").classList.remove("hidden");

    if (timer) clearInterval(timer); // Stop the timer if the user goes back
}
