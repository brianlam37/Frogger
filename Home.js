class Home extends Terrain {
    constructor(x, y, width, height, type, sprite){
        super(x, y, width, height, type);
        this.open = true;
        this.sprite = sprite;
    } 
    display(){
        if(!this.open){
            drawingContext.drawImage(this.sprite, 0, 0, 32, 32, this.currentPoint.x + 1/4 * this.width, this.currentPoint.y, this.width, this.height)
        }
    }
    setOpen(open){
        this.open = open;
    }
    getOpen(){
        return this.open;
    }
}