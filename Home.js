class Home extends Rectangle {
    constructor(x, y, dimension){
        super(x, y, dimension);
    } 
    display(){
        noStroke();
        fill(0, 255 , 0);
        rect(this.currentPoint.x, this.currentPoint.y, this.dimension, this.dimension);
        fill(0, 0 , 200);
        rect(this.currentPoint.x + 1/4 * this.dimension, this.currentPoint.y + 1/4 * this.dimension, this.dimension - 1/4 * this.dimension, this.dimension - 1/4 * this.dimension);
    }
}