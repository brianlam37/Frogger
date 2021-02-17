class MovingObject extends Rectangle {
    constructor(x, y, width, height, direction, speed, worldDimension){
        super(x, y, width, height);
        this.direction = direction;
        this.speed = speed;
        this.worldDimension = worldDimension;
    } 
    display(){
        noStroke();
        fill(255, 0 , 0);
        rect(this.currentPoint.x, this.currentPoint.y, this.width, this.height);
    }
    move(){
        if(this.currentPoint.x > this.worldDimension * 13 && this.direction === 1){
            this.currentPoint.x = -this.width;
        }else if(this.currentPoint.x < -this.width && this.direction === -1){
            this.currentPoint.x = 11 * this.worldDimension;
        }
        this.currentPoint.x += this.direction * this.speed * 13/1000.0;
    }
    getMomentum(){
        return this.direction * this.speed * 13/1000.0
    }
}