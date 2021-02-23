class Cars extends MovingObjects{
    constructor(numRows, worldDimension, context, spriteSheet, heightOffset){
        super(numRows, worldDimension, context, spriteSheet, heightOffset)
    }
    setup(level){
        switch (level){
            case 1: {
                this.movingObjects = []
                for(let i = 0; i < 3; i++){
                    //from bottom to top
                    this.movingObjects.push(
                        new Vehicle(
                            this.worldDimension + i * 4 * this.worldDimension,
                            this.worldDimension* (this.numRows - 2) + 1/4 * (this.worldDimension) + this.heightOffset,
                            this.worldDimension *  5/8, 
                            this.worldDimension * 1/2, 
                            -1, 
                            this.worldDimension,
                            this.worldDimension,
                            this.context,
                            this.spriteSheet,
                            'left'
                        ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(
                        new Vehicle(
                            this.worldDimension + i * 4 * this.worldDimension,
                            this.worldDimension* (this.numRows - 3) + 1/4 * (this.worldDimension) + this.heightOffset, 
                            this.worldDimension *  5/8, 
                            this.worldDimension * 1/2, 
                            1, 
                            this.worldDimension + this.worldDimension/2, 
                            this.worldDimension,
                            this.context,
                            this.spriteSheet,
                            'bulldozer'
                        ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(
                        new Vehicle(
                            this.worldDimension + i * 4 * this.worldDimension,
                            this.worldDimension* (this.numRows - 4) + 1/4 * (this.worldDimension) + this.heightOffset,
                            this.worldDimension *  5/8, 
                            this.worldDimension * 1/2, 
                            -1, 
                            this.worldDimension, 
                            this.worldDimension,
                            this.context,
                            this.spriteSheet,
                            'buggy'
                        ));
                }
                for(let i = 0; i < 1; i++){
                    this.movingObjects.push(
                        new Vehicle(
                            this.worldDimension + i * 4 * this.worldDimension + 1/2 * this.worldDimension, 
                            this.worldDimension* (this.numRows - 5) + 1/4 * (this.worldDimension) + this.heightOffset, 
                            this.worldDimension *  5/8, 
                            this.worldDimension * 1/2, 
                            1, 
                            this.worldDimension * 3, 
                            this.worldDimension,
                            this.context,
                            this.spriteSheet,
                            'right'
                        ));
                }
                //trucks
                for(let i = 0; i < 2; i++){
                    this.movingObjects.push(
                        new Vehicle(
                            this.worldDimension + i * 6 * this.worldDimension + 1/2 * this.worldDimension, 
                            this.worldDimension* (this.numRows - 6) + 1/4 * (this.worldDimension) + this.heightOffset, 
                            this.worldDimension *  5/8 * 3, 
                            this.worldDimension * 5/8, 
                            -1, 
                            this.worldDimension * 2, 
                            this.worldDimension,
                            this.context,
                            this.spriteSheet,
                            'truck'

                        ));
                }
                break;
            }
        }
    }
}