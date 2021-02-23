class Turtles extends MovingObjects {
    constructor(numRows, worldDimension, context, spriteSheet, heightOffset){
        super(numRows, worldDimension, context, spriteSheet, heightOffset)
    }
    setup(level){
        switch (level){
            case 1: {
                this.movingObjects = []
                for(let i = 0; i < 4; i++){
                    this.movingObjects.push(new Turtle(
                        this.worldDimension + (i * 4 * this.worldDimension), 
                        this.worldDimension * 2 + this.heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        this.worldDimension * 1.5, 
                        this.worldDimension,    
                        this.spriteSheet,
                        i === 0 ? true : false
                    ));
                    this.movingObjects.push(new Turtle(
                        this.worldDimension + this.worldDimension + (i * 4 * this.worldDimension), 
                        this.worldDimension * 2 + this.heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        this.worldDimension * 1.5, 
                        this.worldDimension,
                        this.spriteSheet,
                        i === 0 ? true : false
                    ));
                }
                for(let i = 0; i < 4; i++){
                    this.movingObjects.push(new Turtle(
                        (i * 4 * this.worldDimension), 
                        this.worldDimension * 5 + this.heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        this.worldDimension * 3, 
                        this.worldDimension,
                        this.spriteSheet,
                        i === 0 ? true : false
                    ));
                    this.movingObjects.push(new Turtle(
                        this.worldDimension + (i * 4 * this.worldDimension), 
                        this.worldDimension * 5 + this.heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        this.worldDimension * 3, 
                        this.worldDimension,
                        this.spriteSheet,
                        i === 0 ? true : false
                    ));
                    this.movingObjects.push(new Turtle(
                        2 * this.worldDimension + (i * 4 * this.worldDimension), 
                        this.worldDimension * 5 + this.heightOffset, 
                        this.worldDimension, 
                        this.worldDimension, 
                        -1, 
                        this.worldDimension * 3, 
                        this.worldDimension,
                        this.spriteSheet,
                        i === 0 ? true : false
                    ));
                    
                }
                break;
            }
        }
    }

}