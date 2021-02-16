
class Logs extends MovingObjects {
    constructor(numRows, worldDimension){
        super(numRows, worldDimension)
    }
    setup(level){
        switch (level){
            case 1: {
                this.movingObjects = []
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(new Log(
                        1/6 * this.worldDimension + i * 4 * this.worldDimension, 
                        this.worldDimension, 
                        this.worldDimension/2 * 5, 
                        this.worldDimension, 
                        1, 
                        50, 
                        this.worldDimension
                    ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(new Log(
                        1/6 * this.worldDimension + i * 5 * this.worldDimension + this.worldDimension/2 * 7, 
                        this.worldDimension * 3, 
                        this.worldDimension/2 * 7, 
                        this.worldDimension, 
                        1, 
                        75, 
                        this.worldDimension
                    ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(new Log(
                        1/6 * this.worldDimension + i * 3 * this.worldDimension + 1/2 * this.worldDimension, 
                        this.worldDimension * 4, 
                        this.worldDimension/2 * 3, 
                        this.worldDimension, 
                        1, 
                        50, 
                        this.worldDimension
                    ));
                }
                break;
            }
        }
    }
}