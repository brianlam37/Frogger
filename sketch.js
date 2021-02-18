const tileDimension = 64;
const numRows = 13;
const numCols = 10;
let gameOver;
let gameMap;
let frog;
let cars;
let logs;
let turtles;
let score;
let frogStartX = (tileDimension * numCols/2) - 3/4 * tileDimension;
let frogStartY = tileDimension * (numRows) + 1/4 * tileDimension;
let lives = 3;
let lastDelta;
let pause = false;
let highScore = 0;
let frogStaticSprite;
let frogMovingSprite;
let context; 
function preload(){
    frogStaticSprite = new Image();
    frogStaticSprite.src = '/assets/frog_static.png';
    frogMovingSprite = new Image();
    frogMovingSprite.src = '/assets/frog_moving.png';
}
function setup() {
    turtles = new Turtles(numRows, tileDimension);
    cars = new Cars(numRows, tileDimension);
    logs = new Logs(numRows, tileDimension);
    gameMap = new GameMap(numCols, numRows, tileDimension, tileDimension);
    frog = new Frog(frogStartX, frogStartY, tileDimension/2, tileDimension/2, tileDimension);
    reset(frog, cars, logs, turtles, gameMap, 1);
    let canvasElement = createCanvas(tileDimension * numCols - 2/3 * tileDimension, tileDimension * (numRows + 2)).elt;
    context = canvasElement.getContext('2d');
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    frog = new Frog(frogStartX, frogStartY, tileDimension/2, tileDimension/2, tileDimension, context, frogStaticSprite, frogMovingSprite);
}
  
function draw() {
    background(220);
    gameMap.display();
    logs.display();
    logs.move();
    turtles.display();
    frog.display();
    cars.display();
    cars.move();
    turtles.move();
    fill(0);
    text(`Score: ${score}`, 0, tileDimension/2);
    text(`High Score: ${highScore}`, (tileDimension * numCols/2), tileDimension/2);
    text(`Lives: ${lives}`, 0,  (numRows + 2)* tileDimension - tileDimension/2);
    if(!pause){
        if(!gameOver){
            frog.move(0, (numCols - 1) * tileDimension, tileDimension, (numRows + 1) * tileDimension);
            let currentRow = gameMap.getCurrentRow(frog)
            if(currentRow !== 0 && currentRow !== numRows - 1){
                if(!gameMap.getRowEntered()){
                    gameMap.setRowEntered();
                    score+=10;
                }
            }

            if(logs.intersects(frog)){
                frog.onFloater(true);
                frog.floatMove(logs.getMomentum());
            }
            else if(turtles.intersects(frog)){
                frog.onFloater(true);
                frog.floatMove(turtles.getMomentum());
            }else if(gameMap.intersectsWater(frog) || cars.intersects(frog)){
                fill(200,200,200);
                rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
                reduceLives();
            }else if(gameMap.intersectsHome(frog)){
                if(!gameMap.getCurrentTile().getOpen()){
                    fill(200,200,200);
                    rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
                    reduceLives();
                }else if(gameMap.getCurrentTile().getOpen()){
                    frog.resetPos(frogStartX, frogStartY);
                    gameMap.getCurrentTile().fillHome(false);
                    gameMap.resetRowEntered()
                    score+=50;
                    if(gameMap.allFilled()){
                        score+=1000;
                    }
                }
            }else{
                frog.onFloater(false);
            }
        }else{

        }
    }
}

function reduceLives(){
    lives--;
    frog.resetPos(frogStartX, frogStartY);
    if(lives === 0){
        gameOver = true;
    }
}


function keyPressed() {
    if(keyCode === 32){
        reset(frog, cars, logs, turtles, gameMap, 1);
    }
}
function reset(frog, cars, logs, turtles, gameMap, level){
    lives = 3;
    frog.resetPos(frogStartX, frogStartY);
    cars.setup(level);
    logs.setup(level);
    turtles.setup(level);
    gameMap.setup();
    gameOver = false;
    if(highScore <= score){
        highScore = score;
    }
    score = 0;
}