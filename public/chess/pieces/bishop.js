var Bishop = function(config) {
    config.type = 'bishop';
    Piece.call(this, config);
 };
 
 
 Bishop.prototype = Object.create(Piece.prototype);
 Bishop.prototype.constructor = Bishop;
 
 
 Bishop.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col;
    let targetRow = Number(targetPosition.row);
 
 
    // Bishops move diagonally
    if (Math.abs(targetRow - currentRow) === Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0))) {
        // Check if any pieces are blocking the path
        const rowStep = (targetRow > currentRow) ? 1 : -1;
        const colStep = (targetCol > currentCol) ? 1 : -1;
       
        let row = currentRow + rowStep;
        let col = currentCol.charCodeAt(0) + colStep;
    
        while (row !== targetRow && col !== targetCol.charCodeAt(0)) {
            if (this.board.getPieceAt({ col: String.fromCharCode(col), row: row })) {
                return false; // Path is blocked
            }
            row += rowStep;
            col += colStep;
        }
        return true; // Valid bishop move
    }
 
 
    return false; // Invalid move
 };
  