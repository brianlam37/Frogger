class Frog extends Rectangle {
    constructor(x, y, width, height, worldDimension, staticSprite, movingSprite, deathSprite, lives){
        super(x, y, width, height);
        this.worldDimension = worldDimension;
        this.currentPoint = createVector(x, y);
        this.movePoint = this.currentPoint;
        this.isMoving = false;
        this.isFloating = false;
        this.staticSprite = staticSprite;
        this.movingSprite = movingSprite;
        this.direction = 'up'
        this.currentSprite = this.staticSprite;
        this.inAnimation = false;
        this.isDead = false;
        this.aniIndex;
        this.deathSprite = deathSprite;
        this.start = this.currentPoint;
        this.lives = lives;
    }

    display() {
        if(!this.isDead){
            if(this.direction === 'up'){
                drawingContext.drawImage(this.currentSprite, 0, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension)
            }else if(this.direction === 'down'){
                drawingContext.drawImage(this.currentSprite, 32, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension)
            }else if(this.direction === 'left'){
                drawingContext.drawImage(this.currentSprite, 64, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension)
            }else if(this.direction === 'right'){
                drawingContext.drawImage(this.currentSprite, 96, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension)
            }
        }else{
            if(this.deathType === 'water'){
                switch(this.aniIndex){
                    case 0:
                        drawingContext.drawImage(this.currentSprite, 96, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                        break;
                    case 1:
                        drawingContext.drawImage(this.currentSprite, 128, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                        break;
                    case 2:
                        drawingContext.drawImage(this.currentSprite, 160, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                        break;
                    case 3:
                        break;
                }
            }else{
                switch(this.aniIndex){
                    case 0:
                        drawingContext.drawImage(this.currentSprite, 0, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                        break;
                    case 1:
                        drawingContext.drawImage(this.currentSprite, 32, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                        break;
                    case 2:
                        drawingContext.drawImage(this.currentSprite, 64, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                        break;
                    case 3:
                        drawingContext.drawImage(this.currentSprite, 192, 0, 32, 32, this.currentPoint.x - this.width/2, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                        break;
                }
            }
        }

    }
    floatMove(momentum){
        if(this.isFloating && !this.inAnimation){
            this.currentPoint.x += momentum;
        }
    }
    resetPos(lives){
        this.routine = null;
        this.currentPoint = this.start;
        this.isMoving = false;
        this.currentSprite = this.staticSprite;
        this.direction = 'up'
        this.inAnimation = false;
        this.isFloating = false;
        this.isDead = false;
        this.lives = lives;
    }
    move(leftBound, rightBound, upperBound, lowerBound){
        if(this.currentPoint.x > rightBound || this.currentPoint.x + this.width < leftBound){
            this.setDead('water');
        }
        //if routine exists then execute the movement per frame per the draw function, returns undefined when frog has finished moving
        if(this.routine) { 
            this.routine.next()
        }
        let xRem = 0;
        if(this.isFloating){
            this.trueX = this.currentPoint.x

        }else{
            xRem = this.currentPoint.x % this.worldDimension;
            if(xRem + this.width/2 > this.worldDimension) {
                this.trueX = this.currentPoint.x - xRem + this.worldDimension;
            }else {
                this.trueX = this.currentPoint.x - xRem;
            }
            this.trueX += 1/4 * this.worldDimension
        }
        //check if buttons are being pressed to decide movement
        //then only move if within bounds and not moving already to prevent free movement
        //then calculate the location to move to and move there
        //using a generator to run on each frame update,
        //start by setting up the routine and executing it once
        if(keyIsDown(87) || keyIsDown(UP_ARROW)){
            if(this.currentPoint.y - this.worldDimension >= upperBound && !this.isMoving && !this.inAnimation){
                this.movePoint = createVector(this.trueX, this.currentPoint.y - this.worldDimension);
                this.onMove('up')
            }
        }
        else if(keyIsDown(83) || keyIsDown(DOWN_ARROW)){
            if(this.currentPoint.y + this.worldDimension <= lowerBound && !this.isMoving && !this.inAnimation){
                this.movePoint = createVector(this.trueX, this.currentPoint.y + this.worldDimension);
                this.onMove('down')
            }
        }
        else if(keyIsDown(65) || keyIsDown(LEFT_ARROW)){
            if(this.currentPoint.x - this.worldDimension >= leftBound && !this.isMoving && !this.inAnimation){
                this.movePoint = createVector(this.trueX - this.worldDimension, this.currentPoint.y);
                this.onMove('left')
            }
        }
        else if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
            if(this.currentPoint.x + this.worldDimension <= rightBound && !this.isMoving && !this.inAnimation){
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
        this.routine = this.gridMove(this)
        this.routine.next()
    }
    //To move smoothly and perfectly within a grid
    //the purpose of the generator is to stop the movement and continue per frame
    //this ensures the smooth movement of the player
    *gridMove(player){
        //time it takes for the whole movement
        const timeToMove = 200;
        //used to prevent any more calls to player ie stopping the user from moving it off a grid square
        player.isMoving = true;
        player.inAnimation = true;
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
        player.isMoving = false;
        player.routine = player.moveAni(player);
    }
    *moveAni(player){
        //time it takes for the whole movement
        const timeToMove = 50;

        //time that has happened in total between frames
        let elapsedTime = 0.0;
        player.currentSprite = player.staticSprite
        while(elapsedTime < timeToMove){
            elapsedTime += deltaTime
            yield null;
        }
        player.inAnimation = false;
    }
    *deathAni(player){
        const numOfFrames = 4;
        const timePerFrame = 200
        const timeToMove = timePerFrame * numOfFrames;
        const frequency = timeToMove/timePerFrame
        //used to prevent any more calls to player ie stopping the user from moving it off a grid square
        player.isDead = true;
        player.inAnimation = true;
        player.currentSprite = player.deathSprite;

        //time that has happened in total between frames
        let elapsedTime = 0.0;
        while(elapsedTime < timeToMove){
            if(elapsedTime < timeToMove/frequency){
                player.aniIndex = 0;
            }else if(elapsedTime < 2 * timeToMove/frequency){
                player.aniIndex = 1;
            }else if(elapsedTime < 3 * timeToMove/frequency){
                player.aniIndex = 2;
            }else{
                player.aniIndex = 3;
            }
            elapsedTime += deltaTime
            yield null;
        }
        this.routine = null;
        this.resetPos(this.lives);
    }
    getDead(){
        return this.isDead;
    }
    setDead(type){
        this.deathType = type;
        this.routine = this.deathAni(this);
        this.routine.next()
        this.lives--;
    }
    dying(){
        if(this.routine){
            this.routine.next();
        }
    }
    getLives(){
        return this.lives;
    }
}

