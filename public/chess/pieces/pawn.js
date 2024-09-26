var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};

Pawn.prototype = new Piece({});

Pawn.prototype.isValidPosition = function(targetPosition){
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;

    if (targetPosition.col === currentCol) {
        if (targetPosition.row === (currentRow + moveDistance).toString()) {
            return true;
        } else if (currentRow === initialRow && targetPosition.row === (currentRow + 2 * moveDistance).toString()) {
            return true;
        }
    } else if (Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
               targetPosition.row === (currentRow + moveDistance).toString()) {
        return true;
    }

    console.warn("Invalid move for pawn");
    return false;
}

Pawn.prototype.moveTo = function(targetPosition){    
    if(this.isValidPosition(targetPosition)){
        this.position = targetPosition.col + targetPosition.row;
        console.log(`Pawn moved to ${this.position}`);
        this.render();
        return true;
    }else{
        return false;
    }   
}
