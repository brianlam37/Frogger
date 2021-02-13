class Terrain extends Rectangle {
    constructor(x, y, dimension, rgb, type){
        super(x, y, dimension);
        this.rgb = rgb;
        this.type = type;
    } 
    display(){
        noStroke();
        fill(this.rgb);
        rect(this.currentPoint.x, this.currentPoint.y, this.dimension, this.dimension);
    }
     getType(){
         return this.type;
     }
}