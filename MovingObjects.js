class MovingObjects {
    constructor(numRows, worldDimension,  spriteSheet, heightOffset){
        this.worldDimension = worldDimension;
        this.movingObjects;
        this.numRows = numRows;
        this.currentMomentum;
        this.spriteSheet = spriteSheet;
        this.heightOffset = heightOffset;
    }
    
    display() {
        for(let i = 0; i < this.movingObjects.length; i++){
            this.movingObjects[i].display();
        }
    }
    move(rightBound) {
        for(let i = 0; i < this.movingObjects.length; i++){
            this.movingObjects[i].move(rightBound);
        }
    }
    intersects(other) {
        for(let i = 0; i < this.movingObjects.length; i++){
            if(this.movingObjects[i].intersects(other)){
                this.currentMomentum = this.movingObjects[i].getMomentum();
                return true;
            }
        }
        return false;
    }
    getMomentum(){
        return this.currentMomentum;
    }
}