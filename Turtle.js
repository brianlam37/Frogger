class Turtle extends Log {
    constructor(x, y, width, height, direction, speed, worldDimension, context, spriteSheet, sinker){
        super(x, y, width, height, direction, speed, worldDimension, context, spriteSheet);
        this.aniIndex = 0;
        this.routine = this.moveAni(this);
        this.sinker = sinker
        // this.movingSprite = movingSprite;
    } 

    display(){
        if(this.routine){
            this.routine.next()
        }
        switch(this.aniIndex){
            case 0: 
                this.context.drawImage(this.spriteSheet, 0, 0, 32, 32, this.currentPoint.x, this.currentPoint.y, this.worldDimension, this.worldDimension)
                break;
            case 1:
                this.context.drawImage(this.spriteSheet, 32, 0, 32, 32, this.currentPoint.x, this.currentPoint.y, this.worldDimension, this.worldDimension)
                break;
            case 2:
                this.context.drawImage(this.spriteSheet, 64, 0, 32, 32, this.currentPoint.x, this.currentPoint.y, this.worldDimension, this.worldDimension)
                break;
            case 3:
                this.context.drawImage(this.spriteSheet, 96, 0, 32, 32, this.currentPoint.x, this.currentPoint.y, this.worldDimension, this.worldDimension)
                break;
            case 4:
                this.context.drawImage(this.spriteSheet, 128, 0, 32, 32, this.currentPoint.x, this.currentPoint.y, this.worldDimension, this.worldDimension)
                break;
            case 5:
                break;
        }
         
        
    }
    * moveAni(turtle){
        //time it takes for the whole movement
        const numOfFrames = 9;
        const timePerFrame = 300
        const timeToMove = timePerFrame * numOfFrames;

        const frequency = timeToMove/timePerFrame
        //used to prevent any more calls to player ie stopping the user from moving it off a grid squar
    
        //time that has happened in total between frames
        let elapsedTime = 0.0;
        while(elapsedTime < timeToMove){
            if(elapsedTime < timeToMove/frequency){
                turtle.aniIndex = 0;
            }else if(elapsedTime < timeToMove * 2/frequency){
                turtle.aniIndex = 1;
            }else if(elapsedTime < timeToMove * 3/frequency){
                turtle.aniIndex = 2;
            }else if(elapsedTime < timeToMove * 4/frequency){
                if(turtle.sinker){
                    turtle.aniIndex = 3;
                }else{
                    turtle.aniIndex = 0;
                }
            }else if(elapsedTime < timeToMove * 5/frequency){
                if(turtle.sinker){
                    turtle.aniIndex = 4;
                }else{
                    turtle.aniIndex = 1;
                }
            }else if(elapsedTime < timeToMove * 6/frequency){
                if(turtle.sinker){
                    turtle.aniIndex = 5;
                }else{
                    turtle.aniIndex = 2;
                }
            }else if(elapsedTime < timeToMove * 7/frequency){
                if(turtle.sinker){
                    turtle.aniIndex = 5;
                }else{
                    turtle.aniIndex = 0;
                }
            }else if(elapsedTime < timeToMove * 8/frequency){
                if(turtle.sinker){
                    turtle.aniIndex = 4;
                }else{
                    turtle.aniIndex = 1;
                }
            }else{
                if(turtle.sinker){
                    turtle.aniIndex = 3;
                }else{
                    turtle.aniIndex = 2;
                }
            }
            elapsedTime += deltaTime
            yield null;
        }
        turtle.routine = turtle.moveAni(turtle);
    }
    intersects(other){
        let under = false;
        if(this.aniIndex > 4){
            under = true
        }
        let top = this.currentPoint.y;
        let bot = this.currentPoint.y + this.height;
        let left = this.currentPoint.x;
        let right = this.currentPoint.x + this.width;
        let oTop = other.getY();
        let oBot = other.getY() + other.getHeight();
        let oRight = other.getX() + other.getWidth();
        let oLeft = other.getX();
        //if not outside of other objects's borders
        return !(
            left >= oRight ||
            right <= oLeft ||
            top >= oBot ||
            bot <= oTop
          ) && !under;
    }
}
