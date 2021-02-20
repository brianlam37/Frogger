class Turtle extends Log {
    constructor(x, y, width, height, direction, speed, worldDimension, context, movingSprite){
        super(x, y, width, height, direction, speed, worldDimension);
        this.currentSprite = movingSprite;
        this.context = context;
        this.aniIndex = 0;
        this.routine = this.moveAni(this);
        // this.movingSprite = movingSprite;
    } 

    display(){
        if(this.routine){
            this.routine.next()
        }
        switch(this.aniIndex){
            case 0: 
                this.context.drawImage(this.currentSprite, 0, 0, 32, 32, this.currentPoint.x, this.currentPoint.y, this.worldDimension, this.worldDimension)
                break;
            case 1:
                this.context.drawImage(this.currentSprite, 32, 0, 32, 32, this.currentPoint.x, this.currentPoint.y, this.worldDimension, this.worldDimension)
                break;
            case 2:
                this.context.drawImage(this.currentSprite, 64, 0, 32, 32, this.currentPoint.x, this.currentPoint.y, this.worldDimension, this.worldDimension)
                break;
        }
    
            
        
    }
    * moveAni(turtle){
        //time it takes for the whole movement
        const timeToMove = 600;
        //used to prevent any more calls to player ie stopping the user from moving it off a grid squar
    
        //time that has happened in total between frames
        let elapsedTime = 0.0;
        while(elapsedTime < timeToMove){
            if(elapsedTime < timeToMove/3){
                turtle.aniIndex = 0;
            }else if(elapsedTime < timeToMove * 2/3){
                turtle.aniIndex = 1;
            }else{
                turtle.aniIndex = 2;
            }
            elapsedTime += deltaTime
            yield null;
        }
        turtle.routine = turtle.moveAni(turtle);
    }
}
