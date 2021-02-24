class Timer{
    constructor(x, y, width, height, worldDimension, time, font){
        this.currentPoint = createVector(x, y);
        this.width = width;
        this.height = height;
        this.timeUp = false;
        this.worldDimension = worldDimension;
        this.time = time;
        this.initialTime = time;
        this.initialWidth = width;
        this.font = font;
        textFont(gameFont)
    }

    display(){
        noStroke();
        fill(255, 255, 0);
        textSize(this.worldDimension/4)
        text('TIME', this.currentPoint.x , this.currentPoint.y + this.height/2, this.worldDimension, this.worldDimension);
        fill(0, 150, 0);
        rect(this.currentPoint.x - this.worldDimension/4, this.currentPoint.y + this.height/2, -this.initialWidth, this.height);
        fill(0, 255, 0);
        rect(this.currentPoint.x - this.worldDimension/4, this.currentPoint.y + this.height/2, -this.width, this.height);
    }

    setTimer(){
        this.timeUp = false;
        this.time = this.initialTime;
        this.width = this.initialWidth;
    }

    updateTimer(){
        if(this.time > 0){
            this.time--;
        }else{
            this.timeUp = true;
        }

        if(this.width > 0){
            this.width-= this.initialWidth/this.initialTime;
        }else{
            this.timeUp = true;
        }
    }
    getTime(){
        return this.time
    }
}