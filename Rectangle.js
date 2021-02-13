class Rectangle {
    constructor(x, y, dimension){
        this.currentPoint = createVector(x, y);
        this.dimension = dimension;
    }
    intersects(other){
        let top = this.currentPoint.y;
        let bot = this.currentPoint.y + this.dimension;
        let left = this.currentPoint.x;
        let right = this.currentPoint.x + this.dimension;
        let oTop = other.getY();
        let oBot = other.getY() + other.getDimension();
        let oRight = other.getX() + other.getDimension();
        let oLeft = other.getX();
        //if not outside of other objects's borders
        return !(
            left >= oRight ||
            right <= oLeft ||
            top >= oBot ||
            bot <= oTop
          );
    }

    getY() {
        return this.currentPoint.y;
    }
    getX() {
        return this.currentPoint.x;
    }
    getDimension() {
        return this.dimension;
    }
}