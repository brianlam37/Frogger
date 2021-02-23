// Map/Canvas info
const tileDimension = 60;
const numRows = 13;
const numCols = 14;
const heightOffset = tileDimension/2;

// Starting positions / locations
const frogStartX = (tileDimension * numCols/2) - 3/4 * tileDimension;
const frogStartY = tileDimension * (numRows - 1) + tileDimension/4 + heightOffset;

// Timer stuff
const timerLength = tileDimension * 5 
const time = 60;
const timerX = (numCols - 1) * tileDimension;
const timerY = tileDimension * (numRows) + heightOffset;

//Game info
let gameOver;
let lives = 3;
let score = 0;
let highScore = 0;
let pause = false;
let interval;

//Objects
let gameMap;
let frog;
let cars;
let logs;
let turtles;
let timer;

//Sprites
let frogStaticSprite;
let frogMovingSprite;
let turtleMovingSprite;
let vehicleSprite;
let logSprite;
let bg;

//Font
let gameFont;

function preload(){
    //Load images and fonts
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
    gameFont = loadFont('./assets/PressStart2P-Regular.ttf')
}
function setup() {
    //set the font
    textFont(gameFont)
    //Create the canvas
    createCanvas(tileDimension * numCols, tileDimension * (numRows + 1));
    //To ensure 'pixels' after resizing
    drawingContext.mozImageSmoothingEnabled = false;
    drawingContext.webkitImageSmoothingEnabled = false;
    drawingContext.msImageSmoothingEnabled = false;
    drawingContext.imageSmoothingEnabled = false;
    //Class initializations
    turtles = new Turtles(numRows, tileDimension,  turtleMovingSprite, heightOffset);
    cars = new Cars(numRows, tileDimension,  vehicleSprite, heightOffset);
    logs = new Logs(numRows, tileDimension,  logSprite, heightOffset);
    gameMap = new GameMap(numCols, numRows, tileDimension, tileDimension, heightOffset, bg);
    frog = new Frog(frogStartX, frogStartY, tileDimension/2, tileDimension/2, tileDimension,  frogStaticSprite, frogMovingSprite);
    timer = new Timer(timerX, timerY, timerLength, tileDimension/4, tileDimension, time, gameFont)
    //Set everything up
    reset(frog, cars, logs, turtles, gameMap, 1, timer);
}
  
function draw() {
    background(0);

    //Display the objects
    gameMap.display();
    logs.display();
    turtles.display();
    frog.display();
    cars.display();
    timer.display();

    //Get the objects to move
    logs.move(tileDimension * (numCols));
    cars.move(tileDimension * (numCols));
    turtles.move(tileDimension * (numCols));

    //Game info
    fill(255);
    text(`Lives: ${lives}`, tileDimension/4, tileDimension * 3/8);
    text(`Score: ${score}`, (tileDimension * numCols * 3/8), tileDimension * 3/8);
    text(`High Score: ${highScore}`, (tileDimension * numCols * 5/8),  tileDimension * 3/8);

    //Change highscore
    if(highScore < score){
        highScore = score;
    }

    //if game isn't paused - NOT IMPLEMENTED YET
    //or over then allow control over the frog
    if(!pause){
        if(!gameOver){
            frog.move(0, numCols * tileDimension, heightOffset, (numRows) * tileDimension);
            //Check the current row the frog is in and add to the score if it hasn't been in this row before
            let currentRow = gameMap.getCurrentRow(frog)
            if(currentRow !== 0 && currentRow !== numRows - 1){
                if(!gameMap.getRowEntered()){
                    gameMap.setRowEntered();
                    score+=10;
                }
            }
            //Check if the frog is intersecting with either dangerous objects and locations or safe objects and locations
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
                    score += 50 + timer.getTime() * 20;
                    resetTimer(timer);
                    if(gameMap.allFilled()){
                        score += 1000;
                    }
                }
            }else if(gameMap.intersectsBad(frog) || cars.intersects(frog)){
                fill(200,200,200);
                rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
                reduceLives();
            }else{
                frog.onFloater(false);
            }
            if(timer.getTime() <= 0){
                fill(200,200,200);
                rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
                reduceLives();
                resetTimer(timer);
            }
        }else{
            clearInterval(interval);
        }
    }
}

const reduceLives = () => {
    lives--;
    frog.resetPos(frogStartX, frogStartY);
    if(lives === 0){
        gameOver = true;
    }
}


function keyPressed() {
    if(keyCode === 32){
        reset(frog, cars, logs, turtles, gameMap, 1, timer);
    }
}
const reset = (frog, cars, logs, turtles, gameMap, level, timer) => {

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
    resetTimer(timer)
}

const resetTimer = (timer) => {
    clearInterval(interval);
    timer.setTimer(time, timerLength)
    interval = setInterval(() =>{timer.updateTimer()}, 1000)
}