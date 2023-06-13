let container = document.querySelector("#container");
let start = document.querySelector("#start");
let game = document.querySelector("#game");
let block = document.querySelector("#block");
let gap = document.querySelector("#gap");
let bird = document.querySelector("#bird");
let gameOver = document.querySelector("#gameOver");
let score = document.querySelector("#score");
let playAgain = document.querySelector("#playAgain");
let scoreCount = 0;

// run game
start.addEventListener("click", () => {

    // display game screen & hide start button
    start.style.display = "none";
    game.style.display = "block";

    // start "block" animation
    block.style.animation = "animate 2s linear infinite";

    // start running game
    let runGame = setInterval(()=>{
        let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
        let blockRight = parseInt(window.getComputedStyle(block).getPropertyValue("right"));
        let gapTop = parseInt(window.getComputedStyle(gap).getPropertyValue("top"));
        // console.log(birdTop);
        
        // show result 
        if(birdTop < 0 || birdTop > 600){
            // display "game Over message & stop game"
            game.style.display = "none";
            gameOver.style.display = "grid";
            block.style.animation = "none";
            score.innerText = scoreCount;
            clearInterval(runGame);
        }else if(blockRight > 760 && blockRight < 800 && (birdTop < gapTop || birdTop > gapTop + 145)){
            // display "game Over message & stop game"
            game.style.display = "none";
            gameOver.style.display = "grid";
            block.style.animation = "none";
            score.innerText = scoreCount;
            clearInterval(runGame);
        }else{
            // keep playing
            bird.style.top = birdTop + 3 + "px";
        }
    },10);

});

// count animation iteration and change the gap position randomly.
// don't use "animationIteration" if event is supported by your browser.
// use "webkitAnimationIteration" for chrome & "mozAnimationIteration" for mozila

block.addEventListener("webkitAnimationIteration", () => {
    // generate random number
    let random = Math.floor(Math.random() * 70) + 5;
    gap.style.top = random + "%";
    scoreCount++;
});

// fly bird when space button clicked
window.addEventListener("keyup",e =>{
    if(e.code === "Space"){
        let jumpInterval = setInterval(()=>{
            // get "bird" current positon
            let changeBirdPosition = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));

            // fix bird overflow
            if(changeBirdPosition > 81){
                bird.style.top = changeBirdPosition - 80 + "px";
                clearInterval(jumpInterval);
            }else{
                clearInterval(jumpInterval);
            }
        },3);
    }
});

// reload game when "play again" button clicked
playAgain.addEventListener("click", ()=>{
window.location.reload();
})