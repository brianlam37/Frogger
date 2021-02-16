class Terrain extends Rectangle {
    constructor(x, y, width, height, type, rgb){
        super(x, y, width, height, type, rgb);
        this.type = type;
        this.rgb = rgb;
    } 
    display(){
        noStroke();
        fill(this.rgb);
        rect(this.currentPoint.x, this.currentPoint.y, this.width, this.height);
        ellipse(this.currentPoint.x + this.width/2, this.currentPoint.y + this.width/2, this.width, this.height);
    }
    getType(){
        return this.type;
    }
}