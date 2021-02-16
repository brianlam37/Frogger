class MovingObjects {
    constructor(numRows, worldDimension){
        this.worldDimension = worldDimension;
        this.movingObjects;
        this.numRows = numRows;
        this.currentMomentum;
    }
    
    display() {
        for(let i = 0; i < this.movingObjects.length; i++){
            this.movingObjects[i].display();
        }
    }
    move() {

        for(let i = 0; i < this.movingObjects.length; i++){
            this.movingObjects[i].move();
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