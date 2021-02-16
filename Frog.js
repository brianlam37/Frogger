class Frog extends Rectangle {
    constructor(x, y, width, height, worldDimension){
        super(x, y, width, height);
        this.worldDimension = worldDimension;
        this.currentPoint = createVector(x, y);
        this.movePoint = this.currentPoint;
        this.isMoving = false;
        this.isFloating = false;
    }

    display() {
        noStroke();
        fill(0, 200, 0);
        text(`${this.currentPoint.x}, ${this.currentPoint.y}`, this.currentPoint.x, this.currentPoint.y);
        rect(this.currentPoint.x, this.currentPoint.y, this.width, this.height);
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
    }
    move(){
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
            if(this.currentPoint.y - this.worldDimension >= 0 && !this.isMoving){
                this.movePoint = createVector(this.trueX, this.currentPoint.y - this.worldDimension);
                this.routine = gridMove(this)
                this.routine.next()
            }
        }
        else if(keyIsDown(83) || keyIsDown(DOWN_ARROW)){
            if(this.currentPoint.y + this.worldDimension <= this.worldDimension * 13 && !this.isMoving){
                this.movePoint = createVector(this.trueX, this.currentPoint.y + this.worldDimension);
                this.routine = gridMove(this)
                this.routine.next()
            }
        }
        else if(keyIsDown(65) || keyIsDown(LEFT_ARROW)){
            if(this.currentPoint.x - this.worldDimension >= 0 && !this.isMoving){
                this.movePoint = createVector(this.trueX - this.worldDimension, this.currentPoint.y);
                this.routine = gridMove(this)
                this.routine.next()
            }
        }
        else if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
            if(this.currentPoint.x + this.worldDimension <= 9 * this.worldDimension && !this.isMoving){
                this.movePoint = createVector(this.trueX + this.worldDimension, this.currentPoint.y);
                this.routine = gridMove(this)
                this.routine.next()
            }
        }
    }

    onFloater(isFloating) {
        this.isFloating = isFloating;
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
    player.isMoving = false;
}
