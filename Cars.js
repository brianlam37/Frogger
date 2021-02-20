class Cars extends MovingObjects{
    constructor(numRows, worldDimension, context, movingSprite, heightOffset){
        super(numRows, worldDimension, context, movingSprite, heightOffset)
    }
    setup(level){
        switch (level){
            case 1: {
                this.movingObjects = []
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(
                        new MovingObject(
                            1/6 * this.worldDimension + i * 4 * this.worldDimension,
                            this.worldDimension* (this.numRows - 2) + 1/6 * (this.worldDimension) + this.heightOffset,
                            this.worldDimension * 2/3,
                            this.worldDimension * 2/3, 
                            -1, 
                            this.worldDimension,
                            this.worldDimension
                        ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(
                        new MovingObject(
                            1/6 * this.worldDimension + i * 4 * this.worldDimension,
                            this.worldDimension* (this.numRows - 3) + 1/6 * (this.worldDimension) + this.heightOffset, 
                            this.worldDimension * 2/3, 
                            this.worldDimension * 2/3, 
                            1, 
                            this.worldDimension + this.worldDimension/2, 
                            this.worldDimension
                        ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(
                        new MovingObject(
                            1/6 * this.worldDimension + i * 4 * this.worldDimension + 1/2 * this.worldDimension,
                            this.worldDimension* (this.numRows - 4) + 1/6 * (this.worldDimension) + this.heightOffset,
                            this.worldDimension * 2/3, 
                            this.worldDimension * 2/3, 
                            -1, 
                            this.worldDimension + this.worldDimension/2, 
                            this.worldDimension
                        ));
                }
                for(let i = 0; i < 1; i++){
                    this.movingObjects.push(
                        new MovingObject(
                            1/6 * this.worldDimension + i * 4 * this.worldDimension + 1/2 * this.worldDimension, 
                            this.worldDimension* (this.numRows - 5) + 1/6 * (this.worldDimension) + this.heightOffset, 
                            this.worldDimension * 2/3, 
                            this.worldDimension * 2/3, 
                            1, 
                            this.worldDimension * 3, 
                            this.worldDimension
                        ));
                }
                for(let i = 0; i < 2; i++){
                    this.movingObjects.push(
                        new MovingObject(
                            1/6 * this.worldDimension + i * 6 * this.worldDimension + 1/2 * this.worldDimension, 
                            this.worldDimension* (this.numRows - 6) + 1/6 * (this.worldDimension) + this.heightOffset, 
                            this.worldDimension * 2/3 * 2, 
                            this.worldDimension * 2/3, 
                            -1, 
                            this.worldDimension * 2, 
                            this.worldDimension
                        ));
                }
                break;
            }
        }
    }
}