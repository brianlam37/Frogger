class Log extends MovingObject {
    constructor(x, y, width, height, direction, speed, worldDimension, context){
        super(x, y, width, height, direction, speed, worldDimension, context);
    } 
    display(){
        noStroke();
        fill(255, 200 , 75);
        rect(this.currentPoint.x, this.currentPoint.y + 1/4* (this.worldDimension), this.width, this.height/2, 20);
    }
}