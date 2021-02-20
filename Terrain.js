class Terrain extends Rectangle {
    constructor(x, y, width, height, type){
        super(x, y, width, height, type);
        this.type = type;
    } 
    getType(){
        return this.type;
    }
}