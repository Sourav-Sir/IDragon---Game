// Constants
const RELOAD_BUTTON_CONTAINER_ID = 'reloadButtonContainer';
const RELOAD_BUTTON_ID = 'reloadButton';

// Variables
let score = 0;
let cross = true;
let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');
let gameIsOver = false; // New variable to track game over state

// Event listener for reload button
document.getElementById(RELOAD_BUTTON_ID).addEventListener('click', function () {
    location.reload();
});

// Initialize the game
function initializeGame() {
    setTimeout(() => {
        audio.play();
    }, 1000);

    // Additional initialization code can go here
}

// Handle key events
function handleKeyEvent(element) {
    if (!gameIsOver) {
        if (element.keyCode == 38 || element.key == " " || element.keyCode == 13 || element.keyCode == 49 || element.keyCode == 32) {
            console.log("Key is pressed");
            animateDino();
        }
        if (element.keyCode == 39) {
            moveDinoRight();
        }
        if (element.keyCode == 37) {
            moveDinoLeft();
        }
    }
}

// Animate the dino
function animateDino() {
    dino = document.querySelector('.dino');
    dino.classList.add('animateDino');
    setTimeout(() => {
        dino.classList.remove('animateDino');
    }, 700);
}

// Move the dino to the right
function moveDinoRight() {
    dino = document.querySelector('.dino');
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = dinoX + 112 + "px";
}

// Move the dino to the left
function moveDinoLeft() {
    dino = document.querySelector('.dino');
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = (dinoX - 112) + "px";
}

// Main game loop
function gameLoop() {
    if (!gameIsOver) {
        dino = document.querySelector('.dino');
        gameOver = document.querySelector('.gameOver');
        obstacle = document.querySelector('.obstacle');
        reloadButtonContainer = document.getElementById(RELOAD_BUTTON_CONTAINER_ID);

        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        offSetX = Math.abs(dx - ox);
        offSetY = Math.abs(dy - oy);

        if (offSetX < 73 && offSetY < 52) {
            gameOver.innerHTML = 'Game over - Reload to Start over';
            obstacle.classList.remove('obstacleAni');
            audiogo.play();
            setTimeout(() => {
                audio.pause();
                audiogo.pause();
                document.onkeydown = false;
                // Show the reload button container
                reloadButtonContainer.style.visibility = 'visible';
                gameIsOver = true; // Set game over state
            }, 1000);
        } else if (offSetX < 145 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
            }, 500);
        }

        // Additional game loop code can go here
    }
}

// Update the score display
function updateScore(score) {
    document.getElementById('scoreCont').innerHTML = "Your Score: " + score;
}

// Call the initialize function when the page loads
window.onload = function () {
    initializeGame();

    // Set up the game loop
    setInterval(gameLoop, 10);
};

// Event listener for keydown
document.addEventListener('keydown', function (element) {
    handleKeyEvent(element);
});
