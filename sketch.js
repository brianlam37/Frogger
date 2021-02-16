const tileDimension = 60;
const numRows = 13;
const numCols = 10;
let gameOver;
let gameMap;
let frog;
let cars;
let logs;
let turtles;
function setup() {
    turtles = new Turtles(numRows, tileDimension);
    cars = new Cars(numRows, tileDimension);
    cars.setup(1);
    logs = new Logs(numRows, tileDimension);
    logs.setup(1);
    turtles.setup(1);
    gameOver = false;
    gameMap = new GameMap(numCols, numRows, tileDimension, tileDimension);
    gameMap.setup();
    frog = new Frog((tileDimension * numCols/2) - 3/4 * tileDimension, tileDimension * (numRows - 1) + 1/4 * tileDimension, tileDimension/2, tileDimension/2, tileDimension);
    createCanvas(tileDimension * numCols - 2/3 * tileDimension, tileDimension * numRows);
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
    if(!gameOver){
        frog.move();
        if(cars.intersects(frog)){
            fill(200,200,200);
            rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
            gameOver = true;
        }
        if(logs.intersects(frog)){
            console.log('safe')
            frog.onFloater(true);
            frog.floatMove(logs.getMomentum());
        }
        else if(turtles.intersects(frog)){
            frog.onFloater(true);
            frog.floatMove(turtles.getMomentum());
            console.log('safe')
        }else if(gameMap.intersectsWater(frog)){
            fill(200,200,200);
            rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
            gameOver = true;
        }else if(gameMap.intersectsHome(frog)){
            if(!gameMap.getCurrentTile().getOpen()){
                fill(200,200,200);
                rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
                gameOver = true;
            }else if(gameMap.getCurrentTile().getOpen()){
                frog.resetPos((tileDimension * numCols/2) - 3/4 * tileDimension, tileDimension * (numRows - 1) + 1/4 * tileDimension)
                gameMap.getCurrentTile().fillHome();
            }

        }else{
            frog.onFloater(false);
        }

    }else{
        console.log('over')
    }
}
