class Log extends MovingObject {
    constructor(x, y, width, height, direction, speed, worldDimension, context, spriteSheet){
        super(x, y, width, height, direction, speed, worldDimension, context, spriteSheet);
    } 
    display(){
        this.context.drawImage(this.spriteSheet, 0, 0 , 32, 32, this.currentPoint.x, this.currentPoint.y - this.height/4, this.worldDimension, this.worldDimension);
        for(let i = 1; i < this.width/this.worldDimension - 1; i++){
            this.context.drawImage(this.spriteSheet, 32, 0 , 32, 32, this.currentPoint.x + this.worldDimension * i, this.currentPoint.y - this.height/4, this.worldDimension, this.worldDimension);
        }
        this.context.drawImage(this.spriteSheet, 64, 0 , 32, 32, this.currentPoint.x + this.width - this.worldDimension, this.currentPoint.y - this.height/4, this.worldDimension, this.worldDimension);
    }
}