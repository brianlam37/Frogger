class GameMap {
    constructor(numCols, numRows, width, height){
        this.numCols = numCols;
        this.numRows = numRows;
        this.width = width;
        this.height = height;
        this.level = [];
        this.currentTile;
        this.homesIndex = [];
    }
    setup(){
        const grassGreen = color(0, 255, 0);
        const waterBlue = color(0, 0, 200);
        const sidewalkPurple = color(200, 0, 200);
        const roadBlack = color(0, 0, 0);
        this.level = [];
        this.resetRowEntered()
        const heightOffset = tileDimension;
        for(let rows = 0; rows < this.numRows; rows++){
            for(let cols = 0; cols < this.numCols; cols++){
                switch(rows){
                    case 0: {
                        if(cols % 2 == 0){
                            this.level.push(new Home(cols * this.width, rows * this.height + heightOffset, this.width, this. height, 'home'));
                            this.homesIndex.push(cols)
                        }else{                            
                            this.level.push(new Terrain(cols * this.width, rows * this.height + heightOffset, this.width, this. height, 'grass', grassGreen));
                        }
                        break;
                    }
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        this.level.push(new Terrain(cols * this.width, rows * this.height + heightOffset, this.width, this. height, 'water', waterBlue));
                        break;
                    case 6:
                    case 12:
                        this.level.push(new Terrain(cols * this.width, rows * this.height + heightOffset, this.width, this. height, 'sidewalk', sidewalkPurple));
                        break;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        this.level.push(new Terrain(cols * this.width, rows * this.height + heightOffset, this.width, this. height, 'road', roadBlack));
                        break;
                }
            }
        }
    }
    display() {
        for(let i = 0; i < this.level.length; i++){
            this.level[i].display();  
        }
    }
    intersectsWater(other) {
        for(let i = 0; i < this.level.length; i++){
            if(this.level[i].intersects(other) && this.level[i].getType() === 'water'){
                return true;
            }
        }
        return false;
    }
    intersectsHome(other) {
        for(let i = 0; i < this.level.length; i++){
            if(this.level[i].intersects(other) && this.level[i].getType() === 'home'){
                this.currentTile = this.level[i];
                return true;
            }
        }
        return false;
    }
    getCurrentRow(other) {
        for(let i = 0; i < this.level.length; i++){
            if(this.level[i].intersects(other)){
                let row = Math.floor(i/numCols);
                this.currentRow = row;
                return this.currentRow;
            }
        }
    }
    setRowEntered(){
        this.enteredRow[this.currentRow] = true;
    }
    getCurrentTile(){
        return this.currentTile;
    }
    getRowEntered(){
        return this.enteredRow[this.currentRow];
    }
    resetRowEntered(){
        this.enteredRow = [];
        for(let rows = 0; rows < this.numRows;rows++){
            this.enteredRow.push(false);
        }
    }
    allFilled(){

        for(let cols = 0; cols < this.homesIndex.length;cols++){
            if(this.level[this.homesIndex[cols]].getOpen()){
                console.log(`${this.homesIndex[cols]}: ${this.level[this.homesIndex[cols]].getOpen()}`)
                return false;
            }
        }
        return true;
    }
}