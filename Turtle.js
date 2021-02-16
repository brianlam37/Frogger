class Turtle extends Log {
    constructor(x, y, width, height, direction, speed, worldDimension){
        super(x, y, width, height, direction, speed, worldDimension);
    } 

    display(){
        noStroke();
        fill(255, 255 , 255);
        ellipse(this.currentPoint.x + this.width/2, this.currentPoint.y + this.height/2, this.width * 1/2, this.height * 1/2);
        fill(255, 0 , 0);
        ellipse(this.currentPoint.x + this.width/2, this.currentPoint.y + this.height/2, this.width * 5/12, this.height * 5/12);
    }
}