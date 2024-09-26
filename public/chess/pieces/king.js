var King = function(config) {
    config.type = 'king'; // Set the type for the king
    Piece.call(this, config); // Call the base class constructor
};

// Inherit from Piece
King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

// Define the isValidPosition method for the King
King.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    
    let targetCol = targetPosition.col.charAt(0);
    let targetRow = parseInt(targetPosition.row);

    let colDifference = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetRow - currentRow);
    
    // King can move one square in any direction
    if ((colDifference === 1 && rowDifference === 0) || // one square left or right
        (colDifference === 0 && rowDifference === 1) || // one square up or down
        (colDifference === 1 && rowDifference === 1)) { // one square diagonally
        return true; // Valid move
    }
    
    return false; // Invalid move
};