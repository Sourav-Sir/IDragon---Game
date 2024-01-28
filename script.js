score = 0;
cross = true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = true;
document.onkeydown = function(element){
    if (element.keyCode == 38 || element.key == " " || element.keyCode == 13 || element.keyCode == 49 || element.keyCode == 32 ){
        console.log("Key  is pressed")
        dino = document.querySelector('.dino')
        dino.classList.add('animateDino')
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (element.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX =  parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112  + "px";
    }
    if (element.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX =  parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112)  + "px";
    }
}
// window.addEventListener('keydown' , (element) => {
    
    
// } )
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offSetX = Math.abs(dx-ox);
    offSetY = Math.abs(dy-oy);
    console.log(offSetX, offSetY)
    if (offSetX < 73 && offSetY < 52) {
        gameOver.innerHTML = 'Game over - Reload to Start over';
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audio.pause();
            audiogo.pause();
            document.onkeydown = false;
        }, 1000);
        
    }
    else if(offSetX < 145 && cross){
        score+=1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.1;
        obstacle.style.animationDuration = newDur + 's'
        }, 500);
        
    }

}, 10);


function updateScore(score){
    scoreCont.innerHTML = "Your Score: " + score;
}