const tileDimension = 64;
const numRows = 13;
const numCols = 14;
const heightOffset = tileDimension/2;
const frogStartX = (tileDimension * numCols/2) - 3/4 * tileDimension;
const frogStartY = tileDimension * (numRows - 1) + tileDimension/4 + heightOffset;

let gameOver;
let gameMap;
let frog;
let cars;
let logs;
let turtles;
let score;
let lives = 3;
let lastDelta;
let pause = false;
let highScore = 0;
let frogStaticSprite;
let frogMovingSprite;
let turtleMovingSprite;
let vehicleSprite;
let logSprite;
let context; 
let bg;
function preload(){
    frogStaticSprite = new Image();
    frogStaticSprite.src = './assets/frog_static.png';
    frogMovingSprite = new Image();
    frogMovingSprite.src = './assets/frog_moving.png';
    turtleMovingSprite = new Image();
    turtleMovingSprite.src = './assets/turtle.png'
    bg = new Image();
    bg.src = './assets/frogger_background.png'
    vehicleSprite = new Image();
    vehicleSprite.src = './assets/vehicles.png'
    logSprite = new Image();
    logSprite.src = './assets/log.png'
}
function setup() {
    let canvasElement = createCanvas(tileDimension * numCols, tileDimension * (numRows + 1)).elt;
    context = canvasElement.getContext('2d');
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    turtles = new Turtles(numRows, tileDimension, context, turtleMovingSprite, heightOffset);
    cars = new Cars(numRows, tileDimension, context, vehicleSprite, heightOffset);
    logs = new Logs(numRows, tileDimension, context, logSprite, heightOffset);
    gameMap = new GameMap(numCols, numRows, tileDimension, tileDimension, heightOffset, bg, context);
    frog = new Frog(frogStartX, frogStartY, tileDimension/2, tileDimension/2, tileDimension, context, frogStaticSprite, frogMovingSprite);
    reset(frog, cars, logs, turtles, gameMap, 1);
}
  
function draw() {
    background(220);
    gameMap.display();
    logs.display();
    logs.move(tileDimension * (numCols));
    turtles.display();
    frog.display();
    cars.display();
    cars.move(tileDimension * (numCols));
    turtles.move(tileDimension * (numCols));
    fill(0);
    text(`Score: ${score}`, 0, tileDimension/4);
    text(`High Score: ${highScore}`, (tileDimension * numCols/2), tileDimension/4);
    text(`Lives: ${lives}`, (tileDimension * numCols * 0.75),  tileDimension/4);
    if(highScore < score){
        highScore = score;
    }
    if(!pause){
        if(!gameOver){
            frog.move(0, numCols * tileDimension, heightOffset, (numRows) * tileDimension);
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
            }else if(gameMap.intersectsBad(frog) || cars.intersects(frog)){
                fill(200,200,200);
                rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
                reduceLives();
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