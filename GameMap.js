class GameMap {
    constructor(numCols, numRows, width, height, heightOffset, background, context){
        this.numCols = numCols;
        this.numRows = numRows;
        this.width = width;
        this.height = height;
        this.level = [];
        this.currentTile;
        this.homes = [];
        this.heightOffset = heightOffset;
        this.background = background;
        this.context = context;
    }
    setup(){
        this.level = [];
        this.resetRowEntered()
        for(let i = 0; i < 5; i++){
            this.homes.push(new Home( i * 3 * this.width + this.width/4,  this.heightOffset, this.width, this.height))
        }
        for(let rows = 0; rows < this.numRows; rows++){
            for(let cols = 0; cols < this.numCols; cols++){
                switch(rows){
                    case 0: {                          
                        this.level.push(new Terrain(cols * this.width, rows * this.height + this.heightOffset, this.width, this. height, 'grass'));
                        break;
                    }
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        this.level.push(new Terrain(cols * this.width, rows * this.height + this.heightOffset, this.width, this. height, 'water'));
                        break;
                    case 6:
                    case 12:
                        this.level.push(new Terrain(cols * this.width, rows * this.height + this.heightOffset, this.width, this. height, 'sidewalk'));
                        break;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        this.level.push(new Terrain(cols * this.width, rows * this.height + this.heightOffset, this.width, this. height, 'road'));
                        break;
                }
            }
        }
    }
    display() {
        this.context.drawImage(this.background, 0, this.heightOffset, this.width * this.numCols, this.height * this.numRows);
        for(let i = 0; i < this.homes.length; i++){
            this.homes[i].display();  
        }
    }
    intersectsBad(other) {
        for(let i = 0; i < this.level.length; i++){
            if(this.level[i].intersects(other) && (this.level[i].getType() === 'water' || this.level[i].getType() === 'grass')){
                return true;
            }
        }
        return false;
    }
    intersectsHome(other) {
        for(let i = 0; i < this.homes.length; i++){
            if(this.homes[i].intersects(other)){
                this.currentTile = this.homes[i];
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
        for(let home = 0; home < this.homes.length; home++){
            if(this.homes[home].getOpen()){
                return false;
            }
        }
        return true;
    }
}