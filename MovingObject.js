class MovingObject extends Rectangle {
    constructor(x, y, dimension, direction, speed, worldDimension){
        super(x, y, dimension);
        this.direction = direction;
        this.speed = speed;
        this.worldDimension = worldDimension;
    } 
    display(){
        noStroke();
        fill(255, 0 , 0);
        rect(this.currentPoint.x, this.currentPoint.y, this.dimension, this.dimension);
    }
    move(){
        if(this.currentPoint.x > this.worldDimension * 11 && this.direction === 1){
            this.currentPoint.x = - this.worldDimension;
            console.log(true);
        }
        this.currentPoint.x += this.direction * this.speed * deltaTime/1000.0;
    }
}