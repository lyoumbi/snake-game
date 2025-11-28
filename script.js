// Canvas and game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverPopup = document.getElementById('gameOverPopup');
const speedSelector = document.getElementById('snakeLengthSelector');
const speedRange = document.getElementById('speedRange');
const speedValue = document.getElementById('speedValue');
const startLevelBtn = document.getElementById('startLevelBtn');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const levelDisplay = document.getElementById('level');
const finalScoreDisplay = document.getElementById('finalScore');
const popupHighScoreDisplay = document.getElementById('popupHighScore');
const levelReachedDisplay = document.getElementById('levelReached');
const popupTitleDisplay = document.getElementById('popupTitle');
const popupMessageDisplay = document.getElementById('popupMessage');
const restartBtn = document.getElementById('restartBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const endBtn = document.getElementById('endBtn');

// Game constants
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const LEVEL_POINTS_REQUIRED = 100;
const MAX_LEVELS = 10;

// Game state
let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
let selectedSpeed = 10;
let food = { x: 15, y: 15 };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let levelScore = 0;
let totalScore = 0;
let level = 1;
let obstacles = [];
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = true;
let gameOver = false;
let levelComplete = false;
let gameStarted = false;

// Initialize high score display
highScoreDisplay.textContent = highScore;
popupHighScoreDisplay.textContent = highScore;
levelDisplay.textContent = level;

// Event listeners
document.addEventListener('keydown', handleKeyPress);
speedRange.addEventListener('input', (e) => {
    speedValue.textContent = e.target.value;
    selectedSpeed = parseInt(e.target.value);
});
startLevelBtn.addEventListener('click', startLevel);
restartBtn.addEventListener('click', restartGame);
nextLevelBtn.addEventListener('click', nextLevel);
endBtn.addEventListener('click', exitGame);

// Game loop - default speed
let gameLoopInterval;
let currentGameSpeed = 100; // milliseconds between updates

function startLevel() {
    // Calculate speed: 1 = slowest (200ms), 20 = fastest (50ms)
    currentGameSpeed = 250 - (selectedSpeed * 10);
    
    // Restart game loop with new speed
    clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(update, currentGameSpeed);
    
    speedSelector.classList.add('hidden');
    gameRunning = true;
    gameStarted = false;
}

function handleKeyPress(e) {
    switch (e.key) {
        case 'ArrowUp':
            gameStarted = true;
            if (direction.y === 0) nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
        case 'ArrowDown':
            gameStarted = true;
            if (direction.y === 0) nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
        case 'ArrowLeft':
            gameStarted = true;
            if (direction.x === 0) nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
        case 'ArrowRight':
            gameStarted = true;
            if (direction.x === 0) nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
    }
}

function update() {
    if (!gameRunning || !gameStarted) return;

    direction = nextDirection;

    // Move snake
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Wrap around walls (teleport to opposite side)
    head.x = (head.x + tileCount) % tileCount;
    head.y = (head.y + tileCount) % tileCount;

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    // Check obstacle collision
    if (obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        levelScore += 10;
        totalScore += 10;
        scoreDisplay.textContent = levelScore + '/100';
        generateFood();

        // Check if level is complete
        if (levelScore >= LEVEL_POINTS_REQUIRED) {
            completeLevel();
        }
    } else {
        snake.pop();
    }

    draw();
}

function generateFood() {
    let newFood;
    let foodOnSnake;
    let foodOnObstacle;

    do {
        foodOnSnake = false;
        foodOnObstacle = false;
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };

        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                foodOnSnake = true;
                break;
            }
        }

        for (let obstacle of obstacles) {
            if (obstacle.x === newFood.x && obstacle.y === newFood.y) {
                foodOnObstacle = true;
                break;
            }
        }
    } while (foodOnSnake || foodOnObstacle);

    food = newFood;
}

