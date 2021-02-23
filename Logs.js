class Logs extends MovingObjects {
    constructor(numRows, worldDimension, context, spriteSheet, heightOffset){
        super(numRows, worldDimension, context, spriteSheet, heightOffset)
    }
    setup(level){
        switch (level){
            case 1: {
                this.movingObjects = []
                for(let i = 0; i < 4; i++){
                    this.movingObjects.push(new Log(
                        i * 4 * this.worldDimension, 
                        this.worldDimension + this.heightOffset + 1/4* (this.worldDimension), 
                        this.worldDimension/2 * 5, 
                        this.worldDimension, 
                        1, 
                        this.worldDimension * 1.5, 
                        this.worldDimension,
                        this.context,
                        this.spriteSheet 
                    ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(new Log(
                        i * 6 * this.worldDimension, 
                        this.worldDimension * 3 + this.heightOffset + 1/4* (this.worldDimension), 
                        this.worldDimension * 5, 
                        this.worldDimension, 
                        1, 
                        this.worldDimension * 1.5, 
                        this.worldDimension,
                        this.context,
                        this.spriteSheet 
                    ));
                }
                for(let i = 0; i < 5; i++){
                    this.movingObjects.push(new Log(
                        i * 3 * this.worldDimension, 
                        this.worldDimension * 4 + this.heightOffset + 1/4* (this.worldDimension), 
                        this.worldDimension * 2, 
                        this.worldDimension, 
                        1, 
                        this.worldDimension, 
                        this.worldDimension,
                        this.context,
                        this.spriteSheet 
                    ));
                }
                break;
            }
        }
    }
}