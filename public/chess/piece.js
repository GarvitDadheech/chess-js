var Piece = function(config){
    this.position = config.position;
    this.type = config.type;
    this.color = config.color;
    this.board = config.board;
    if(this.position){
        this.render();        
    }    
}
Piece.prototype.moveTo = function(targetPosition) {

    if (this.board.isGameOver()) {
        console.warn('The game is over, no further moves allowed.');
        return false;
    }

    const targetPiece = this.board.getPieceAt(targetPosition);

    // Check if the move is valid
    if (!this.isValidPosition(targetPosition)) {
        console.warn(`Invalid move for ${this.type}`);
        return false;
    }

    // Check if the killed piece is a king
    if (targetPiece.type === 'king') {
        this.board.gameOver = true;  // Set the gameOver flag
        const winnerColor = this.color === 'white' ? 'White' : 'Black';
        
        // Display the winning message
        window.alert(`${winnerColor} won the game!`);
        this.board.reset();
    }

    if (this.type === 'pawn' && targetPiece && targetPosition.col === this.position[0]) {
        console.warn('Pawn cannot capture straight ahead');
        return false;
    }

    // If there's a piece at the target position and it's of the opposite color, we can kill it
    if (targetPiece && targetPiece.color !== this.color) {
        this.kill(targetPiece); // Kill the target piece
    }
    
    // Update the position
    this.position = targetPosition.col + targetPosition.row;
    console.log(`${this.type.charAt(0).toUpperCase() + this.type.slice(1)} moved to ${this.position}`);
    
    // Render the piece in its new position
    this.render();
    return true;
};

Piece.prototype.isValidPosition = function(targetPosition) {
    // This method should be overridden by each specific piece type
    // to implement its own movement rules
    throw new Error("isValidPosition must be implemented by subclasses");
};

Piece.prototype.kill = function(targetPiece) {
    if (targetPiece) {
        console.log(`${this.type.charAt(0).toUpperCase() + this.type.slice(1)} killed ${targetPiece.type} at ${targetPiece.position}`);
        targetPiece.board.removePiece(targetPiece);
    }
};


Piece.prototype.isValidPosition = function(targetPosition) {
    throw new Error("isValidPosition must be implemented by subclasses");
};

Piece.prototype.attachListeners = function(){
    //To be implemented
}

Piece.prototype.render = function(){
    var col = this.position[0];
    var row = this.position[1];
    // Find the li element with matching data-col and data-row attributes
    var element = document.querySelector(`[data-col="${col}"] [data-row="${row}"]`);
    if (element) {  
        // Remove the existing piece element from the DOM if it exists
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        // Create a new div element to represent the piece
        var pieceElement = document.createElement('div');
        
        // Add classes to the new element for styling
        pieceElement.classList.add('piece', this.color, this.type);
        
        // Clear any existing content in the cell
        element.innerHTML = '';
        
        // Append the new piece element to the cell
        element.appendChild(pieceElement);
        this.$el = pieceElement;
        this.attachListeners();
    } else {
        console.warn(`Element not found for position: ${this.position}`);
    }
}

Piece.prototype.kill = function(targetPiece) {
    if (targetPiece) {
        const targetPosition = targetPiece.position;
        // Remove the target piece from the board and the pieces collection
        targetPiece.board.removePiece(targetPiece); // This assumes you have a method to remove the piece
        console.log(`${this.type.charAt(0).toUpperCase() + this.type.slice(1)} killed ${targetPiece.type}`);
    }
};
