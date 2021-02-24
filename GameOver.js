class GameOver extends Timer{
    constructor(x, y, width, height, worldDimension, time, font){
        super(x, y, width, height, worldDimension, time, font)
    }
    display(){
        strokeWeight(4);
        stroke(255);
        fill(0);
        rect(this.currentPoint.x, this.currentPoint.y, this.initialWidth, this.height);
        fill(255);
        noStroke();
        textAlign(CENTER)
        textSize(this.worldDimension/2)
        text('GAME OVER', this.currentPoint.x + this.width/2, this.currentPoint.y + this.height/4);
        text('CONTINUE?', this.currentPoint.x + this.width/2, this.currentPoint.y + this.height/2);
        text(this.time, this.currentPoint.x + this.width/2, this.currentPoint.y + this.height * 5/8);
        textSize(this.worldDimension/4)
        text('PRESS SPACE TO CONTINUE', this.currentPoint.x + this.width/2, this.currentPoint.y + this.height * 3/4);
    }
    setTimer(){
        this.timeUp = false;
        this.time = this.initialTime;
    }
    updateTimer(){
        if(this.time > 0){
            this.time--;
        }else{
            this.timeUp = true;
        }
    }
}
