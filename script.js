let direction = {x:0,y:0};
const eatFoodSound = new Audio("eatFood.wav");
const changeDirectionSound = new Audio("changeDirection.mp3");
const gameOverSound = new Audio("gameOver.wav");
const backgroundSound = new Audio("bgGame.mp3");
let gameBoard = document.getElementById('gameBoard')
let lastpaintTime = 0;
let speed = 2;
let snakeArr = [
    {x:13,y:15}
]
let food = {x:6,y:5};


// -------------------------- game Functions ---------------------------

function main(cTime){
    window.requestAnimationFrame(main);
    // console.log(cTime)
    if((cTime-lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime = cTime;
    // gameEngine();
}

function gameEngine() {
    // 1. Update the snake array and food

    // 2. Display the snake and food

    // displaying the snake
    gameBoard.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake')
        if(index === 0){
            snakeElement.classList.add('head')
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