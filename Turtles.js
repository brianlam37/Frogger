class Turtles extends MovingObjects {
    constructor(numRows, worldDimension){
        super(numRows, worldDimension)
    }
    setup(level){
        const heightOffset = tileDimension;
        switch (level){
            case 1: {
                this.movingObjects = []
                for(let i = 0; i < 4; i++){
                    this.movingObjects.push(new Turtle(
                        this.worldDimension + (i * 3 * this.worldDimension), 
                        this.worldDimension * 2 + heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        75, 
                        this.worldDimension
                    ));
                    this.movingObjects.push(new Turtle(
                        this.worldDimension + 0.6 * this.worldDimension + (i * 3 * this.worldDimension), 
                        this.worldDimension * 2 + heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        75, 
                        this.worldDimension
                    ));
                }
                for(let i = 0; i < 4; i++){
                    this.movingObjects.push(new Turtle(
                        (i * 3 * this.worldDimension), 
                        this.worldDimension * 5 + heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        150, 
                        this.worldDimension
                    ));
                    this.movingObjects.push(new Turtle(
                        0.6 * this.worldDimension + (i * 3 * this.worldDimension), 
                        this.worldDimension * 5 + heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        150, 
                        this.worldDimension
                    ));
                    this.movingObjects.push(new Turtle(
                        1.2 * this.worldDimension + (i * 3 * this.worldDimension), 
                        this.worldDimension * 5 + heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        150, 
                        this.worldDimension
                    ));
                    
                }
                break;
            }
        }
    }

}