var King = function(config) {
    this.type = 'king';
    this.constructor(config);
};

King.prototype = new Piece({});

King.prototype.isValidPosition = function(targetPosition) {
   let currentCol = this.position.charAt(0);
   let currentRow = parseInt(this.position.charAt(1));
      
   let targetCol = targetPosition.col.charAt(0);
   let targetRow = parseInt(targetPosition.row);

   let colDifference = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
   let rowDifference = Math.abs(targetRow - currentRow);
   
   if ((colDifference === 1 && rowDifference === 0) || //  one square left or right
       (colDifference === 0 && rowDifference === 1) || //  one square up or down
       (colDifference === 1 && rowDifference === 1)) { //  one square diagonally
       return true; // Valid move
   }
   
   return false; // Invalid move
   
   }


// Implementing move method for the King
King.prototype.moveTo = function(targetPosition) {
    // Validate if the new position is valid for the king
    if (this.isValidPosition(targetPosition)) {
        // If valid, update the king's position
        this.position = targetPosition.col + targetPosition.row;
        console.log(`King moved to ${this.position}`);
        this.render();
        return true;
    } else {
        console.warn("Move is not valid for king.");
        return false;
    }
};
