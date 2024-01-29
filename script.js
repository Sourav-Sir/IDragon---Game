// Created by Sourav Chakraborty 
// Constants
const RELOAD_BUTTON_CONTAINER_ID = 'reloadButtonContainer';
const RELOAD_BUTTON_ID = 'reloadButton';

// Variables
let score = 0;
let cross = true;
let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');
let gameIsOver = false; // New variable to track game over state
let touchStartX; // Variables to track touch start position

// Event listener for reload button
document.getElementById(RELOAD_BUTTON_ID).addEventListener('click', function () {
    location.reload();
});

// Function to play audio with loop
function playAudio() {
    audio.play();
}

// Event listener to restart audio when it ends
audio.addEventListener('ended', function () {
    // Restart the audio
    this.currentTime = 0; // Reset audio to the beginning
    playAudio();
});

// Initialize the game
function initializeGame() {
    setTimeout(() => {
        playAudio();
    }, 1000);

    // Additional initialization code can go here
}

// Add keydown event listener
document.addEventListener('keydown', function (event) {
    handleKeyEvent(event);
});

// Add touchstart event listener
document.addEventListener('touchstart', function (event) {
    handleTouchEvent(event);
});

// Add touchmove event listener
document.addEventListener('touchmove', function (event) {
    handleTouchEvent(event);
});

// Handle key events and touch events
function handleTouchEvent(event) {
    if (!gameIsOver) {
        // Handle touch events
        if (event.type === 'touchstart' || event.type === 'touchmove') {
            let touchEndX;

            if (event.type === 'touchstart') {
                touchStartX = event.touches[0].clientX;
            } else if (event.type === 'touchmove') {
                touchEndX = event.touches[0].clientX;
                let swipeDistance = touchEndX - touchStartX;

                // You can adjust the threshold based on your preference
                if (swipeDistance > 50) {
                    // Swipe to the right
                    moveDinoRight();
                    animateDino();
                } else if (swipeDistance < -50) {
                    // Swipe to the left
                    moveDinoLeft();
                    animateDino();
                }
            }
        }
    }
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

// Function to Animate the dino
function animateDino() {
    dino = document.querySelector('.dino');
    dino.classList.add('animateDino');
    setTimeout(() => {
        dino.classList.remove('animateDino');
    }, 700);
}

//Function to Move the dino to the right
function moveDinoRight() {
    dino = document.querySelector('.dino');
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    // Check if the dino is going beyond the right edge
    if (dinoX < window.innerWidth - 112) {
        dino.style.left = dinoX + 112 + "px";
    }
}

// Function to Move the dino to the left
function moveDinoLeft() {
    dino = document.querySelector('.dino');
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    // Check if the dino is going beyond the left edge
    if (dinoX > 0) {
        dino.style.left = (dinoX - 112) + "px";
    }
}


// Adjust obstacle animation duration with a delay
function adjustObstacleAnimationDuration(delay, reduction) {
    setTimeout(() => {
        const obstacle = document.querySelector('.obstacle');
        const aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        obstacle.style.animationDuration = (aniDur - reduction) + 's';
    }, delay);
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
            // Apply the hideDino class to make the dino disappear
            dino.classList.add('hideDino');
        } else if (offSetX < 145 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            // Usage example
            adjustObstacleAnimationDuration(500, 0.01);
        }
        // Additional game loop code can go here
    }
}



