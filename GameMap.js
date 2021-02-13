class GameMap {
    constructor(numCols, numRows, dimension){
        this.numCols = numCols;
        this.numRows = numRows;
        this.dimension = dimension;
        this.level = [];
    }
    setup(){
        const grassGreen = color(0, 255, 0);
        const waterBlue = color(0, 0, 200);
        const sidewalkPurple = color(200, 0, 200);
        const roadBlack = color(0, 0, 0);
        for(let rows = 0; rows < this.numRows; rows++){
            let temp = [];
            for(let cols = 0; cols < this.numCols; cols++){
                switch(rows){
                    case 0: {
                        if(cols % 2 == 0){
                            temp.push(new Home(cols * this.dimension, rows * this.dimension, this.dimension, 'home'));
                        }else{
                            
                            temp.push(new Terrain(cols * this.dimension, rows * this.dimension, this.dimension, grassGreen, 'grass'));
                        }
                        break;
                    }
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        temp.push(new Terrain(cols * this.dimension, rows * this.dimension, this.dimension, waterBlue, 'water'));
                        break;
                    case 6:
                    case 12:
                        temp.push(new Terrain(cols * this.dimension, rows * this.dimension, this.dimension, sidewalkPurple, 'sidewalk'));
                        break;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        temp.push(new Terrain(cols * this.dimension, rows * this.dimension, this.dimension, roadBlack, 'road'));
                        break;
                }
            }
            this.level.push(temp);
        }
    }
    display() {
        for(let i = 0; i < this.level.length; i++){
            for(let j = 0; j < this.level[i].length; j++){
                this.level[i][j].display();
            }
        }
    }
}