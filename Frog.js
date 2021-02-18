class Frog extends Rectangle {
    constructor(x, y, width, height, worldDimension, context, staticSprite, movingSprite, pixelLength = 128){
        super(x, y, width, height);
        this.worldDimension = worldDimension;
        this.currentPoint = createVector(x, y);
        this.movePoint = this.currentPoint;
        this.isMoving = false;
        this.isFloating = false;
        this.context = context;
        this.staticSprite = staticSprite;
        this.movingSprite = movingSprite;
        this.direction = 'up'
        this.currentSprite = this.staticSprite;

    }

    display() {
        noStroke();
        fill(0, 200, 0);
        //rect(this.currentPoint.x, this.currentPoint.y, this.width, this.height);
        if(this.direction === 'up'){
            this.context.drawImage(this.currentSprite, 0, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension)
        }else if(this.direction === 'down'){
            this.context.drawImage(this.currentSprite, 32, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension)
        }else if(this.direction === 'left'){
            this.context.drawImage(this.currentSprite, 64, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension)
        }else if(this.direction === 'right'){
            this.context.drawImage(this.currentSprite, 96, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension)
        }

    }
    floatMove(momentum){
        if(this.isFloating && !this.isMoving){
            this.currentPoint.x += momentum;
        }
    }
    resetPos(x,y){
        this.routine = null;
        this.currentPoint.x = x;
        this.currentPoint.y = y;
        this.isMoving = false;
        this.currentSprite = this.staticSprite;
        this.direction = 'up'
    }
    move(leftBound, rightBound, upperBound, lowerBound){
        //if routine exists then execute the movement per frame per the draw function, returns undefined when frog has finished moving
        if(this.routine) { 
            this.routine.next()
        }
        let xRem = 0;
        if(this.isFloating){
            xRem = this.currentPoint.x % this.worldDimension;
            if(xRem + this.width/2 > this.worldDimension) {
                this.trueX = this.currentPoint.x - xRem + this.worldDimension;
            }else {
                this.trueX = this.currentPoint.x - xRem;
            }
            this.trueX+=1/4*this.worldDimension

        }else{
            this.trueX = this.currentPoint.x
        }
        //check if buttons are being pressed to decide movement
        //then only move if within bounds and not moving already to prevent free movement
        //then calculate the location to move to and move there
        //using a generator to run on each frame update,
        //start by setting up the routine and executing it once
        if(keyIsDown(87) || keyIsDown(UP_ARROW)){
            if(this.currentPoint.y - this.worldDimension >= upperBound && !this.isMoving){
                this.movePoint = createVector(this.trueX, this.currentPoint.y - this.worldDimension);
                this.onMove('up')
            }
        }
        else if(keyIsDown(83) || keyIsDown(DOWN_ARROW)){
            if(this.currentPoint.y + this.worldDimension <= lowerBound && !this.isMoving){
                this.movePoint = createVector(this.trueX, this.currentPoint.y + this.worldDimension);
                this.onMove('down')
            }
        }
        else if(keyIsDown(65) || keyIsDown(LEFT_ARROW)){
            if(this.currentPoint.x - this.worldDimension >= leftBound && !this.isMoving){
                this.movePoint = createVector(this.trueX - this.worldDimension, this.currentPoint.y);
                this.onMove('left')
            }
        }
        else if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
            if(this.currentPoint.x + this.worldDimension <= rightBound && !this.isMoving){
                this.movePoint = createVector(this.trueX + this.worldDimension, this.currentPoint.y);
                this.onMove('right')
            }
        }
    }
    onFloater(isFloating) {
        this.isFloating = isFloating;
    }
    onMove(direction){
        this.direction = direction
        this.routine = gridMove(this)
        this.routine.next()
    }
}
//To move smoothly and perfectly within a grid
//the purpose of the generator is to stop the movement and continue per frame
//this ensures the smooth movement of the player
function* gridMove(player){
    //time it takes for the whole movement
    const timeToMove = 200;
    //used to prevent any more calls to player ie stopping the user from moving it off a grid square
    player.isMoving = true;
    player.currentSprite = player.movingSprite;
    //time that has happened in total between frames
    let elapsedTime = 0.0;
    //original position the player was in
    let origPos = player.currentPoint;
    //the position the player will move to
    let targetPos = player.movePoint;
    //basically during the time frame we have established
    //update the player's current position using lerp to move closer as time increases
    //the higher value in the third parameter of lerp, the closer the player is to targetPos
    //yield null since we don't care about the return of the generator

    while(elapsedTime < timeToMove){
        player.currentPoint = p5.Vector.lerp(origPos, targetPos, elapsedTime/timeToMove)
        elapsedTime += deltaTime
        yield null;
    }
    //in case the player doesnt end up at the movePoint we force them, ensuring perfection
    player.currentPoint = player.movePoint;
    //allow player to use controls again
    //player.isMoving = false;
    player.routine = moveAni(player);
    player.routine.next();
}
function* moveAni(player){
        //time it takes for the whole movement
        const timeToMove = 50;
        //used to prevent any more calls to player ie stopping the user from moving it off a grid squar
    
        //time that has happened in total between frames
        let elapsedTime = 0.0;
        player.currentSprite = player.staticSprite
        while(elapsedTime < timeToMove){
            
            elapsedTime += deltaTime
            yield null;
        }
        player.isMoving = false;
}