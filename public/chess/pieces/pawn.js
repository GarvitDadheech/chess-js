var Pawn = function(config){
    config.type = 'pawn';
    Piece.call(this, config);
};

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

// Specific implementation of isValidPosition for Pawn
Pawn.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;

    // Moving forward
    if (targetPosition.col === currentCol) {
        if (targetPosition.row === (currentRow + moveDistance).toString()) {
            return true; // Move forward by 1
        } else if (currentRow === initialRow && targetPosition.row === (currentRow + 2 * moveDistance).toString()) {
            return true; // Move forward by 2
        }
    } 
    // Capturing diagonally
    else if (Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
        targetPosition.row === (currentRow + moveDistance).toString()) {
        const targetPiece = this.board.getPieceAt(targetPosition);
        if (targetPiece && targetPiece.color !== this.color) {
            return true; // Valid capture move only if there's an opponent's piece
        } else {
            console.warn('Invalid diagonal move; no opponent piece to capture.');
            return false; // No piece to capture
        }
    }

    return false; // Invalid move
};