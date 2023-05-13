//board
let blockSize = 25;
let cols = 20;
let rows = 20;
let board;
let context;

//sneake head
let snakex = blockSize * 5;
let snakey = blockSize * 5;

//snake body
let snakeBody = [];

//food point
let foodx, foody;

//velocity
let velocityx = 0, velocityy = 0;

//score
let score = 0;

//game over
let gameOver = false;

//eating sound path
let gameoverSound = './audio/mixkit-positive-interface-beep-221.wav';

//eating sound path
let eatingSound = './audio/mixkit-electronic-lock-success-beeps-2852.wav';

//score element
let scElm = document.getElementById('score');

function reload() {
    window.location.reload();
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    // board.style.backgroundColor = 'red';
    context = board.getContext("2d"); // used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 100);
}

//updating playground function
function update() {

    if(gameOver){
        playSound(gameoverSound);
        setPlayground();
    }

    //setting playground
    setPlayground();

    //drowing snake body
    context.fillStyle = "gray";
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //when eating food
    if(snakex === foodx && snakey === foody){
        snakeBody.push([foodx, foody]);
        playSound(eatingSound);
        score += 10;
        scElm.textContent = score;
        placeFood();
    }

    //move snake body one block
    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    
    //adding new block to snake body
    if(snakeBody.length){
        snakeBody[0] = [snakex,snakey];
    }

    //game over conditions
    //1. snake walk out of the playground
    if (snakex < 0 || snakex > cols*blockSize || snakey < 0 || snakey > rows*blockSize) {
        gameOver = true;
        playSound(gameoverSound);
        // alert("Game Over");
        setPlayground();
        stopMove();
        clearInterval(1);
    }
    //2. snake eats here body
    for(let i=0; i<snakeBody.length-1; i++){
        if(snakex == snakeBody[i+1][0] && snakey == snakeBody[i+1][1]){
            gameOver = true;
            playSound(gameoverSound);
            // alert("Game Over !!!");
            setPlayground();
            stopMove();
            clearInterval(1);
        }
    }
    
}

//setting playground function
function setPlayground(){

    //not game over
    gameOver = false;

    //drawing playgroung
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //drowing food
    context.fillStyle = "brown";
    context.fillRect(foodx, foody, blockSize, blockSize);

    //drowing snake head
    context.fillStyle = "darkgray";
    snakex += velocityx * blockSize;
    snakey += velocityy * blockSize;
    context.fillRect(snakex, snakey, blockSize, blockSize);
}

//placing food function
function placeFood() {
    foodx = Math.floor(Math.random() * cols) * blockSize;
    foody = Math.floor(Math.random() * rows) * blockSize;
}

//move direction function
function changeDirection(event) {
    if(event.code === 'ArrowUp' && velocityy != 1) {
        velocityx = 0;
        velocityy = -1;
    } else if(event.code === 'ArrowDown' && velocityy != -1) {
        velocityx = 0;
        velocityy = 1;
    } else if(event.code === 'ArrowLeft' && velocityx != 1) {
        velocityx = -1;
        velocityy = 0;
    } else if(event.code === 'ArrowRight' && velocityx != -1) {
        velocityx = 1;
        velocityy = 0;
    } else if(event.code === "Space"){
        stopMove();
    }
}

//stop moving function
function stopMove() {
    velocityx = 0;
    velocityy = 0;
}

//play sound function
function playSound(sPath) {
    let audio = new Audio(sPath);
    audio.play();
}

// //check if hitting food block
// function isEating() {
//     if(snakex >= foodx && snakex <= foodx + blockSize && snakey >= foody && snakey <= foody + blockSize){
//         return true;
//     }else return false;    
// }