class Turtles extends MovingObjects {
    constructor(numRows, worldDimension){
        super(numRows, worldDimension)
    }
    setup(level){
        switch (level){
            case 1: {
                this.movingObjects = []
                for(let i = 0; i < 4; i++){
                    this.movingObjects.push(new Turtle(
                        this.worldDimension + (i * 3 * this.worldDimension), 
                        this.worldDimension * 2, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        50, 
                        this.worldDimension
                    ));
                    this.movingObjects.push(new Turtle(
                        this.worldDimension + 0.5 * this.worldDimension + (i * 3 * this.worldDimension), 
                        this.worldDimension * 2, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        50, 
                        this.worldDimension
                    ));
                }
                for(let i = 0; i < 3; i++){
                    this.movingObjects.push(new Turtle(
                        1/6 * this.worldDimension + (i * 4 * this.worldDimension), 
                        this.worldDimension * 5, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        50, 
                        this.worldDimension
                    ));
                    this.movingObjects.push(new Turtle(
                        1/6 * this.worldDimension + 0.5 * this.worldDimension + (i * 4 * this.worldDimension), 
                        this.worldDimension * 5, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        50, 
                        this.worldDimension
                    ));
                    this.movingObjects.push(new Turtle(
                        1/6 * this.worldDimension + this.worldDimension + (i * 4 * this.worldDimension), 
                        this.worldDimension * 5, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        50, 
                        this.worldDimension
                    ));
                }
                break;
            }
        }
    }

}