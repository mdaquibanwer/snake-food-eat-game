let inputDirection = {x:0,y:0};
const eatFoodSound = new Audio("eatFood.wav");
const changeDirectionSound = new Audio("changeDirection.mp3");
const gameOverSound = new Audio("gameOver.wav");
const backgroundSound = new Audio("bgGame.mp3");
let gameBoard = document.getElementById('gameBoard')
let scoreBox = document.getElementById('score')
let score = 0;
let lastpaintTime = 0;
let speed = 4;
let snakeArr = [
    {x:13,y:15}
]
let a = 2;
let b = 16;
let food = {x : Math.round(a+ (b-a)*Math.random()), y : Math.round(a+ (b-a)*Math.random())};


// -------------------------- game Functions ---------------------------

function main(cTime){
    window.requestAnimationFrame(main);
    // console.log(cTime)
    if((cTime-lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime = cTime;
    gameEngine();
}

function gameEngine() {
    // 1. Update the snake array and food

    function isCollide(snake) {
        // if you collide with yourself
        for (let i = 1; i < snakeArr.length; i++) {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        }
        // if you collide with boundry
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true
        }
    }

    if(isCollide(snakeArr)){
        gameOverSound.play();
        backgroundSound.pause();
        inputDirection = {x:0,y:0}
        alert("GameOver Press Any key to Start Again")
        score = 0;
        snakeArr = [{x:13,y:15}];
        backgroundSound.play();
        
    }

    // if food is eaten , then increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        eatFoodSound.play();
        score+=1;
        if (score>=5 && score <=10) {
            speed = 8
        } else if (score>10 && score <=15){
            speed = 12
        } else if (score>15 && score <=20){
            speed = 16
        } else if (score>20){
            speed = 20
        }
        if(score>highestScore){
            highestScore = score;
            localStorage.setItem(highScore,JSON.stringify(highestScore));
            highScores.innerHTML = "Highest Score : " + highestScore;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y})
        food = {x : Math.round(a+ (b-a)*Math.random()), y : Math.round(a+ (b-a)*Math.random())}
    }

    // Moving the Snake 
    for (let i = snakeArr.length-2 ; i >=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // 2. Display the snake and food

    // displaying the snake
    gameBoard.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
           snakeElement.classList.add('snake')
        }
        gameBoard.appendChild(snakeElement);
    })

    // displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement);
}


// ----------------------------- game Logic ------------------------------

window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    backgroundSound.play();
    inputDirection = {x:0,y:1}   // start the game
    changeDirectionSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("Arrow Up")  
            inputDirection.x = 0;  
            inputDirection.y = -1;  
            break;

        case "ArrowDown":
            // console.log("Arrow Down")
            inputDirection.x = 0;  
            inputDirection.y = 1;    
            break;

        case "ArrowLeft":
            // console.log("Arrow Left")    
            inputDirection.x = -1;  
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            // console.log("Arrow Right")  
            inputDirection.x = 1;  
            inputDirection.y = 0;  
            break;

        default:
            break;
    }
})

// ------------------------- Store High Score In Local Storage ----------------------

let highScore = localStorage.getItem("highScore");
if(highScore === null){
    let highestScore = 0
    localStorage.setItem("highScore",JSON.stringify(highestScore))
}
else{
    highestScore = JSON.parse(highScore)
    highScores.innerHTML = "Highest Score : " + highScore;
}