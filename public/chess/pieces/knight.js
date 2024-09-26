var Knight = function(config) {
    config.type = 'knight';
    Piece.call(this, config);
};

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

// Implementing isValidPosition method for the Knight
Knight.prototype.isValidPosition = function(targetPosition) {
    const currentRow = parseInt(this.position[1]);
    const currentCol = this.position[0].charCodeAt(0);
    const targetRow = parseInt(targetPosition.row);
    const targetCol = targetPosition.col.charCodeAt(0);

    const rowDifference = Math.abs(targetRow - currentRow);
    const colDifference = Math.abs(targetCol - currentCol);

    // Check for valid knight move (L-shape)
    if ((rowDifference === 2 && colDifference === 1) || (rowDifference === 1 && colDifference === 2)) {
        return true; // Valid knight move
    } else {
        console.warn("Invalid move for knight");
        return false; // Invalid move
    }
};