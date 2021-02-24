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
const lives = 3; 
let score = 0;
let highScore = localStorage.getItem('p5froggerscore') || 0
let pause = false;
let start = true;
let interval;
let gameOverInterval;
let gameOverIntervalActive = false;
let timeOut;
let opacity = 255;
let goingDown = true;

//Objects
let gameMap;
let frog;
let cars;
let logs;
let turtles;
let timer;
let gameOverScreen;

//Sprites
let frogStaticSprite;
let frogMovingSprite;
let frogDeathSprite;
let turtleMovingSprite;
let vehicleSprite;
let logSprite;
let bg;
let homeFrog;

//Font
let gameFont;

function preload(){
    //Load images and fonts

    frogStaticSprite = new Image();
    frogStaticSprite.src = './assets/frog_static.png';
    frogMovingSprite = new Image();
    frogMovingSprite.src = './assets/frog_moving.png';
    frogDeathSprite = new Image();
    frogDeathSprite.src = './assets/frog_death.png';

    turtleMovingSprite = new Image();
    turtleMovingSprite.src = './assets/turtle.png'

    bg = new Image();
    bg.src = './assets/frogger_background.png'
    homeFrog = new Image();
    homeFrog.src = './assets/home_frog.png'

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
    gameMap = new GameMap(numCols, numRows, tileDimension, tileDimension, heightOffset, bg, homeFrog);
    frog = new Frog(frogStartX, frogStartY, tileDimension/2, tileDimension/2, tileDimension,  frogStaticSprite, frogMovingSprite, frogDeathSprite, lives);
    timer = new Timer(timerX, timerY, timerLength, tileDimension/4, tileDimension, time, gameFont)
    gameOverScreen = new GameOver(width/4, height/4, width/2, height/2, tileDimension, 10, gameFont);
    //Set everything up
    reset(frog, cars, logs, turtles, gameMap, 1, timer, lives);
}
  
function draw() {
    background(0);

    //Display the objects
    gameMap.display();
    if(!start){
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
        textAlign(LEFT);
        text(`Lives: ${frog.getLives()}`, tileDimension/4, tileDimension * 3/8);
        text(`Score: ${score}`, (tileDimension * numCols * 3/8), tileDimension * 3/8);
        text(`High Score: ${highScore}`, (tileDimension * numCols * 5/8),  tileDimension * 3/8);
        //Change highscore
        if(highScore < score){
            highScore = score;
            localStorage.setItem('p5froggerscore', highScore);
        }

        //if game isn't paused - NOT IMPLEMENTED YET
        //or over then allow control over the frog
        if(!pause){
            if(!gameOver){
                if(frog.getLives() === 0){
                    gameOver = true;
                }
                if(!frog.getDead()){
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
                            frog.setDead('water');
                        }else if(gameMap.getCurrentTile().getOpen()){
                            frog.resetPos(frog.getLives());
                            gameMap.getCurrentTile().setOpen(false);
                            gameMap.resetRowEntered()
                            score += 50 + timer.getTime() * 20;
                            resetTimer(timer, 'timer');
                            if(gameMap.allFilled()){
                                score += 1000;
                                gameMap.clearFilled();
                            }
                        }
                    }else if(gameMap.intersectsBad(frog)){
                        frog.setDead('water');
                    }else if(cars.intersects(frog)){
                        frog.setDead('car');
                    }else{
                        frog.onFloater(false);
                    }
                }else{
                    frog.dying();
                }
                if(timer.getTime() <= 0){
                    
                    frog.setDead('car');
                    resetTimer(timer, 'timer');
                }

            }else{
                frog.dying();
                clearInterval(interval);
                if(!gameOverIntervalActive){
                    resetTimer(gameOverScreen, 'gameover');
                    gameOverIntervalActive = true;
                    timeOut = setTimeout(() => {
                        start = true
                    }, 10000);
                }
                gameOverScreen.display();
            }
        }
    }else{


        textAlign(CENTER);
        textSize(tileDimension)
        fill(255, 255, 0);
        text(`FROGGER`, width/2, height * 3/8);
        fill(0, 255, 0);
        text(`FROGGER`, width/2 - 1/tileDimension * width, height * 3/8);
        if(opacity > 0 && goingDown){
            opacity-=5;
            if(opacity === 0){
                goingDown = false;
            }
        }else if(opacity < 255 && !goingDown){
            opacity+=5;
            if(opacity === 255){
                goingDown = true;
            }
        }
        fill(255, opacity);
        textAlign(CENTER);
        textSize(tileDimension/4)
        text(`Press space to start`, this.width/2, this.height * 6/8);
    }
}

function keyPressed() {
    if(keyCode === 32 && (gameOver || start)){
        start = false;
        reset(frog, cars, logs, turtles, gameMap, 1, timer, lives);
    }
}
const reset = (frog, cars, logs, turtles, gameMap, level, timer, lives) => {
    clearInterval(interval);
    clearInterval(gameOverInterval);
    clearTimeout(timeOut);
    frog.resetPos(lives);
    cars.setup(level);
    logs.setup(level);
    turtles.setup(level);
    gameMap.setup();
    gameOver = false;
    if(highScore <= score){
        highScore = score;
    }
    score = 0;
    resetTimer(timer, 'timer')
    gameOverIntervalActive = false
}

const resetTimer = (timer, intervalType) => {
    switch(intervalType){
        case 'timer':
            clearInterval(interval);
            break;
        case 'gameover':
            clearInterval(gameOverInterval);
            break;
    }
    timer.setTimer()
    switch(intervalType){
        case 'timer':
            interval = setInterval(() =>{timer.updateTimer()}, 1000)
            break;
        case 'gameover':
            gameOverInterval = setInterval(() =>{timer.updateTimer()}, 1000)
            break;
    }
}

