
class Logs extends MovingObjects {
    constructor(numRows, worldDimension, context, movingSprite, heightOffset){
        super(numRows, worldDimension, context, movingSprite, heightOffset)
    }
    setup(level){
        console.log(this.heightOffset)
        switch (level){
            case 1: {
                this.movingObjects = []
                for(let i = 0; i < 4; i++){
                    this.movingObjects.push(new Log(
                        i * 4 * this.worldDimension, 
                        this.worldDimension + this.heightOffset, 
                        this.worldDimension/2 * 5, 
                        this.worldDimension, 
                        1, 
                        this.worldDimension * 1.5, 
                        this.worldDimension
                    ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(new Log(
                        i * 6 * this.worldDimension, 
                        this.worldDimension * 3 + this.heightOffset, 
                        this.worldDimension * 5, 
                        this.worldDimension, 
                        1, 
                        this.worldDimension * 1.5, 
                        this.worldDimension
                    ));
                }
                for(let i = 0; i < 5; i++){
                    this.movingObjects.push(new Log(
                        i * 3 * this.worldDimension, 
                        this.worldDimension * 4 + this.heightOffset, 
                        this.worldDimension * 2, 
                        this.worldDimension, 
                        1, 
                        this.worldDimension, 
                        this.worldDimension
                    ));
                }
                break;
            }
        }
    }
}