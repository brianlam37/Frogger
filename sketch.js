const tileDimension = 60;
const numRows = 13;
const numCols = 10;
let gameOver;
let gameMap;
let frog;
let car;
let cars1 = [];
function setup() {
    for(let i = 0; i < 3; i++){
        cars1.push(new MovingObject(1/6 * tileDimension + i * 4 * tileDimension, tileDimension* (numRows - 2) + 1/6 * (tileDimension), tileDimension * 2/3, 1, 50, tileDimension));
    }
    gameOver = false;
    gameMap = new GameMap(numCols, numRows, tileDimension);
    gameMap.setup();
    car = new MovingObject(1/6 * tileDimension, tileDimension* (numRows - 2) + 1/6 * (tileDimension), tileDimension * 2/3, 1, 50, tileDimension);
    frog = new Frog((tileDimension * numCols/2) - 3/4 * tileDimension, tileDimension * (numRows - 1) + 1/4 * tileDimension, tileDimension/2, tileDimension);
    createCanvas(tileDimension * numCols - 2/3 * tileDimension, tileDimension * numRows);
}
  
function draw() {
    background(220);
    gameMap.display();
    frog.display();
    car.display();
    for(let i = 0; i < 3; i++){
        cars1[i].display()
    }
    if(!gameOver){
        frog.move();

        if(car.intersects(frog)){
            rect(frog.getX(), frog.getY(), tileDimension, tileDimension);
            gameOver = true;
        }
    }
    for(let i = 0; i < 3; i++){
        cars1[i].move()
    }
    car.move();

}