function generateObstacles() {
    obstacles = [];
    const obstacleCount = Math.min(level * 2, 15); // More obstacles per level

    for (let i = 0; i < obstacleCount; i++) {
        let newObstacle;
        let validPosition = false;

        while (!validPosition) {
            validPosition = true;
            newObstacle = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };

            // Don't spawn on snake
            for (let segment of snake) {
                if (segment.x === newObstacle.x && segment.y === newObstacle.y) {
                    validPosition = false;
                    break;
                }
            }

            // Don't spawn too close to food
            if (newObstacle.x === food.x && newObstacle.y === food.y) {
                validPosition = false;
            }

            // Don't spawn at same location as another obstacle
            for (let obstacle of obstacles) {
                if (obstacle.x === newObstacle.x && obstacle.y === newObstacle.y) {
                    validPosition = false;
                    break;
                }
            }
        }

        obstacles.push(newObstacle);
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw obstacles
    ctx.fillStyle = '#ff9800';
    for (let obstacle of obstacles) {
        ctx.fillRect(
            obstacle.x * gridSize + 1,
            obstacle.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );

        // Add pattern to obstacles
        ctx.strokeStyle = '#f57c00';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            obstacle.x * gridSize + 1,
            obstacle.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
    }

    // Draw snake
    ctx.fillStyle = '#4ade80';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(
            snake[i].x * gridSize + 1,
            snake[i].y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );

        // Head styling
        if (i === 0) {
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 2;
            ctx.strokeRect(
                snake[i].x * gridSize + 1,
                snake[i].y * gridSize + 1,
                gridSize - 2,
                gridSize - 2
            );
        }
    }

    // Draw food
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Draw grid lines (optional)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= tileCount; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
}

function endGame() {
    gameRunning = false;
    gameOver = true;
    levelComplete = false;

    // Update high score based on total progression
    const totalProgress = (level - 1) * LEVEL_POINTS_REQUIRED + levelScore;
    if (totalProgress > highScore) {
        highScore = totalProgress;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreDisplay.textContent = highScore;
        popupHighScoreDisplay.textContent = highScore;
    }

    // Show game over popup
    popupTitleDisplay.textContent = 'Game Over!';
    popupMessageDisplay.innerHTML = `Your Score: <span id="finalScore">${levelScore}</span>/100`;
    levelReachedDisplay.textContent = level;
    popupHighScoreDisplay.textContent = highScore;
    nextLevelBtn.style.display = 'none';
    gameOverPopup.classList.add('show');
}

function completeLevel() {
    gameRunning = false;
    levelComplete = true;

    if (level === MAX_LEVELS) {
        // Game completed!
        popupTitleDisplay.textContent = '🎉 All Levels Complete! 🎉';
        popupMessageDisplay.innerHTML = `You've completed all <strong>${MAX_LEVELS}</strong> levels!<br>Total Points: <strong>${levelScore}</strong>/100`;
        nextLevelBtn.style.display = 'none';
        gameOverPopup.classList.add('show');
    } else {
        // Level completed, auto-advance after 2 seconds
        popupTitleDisplay.textContent = 'Level Complete!';
        popupMessageDisplay.innerHTML = `You've completed Level <strong>${level}</strong>!<br>Score: <span id="finalScore">${levelScore}</span>/100<br><br>Moving to Level ${level + 1}...`;
        nextLevelBtn.style.display = 'none';
        gameOverPopup.classList.add('show');
        
        // Auto-advance after 2 seconds
        setTimeout(() => {
            if (level < MAX_LEVELS) {
                level++;
                levelDisplay.textContent = level;
                resetLevel();
                gameOverPopup.classList.remove('show');
            }
        }, 2000);
    }

    levelReachedDisplay.textContent = level;
}

function nextLevel() {
    if (level < MAX_LEVELS) {
        level++;
        levelDisplay.textContent = level;
        resetLevel();
        gameOverPopup.classList.remove('show');
    }
}

function resetLevel() {
    // Initialize snake with default length
    snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    food = { x: 15, y: 15 };
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    levelScore = 0;
    gameRunning = false;
    gameOver = false;
    levelComplete = false;
    gameStarted = false;

    scoreDisplay.textContent = levelScore + '/100';
    generateFood();
    generateObstacles();
    draw();
    
    // Show speed selector
    speedSelector.classList.remove('hidden');
}

function restartGame() {
    // Reset to level 1
    level = 1;
    levelScore = 0;
    totalScore = 0;
    gameRunning = true;
    gameOver = false;
    levelComplete = false;
    gameStarted = false;

    levelDisplay.textContent = level;
    scoreDisplay.textContent = levelScore + '/100';
    gameOverPopup.classList.remove('show');

    // Restart game loop
    clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(update, 100);

    resetLevel();
}

function exitGame() {
    // Reset and hide popup
    gameRunning = false;
    gameOverPopup.classList.remove('show');

    // You can redirect or show a home screen here
    alert('Thanks for playing! Refresh the page to play again.');
}

// Initial draw
generateFood();
generateObstacles();
draw();

// Show speed selector at start
speedSelector.classList.remove('hidden');
gameRunning = false;

// Initialize game loop (will be restarted with selected speed)
gameLoopInterval = setInterval(update, currentGameSpeed);
