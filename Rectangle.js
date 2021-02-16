class Rectangle {
    constructor(x, y, width, height){
        this.currentPoint = createVector(x, y);
        this.width = width;
        this.height = height;
    }
    intersects(other){
        let top = this.currentPoint.y;
        let bot = this.currentPoint.y + this.height;
        let left = this.currentPoint.x;
        let right = this.currentPoint.x + this.width;
        let oTop = other.getY();
        let oBot = other.getY() + other.getHeight();
        let oRight = other.getX() + other.getWidth();
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
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}