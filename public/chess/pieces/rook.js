var Rook = function(config) {
    config.type = 'rook';
    Piece.call(this, config);
 };
 
 
 Rook.prototype = Object.create(Piece.prototype);
 Rook.prototype.constructor = Rook;
 
 
 Rook.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col;
    let targetRow = Number(targetPosition.row);
 
 
    // Rooks move vertically or horizontally
    if (targetCol === currentCol) { // Vertical movement
        
        const step = (targetRow > currentRow) ? 1 : -1;
        for (let row = currentRow + step; row !== targetRow; row += step) {
            if (this.board.getPieceAt({ col: currentCol, row: row })) {
                return false; // Path is blocked
            }
        }
        return true; // Valid rook move
    }
    else if (targetRow === currentRow) { // Horizontal movement
        // Check if any pieces are blocking the path
        const step = (targetCol > currentCol) ? 1 : -1;
        for (let col = currentCol.charCodeAt(0) + step;
             col !== targetCol.charCodeAt(0);
             col += step) {
            if (this.board.getPieceAt({ col: String.fromCharCode(col), row: currentRow })) {
                return false; // Path is blocked
            }
        }
        return true; // Valid rook move
    }
 
 
    return false; // Invalid move
};