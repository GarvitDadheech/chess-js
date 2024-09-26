var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};



Knight.prototype = new Piece({});
Knight.prototype.moveTo = function(targetPosition) {
    const currentRow = parseInt(this.position[1]);
    const currentCol = this.position[0].charCodeAt(0);
    const targetRow = parseInt(targetPosition.row);
    const targetCol = targetPosition.col.charCodeAt(0);


    const rowDifference = Math.abs(targetRow - currentRow);
    const colDifference = Math.abs(targetCol - currentCol);


    // Check for valid knight move
    if ((rowDifference === 2 && colDifference === 1) || (rowDifference === 1 && colDifference === 2)) {
        this.position = String.fromCharCode(targetCol) + targetRow.toString();
        this.render();
        console.log(`Knight moved to ${String.fromCharCode(targetCol) + targetRow}`);
        return true;
    }
    else {
        console.warn("Move is not valid for knight.");
        return false; 
    }
}