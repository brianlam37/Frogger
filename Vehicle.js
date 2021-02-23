class Vehicle extends MovingObject {
    constructor(x, y, width, height, direction, speed, worldDimension, context, spriteSheet, type){
        super(x, y, width, height, direction, speed, worldDimension, context, spriteSheet);
        this.type = type;
    } 
    display(){
        noStroke();
        fill(255, 0 , 0);
        switch(this.type){
            case 'left':
                this.context.drawImage(this.spriteSheet, 0, 0 , 32, 32, this.currentPoint.x - this.width/4, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                break;
            case 'right':
                this.context.drawImage(this.spriteSheet, 32, 0 , 32, 32, this.currentPoint.x - this.width/4, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                break;
            case 'buggy':
                this.context.drawImage(this.spriteSheet, 64, 0 , 32, 32, this.currentPoint.x - this.width/4, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                
                break;
            case 'truck':
                this.context.drawImage(this.spriteSheet, 96, 0 , 64, 32, this.currentPoint.x, this.currentPoint.y - this.height/2, this.worldDimension * 2, this.worldDimension);
                break;
            case 'bulldozer':
                this.context.drawImage(this.spriteSheet, 160, 0 , 32, 32, this.currentPoint.x, this.currentPoint.y - this.height/2, this.worldDimension, this.worldDimension);
                break;
        }

    }

}