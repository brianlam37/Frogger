class Vehicle extends MovingObject {
    constructor(x, y, width, height, direction, speed, worldDimension, spriteSheet, type){
        super(x, y, width, height, direction, speed, worldDimension, spriteSheet);
        this.type = type;
    } 
    display(){
        switch(this.type){
            case 'left':
                drawingContext.drawImage(this.spriteSheet, 0, 0 , 32, 32, this.currentPoint.x - this.width/4, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                break;
            case 'right':
                drawingContext.drawImage(this.spriteSheet, 32, 0 , 32, 32, this.currentPoint.x - this.width/4, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                break;
            case 'buggy':
                drawingContext.drawImage(this.spriteSheet, 64, 0 , 32, 32, this.currentPoint.x - this.width/4, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                break;
            case 'truck':
                drawingContext.drawImage(this.spriteSheet, 96, 0 , 64, 32, this.currentPoint.x, this.currentPoint.y - this.height/2, this.worldDimension * 2, this.worldDimension);
                break;
            case 'bulldozer':
                drawingContext.drawImage(this.spriteSheet, 160, 0 , 32, 32, this.currentPoint.x, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                break;
        }

    }

}