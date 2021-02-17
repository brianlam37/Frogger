class Home extends Terrain {
    constructor(x, y, width, height, type){
        super(x, y, width, height, type);
        this.open = true;
    } 
    display(){
        noStroke();
        fill(0, 255 , 0);
        rect(this.currentPoint.x, this.currentPoint.y, this.width, this.height);
        fill(0, 0 , 200);
        rect(this.currentPoint.x + 1/4 * this.width, this.currentPoint.y + 1/4 * this.height, this.width - 1/4 * this.width, this.height - 1/4 * this.height);
        if(!this.open){
            fill(0, 200, 0);
            rect(this.currentPoint.x + 1/4 * this.width, this.currentPoint.y + 1/4 * this.height, this.width/2, this.height/2);
        }
    }
    fillHome(open){
        this.open = open;
    }
    getOpen(){
        return this.open;
    }
}